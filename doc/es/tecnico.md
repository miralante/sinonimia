# Sinonimia - Arquitectura tÃ©cnica

> Esta es la referencia para desarrollar y mantener el cÃ³digo de Sinonimia.
> Para saber quÃ© es el producto, para quiÃ©n es y quÃ© reglas debe cumplir el
> contenido, consulta [`SPEC.md`](SPEC.md). Para aÃ±adir idiomas, consulta
> [`idiomas.md`](idiomas.md).

## 1. PolÃ­tica de idioma del cÃ³digo

- El lenguaje tÃ©cnico es siempre **inglÃ©s**: identificadores, comentarios,
  documentaciÃ³n de ingenierÃ­a y mensajes de commit.
- El producto visible y el contenido del diccionario se escriben en el idioma
  correspondiente: espaÃ±ol, inglÃ©s o el que se aÃ±ada.
- Las claves de `I18N` son identificadores tÃ©cnicos en inglÃ©s; sus valores son
  los textos traducidos.

### 1.1 Identificadores que son contratos y no deben renombrarse

**Actualización 2026-09-17**: los campos del esquema del diccionario y el
segmento de ruta `"palabra"` — antes listados aquí como excepciones
deliberadas en español — pasaron a inglés (`word`, `definition`,
`image`, `synonyms`, `example`, `exampleSynonym`, y el segmento de ruta
`word`; `situacion` se mantuvo, ver más abajo) en `js/data.es.js`,
`js/data.en.js`, `js/app.js` y todas las herramientas de
`scripts/ingest/pipeline/` que leen o escriben esos campos.
`scripts/check.js`, `scripts/content-status.js` y la documentación se
actualizaron para coincidir. **Consecuencia conocida**: cualquier enlace
compartido o indexado antes con la ruta antigua `#/<idioma>/palabra/<id>`
ya no funciona — no hay redirección de compatibilidad. Si esto importa
(enlaces externos, indexación), necesita su propio arreglo; se deja
anotado aquí en vez de asumirlo en silencio.

Estos nombres en español se mantienen deliberadamente:

- El campo `situacion` del esquema del diccionario y sus nueve valores
  válidos (`tramites`, `salud`, `vida-diaria`, `finanzas`, `vivienda`,
  `trabajo`, `legal`, `tecnologia`, `seguridad`, `educacion`,
  `conocimiento`). A diferencia del resto de campos, este se mantuvo
  tal cual en el cambio del 2026-09-17.
- Atributos `id` y `class` de HTML y sus selectores CSS que siguen en
  español (p. ej. `.cabecera`, `.filtros`, `.a11y-*`), compartidos entre
  `index.html`, `css/styles.css` y `js/app.js`. Las clases dinámicas que
  inyecta JS (`.card`, `.detail-image`, `.game-option`, etc.) sí pasaron
  a inglés en el mismo cambio.
- Claves de `localStorage`, como `sinonimia-idioma`,
  `sinonimia-aprendidas-<idioma>`, `sinonimia-juego-aciertos-<idioma>` y
  `sinonimia-mis-frases-<idioma>`.
- El segmento de ruta `"juego"` del router hash. Es un token de URL, no
  texto traducible. (El segmento hermano `"palabra"` pasó a `"word"` en
  el cambio del 2026-09-17 — ver la nota de arriba.)

Todo lo demás debe seguir la convención técnica en inglés. Si se cambia uno de
estos contratos, hay que actualizar todos sus consumidores en el mismo cambio.

## 2. Forma del proyecto y ejecuciÃ³n

Sinonimia es un sitio estÃ¡tico, sin frameworks, bundler, build ni dependencias
de runtime. Se puede abrir `index.html` directamente o servir el directorio
con cualquier servidor estÃ¡tico. Todo el estado de la aplicaciÃ³n vive en el
navegador.

```text
index.html          marcado de las vistas y enlaces data-i18n
css/styles.css      estilos y propiedades personalizadas del tema
js/i18n.js          textos de interfaz por idioma
js/data.es.js       diccionario espaÃ±ol
js/data.en.js       diccionario inglÃ©s
js/app.js           router, renderizado y estado de la aplicaciÃ³n
js/bootstrap-i18n.js textos mÃ­nimos para evitar flash de idioma
img/<id>.png        pictogramas servidos localmente
scripts/check.js  validaciÃ³n local y de CI
```

El orden de carga de los archivos de datos debe preceder a `js/app.js`. No hay
runtime de servidor, endpoints ni secretos en el navegador. `OPENSYMBOLS_SECRET`
solo se usa desde el entorno de quien busca pictogramas durante la ediciÃ³n.

## 3. Despliegue y cachÃ©

### 3.1 Cloudflare Pages

El sitio se despliega en **Cloudflare Pages**, no en Workers:

- Pages publica el repositorio tal cual, sin compilaciÃ³n, bundler, Functions ni
  edge handlers.
