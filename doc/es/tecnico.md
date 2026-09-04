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
scripts/check.js  validación local y de CI
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
contenido. Cuando cambia un diccionario, `scripts/check.js` indica el hash
que debe ponerse en `index.html` y `404.html`. No usar versiones manuales ni
añadir un bundler solo para resolver esta caché.

## Tipografía

La interfaz usa dos tipografías autoalojadas en `css/fonts/`:

- **Atkinson Hyperlegible** (pesos 400 y 700) — para zonas de alto contraste
  y etiquetas cortas, elegida por la desambiguación de letras que ayuda a
  personas con baja visión.
- **Nunito** (variable, rango de peso 400–900) — para cuerpo de texto y
  flujos de lectura, por el tono humanista cálido que mantiene los textos
  largos en un registro cercano.

Ambas fuentes tienen licencia SIL OFL 1.1 y se distribuyen como `.woff2` en
`css/fonts/`. La CSS las expone a través de la variable `--fuente`, definida
en `:root` con la pila
`'Atkinson Hyperlegible', 'Nunito', "Segoe UI", Verdana, Arial, sans-serif`
y aplicada en `body` (y en la vista `about/privacidad.html`) con
`font-family: var(--fuente)`. Los bloques `@font-face` usan `font-display:
swap` para que el primer pintado no se bloquee por la carga de la fuente.

Esto coincide con el resto de la suite (Apptonomia, Calculia, Memofun,
Okeymoney, Teclatlon, Routime): cada PWA de Miralante envía las mismas dos
tipografías, autoalojadas, nunca desde una CDN.

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
- `situacion` es una de estas once claves compartidas: `tramites`, `salud`,
  `vida-diaria`, `finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`,
  `seguridad`, `educacion`, `conocimiento`.
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
| `conocimiento` | 2450 | libro |

No dejar una palabra abstracta con una imagen elegida por casualidad.

## 9. Gamificación en el código

La palabra del día, "sorpréndeme", el progreso, la frase propia y los juegos
se implementan en `js/app.js` mediante `renderGameMenu`, `renderWordGame` y
`renderSentenceGame`. Todos leen `activeDictionary` y no tienen casos
especiales por idioma. Las reglas de producto que limitan cualquier juego
nuevo están en [`SPEC.md`](SPEC.md).

## 10. Validación

Ejecutar `node scripts/check.js` en local y en CI
(`.github/workflows/check.yml`). El script comprueba:

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

## 12. Patrón de la suite — cómo se construye cada app de Miralante

