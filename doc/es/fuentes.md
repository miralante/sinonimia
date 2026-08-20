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

### Ejemplo real (2026-07-26 a 2026-08-16)

Esta técnica no es solo teórica — es la que más entradas reales ha
producido de las tres, con corpus concretos en `dev/corpus/` (carpeta
gitignored, contenido del mantenedor, no en el repo):

- `dev/corpus/trabajo-es.txt` — contratos laborales, nóminas, finiquitos,
  ERE.
- `dev/corpus/servicios-es.txt` — facturas, contratos de servicios,
  suministros.
- `dev/corpus/registro-propiedad-es.txt` — escrituras, notas simples,
  hipotecas.

Contra esos tres corpus, `candidatos-corpus.js` (rankeando por keyness
frente a hermitdave/FrequencyWords como línea base de lenguaje corriente)
dejó, en dos pasadas separadas (commits `b40926e` y `5c48c64`): 34 ES + 34
EN de la primera pasada (repartidas entre `trabajo`, `vivienda`, `legal`,
`tramites`) y un puñado más de huecos genuinos en la segunda
(`comercializadora`, `distribuidora`, `prestatario`, `prestamista` / sus
espejos en inglés — `energy supplier`, `grid operator`, `lender`; la
mayoría de candidatos de keyness de la segunda pasada ya estaban cubiertos
por una entrada o sinónimo existente, la señal de que el hueco real es
pequeño cuando la categoría ya tiene cuerpo).

El mismo aviso que se repite en el punto 4b de más abajo ya apareció aquí
primero: `5c48c64` tuvo que corregir a mano un pictograma que
`ingesta_batch.js` emparejó con "eléctrica" y devolvió una silla de ruedas
eléctrica — la colisión de palabra, no de significado, no es un problema
nuevo de esta semana, lleva pasando desde la primera vez que se usó el
pipeline automático.

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

**Aviso de honestidad**: a diferencia de los Prompts A y C (con pasadas
reales documentadas más abajo, con commit y cifras), no hay rastro en el
historial de git de que este prompt se haya ejecutado de verdad contra
ninguno de los glosarios de la tabla de más abajo — ni MedlinePlus, ni
SEPE, ni INCIBE, ni ningún otro término de esa lista aparece en ningún
mensaje de commit. La tabla es un punto de partida razonable (fuentes
reales, en lenguaje claro, con URLs plausibles), pero **no está
verificada en la práctica** todavía. Si la usas, confirma que la fuente
sigue existiendo y sigue siendo lenguaje claro de verdad antes de fiarte
de la entrada de la tabla, y considera añadir aquí el resultado real
cuando la uses por primera vez, como ya se hizo con A y C.

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
4b. **Señal positiva: B1-C1 como refuerzo, no como sustituto** — el punto 4
   solo *descarta* (A1/A2 atestiguado); no usa el resto de columnas de
   CEFRLex para nada. Se puede ir un paso más allá y usar la atestiguación
   en B1, B2 o C1 (`nb_doc@b1/b2/c1` > 0) como señal positiva de que vale
   la pena revisar el candidato a mano — en vez de solo "no demostrado
   elemental", exigir "demostrado de nivel intermedio-avanzado". Combinado
   con un filtro de dominio (raíces temáticas por categoría, o el propio
   corpus del Prompt A) reduce el fondo de "no A1/A2" a un puñado que sí
   compensa revisar palabra por palabra.

   **Aviso importante**: CEFRLex se construye a partir de lecturas
   graduadas y material de preparación de examen para estudiantes de
   idioma — vocabulario burocrático/médico/legal realmente especializado
   ("usufructo", "empadronamiento") a menudo está simplemente **ausente**
   de CEFRLex, no "atestiguado en C1". Exigir atestiguación B1-C1 en
   positivo descarta ese vocabulario tan de golpe como el punto 4 descarta
   el elemental — por eso esto es un filtro *complementario* que amplía el
   fondo de candidatos con vocabulario general de registro
   intermedio-avanzado (útil sobre todo para categorías menos
   jergales como `vida-diaria`, `seguridad` o `legal` en su vertiente más
   coloquial), no un reemplazo del punto 4 para el resto de categorías.

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

### Ejemplo real de dos pasadas (2026-08-18/19)