- `_headers` define CSP, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy` y cabeceras `Cross-Origin-*`, ademÃ¡s de la cachÃ©.
- `wrangler.toml` fija el proyecto `sinonimia` y publica `.`. El comando
  manual es `wrangler pages deploy . --project-name=sinonimia`; `wrangler
  deploy` no es el comando correcto para Pages.

### 3.2 CachÃ© inmutable

`js/data.*`, `css/*`, `img/*`, `js/app.js` y `js/i18n.js` tienen una cachÃ© de
un aÃ±o e `immutable`. El HTML conserva la cachÃ© por defecto para que las
actualizaciones se vean al recargar.

Los scripts de datos llevan una query `?v=` calculada a partir del hash de su
contenido. Cuando cambia un diccionario, `scripts/check.js` indica el hash
que debe ponerse en `index.html` y `404.html`. No usar versiones manuales ni
aÃ±adir un bundler solo para resolver esta cachÃ©.

### 3.3 Service worker (`sw.js`)

Sinonimia envía un service worker propio en la raíz del proyecto (es la
excepción reciente dentro del suite; apptonomia no envía uno, memofun y
sinonimia sí). El SW sigue la estrategia **cache-first**: el `fetch` genérico
de `sw.js` sirve desde la caché cuando el archivo está listado en `FILES`,
y solo va a la red cuando no está.

**Regla de bump de `VERSION`** (`sw.js` declara `var VERSION =
"sinonimia-vN";`): bumpear `VERSION` en cada commit que toque cualquier archivo
de `FILES` o que añada un archivo nuevo que deba quedar en caché. El handler
`install` del SW compara `VERSION` con el nombre de la caché activa y solo
re-fetch + activa cuando difieren; un bump que no aterriza es silencioso y
las personas usuarias finales siguen viendo los archivos antiguos hasta que el
SW se desinstala.

**Atajo para el contenido del diccionario.** La query `?v=` en el tag
`<script src="js/data.*.js">` (gestionada por `scripts/check.js`) maneja
revisiones del diccionario independientemente del `VERSION` de `sw.js`: el SW
cachea el archivo con el `?v=` del tag al instalar, y la próxima release lleva
el `?v=` nuevo, así que una revisión del diccionario se recoge sola sin
tocar `VERSION` mientras ningún otro archivo cacheado cambie. Esto significa que
para cambios solo en `js/data.*.js` basta con correr `node scripts/check.js` y
commitear; no hay que bumpear `VERSION`.

**Verificación local antes de pushear.** `scripts/check-version-bump.js`
falla el commit/push si un archivo listado en `FILES` cambió sin que
`VERSION` también se haya bumpeado en el mismo diff — corre
`node scripts/check-version-bump.js` antes de cada push que toque
alguno de esos archivos.

Ver [`CLOUDFLARE.md`](../../CLOUDFLARE.md) §"Cache contract" para el
contrato de despliegue completo, y [`CLAUDE.md`](../../CLAUDE.md) §B.1
(ya no) — esta sección del `tecnico.md` es la fuente canónica.
## TipografÃ­a

La interfaz usa dos tipografÃ­as autoalojadas en `css/fonts/`:

- **Atkinson Hyperlegible** (pesos 400 y 700) â€” para zonas de alto contraste
  y etiquetas cortas, elegida por la desambiguaciÃ³n de letras que ayuda a
  personas con baja visiÃ³n.
- **Nunito** (variable, rango de peso 400â€“900) â€” para cuerpo de texto y
  flujos de lectura, por el tono humanista cÃ¡lido que mantiene los textos
  largos en un registro cercano.

Ambas fuentes tienen licencia SIL OFL 1.1 y se distribuyen como `.woff2` en
`css/fonts/`. La CSS las expone a travÃ©s de la variable `--fuente`, definida
en `:root` con la pila
`'Atkinson Hyperlegible', 'Nunito', "Segoe UI", Verdana, Arial, sans-serif`
y aplicada en `body` (y en la vista `about/privacidad.html`) con
`font-family: var(--fuente)`. Los bloques `@font-face` usan `font-display:
swap` para que el primer pintado no se bloquee por la carga de la fuente.

Esto coincide con el resto de la suite (Apptonomia, Calculia, Memofun,
Okeymoney, Teclatlon, Routime): cada PWA de Miralante envÃ­a las mismas dos
tipografÃ­as, autoalojadas, nunca desde una CDN.

## 4. Navegadores y accesibilidad tÃ©cnica

El objetivo son Chrome, Edge y Firefox evergreen, ademÃ¡s de Safari en macOS e
iOS/iPadOS. Safari es parte de la definiciÃ³n de funcionamiento, especialmente
por el uso previsto en iPad.

- No hay transpilaciÃ³n, polyfills ni bundler. Se usan caracterÃ­sticas con
  soporte amplio: `const`/`let`, arrow functions, template literals,
  destructuring, spread, `includes`, `find`, `filter`, `map`, `Object.entries`,
  `localStorage`, `URLSearchParams` y APIs DOM.
- Antes de usar APIs mÃ¡s nuevas, comprobar la versiÃ³n de iOS Safari que aÃºn
  recibe actualizaciones en el entorno objetivo.
- No hay autoprefijado CSS. AÃ±adir manualmente propiedades `-webkit-*` cuando
  una caracterÃ­stica lo necesite.
- No hacer detecciÃ³n de navegador ni ramas especÃ­ficas para Safari. Buscar un
  equivalente multiplataforma o documentar una limitaciÃ³n.
- Los controles de accesibilidad y los juegos deben funcionar con tacto,
  teclado en pantalla y teclado Bluetooth. Los atajos que intercepten
  `keydown` deben contemplar las reasignaciones de iPadOS, como `Meta` por
  `Ctrl` y `Alt+Left` por AtrÃ¡s.

El tamaÃ±o de letra y el alto contraste usan propiedades personalizadas en
`:root` y `body.alto-contraste`; ambas preferencias se guardan en
`localStorage`. Las regiones dinÃ¡micas (`#resultados-info`, el aviso de frase
guardada y el feedback de juego) usan `aria-live="polite"`. Al navegar, el
foco pasa al encabezado de la vista nueva.

La validaciÃ³n no ejecuta pruebas de navegador porque el repositorio no incluye
Chrome/WebDriver ni una dependencia de automatizaciÃ³n.

## 5. Forma de una entrada

Cada elemento de `DICCIONARIOS.<idioma>` tiene esta forma:

```js
{
  id: "identificador-unico",
  word: "palabra difícil",
  image: { id: "arasaac-id", alt: "texto alternativo" },
  definition: "Explicación breve y clara.",
  synonyms: ["palabra sencilla"],
  example: { word: "forma usada", text: "Frase real." },
  exampleSynonym: { word: "forma sencilla", text: "Frase equivalente." },
  situacion: "tramites",
  translation: { en: "id-equivalente" } // opcional
}
```

Reglas del esquema:

- Solo `id` debe ser único. `word` puede repetirse para representar un
  homónimo; el índice mantiene un array de entradas con el mismo nombre.
- `image.id` apunta a `img/<id>.png` y `image.alt` es obligatorio.
- `situacion` es una de estas once claves compartidas: `tramites`, `salud`,
  `vida-diaria`, `finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`,
  `seguridad`, `educacion`, `conocimiento`.
- `example.word` y `exampleSynonym.word` deben ser exactamente la
  forma que aparece en su propio `text`, aunque sea una forma conjugada o
  concordada y no la cabecera.
- `translation` es opcional (el campo se llamaba `traduccion` antes del
  cambio del 2026-09-17 — las herramientas de lote de
  `scripts/ingest/pipeline/` siguen usando `traduccion` como clave de
  autoría en los ficheros de lote y la traducen a `translation` al
  insertar, así que los lotes escritos a mano mantienen la clave en
  español). Sus claves son códigos de idioma y sus valores
  son un `id` string o un array de ids del idioma destino. Es el enlace
  autoritativo entre conceptos cuando existe; si falta, la aplicación puede
  usar el pictograma compartido como fallback.

Ejemplo de traducciÃ³n uno-a-uno y uno-a-varios:

```js
translation: { en: "pension-payment" }
translation: { en: ["pension-payment", "retirement-work"] }
```

El validador comprueba la forma, los idiomas y los ids de destino. Permite que
un id sea igual en dos idiomas si son entradas distintas en diccionarios
distintos.

## 6. SeparaciÃ³n entre interfaz, datos y lÃ³gica

- `js/i18n.js` contiene solo textos de interfaz. `translate(language, key,
  variables)` busca el idioma solicitado, recurre a espaÃ±ol y despuÃ©s a la
  clave cruda, y sustituye marcadores `{nombre}`.
- `js/data.es.js` y `js/data.en.js` rellenan el global compartido
  `DICCIONARIOS.<idioma>`. Un idioma nuevo aÃ±ade otro archivo; no hay que
  cambiar `js/app.js`.
- `js/app.js` es una IIFE que contiene router, renderizado, Ã­ndices, juegos y
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
es vÃ¡lido. DespuÃ©s despacha la vista. Solo una de `#vista-lista`,
`#vista-detalle` y `#vista-juego` se muestra cada vez; cada renderizado vacÃ­a
su contenedor con `innerHTML = ""` y lo reconstruye.

Al cambiar `currentLanguage`, `buildIndexes()` reconstruye:

- `entryById`, para resolver rutas y entradas.
- `entryByName`, un mapa de nombre normalizado a arrays de entradas, para
  enlazar sinÃ³nimos ambiguos y elegir distractores.

El estado persistido se separa por idioma:

- descubrimientos: `sinonimia-aprendidas-<idioma>`;
- aciertos: `sinonimia-juego-aciertos-<idioma>`;
- frases propias: `sinonimia-mis-frases-<idioma>`.

## 8. Pictogramas

Las imÃ¡genes se sirven localmente y hoy proceden de
[ARASAAC](https://arasaac.org), Portal AragonÃ©s de ComunicaciÃ³n Aumentativa
y Alternativa. La misma imagen conceptual puede reutilizarse en varias
entradas o idiomas mediante el mismo `imagen.id`.

ARASAAC usa licencia CC BY-NC-SA y requiere atribuciÃ³n. Los crÃ©ditos viven en
`footerCreditsHtml` de `js/i18n.js` y no se deben eliminar.

### 8.1 BÃºsqueda

Ejecutar:

```text
node scripts/search-pictogram.js "<tÃ©rmino>" <idioma>
```

El script intenta primero OpenSymbols cuando existe `OPENSYMBOLS_SECRET` y
recurre automÃ¡ticamente a la API pÃºblica de ARASAAC si no hay secreto, falla
la peticiÃ³n o no hay resultados. Solo lista candidatos para revisiÃ³n humana;
no descarga ni elige imÃ¡genes automÃ¡ticamente. Nunca subir el secreto al
repositorio.

OpenSymbols agrega bancos con licencias distintas, como Sclera o Mulberry.
Si se incorpora una imagen de otro banco, hay que revisar autorÃ­a y licencia y
aÃ±adir sus crÃ©ditos en `footerCreditsHtml` en el mismo cambio.

### 8.2 Sin pictograma adecuado

Antes de usar un respaldo, probar el tÃ©rmino, sus sinÃ³nimos y sinÃ³nimos de la
definiciÃ³n. Para palabras abstractas sin pictograma adecuado se usa el
respaldo deliberado de `scripts/category-pictogram-defaults.js`:

| `situacion` | id | concepto |
|---|---:|---|
| `tramites` | 21802 | documento |
| `salud` | 2467 | mÃ©dico |
| `vida-diaria` | 8717 | vida |
| `finanzas` | 4630 | dinero |
| `vivienda` | 2317 | casa |
| `trabajo` | 11457 | empleo |
| `legal` | 11291 | juez |
| `tecnologia` | 11459 | tecnologÃ­a |
| `seguridad` | 12260 | protecciÃ³n |
| `educacion` | 8098 | educaciÃ³n |
| `conocimiento` | 2450 | libro |

No dejar una palabra abstracta con una imagen elegida por casualidad.

## 9. GamificaciÃ³n en el cÃ³digo

La palabra del dÃ­a, "sorprÃ©ndeme", el progreso, la frase propia y los juegos
se implementan en `js/app.js` mediante `renderGameMenu`, `renderWordGame` y
`renderSentenceGame`. Todos leen `activeDictionary` y no tienen casos
especiales por idioma. Las reglas de producto que limitan cualquier juego
nuevo estÃ¡n en [`SPEC.md`](SPEC.md).

## 10. ValidaciÃ³n

Ejecutar `node scripts/check.js` en local y en CI
(`.github/workflows/check.yml`). El script comprueba:

1. Sintaxis de todos los JavaScript.
2. Balance de llaves de `css/styles.css`.
3. IDs Ãºnicos, categorÃ­as vÃ¡lidas, pictogramas existentes y campos
   `ejemplo` / `ejemploSinonimo` coherentes.
4. Forma y referencias de `traduccion`.
5. Paridad de claves de `I18N` usadas por `js/app.js` y `data-i18n*` de
   `index.html`.
6. Existencia de todos los ids DOM buscados por `js/app.js`.
7. Hashes `?v=` correctos para los diccionarios en `index.html` y `404.html`.
8. Ausencia de menciones prohibidas en `index.html`, `js/i18n.js` y
   `about/privacidad.html`.

## 11. `about/` y rutas no enlazadas

`about/index.html` es la presentaciÃ³n externa del proyecto para organismos,
entidades financiadoras, periodistas y colaboradores. Explica origen,
principios, tecnologÃ­a, cifras por Ã¡rea AIVD y formas de ayudar. Incluye el
contexto interno que el diccionario principal no debe mencionar.

`about/privacidad.html` es la pÃ¡gina visible de privacidad. Ambas pÃ¡ginas usan
bloques paralelos `data-lang-block` y `about/about.js`; al aÃ±adir un idioma hay
que ampliar la whitelist, aÃ±adir cada bloque traducido y mantener los enlaces
de idioma.

NingÃºn enlace pÃºblico apunta actualmente a `about/index.html`: se llega por
URL directa y lleva `noindex, nofollow`. La falta de enlace no convierte su
contenido en una excusa para omitir la traducciÃ³n o dejarlo desactualizado.

Sinonimia no tiene service worker propio. `_headers` fija `worker-src 'none'`
y el bloque defensivo de `index.html` desregistra cualquier service worker
ajeno que haya quedado asociado al origen. Si algÃºn dÃ­a se aÃ±ade soporte
offline real, hay que retirar ese kill-switch y relajar CSP en el mismo
cambio.

## 12. PatrÃ³n de la suite â€” cÃ³mo se construye cada app de Miralante

> ðŸŒ **Other language:** [English](../en/technical.md#8-suite-pattern-how-every-app-of-miralante-is-built)

Esta secciÃ³n es la **guÃ­a canÃ³nica y transversal** de cÃ³mo se
construye y mantiene cada app de la [suite Miralante](https://apptonomia.uk).
Es la fuente de verdad que prevalece sobre el `technical.md`
(tecnico.md) de cualquier repo cuando entran en conflicto,
porque el objetivo es mantener las siete apps hermanas
(Apptonomia, Calculia, Memofun, Okeymoney, Sinonimia, Teclatlon,
Routime) consistentes: misma forma, mismas convenciones,
mismo deploy, mismo i18n, mismo comportamiento offline.

Un cambio en esta secciÃ³n es un **cambio transversal a la
suite** y debe aplicarse a todos los repos. Un cambio en
otras secciones de este archivo es especÃ­fico del proyecto y
se queda ahÃ­.

> **Fuente de verdad de las reglas de producto** en este
> repo: [`SPEC.md`](SPEC.md).
> **Fuente de verdad del i18n**: [`I18N.md`](I18N.md).
> Esta secciÃ³n **no** redefine esas; codifica el patrÃ³n que
> todas comparten.

### 12.0 El patrÃ³n en un pÃ¡rrafo

Cada app de la suite Miralante es una **PWA estÃ¡tica, sin
dependencias y offline-first**, construida a partir del mismo
esqueleto mÃ­nimo:

1. Un conjunto pequeÃ±o de **pÃ¡ginas HTML standalone** en la
   raÃ­z del repo (una sola actividad) o bajo `tools/<slug>/`
   (hubs multi-actividad).
2. Cada pÃ¡gina es una **URL real y navegable** â€” **no hay
   routing SPA**, ni cambio de vista en la misma pÃ¡gina, ni
   `pushState`. Cada pÃ¡gina se recarga al entrar; la
   navegaciÃ³n entre pÃ¡ginas es un clic normal en un `<a>`.
3. Las rutas ocultas (`about/`, `team/`, `legal/`, `config/`)
   comparten la misma forma: `index.html` + `styles.css` + par
   `strings.<locale>.js`, con **interlinking en el pie** para
   que cualquiera de ellas estÃ© a un clic de cualquier otra.
4. Un **service worker** (`sw.js`, network-first) cachea el
   shell (lista `FILES`, `VERSION` bumped) para que la app
   funcione offline.
5. **Sin paso de build**, sin `package.json`, sin frameworks,
   sin bundlers, sin CDNs de JS. La raÃ­z del repo es el
   output de deploy.

### 12.1 La forma de las pÃ¡ginas standalone

Este es el patrÃ³n que siguen todas las rutas ocultas y todas
las rutas pÃºblicas. La forma es idÃ©ntica en la suite; solo
cambian los contenidos.

#### 12.1.1 El esqueleto de cinco carpetas

Cada app expone las mismas cinco carpetas:

```
<app>/
  index.html              # Entrada pÃºblica (la actividad)
  app.js                  # LÃ³gica
  data.js                 # Layouts sin locale + contenido por locale
  strings.es.js           # Textos UI en espaÃ±ol (fuente de verdad)
  strings.en.js           # Textos UI en inglÃ©s
  styles.css              # Estilos especÃ­ficos de la app
  assets/
    css/{tokens,base,components}.css
    fonts/                # Atkinson Hyperlegible + Nunito autohospedados
    img/                  # Icono de la app + imÃ¡genes decorativas
    js/{utils,i18n,tts,storage,feedback}.js
  about/                  # Ruta oculta: presentaciÃ³n
    index.html
    styles.css
    strings.es.js
    strings.en.js
  team/                   # Ruta oculta: quiÃ©nes la hacen
    index.html
    styles.css
    strings.es.js
    strings.en.js
  legal/                  # PÃ¡gina de protecciÃ³n de datos (enlazada desde el pie)
    index.html
    styles.css
    strings.es.js
    strings.en.js
  config/                 # Ajustes (solo en apps que lo necesitan)
    index.html
    app.js
    styles.css
    strings.es.js
    strings.en.js
  manifest.json
  sw.js
  _headers
  404.html
  robots.txt
  sitemap.xml
```

Las apps de una sola actividad (Teclatlon, Okeymoney) ponen el
`index.html` en la raÃ­z del repo. Las apps multi-actividad
(Apptonomia, Calculia) ponen `tools/<slug>/index.html` por
actividad y un landing `site/index.html`; las cuatro carpetas
ocultas viven en la raÃ­z del repo.

#### 12.1.2 La concha HTML de una pÃ¡gina standalone

Cada pÃ¡gina standalone abre con el mismo boilerplate. Abajo,
la **plantilla**; las desviaciones se indican donde apliquen.

```html
<!DOCTYPE html>
<html lang="es" data-i18n-title="pageTitle">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sinonimia â€” Sobre este proyecto</title>
  <!-- Hidden route: not linked from the main menu and should not be
       indexed. Aimed at anyone who wants to know what Teclatlon is:
       families, professionals, journalists, funders, contributors. -->
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="â€¦">
  <meta name="theme-color" content="#FAF7F2">
  <link rel="stylesheet" href="../assets/css/tokens.css">
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/components.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container {legal|about}">
    <header class="cabecera-{legal|about}">
      <div class="idioma-selector" role="group" aria-label="Elegir idioma">
        <button type="button" class="btn-idioma" id="btnIdiomaEs"
                data-locale="es" aria-pressed="false">ðŸ‡ªðŸ‡¸ EspaÃ±ol</button>
        <button type="button" class="btn-idioma" id="btnIdiomaEn"
                data-locale="en" aria-pressed="false">ðŸ‡¬ðŸ‡§ English</button>
      </div>
      <img src="../assets/img/icono.svg" alt="" width="80" height="80"
           class="logo-{legal|about}">
      <h1>â€¦</h1>
      <p class="lema" data-i18n="tagline">â€¦</p>
      <p class="entradilla" data-i18n="lead">â€¦</p>
      <nav class="indice">â€¦opcional, solo en pÃ¡ginas largasâ€¦</nav>
    </header>

    <main class="pila">
      <section class="card">â€¦</section>
    </main>

    <footer class="pie-{legal|about}">
      <a class="btn btn-secundario" href="../"
         data-i18n="footerActivities">Ir a la aplicaciÃ³n</a>
      <a class="btn btn-secundario" href="../legal/"
         data-i18n="footerDataProtection">ProtecciÃ³n de datos</a>
      <a class="btn btn-secundario" href="../about/"
         data-i18n="footerAbout">Sobre este proyecto</a>
      <a class="btn btn-secundario" href="../team/"
         data-i18n="footerTeamGuide">QuiÃ©nes la hacen</a>
      <a class="btn btn-secundario" href="../config/"
         data-i18n="footerSettings">Ajustes</a>
    </footer>
  </div>

  <script src="../assets/js/utils.js"></script>
  <script src="../assets/js/i18n.js"></script>
  <script src="strings.es.js"></script>
  <script src="strings.en.js"></script>
  <script>
    (function () {
      'use strict';
      function paintLanguageSelector() {
        var active = App.i18n.locale();
        document.getElementById('btnIdiomaEs')
          .setAttribute('aria-pressed', String(active === 'es'));
        document.getElementById('btnIdiomaEn')
          .setAttribute('aria-pressed', String(active === 'en'));
      }
      document.getElementById('btnIdiomaEs')
        .addEventListener('click', function () { App.i18n.setLocale('es'); });
      document.getElementById('btnIdiomaEn')
        .addEventListener('click', function () { App.i18n.setLocale('en'); });
      paintLanguageSelector();
    })();
  </script>
  <script>
    /* Register the SW from this entry point so it is active for any
       later navigation, matching what the main index.html and the
       other standalone pages already do. */
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../sw.js').catch(function () {});
    }
  </script>
