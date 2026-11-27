# Guía para crear actividades

> **Cómo diseñar y añadir contenido nuevo a Sinonimia: entradas de
> diccionario, juegos y variantes de juegos.**
>
> Las "actividades" de Sinonimia son las **entradas del diccionario**
> (la actividad principal) y los dos **juegos** cortos que se
> construyen encima. El trabajo pedagógico ocurre al escribir una
> buena entrada; los juegos en sí están fijos y consumen lo que el
> diccionario tenga.
>
> Este documento **no** duplica la guía pedagógica canónica del
> suite; apunta a ella y solo recoge lo específico de Sinonimia. Si
> una regla aquí entra en conflicto con la guía canónica o con
> `tecnico.md`, `tecnico.md` gana.

---

## 1. La guía pedagógica canónica

Las técnicas didácticas, de gamificación, de persuasión y de
neuromarketing completas que comparten todas las apps de la
suite Miralante viven en la guía canónica de **Apptonomia** en
[`guia-crear-elementos.md`](https://github.com/miralante/apptonomia/blob/main/doc/es/guia-crear-elementos.md).

Léela antes de diseñar nada. Cubre (entre otras cosas):

- Principios para definir objetivos de aprendizaje y adaptar el contenido al público.
- Pautas de accesibilidad y comprensión para las consignas y la interacción.
- Una secuencia de pistas, respuesta al error y refuerzo respetuoso.
- Gamificación y persuasión responsables, sin presión ni penalizaciones.
- Una lista de comprobación antes de publicar.

## 2. Lo específico de Sinonimia

### 2.1 La unidad de contenido es la entrada, no la actividad

No añadas una carpeta de "actividad" nueva para cada tema. Añade
una **entrada de diccionario** al tema correspondiente en
`js/data.<lang>.js`. Los juegos (Emparejar, Ordenar) recogen la
nueva entrada automáticamente en la siguiente carga.

Si de verdad necesitas un modo de juego nuevo (p. ej. un tipo de
ejercicio que el runtime no soporta), eso es un cambio de
ingeniería, no de contenido — consúltalo con el rol de build antes
de abrir un PR.

### 2.2 Anatomía de la entrada

Cada entrada sigue el esquema definido en [`tecnico.md`](tecnico.md)
§"Modelo de datos". Campos obligatorios:

- `palabra` (la palabra en sí, en el idioma del diccionario).
- `definicion` (definición en lectura fácil, ver [`SPEC.md`](SPEC.md)).
- `ejemplo` (una frase de ejemplo en el mismo idioma).
- `categoria` (uno de los temas listados en
  [`actividades.md`](actividades.md) §1).
- `pictograma` (referencia al pictograma; búscalo con
  `node scripts/search-pictogram.js`).

Campos opcionales:

- `traduccion` — equivalente(s) más cercano(s) en otro idioma (se
  permite uno-a-muchos). Al existir la voz equivalente en el otro
  diccionario, enlaza ambos registros con `traduccion`; si falta el enlace
  recíproco, complétalo también.
- `notas` — notas internas, no se muestran a quien lee.

### 2.3 La regla "la palabra debe ser difícil en su propio idioma"

Esta es la regla editorial más importante (ver [`SPEC.md`](SPEC.md)
"Proceso para ampliar el contenido"). Sinonimia **no traduce
palabra por palabra** entre diccionarios: cada idioma elige las
palabras que son genuinamente difíciles **en ese idioma**. Un
término técnico o burocrático español sin equivalente inglés (y al revés) es
un caso normal y esperado.

Al añadir una voz, consulta también el diccionario del otro idioma. Si ya
contiene una voz equivalente, añade el enlace `traduccion` en la entrada nueva
y en la existente, para que la relación funcione en ambos sentidos. Si la voz
equivalente aún no tiene entrada, créala solo si también es difícil por sí
misma en ese idioma; no fuerces una traducción literal.

### 2.4 Las reglas de lectura fácil aplican a cada entrada

El diccionario **es** el producto que ve quien lee. Cada entrada
debe cumplir:

- **Una idea por frase** en la definición.
- **Vocabulario cotidiano** (sin jerga clínica o técnica sin
  explicar).
- **Frases cortas** (ver las reglas UNE 153101 resumidas en
  [`SPEC.md`](SPEC.md)).
- **Sin etiquetas clínicas** sobre quien lee (la entrada nunca dice
  "para personas con X").

Estas reglas aplican por igual a la frase de ejemplo y a la
traducción opcional.

## 3. Cómo crear una entrada

Para descubrir candidatas, consulta la [guía de fuentes](guia-fuentes.md).
Antes de redactar una ficha, comprueba que la palabra no esté excluida ni
cubierta ya en el diccionario o en la categoría.

Antes de aceptar una candidata, sigue este orden para no repetir una
decisión editorial ni duplicar contenido:

1. **Comprueba las exclusiones.** Busca la palabra en
   `scripts/ingest/pipeline/filters/rejected-words-{idioma}.txt` y en
   `scripts/ingest/pipeline/decisions/editorial-exclusions-{idioma}.json`.
   Puedes buscarla en ambos archivos con:

   ```sh
   rg -ni --fixed-strings -- "{palabra}" scripts/ingest/pipeline/filters/rejected-words-{idioma}.txt scripts/ingest/pipeline/decisions/editorial-exclusions-{idioma}.json
   ```

   La primera lista contiene palabras rechazadas; el archivo JSON registra
   exclusiones de fichas concretas. Si una decisión afecta a otra acepción
   del mismo lema, no la apliques automáticamente a la candidata: compara
   el `id`, la definición y el motivo.
2. **Busca la palabra como lema y como sinónimo en el diccionario del
   idioma.** El informe detallado permite localizar coincidencias sin abrir
   los grandes archivos de datos:

   ```sh
   node scripts/content-status.js --detalle --lang {idioma} | rg -i --fixed-strings "{palabra}"
   ```

   **Precaución:** una coincidencia puede estar en el campo del lema o en la
   lista de sinónimos. Revisa cuál de los dos campos coincide antes de decidir
   que la palabra no está en el diccionario. Si aparece como lema, comprueba
   si la ficha ya cubre la misma acepción o si la candidata propone otra que
   merezca entrada propia. Si aparece como sinónimo, revisa a qué ficha
   pertenece: la palabra ya se puede encontrar desde esa ficha, pero quizá
   necesite una entrada propia si aporta una acepción o información distinta.
   Una coincidencia en un ejemplo tampoco equivale a una entrada ni a un
   sinónimo. No descartes ni dupliques la candidata sin revisar el tipo de
   coincidencia.
3. **Revisa la categoría.** Busca posibles solapamientos de concepto,
   sinónimos y escenarios de ejemplo en la categoría donde iría la nueva
   ficha:

   ```sh
   node scripts/content-status.js --detalle --categoria {categoria} --lang {idioma}
   ```

No abras `js/data.{idioma}.js` directamente: son archivos muy grandes.

### 3.1 Criterios para aceptar una palabra

Evalúa cada palabra **por separado y en su acepción concreta**. Aplica estos
pasos tanto a candidatas de cualquier fuente como a fichas que ya existen.

#### 1. Confirma que la palabra es válida

- Debe estar documentada, ser válida y tener un uso actual que la persona
  pueda encontrar. Descarta voces arcaicas, en desuso, raras, poco conocidas
  o de uso muy limitado, aunque aparezcan en un diccionario. Que una palabra
  sea técnica no basta para descartarla: conserva los términos actuales y
  útiles que aparecen en documentos reales del ámbito de Sinonimia.
- Comprueba cada candidata nueva en el diccionario del idioma:
  [RAE/DLE](https://dle.rae.es/) para `es` o [Collins English
  Dictionary](https://www.collinsdictionary.com/dictionary/english) para
  `en` (usa la ruta
  `https://www.collinsdictionary.com/dictionary/english/<word>` para
  Collins). Confirma que el lema o una variante reconocida existe y que
  documenta la acepción propuesta. Esta comprobación es obligatoria para
  aceptar una palabra durante la ingesta; no es una ayuda opcional de
  redacción. Si no encuentras una entrada verificable, descártala. Solo
  vuelve a evaluarla si corriges la forma y confirmas la corrección en el
  diccionario. No copies su definición.
- Descarta formas inventadas o inválidas. Una errata solo se puede revisar
  de nuevo después de corregirla y verificar la forma correcta.
- No incluyas adverbios como entradas independientes. Descarta también
  palabras gramaticales o funcionales —como preposiciones, conjunciones,
  determinantes y partículas— cuando solo expresan una relación, un grado o
  una circunstancia y no aportan un significado léxico que necesite
  explicación. Aplica el criterio a la acepción concreta: si un lema tiene
  además un sentido independiente de otra categoría, evalúalo por separado.
- Conserva el infinitivo, no las formas verbales conjugadas. Descarta
  plurales y formas con pronombre enclítico si no tienen entrada propia.
- Descarta los numerales y ordinales cuando la ficha solo expresa un número
  o un orden. Evalúa por separado otros sentidos independientes del mismo
  lema.
- Descarta nombres propios (personas, apellidos, ciudades, países y marcas)
  y gentilicios, aunque aparezcan en el diccionario de referencia:
  DLE para español o Collins para inglés.
- La definición debe corresponder a la acepción documentada. Si es errónea,
  retira la ficha; solo consérvala si corriges la definición y confirmas que
  refleja fielmente una acepción vigente.

#### 2. Comprueba que necesita explicación

- **Persona de referencia:** el objetivo interno de Sinonimia es apoyar a
  personas con discapacidad intelectual que aprenden vocabulario, a menudo
  en terapia ocupacional. La web también sirve a cualquier persona que se
  encuentre una palabra difícil. No presupongas conocimientos previos: la
  persona debe poder entender la explicación a la primera, con palabras
  conocidas y, cuando ayude, un pictograma. Para valorar la dificultad,
  piensa en alguien que entiende palabras y situaciones cotidianas, pero
  puede necesitar ayuda con vocabulario especializado, técnico o burocrático.
- **Pregunta de decisión:** ¿es probable que la persona entienda esta palabra
  y esta acepción sin ayuda? Si sí, no hace falta una ficha. Descarta palabras
  y acepciones familiares, comunes, concretas y transparentes, así como
  acciones básicas que probablemente ya comprende. Si necesita que Sinonimia
  se lo explique, puede ser candidata.
- Valora la dificultad de la **palabra y de la acepción**, no lo fácil que
  resulte redactar su explicación. Una palabra puede ser frecuente y tener
  una acepción difícil que sí merece ficha. Conserva también términos
  abstractos o intangibles, como *leyenda* o *garantía*.
- La frecuencia y CEFRLex/ELELex son señales para orientar la revisión, no
  reglas automáticas. Que un término técnico no aparezca en CEFRLex/ELELex
  no lo invalida. El filtro `scripts/ingest/pipeline/filters/common-words.js`
  ayuda en la ingesta masiva del método C de la [guía de fuentes](guia-fuentes.md#2-métodos-de-búsqueda), pero no limita el criterio
  editorial.

#### 3. Decide si necesita una entrada propia

- No descartes una forma léxica independiente solo porque comparte concepto
  con otra ficha. Si la persona tipo puede encontrar esa palabra concreta
  en un documento real y todavía no tiene entrada propia, puede merecerla
  aunque ya aparezca como sinónimo o en un ejemplo. Por ejemplo,
  `Tetrapléjico` puede tener entrada aunque exista `Cuadripléjico`: son
  palabras que se pueden buscar literalmente.
- Decide entre entrada y sinónimo según lo que necesite quien consulta:
  usa un sinónimo para una variante menor o una reformulación; crea una
  entrada cuando esa palabra necesite explicación, categoría, ejemplo o
  forma gramatical propios. La búsqueda indexa la palabra, la definición y
  los sinónimos (`matchesSearch` en `js/app.js`), pero encontrar una ficha
  relacionada no garantiza que la palabra esté explicada con suficiente
  claridad.
- Revisa todas las acepciones difíciles de una palabra. Cada significado
  independiente que cumpla los criterios puede tener su propia ficha, con
  `id`, `situacion` y `definicion`; no lo añadas entre paréntesis al lema
  (ver «Palabras con doble significado» en `SPEC.md`).
- La minería automática descarta una palabra solo si su lema ya aparece en
  el campo `palabra` de una entrada. Si aparece únicamente como sinónimo o
  en un ejemplo, sigue siendo candidata para revisión editorial.

#### 4. Comprueba el alcance y asigna la categoría

- Descarta los sentidos que nombren plantas, árboles, frutas o animales,
  incluidas especies y grupos taxonómicos: el vocabulario de conocimiento
  natural queda fuera del alcance. Decide por el significado de la ficha,
  no por coincidencias parciales del lema. Conserva una acepción distinta
  que nombre un proceso, una afección o un concepto independiente dentro
  del ámbito del diccionario (por ejemplo, una enfermedad causada por un
  animal). Los filtros por subcadena pueden dar falsos positivos: compartir
  letras con una raíz jurídica no demuestra relación semántica.
- Descarta los sentidos cuyo uso esté limitado explícitamente a una región
  o país. Comprueba la marca geográfica de la acepción, no solo el origen de
  la palabra. Si una ficha mezcla un sentido regional con otro de uso general,
  conserva solo el sentido general cuando sea independiente y difícil; si no,
  retira la ficha. No incluyas un sentido local solo porque el diccionario lo
  registre.
- La categoría se **asigna después** de valorar la palabra; no sirve para
  aceptarla o descartarla. Las categorías usadas por los métodos E y F de
  la sección 3.3 ayudan a descubrir candidatas: que una palabra no aparezca
  en una categoría cruzada no la invalida. Si aparece bajo una categoría de
  Wikipedia o Wikcionario (por ejemplo, «Derecho»), tómala como pista, no
  como su `situacion` final.
- Si ninguna categoría actual encaja, propone una nueva, aunque solo haya
  una candidata bien fundamentada. No la fuerces en la categoría menos
  inadecuada. `vida-diaria` es válida cuando realmente encaja, no como cajón
  de sastre. El mantenedor decide si crea la categoría y la propuesta debe
  quedar explícita; no descartes la palabra en silencio.

#### 5. Completa la ficha

- Usa un escenario de ejemplo propio: no repitas el mismo contexto dentro
  de una categoría.
- Como orientación inicial, busca lemas de 4 a 12 letras. Es una heurística,
  no una regla de aceptación.

Ningún filtro sustituye la revisión editorial de una persona o un agente de
IA; ambos deben aplicar los mismos criterios.

Cuando rechaces una candidata, regístrala con
`node scripts/ingest/pipeline/shared/record-rejection.js --lang <es|en> palabra`.
Los filtros consultan esa lista para no volver a proponerla. Al excluir una
ficha existente, registra su `id`, lema y motivo en
`scripts/ingest/pipeline/decisions/editorial-exclusions-{idioma}.json`.
Estas decisiones se respetan al reconstruir el diccionario y al volver a
minar o ingerir candidatas; excluir una ficha no crea sinónimos ni
redirecciones de búsqueda. Consulta el flujo y el estado de la ingesta en
[`scripts/ingest/README.md`](../../scripts/ingest/README.md) y
[`scripts/ingest/PROGRESS.md`](../../scripts/ingest/PROGRESS.md).

### 3.2 Cómo incorporar los pictogramas

1. Busca el lema en [OpenSymbols](https://www.opensymbols.org/) con
   `node scripts/search-pictogram.js "<lema>" <idioma>`. Si no encuentras
   una imagen adecuada, prueba un sinónimo o una descripción breve; el
   buscador también consulta ARASAAC como alternativa.
2. Elige una imagen que represente el sentido de la ficha. Reutiliza el
   `image.id` de otra entrada si ya tiene una imagen adecuada; si no, guarda
   la imagen como `img/<id>.png` y asigna ese id y un texto alternativo breve
   en el campo `image`.
3. Si la imagen no es de ARASAAC, anota su banco, autoría y licencia, y
   actualiza los créditos del pie en `js/i18n.js`.

## 4. Seguimiento de lotes (ingesta masiva)

Cuando uno de los métodos de la [guía de fuentes, sección 2](guia-fuentes.md#2-métodos-de-búsqueda) produce muchos
candidatos de golpe (sobre todo los métodos C y F), las entradas
resultantes se preparan como un **lote**
(`scripts/ingest/batches/batch_<idioma>_<categoria>_<n>.js`) en vez
de escribirse una a una directamente en `js/data.<lang>.js`. Un lote
recorre estas etapas — el detalle de cada script está en
[`scripts/ingest/README.md`](../../scripts/ingest/README.md):

```
borrador → validar-batch → dedupe-batch → ingesta_batch/insertar-batch
         → inject-batch-translations (enlace ES→EN) → fix_pictos (si hace falta)
         → borrar el fichero del lote
```

El último paso es el que no siempre ocurre a mano de forma fiable,
así que `scripts/ingest/batches/` puede acumular ficheros que ya
están, en realidad, en el diccionario.

### 4.1 Comprobar el estado de un lote

```sh
node scripts/ingest/pipeline/estado-lotes.js            # una línea por fichero de lote
node scripts/ingest/pipeline/estado-lotes.js --detalle   # + qué palabras del lote siguen pendientes
```

Para cada fichero `batches/batch_<idioma>_*.js`, cruza cada entrada
(por `palabra`, o por `id` cuando existe) contra
`js/data.<idioma>.js` y lo clasifica como:

- **LANDED (se puede borrar)** — todas las entradas del lote ya están
  en el diccionario. El contenido canónico vive en
  `js/data.<idioma>.js`, no en el lote.
- **PARTIAL (revisar)** — algunas entradas aterrizaron y otras no.
  O la ingesta se interrumpió a medias, o el fichero se editó a mano
  con entradas nuevas después de que un primer lote ya aterrizara.
  Usa `--detalle` para ver qué palabras faltan y decide a mano si
  terminarlas de insertar o descartarlas.
- **PENDING (sin procesar)** — nada del lote está aún en el
  diccionario. Backlog genuino.
- **ERROR** — el fichero no se puede cargar con `require()` (error de
  sintaxis, o no exporta un array). Requiere revisión manual antes de
  fiarse de cualquier otra clasificación.

Esto se calcula siempre contra el `js/data.<idioma>.js` actual, nunca
contra una foto fija: el estado de un lote cambia cada vez que corre
el pipeline, así que una tabla escrita a mano quedaría desactualizada
antes del siguiente lote.

### 4.2 Cuidado: los finales de línea CRLF rompen los reemplazos ingenuos

`js/data.es.js` y `js/data.en.js` usan finales de línea **CRLF**
(`\r\n`). Cualquier script del pipeline que reemplace un campo in situ
buscando un literal `"...,\n"` para encontrar dónde termina obtendrá
`indexOf(...) === -1` en los ficheros reales de este repositorio; si
ese `-1` se usa en aritmética posterior sin comprobación (`-1 + 2 =
1`, y luego `src.slice(1)`), el "reemplazo" se convierte en silencio
en "conservar casi todo el resto del fichero y volver a añadirlo
después del campo nuevo" — en cada llamada. Guardar el fichero tras
cada lote agrava el problema rápido.

Cualquier script nuevo que toque estos ficheros in situ debe anclar
los límites de campo con una expresión regular ajustada a la forma
real del campo (ver `IMAGEN_FIELD_RE` en
`scripts/ingest/pipeline/resustituir-pictos.js` o
`scripts/ingest/pipeline/fix_pictos.js`), nunca una búsqueda de salto
de línea a pelo.

## 5. La receta técnica

Con la palabra ya elegida, redacta la entrada con las reglas de
lectura fácil de `SPEC.md` y añádela editando `js/data.<lang>.js` (y
**solo** ese fichero). El validador (`scripts/check.js`) recorre
todos los idiomas en una sola pasada y rechaza:

- Una entrada que no encaja con el esquema.
- Una entrada cuya categoría no está en el catálogo.
- Una palabra duplicada en el mismo idioma.
- Una entrada que incumple las comprobaciones de lectura fácil
  descritas en [`SPEC.md`](SPEC.md).

Antes de abrir el PR:

```sh
node scripts/search-pictogram.js <palabra> <idioma>
node scripts/content-status.js --detalle --categoria <categoria> --lang <lang>
node scripts/check.js
```

## 6. Lista de comprobación antes de abrir un PR

- [ ] Palabra elegida genuinamente difícil **en este idioma**, no
      una traducción palabra-por-palabra de una entrada en
      español/inglés.
- [ ] Entrada conforme al esquema de
      [`tecnico.md`](tecnico.md) §"Modelo de datos".
- [ ] Definición en lectura fácil (una idea por frase, corta,
      palabras llanas).
- [ ] Frase de ejemplo que usa la palabra en un contexto real y
      concreto.
- [ ] Pictograma localizado e inspeccionado
      (`node scripts/search-pictogram.js`).
- [ ] Sin duplicado de una entrada existente en el mismo idioma y
      tema.
- [ ] Voz equivalente del otro idioma comprobada; cuando existe, ambas
      entradas incluyen el enlace `traduccion` correspondiente.
- [ ] `node scripts/check.js` pasa.

## 7. Ver también

- Guía pedagógica canónica (Apptonomia):
  [guia-crear-elementos.md](https://github.com/miralante/apptonomia/blob/main/doc/es/guia-crear-elementos.md).
- Idiomas:
  [`idiomas.md`](idiomas.md).
- Receta técnica:
  [`tecnico.md`](tecnico.md).
- Reglas innegociables del producto:
  [`SPEC.md`](SPEC.md).
- Guía de fuentes para buscar candidatas:
  [`guia-fuentes.md`](guia-fuentes.md).
- Catálogo de palabras y juegos:
  [`actividades.md`](actividades.md).