Un caso real ayuda más que la lista abstracta de criterios. Dos pasadas
seguidas con Prompt C, cada una con una fuente distinta:

- **Pasada 1 — léxico general (Kaikki + wordfreq) + filtro de raíces
  temáticas.** Fondo de partida: 96.511 palabras `es` / 58.140 `en` (todo
  el vocabulario de Kaikki/wordfreq que no está ya en el diccionario,
  sin filtro de dificultad). El filtro de raíces por categoría lo redujo
  a 543 `es` / 154 `en`; la revisión editorial a mano dejó **23 `es` / 13
  `en`** que de verdad cumplían el criterio ("aparece en cartas del
  ayuntamiento, en juicios o en la consulta médica").
- **Pasada 2 — CEFRLex B1-C1 en positivo (punto 4b) + el mismo filtro de
  raíces.** Fondo de partida: solo palabras `es`/`en` **atestiguadas** en
  B1, B2 o C1 y no en A1/A2 (5.956 `es` / 5.860 `en`). El filtro de
  raíces lo redujo a 51 `es` / 31 `en`; la revisión editorial dejó **17
  `es` / 9 `en`**.

Tres cosas no obvias que salieron de estas dos pasadas y que no estaban
documentadas antes:

- **El filtro de raíces temáticas da bastantes falsos positivos por
  colisión de subcadena, no de significado** — igual que el aviso ya
  existente sobre "abeja"/"custodia" en el punto 4, pero a nivel de
  palabra completa: "confianza" y "coherencia" no son términos de
  finanzas/legal, solo comparten letras con "fianza"/"herencia";
  "reemplazar" coincidió por contener "emplaz-" (de "emplazamiento") sin
  tener nada que ver con lo judicial. Hay que leer cada candidato, no
  solo comprobar que la raíz aparece.
- **`ingesta_batch.js` busca el pictograma por coincidencia literal del
  término en ARASAAC, y eso da falsos positivos peores que "no hay
  resultado"** (a diferencia del caso ya documentado en `SPEC.md`, donde
  el problema es que no aparece nada): buscar "cuentas" para
  "presupuestario" devolvió abalorios de collar (el otro significado de
  "cuentas"); buscar "company" para "shareholder" en inglés devolvió un
  grupo de personas ("acompañado/compañía", no "empresa"); buscar
  "court" para "litigate" en inglés devolvió una pista de tenis. **Hay
  que abrir y mirar cada imagen descargada, nunca fiarse solo de la
  palabra clave que ARASAAC le puso** — de las 43 palabras ingestadas en
  estas dos pasadas, 14 pictogramas iniciales había que corregirlos a
  mano tras verlos. No es un problema nuevo: el mismo fallo ya aparece en
  el historial de otras sesiones — `5c48c64` (2026-08-16, Prompt A) con
  "eléctrica" devolviendo una silla de ruedas eléctrica, `be08c21`
  (2026-08-16) con la abreviatura médica "ENT" devolviendo una acera
  ("pavement/sidewalk"). Cuatro sesiones distintas, mismo fallo — vale la
  pena tratarlo como parte estructural del proceso, no como un descuido
  puntual.
- **El punto 4b (CEFRLex B1-C1 en positivo) da un fondo mucho más
  pequeño pero de mayor precisión** que el léxico general sin filtrar:
  51+31 candidatos brutos frente a 543+154, con una tasa de aceptación
  editorial parecida (~35 % frente a ~24 %) pero mucho menos ruido que
  descartar a mano. Confirma el aviso del propio punto 4b: sirve como
  fuente complementaria, no sustituye la pasada de léxico general para
  categorías muy jergales (`legal`, `salud`) donde el vocabulario más
  especializado ni siquiera aparece en CEFRLex.

## Prompt D — ARASAAC como fuente (no solo como ilustrador)

Los Prompts A-C encuentran la palabra primero y buscan el pictograma
después — y ese segundo paso falla con frecuencia (ver los avisos de
colisión de palabra clave más arriba). Este prompt invierte el orden:
parte del banco de pictogramas de ARASAAC y busca qué conceptos ya
ilustrados todavía no son una entrada de Sinonimia. Toda palabra que sale
de aquí **ya tiene pictograma garantizado** — elimina de raíz el problema
que más tiempo ha costado en las dos pasadas de esta semana.

