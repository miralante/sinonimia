# Fuentes de palabras candidatas

Guía práctica para encontrar, filtrar y revisar palabras nuevas para Sinonimia. Completa el "Proceso para ampliar el contenido" de [`SPEC.md`](SPEC.md).

## 1. Flujo rápido

1. Consulta el estado general:

   ```sh
   node scripts/estado-contenido.js
   ```

2. Elige una categoría y consulta solo sus entradas:

   ```sh
   node scripts/estado-contenido.js --detalle --categoria {categoria} --lang {idioma}
   ```

   Así se evitan duplicados, sinónimos ya cubiertos y ejemplos repetidos. No abras directamente `js/data.{idioma}.js`: son archivos muy grandes.

3. Obtén candidatos con uno de los métodos de la sección 4.
4. Revisa cada palabra: dificultad, uso real, categoría y posible duplicación conceptual.
5. Redacta la entrada con las reglas de lectura fácil de `SPEC.md`.
6. Busca y revisa el pictograma:

   ```sh
   node scripts/buscar-pictograma.js <palabra> <idioma>
   ```

7. Valida la entrada:

   ```sh
   node scripts/check.js
   ```

Una fuente solo propone palabras. Nunca decide por sí sola que una palabra merece una entrada.

## 2. Estado de las fuentes

### Integradas y procesadas

