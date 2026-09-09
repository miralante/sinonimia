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
suite Miralante viven en el repositorio de **Routime** en
[`guia-crear-elementos.md`](https://github.com/thenkdframe/routime/blob/main/doc/es/guia-crear-elementos.md).

Léela antes de diseñar nada. Cubre (entre otras cosas):

- Las 13 reglas obligatorias de accesibilidad (con su porqué).
- La escalera de pistas del método socrático (pista → pista más
  grande → respuesta).
- La paleta de refuerzo positivo (sonidos, animaciones, micro-copy).
- Los patrones de neuromarketing adaptados a la audiencia.
- La lista de comprobación del diseño de niveles (progresión
  Fácil → Medio → Difícil).

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
  permite uno-a-muchos).
- `notas` — notas internas, no se muestran a quien lee.

### 2.3 La regla "la palabra debe ser difícil en su propio idioma"

Esta es la regla editorial más importante (ver [`SPEC.md`](SPEC.md)
"Proceso para ampliar el contenido"). Sinonimia **no traduce
palabra por palabra** entre diccionarios: cada idioma elige las
palabras que son genuinamente difíciles **en ese idioma**. Un
término burocrático español sin equivalente inglés (y al revés) es
un caso normal y esperado.

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

### 2.5 "Mis frases" es contenido de quien lee, no del editor

Las frases propias de quien lee ("Mis frases") se guardan en el
`localStorage` de quien lee y nunca se convierten en entradas del
diccionario. El rol de apoyo no las cura; si quien escribe una
frase deja ver un hueco de vocabulario, el siguiente paso
adecuado es **añadir una entrada adecuada al diccionario**, no
copiar la frase de quien lee dentro.

## 3. Cómo encontrar palabras candidatas

Antes de escribir una entrada hace falta una palabra candidata real.
Esta sección explica dónde buscarlas, qué aporta cada fuente y qué
criterios debe cumplir una palabra para aceptarse. **Una fuente solo
propone palabras: nunca decide por sí sola que una palabra merece una
entrada** — eso siempre es criterio humano.

Para no duplicar palabra, sinónimo ni escenario de ejemplo, consulta
primero lo que ya existe en la categoría que te interesa:

```sh
node scripts/content-status.js
node scripts/content-status.js --detalle --categoria {categoria} --lang {idioma}
```

No abras `js/data.{idioma}.js` directamente: son archivos muy grandes.

### 3.1 Fuentes y para qué sirve cada una

