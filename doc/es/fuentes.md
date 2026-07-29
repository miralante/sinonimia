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
node scripts/estado-contenido.js --detalle
```

para ver qué combinaciones de categoría+idioma necesitan trabajo y qué
palabras (con sus sinónimos) ya están cubiertas, para que ninguno de los
dos métodos proponga un duplicado.

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
   `node scripts/estado-contenido.js --detalle` para esa categoría/idioma.
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
   `node scripts/estado-contenido.js --detalle` para esa categoría/idioma.
4. Confirma a mano que cada término encaja en la categoría AIVD
   correcta — la clasificación del glosario de origen no tiene por qué
   coincidir.
5. Redacta la entrada en js/data.{idioma}.js, busca pictograma con
   scripts/buscar-pictograma.js, valida con scripts/validar.js.
```

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