</body>
</html>
```

**Notas:**

- `data-i18n-title="pageTitle"` en `<html>` permite que
  `assets/js/i18n.js` rellene `document.title` durante
  `init()`. El `<title>` hardcoded es el fallback que la
  pestaÃ±a del navegador mostrarÃ­a antes de que i18n.js se
  ejecute (y el fallback de la cache del SW).
- La clase propia de la pÃ¡gina en el wrapper
  `<div class="container â€¦">` es bajo la que `styles.css` de
  la pÃ¡gina scopea sus reglas (`legal-page`, `about-page`,
  `team-page`). Sin prefijos ancestro `.sp-*` (eran residuo
  de la fusiÃ³n SPA, retirado en 2026-09; ver `git log`).
- El pie es **siempre** los mismos cinco enlaces (en el mismo
  orden) en `about/`, `team/` y `legal/`. `config/` tiene un
  pie reducido que solo vuelve a la SPA. La raÃ­z de la app
  (`index.html`) **no** renderiza este pie (tiene su propio
  pie con el botÃ³n de reset y el enlace a protecciÃ³n de datos
  â€” ver §2 arriba).

#### 12.1.3 El par de strings

Cada carpeta standalone trae su propio par `strings.es.js` /
`strings.en.js`. Siguen el patrÃ³n **clave plana,
IIFE-register**; `scripts/check.js` extrae el diccionario vÃ­a
`vm.createContext` con un stub `App.i18n.register` y verifica
la paridad de claves entre locales.

```javascript
/* legal/strings.es.js â€” texto de la pÃ¡gina (ES). */
(function () {
  'use strict';
  App.i18n.register({
    pageTitle: 'ProtecciÃ³n de datos',
    pageDescription: 'Teclatlon: quÃ© datos guarda, dÃ³nde y por quÃ©. â€¦',
    routeNotice: 'Esta pÃ¡gina no se enlaza desde la aplicaciÃ³n. â€¦',
    tagline: 'Sin registro. Sin cookies. Sin analÃ­tica.',
    lead: 'Teclatlon no pide tus datos personales. â€¦',
    navResponsible: 'QuiÃ©n trata tus datos',
    navData: 'QuÃ© guardamos',
    /* â€¦mÃ¡s clavesâ€¦ */
    footerActivities: 'Ir a la aplicaciÃ³n',
    footerAbout: 'Sobre este proyecto',
    footerTeamGuide: 'QuiÃ©nes la hacen',
    footerSettings: 'Ajustes'
  }, 'es');
})();
```

Las claves son planas (sin namespacing tipo
`legal.pageTitle`); la pÃ¡gina **es** el namespace, porque el
archivo vive en su propia carpeta. Las claves comunes
(`core.back`, `core.listen`, `core.dataProtection`) ya vienen
en `assets/js/i18n.js` y no se redefinen aquÃ­.

#### 12.1.4 La hoja de estilos standalone

Cada carpeta standalone trae su propio `styles.css`. Es **el
antiguo `assets/css/subpages.css` dividido por pÃ¡gina**, con
los prefijos ancestro `.sp-legal` / `.sp-about` eliminados
(eran residuo de la fusiÃ³n SPA). La clase wrapper de la
pÃ¡gina (`<div class="legal-page">`, `<div class="about-page">`,
etc.) es la que usa el CSS para scope:

```css
.legal-page { max-width: 880px; }
.legal-page .cabecera-legal { â€¦ }
.legal-page .indice a { â€¦ }
.legal-page section { â€¦ }
```

**No** introduzcas nombres de clase por pÃ¡gina que colisionen
con los componentes compartidos (`base.css` ya define
`.cabecera`, `.lema`, `.indice`, `.btn`, `.card`, `.pila`, â€¦).
Cuando la pÃ¡gina standalone necesite un aspecto distinto,
scopea la regla bajo la clase de la pÃ¡gina â€” nunca bajo un
`.cabecera` o `.indice` genÃ©rico.

### 12.2 El nÃºcleo compartido

Cada app de la suite trae los mismos seis ficheros bajo
`assets/js/`, en el mismo orden de carga, con la misma forma
exportada. Adelgazar estÃ¡ permitido; **aÃ±adir** funcionalidad
de vuelta estÃ¡ prohibido a menos que sirva a una necesidad
concreta (las notas de adelgazamiento en §2.1 arriba son la
justificaciÃ³n canÃ³nica).

| MÃ³dulo | Superficie | Requerido por |
|---|---|---|
| `utils.js` | `App.utils.shuffle / $ / $$ / reducedMotion / wakeLock` | cada pÃ¡gina |
| `i18n.js` | `App.i18n.{locale, setLocale, lang, register, t, pick, apply, SUPPORTED, DEFAULT_LOCALE, LABEL, FLAG}` | cada pÃ¡gina |
| `tts.js` | `App.tts.speak` | solo pÃ¡ginas que leen en voz alta (la mayorÃ­a) |
| `storage.js` | `App.storage.{get, set, remove}` | solo pÃ¡ginas que leen o escriben `localStorage` (`index.html`, `config/`) |
| `feedback.js` | `App.feedback.{success, encourage, celebrate}` | solo el `app.js` de la actividad |

El orden de carga es `utils.js â†’ i18n.js â†’ tts.js â†’ storage.js â†’
feedback.js â†’ strings.<locale>.js â†’ data.js â†’ app.js`. `i18n.js`
debe cargar **antes** que `tts.js` y `feedback.js`, que leen
el idioma activo.

Tanto `strings.es.js` como `strings.en.js` cargan siempre (no
estÃ¡n gateados por `locale`); `App.i18n.locale()` decide cuÃ¡l
estÃ¡ activo. El locale se elige primero de
`localStorage['teclatlon:locale']`, luego de `navigator.language`
(fallback `'es'`).

### 12.3 El contrato de la PWA

El service worker es **network-first, cache-fallback**,
declarado en `sw.js` y commiteado junto a `manifest.json`. El
contrato:

```javascript
var VERSION = 'teclatlon-vN';
var FILES = [
  './index.html',
  './404.html',
  './manifest.json',
  './app.js',
  './data.js',
  './strings.es.js',
  './strings.en.js',
  './styles.css',
  /* una entrada por fichero del shell, incluyendo cada
     index.html / styles.css / par strings.<locale>.js de las
     pÃ¡ginas standalone */
  './legal/index.html',
  './legal/styles.css',
  './legal/strings.es.js',
  './legal/strings.en.js',
  /* â€¦about/, team/, config/ igualâ€¦ */
  './assets/css/tokens.css',
  './assets/css/base.css',
  './assets/css/components.css',
  './assets/fonts/â€¦woff2',
  './assets/js/utils.js',
  './assets/js/i18n.js',
  './assets/js/tts.js',
  './assets/js/storage.js',
  './assets/js/feedback.js',
  './assets/img/icono.svg'
];
```

Dos reglas gobiernan cambios en `FILES`:

1. **Fichero nuevo â†’ aÃ±adirlo a `FILES`.** El handler
   `install` mete cada fichero individualmente (nunca
   `cache.addAll`, que aborta en el primer fallo y rompe la
   cache para todos).
2. **Cualquier cambio en un fichero cacheado â†’ bumpear
   `VERSION`** (`'teclatlon-vN'` â†’ `'teclatlon-vN+1'`). Sin el
   bump, un usuario offline queda atascado en la versiÃ³n
   vieja para siempre, porque el handler `activate` solo
   purga caches con un nombre distinto.

`scripts/check-version-bump.js` aplica (2): hace
`git show HEAD:sw.js` para ver quÃ© `VERSION` habÃ­a en el
Ãºltimo commit, lo compara contra el `VERSION` actual, y
verifica que `FILES` y el diff contra HEAD coincidan. Si no
coinciden, el script falla y el job `cache-bump` de CI
tambiÃ©n falla.

Cada pÃ¡gina standalone tambiÃ©n ejecuta
`navigator.serviceWorker.register('../sw.js')` desde su
script inline, asÃ­ una visita directa a `/legal/`,
`/about/` o `/team/` prima el SW para la raÃ­z de la SPA del
mismo modo que hace `index.html`.

### 12.4 Invariantes de i18n

Estas son no negociables en toda la suite. Un cambio de
locale estÃ¡ incompleto hasta que **todos** los ficheros de
esta lista estÃ©n actualizados:

1. `assets/js/i18n.js#SUPPORTED` y `#DEFAULT_LOCALE`.
2. `assets/js/i18n.js#BCP47` (para selecciÃ³n de voz en
   `speechSynthesis`).