| Fuente | Qué aporta | Cómo se usa |
|---|---|---|
| [Kaikki.org](https://kaikki.org/) | Extracto de Wikcionario: lemas en español (`lang_code === "es"`), formas flexionadas y una señal de nombre propio (`pos: "name"`). | Base de `es_list_clean.js` y del filtro de nombres propios de la ingesta (`proper-noun-check.js`). |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | Frecuencia de uso general (OpenSubtitles). | Prioriza candidatos; cacheado en `scripts/download/freq-es.txt`. |
| [Wikimedia](https://dumps.wikimedia.org/eswiktionary/latest/) | Títulos del Wikcionario español en bruto. | Amplía la cobertura de palabras de Kaikki. No es solo español (el Wikcionario ES incluye páginas de otras lenguas), por eso siempre se combina con el filtro `lang_code === "es"` de Kaikki. Conserva la licencia [CC BY-SA](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use). |
| [ARASAAC](https://api.arasaac.org/) | Banco de pictogramas. | Pictogramas de cada entrada, y también fuente directa de candidatos ya ilustrados (método D). |
| [OpenSymbols](https://www.opensymbols.org/) | Agregador de varios bancos de símbolos con licencia abierta (ARASAAC, Sclera, Mulberry...) tras una sola API. | Primera opción de `search-pictogram.js` (con `OPENSYMBOLS_SECRET`); si no hay resultados, cae a ARASAAC. Cada banco tiene su propia licencia — revísala en cada resultado antes de usarlo. |
| [Wikipedia](https://www.wikipedia.org/) | Categorías temáticas (jurídico, médico, financiero...). | Lista de términos agrupados por tema (método E). |
| [listapalabras.com](https://www.listapalabras.com/) | Lista alfabética de 87.363 cabeceras españolas únicas (no cubre `Ñ`). | Universo de palabras sin ningún filtro propio; solo es útil cruzado con categorías de dominio de Wikcionario (método F). Procesada por completo — detalle en la sección listapalabras.com de `scripts/ingest/PROGRESS.md`. |

### 3.2 Criterios para aceptar una palabra

1. **Válida y real.** Documentada en uso actual; descarta arcaísmos, dialectalismos y préstamos raros.
2. **Difícil de verdad.** Nada que la persona tipo ya entienda. La frecuencia orienta pero no decide por sí sola; CEFRLex/ELELex ayuda a descartar A1-A2, pero su ausencia no invalida una palabra técnica. Rechazo automático: sustantivos concretos cotidianos (mesa, pato), verbos de acción directa (comer, dormir) y vocabulario básico de adquisición temprana — ninguno necesita definición adaptada. En cambio, los conceptos abstractos o intangibles (leyenda, garantía) y las palabras con doble sentido o lenguaje figurado son buenas candidatas aunque su frecuencia general sea alta: esto aplica con cualquier método de la sección 3.3, no solo con el F (que lo detecta específicamente por acepción). En la ingesta masiva (método C), este rechazo automático lo aplica `scripts/ingest/pipeline/filters/common-words.js`, deliberadamente conservador — ver su cabecera.
3. **Lema independiente.** Sin conjugaciones, plurales ni formas con pronombre enclítico que no tengan entrada propia.
4. **Sin nombres propios.** Personas, apellidos, ciudades, países, marcas.
5. **Sin cobertura existente, salvo homónimo genuino.** Descarta como entrada nueva lo que ya expresa el mismo concepto que una entrada existente. Ojo: "mismo concepto" no equivale a "ya cubierta". Si la persona tipo puede encontrarse esa palabra concreta en un documento real y todavía no aparece como `palabra`, `sinonimo` ni en el `ejemplo` de la entrada existente, no basta con descartarla — añádela al array `sinonimos` de esa entrada. El buscador de la app indexa ese array (`matchesSearch` en `js/app.js`), así que un sinónimo real que se queda fuera de él es invisible para quien lo busque, aunque el concepto "esté cubierto" en la entrada. Un segundo significado igual de difícil sí es candidato legítimo — entrada nueva con su propio `id`/`situacion`/`definicion`, nunca una aclaración entre paréntesis en `palabra` (ver "Palabras con doble significado" en `SPEC.md`). Cuando se acepta una palabra, revisa todas sus acepciones difíciles, no solo la primera que aparezca. En la ingesta masiva, este cruce lo aplica `scripts/ingest/pipeline/filters/sinonimia-coverage.js`, que solo detecta coincidencia exacta de cadena — sigue siendo trabajo humano decidir si el sinónimo real merece sumarse al array aunque el filtro no lo marque como cubierto.
6. **Categoría: se asigna, no se filtra por ella.** Una palabra que cumple los criterios 1-5 se incorpora aunque hoy no exista una categoría AIVD que le encaje — no se rechaza ni se fuerza en la menos mala. Si ninguna encaja, ni siquiera `vida-diaria`, se propone una categoría nueva; no hace falta un grupo de candidatos parecidos, una sola palabra bien fundamentada basta. `vida-diaria` sigue siendo válido solo cuando de verdad es el mejor encaje, nunca el cajón donde meter lo que no tiene sitio. La decisión de crear la categoría es del mantenedor, pero la propuesta debe quedar explícita — nunca descartar la palabra en silencio. Los métodos de la sección 3.3 que usan una categoría para reducir una lista enorme (en particular E y F) son técnicas de *descubrimiento*, no el criterio de aceptación: que una palabra no aparezca en ninguna categoría cruzada no la descarta por dificultad, solo significa que esa técnica no la encontró. Y en dirección contraria: la etiqueta de categoría con la que una palabra *sí* aparezca en el método E o F (p. ej. una Categoría de Wikipedia o Wikcionario llamada "Derecho") es una pista de dónde buscar, nunca la `situacion` final — revisa cada candidata por sí misma primero (criterios 1-5) y decide su categoría después, con este mismo criterio 6, aunque acabe siendo distinta de la etiqueta que la trajo hasta aquí.
7. **Escenario propio.** No reutilices el mismo contexto de ejemplo dentro de una categoría.
8. **Longitud orientativa.** 4-12 letras como heurística inicial, no como regla absoluta.

Ningún filtro sustituye la revisión humana. Las coincidencias por subcadena en filtros temáticos producen falsos positivos: compartir letras con una raíz jurídica no implica relación semántica.

### 3.3 Métodos de búsqueda

**A. Corpus de dominio y *keyness*.** Método principal para cubrir una categoría concreta. Reúne 15-30 fragmentos reales en `dev/corpus/` (fuentes en la sección 3.5) y ejecuta:

```sh
node scripts/corpus-candidates.js dev/corpus/{categoria}-{idioma}.txt {idioma} 40
```

Compara la frecuencia del corpus con la lengua general y prioriza lo específico del dominio. Ha funcionado bien con contratos laborales, nóminas, finiquitos, facturas, escrituras, notas simples e hipotecas.

**B. Glosarios de lenguaje claro.** Busca un glosario oficial que explique términos en lenguaje sencillo (sección 3.5 es punto de partida; verifica que siga disponible). No copies definiciones: redacta con palabras propias y conserva solo lo que encaje en Sinonimia.

**C. Lista general de palabras + filtro de dominio.** Para ampliación amplia, no una categoría concreta. Combina Kaikki, Wikimedia, listapalabras.com y frecuencia, y cruza con un filtro temático — en la práctica, ese filtro es el método F, que es el paso que realmente decide si hay candidatos. Revisa el resultado palabra por palabra. CEFRLex/ELELex no debe exigirse para vocabulario jurídico, médico o burocrático muy especializado: puede no aparecer en sus lecturas graduadas.

**D. ARASAAC como fuente de candidatos.**

```text
https://api.arasaac.org/api/pictograms/{idioma}/new/20000
```

Descarta `schematic: true`, cruza con `content-status.js` y revisa significado e imagen. El banco tiene mucho vocabulario cotidiano de CAA que hay que descartar. Categorías útiles: `law`, `financial services`, `public administration`, `disease`, `medical procedure`, `information technology`, `road safety`, `security and defense`.

**E. Categorías de Wikipedia.**

```text
https://{es|en}.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:{categoria}&cmlimit=500&format=json
```

Pagina con `cmcontinue`, quita desambiguadores entre paréntesis, descarta listas y portales, revisa uso real. Las categorías de consumo concreto (contratos, impuestos, seguros, hipotecas, protección del consumidor, comercio electrónico) rinden más que las académicas amplias. No se usa `Categoría:Discapacidad` como fuente masiva.

**F. Categorías de dominio de Wikcionario.** Wikipedia agrupa *artículos*, así que una palabra común con un único sentido técnico difícil casi nunca aparece. Wikcionario etiqueta cada *acepción* por dominio, y sí detecta estas palabras polisémicas:

```text
https://{es|en}.wiktionary.org/w/api.php?action=query&list=categorymembers&cmtitle=Categoría:ES:{dominio}&cmlimit=500&format=json
```

Un resultado solo confirma que *una acepción* cumple los criterios: comprueba cuál antes de redactar y escribe la entrada solo para ese sentido. También es la mejor forma de comprobar si una palabra ya cubierta tiene otro sentido que merezca entrada propia.

`wiktionary_candidates.js --list-categories` lista todas las categorías `Categoría:ES:*` existentes con su tamaño, para elegir cuáles añadir al `PLAN` de ese mismo script (una única fuente, un único script, ver la regla de diseño en `scripts/ingest/README.md`). Pagina con `cmcontinue`; las categorías grandes pueden alcanzar el límite de paginación de la API.

**Regla de proceso: agotar el inventario de categorías, no minar solo un subconjunto elegido a mano.** El `PLAN` interno de `wiktionary_candidates.js` es un orden de prioridad, no un límite de cobertura: una categoría `Categoría:ES:*` que exista pero no esté en el `PLAN` no debe darse por descartada — solo significa que todavía no se ha minado. `wiktionary_candidates.js --exhaustive` amplía automáticamente el `PLAN` con cualquier categoría del inventario (`--list-categories`) que aún no tenga una entrada equivalente, etiquetándolas como `sin-asignar` (una pista de descubrimiento, nunca la `situacion` final — sigue aplicando el criterio 6) y evitando reminar las ya cubiertas en una ejecución previa. Antes de dar por explotada esta fuente, ejecuta `--exhaustive` y confirma que el inventario está agotado, no solo que el `PLAN` manual está completo. Este razonamiento no traslada igual al método E: Wikipedia no tiene un espacio de nombres equivalente a `Categoría:ES:*` que agrupe solo categorías-glosa de dominio (su namespace `Categoría:`/`Category:` mezcla temas, portales y listas de todo tipo), así que por ahora el `PLAN` de `wikipedia_candidates.js` sigue siendo una selección manual sin un modo `--exhaustive` equivalente — documentado como asimetría deliberada, no como un olvido.

### 3.4 Glosarios y corpus por categoría

| Categoría | Glosarios ES / EN | Corpus ES / EN |
|---|---|---|
| `tramites` | Plan de Lenguaje Claro de la AGE / plainlanguage.gov | BOE, Hacienda, Seguridad Social / IRS, HMRC |
| `salud` | MedlinePlus / MedlinePlus, NIH | Prospectos, altas hospitalarias, consentimientos |
| `vida-diaria` | Plena Inclusión, Easy-to-Read Europe / ídem | Manuales, comunidad de vecinos, transporte público |
| `finanzas` | Finanzas para Todos, CNMV / CFPB (EE. UU.) | Extractos, préstamos, productos bancarios |
| `vivienda` | OCU / HUD (EE. UU.) | Alquiler, escrituras, hipotecas, suministros |
| `trabajo` | SEPE / ACAS, US Department of Labor | Nóminas, contratos, bajas, convenios |
| `legal` | Plan de Lenguaje Claro de Justicia / autoayuda de tribunales de EE. UU. | Sentencias, notificaciones, documentos notariales |
| `tecnologia` | INCIBE, ONCE, IMSERSO / GCFGlobal, AARP | Ayuda de apps, condiciones de uso, smartphones |
| `seguridad` | Protección Civil, 112, Cruz Roja / Ready.gov, OSHA | Evacuación, primeros auxilios |

### 3.5 Advertencias sobre pictogramas

El pictograma se revisa siempre a mano. La coincidencia literal con etiquetas puede devolver otro significado: una palabra de electricidad puede producir una silla de ruedas eléctrica, `cuentas` puede producir abalorios y `court` una pista de tenis.

Si el pictograma elegido no viene de ARASAAC (por ejemplo, un resultado de OpenSymbols de otro banco), actualiza los créditos del pie con la licencia correspondiente.

## 4. Seguimiento de lotes (ingesta masiva)

Cuando una de las técnicas de la sección 3.3 produce muchos
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
- [ ] `node scripts/check.js` pasa.

## 7. Ver también

- Guía pedagógica canónica (Routime):
  [guia-crear-elementos.md](https://github.com/thenkdframe/routime/blob/main/doc/es/guia-crear-elementos.md).
- Idiomas:
  [`idiomas.md`](idiomas.md).
- Receta técnica:
  [`tecnico.md`](tecnico.md).
- Reglas innegociables del producto:
  [`SPEC.md`](SPEC.md).
- Catálogo de palabras y juegos:
  [`actividades.md`](actividades.md).
