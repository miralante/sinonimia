# Fuentes de palabras candidatas

Complemento de "Proceso para ampliar el contenido" en [`SPEC.md`](SPEC.md)
— el paso 3 de esa sección describe dos formas de buscar términos
candidatos para una categoría (un glosario de referencia ya existente, o
un corpus de dominio comparado por *keyness* frente a la lengua general
con `scripts/candidatos-corpus.js`). Este archivo es la versión práctica y
lista para copiar de ese paso: una plantilla de prompt para cada método, y
una tabla de fuentes plausibles para cada categoría `situacion`, en `es` y
`en`. La tabla es un punto de partida, no una lista cerrada — cambia
cualquier fila por la fuente real que tengas a mano.

Empieza siempre con:

```
node scripts/estado-contenido.js
```

para ver qué combinaciones de categoría+idioma necesitan trabajo. Una vez
elegida una, vuelve a ejecutarlo acotado a ella:

```
node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}
```

para ver qué palabras (con sus sinónimos, definición y ejemplo) ya están
cubiertas, para que ninguno de los dos métodos proponga un duplicado ni
recicle un escenario ilustrativo ya usado en esa categoría. Acotarlo así
también mantiene la salida pequeña — nunca abras `js/data.<idioma>.js`
directamente para responder esta pregunta, tiene 1MB+/20.000+ líneas por
idioma.

## Prompt A — corpus de dominio + keyness (`candidatos-corpus.js`)

Rellena `{categoria}` (una de `tramites`, `salud`, `vida-diaria`,
`finanzas`, `vivienda`, `trabajo`, `legal`, `tecnologia`, `seguridad`) y
`{idioma}` (`es`, `en`...), y dale esto a quien — persona o agente — vaya a
hacer la búsqueda:

```
Reúne un corpus de dominio para la categoría {categoria} en {idioma}
para el diccionario de lectura fácil Sinonimia.

1. Junta 15-30 fragmentos de texto REALES (no inventados) típicos de ese
   dominio — mira la tabla de fuentes de corpus en doc/es/fuentes.md
   para {categoria}.
2. Pega el texto crudo (tal cual aparece en la fuente, sin limpiar de
   más) en un .txt, p. ej. dev/corpus/{categoria}-{idioma}.txt.
3. Ejecuta: node scripts/candidatos-corpus.js <archivo> {idioma} 40
4. Descarta cualquier candidato que ya aparezca en
   `node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}`.
5. Para cada candidato que tenga sentido, confirma a mano que encaja en
   {categoria} y no en otra (una ontología de dominio no mapea 1:1 con
   las categorías AIVD de Sinonimia — juicio humano, no automático).
6. Redacta la entrada siguiendo las reglas de lectura fácil de SPEC.md,
   busca pictograma con scripts/buscar-pictograma.js, valida con
   scripts/validar.js.
```

## Prompt B — glosario de lenguaje claro ya existente

```
Busca un glosario de lenguaje claro YA EXISTENTE (no uno técnico lleno
de jerga) para la categoría {categoria} en {idioma}, para el diccionario
Sinonimia.

1. Busca fuentes reales, oficiales o de referencia, en lenguaje sencillo
   — mira la tabla de glosarios en doc/es/fuentes.md para {categoria}.
   Verifica que sea genuinamente "lenguaje claro" y no un glosario
   técnico que deja la jerga sin explicar.
2. Extrae los términos que el propio glosario ya explica en sencillo.
   Redacta con palabras propias de Sinonimia — no copies el texto de la
   fuente (derechos de autor y estilo propio lo exigen, tampoco vale
   traducir literalmente la fuente).
3. Descarta los términos que ya aparecen en
   `node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}`.
4. Confirma a mano que cada término encaja en la categoría AIVD
   correcta — la clasificación del glosario de origen no tiene por qué
   coincidir.
5. Redacta la entrada en js/data.{idioma}.js, busca pictograma con
   scripts/buscar-pictograma.js, valida con scripts/validar.js.
```

## Prompt C — lista de candidatos por frecuencia general + cribas

