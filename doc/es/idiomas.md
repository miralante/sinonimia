# Idiomas — extender Sinonimia a más idiomas

> **Política**: Sinonimia es un diccionario multi-idioma. El español
> (`es`) y el inglés (`en`) son los dos **idiomas por defecto** que se
> publican hoy, y la arquitectura está diseñada para que añadir un
> tercero (o un cuarto) **no requiera tocar `js/app.js` para nada**.
> Este documento es la guía paso a paso para extender a un idioma
> nuevo (y para mantener uno existente sano).
>
> **Otro idioma**: [English](../en/languages.md)
>
> Véase [`SPEC.md`](SPEC.md) para saber *qué* es Sinonimia y las
> reglas de contenido que cumple cada entrada; véase
> [`tecnico.md`](tecnico.md) para la arquitectura completa del
> código. Este documento es el tercer pilar: asume que has leído los
> dos anteriores y solo documenta las reglas cruzadas que gobiernan
> el soporte multi-idioma.

---

## 1. Política

La política de contenido de Sinonimia es "tantos idiomas como
personas contribuyentes dispuestas a mantenerlos sanos". Hoy el
diccionario se publica en español e inglés; la arquitectura hace que
el coste de añadir un idioma nuevo sea casi todo editorial (escribir
las palabras, traducir la interfaz), no de ingeniería — es una
decisión de diseño deliberada.

Lo que esta política **no** es:

- **No** es "auto-traducir un idioma a partir de otro". El
  diccionario de cada idioma se escribe desde cero en ese idioma,
  eligiendo las palabras que son difíciles **en ese idioma** (ver
  "Por qué no se traduce palabra por palabra" en [`SPEC.md`](SPEC.md)
  → "Proceso para ampliar el contenido").
- **No** es "traducir la interfaz y ya está". Un idioma nuevo
  necesita un glosario real de palabras en él; el diccionario es el
  producto, no el chrome que lo rodea.
- **No** es "simétrico". Un idioma puede tener sin problema palabras
  que no existen en ningún otro (un término burocrático propio de la
  administración de un país), y una palabra español/inglés puede no
  tener equivalente en el idioma nuevo. `traduccion` es opcional y
  uno-a-muchos.

## 2. Por qué la arquitectura ya lo soporta

`js/app.js` es **agnóstico al idioma** a propósito. Concretamente:

- `AVAILABLE_LANGUAGES = Object.keys(DICCIONARIOS)` — cada clave que
  exista en el global `DICCIONARIOS` es automáticamente un idioma
  funcional.
- `translate(language, key, variables)` busca
  `I18N[language][key]` con fallback español → inglés → clave
  cruda, así que la interfaz nunca se rompe porque falte una clave
  en un idioma.
- El enrutado por hash (`#/<lang>/palabra/<id>`, `#/<lang>/juego`, …)
  valida el segmento `<lang>` contra `AVAILABLE_LANGUAGES` y redirige
  idiomas desconocidos al idioma por defecto. La **forma** de las
  rutas (`palabra`, `juego`) no se traduce a propósito, para que
  todos los idiomas compartan la misma gramática de URL.
- La búsqueda, el filtro alfabético, el filtro por tema, la palabra
  del día, "Sorpréndeme", los dos juegos, la barra de progreso y
  "Crea tu propia frase" están todos pilotados por
  `activeDictionary = DICCIONARIOS[currentLanguage]`. Ninguno trata
  `es` o `en` de forma especial.
- `localStorage` se namespace automáticamente por idioma
  (`…-aprendidas-<lang>`, `…-juego-aciertos-<lang>`,
  `…-mis-frases-<lang>`), así que un idioma nuevo empieza en limpio y
  nunca colisiona con otro.
- `scripts/validar.js` recorre **todos** los idiomas en una sola
  pasada: añadir un idioma extiende las mismas comprobaciones
  automáticamente.