| Fuente | Qué aporta | Estado |
|---|---|---|
| [Kaikki.org](https://kaikki.org/) | Extracto estructurado de Wikcionario; permite filtrar `lang_code === "es"`, formas flexionadas y nombres propios. | Integrada en `es_list_clean.js`. |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | Frecuencia de uso general basada en OpenSubtitles. | Integrada como `scripts/.cache/freq-es.txt`. |
| [Wikimedia](https://dumps.wikimedia.org/eswiktionary/latest/) | `eswiktionary-latest-all-titles-in-ns0.gz`, títulos del espacio principal. | Integrada y procesada en streaming: 949.746 títulos brutos y 789.315 formas normalizadas en el volcado usado. |
| [ARASAAC](https://api.arasaac.org/) | Banco de pictogramas y posible fuente de candidatos ya ilustrados. | Probada como fuente de candidatos y de imágenes. |
| [Wikipedia](https://www.wikipedia.org/) | Categorías temáticas de términos jurídicos, médicos, financieros y otros. | Probada como lista de términos; requiere paginación y revisión manual. |

Wikimedia no es exclusivamente española: el Wikcionario español también contiene páginas de otras lenguas. Por eso se combina con Kaikki y su filtro `lang_code === "es"`. Los datos derivados de Wikimedia deben conservar la atribución y la licencia [CC BY-SA](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).

### Pendientes de procesar

| Fuente | Uso previsto | Trabajo pendiente |
|---|---|---|
| [listapalabras.com](https://www.listapalabras.com/) | Lista alfabética de cabeceras españolas. | Aplicar los filtros comunes y cruzarla con el diccionario. La captura existente tiene 89.086 palabras brutas y 87.363 únicas; no cubre `Ñ`. |
| [RLA-ES](https://github.com/sbosio/rla-es) | Universo ortográfico español Hunspell. | Extraer lemas, no todas las formas generadas; revisar licencia y deduplicar. |
| [an-array-of-spanish-words](https://github.com/words/an-array-of-spanish-words) | Universo amplio de unas 636.000 formas; licencia MIT. | Eliminar conjugaciones, plurales, nombres propios y ruido ortográfico. |
| [Open Multilingual WordNet](https://omwn.org/) | Lemas y relaciones de sinonimia, hiperónimo e hipónimo. | Evaluar los recursos españoles y las licencias de cada WordNet; usarlo para priorizar y encontrar sinónimos, no como lista plana. |
| [Leipzig Corpora Collection](https://wortschatz.uni-leipzig.de/en/download/) | Corpus y frecuencias por idioma. | Elegir un corpus español, documentar licencia y comparar frecuencias con `FrequencyWords`. |

Estas fuentes todavía no forman parte del resultado de `scripts/ingest/pipeline/es_list_clean.js`.

## 3. Criterios comunes

1. **Validez léxica.** La palabra debe ser real y estar documentada en el uso actual. Una lista de diccionario puede incluir arcaísmos, dialectalismos y préstamos raros.
2. **Dificultad.** No se incorporan palabras cotidianas que el público ya entiende. La frecuencia ayuda, pero no mide por sí sola la dificultad. CEFRLex/ELELex puede ayudar a descartar vocabulario A1-A2; su ausencia no demuestra que una palabra sea inválida.
3. **Lema independiente.** Se descartan conjugaciones, plurales y formas con pronombre enclítico cuando no tienen entrada propia. Kaikki identifica registros `form-of`; RLA-ES y las listas ortográficas necesitan análisis morfológico adicional.
4. **Nombres propios.** Se eliminan nombres de persona, apellidos, ciudades, países y marcas. Kaikki aporta una señal POS `name`, pero conviene revisar los casos dudosos.
5. **Cobertura existente.** Se descarta lo que ya aparece como palabra, sinónimo, palabra de ejemplo o explicación en `js/data.es.js` o `js/data.en.js` — pero solo para ese mismo sentido. Una palabra ya existente puede tener un segundo significado igual de difícil para la persona tipo (un homónimo, no una variación de matiz): eso sí es un candidato legítimo para una segunda entrada independiente, con su propio `id`, `situacion` y `definicion`, siguiendo el modelo de "Palabras con doble significado" de `SPEC.md` — nunca añadas una aclaración entre paréntesis al campo `palabra` para distinguirlas. No propongas una segunda entrada solo porque el otro sentido existe: solo vale la pena si ese sentido también es difícil de entender por sí mismo.
6. **Todas las acepciones válidas.** Cuando un candidato sea aceptado, hay que
   revisar sus distintos significados. Se incorporará cada acepción que sea
   difícil de entender por sí misma y cumpla el resto de los criterios de
   ingesta. Si los significados son independientes, se crearán entradas
   separadas con su propio `id`, `situacion`, `definicion` y ejemplo; no se
   ocultarán en una sola definición ni se añadirán aclaraciones entre
   paréntesis al campo `palabra`. Si una acepción es corriente o no cumple el
   criterio, se documenta como descartada y no se incorpora.
7. **Categoría.** La palabra debe encajar en una categoría AIVD concreta.
   `vida-diaria` es el cajón de sastre solo cuando ninguna otra categoría
   encaja mejor — y solo mientras no haya un grupo real de candidatos (no dos
   o tres sueltos) que apunte con claridad a una categoría distinta que hoy no
   existe. Cuando la ingesta encuentre uno de esos grupos, se debe proponer la
   categoría nueva en vez de forzarlos en `vida-diaria`: así se resolvió el
   grupo de derechos del consumidor (2026-08-20, movido a `finanzas` tras
   confirmar volumen real) y así se descartó el de duelo/exclusión social (se
   quedó en `vida-diaria` porque no compensaba una categoría solo para él). La
   decisión final de crear una categoría sigue siendo del mantenedor — una
   fuente o un lote de ingesta no la crea por sí sola.
8. **Escenario.** No se debe reutilizar el mismo contexto de ejemplo dentro de
   una categoría.
9. **Longitud.** Como heurística inicial, revisar preferentemente palabras de
   4-12 letras en español. No es una regla editorial absoluta.

Ningún filtro sustituye la revisión humana. Las coincidencias por subcadena en filtros temáticos producen falsos positivos: compartir letras con una raíz jurídica no implica tener relación semántica.

## 4. Métodos de búsqueda

### A. Corpus de dominio y *keyness*

Es el método principal para cubrir una categoría concreta. Reúne 15-30 fragmentos reales, guárdalos en `dev/corpus/` y ejecuta:

```sh
node scripts/candidatos-corpus.js dev/corpus/{categoria}-{idioma}.txt {idioma} 40
```

El script compara la frecuencia del corpus con la lengua general y prioriza palabras específicas del dominio. Las fuentes adecuadas están en la sección 6. Revisa manualmente categoría, cobertura y dificultad antes de redactar. Ha funcionado bien con contratos laborales, nóminas, finiquitos, facturas, contratos de servicios, escrituras, notas simples e hipotecas.

### B. Glosarios de lenguaje claro

Busca un glosario oficial o de referencia que explique términos en lenguaje sencillo. No copies definiciones: redacta con palabras propias y conserva solo los términos que encajen en Sinonimia. La tabla de la sección 5 es un punto de partida; verifica que cada fuente siga disponible y sea realmente clara.

### C. Lista general de palabras y filtros

Sirve para una ampliación amplia, no para una categoría concreta. Combina Kaikki, frecuencia, Wikimedia y las futuras fuentes de la sección 2. Ordena o prioriza por frecuencia, aplica los criterios comunes y después añade un filtro temático por categoría. El resultado debe revisarse palabra por palabra.

CEFRLex/ELELex puede aportar una señal positiva B1-C1, pero no debe exigirse para vocabulario jurídico, médico o burocrático muy especializado: puede no aparecer en sus lecturas graduadas.

### D. ARASAAC como fuente de candidatos

Descarga el banco de pictogramas, filtra por categorías y busca conceptos que aún no estén en Sinonimia. El candidato aceptado ya tiene una imagen disponible, pero el banco contiene mucho vocabulario cotidiano de CAA que debe descartarse.

Endpoint probado:

```text
https://api.arasaac.org/api/pictograms/{idioma}/new/20000
```

Descarta `schematic: true`, cruza con `estado-contenido.js` y revisa tanto el significado como la imagen. Categorías útiles: `law`, `financial services`, `public administration`, `disease`, `medical procedure`, `information technology`, `road safety` y `security and defense`.

### E. Categorías de Wikipedia

Las categorías temáticas pueden servir como lista de términos agrupada:

```text
https://{es|en}.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:{categoria}&cmlimit=500&format=json
```

Hay que paginar con `cmcontinue`, quitar desambiguadores entre paréntesis, descartar listas y portales, y revisar si el término es usado en documentos reales. Las categorías específicas orientadas al consumidor suelen ser más útiles que las categorías académicas amplias: contratos, impuestos, seguros, hipotecas, protección del consumidor y comercio electrónico.

No se usa `Categoría:Discapacidad` como fuente masiva. Los términos relacionados que aparezcan naturalmente en otra fuente se revisan caso por caso.

### F. Categorías de dominio de Wikcionario

Las categorías de Wikipedia agrupan *artículos*, así que una palabra común con un solo sentido técnico difícil (por ejemplo, `trabar`, `leyenda`) casi nunca aparece: su frecuencia global es demasiado alta aunque un sentido concreto sea difícil. Wikcionario, en cambio, etiqueta cada *acepción* por dominio, lo que sí detecta estas palabras polisémicas:

```text
https://{es|en}.wiktionary.org/w/api.php?action=query&list=categorymembers&cmtitle=Categoría:ES:{dominio}&cmlimit=500&format=json
```

Categorías de dominio útiles: `Categoría:ES:Derecho`, `Categoría:ES:Finanzas`, `Categoría:ES:Medicina`, `Categoría:ES:Informática`, `Categoría:ES:Educación`, `Categoría:ES:Construcción`, `Categoría:ES:Seguridad` (y sus equivalentes en inglés `Category:en:Law`, `Category:en:Finance`, `Category:en:Medicine`, `Category:en:Computing`, `Category:en:Education`). Pagina con `cmcontinue`; las categorías grandes (derecho, finanzas) pueden alcanzar el límite de paginación de la API.

Un resultado aquí solo confirma que *una acepción* de la palabra cumple los criterios: hay que comprobar qué acepción activó la etiqueta antes de redactar, y escribir la entrada solo para ese sentido. Esta es también la mejor forma de comprobar si una palabra ya cubierta por un sentido tiene otro que también merezca entrada: conviene consultar el listado de categorías de dominio antes de dar por hecho que sus otros significados son demasiado comunes.

## 5. Glosarios de referencia

| Categoría | Español | Inglés |
|---|---|---|
| `tramites` | Plan de Lenguaje Claro de la AGE; ministerios y ayuntamientos | plainlanguage.gov; guía de estilo del Gobierno británico |
| `salud` | MedlinePlus; sociedades médicas | MedlinePlus; NIH |
| `vida-diaria` | Plena Inclusión; Easy-to-Read Europe | Easy-to-Read Europe; plainlanguage.gov |
| `finanzas` | Finanzas para Todos; Banco de España/CNMV | Consumer Financial Protection Bureau |
| `vivienda` | OCU; guías municipales de alquiler | HUD; guías británicas de alquiler |
| `trabajo` | SEPE; Ministerio de Trabajo | ACAS; US Department of Labor |
| `legal` | Plan de Lenguaje Claro de Justicia; Diccionario del Español Jurídico, con cautela | Glosarios de autoayuda de tribunales estadounidenses |
| `tecnologia` | INCIBE; Fundación ONCE; IMSERSO | GCFGlobal; DigitalLearn.org; AARP |
| `seguridad` | Protección Civil; 112; INSST; Cruz Roja | Ready.gov; Cruz Roja Americana; OSHA |

## 6. Corpus de dominio

| Categoría | Español | Inglés |
|---|---|---|
| `tramites` | BOE, notificaciones de administraciones, Hacienda y Seguridad Social | Avisos de gobiernos, IRS/HMRC, formularios oficiales |
| `salud` | Prospectos, altas hospitalarias, consentimientos | Prospectos, altas hospitalarias, consentimientos |
| `vida-diaria` | Manuales, comunidad de vecinos, transporte público | Manuales, avisos de propietarios/inquilinos, transporte |
| `finanzas` | Extractos, préstamos, productos bancarios | Extractos, préstamos, información de productos |
| `vivienda` | Alquiler, escrituras, hipotecas, suministros | Alquiler, hipotecas, suministros |
| `trabajo` | Nóminas, contratos, bajas, convenios | Nóminas, contratos, bajas |
| `legal` | Sentencias, notificaciones, documentos notariales | Avisos judiciales, escritos legales, notariales |
| `tecnologia` | Ayuda de aplicaciones, condiciones de uso, smartphones | Manuales, condiciones de uso, soporte técnico |
| `seguridad` | Evacuación, Protección Civil/112, primeros auxilios | FEMA/Ready.gov, primeros auxilios de Cruz Roja |

## 7. Resultados y advertencias

Las pasadas documentadas con el léxico general, CEFRLex, ARASAAC y Wikipedia produjeron aproximadamente 236 palabras nuevas (128 ES y 108 EN). Wikipedia funcionó mejor en `legal`, `trabajo`, `finanzas` y `seguridad`; `salud` tuvo menos rendimiento por el carácter técnico de sus categorías.

El pictograma debe revisarse siempre. La coincidencia literal con etiquetas ARASAAC puede devolver otro significado: una palabra relacionada con electricidad puede producir una silla de ruedas eléctrica, `cuentas` puede producir abalorios y `court` puede producir una pista de tenis. No se debe aceptar una imagen descargada sin verla.

OpenSymbols ya se usa como buscador alternativo de pictogramas, pero no como fuente navegable de candidatos. Sus bancos tienen licencias distintas, por lo que usar una imagen no ARASAAC exige actualizar los créditos del pie.
