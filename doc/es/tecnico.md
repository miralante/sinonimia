# Sinonimia — Arquitectura técnica

Esta es la referencia técnica para quien desarrolle sobre el código de
Sinonimia. Para saber QUÉ es el producto, PARA QUIÉN es y las reglas de
contenido que debe cumplir cada palabra del diccionario, consulta
[`SPEC.md`](SPEC.md) (o [`../en/SPEC.md`](../en/SPEC.md)) — ese documento
es la fuente de la verdad para las decisiones de producto y contenido;
este lo es para cómo está construido el sistema.

## Política de idioma del proyecto

Esto es una convención de todo el proyecto, no una elección de estilo
puntual:

- **Inglés** para todo el lenguaje técnico: identificadores de código
  (nombres de funciones, variables), comentarios de código, este
  documento, `CLAUDE.md` y cualquier otra documentación de ingeniería.
- **Español e inglés** para el producto de cara al usuario: el contenido
  del diccionario (`js/data.es.js`, `js/data.en.js`) y los textos de la
  interfaz (`js/i18n.js`), cada uno en su propio idioma.

En resumen: si abres el archivo en un editor de texto, debería leerse como
una base de código en inglés; si abres la web, debería leerse como un
diccionario en español o en inglés, según el idioma que haya elegido quien
visita la web.

### Excepciones de nomenclatura (leer antes de renombrar algo)

Algunos identificadores son palabras en español y **se quedan así a
propósito**, porque son contratos de datos compartidos, no detalles de
implementación:

- **Nombres de campo del esquema del diccionario** — `palabra`,
  `definicion`, `imagen`, `sinonimos`, `ejemplo`, `ejemploSinonimo`,
  `situacion` en cada entrada de `js/data.<idioma>.js`. Renombrarlos
  tocaría las 44+ entradas del diccionario en cada archivo de idioma y la
  documentación del esquema en `doc/*/SPEC.md` y
  `../../CONTRIBUTING.md`/`../../CONTRIBUTING.es.md`, que enseñan a quien
  contribuye a añadir una palabra usando exactamente estos nombres de
  campo.
- **Las claves de `I18N`** en `js/i18n.js` (por ejemplo `heroEtiqueta`,
  `buscarPlaceholder`, `tema_tramites`) — referenciadas tal cual en los
  atributos `data-i18n="..."` de `index.html` y en las llamadas
  `t("...")` de `js/app.js`. Renombrarlas implica tocar cada referencia a
  la vez en tres archivos.
- **Los atributos `id`/`class` de HTML y sus selectores CSS** (por
  ejemplo `#vista-lista`, `.tarjeta`, `.boton-cta`) — compartidos
  literalmente entre `index.html`, `css/styles.css`, y los literales de
  cadena que `js/app.js` pasa a `getElementById` / `className`.
- **Los nombres de las claves de `localStorage`** (por ejemplo
  `sinonimia-idioma`, `sinonimia-aprendidas-<idioma>`) — un contrato de
  datos persistido; renombrarlas descartaría en silencio el progreso ya
  guardado de cualquiera.
- **Los segmentos de ruta `"palabra"` / `"juego"`** en el enrutador de
  hash (`#/<idioma>/palabra/<id>`, `#/<idioma>/juego`) — deliberadamente
  no se traducen por idioma, para que la forma de la ruta se mantenga
  idéntica en cualquier idioma (`#/en/palabra/rectify`, no
  `#/en/word/rectify`). Es un token de enrutado, no texto de cara al
  usuario.

Todo lo demás — nombres de función, variables locales, parámetros, y
cualquier comentario en `js/app.js`, `js/i18n.js`, `js/data.*.js`,
`css/styles.css` y `scripts/validar.js` — está en inglés. Si añades código
nuevo, sigue esa norma; si tocas una de las excepciones de arriba, tócala
en todos los sitios donde se usa o en ninguno.

## Visión general del sistema

Sinonimia es un sitio estático: HTML, CSS y JavaScript sin frameworks, sin
paso de compilación, sin bundler, sin dependencias en tiempo de ejecución.
Funciona abriendo `index.html` en un navegador o sirviendo la carpeta con
cualquier servidor estático. `scripts/validar.js` (Node, sin
dependencias) es la única herramienta del repositorio, y solo se ejecuta
al hacer commit o en CI — nunca se ejecuta en el navegador.