A diferencia de A y B (que buscan candidatos categoría a categoría), este
método construye un fondo de candidatos amplio, para todas las categorías
a la vez, partiendo de un corpus de frecuencia de la lengua general en
vez de un glosario o corpus de dominio. Sirve para una pasada de
"ampliación general" en vez de tapar un hueco concreto. Una lista de
frecuencia bruta trae mucho ruido — nombres propios, formas conjugadas,
vocabulario que ya se entiende — así que hace falta encadenar varias
cribas antes de que la lista valga la pena revisarla a mano. Esta sección
documenta esas cribas y sus fuentes, para que sean reproducibles aunque
no se use el script exacto que las implementó.

> La implementación de referencia (`scripts/ingest/pipeline/es_list_clean.js`
> y `en_list_clean.js`) es herramienta local del mantenedor y **no está en
> el repositorio** (todo `scripts/ingest/` está en `.gitignore` — ver
> [`scripts/ingest/README.md`](../../scripts/ingest/README.md)). Lo que sí
> es parte del proyecto, y por eso vive aquí, son los criterios: cualquiera
> (persona o agente) puede reconstruir el mismo filtrado a mano o con un
> script nuevo siguiendo esta lista.

1. **Validez léxica** — el candidato tiene que ser una palabra real de uso
   general, no un arcaísmo, dialectalismo o préstamo raro. Fuente:
   [rspeer/wordfreq](https://github.com/rspeer/wordfreq), listas
   `small_es.msgpack.gz` / `small_en.msgpack.gz` (~35.000 / ~29.000
   palabras repartidas en ~600 bandas de frecuencia). Sin este filtro, una
   fuente tipo Wiktionary devuelve mucho ruido completista.
2. **Nombres propios** — se descartan nombres de pila, apellidos, ciudades
   y países. Fuentes (las mismas listas en inglés sirven para `es`, porque
   un nombre propio no se traduce):
   - Nombres:
     [dominictarr/random-name](https://github.com/dominictarr/random-name)
     y
     [smashew/NameDatabases](https://github.com/smashew/NameDatabases)
     (`first names/us.txt`).
   - Apellidos: smashew/NameDatabases (`surnames/us.txt`).
   - Ciudades:
     [datasets/world-cities](https://github.com/datasets/world-cities).
   - Países:
     [umpirsky/country-list](https://github.com/umpirsky/country-list).
   Para `es` esto es auxiliar: la fuente principal de nombres propios es
   el POS "name" de Kaikki (siguiente punto), estas listas solo cubren los
   nombres internacionales que aparecen en el corpus de frecuencia sin
   tener entrada propia en el Wikcionario en español.
3. **Formas no independientes (`form-of`) y familias de palabras** —
   Wiktionary/Wikcionario documenta cada flexión gramatical (conjugación,
   género/número de participios, plural...) como su propia entrada,
   etiquetada `form-of` de la entrada base. Una entrada cuyos únicos
   sentidos son `form-of` no es un buen encabezado de diccionario por
   separado. Fuente: [Kaikki.org](https://kaikki.org/) (extractos de
   Wiktextract), filtrado a `lang_code === "es"` / `"en"` porque el
   extracto documenta decenas de idiomas a la vez.
   - Se colapsa una forma flexionada en su base **solo si la base también
     está en el fondo de candidatos** (nunca se inventa una base que no
     apareciera ya).
   - **`es`**: gerundios (`-ando/-iendo/-yendo`) y participios usados como
     adjetivo (`-ado/-ada/-ido/-ida` y sus plurales) colapsan a su
     infinitivo; el gerundio español no tiene entrada propia en
     Wiktionary casi nunca (a diferencia del inglés), así que ese colapso
     se hace por reconstrucción morfológica directa, no por `form-of`.
     Los verbos con pronombre enclítico (`abandonarlo`, `decírselo`) se
     descartan siempre — nunca son un encabezado de diccionario, con
     infinitivo candidato o sin él. Los sustantivos deverbales
     (`abandono`, `trabajo`, `cambio`) solo colapsan a su infinitivo
     cuando Kaikki confirma que esa misma palabra es también la forma de
     primera persona de ese verbo — así se evita tocar sustantivos que
     coinciden por casualidad con una conjugación (`cocina`, `campo`,
     `gasto` no tienen ese registro y se quedan intactos).
   - **`en`**: gerundios (`-ing`) solo colapsan si Kaikki no les da una
     entrada propia independiente — el inglés lexicaliza gerundios como
     sustantivo con frecuencia (`housing`, `meeting`, `premises`), el
     español casi nunca. Participios pasados y formas de 3.ª persona
     colapsan sin condición. Los plurales colapsan salvo que estén en una
     lista de excepciones a mano para significados que divergen del
     singular (`customs` ≠ "hábitos", `arms` ≠ "brazo", `damages` ≠
     "daño", `proceedings` ≠ "procedimiento").
4. **Vocabulario elemental ya conocido** — el filtro de frecuencia (punto
   1) confunde "poco frecuente en el corpus" con "difícil para el público
   objetivo", y no son lo mismo: en `small_es.msgpack.gz`, "abeja" (banda
   553 de 600) es literalmente más rara que "custodia" (banda 489) y casi
   tan rara como "allanamiento" (banda 552) — un corte por frecuencia que
   descarte "abeja" también se llevaría por delante términos jurídicos
   reales. Hace falta una fuente distinta, pensada para medir dificultad
   de aprendizaje y no frecuencia bruta. Fuente:
   [CEFRLex](https://cental.uclouvain.be/cefrlex/) — léxicos de
   frecuencia por nivel MCER/CEFR (A1-C1) para aprendices de una lengua
   extranjera:
   - `es`: [ELELex](https://cental.uclouvain.be/cefrlex/elelex/)
     (TSV en
     `https://cental.uclouvain.be/cefrlex/static/resources/es/ELELex.tsv`,
     14.290 términos).
   - `en`: [EFLLex](https://cental.uclouvain.be/cefrlex/efllex/)
     (TSV en
     `https://cental.uclouvain.be/cefrlex/static/resources/en/EFLLex.tsv`).
   - Licencia **CC BY-NC-SA 4.0** (igual que ARASAAC): uso no comercial y
     hay que mantener la atribución si se redistribuye el dato derivado.
   - Criterio: descartar un candidato si está **atestiguado** (columna
     `nb_doc@a1` o `nb_doc@a2` > 0, es decir, aparece en al menos un
     documento de ese nivel) en A1 o A2 — vocabulario elemental que la
     propia "Por qué 'solo palabras difíciles'" de [`SPEC.md`](SPEC.md) ya
     pide excluir. No usar el nivel de *máxima* frecuencia de la palabra:
     el corpus de CEFRLex se construye a partir de un puñado de lecturas
     concretas por nivel, así que una palabra puede tener su pico en B2
     solo porque un texto de ese nivel la mencionó varias veces, sin dejar
     de ser vocabulario claramente elemental — "abeja" es justo ese caso:
     su frecuencia más alta en ELELex cae en B2, pero está atestiguada en
     un documento A2, que es la señal que de verdad hace falta. Un
     candidato que no aparece en la lista, o que solo aparece desde B1 en
     adelante, se queda en el fondo — la ausencia en un léxico de
     aprendizaje de idiomas es un indicio más de que es un término
     especializado, no de que sea inválido. Este criterio es más agresivo
     de lo que parece (descarta ~3.600 candidatos `es` / ~1.800 `en` de
     golpe) y puede llevarse por delante alguna palabra moderadamente
     técnica que solo aparece de forma incidental en un texto A2
     (`acceder`, `actitud`) — el paso 4 de "Escribir cada entrada" sigue
     siendo el filtro final, así que el coste de un falso positivo aquí es
     bajo.
5. **Ya cubierto en el diccionario** — se descarta cualquier candidato que
   ya sea `palabra`, esté en `sinonimos`, en la palabra de `ejemplo` /
   `ejemploSinonimo`, o aparezca dentro del texto de `definicion` de una
   entrada existente (si una palabra ya se usa para explicar otra, ya está
   cubierta), en `js/data.es.js` y `js/data.en.js`, con variantes simples
   de plural regular. Esto es el mismo principio que los Prompts A y B ya
   piden vía `scripts/estado-contenido.js --detalle`, aplicado en bloque a
   una lista grande en vez de a mano candidato a candidato.
6. **Longitud** — heurística barata para recortar ruido: 4-12 letras en
   `es`, 4-10 en `en` (el español tiene palabras algo más largas de
   media). No sustituye a los criterios anteriores, solo evita procesar
   siglas, abreviaturas sueltas y compuestos larguísimos poco útiles como
   entrada de diccionario individual.

Ninguna de estas cribas sustituye el paso 5 de "Buscar términos
candidatos" (confirmar a mano que cada candidato encaja en la categoría) —
solo reduce el fondo de partida a algo que merece la pena revisar persona
por persona.

## Tabla de fuentes — glosarios de referencia

| categoría | `es` | `en` |
|---|---|---|
| `tramites` | Plan de Lenguaje Claro (AGE), guías de lenguaje claro de ministerios/ayuntamientos | plainlanguage.gov, guía de estilo del gobierno del Reino Unido |
| `salud` | MedlinePlus en español, glosarios de pacientes de sociedades médicas | MedlinePlus, glosarios de salud en lenguaje claro del NIH |
| `vida-diaria` | guías de lectura fácil generalistas (Plena Inclusión, Easy-to-Read Europe) | Easy-to-Read Europe, guías de vida cotidiana de plainlanguage.gov |
| `finanzas` | "Finanzas para Todos" (Banco de España / CNMV) | glosario del Consumer Financial Protection Bureau (CFPB) |
| `vivienda` | guías de consumo de vivienda (OCU), guías municipales de alquiler | glosario en lenguaje claro de HUD, guías "renting a home" del Reino Unido |
| `trabajo` | glosario laboral del SEPE / Ministerio de Trabajo | glosario en inglés llano de ACAS (UK), guías en lenguaje claro del US DOL |
| `legal` | Plan de Lenguaje Claro de Justicia, Diccionario del Español Jurídico (RAE — con cautela, no siempre es "claro") | glosarios de autoayuda en lenguaje claro de tribunales de EE. UU. |
| `tecnologia` | glosarios de alfabetización digital (INCIBE, Fundación ONCE, IMSERSO) | GCFGlobal, DigitalLearn.org, glosarios tecnológicos de AARP |
| `seguridad` | Protección Civil, 112, INSST, Cruz Roja | Ready.gov (FEMA), Cruz Roja Americana, términos en lenguaje claro de OSHA |

## Tabla de fuentes — corpus de dominio

| categoría | `es` | `en` |
|---|---|---|
| `tramites` | resoluciones/notificaciones oficiales (BOE o administración local), cartas de Hacienda/Seguridad Social, formularios | avisos oficiales de EE. UU./Reino Unido, cartas del IRS/HMRC, formularios oficiales |
| `salud` | prospectos de medicamentos, informes de alta hospitalaria, consentimientos informados | prospectos para pacientes, informes de alta hospitalaria, consentimientos informados |
| `vida-diaria` | instrucciones de electrodomésticos, avisos de comunidad de vecinos, folletos de transporte público | manuales de electrodomésticos, avisos de comunidad de propietarios/inquilinos, folletos de transporte público |
| `finanzas` | extractos bancarios, contratos de préstamo, folletos de productos bancarios | extractos bancarios, contratos de préstamo, hojas de información de productos |
| `vivienda` | contratos de alquiler, escrituras/hipotecas, facturas de suministros | contratos de alquiler, documentos de hipoteca, facturas de suministros |
| `trabajo` | nóminas, contratos laborales, cartas de baja médica, convenios colectivos | nóminas, contratos laborales, cartas de baja médica |
| `legal` | sentencias, notificaciones judiciales, documentos notariales | notificaciones judiciales, escritos legales, documentos notariales |
| `tecnologia` | manuales de apps, condiciones de uso, ayuda de smartphones | manuales de apps, condiciones de uso, artículos de soporte técnico de móviles |
| `seguridad` | protocolos de evacuación, avisos de Protección Civil/112, folletos de primeros auxilios | avisos de FEMA/Ready.gov, folletos de primeros auxilios de la Cruz Roja |