3. El detector pre-paint en `index.html` (el `<script>`
   inline que elige el locale antes del primer paint â€” ver
   §2.5 arriba).
4. `strings.<locale>.js` y cada par `strings.<locale>.js`
   por carpeta (`legal/`, `about/`, `team/`, `config/`).
5. `data.js`: cada array dividido por locale
   (`DATA.lessons.<locale>`, `DATA.words.<locale>`,
   `DATA.templates.<locale>`, `DATA.numpadSteps.<locale>`).
6. `sw.js`: aÃ±adir los nuevos `strings.<locale>.js` a
   `FILES` y bumpear `VERSION`.
7. `scripts/check.js`: la verificaciÃ³n de paridad funciona
   en N locales sin cambios de cÃ³digo (los coge todos vÃ­a
   `fs.readdirSync`); confirmar que el script sigue pasando
   tras aÃ±adir el locale.

La receta paso a paso completa (con cÃ³digo de ejemplo) estÃ¡
en [`I18N.md`](I18N.md).

### 12.5 Lo que estÃ¡ **prohibido** (en toda la suite)

Estos son antipatrones observados en algÃºn momento y
retirados explÃ­citamente; el historial de commits es la fuente
de verdad de cada retirada. La regla es: "si te ves tentado
de usar uno de estos, para y vuelve a leer esta secciÃ³n".

