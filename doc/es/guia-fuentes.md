# Guía de fuentes para buscar palabras candidatas

Esta guía reúne fuentes y métodos para descubrir palabras que podrían
necesitar una entrada en Sinonimia. Una fuente aporta candidatas, no
decisiones editoriales: aplica siempre los [criterios de aceptación](guia-crear-elementos.md#31-criterios-para-aceptar-una-palabra)
y las comprobaciones previas de la [guía para crear elementos](guia-crear-elementos.md).

## 1. Fuentes y para qué sirve cada una

| Fuente | Qué aporta | Cómo se usa |
|---|---|---|
| [Kaikki.org](https://kaikki.org/) | Extracto de Wikcionario: lemas en español (`lang_code === "es"`), formas flexionadas y una señal de nombre propio (`pos: "name"`). | Base de `es_list_clean.js` y del filtro de nombres propios de la ingesta (`proper-noun-check.js`). |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | Frecuencia de uso general (OpenSubtitles). | Prioriza candidatos; cacheado en `scripts/download/freq-es.txt`. |
| [Wikimedia](https://dumps.wikimedia.org/eswiktionary/latest/) | Títulos del Wikcionario español en bruto. | Amplía la cobertura de palabras de Kaikki. No es solo español (el Wikcionario ES incluye páginas de otras lenguas), por eso siempre se combina con el filtro `lang_code === "es"` de Kaikki. Conserva la licencia [CC BY-SA](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use). |
| [Wikipedia](https://www.wikipedia.org/) | Categorías temáticas (jurídico, médico, financiero...). | Lista de términos agrupados por tema (método E). |
| [listapalabras.com](https://www.listapalabras.com/) | Lista alfabética de 87.363 cabeceras españolas únicas (no cubre `Ñ`). | Universo de palabras sin categoría propia. `es-candidates-listapalabras.js` aplica filtros automáticos de forma, cobertura, nombres propios, frecuencia y rechazos editoriales; la dificultad aún requiere revisión editorial. Nunca filtra por categoría de dominio (ver paso 4 de la sección 3.2). El resultado son ~66.600 candidatas reales, ordenadas con una pista de raíz/sufijo (no un filtro) para revisar primero las de mayor señal. Procesada por completo — detalle en la sección listapalabras.com de `scripts/ingest/PROGRESS.md`. |

## 2. Métodos de búsqueda

**A. Corpus de dominio y *keyness*.** Método principal para cubrir una categoría concreta. Reúne 15-30 fragmentos reales en `dev/corpus/` (fuentes en la sección 3) y ejecuta:

```sh
node scripts/corpus-candidates.js dev/corpus/{categoria}-{idioma}.txt {idioma} 40
```

Compara la frecuencia del corpus con la lengua general y prioriza lo específico del dominio. Ha funcionado bien con contratos laborales, nóminas, finiquitos, facturas, escrituras, notas simples e hipotecas.

**B. Glosarios de lenguaje claro.** Busca un glosario oficial que explique términos en lenguaje sencillo (consulta la sección 3; verifica que sigan disponibles). No copies definiciones: redacta con palabras propias y conserva solo lo que encaje en Sinonimia.

**C. Lista general de palabras, filtrada solo por dificultad.** Para ampliación amplia, no una categoría concreta. Combina fuentes de vocabulario general (Kaikki, Wikimedia, listapalabras.com, frecuencia) y aplica los filtros automáticos de forma, cobertura, nombre propio, frecuencia y rechazo editorial. La decisión de dificultad sigue requiriendo revisión palabra por palabra; nunca filtres por si una palabra aparece o no en una categoría de dominio externa (ver la guía para crear elementos, sección 3.1, paso 4). Una raíz o sufijo característico de un dominio (método F, o `shared/domain_stems.js`) puede usarse para decidir qué revisar primero, nunca para descartar el resto sin revisión. CEFRLex/ELELex no debe exigirse para vocabulario jurídico, médico o burocrático muy especializado: puede no aparecer en sus lecturas graduadas. Los scripts de las fuentes Kaikki/Wikimedia/frecuencia generales para inglés y español se retiraron 2026-09-09 al agotarse (ver `scripts/ingest/PROGRESS.md`); `es-candidates-listapalabras.js` es hoy la única implementación activa de este método.

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

**2026-09-09 (directiva del mantenedor): el script dedicado a este método
(`wiktionary_candidates.js`, con su `PLAN`, `--list-categories` y
`--exhaustive`) se retiró por completo del proyecto.** No porque
consultar la API de categorías de Wikcionario esté mal — como
*técnica de descubrimiento* para un lote acotado de palabras a revisar
a mano sigue siendo legítima — sino porque en la práctica se estaba
usando contra la regla de asignar la categoría después de evaluar la palabra
(paso 4 de la guía para crear elementos, sección 3.1): su salida se
cruzaba contra otras listas de palabras (`es-candidates-listapalabras.js`,
el método C) como un **filtro de exclusión** que descartaba sin
revisión cualquier palabra sin coincidencia de categoría, en vez de
usarse solo para decidir el orden de revisión. El criterio editorial
de Sinonimia es la dificultad real de la palabra (paso 2 de la sección
3.2), nunca si una categoría externa —inestable, incompleta e inconsistente entre
ejecuciones, ver `scripts/ingest/PROGRESS.md`— la etiquetó o no. Si se
retoma esta técnica en el futuro, debe construirse para *anotar* una
lista de candidatas ya seleccionada por dificultad, nunca para
seleccionarlas.



## 3. Glosarios y corpus por categoría

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

## Ver también

- [Guía para crear elementos](guia-crear-elementos.md), con criterios editoriales y el procedimiento para preparar una entrada.
- [Flujo y estado de la ingesta](../../scripts/ingest/README.md) y [registro de progreso](../../scripts/ingest/PROGRESS.md).
