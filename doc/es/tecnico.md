# Sinonimia - Arquitectura técnica

> Esta es la referencia para desarrollar y mantener el código de Sinonimia.
> Para saber qué es el producto, para quién es y qué reglas debe cumplir el
> contenido, consulta [`SPEC.md`](SPEC.md). Para añadir idiomas, consulta
> [`idiomas.md`](idiomas.md).

## 1. Política de idioma del código

- El lenguaje técnico es siempre **inglés**: identificadores, comentarios,
  documentación de ingeniería y mensajes de commit.
- El producto visible y el contenido del diccionario se escriben en el idioma
  correspondiente: español, inglés o el que se añada.
- Las claves de `I18N` son identificadores técnicos en inglés; sus valores son
  los textos traducidos.

### 1.1 Identificadores que son contratos y no deben renombrarse

Estos nombres en español se mantienen deliberadamente:

- Campos del diccionario: `palabra`, `definicion`, `imagen`, `sinonimos`,
  `ejemplo`, `ejemploSinonimo` y `situacion`.
- Atributos `id` y `class` de HTML y sus selectores CSS, compartidos entre
  `index.html`, `css/styles.css` y `js/app.js`.
- Claves de `localStorage`, como `sinonimia-idioma`,
  `sinonimia-aprendidas-<idioma>`, `sinonimia-juego-aciertos-<idioma>` y
  `sinonimia-mis-frases-<idioma>`.
- Segmentos de ruta `palabra` y `juego` del router hash. Son tokens de URL,
  no textos traducibles.

Todo lo demás debe seguir la convención técnica en inglés. Si se cambia uno de
estos contratos, hay que actualizar todos sus consumidores en el mismo cambio.

## 2. Forma del proyecto y ejecución

Sinonimia es un sitio estático, sin frameworks, bundler, build ni dependencias
de runtime. Se puede abrir `index.html` directamente o servir el directorio
con cualquier servidor estático. Todo el estado de la aplicación vive en el
navegador.

```text
index.html          marcado de las vistas y enlaces data-i18n
css/styles.css      estilos y propiedades personalizadas del tema
js/i18n.js          textos de interfaz por idioma
js/data.es.js       diccionario español
js/data.en.js       diccionario inglés
js/app.js           router, renderizado y estado de la aplicación
js/bootstrap-i18n.js textos mínimos para evitar flash de idioma
img/<id>.png        pictogramas servidos localmente
scripts/validar.js  validación local y de CI
```

El orden de carga de los archivos de datos debe preceder a `js/app.js`. No hay
runtime de servidor, endpoints ni secretos en el navegador. `OPENSYMBOLS_SECRET`
solo se usa desde el entorno de quien busca pictogramas durante la edición.

## 3. Despliegue y caché

### 3.1 Cloudflare Pages

El sitio se despliega en **Cloudflare Pages**, no en Workers:

- Pages publica el repositorio tal cual, sin compilación, bundler, Functions ni
  edge handlers.