- **Sin SPA / sin `pushState` / sin secciones `view-*`.**
  Cada pÃ¡gina es su propia URL. No fusionar `legal/`,
  `about/`, `team/` dentro de `index.html` como secciones
  ocultas, ni siquiera con un redirect shim. Se intentÃ³ en
  2026-09 (`spa: merge`) y se revirtiÃ³ en la misma release;
  ver `git log` para las lecciones aprendidas. La
  navegaciÃ³n entre pÃ¡ginas debe ser siempre un clic real en
  un `<a>`, y cada ruta oculta debe estar a un clic de
  cualquier otra vÃ­a el pie compartido.
- **Sin `App.goLegal` / `App.goAbout` / `view-legal` /
  `view-about` / `sp-legal` / `sp-about` / `sp-idioma` /
  `subpages.css`.** Todos pertenecen al modelo de fusiÃ³n
  SPA retirado.
- **Sin `_redirects` SPA catch-all.** Cloudflare lo
  rechaza como loop; documentado en `CLOUDFLARE.md` y en
  la receta de deploy.
- **Sin flash de `data-app-blocked="mobile"`.** El script
  pre-paint es un Ãºnico `<script>` inline en `<head>`; no
  lo dividas en un `.js` aparte (CSP `script-src 'self'`
  lo permitirÃ­a, pero la garantÃ­a de timing sÃ­ncrono solo
  se cumple con scripts inline en la cabeza).
