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
`situacion`. `situacion` es uno de siete valores compartidos por todos
los idiomas (`tramites`, `salud`, `vida-diaria`, `finanzas`, `vivienda`,
`trabajo`, `legal`) — es una clave de filtro, no texto visible; su
etiqueta en cada idioma vive en `js/i18n.js` como `tema_<situacion>`. El
campo `palabra` *dentro* de `ejemplo` / `ejemploSinonimo` es la forma
exacta conjugada o concordada que aparece en esa frase (no
necesariamente la palabra cabecera del diccionario) — eso es lo que
buscan `createHighlightedSentence()` y `createSentenceWithBlank()` para
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
que `js/app.js` busca con `getElementById` exista en `index.html`; y que
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