> 🌐 **Other language:** [English](../en/technical.md#8-suite-pattern-how-every-app-of-miralante-is-built)

Esta sección es la **guía canónica y transversal** de cómo se
construye y mantiene cada app de la [suite Miralante](https://apptonomia.uk).
Es la fuente de verdad que prevalece sobre el `technical.md`
(tecnico.md) de cualquier repo cuando entran en conflicto,
porque el objetivo es mantener las siete apps hermanas
(Apptonomia, Calculia, Memofun, Okeymoney, Sinonimia, Teclatlon,
Routime) consistentes: misma forma, mismas convenciones,
mismo deploy, mismo i18n, mismo comportamiento offline.

Un cambio en esta sección es un **cambio transversal a la
suite** y debe aplicarse a todos los repos. Un cambio en
otras secciones de este archivo es específico del proyecto y
se queda ahí.

> **Fuente de verdad de las reglas de producto** en este
> repo: [`SPEC.md`](SPEC.md).
> **Fuente de verdad del i18n**: [`I18N.md`](I18N.md).
> Esta sección **no** redefine esas; codifica el patrón que
> todas comparten.

### 12.0 El patrón en un párrafo

Cada app de la suite Miralante es una **PWA estática, sin
dependencias y offline-first**, construida a partir del mismo
esqueleto mínimo:

1. Un conjunto pequeño de **páginas HTML standalone** en la
   raíz del repo (una sola actividad) o bajo `tools/<slug>/`
   (hubs multi-actividad).
2. Cada página es una **URL real y navegable** — **no hay
   routing SPA**, ni cambio de vista en la misma página, ni
   `pushState`. Cada página se recarga al entrar; la
   navegación entre páginas es un clic normal en un `<a>`.
3. Las rutas ocultas (`about/`, `team/`, `legal/`, `config/`)
   comparten la misma forma: `index.html` + `styles.css` + par
   `strings.<locale>.js`, con **interlinking en el pie** para
   que cualquiera de ellas esté a un clic de cualquier otra.
4. Un **service worker** (`sw.js`, network-first) cachea el
   shell (lista `FILES`, `VERSION` bumped) para que la app
   funcione offline.
5. **Sin paso de build**, sin `package.json`, sin frameworks,
   sin bundlers, sin CDNs de JS. La raíz del repo es el
   output de deploy.

### 12.1 La forma de las páginas standalone

Este es el patrón que siguen todas las rutas ocultas y todas
las rutas públicas. La forma es idéntica en la suite; solo
cambian los contenidos.

#### 12.1.1 El esqueleto de cinco carpetas

Cada app expone las mismas cinco carpetas:

```
<app>/
  index.html              # Entrada pública (la actividad)
  app.js                  # Lógica
  data.js                 # Layouts sin locale + contenido por locale
  strings.es.js           # Textos UI en español (fuente de verdad)
  strings.en.js           # Textos UI en inglés
  styles.css              # Estilos específicos de la app
  assets/
    css/{tokens,base,components}.css
    fonts/                # Atkinson Hyperlegible + Nunito autohospedados
    img/                  # Icono de la app + imágenes decorativas
    js/{utils,i18n,tts,storage,feedback}.js
  about/                  # Ruta oculta: presentación
    index.html
    styles.css
    strings.es.js
    strings.en.js
  team/                   # Ruta oculta: quiénes la hacen
    index.html
    styles.css
    strings.es.js
    strings.en.js
  legal/                  # Página de protección de datos (enlazada desde el pie)
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
`index.html` en la raíz del repo. Las apps multi-actividad
(Apptonomia, Calculia) ponen `tools/<slug>/index.html` por
actividad y un landing `site/index.html`; las cuatro carpetas
ocultas viven en la raíz del repo.

#### 12.1.2 La concha HTML de una página standalone

Cada página standalone abre con el mismo boilerplate. Abajo,
la **plantilla**; las desviaciones se indican donde apliquen.

```html
<!DOCTYPE html>
<html lang="es" data-i18n-title="pageTitle">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sinonimia — Sobre este proyecto</title>
  <!-- Hidden route: not linked from the main menu and should not be
       indexed. Aimed at anyone who wants to know what Teclatlon is:
       families, professionals, journalists, funders, contributors. -->
  <meta name="robots" content="noindex, nofollow">
  <meta name="description" content="…">
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
                data-locale="es" aria-pressed="false">🇪🇸 Español</button>
        <button type="button" class="btn-idioma" id="btnIdiomaEn"
                data-locale="en" aria-pressed="false">🇬🇧 English</button>
      </div>
      <img src="../assets/img/icono.svg" alt="" width="80" height="80"
           class="logo-{legal|about}">
      <h1>…</h1>
      <p class="lema" data-i18n="tagline">…</p>
      <p class="entradilla" data-i18n="lead">…</p>
      <nav class="indice">…opcional, solo en páginas largas…</nav>
    </header>

    <main class="pila">
      <section class="card">…</section>
    </main>

    <footer class="pie-{legal|about}">
      <a class="btn btn-secundario" href="../"
         data-i18n="footerActivities">Ir a la aplicación</a>
      <a class="btn btn-secundario" href="../legal/"
         data-i18n="footerDataProtection">Protección de datos</a>
      <a class="btn btn-secundario" href="../about/"
         data-i18n="footerAbout">Sobre este proyecto</a>
      <a class="btn btn-secundario" href="../team/"
         data-i18n="footerTeamGuide">Quiénes la hacen</a>
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
  pestaña del navegador mostraría antes de que i18n.js se
  ejecute (y el fallback de la cache del SW).
- La clase propia de la página en el wrapper
  `<div class="container …">` es bajo la que `styles.css` de
  la página scopea sus reglas (`legal-page`, `about-page`,
  `team-page`). Sin prefijos ancestro `.sp-*` (eran residuo
  de la fusión SPA, retirado en 2026-09; ver `git log`).
- El pie es **siempre** los mismos cinco enlaces (en el mismo
  orden) en `about/`, `team/` y `legal/`. `config/` tiene un
  pie reducido que solo vuelve a la SPA. La raíz de la app
  (`index.html`) **no** renderiza este pie (tiene su propio
  pie con el botón de reset y el enlace a protección de datos
  — ver §2 arriba).

#### 12.1.3 El par de strings

Cada carpeta standalone trae su propio par `strings.es.js` /
`strings.en.js`. Siguen el patrón **clave plana,
IIFE-register**; `scripts/check.js` extrae el diccionario vía
`vm.createContext` con un stub `App.i18n.register` y verifica
la paridad de claves entre locales.

```javascript
/* legal/strings.es.js — texto de la página (ES). */
(function () {
  'use strict';
  App.i18n.register({
    pageTitle: 'Protección de datos',
    pageDescription: 'Teclatlon: qué datos guarda, dónde y por qué. …',
    routeNotice: 'Esta página no se enlaza desde la aplicación. …',
    tagline: 'Sin registro. Sin cookies. Sin analítica.',
    lead: 'Teclatlon no pide tus datos personales. …',
    navResponsible: 'Quién trata tus datos',
    navData: 'Qué guardamos',
    /* …más claves… */
    footerActivities: 'Ir a la aplicación',
    footerAbout: 'Sobre este proyecto',
    footerTeamGuide: 'Quiénes la hacen',
    footerSettings: 'Ajustes'
  }, 'es');
})();
```

Las claves son planas (sin namespacing tipo
`legal.pageTitle`); la página **es** el namespace, porque el
archivo vive en su propia carpeta. Las claves comunes
(`core.back`, `core.listen`, `core.dataProtection`) ya vienen
en `assets/js/i18n.js` y no se redefinen aquí.

#### 12.1.4 La hoja de estilos standalone

Cada carpeta standalone trae su propio `styles.css`. Es **el
antiguo `assets/css/subpages.css` dividido por página**, con
los prefijos ancestro `.sp-legal` / `.sp-about` eliminados
(eran residuo de la fusión SPA). La clase wrapper de la
página (`<div class="legal-page">`, `<div class="about-page">`,
etc.) es la que usa el CSS para scope:

```css
.legal-page { max-width: 880px; }
.legal-page .cabecera-legal { … }
.legal-page .indice a { … }
.legal-page section { … }
```

**No** introduzcas nombres de clase por página que colisionen
con los componentes compartidos (`base.css` ya define
`.cabecera`, `.lema`, `.indice`, `.btn`, `.card`, `.pila`, …).
Cuando la página standalone necesite un aspecto distinto,
scopea la regla bajo la clase de la página — nunca bajo un
`.cabecera` o `.indice` genérico.

### 12.2 El núcleo compartido

Cada app de la suite trae los mismos seis ficheros bajo
`assets/js/`, en el mismo orden de carga, con la misma forma
exportada. Adelgazar está permitido; **añadir** funcionalidad
de vuelta está prohibido a menos que sirva a una necesidad
concreta (las notas de adelgazamiento en §2.1 arriba son la
justificación canónica).

| Módulo | Superficie | Requerido por |
|---|---|---|
| `utils.js` | `App.utils.shuffle / $ / $$ / reducedMotion / wakeLock` | cada página |
| `i18n.js` | `App.i18n.{locale, setLocale, lang, register, t, pick, apply, SUPPORTED, DEFAULT_LOCALE, LABEL, FLAG}` | cada página |
| `tts.js` | `App.tts.speak` | solo páginas que leen en voz alta (la mayoría) |
| `storage.js` | `App.storage.{get, set, remove}` | solo páginas que leen o escriben `localStorage` (`index.html`, `config/`) |
| `feedback.js` | `App.feedback.{success, encourage, celebrate}` | solo el `app.js` de la actividad |

El orden de carga es `utils.js → i18n.js → tts.js → storage.js →
feedback.js → strings.<locale>.js → data.js → app.js`. `i18n.js`
debe cargar **antes** que `tts.js` y `feedback.js`, que leen
el idioma activo.

Tanto `strings.es.js` como `strings.en.js` cargan siempre (no
están gateados por `locale`); `App.i18n.locale()` decide cuál
está activo. El locale se elige primero de
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
     páginas standalone */
  './legal/index.html',
  './legal/styles.css',
  './legal/strings.es.js',
  './legal/strings.en.js',
  /* …about/, team/, config/ igual… */
  './assets/css/tokens.css',
  './assets/css/base.css',
  './assets/css/components.css',
  './assets/fonts/…woff2',
  './assets/js/utils.js',
  './assets/js/i18n.js',
  './assets/js/tts.js',
  './assets/js/storage.js',
  './assets/js/feedback.js',
  './assets/img/icono.svg'
];
```

Dos reglas gobiernan cambios en `FILES`:

1. **Fichero nuevo → añadirlo a `FILES`.** El handler
   `install` mete cada fichero individualmente (nunca
   `cache.addAll`, que aborta en el primer fallo y rompe la
   cache para todos).
2. **Cualquier cambio en un fichero cacheado → bumpear
   `VERSION`** (`'teclatlon-vN'` → `'teclatlon-vN+1'`). Sin el
   bump, un usuario offline queda atascado en la versión
   vieja para siempre, porque el handler `activate` solo
   purga caches con un nombre distinto.

`scripts/check-version-bump.js` aplica (2): hace
`git show HEAD:sw.js` para ver qué `VERSION` había en el
último commit, lo compara contra el `VERSION` actual, y
verifica que `FILES` y el diff contra HEAD coincidan. Si no
coinciden, el script falla y el job `cache-bump` de CI
también falla.

Cada página standalone también ejecuta
`navigator.serviceWorker.register('../sw.js')` desde su
script inline, así una visita directa a `/legal/`,
`/about/` o `/team/` prima el SW para la raíz de la SPA del
mismo modo que hace `index.html`.

### 12.4 Invariantes de i18n

Estas son no negociables en toda la suite. Un cambio de
locale está incompleto hasta que **todos** los ficheros de
esta lista estén actualizados:

1. `assets/js/i18n.js#SUPPORTED` y `#DEFAULT_LOCALE`.
2. `assets/js/i18n.js#BCP47` (para selección de voz en
   `speechSynthesis`).
3. El detector pre-paint en `index.html` (el `<script>`
   inline que elige el locale antes del primer paint — ver
   §2.5 arriba).
4. `strings.<locale>.js` y cada par `strings.<locale>.js`
   por carpeta (`legal/`, `about/`, `team/`, `config/`).
5. `data.js`: cada array dividido por locale
   (`DATA.lessons.<locale>`, `DATA.words.<locale>`,
   `DATA.templates.<locale>`, `DATA.numpadSteps.<locale>`).
6. `sw.js`: añadir los nuevos `strings.<locale>.js` a
   `FILES` y bumpear `VERSION`.
7. `scripts/check.js`: la verificación de paridad funciona
   en N locales sin cambios de código (los coge todos vía
   `fs.readdirSync`); confirmar que el script sigue pasando
   tras añadir el locale.

La receta paso a paso completa (con código de ejemplo) está
en [`I18N.md`](I18N.md).

### 12.5 Lo que está **prohibido** (en toda la suite)

Estos son antipatrones observados en algún momento y
retirados explícitamente; el historial de commits es la fuente
de verdad de cada retirada. La regla es: "si te ves tentado
de usar uno de estos, para y vuelve a leer esta sección".

- **Sin SPA / sin `pushState` / sin secciones `view-*`.**
  Cada página es su propia URL. No fusionar `legal/`,
  `about/`, `team/` dentro de `index.html` como secciones
  ocultas, ni siquiera con un redirect shim. Se intentó en
  2026-09 (`spa: merge`) y se revirtió en la misma release;
  ver `git log` para las lecciones aprendidas. La
  navegación entre páginas debe ser siempre un clic real en
  un `<a>`, y cada ruta oculta debe estar a un clic de
  cualquier otra vía el pie compartido.
- **Sin `App.goLegal` / `App.goAbout` / `view-legal` /
  `view-about` / `sp-legal` / `sp-about` / `sp-idioma` /
  `subpages.css`.** Todos pertenecen al modelo de fusión
  SPA retirado.
- **Sin `_redirects` SPA catch-all.** Cloudflare lo
  rechaza como loop; documentado en `CLOUDFLARE.md` y en
  la receta de deploy.
- **Sin flash de `data-app-blocked="mobile"`.** El script
  pre-paint es un único `<script>` inline en `<head>`; no
  lo dividas en un `.js` aparte (CSP `script-src 'self'`
  lo permitiría, pero la garantía de timing síncrono solo
  se cumple con scripts inline en la cabeza).
- **Sin `package.json`, sin `node_modules`.** El repo es
  el output de build. Un package manifest forzaría a
  Cloudflare a ejecutar `npm install` en cada build,
  sobrepasando el límite de 25 MiB de assets.
- **Sin CDNs de JS.** Todas las fuentes, iconos y JS
  vienen en `assets/`.
- **Sin imports de ES modules** (`<script type="module">`).
  La app debe funcionar desde `file://` para uso offline;
  los ES modules rompen eso.
- **Sin base de datos en tiempo real, sin login, sin
  cookies, sin analítica.** La persistencia es solo
  `localStorage`.
- **Sin teclado en pantalla táctil** en apps que apuntan
  al teclado físico del ordenador (Teclatlon, importes
  tipeados de Okeymoney, palabras tipeadas de Sinonimia).
  El teclado en pantalla es solo decorativo.

### 12.6 Checklist de validación

Ejecutar esto en cada PR que toque cualquiera de los
ficheros de superficie (`*.html`, `*.js`, `*.css`, `sw.js`,
`manifest.json`, `data.js`):

```bash
node scripts/check.js           # debe reportar OK (N checks, sin fallos)
node scripts/check-version-bump.js   # debe pasar
```

Después abrir las páginas afectadas en un navegador en
`http://localhost:<puerto>/<ruta>` y recorrer el smoke
manual:

- `index.html` arranca en la pantalla de nombre o en el menú
  según el estado guardado; el roundtrip de `localStorage`
  funciona; el botón "🗑️ Borrar mi progreso" resetea tanto
  los datos como la UI.
- `/legal/` carga con el h1, lema y pie localizados; el
  selector de idioma cambia `lang`, `document.title` y cada
  texto `data-i18n` sin parpadeo de valores antiguos.
- `/about/` y `/team/` igual; sus enlaces del pie navegan
  entre ellos y a `/legal/` y `/config/` sin recargas
  antes de que el SW se prime.
- `/config/` lista el estado guardado y sus dos botones de
  reset funcionan (confirmación en dos pasos).
- Refrescar una vez tras la primera carga y verificar que
  `navigator.serviceWorker.controller` no es null.

Si algo falla, el cambio no encaja con el patrón de la suite
y debe revisarse antes de aterrizarlo.

### 12.7 Diferencias entre repos (lo que esta sección **no** cubre)

Cada app es una variante de una sola actividad del patrón de
arriba. Las diferencias por app — qué se comparte con la
suite, qué se adelgaza, y qué es intencionalmente distinto —
se documentan en el `tecnico.md` § "Other apps of the suite:
real differences" (la "diferencia específica del proyecto")
de cada repo. Usa esa sección para decidir si una
desviación en un repo es intencional antes de copiarla a
otro.

Esta sección canónica vive en el `tecnico.md` /
`technical.md` de **todos los repos** de la suite, mantenida
en sincronía. Si la cambias en un repo, espejéala en los
demás en el mismo PR.

### 12.8 Ver también

- §2 arriba — Recetas y contratos específicos de Teclatlon
  que se construyen sobre este patrón.
- [`I18N.md`](I18N.md) — Cómo añadir un idioma manteniendo
  las invariantes de i18n intactas.
- [`CLOUDFLARE.md`](../../CLOUDFLARE.md) — Contratos de
  deploy y SW/headers a nivel de Cloudflare Workers.
- [`SPEC.md`](SPEC.md) §"Mandatory rule" — Las invariantes
  de accesibilidad y "ninguna mención clínica" que cada
  página debe respetar.

---