Lo que esto significa: un idioma nuevo es un ejercicio de contenido +
textos de interfaz, no un refactor. Los únicos archivos que quizá
**toques** están en la sección 3; los únicos que quizá **crees** en
la sección 4. Nada en `js/app.js`, `css/styles.css` o `scripts/`
cambia.

## 3. Ficheros que sí hay que tocar al añadir un idioma

El orden importa — el validador (`scripts/validar.js`) es la última
puerta, y falla si se salta cualquiera de estos pasos.

### 3.1 `js/i18n.js` — textos de la interfaz

El fichero se publica hoy con dos bloques (`es`, `en`). Para añadir un
tercero:

1. Copia el bloque entero de `en` (o el de `es`) al final del
   objeto `I18N`.
2. Renombra la clave del bloque nuevo al código ISO 639-1 del idioma
   nuevo (p. ej. `ca`, `gl`, `eu`, `fr`, `pt`, `de`).
3. Traduce **cada clave** — no dejes ninguna cadena en otro idioma.
   El validador comprueba la paridad de claves, no de valores, pero
   una interfaz traducida a medias es peor que ninguna traducción.
4. Añade una clave `idiomaNombre_<código>`: es el nombre legible que
   el idioma nuevo usa para sí mismo en el enlace cruzado **"Ver en
   {idioma}: {palabra}"**. Hoy:
   - `idiomaNombre_es: "español"`
   - `idiomaNombre_en: "inglés"`
   Para un nuevo bloque `ca`: `idiomaNombre_ca: "català"`. Añádelo
   también en **cada bloque existente** — así el chip de
   cross-idioma lee el **propio** nombre que el idioma destino se da
   a sí mismo, en lugar de un fallback.
5. Ajusta `htmlLang` al locale del idioma nuevo. Esto alimenta el
   atributo `<html lang="…">` que `js/app.js` establece al arrancar,
   del que dependen lectores de pantalla y buscadores.
6. Si el idioma se lee de derecha a izquierda (p. ej. `ar`, `he`,
   `fa`), documenta aquí que `css/styles.css` necesita una regla
   `dir="rtl"` para `<html>` en ese idioma — es el único trozo de
   CSS que genuinamente varía por idioma, y el único que
   `scripts/validar.js` no coge automáticamente.

### 3.2 `js/data.<código>.js` — el diccionario

Fichero nuevo. La forma de una entrada está documentada en
[`tecnico.md`](tecnico.md) bajo "Forma de una entrada del
diccionario", y el comentario al principio de `js/data.es.js` lista
cada campo con un ejemplo. Dos reglas específicas del contenido
multi-idioma:

- **`situacion` es una clave compartida por todos los idiomas.**
  Elige entre `tramites`, `salud`, `vida-diaria`, `finanzas`,
  `vivienda`, `trabajo`, `legal`, `tecnologia`, `seguridad`. Estas
  nueve categorías son las **áreas AIVD** (ver [`SPEC.md`](SPEC.md)),
  el marco que usa la terapia ocupacional para la autonomía de la
  vida adulta — no son una taxonomía de dominio, y no cambian con el
  idioma. Si una categoría falta genuinamente en la cultura del
  idioma nuevo, **no** inventes una nueva para un puñado de
  palabras; ver "Cuándo añadir una `situacion` nueva" en
  [`SPEC.md`](SPEC.md) para el umbral (un puñado real de palabras
  que la justifique, y una etiqueta `tema_<clave>` añadida en
  **cada** bloque `I18N` en el mismo commit).
- **`traduccion` es opcional.** Cuando se rellena, es el enlace
  cruzado autoritativo entre idiomas. Cuando se omite, el fallback
  por pictograma compartido en `js/app.js` (cada `imagen.id` es
  único dentro de cada idioma, así que dos entradas con el mismo
  pictograma se enlazan) elige el vínculo. Como ARASAAC tiene un
  único pictograma de "dinero", uno de "documento", uno de
  "bolígrafo", etc., el fallback solo resuelve una fracción de los
  enlaces cruzados — para la mayoría de entradas en un tercer
  idioma, habrá que escribir `traduccion` a mano en ambas
  direcciones (entradas en `<código>` apuntando a ids de `es`/`en`,
  y entradas en `es`/`en` apuntando de vuelta a los ids del nuevo
  `<código>` donde haya equivalentes).