- **Sin `package.json`, sin `node_modules`.** El repo es
  el output de build. Un package manifest forzarÃ­a a
  Cloudflare a ejecutar `npm install` en cada build,
  sobrepasando el lÃ­mite de 25 MiB de assets.
- **Sin CDNs de JS.** Todas las fuentes, iconos y JS
  vienen en `assets/`.
- **Sin imports de ES modules** (`<script type="module">`).
  La app debe funcionar desde `file://` para uso offline;
  los ES modules rompen eso.
- **Sin base de datos en tiempo real, sin login, sin
  cookies, sin analÃ­tica.** La persistencia es solo
  `localStorage`.
- **Sin teclado en pantalla tÃ¡ctil** en apps que apuntan
  al teclado fÃ­sico del ordenador (Teclatlon, importes
  tipeados de Okeymoney, palabras tipeadas de Sinonimia).
  El teclado en pantalla es solo decorativo.

### 12.6 Checklist de validaciÃ³n

Ejecutar esto en cada PR que toque cualquiera de los
ficheros de superficie (`*.html`, `*.js`, `*.css`, `sw.js`,
`manifest.json`, `data.js`):

```bash
node scripts/check.js           # debe reportar OK (N checks, sin fallos)
node scripts/check-version-bump.js   # debe pasar
```