`api.arasaac.org` no documenta un endpoint "todos los pictogramas" de
forma obvia, pero `GET /api/pictograms/{idioma}/new/{n}` (pensado para
"los N pictogramas más nuevos") en la práctica **devuelve el banco entero
si `n` es mayor que el total** — verificado en vivo: `n=20000` devolvió
los 13.802 pictogramas que tiene ARASAAC hoy, con sus `categories`,
`keywords` (en el idioma pedido) y el flag `schematic`, en una sola
llamada de ~2-3 segundos. No hace falta clave ni cuenta.

```
1. Descarga el banco completo:
   GET https://api.arasaac.org/api/pictograms/{idioma}/new/20000
2. Filtra por las categorías de ARASAAC más afines a la categoría AIVD
   que te interese (ver la lista de abajo) y descarta schematic:true
   (los esquemáticos suelen ser peor candidato editorial).
3. Descarta cualquier candidato ya cubierto — igual que en el resto de
   prompts, cruza contra
   `node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}`.
4. Revisa a mano: el banco de ARASAAC está pensado para tableros de
   comunicación aumentativa (CAA), no para vocabulario burocrático — la
   mayoría de lo que sale son verbos/objetos/acciones muy concretos y
   corrientes ("vendar", "tomar la temperatura", "propina"), justo lo que
   SPEC.md pide excluir. Solo una fracción pequeña encaja en "aparece en
   una carta oficial, un juicio o la consulta médica"; el resto sirve
   para descartar, no para redactar.
5. Redacta la entrada, valida con scripts/validar.js. El pictograma no
   hace falta buscarlo — ya tienes su `_id` del paso 1.
```

Categorías de ARASAAC que suelen mapear a una categoría AIVD de
Sinonimia (de 567 categorías totales que tiene el banco — la mayoría son
vocabulario CAA genérico sin relación, ver el ejemplo real):

| Categoría AIVD | Categorías de ARASAAC afines |
|---|---|
| `legal` | `law`, `law and justice`, `court document`, `legal institution` |
| `finanzas` | `financial services`, `money` |
| `tramites` | `public administration` |
| `salud` | `disease`, `symptom`, `medical procedure`, `medical test`, `medicament`, `medical document`, `medical documentation`, `orthopedic product` |
| `tecnologia` | `information technology` |
| `seguridad` | `road safety`, `security and defense` |
| `educacion` | `educational document`, `educational institution` |

### Ejemplo real (2026-08-19)