La cabecera de cada fichero de datos lo dice explícitamente — léela
antes de añadir la primera entrada.

### 3.3 `index.html` — etiqueta de script, botón de idioma, meta-etiquetas

Dos adiciones, en este orden (el orden de los `<script>` del
fichero tiene que poner **todos** los `data.*.js` antes de
`app.js`):

1. `<script src="js/data.<código>.js"></script>` — junto a los
   `<script src="js/data.es.js">` y `<script src="js/data.en.js">`
   ya existentes. Sin esta etiqueta, `DICCIONARIOS.<código>` es
   `undefined` cuando `app.js` arranca, y el idioma desaparece
   silenciosamente.
2. Dentro del bloque `.idioma-selector`, añade un botón:
   `<button type="button" class="idioma-btn" data-lang="<código>" aria-pressed="false"><BANDERA/ETIQUETA NATIVA></button>`.
   - La etiqueta del botón es el **endónimo** (el nombre que el
     idioma se da a sí mismo), no "Catalán" o "Español" — `Català`,
     `Español`, `English`, `Português`. Esta es la convención que
     siguen los botones ya existentes.
   - No traduzcas `data-lang`: es el token de URL, y los segmentos
     de ruta deliberadamente no se traducen (ver
     [`tecnico.md`](tecnico.md) → "Excepciones de naming").

El atributo `<html lang>` lo establece dinámicamente `js/app.js`
desde `I18N[currentLanguage].htmlLang`, así que no hay que
hardcodearlo en el HTML.

### 3.4 `about/index.html` y `about/privacidad.html` — bloques por idioma

Estas páginas están construidas como bloques paralelos con
`data-lang-block="<código>"` (uno por idioma), no vía `I18N`.
Llevan su propio `about.js`, que:

- Lee `?lang=…` de la URL para enlazar profundo a un idioma
  concreto, con una whitelist `if (requested === "es" || requested
  === "en")` arriba.
- Establece `<html data-lang="<código>">` y conmuta qué bloque
  `data-lang-block` es visible vía CSS (reglas `[data-lang-block]`
  al final de `css/styles.css`, scoped a `.page-about` /
  `.page-privacidad`).

Al añadir un idioma:

1. **Whiteliste el código nuevo en `about.js`**: amplía la condición
   `if` para que `?lang=<código>` se acepte y se establezca el
   atributo `data-lang` en `<html>`. Sin esto, los enlaces profundos
   al idioma nuevo caen silenciosamente a lo que ya hubiera en
   `<html>`.
2. **Añade bloques paralelos `data-lang-block="<código>"`**: para
   cada elemento que actualmente tenga `data-lang-block="es"` y
   `data-lang-block="en"` (encabezados, párrafos, botones, nota de
   pie), añade un tercer bloque en el idioma nuevo. La visibilidad
   se controla por selectores de atributo CSS keyed sobre el
   `data-lang` de la raíz, así que el bloque nuevo aparecerá
   automáticamente al elegir el idioma nuevo.
3. Lo mismo aplica a `about/privacidad.html`.

Esta es la **única** familia de páginas que usa `data-lang-block`
en lugar de `I18N`; todo lo demás pasa por el helper central `t()`.
No muevas las páginas "about" a `I18N` como parte de añadir un
idioma — mantén la convención como está, y simplemente añade un
bloque paralelo más la entrada en la whitelist.

### 3.5 `js/bootstrap-i18n.js` — cadenas pre-pintado