DespuÃ©s abrir las pÃ¡ginas afectadas en un navegador en
`http://localhost:<puerto>/<ruta>` y recorrer el smoke
manual:

- `index.html` arranca en la pantalla de nombre o en el menÃº
  segÃºn el estado guardado; el roundtrip de `localStorage`
  funciona; el botÃ³n "ðŸ—‘ï¸ Borrar mi progreso" resetea tanto
  los datos como la UI.
- `/legal/` carga con el h1, lema y pie localizados; el
  selector de idioma cambia `lang`, `document.title` y cada
  texto `data-i18n` sin parpadeo de valores antiguos.
- `/about/` y `/team/` igual; sus enlaces del pie navegan
  entre ellos y a `/legal/` y `/config/` sin recargas
  antes de que el SW se prime.
- `/config/` lista el estado guardado y sus dos botones de
  reset funcionan (confirmaciÃ³n en dos pasos).
- Refrescar una vez tras la primera carga y verificar que
  `navigator.serviceWorker.controller` no es null.

Si algo falla, el cambio no encaja con el patrÃ³n de la suite
y debe revisarse antes de aterrizarlo.

### 12.7 Diferencias entre repos (lo que esta secciÃ³n **no** cubre)

Cada app es una variante de una sola actividad del patrÃ³n de
arriba. Las diferencias por app â€” quÃ© se comparte con la
suite, quÃ© se adelgaza, y quÃ© es intencionalmente distinto â€”
se documentan en el `tecnico.md` § "Other apps of the suite:
real differences" (la "diferencia especÃ­fica del proyecto")
de cada repo. Usa esa secciÃ³n para decidir si una
desviaciÃ³n en un repo es intencional antes de copiarla a
otro.

Esta secciÃ³n canÃ³nica vive en el `tecnico.md` /
`technical.md` de **todos los repos** de la suite, mantenida
en sincronÃ­a. Si la cambias en un repo, espejÃ©ala en los
demÃ¡s en el mismo PR.

### 12.8 Ver tambiÃ©n

- §2 arriba â€” Recetas y contratos especÃ­ficos de Teclatlon
  que se construyen sobre este patrÃ³n.
- [`I18N.md`](I18N.md) â€” CÃ³mo aÃ±adir un idioma manteniendo
  las invariantes de i18n intactas.
- [`CLOUDFLARE.md`](../../CLOUDFLARE.md) â€” Contratos de
  deploy y SW/headers a nivel de Cloudflare Workers.
- [`SPEC.md`](SPEC.md) §"Mandatory rule" â€” Las invariantes
  de accesibilidad y "ninguna menciÃ³n clÃ­nica" que cada
  pÃ¡gina debe respetar.

---