```
index.html          marcado de cada vista + enganches data-i18n
css/styles.css       todos los estilos (propiedades personalizadas para el tema)
js/i18n.js           textos de la interfaz, por idioma
js/data.es.js        entradas del diccionario en español
js/data.en.js        entradas del diccionario en inglés
js/app.js            toda la app cliente (enrutador, renderizado, estado)
img/<arasaac-id>.png pictogramas
scripts/validar.js   el script de validación de CI/local
```

## Despliegue

Sinonimia se despliega en **Cloudflare Pages** (no en Cloudflare
Workers, ni en un hosting estático genérico). La distinción importa
cuando depuras un despliegue o añades una funcionalidad de runtime:

- Pages sirve el repositorio tal cual: no hay paso de compilación,
  ni bundler, ni edge function, ni Worker. Cada archivo
  HTML/CSS/JS en la raíz del repositorio (y en `about/`, para las
  páginas `/about/*`) se publica sin transformar.
- La configuración vive en dos sitios. **`_headers`** en la raíz
  del repositorio se lee en cada despliegue y aplica las
  cabeceras de seguridad (CSP, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-*`) y la `Cache-Control`
  inmutable de un año para `js/data.*`, `css/*`, `img/*`,
  `js/app.js` y `js/i18n.js`. La CSP es la más estricta correcta
  que aún permite que la app funcione — consulta los comentarios
  directiva por directiva en `_headers` para el rationale,
  incluido por qué mantenemos un único `style-src` en lugar de
  dividir en `style-src-elem` (Safari tenía soporte inconsistente).
- **`wrangler.toml`** fija el nombre del proyecto Pages
  (`name = "sinonimia"`) y el directorio de publicación
  (`pages_build_output_dir = "."`) para que un
  `wrangler pages deploy . --project-name=sinonimia` manual desde
  una máquina de desarrollo haga lo mismo que la integración de
  GitHub de Cloudflare en cada push a `main`. La CLI de wrangler
  **no** sabe que es un proyecto Pages, así que un
  `wrangler deploy` a secas falla con `Missing entry-point to
  Worker script or to assets directory` — usa la subcomando de
  Pages en su lugar.

Los detalles operativos (configuración en el dashboard, rollback,
dominios personalizados, el historial de la migración de Workers a
Pages) viven en [`../../DEPLOY.md`](../../DEPLOY.md), no aquí — este
documento solo cubre lo que afecta al código.

### Qué implica esto para el código

- **No hay runtime en el servidor.** Ni Worker, ni Functions, ni
  edge handlers. Cada funcionalidad que añadas tiene que correr
  en el navegador, o pre-calcularse al editar contenido y
  entregarse en un archivo estático. Por eso el pipeline de
  validación, el censo de contenido, el buscador de pictogramas y
  el inyector de traducciones son todos `node scripts/*.js`
  invocados en local/CI, no endpoints de servidor.
- **Sin variables de entorno ni secretos en runtime.** La app no
  hace llamadas de servidor; `OPENSYMBOLS_SECRET` (usada por
  `scripts/buscar-pictograma.js` para hablar con OpenSymbols)
  solo se lee del entorno de shell de quien desarrolla, en
  momento de editar contenido.
- **La caché se direcciona por ruta, no por hash.** El HTML se
  cachea según el default (así las personas ven las
  actualizaciones al recargar); el diccionario, CSS, imágenes y
  los dos scripts no-de-datos se cachean un año con `immutable`.
  Para romper la caché cuando cambie el esquema del diccionario,
  renombra el archivo (`js/data.es.v2.js`) y actualiza la
  etiqueta `<script>` en `index.html` en el mismo commit. No
  añadas un paso de bundler con hashes solo para arreglar un
  problema de caché — renombra el archivo.

## Navegadores soportados

Sinonimia tiene como objetivo los **navegadores de escritorio
evergreen** (Chrome, Edge, Firefox) **más Safari en macOS e
iOS/iPadOS**. El iPad es el dispositivo más habitual en los
entornos de terapia ocupacional a los que el proyecto va
dirigido, y en iPhone Safari es el navegador por defecto — el
soporte de Safari no es opcional, forma parte de la definición de
"funciona".

En la práctica esto significa:

- **Sin transpilación, sin polyfills, sin bundler.** El sitio
  envía el JavaScript tal y como se escribe, servido como
  módulos ES mediante `<script src="...">`. Las
  características del lenguaje realmente usadas son
  `const`/`let`, arrow functions, template literals,
  destructuring, spread, `Array.prototype.includes` / `find` /
  `filter` / `map`, `Object.entries`, `localStorage`,
  `URLSearchParams` y las APIs del DOM que invocan. Todo eso
  lleva años en Safari. Si quieres usar algo más reciente
  (top-level `await`, `?.` en WebKit antiguo, `structuredClone`,
  la propuesta Temporal, etc.), comprueba en
  [caniuse.com](https://caniuse.com) la versión de iOS Safari
  que aún recibe actualizaciones en tu país objetivo antes de
  añadirlo — no la última versión de Safari en macOS.
- **Sin paso de build no hay auto-prefijado.** Cuando añadas
  una característica de CSS que solo lleva prefijo en WebKit
  (`-webkit-*`), tienes que añadir la propiedad con prefijo a
  mano junto a la sin prefijo. `css/styles.css` es la única
  hoja de estilos, así que la auditoría es de un solo archivo.
- **La CSP en `_headers` ya está moldeada alrededor de Safari.**
  El bloque de comentarios sobre la línea de
  `Content-Security-Policy` señala que usamos un único
  `style-src` a propósito porque Safari tenía soporte
  inconsistente para `style-src-elem`. El emparejamiento
  `Cross-Origin-Resource-Policy: same-origin` +
  `Cross-Origin-Opener-Policy: same-origin` también está
  elegido para que el sitio siga siendo embebible en iframes
  sin credenciales en vez de forzar `credentialless` (que
  Safari envió más tarde que Chromium). Cuando cambies la CSP,
  relee primero esos comentarios.
- **Sin detección de navegador, sin UA sniffing.** Las ramas
  Safari-vs-resto están prohibidas — son la forma en que las
  peculiaridades solo-de-WebKit se convierten en carga
  permanente del código. Si una funcionalidad realmente no
  funciona en Safari, busca un equivalente cross-browser o
  documenta la carencia explícitamente en `SPEC.md` (no la
  escondas).
- **Táctil y teclado en iPad.** Los controles de accesibilidad
  y los dos juegos de opción múltiple deben seguir siendo
  operables con el teclado en pantalla de iPad y con teclados
  Bluetooth externos, no solo con ratón. Cualquier cosa que
  añadas que intercepte `keydown` debe funcionar también con
  las teclas que iPadOS reasigna (p. ej. `Meta` por `Ctrl`,
  `Alt+Left` por `Atrás`).

La validación de CI (`scripts/validar.js`) no ejecuta hoy pruebas
de navegador — no hay Chrome / WebDriver headless en el repo y no
hay presupuesto de CI para ello. Antes de añadir una dependencia
de automatización de navegador, mira el punto de "sin
dependencias en runtime" de arriba: cada dependencia que entre en
el repositorio tiene que justificarse contra el principio de
runtime cero.

## Kill-switch de service worker

Sinonimia no envía un service worker propio, y la CSP en
[`_headers`](../../_headers) fija `worker-src 'none'` para
mantenerlo así. Aun así Chrome puede mostrar `Response served by
service worker has redirections` en DevTools cuando *otra cosa*
ha registrado un SW contra este origen — una preview obsoleta de
Cloudflare Pages, una extensión del navegador, o una PWA
`*.pages.dev` que quedó cacheada de un despliegue anterior. El
aviso se refiere al SW que intercepta, no al código de
Sinonimia, pero confunde a editoras y revisoras, así que un
pequeño bloque defensivo al final de
[`index.html`](../../index.html) llama a
`navigator.serviceWorker.getRegistrations()` y hace `.unregister()`
de cualquier cosa que encuentre al cargar. La consulta va
envuelta en try/catch para que los navegadores sin la API de SW
(o en modo privado, donde no está disponible) sigan funcionando.

Si una versión futura de Sinonimia necesita de verdad un SW
(p. ej. para uso offline de `js/data.*.js`), este bloque tiene
que eliminarse **en el mismo commit** que añada el registro, y
la directiva `worker-src 'none'` de `_headers` tiene que
relajarse. Es el único motivo por el que el kill-switch va
comentado en el propio HTML — para que la siguiente persona que
lo toque sepa exactamente qué hacer.

## La separación en tres archivos: contenido vs. interfaz vs. lógica

- **`js/i18n.js`** contiene objetos `I18N.<idioma>` solo con textos de
  interfaz: etiquetas de botones, títulos, mensajes de estado. No es
  contenido del diccionario. `translate(language, key, variables)` busca
  una clave para un idioma, recurriendo al español y luego a la clave en
  crudo si falta, y hace una sustitución simple de `{marcador}`.
- **`js/data.es.js`**, **`js/data.en.js`** rellenan cada una una variable
  global compartida, `DICCIONARIOS.<idioma>`, con las entradas del
  diccionario de ese idioma. Añadir un idioma significa añadir un nuevo
  archivo `js/data.<idioma>.js` (ver "Cómo añadir un idioma nuevo" en
  `SPEC.md`) — `js/app.js` no necesita cambios, ya que solo lee los
  idiomas que existan como claves en `DICCIONARIOS`.
- **`js/app.js`** es una única IIFE que contiene toda la app cliente.
  Nunca escribe a mano un texto de interfaz ni los datos de un idioma
  concreto — solo lee `activeDictionary` (`= DICCIONARIOS[currentLanguage]`)
  y llama a `t(key)`.

## Enrutado y estado de vista

Basado en hash, sin History API: `#/<idioma>/`, `#/<idioma>/palabra/<id>`,
`#/<idioma>/juego`, `#/<idioma>/juego/palabra`, `#/<idioma>/juego/frase`.
`route()` analiza el hash, resuelve/valida primero el segmento de idioma
(redirigiendo a la elección de `initialLanguage()` si falta o no es
válido), y despacha a una de las funciones de renderizado. Solo una de
`#vista-lista` / `#vista-detalle` / `#vista-juego` está visible a la vez,
mediante `showView(name)`. No hay DOM virtual ni diffing: cada función de
renderizado hace `innerHTML = ""` en su contenedor y lo reconstruye desde
cero.

`currentLanguage` dirige todo lo que viene después: `buildIndexes()`
reconstruye las tablas de búsqueda del diccionario activo (`entryById`,
`entryByName` — esta última usada para enlazar un sinónimo a su propia
entrada del diccionario) cada vez que cambia el idioma. Todo el estado
persistido (progreso de descubrimiento, puntuación del juego, frases
escritas por la persona) está separado por idioma en `localStorage`, ya
que los dos diccionarios son contenido no relacionado — ver los nombres
de las claves en la sección de arquitectura de `SPEC.md`.

## Forma de una entrada del diccionario

Cada entrada (ver las excepciones de nomenclatura de arriba para saber
por qué estos nombres de campo se quedan en español) tiene: `id`,
`palabra`, `imagen: {id, alt}`, `definicion`, `sinonimos[]`,
`ejemplo: {palabra, texto}`, `ejemploSinonimo: {palabra, texto}`,
`situacion`, y **opcionalmente** `traduccion`. `situacion` es uno de
nueve valores compartidos por todos los idiomas (`tramites`, `salud`,
`vida-diaria`, `finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`,
`seguridad`) — es una
clave de filtro, no texto visible; su etiqueta en cada idioma vive en
`js/i18n.js` como `tema_<situacion>`. El campo `palabra` *dentro* de
`ejemplo` / `ejemploSinonimo` es la forma exacta conjugada o
concordada que aparece en esa frase (no necesariamente la palabra
cabecera del diccionario) — eso es lo que buscan
`createHighlightedSentence()` y `createSentenceWithBlank()` para
resaltarla o dejarla en blanco.

`id` es el único campo que tiene que ser único — `palabra` no lo es, a
propósito: un homógrafo (dos significados sin relación que comparten una
palabra, por ejemplo "pensión" — la paga de jubilación o una casa de
huéspedes) se modela como dos entradas normales con el mismo `palabra` y
distinto `id`/`situacion`/`definicion` (ver "Palabras con doble
significado" en `SPEC.md`). `entryByName` en `js/app.js` (indexado por
`palabra` normalizada, usado para enlazar un sinónimo a su propia entrada
y para elegir las opciones de los dos juegos) refleja esto: mapea un
nombre a un **array** de entradas en vez de sobrescribir, así que una
segunda entrada con la misma `palabra` nunca tapa en silencio a la
primera. Los enlaces de sinónimo que resuelven a más de una entrada
muestran un enlace por cada coincidencia en vez de adivinar;
`pickDistractorEntries` además excluye cualquier entrada cuya `palabra`
coincida con la del objetivo, así que el gemelo de un homógrafo nunca
puede aparecer como opción falsa de aspecto idéntico en ninguno de los
dos juegos.

### `traduccion`: enlazar el mismo concepto entre idiomas

```js
traduccion: { en: "pension-payment" }                       // un equivalente
traduccion: { en: ["pension-payment", "retirement-work"] }   // varios EN para un mismo ES
```

`traduccion` es un objeto **opcional** cuyas claves son códigos de idioma
y cuyos valores son el `id` de la entrada equivalente en ese idioma — un
string para enlaces uno-a-uno, o un array para uno-a-muchos (una palabra
española con varias traducciones inglesas válidas, o varias palabras
españolas que todas se mapean a la misma palabra inglesa). Cuando está
presente, `traduccion` es el enlace autoritativo entre idiomas; cuando
no está presente, se aplica el fallback de pictograma compartido que se
describe en la sección siguiente.

¿Por qué hace falta este campo si los pictogramas ARASAAC ya enlazan
conceptos entre idiomas? Porque ARASAAC tiene un único pictograma para
"dinero", uno para "documento", uno para "bolígrafo", etc., y el
diccionario tiene muchas palabras no relacionadas que comparten cada uno
de ellos — por eso el fallback de pictograma único solo resuelve una
fracción de las entradas. `traduccion` es donde la persona editora
desambigua el resto. `scripts/validar.js` comprueba la forma del campo
(objeto indexado por código de idioma, valores string o array de
strings) y que cada id referenciado exista en el diccionario del idioma
destino.

## Pictogramas: ARASAAC (+ OpenSymbols para buscar)

El campo `imagen.id` de cada entrada es un id de pictograma, y hoy todas
las imágenes en `img/` vienen de **[ARASAAC](https://arasaac.org)**
(Portal Aragonés de Comunicación Aumentativa y Alternativa), un banco
público de pictogramas mantenido por el Gobierno de Aragón, autor Sergio
Palao. Sinonimia descarga y sirve estas imágenes localmente en
`img/<arasaac-id>.png` (no enlazadas en caliente). Dos entradas del
diccionario — en el mismo idioma o en idiomas distintos — pueden apuntar
al mismo `imagen.id` y compartir un archivo, ya que los dibujos de
ARASAAC son conceptos sin idioma, no texto localizado.

La licencia de ARASAAC (CC BY-NC-SA) exige atribución y prohíbe el uso
comercial sin permiso de ARASAAC; la atribución vive en el pie de página
(clave `pieCreditosHtml` de `js/i18n.js`) y debe mantenerse intacta.

**Buscar un pictograma**: ejecuta
`node scripts/buscar-pictograma.js "<término>" es`. Primero prueba con
**[OpenSymbols](https://www.opensymbols.org)** — un agregador que
consulta ARASAAC, Sclera, Mulberry y otros bancos de licencia abierta
detrás de una sola API, buscable directamente en español (`locale=es`) —
usando un "secreto compartido" personal y gratuito (se pide en
https://www.opensymbols.org/api) leído de la variable de entorno
`OPENSYMBOLS_SECRET`. Nunca subas ese secreto al repositorio.

```
OPENSYMBOLS_SECRET=xxxx node scripts/buscar-pictograma.js "corregir un error" es
```

**El script recurre automáticamente a la API pública de ARASAAC** (sin
necesitar clave, `searchArasaac()` en el script) siempre que OpenSymbols
no se pueda usar: `OPENSYMBOLS_SECRET` no está definida, la petición de
token/búsqueda de OpenSymbols falla (secreto incorrecto, error de red,
límite de peticiones, servicio caído), o OpenSymbols devuelve cero
resultados para el término. Ese respaldo es la razón por la que el
script también funciona sin ninguna configuración:

```
node scripts/buscar-pictograma.js "corregir un error" es
```

En cualquiera de los dos casos solo se listan candidatos (banco,
licencia, autor, URL de la imagen) para que una persona los revise; nada
se descarga ni se elige automáticamente.

**Aviso sobre licencias múltiples**: a diferencia del respaldo exclusivo
de ARASAAC, un resultado de OpenSymbols puede venir de un banco con una
licencia *distinta* (por ejemplo Sclera es CC BY-NC, Mulberry es CC
BY-SA — revisa los campos `license`/`author` de cada resultado). El
`pieCreditosHtml` del pie de página solo da crédito a ARASAAC ahora
mismo; en el momento en que se añada de verdad una imagen que no sea de
ARASAAC a `img/`, esa clave necesita crecer con una línea de crédito para
el nuevo banco. No añadas una imagen que no sea de ARASAAC sin
actualizarla en el mismo cambio.

Sea cual sea el camino que la encuentre, mira primero en `img/` — el
concepto que necesitas puede que ya esté ahí.

## Gamificación

La palabra del día, "sorpréndeme", una barra de progreso de
descubrimiento, un campo de texto libre "crea tu propia frase", y dos
juegos de opción múltiple (`renderWordGame`, `renderSentenceGame`,
accesibles a través de `renderGameMenu`) viven todos en `js/app.js`,
todos leen de `activeDictionary`, y ninguno hace un caso especial para un
idioma. `SPEC.md` documenta las reglas que limitan cualquier
gamificación futura (nunca esconder contenido detrás de una interacción,
nunca hacer un juego punitivo) — léelo antes de añadir un tercer juego.

## Validación (`scripts/validar.js`)

Script de Node sin dependencias, se ejecuta en local y en CI
(`.github/workflows/validate.yml`) en cada push/PR. Comprueba, en orden:
la sintaxis de cada archivo JS; el balance de llaves del CSS; que cada
entrada del diccionario tenga un id único, una `situacion` válida, un
`imagen.id` con un archivo correspondiente en `img/`, y que `ejemplo`/
`ejemploSinonimo` tengan una `palabra` que sea una subcadena real (sin
distinguir acentos) de su propio `texto`; que cada clave `t()` que usa
`js/app.js` exista en cada bloque de idioma de `I18N`; que cada id de DOM
que `js/app.js` busca con `getElementById` exista en `index.html`; que
cualquier campo `traduccion` de una entrada tenga forma correcta (objeto
indexado por código de idioma, valores string o array de strings) y
referencie ids que existan en el diccionario del idioma destino; y que
ni `index.html` ni `js/i18n.js` contengan ninguno de una lista de
términos relacionados con discapacidad/terapia (la regla no negociable
del producto de cara al usuario, ver `SPEC.md` — `js/data.*.js` está
deliberadamente exento, ya que un término burocrático relacionado con la
discapacidad podría ser una entrada legítima en el futuro).

## Hacer crecer el contenido (`scripts/estado-contenido.js`)

Un segundo script sin dependencias, separado de la validación: informa
del número de palabras por categoría `situacion` y por idioma, marca las
categorías por debajo del umbral de 8 palabras, y (con `--detalle`) lista
cada palabra cabecera existente y sus sinónimos para que una entrada
nueva no duplique un concepto ya cubierto. Es la mitad "de contabilidad"
del crecimiento de contenido — deliberadamente no redacta definiciones,
ya que eso requiere el criterio editorial descrito en `SPEC.md`'s
"Proceso para ampliar el contenido", que se alimenta de la salida de
este script.

Lee el script antes de cambiar el formato del archivo de datos: codifica
en forma ejecutable los invariantes de los que depende ese formato.

## Accesibilidad

El selector de tamaño de letra y el interruptor de alto contraste están
implementados con propiedades personalizadas de CSS en `:root`,
sobrescritas por una clase `body.alto-contraste` — no duplicando reglas
por tema. Las dos preferencias persisten en `localStorage`. Las regiones
dinámicas de la interfaz (`#resultados-info`, el aviso de "frase
guardada", el feedback del juego) usan `aria-live="polite"`; el foco se
mueve al encabezado de la nueva vista en cada navegación (`h2.focus()`).

## Rutas ocultas

### `/about/`

Presentación del proyecto de cara al exterior, pensada para organismos,
entidades financiadoras, periodistas y nuevas personas colaboradoras que
quieran entender qué es Sinonimia sin abrir el código fuente. Cinco
secciones: el origen del proyecto (incluido el contexto de terapia
ocupacional/discapacidad intelectual que `index.html` nunca nombra), los
seis principios innegociables (lectura fácil, repetición con sinónimo,
pictogramas ARASAAC, gamificación no punitiva, arquitectura multi-idioma,
tecnología sobria), cómo está construida la web (estática, sin backend,
solo `localStorage`, MIT + CC BY-SA 4.0), las cifras actuales del
diccionario por área AIVD, y cómo ayudar. El pie enlaza de vuelta al
diccionario (`../index.html`).

**Ningún enlace público apunta a ella**: ni desde `index.html`, ni desde
`README.md`/`README.es.md`, ni desde ningún sitio de `doc/`. Solo se llega
escribiendo la URL, y lleva `<meta name="robots" content="noindex,
nofollow">`. Mantenla actualizada, en los dos idiomas, cuando cambien las
cifras de palabras o los principios de diseño — pero nunca añadas ahí
texto de cara a la persona usuaria como si estuviera enlazado desde el
producto; esa página no es para quien usa el diccionario.