Este script pequeño se ejecuta de forma síncrona desde `<head>`
antes del primer paint, para que una persona que habla inglés no vea
un flash de contenido en español. Refleja **solo** las tres claves
relevantes para `<head>` (`htmlLang`, `metaTitulo`,
`metaDescripcion`) — la copia completa de `I18N` vive en
`js/i18n.js`. El script hardcodea un objeto `BOOTSTRAP_I18N`
indexado por código de idioma, y un array `AVAILABLE` que usa
`resolveLang()`.

Al añadir un idioma:

1. Añade una entrada
   `<código>: { htmlLang, metaTitulo, metaDescripcion }` a
   `BOOTSTRAP_I18N`. Las cadenas deben coincidir con las mismas
   claves en `I18N.<código>` (se mantienen en dos sitios a
   propósito — `bootstrap-i18n.js` no puede cargar `js/i18n.js` desde
   `<head>` sin una dependencia circular, así que se reflejan a
   mano). `scripts/validar.js` no enforza este espejo (las cadenas
   son dinámicas), pero si divergen, el título y la meta-descripción
   parpadean entre las versiones pre-pintado y post-`app.js`.
2. Añade el código nuevo al array `AVAILABLE` — si no,
   `resolveLang()` cae silenciosamente al idioma por defecto para
   los locales del navegador y rutas de hash que coincidan.

### 3.6 Otros puntos de contacto

- **`404.html`**: contiene los mismos bloques `data-lang-block`
  para ES y EN. Añade un tercer bloque en el idioma nuevo.
- **`README.md`** y **`README.es.md`**: cuando el diccionario
  alcance el umbral descrito en [`SPEC.md`](SPEC.md) → "Proceso
  para ampliar el contenido", añade una frase breve de "Probarlo"
  en el idioma nuevo.
- **`doc/{en,es}/SPEC.md`** y **`doc/en/technical.md`** /
  **`doc/es/tecnico.md`**: añade una nota de una línea en la
  sección multi-idioma apuntando a este documento, si se actualiza
  el texto existente.

## 4. Ficheros que NO cambian

Merece la pena listarlos explícitamente, porque "lo que NO hay que
tocar" es donde se ve la decisión de arquitectura:

- **`js/app.js`** — nunca. Si te encuentras queriendo editarlo
  para un idioma nuevo, eso es un bug en este documento, no en
  `app.js`. Vuelve a leerlo.
- **`css/styles.css`** — salvo por la matización RTL del paso 6 de
  3.1. El selector de idioma, las pastillas de tema, el buscador,
  los juegos y las reglas tipográficas son agnósticas al idioma.
- **`scripts/validar.js`** — recorre `Object.keys(I18N)` y
  `Object.keys(DICCIONARIOS)` automáticamente. Eso sí, **marca
  en rojo** un idioma nuevo que no satisfaga las comprobaciones
  existentes (toda entrada con id único, `situacion` válida,
  fichero de pictograma, ejemplos que contienen la palabra). Es
  esperable un CI rojo en el primer commit de un idioma nuevo;
  itera hasta que esté en verde.
- **`scripts/estado-contenido.js`** — cuenta palabras por
  `situacion` por idioma. Un idioma nuevo parte de 0; el script
  sugerirá las nueve categorías por orden de necesidad.
- **El CSP en `_headers`** — no tiene orígenes específicos por
  idioma.
- **Enrutado / gramática de URL** — los tokens de ruta (`palabra`,
  `juego`) no se traducen a propósito. Las URL se quedan
  `#/<lang>/palabra/<id>` para todos los idiomas.

## 5. Enlaces cruzados entre idiomas — `traduccion` y el fallback por pictograma

`js/app.js` resuelve enlaces cruzados en dos pasadas; las dos están
documentadas en detalle en [`tecnico.md`](tecnico.md) bajo "Forma
de una entrada del diccionario → `traduccion`: enlazar el mismo
concepto entre idiomas". El resumen relevante para un idioma nuevo:

1. **Pasada 1 (preferida)**: el campo `traduccion.<código>` de una
   entrada lista los `id`s en el idioma destino que significan el
   mismo concepto. Para una palabra en español con varias
   traducciones válidas al catalán, usa un **array** de ids
   (`traduccion: { ca: ["foo", "bar"] }`).
2. **Pasada 2 (fallback)**: si `traduccion` no menciona un idioma,
   se cae al "ambas entradas comparten un pictograma único". Esto
   solo funciona cuando cada idioma tiene exactamente una entrada
   por pictograma; ARASAAC tiene un único pictograma de "dinero",
   así que no puede resolver muchas entradas por sí solo.

En un idioma nuevo, la secuencia típica al añadir una palabra es:

1. Decide la palabra y la `situacion`.
2. Busca el equivalente (si lo hay) en `es` y `en` por id, y añade
   `traduccion: { es: "<id>", en: "<id>" }` a la entrada nueva.
3. Añade `traduccion: { <código>: "<id-nuevo>" }` a las entradas
   existentes en `es`/`en` para que el enlace funcione en **ambas
   direcciones**. Un enlace escrito solo en un lado es medio
   enlace.
4. Solo si la palabra nueva genuinamente no tiene equivalente en
   `es` o `en` (un término propio de una cultura) omite este paso
   — y no inventes una equivalencia artificial para llenar el
   hueco.

## 6. Persistencia por idioma y por qué es automática

Las claves de `localStorage` están namespaceadas por código de
idioma (`…-<lang>`), porque las tres cosas que guarda la app —
palabras descubiertas, aciertos del juego, "tu propia frase" por
palabra — son contenido de ese diccionario concreto, no del
usuario. El namespace está hardcodeado en `js/app.js` y usa
`currentLanguage` como sufijo. Consecuencias prácticas:

- Una persona con progreso en `es` y `en` que pasa a un nuevo `ca`
  empieza en cero en `ca`. Es correcto: no ha descubierto ninguna
  palabra en catalán todavía.
- Renombrar el código de idioma (`ca` → `cat`) hace perder
  silenciosamente el progreso guardado para ese idioma. No
  renombres un código tras el lanzamiento — el token de URL, la
  clave de `I18N`, la clave de `DICCIONARIOS`, el nombre del
  fichero de datos, el nombre de fichero de la etiqueta
  `<script>`, el atributo `data-lang` y el sufijo de `localStorage`
  son **todos la misma cadena**, y todos son contratos de estado
  persistido.

## 7. La UX cross-idioma: cambiar de idioma pierde la palabra

El enrutador de `js/app.js` deliberadamente vuelve a la **vista de
lista** en el idioma nuevo cuando cambias de idioma, en lugar de
intentar traducir la palabra que estabas mirando. Es una decisión
de diseño, no un bug:

- Un headword dado muchas veces no existe en el otro idioma.
- Los dos diccionarios no están alineados 1:1 (el inglés puede
  tener una palabra que el español no, y viceversa).
- "Tradúceme esta palabra" es exactamente para lo que la persona
  estaba usando la web para no tener que preguntar.

El enlace cruzado en la página de detalle de cada palabra es la
manera **explícita** de saltar a la entrada equivalente en otro
idioma; el selector de idioma sirve para "quiero navegar en otro
idioma". Mantén la distinción.

## 8. Añadir una nueva categoría `situacion` entre idiomas

Lo listamos aquí también porque es una decisión multi-idioma:

- Ver [`SPEC.md`](SPEC.md) → "Proceso para ampliar el contenido"
  para el umbral (un puñado real de palabras, no dos o tres
  sueltas).
- La clave nueva se añade al campo `situacion` de las entradas
  que la justifiquen en **todos** los ficheros de datos de todos
  los idiomas, y se añade una etiqueta `tema_<clave>` en **cada**
  bloque `I18N`, todo en el mismo commit. Las nueve claves
  existentes (`tramites`, `salud`, `vida-diaria`, `finanzas`,
  `vivienda`, `trabajo`, `legal`, `tecnologia`, `seguridad`) son
  el marco AIVD — aplican a todos los idiomas porque describen
  áreas de la vida adulta, no conceptos culturales. Una clave
  nueva solo se justifica si también es un área con forma AIVD.