- `_headers` define CSP, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy` y cabeceras `Cross-Origin-*`, además de la caché.
- `wrangler.toml` fija el proyecto `sinonimia` y publica `.`. El comando
  manual es `wrangler pages deploy . --project-name=sinonimia`; `wrangler
  deploy` no es el comando correcto para Pages.

### 3.2 Caché inmutable

`js/data.*`, `css/*`, `img/*`, `js/app.js` y `js/i18n.js` tienen una caché de
un año e `immutable`. El HTML conserva la caché por defecto para que las
actualizaciones se vean al recargar.

Los scripts de datos llevan una query `?v=` calculada a partir del hash de su
contenido. Cuando cambia un diccionario, `scripts/validar.js` indica el hash
que debe ponerse en `index.html` y `404.html`. No usar versiones manuales ni
añadir un bundler solo para resolver esta caché.

## 4. Navegadores y accesibilidad técnica

El objetivo son Chrome, Edge y Firefox evergreen, además de Safari en macOS e
iOS/iPadOS. Safari es parte de la definición de funcionamiento, especialmente
por el uso previsto en iPad.

- No hay transpilación, polyfills ni bundler. Se usan características con
  soporte amplio: `const`/`let`, arrow functions, template literals,
  destructuring, spread, `includes`, `find`, `filter`, `map`, `Object.entries`,
  `localStorage`, `URLSearchParams` y APIs DOM.
- Antes de usar APIs más nuevas, comprobar la versión de iOS Safari que aún
  recibe actualizaciones en el entorno objetivo.
- No hay autoprefijado CSS. Añadir manualmente propiedades `-webkit-*` cuando
  una característica lo necesite.
- No hacer detección de navegador ni ramas específicas para Safari. Buscar un
  equivalente multiplataforma o documentar una limitación.
- Los controles de accesibilidad y los juegos deben funcionar con tacto,
  teclado en pantalla y teclado Bluetooth. Los atajos que intercepten
  `keydown` deben contemplar las reasignaciones de iPadOS, como `Meta` por
  `Ctrl` y `Alt+Left` por Atrás.

El tamaño de letra y el alto contraste usan propiedades personalizadas en
`:root` y `body.alto-contraste`; ambas preferencias se guardan en
`localStorage`. Las regiones dinámicas (`#resultados-info`, el aviso de frase
guardada y el feedback de juego) usan `aria-live="polite"`. Al navegar, el
foco pasa al encabezado de la vista nueva.

La validación no ejecuta pruebas de navegador porque el repositorio no incluye
Chrome/WebDriver ni una dependencia de automatización.

## 5. Forma de una entrada

Cada elemento de `DICCIONARIOS.<idioma>` tiene esta forma:

```js
{
  id: "identificador-unico",
  palabra: "palabra difícil",
  imagen: { id: "arasaac-id", alt: "texto alternativo" },
  definicion: "Explicación breve y clara.",
  sinonimos: ["palabra sencilla"],
  ejemplo: { palabra: "forma usada", texto: "Frase real." },
  ejemploSinonimo: { palabra: "forma sencilla", texto: "Frase equivalente." },
  situacion: "tramites",
  traduccion: { en: "id-equivalente" } // opcional
}
```

Reglas del esquema:

- Solo `id` debe ser único. `palabra` puede repetirse para representar un
  homónimo; el índice mantiene un array de entradas con el mismo nombre.
- `imagen.id` apunta a `img/<id>.png` y `imagen.alt` es obligatorio.
- `situacion` es una de estas diez claves compartidas: `tramites`, `salud`,
  `vida-diaria`, `finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`,
  `seguridad`, `educacion`.
- `ejemplo.palabra` y `ejemploSinonimo.palabra` deben ser exactamente la
  forma que aparece en su propio `texto`, aunque sea una forma conjugada o
  concordada y no la cabecera.
- `traduccion` es opcional. Sus claves son códigos de idioma y sus valores
  son un `id` string o un array de ids del idioma destino. Es el enlace
  autoritativo entre conceptos cuando existe; si falta, la aplicación puede
  usar el pictograma compartido como fallback.

Ejemplo de traducción uno-a-uno y uno-a-varios:

```js
traduccion: { en: "pension-payment" }
traduccion: { en: ["pension-payment", "retirement-work"] }
```

El validador comprueba la forma, los idiomas y los ids de destino. Permite que
un id sea igual en dos idiomas si son entradas distintas en diccionarios
distintos.

## 6. Separación entre interfaz, datos y lógica

- `js/i18n.js` contiene solo textos de interfaz. `translate(language, key,
  variables)` busca el idioma solicitado, recurre a español y después a la
  clave cruda, y sustituye marcadores `{nombre}`.
- `js/data.es.js` y `js/data.en.js` rellenan el global compartido
  `DICCIONARIOS.<idioma>`. Un idioma nuevo añade otro archivo; no hay que
  cambiar `js/app.js`.
- `js/app.js` es una IIFE que contiene router, renderizado, índices, juegos y
  estado. No escribe textos de interfaz ni lee un idioma concreto: usa
  `activeDictionary = DICCIONARIOS[currentLanguage]` y `t(key)`.

## 7. Router y estado

Las rutas son hash-based y no usan History API:

```text
#/<idioma>/
#/<idioma>/palabra/<id>
#/<idioma>/juego
#/<idioma>/juego/palabra
#/<idioma>/juego/frase
```

`route()` valida primero el idioma y redirige al idioma inicial si falta o no
es válido. Después despacha la vista. Solo una de `#vista-lista`,
`#vista-detalle` y `#vista-juego` se muestra cada vez; cada renderizado vacía
su contenedor con `innerHTML = ""` y lo reconstruye.

Al cambiar `currentLanguage`, `buildIndexes()` reconstruye:

- `entryById`, para resolver rutas y entradas.
- `entryByName`, un mapa de nombre normalizado a arrays de entradas, para
  enlazar sinónimos ambiguos y elegir distractores.

El estado persistido se separa por idioma:

- descubrimientos: `sinonimia-aprendidas-<idioma>`;
- aciertos: `sinonimia-juego-aciertos-<idioma>`;
- frases propias: `sinonimia-mis-frases-<idioma>`.

## 8. Pictogramas

Las imágenes se sirven localmente y hoy proceden de
[ARASAAC](https://arasaac.org), Portal Aragonés de Comunicación Aumentativa
y Alternativa. La misma imagen conceptual puede reutilizarse en varias
entradas o idiomas mediante el mismo `imagen.id`.

ARASAAC usa licencia CC BY-NC-SA y requiere atribución. Los créditos viven en
`footerCreditsHtml` de `js/i18n.js` y no se deben eliminar.

### 8.1 Búsqueda

Ejecutar:

```text
node scripts/buscar-pictograma.js "<término>" <idioma>
```

El script intenta primero OpenSymbols cuando existe `OPENSYMBOLS_SECRET` y
recurre automáticamente a la API pública de ARASAAC si no hay secreto, falla
la petición o no hay resultados. Solo lista candidatos para revisión humana;
no descarga ni elige imágenes automáticamente. Nunca subir el secreto al
repositorio.

OpenSymbols agrega bancos con licencias distintas, como Sclera o Mulberry.
Si se incorpora una imagen de otro banco, hay que revisar autoría y licencia y
añadir sus créditos en `footerCreditsHtml` en el mismo cambio.

### 8.2 Sin pictograma adecuado

Antes de usar un respaldo, probar el término, sus sinónimos y sinónimos de la
definición. Para palabras abstractas sin pictograma adecuado se usa el
respaldo deliberado de `scripts/category-pictogram-defaults.js`:

| `situacion` | id | concepto |
|---|---:|---|
| `tramites` | 21802 | documento |
| `salud` | 2467 | médico |
| `vida-diaria` | 8717 | vida |
| `finanzas` | 4630 | dinero |
| `vivienda` | 2317 | casa |
| `trabajo` | 11457 | empleo |
| `legal` | 11291 | juez |
| `tecnologia` | 11459 | tecnología |
| `seguridad` | 12260 | protección |
| `educacion` | 8098 | educación |

No dejar una palabra abstracta con una imagen elegida por casualidad.

## 9. Gamificación en el código

La palabra del día, "sorpréndeme", el progreso, la frase propia y los juegos
se implementan en `js/app.js` mediante `renderGameMenu`, `renderWordGame` y
`renderSentenceGame`. Todos leen `activeDictionary` y no tienen casos
especiales por idioma. Las reglas de producto que limitan cualquier juego
nuevo están en [`SPEC.md`](SPEC.md).

## 10. Validación

Ejecutar `node scripts/validar.js` en local y en CI
(`.github/workflows/validate.yml`). El script comprueba:

1. Sintaxis de todos los JavaScript.
2. Balance de llaves de `css/styles.css`.
3. IDs únicos, categorías válidas, pictogramas existentes y campos
   `ejemplo` / `ejemploSinonimo` coherentes.
4. Forma y referencias de `traduccion`.
5. Paridad de claves de `I18N` usadas por `js/app.js` y `data-i18n*` de
   `index.html`.
6. Existencia de todos los ids DOM buscados por `js/app.js`.
7. Hashes `?v=` correctos para los diccionarios en `index.html` y `404.html`.
8. Ausencia de menciones prohibidas en `index.html`, `js/i18n.js` y
   `about/privacidad.html`.

## 11. `about/` y rutas no enlazadas

`about/index.html` es la presentación externa del proyecto para organismos,
entidades financiadoras, periodistas y colaboradores. Explica origen,
principios, tecnología, cifras por área AIVD y formas de ayudar. Incluye el
contexto interno que el diccionario principal no debe mencionar.

`about/privacidad.html` es la página visible de privacidad. Ambas páginas usan
bloques paralelos `data-lang-block` y `about/about.js`; al añadir un idioma hay
que ampliar la whitelist, añadir cada bloque traducido y mantener los enlaces
de idioma.

Ningún enlace público apunta actualmente a `about/index.html`: se llega por
URL directa y lleva `noindex, nofollow`. La falta de enlace no convierte su
contenido en una excusa para omitir la traducción o dejarlo desactualizado.

Sinonimia no tiene service worker propio. `_headers` fija `worker-src 'none'`
y el bloque defensivo de `index.html` desregistra cualquier service worker
ajeno que haya quedado asociado al origen. Si algún día se añade soporte
offline real, hay que retirar ese kill-switch y relajar CSP en el mismo
cambio.