Descargué el banco completo (13.802 pictogramas `es`) y lo crucé contra
`js/data.es.js` filtrando por las 20 categorías de ARASAAC de la tabla de
arriba y descartando `schematic:true`: **495 candidatos no cubiertos**.
Una muestra de los primeros 60 confirma el aviso del paso 4 — mayoría
ruido de tablero CAA ("dar crema", "quitar sensor de glucosa", "poner
una tirita", "propina"), pero con hallazgos genuinamente buenos mezclados
dentro: `colegio de abogados` (`law`), `cambio de moneda` y `servicio de
envío de dinero` (`financial services`), `tinnitus` y `reflujo gástrico`
(`symptom`/`disease`), `corsé ortopédico` (`orthopedic product`),
`escáner de maletas` y `validar tarjeta` (`security and defense`). Tasa
de aprovechamiento estimada a ojo sobre la muestra: más baja que el punto
4b (CEFRLex), pero cada candidato aceptado llega sin el riesgo de
pictograma-fantasma que sí tuvieron 14 de las 43 palabras de las dos
pasadas anteriores.

**Sobre OpenSymbols**: `scripts/buscar-pictograma.js` y
`scripts/ingest/pipeline/resustituir-pictos.js` ya lo integran, pero
**solo como buscador por término** (`GET /api/v2/symbols?q=...`), no como
banco navegable — no hay equivalente al `/new/{n}` de ARASAAC, así que no
sirve para minar candidatos nuevos sin ya tener una palabra en mente.
Además exige una clave (`OPENSYMBOLS_SECRET`, se pide en
https://www.opensymbols.org/api — no está configurada en esta máquina, no
se ha podido probar en vivo) y agrega bancos con licencias distintas de
ARASAAC (Sclera CC BY-NC, Mulberry CC BY-SA, twemoji CC BY...) — usar una
imagen que no sea de ARASAAC obliga a actualizar el crédito del footer
(`pieCreditosHtml` en `js/i18n.js`) en el mismo cambio, ver
"Pictograms" en `tecnico.md`. Como fuente de **candidatos** (el uso que
pregunta este documento), OpenSymbols no aporta nada que ARASAAC solo no
tenga ya — su valor real en este proyecto sigue siendo el ya documentado:
alternativa de pictograma cuando ARASAAC no tiene nada bueno para una
palabra que ya se ha elegido.

## Prompt E — categorías de Wikipedia como lista de términos

Misma idea que el Prompt D (minar una lista ya curada en vez de rankear
frecuencia) pero con Wikipedia en lugar de ARASAAC: las categorías de
Wikipedia dedicadas a un campo (`Categoría:Términos_jurídicos`,
`Categoría:Términos_médicos`...) son, en la práctica, un glosario de
jerga ya filtrado por gente que decidió que ese concepto merecía su
propio artículo. La API de MediaWiki lo expone sin necesidad de clave:

```
GET https://{es|en}.wikipedia.org/w/api.php?action=query&list=categorymembers
    &cmtitle=Categoría:{categoría}&cmlimit=500&format=json
```

Probado en vivo (2026-08-19), tamaño de categoría por dominio:

| Categoría | `es` | `en` |
|---|---|---|
| Legal (`Términos_jurídicos` / `Legal_terminology`) | 383 | 327 |
| Médico (`Términos_médicos` / `Medical_terminology`) | 500+ (paginada) | 404 |
| Financiero (`Terminología_financiera` / —) | 35 | **no existe** una categoría equivalente en `en` con ningún nombre razonable probado (`Finance_terminology`, `Financial_terms`, `Banking_terminology` — las tres vacías); el árbol de categorías financieras de la Wikipedia en inglés está mucho más disperso que el jurídico/médico. |

Una muestra de `Categoría:Términos_jurídicos` da una idea de la precisión:
`Abandono (Derecho)`, `Aberratio ictus`, `Abrogación`, `Absolución
(derecho)`, `Abuso del derecho`, `Acta notarial`, `Acto jurídico` — jerga
genuina, mucho más densa en términos "difíciles de verdad" que el Prompt
D (ARASAAC), que trae sobre todo vocabulario CAA corriente.

```
1. Descarga la categoría completa (paginando con `cmcontinue` si hace
   falta, la API lo indica en la respuesta):
   GET https://{idioma}.wikipedia.org/w/api.php?action=query&list=categorymembers
       &cmtitle=Categoría:{categoría}&cmlimit=500&format=json
2. Limpia los títulos: quita desambiguadores entre paréntesis
   ("Absolución (derecho)" -> "absolución"), descarta páginas
   "Lista de...", "Portal:...", "Anexo:...", que no son un concepto
   individual.
3. Descarta lo ya cubierto (estado-contenido.js --detalle, igual que el
   resto de prompts).
4. Confirma a mano que el término es una palabra real de uso corriente en
   ese campo, no un tecnicismo latino/académico que ni un profesional lo
   usaría en una carta (aquí sí hace falta cribar duro: "Aberratio ictus"
   es java jurídica, no algo que aparezca en una notificación del
   juzgado).
5. Redacta la entrada, busca pictograma (aquí SÍ hace falta buscarlo —
   a diferencia del Prompt D, Wikipedia no da un pictograma gratis).
```

**Sobre "diccionarios gratuitos español/inglés"**: ya se usan dos, solo
que en otro punto de este documento — Kaikki.org (extracto de Wiktionary,
punto 3 del Prompt C) es exactamente eso, un diccionario libre bilingüe a
escala masiva, y ya alimenta `es_list_clean.js`/`en_list_clean.js`. Lo
único que no se había probado es **dictionaryapi.dev**
(`api.dictionaryapi.dev/api/v2/entries/en/<palabra>`, gratis, sin clave,
también viene de Wiktionary) — probado en vivo, funciona pero de forma
intermitente (dos 502 seguidos antes de responder 200), y solo consulta
**una palabra a la vez**: sirve para verificar/enriquecer un candidato ya
elegido (traer una definición corriente de referencia), no para
descubrir candidatos nuevos en bloque. Como fuente de candidatos no
aporta nada que Kaikki no traiga ya a escala.

**Categorías amplias vs. categorías concretas**: las categorías temáticas
grandes de Wikipedia (`Términos_jurídicos`, `Términos_médicos`,
`Pedagogía`...) están dominadas por jerga académica/de manual —
mucho que descartar por cada palabra aprovechable. Las categorías más
concretas y orientadas al consumidor dan mucha mejor proporción:
`Categoría:Contratos`, `Categoría:Impuestos_de_España`,
`Categoría:Seguros` (`es`) y `Category:Contract_law`,
`Category:Tax_terms`, `Category:Consumer_protection` (`en`) dieron
términos como "letra chica", "copago", "cláusula de rescisión",
"tax refund" o "right to repair" — vocabulario que aparece de verdad en
una carta del banco o una póliza, no solo en un manual de derecho. Antes
de tirar de una categoría amplia, busca si existe una subcategoría o una
categoría hermana más específica para el trámite/documento/producto
concreto — casi siempre da mejor cosecha con menos criba.

**Categoría a evitar deliberadamente**: `Categoría:Discapacidad` /
`Category:Disability` existe y tiene vocabulario real, pero **no se ha
minado a propósito** — aunque `js/data.*.js` está fuera del escaneo de
términos prohibidos de `scripts/validar.js` (una entrada de diccionario
sobre un trámite real ligado a una discapacidad sería contenido
legítimo, no una violación), sistematizar la extracción masiva de
vocabulario desde esa categoría concreta cruza la línea de "término
burocrático que aparece de vez en cuando" a "fuente de contenido
centrada en discapacidad", justo lo que este proyecto evita por diseño
(ver la regla de cero menciones más arriba). Si un término
disability-adjacent aparece de forma natural en otra categoría (p. ej.
"certificado de discapacidad" saliendo de una búsqueda de documentos
oficiales), trátalo caso a caso con el mismo criterio editorial de
siempre — pero no conviertas esta categoría en fuente de una pasada.

**Rendimientos decrecientes en `salud`**: más allá de las categorías ya
documentadas, `Categoría:Farmacología`/`Category:Pharmacy` y
`Categoría:Salud_mental`/`Category:Mental_health` dieron muy poco
aprovechable — la primera es casi toda nomenclatura química de
principios activos, la segunda mezcla teoría clínica abstracta con
terminología sensible que pide más cautela editorial de la habitual. A
estas alturas (ver tabla de balance de sesión más abajo) `salud` es la
categoría AIVD con menos recorrido por esta vía — el Prompt A (corpus
real: prospectos, informes de alta) sigue siendo la mejor apuesta para
ampliarla.

### Balance de la sesión de minería por categorías (2026-08-19/20)

Diez lotes seguidos con el Prompt E (más uno con el D), categoría de
Wikipedia por categoría, hasta notar el rendimiento decreciente descrito
arriba:

| Categoría AIVD | Palabras aceptadas (ES+EN aprox.) | Categorías de Wikipedia usadas |
|---|---|---|
| `legal` | ~35 | Términos_jurídicos/Legal_terminology, Contratos/Contract_law |
| `trabajo` | ~30 | Derecho_laboral/Labour_law, Seguridad_social/Social_security |
| `finanzas` | ~28 | Terminología_financiera/Insurance, Impuestos_de_España/Tax_terms, Hipotecas/Mortgage |
| `seguridad` | ~25 | Seguridad/Safety, Prevención_de_riesgos_laborales/Occupational_safety_and_health, Emergency_services |
| `tramites` | ~20 | Administración_pública/Public_administration |
| `vivienda` | ~18 | Urbanismo/Real_estate, Renting |
| `tecnologia` | ~15 | Terminología_informática/Computing_terminology, Comercio_electrónico/E-commerce |
| `educacion` | ~10 | Pedagogía, Student_financial_aid |
| `salud` | ~8 | Términos_médicos/Medical_terminology (parcial), Patient_safety |

**Total de la sesión: 236 palabras nuevas** (128 ES / 108 EN) en 10 lotes,
repartidas entre las cuatro técnicas documentadas en este archivo
(léxico general, CEFR B1-C1, ARASAAC, Wikipedia). `salud` quedó
claramente rezagada porque sus categorías de Wikipedia son las más
técnicas/sensibles de las nueve — el próximo hueco a tapar con Prompt A
si se retoma esta expansión.

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