## 9. Cuándo NO añadir un idioma nuevo

Añadir un idioma es barato en código pero trabajo editorial real.
No lo hagas si:

- Solo vas a traducir la interfaz por motivos de marketing: el
  diccionario es el producto. Un idioma con 5 entradas no es
  útil, y por debajo del umbral de 8 palabras por categoría que
  fija [`SPEC.md`](SPEC.md), el filtro de tema se llena de casillas
  vacías.
- El "idioma" es en realidad una variante regional de uno ya
  existente (es-ES vs. es-MX): déjalo en el mismo diccionario. El
  almacenamiento por idioma es por **idioma**, no por locale,
  precisamente para no fragmentar así.
- No puedes escribir las reglas de lectura fácil para él: si el
  idioma de origen no tiene una convención de lenguaje claro
  análoga a la UNE 153101:2018 EX o las pautas de Inclusion
  Europe, el contenido no puede cumplir las reglas editoriales y
  el diccionario leerá como jerga disfrazada. Espera a que las
  reglas existan.

## 10. Referencia: checklist completo

Para quien acaba de decir "vamos a añadir catalán":

1. `node scripts/estado-contenido.js` — mira los conteos actuales
   por idioma y categoría.
2. Crea `js/data.ca.js` con las primeras ~20 entradas en `ca`,
   siguiendo las reglas de lectura fácil de [`SPEC.md`](SPEC.md) →
   "Principio de diseño: lectura fácil".
3. Añade un bloque `ca` a `I18N` en `js/i18n.js` (copia `en`,
   traduce cada clave, pon `htmlLang: "ca"`, añade
   `idiomaNombre_ca: "català"`).
4. Añade `idiomaNombre_ca` también a los bloques `es` y `en`.
5. En `index.html`, añade la etiqueta `<script src="js/data.ca.js">`
   **antes** de `<script src="js/app.js">`, y un botón en el
   selector de idioma.
6. En `about/index.html` y `about/privacidad.html`, añade bloques
   paralelos `data-lang-block="ca"` para cada bloque dual
   existente, y amplía la whitelist
   `if (requested === "es" || requested === "en")` de `about.js`
   para incluir `"ca"`.
7. En `404.html`, añade el texto `ca` para el mensaje y los tres
   botones.
8. En `js/bootstrap-i18n.js`, añade una entrada `ca` a
   `BOOTSTRAP_I18N` con `htmlLang`, `metaTitulo` y
   `metaDescripcion` reflejando las mismas claves en `I18N.ca`, y
   añade `"ca"` al array `AVAILABLE`.
9. Busca pictogramas: `node scripts/buscar-pictograma.js "<término>" ca`
   para cada entrada nueva (cae solo a ARASAAC si OpenSymbols no
   tiene resultados en catalán).
10. Añade campos `traduccion` en **ambas direcciones** entre las
    entradas nuevas y sus equivalentes en `es`/`en`.
11. Ejecuta `node scripts/validar.js` — arregla cualquier cosa en
    rojo.
12. Ejecuta `node scripts/estado-contenido.js --detalle` —
    confirma que los conteos por categoría ya no están por debajo
    de 8 para `ca` en las categorías que rellenaste.
13. Actualiza la sección "Probarlo" de `README.md` /
    `README.es.md` con una frase en catalán.
14. Abre la página, pulsa el botón del idioma nuevo, y lee tres
    entradas aleatorias en voz alta — si alguna suena a texto
    legal traducido, reescríbela. La lectura fácil no se traduce.

Esa es la procedure entera. `js/app.js` no aparece ni una vez en
la lista, y esa es la idea.