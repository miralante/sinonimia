# Auditoría de lenguaje fácil

**Estado:** En curso. Revisión editorial manual por lotes; las señales automáticas solo sirven para priorizar.

## Alcance y método

La revisión cubre las entradas activas en español e inglés del runtime. Se comprueba cada ficha en contexto: definición, sinónimos y ejemplo. Se aplican [los criterios de lectura fácil en español](spec.md#31-lectura-fácil) y [los criterios en inglés](../en/spec.md#design-principle-easy-read-language).

Un barrido automático de frases largas, definiciones extensas y fórmulas metalingüísticas ayuda a encontrar candidatas. El barrido actual de definiciones que contienen «coloquial» encuentra 162 entradas ES activas; son candidatas, no errores confirmados. No cuenta como revisión: cada cambio o exclusión requiere una decisión editorial por ID. Las exclusiones nuevas se anotan con el motivo y la evidencia en `scripts/ingest/pipeline/decisions/editorial-exclusions-<idioma>.json`.

## Lote 1

| Idioma | ID | Decisión |
|---|---|---|
| ES | `albogue` | Simplificada la descripción de los dos sentidos y ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/albogue) |
| ES | `marjoleto` | Sustituida la descripción botánica extensa por una explicación breve; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/marjoleto) |
| ES | `oliva` | Retirada la explicación botánica innecesaria; conservado el sentido de «aceituna» y actualizado el ejemplo. [DLE](https://dle.rae.es/oliva) |
| ES | `rosmaro` | Sustituida la descripción zoológica por una explicación breve; actualizado el ejemplo. [DLE](https://dle.rae.es/rosmaro) |
| EN | `giantess-2` | Excluida: la definición activa describía un girasol, y el lema duplica una forma femenina transparente ya excluida. Evidencia: [Collins](https://www.collinsdictionary.com/dictionary/english/giantess). |
| ES | `resuave` | Simplificada la definición a «Muy suave» y corregida la capa editorial que restauraba el texto anterior. |
| ES | `tocar-la-pampana` | Simplificada la definición y sustituido el ejemplo metalingüístico por una situación concreta. |

La entrada `round2497-a-esparragar-idiom` no forma parte del runtime: ya está excluida editorialmente por usar un lema incompleto. El DLE registra la locución completa «anda a esparragar» (también «vete a esparragar»). Si se reincorpora, una definición fácil sería «Forma de decirle a alguien, con enfado, que se vaya». No se cuenta como una entrada activa revisada. [DLE](https://dle.rae.es/esparragar)

## Lote 2

| Idioma | ID | Decisión |
|---|---|---|
| ES | `apero` | Agrupados en dos frases los sentidos de herramientas y animales de trabajo. [DLE](https://dle.rae.es/apero) |
| ES | `cojinete` | Reducidas las explicaciones técnicas; se conservan el apoyo de ejes y la sujeción de raíles o cilindros. [DLE](https://dle.rae.es/cojinete) |
| ES | `cordoncillo` | Simplificados los sentidos de tela, bordado y monedas; actualizado el ejemplo. [DLE](https://dle.rae.es/cordoncillo) |

## Lote 3

| Idioma | ID | Decisión |
|---|---|---|
| ES | `vasectomia` | Sustituida la explicación clínica por una descripción directa; conservados el carácter permanente y la comprobación mediante análisis. El sinónimo y los dos ejemplos usan ahora una expresión más sencilla. [MedlinePlus](https://medlineplus.gov/spanish/vasectomy.html) |
| ES | `anestesiologo` | Explicada su función con palabras cotidianas y separada la vigilancia durante la operación en una segunda frase. Simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/anestesiólogo), [MedlinePlus](https://medlineplus.gov/spanish/anesthesia.html) |

## Lote 4

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cambiazo` | Retirada la explicación metalingüística «en la locución coloquial». Definición, sinónimo y ejemplo ahora explican directamente el cambio hecho para engañar. [DLE](https://dle.rae.es/cambiazo) |

## Lote 5

| Idioma | ID | Decisión |
|---|---|---|
| ES | `bufido` | Explicados directamente sus dos sentidos y cambiado el ejemplo confuso por una respuesta de enfado; simplificados los sinónimos. [DLE](https://dle.rae.es/bufido) |
| ES | `calabazazo` | Conservados los dos sentidos con frases breves; corregido el sinónimo que no coincidía con el ejemplo. [DLE](https://dle.rae.es/calabazazo) |
| ES | `cafelito` | Excluida: forma transparente y común de «café»; la ficha solo repetía «café» o «taza de café». [DLE](https://dle.rae.es/cafelito) |

## Lote 6

| Idioma | ID | Decisión |
|---|---|---|
| ES | `campante` | Sustituida la explicación metalingüística por una descripción directa del uso de «tan campante». El ejemplo y los sinónimos ya eran claros. [DLE](https://dle.rae.es/campante) |
| ES | `cantinela` | Simplificados los dos sentidos; reescritos el sinónimo y el ejemplo para evitar una «letanía» menos conocida y repetir una situación concreta. [DLE](https://dle.rae.es/cantinela) |
| EN | `geology` | Reducida la definición a palabras comunes para la ciencia, los rasgos de un lugar y el sentido de libro; corregido el ejemplo para repetir la misma situación con el sinónimo. [Collins](https://www.collinsdictionary.com/dictionary/english/geology) |

## Lote 7

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atracon` | Retirada la etiqueta «coloquialmente» y explicados directamente el exceso en cualquier actividad, el exceso al comer o beber y el sentido regional de Panamá. Simplificados los sinónimos. [DLE](https://dle.rae.es/atrac%C3%B3n) |
| EN | `partition` | Agrupados sus sentidos de dividir, separar espacios, repartir propiedad y formar sumas; el ejemplo ahora muestra solo la acepción del separador. [Collins](https://www.collinsdictionary.com/dictionary/english/partition) |
| EN | `mood` | Reescritos los sentidos de sentimiento, ambiente y gramática con palabras corrientes; simplificados el sinónimo y el ejemplo. [Collins](https://www.collinsdictionary.com/dictionary/english/mood) |

## Lote 8

| Idioma | ID | Decisión |
|---|---|---|
| ES | `catfishing` | Quitada la nota sobre el origen y el uso del término; explicados el perfil falso y el engaño con frases cortas. Cambiados el sinónimo y el ejemplo. [Cambridge](https://dictionary.cambridge.org/dictionary/english/catfishing), [eSafety Commissioner](https://www.esafety.gov.au/key-topics/staying-safe/catfishing) |
| ES | `contrato-leonino` | Retirada la etiqueta «figurada» y la salvedad legal extensa; explicado el desequilibrio entre las partes con palabras sencillas. Rehechos el sinónimo y el ejemplo. [DLE](https://dle.rae.es/leonino) |

## Lote 9

| Idioma | ID | Decisión |
|---|---|---|
| ES | `alud` | Reducida la definición a dos frases breves para el sentido físico y el figurado; conservado el ejemplo de rocas con «avalancha». [DLE](https://dle.rae.es/alud) |
| ES | `blindar` | Retirada la explicación metalingüística; separados el sentido de cubrir y el de proteger un derecho. Simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/blindar) |
| ES | `acreditativo` | Sustituida la explicación larga por una frase directa y cambiados «probatorio» y el ejemplo por palabras más sencillas. [DLE](https://dle.rae.es/acreditativo) |

## Lote 10

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cesacion` | Simplificada a la idea de fin o pausa; reemplazados «interrupción» y la explicación del contexto legal por un ejemplo directo. [DLE](https://dle.rae.es/cesaci%C3%B3n) |
| ES | `consideracion` | Conservados los sentidos de respeto y de pensar antes de decidir; cambiados la explicación, el sinónimo y el ejemplo para mostrar cada sentido con claridad. [DLE](https://dle.rae.es/consideraci%C3%B3n) |
| ES | `sancionatorio` | Sustituida la definición metalingüística por una explicación breve sobre los castigos por incumplir normas. El ejemplo usa un proceso concreto. [DLE](https://dle.rae.es/sancionatorio), [DLE: sanción](https://dle.rae.es/sanci%C3%B3n) |
| ES | `alimentario` | Retirada la nota comparativa difícil sobre «alimenticio»; definida la relación con los alimentos y rehecho el ejemplo con el mismo sentido. [DLE](https://dle.rae.es/alimentario) |

## Lote 11

| Idioma | ID | Decisión |
|---|---|---|
| ES | `apercibimiento` | Acortados los sentidos de aviso general y disciplinario; sustituida la explicación procesal por una descripción directa. Rehechos sinónimo y ejemplo. [DLE](https://dle.rae.es/apercibimiento) |
| ES | `certificacion` | Conservados los sentidos de acto y documento con palabras sencillas. Rehechos sinónimo y ejemplo para mostrar la constancia de cumplimiento. [DLE](https://dle.rae.es/certificaci%C3%B3n) |
| ES | `deslocalizacion` | Explicado el traslado de actividad y la acepción económica internacional, sin atribuirle un motivo salarial. Simplificados sinónimo y ejemplo. [EUR-Lex](https://eur-lex.europa.eu/legal-content/ES/TXT/?toc=OJ%3AC%3A2005%3A294%3ATOC&uri=uriserv%3AOJ.C_.2005.294.01.0045.01.SPA) |
| ES | `sobregiro` | Explicado el pago de un gasto sin saldo suficiente y el importe excedido; cambiados el sinónimo y el ejemplo. [CMF Educa](https://www.cmfchile.cl/educa/621/w3-article-27882.html) |

## Lote 12

| Idioma | ID | Decisión |
|---|---|---|
| ES | `absolutorio` | Reescrita la definición con palabras comunes y conservada la distinción entre no condenar y declarar inocencia. Simplificados sinónimo y ejemplo. [DLE](https://dle.rae.es/absolutorio) |
| ES | `antitetanica` | Retirada la explicación clínica sobre cuándo vacunar; se conserva el sentido de medicamento y el uso como nombre de vacuna. Emparejado el ejemplo. [DLE](https://dle.rae.es/antitet%C3%A1nico), [Ministerio de Sanidad](https://www.sanidad.gob.es/areas/alertasEmergenciasSanitarias/alertasActuales/infoDana/riesgoParaLaSalud/heridas.htm) |
| ES | `desahuciar` | Separados el desalojo legal y los sentidos de perder la esperanza o dar una enfermedad por incurable. Rehechos sinónimos y ejemplo en la misma situación. [DLE](https://dle.rae.es/desahuciar) |
| ES | `compensacion` | Resumidos el pago por daños, pérdidas o trabajo y el sentido legal de restar deudas. Simplificados el sinónimo y el ejemplo. [Código Civil, arts. 1195–1196](https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763&p=20250103&tn=0) |

## Lote 13

| Idioma | ID | Decisión |
|---|---|---|
| ES | `culebrilla` | Simplificada la explicación de la infección y acortado el ejemplo para mantener el mismo síntoma y lugar en ambas frases. [DLE](https://dle.rae.es/culebrilla), [Ministerio de Sanidad](https://www.sanidad.gob.es/areas/promocionPrevencion/vacunaciones/programasDeVacunacion/docs/Herpes_Zoster_Preguntasyrespuestas.pdf) |
| ES | `champar` | Quitada la etiqueta «coloquial» y separados los sentidos de decir algo desagradable y recordar un favor; emparejado el ejemplo. [DLE](https://dle.rae.es/champar) |
| ES | `comecocos` | Conservados los tres sentidos en dos frases directas; sustituida la explicación gramatical por palabras comunes. El ejemplo muestra el videojuego. [DLE](https://dle.rae.es/comecocos) |
| ES | `alegron` | Retirada la etiqueta «coloquial» y explicada la alegría con una frase directa; conservados el sinónimo y el ejemplo claros. [DLE](https://dle.rae.es/alegr%C3%B3n) |

## Lote 14

| Idioma | ID | Decisión |
|---|---|---|
| ES | `apoquinar` | Quitada la etiqueta «coloquial» y explicada directamente la obligación de pagar la parte de un gasto, casi siempre de mala gana. Conservados un sinónimo claro y el ejemplo emparejado. [DLE](https://dle.rae.es/apoquinar) |
| ES | `almohadazo` | Retiradas las etiquetas de categoría y registro que no aportaban significado. Acortada la definición y rehecho el ejemplo para sustituir el lema por «golpe de almohada». [DLE](https://dle.rae.es/almohadazo) |
| ES | `ablandabrevas` | Quitada la etiqueta «coloquial» y aclarado el sentido insultante con palabras corrientes. Rehechos el sinónimo y el ejemplo para mostrar el mismo sentido. [DLE](https://dle.rae.es/ablandabrevas) |

## Lote 15

| Idioma | ID | Decisión |
|---|---|---|
| ES | `besucar` | Retirada la etiqueta «familiar» y explicada la acción con palabras directas. Simplificados el sinónimo y el ejemplo emparejado. [DLE](https://dle.rae.es/besucar) |
| ES | `caspicias` | Quitada la etiqueta «coloquial» y sustituidos «residuos» y «consumir» por palabras más comunes. Ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/caspicias) |
| ES | `chapurrear` | Retirada la etiqueta «coloquialmente»; la definición explica directamente que se habla una lengua con dificultad y errores. Rehechos el sinónimo y el ejemplo emparejado. [DLE](https://dle.rae.es/chapurrear) |

## Lote 16

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aconchabarse` | Cambiado «concertarse o confabularse» por una explicación directa; conservado que a menudo se trata de algo ilegal. Simplificado el sinónimo y emparejado el ejemplo. [DLE](https://dle.rae.es/aconchabarse) |
| ES | `arrechucho` | Separados los dos sentidos con palabras comunes: malestar leve y un impulso fuerte de una emoción. Simplificados los sinónimos y el ejemplo del sentido de salud. [DLE](https://dle.rae.es/arrechucho) |
| ES | `bebistrajo` | Sustituidas «irregular», «extravagante» y «nauseabunda» por palabras más conocidas; conservados los sentidos de mezcla rara y bebida desagradable. Rehecho el ejemplo. [DLE](https://dle.rae.es/bebistrajo) |

## Lote 17

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achispar` | Quitada la etiqueta «coloquial» y expresados los dos usos con palabras directas: emborrachar un poco a alguien o quedar así al beber. Rehecho el ejemplo. [DLE](https://dle.rae.es/achispar) |
| ES | `afogar` | Reducida la explicación a su relación con «ahogar»; conservadas su antigüedad, su uso regional y la forma «ahogarse». [DLE](https://dle.rae.es/afogar) |
| ES | `agramar` | Explicados los dos sentidos con verbos comunes: machacar tallos para sacar fibra y golpear a alguien. Rehechos sinónimos y ejemplo. [DLE](https://dle.rae.es/agramar) |

## Lote 18

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acojonante` | Explicado el sentido de miedo o impresión intensa con palabras directas; conservada la marca de uso grosero de forma sencilla. Rehechos el sinónimo y el ejemplo. [DLE](https://dle.rae.es/acojonante) |
| ES | `acojonar` | Sustituida la explicación circular por «asustar» o «sorprender mucho»; conservada la marca de uso grosero. Simplificado el sinónimo y rehecho el ejemplo. [DLE](https://dle.rae.es/acojonar) |
| ES | `alhaja` | Sustituidas las etiquetas «precioso» y «coloquialmente» por palabras directas; conservados los sentidos de objeto valioso y persona o cosa muy buena, a veces en broma. Simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/alhaja) |

## Lote 19

| Idioma | ID | Decisión |
|---|---|---|
| ES | `albondiguilla` | Explicados directamente sus sentidos de comida y de uso informal; simplificado el segundo sin perder su sentido. Conservados el sinónimo y el ejemplo del sentido de comida. [DLE](https://dle.rae.es/albondiguilla) |
| ES | `agachadita` | Simplificada la acción de ponerse en cuclillas y expresado el registro coloquial como uso informal. Rehechos el sinónimo y el ejemplo para mostrar una situación cotidiana. [DLE](https://dle.rae.es/agachadita) |
| ES | `alborotapueblos` | Sustituido «tumultuario» y la etiqueta «coloquialmente» por explicaciones directas de sus dos sentidos. Emparejados sinónimo y ejemplo para el sentido de animar una fiesta. [DLE](https://dle.rae.es/alborotapueblos) |

## Lote 20

| Idioma | ID | Decisión |
|---|---|---|
| ES | `bullebulle` | Sustituida «viveza excesiva» por una descripción directa, sin atribuir inteligencia; expresado el uso informal con palabras sencillas. Simplificados sinónimo y ejemplo. [DLE](https://dle.rae.es/bullebulle) |
| ES | `bucefalo` | Reformulada como un insulto informal dirigido a un hombre torpe o bruto. Rehechos el sinónimo y el ejemplo. [DLE](https://dle.rae.es/buc%C3%A9falo) |
| ES | `calaverada` | Sustituida la explicación circular sobre «calavera» por una acción irresponsable hecha sin pensar. Eliminada la nota de uso informal, innecesaria para entender el significado, y emparejado el ejemplo. [DLE](https://dle.rae.es/calaverada), [DLE: calavera](https://dle.rae.es/calavera) |

## Lote 21

| Idioma | ID | Decisión |
|---|---|---|
| ES | `din` | Sustituida la definición metalingüística por una explicación directa y breve; conservado el registro informal. [DLE](https://dle.rae.es/din) |
| ES | `chuminada` | Explicados directamente sus sentidos de tontería o cosa sin importancia; indicado el uso informal con palabras sencillas. [DLE](https://dle.rae.es/chuminada) |
| ES | `demontre` | Explicados directamente el sentido de «demonio» y sus usos para expresar sorpresa, admiración o disgusto. [DLE](https://dle.rae.es/demontre) |

## Lote 22

| Idioma | ID | Decisión |
|---|---|---|
| ES | `bocinazo` | Explicados directamente sus sentidos de sonido de bocina y grito para reprender. [DLE](https://dle.rae.es/bocinazo) |
| ES | `braguetazo` | Conservado el sentido de matrimonio por interés y explicada la diferencia económica o social con palabras sencillas; expresado el registro como uso informal. [DLE](https://dle.rae.es/braguetazo) |
| ES | `cenutrio` | Sustituida la etiqueta «coloquialmente» por una nota sencilla de uso informal y explicada directamente la palabra. [DLE](https://dle.rae.es/cenutrio) |

## Lote 23

| Idioma | ID | Decisión |
|---|---|---|
| ES | `caspia` | Sustituida la etiqueta «coloquialmente» por una explicación directa, conservada la marca regional y acortada la pareja de ejemplos. [DLE](https://dle.rae.es/caspia) |
| ES | `chafallo` | Explicados directamente sus sentidos de borrón y remiendo mal hecho; omitida la etiqueta de registro, innecesaria para entenderlos. [DLE](https://dle.rae.es/chafallo) |
| ES | `catapum` | Sustituido «onomatopéyica» por una explicación directa y expresado con palabras sencillas el uso para un tiempo muy lejano. [DLE](https://dle.rae.es/catapum) |

## Lote 24

| Idioma | ID | Decisión |
|---|---|---|
| ES | `andromina` | Explicados directamente embuste y enredo; conservada con palabras sencillas la indicación de que se usa más en plural. [DLE](https://dle.rae.es/andrómina) |
| ES | `atalayador` | Sustituido «que atalaya» y la etiqueta «coloquialmente» por explicaciones directas de sus dos usos. [DLE](https://dle.rae.es/atalayador), [DLE: atalayar](https://dle.rae.es/atalayar) |
| ES | `calmoso` | Explicados directamente sus sentidos de calma y lentitud o pereza; expresado el registro con palabras sencillas. [DLE](https://dle.rae.es/calmoso) |

## Lote 25

| Idioma | ID | Decisión |
|---|---|---|
| ES | `gazuza` | Sustituida «dicho de manera coloquial» por una nota breve de uso informal. [DLE](https://dle.rae.es/gazuza) |
| ES | `pipiolo-2` | Explicado directamente el sentido de niño o muchacho y conservada la nota de uso informal. [DLE](https://dle.rae.es/pipiolo) |
| ES | `momio-2` | Aclarado que se trata de algo valioso que se consigue barato o con poco esfuerzo; ajustado el ejemplo al sinónimo «ganga». [DLE](https://dle.rae.es/momio) |

## Lote 26

| Idioma | ID | Decisión |
|---|---|---|
| ES | `piripi` | Sustituida «dicho de manera coloquial» por una explicación directa y una nota sencilla de uso. [DLE](https://dle.rae.es/piripi) |
| ES | `pocilga-2` | Explicado directamente el sentido figurado y expresado el registro con palabras sencillas. [DLE](https://dle.rae.es/pocilga) |
| ES | `paston` | Sustituida la etiqueta «coloquialmente» por una definición directa; conservada la marca de uso en España. [DLE](https://dle.rae.es/past%C3%B3n) |

## Lote 27

| Idioma | ID | Decisión |
|---|---|---|
| ES | `pocima-3` | Explicado directamente que es un líquido que sabe mal; conservado el registro con una nota sencilla. [DLE](https://dle.rae.es/p%C3%B3cima) |
| ES | `redrojo-3` | Sustituida la etiqueta «dicho de forma coloquial» por una nota breve de uso informal. [DLE](https://dle.rae.es/redrojo) |
| ES | `plasta-2` | Sustituida «excremento» por la palabra cotidiana «caca» y conservada una nota sencilla de uso. [DLE](https://dle.rae.es/plasta) |

## Lote 28

| Idioma | ID | Decisión |
|---|---|---|
| ES | `pella-5` | Explicado directamente que se trata de dinero que se debe o se consigue con engaños; conservado el registro informal. [DLE](https://dle.rae.es/pella) |
| ES | `pelma-3` | Sustituida la etiqueta «coloquialmente» por una explicación directa de algo que resulta pesado o aburrido. [DLE](https://dle.rae.es/pelma) |
| ES | `pelon-3` | Sustituida «recursos económicos» por «dinero» y expresado el registro con palabras sencillas. [DLE](https://dle.rae.es/pel%C3%B3n) |

## Lote 29

| Idioma | ID | Decisión |
|---|---|---|
| ES | `peloneria` | Sustituida «subsistir» por «vivir» y explicada directamente la falta de lo necesario. [DLE](https://dle.rae.es/peloner%C3%ADa) |
| ES | `pelotillero` | Sustituido «ganarse su favor» por el objetivo directo de conseguir algo de la persona; conservado el registro informal. [DLE](https://dle.rae.es/pelotillero) |
| ES | `penazo` | Explicados directamente sus sentidos de persona o cosa que aburre o molesta; expresado el registro con palabras sencillas. [DLE](https://dle.rae.es/pe%C3%B1azo) |

## Lote 30

| Idioma | ID | Decisión |
|---|---|---|
| ES | `pellejo-5` | Sustituida la etiqueta «coloquialmente» por una explicación directa y una nota sencilla de uso. [DLE](https://dle.rae.es/pellejo) |
| ES | `peluca-2` | Explicado directamente el sentido de persona que lleva peluca; conservada la nota de uso informal. [DLE](https://dle.rae.es/peluca) |
| ES | `sacamuelas` | Conservado el sentido de «dentista» y aclarado con palabras sencillas que se usa como insulto. [DLE](https://dle.rae.es/sacamuelas) |

## Lote 31

| Idioma | ID | Decisión |
|---|---|---|
| ES | `round2508-espichar-die-colloquial` | Sustituida «se usa de manera coloquial» por una nota sencilla de uso informal. [DLE](https://dle.rae.es/espichar) |
| ES | `round2762-fundir-spend` | Conservado el sentido de gastar todo el dinero y expresado el registro con palabras sencillas. [DLE](https://dle.rae.es/fundir) |
| ES | `round2771-gacha-mud` | Explicado directamente el sentido de barro o lodo; conservadas las notas de uso informal y plural. [DLE](https://dle.rae.es/gacha) |

## Lote 32

| Idioma | ID | Decisión |
|---|---|---|
| ES | `round3288-lagarta-cunning-person` | Sustituida «pícara o taimada» y «dicho de forma coloquial» por una explicación directa; conservada la nota de registro. [DLE](https://dle.rae.es/lagarta) |
| ES | `sablazo-3` | Explicada directamente la petición insistente de dinero que no se devuelve; añadidos «sableada» y «sableo» como sinónimos respaldados por el DLE. [DLE](https://dle.rae.es/sablazo) |
| ES | `sable-2` | Sustituida «sacar dinero a otro o vivir a su costa» por una explicación sencilla; conservado el uso informal. [DLE](https://dle.rae.es/sable) |

## Lote 33

| Idioma | ID | Decisión |
|---|---|---|
| ES | `trotacalles` | Sustituida «coloquialmente» por una explicación directa de la persona que pasa mucho tiempo en la calle. [DLE](https://dle.rae.es/trotacalles) |
| ES | `zanganada` | Sustituida «impertinente» por «fuera de lugar» y explicados directamente los sentidos de acción o comentario torpe. [DLE](https://dle.rae.es/zanganada) |
| ES | `cursileria` | Explicados sus tres sentidos con una definición breve de «cursi»; acortada y emparejada la pareja de ejemplos. Conservada la marca informal del tercer sentido. [DLE](https://dle.rae.es/cursiler%C3%ADa), [DLE: cursi](https://dle.rae.es/cursi) |

## Lote 34

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cacumen` | Explicadas con palabras directas la acepción informal y la acepción en desuso; conservados ambos sentidos. [DLE](https://dle.rae.es/cacumen) |
| ES | `calderada` | Simplificada la descripción de lo que cabe en una caldera y aclarado el sentido informal de cantidad grande. [DLE](https://dle.rae.es/calderada) |
| ES | `cansera` | Simplificados sus dos sentidos; retirado «galbana» de los sinónimos y reescritos los ejemplos para mostrar una sola situación. [DLE](https://dle.rae.es/cansera) |

## Lote 35

| Idioma | ID | Decisión |
|---|---|---|
| ES | `b15-tijeretear-criticize` | Simplificada la crítica o el comentario negativo y conservado el uso informal. [DLE](https://dle.rae.es/tijeretear) |
| ES | `chamorra` | Sustituida «esquilada» por «rapada»; simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/chamorro) |
| ES | `chambon` | Sustituida «chiripa» por «casualidad» y resumidos los sentidos de poca habilidad y suerte. [DLE](https://dle.rae.es/chamb%C3%B3n) |

## Lote 36

| Idioma | ID | Decisión |
|---|---|---|
| ES | `caciquear` | Explicado directamente el abuso de autoridad o influencia y simplificada la acepción informal; retirado «mangonear». [DLE](https://dle.rae.es/caciquear) |
| ES | `cenagal` | Sustituido «cieno» por «barro» y simplificada la acepción informal del negocio difícil de abandonar; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/cenagal) |
| ES | `calandraca` | Simplificados los dos sentidos y sustituidas las etiquetas técnicas por situaciones concretas; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/calandraca) |

## Lote 37

| Idioma | ID | Decisión |
|---|---|---|
| ES | `catavinos` | Explicados directamente sus sentidos de persona que prueba vinos y persona que bebe mucho; reescritos los ejemplos para mostrar el oficio. [DLE](https://dle.rae.es/catavinos) |
| ES | `chapuceria` | Simplificados los sentidos de algo mal hecho y una mentira que parece verdad; depurados los sinónimos. [DLE](https://dle.rae.es/chapucer%C3%ADa) |
| ES | `chapurreo` | Sustituida «acción y efecto» por una explicación directa del habla con errores; ajustados sinónimos y ejemplos. [DLE](https://dle.rae.es/chapurreo), [DLE: chapurrear](https://dle.rae.es/chapurrear) |

## Lote 38

| Idioma | ID | Decisión |
|---|---|---|
| ES | `chiringuito` | Sustituida la etiqueta coloquial por una explicación sencilla del uso como negocio; expresada directamente la valoración despectiva. [DLE](https://dle.rae.es/chiringuito) |
| ES | `comible` | Resumidos sus dos sentidos con palabras comunes; sustituidos los ejemplos repetidos por una pareja clara. [DLE](https://dle.rae.es/comible) |
| ES | `cuchuchear` | Explicados directamente los sentidos de hablar en voz baja y contar chismes; ajustados sinónimos y ejemplos. [DLE](https://dle.rae.es/cuchuchear) |

## Lote 39

| Idioma | ID | Decisión |
|---|---|---|
| ES | `feucho` | Aclarado que «feúcho» puede usarse con cariño o como insulto; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/fe%C3%BAcho) |
| ES | `empollar` | Explicada la incubación sin tecnicismos y simplificado el sentido informal de estudiar mucho. [DLE](https://dle.rae.es/empollar) |
| ES | `despelotarse` | Sustituida la etiqueta coloquial por una nota sencilla de uso informal y emparejado el ejemplo con su sinónimo. [DLE](https://dle.rae.es/despelotarse) |

## Lote 40

| Idioma | ID | Decisión |
|---|---|---|
| ES | `julepe` | Sustituida «coloquialmente» por una nota directa de uso informal; aclarados sus sentidos de golpe y regaño. [DLE](https://dle.rae.es/julepe) |
| ES | `morapio` | Simplificada la descripción del vino y expresado el uso informal con palabras comunes. [DLE](https://dle.rae.es/morapio) |
| ES | `muenda` | Explicado el sentido con palabras directas y añadida la referencia a Colombia. [DLE](https://dle.rae.es/muenda) |

## Lote 41

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atafagar` | Sustituidos «aturdir» e «importunidad» por palabras directas; conservados los sentidos de olores, insistencia y exceso de trabajo. [DLE](https://dle.rae.es/atafagar) |
| ES | `atiborrar` | Resumidos los usos de llenar en exceso y comer demasiado; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/atiborrar) |
| ES | `camastron` | Sustituidos «taimada» y «momento propicio» por una explicación directa; conservado el uso como adjetivo. [DLE](https://dle.rae.es/camastr%C3%B3n) |

## Lote 42

| Idioma | ID | Decisión |
|---|---|---|
| ES | `componenda` | Sustituido «censurable» por «deshonesto» y explicados sus tres sentidos con palabras comunes; ajustados ejemplo y sinónimos. [DLE](https://dle.rae.es/componenda) |
| ES | `emparrado` | Simplificadas las estructuras de parras y plantas trepadoras; explicado directamente el sentido informal del peinado. [DLE](https://dle.rae.es/emparrado) |
| ES | `embolismo-embuste-chisme` | Sustituida la etiqueta coloquial por una nota sencilla de uso informal; actualizados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/embolismo) |

## Lote 43

| Idioma | ID | Decisión |
|---|---|---|
| ES | `embotellar` | Sustituida «transportar» por «llevar» y aclarado el sentido de impedir que alguien avance. [DLE](https://dle.rae.es/embotellar) |
| ES | `empapelar` | Explicados con palabras comunes los sentidos de cubrir con papel e iniciar un proceso legal; ajustado el sinónimo. [DLE](https://dle.rae.es/empapelar) |
| ES | `endinar-consume` | Sustituida la fórmula «de manera coloquial» por una nota sencilla de uso informal y región. [DLE](https://dle.rae.es/endi%C3%B1ar) |

## Lote 44

| Idioma | ID | Decisión |
|---|---|---|
| ES | `codear` | Sustituidas las etiquetas gramaticales y «frecuentar» por acciones comunes; conservados los sentidos físicos y sociales. [DLE](https://dle.rae.es/codear) |
| ES | `dentera` | Simplificada la sensación física y explicado directamente el sentido informal de envidia o deseo fuerte; reescritos los ejemplos. [DLE](https://dle.rae.es/dentera) |
| ES | `chochez` | Sustituida «facultades mentales» y «afición» por palabras directas; conservados los sentidos de edad y cariño exagerado. [DLE](https://dle.rae.es/chochez), [DLE: chochear](https://dle.rae.es/chochear) |

## Lote 45

| Idioma | ID | Decisión |
|---|---|---|
| ES | `desmadre` | Sustituido «destetar» por «dejar de mamar» y explicado directamente el sentido de desorden o fiesta fuera de control. [DLE](https://dle.rae.es/desmadre) |
| ES | `despabilar` | Explicados el uso con una vela y el sentido de ayudar a alguien a estar más despierto o atento. [DLE](https://dle.rae.es/despabilar), [DLE: espabilar](https://dle.rae.es/espabilar) |
| ES | `descuajar` | Sustituidos «licuar», «de cuajo» y una explicación larga por acciones directas; ajustado el ejemplo al sinónimo. [DLE](https://dle.rae.es/descuajar) |

## Lote 46

| Idioma | ID | Decisión |
|---|---|---|
| ES | `maromo` | Sustituida «aire chulesco» por una descripción directa de la actitud; conservados el uso informal y la referencia a España. [DLE](https://dle.rae.es/maromo) |
| ES | `chachas` | Sustituida «empleadas domésticas» por tareas concretas; conservado el uso informal y emparejado el ejemplo. [DLE](https://dle.rae.es/chacho) |
| ES | `desbarbar` | Explicados con palabras comunes los sentidos de quitar raíces o fibras y de afeitar la barba. [DLE](https://dle.rae.es/desbarbar) |

## Lote 47

| Idioma | ID | Decisión |
|---|---|---|
| ES | `reumatismo` | Aclarado el sentido médico de inflamación articular y conservado el uso amplio para dolores sin causa concreta; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/reumatismo) |
| ES | `abocinar` | Explicados directamente los sentidos de ensanchar un tubo, caer de cara y la postura de un caballo. [DLE](https://dle.rae.es/abocinar) |
| ES | `acemila` | Sustituido «macho de carga» por «burro», explicado el uso como insulto y añadido un sinónimo para ese sentido. [DLE](https://dle.rae.es/ac%C3%A9mila) |

## Lote 48

| Idioma | ID | Decisión |
|---|---|---|
| ES | `ceporro` | Explicados por separado el trozo de vid usado como leña y el insulto; cambiado el ejemplo para mostrar el segundo sentido. [DLE](https://dle.rae.es/ceporro) |
| ES | `chafarote` | Sustituido «alfanje» por «espada corta y ancha»; explicado con palabras comunes el uso informal. [DLE](https://dle.rae.es/chafarote) |
| ES | `cartuchera` | Simplificados la funda para cartuchos y el sentido plural de grasa en los muslos; reemplazados sinónimos difíciles. [DLE](https://dle.rae.es/cartuchera) |

## Lote 49

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cascar` | Separados el sentido de romper y los usos informales; aclarado que el golpe se da a alguien y ajustado el ejemplo del huevo. [DLE](https://dle.rae.es/cascar) |
| ES | `cascabelear` | Explicados sin tecnicismos los usos de hacer sonar cascabeles, actuar sin pensar y dar falsas esperanzas; ajustado el ejemplo para mostrar este último uso. [DLE](https://dle.rae.es/cascabelear) |
| ES | `chicharrera` | Explicados con palabras sencillas el oficio y los sentidos de calor y lugar caluroso; retirada una nota interna sobre otro uso. [DLE](https://dle.rae.es/chicharrera) |

## Lote 50

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acollonar` | Sustituido «acobardar» por «asustar mucho» y expresado el uso informal con palabras sencillas; simplificado el ejemplo. [DLE](https://dle.rae.es/acollonar) |
| ES | `aguachirle` | Explicados directamente sus sentidos de bebida aguada y cosa sin interés; retiradas las etiquetas y palabras menos comunes. [DLE](https://dle.rae.es/aguachirle) |
| ES | `biruje` | Simplificado el significado de frío y viento frío; expresado de forma sencilla su uso informal en España. [DLE](https://dle.rae.es/biruje) |

## Lote 51

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cancon` | Simplificadas las dos ideas del término: fantasma o personaje que asusta y persona o cosa que da miedo. [DLE](https://dle.rae.es/canc%C3%B3n), [DLE: bu](https://dle.rae.es/bu) |
| ES | `canguelo` | Sustituida la etiqueta gramatical por el significado directo y una nota sencilla sobre su uso informal; conservado solo «miedo» como sinónimo claro. [DLE](https://dle.rae.es/canguelo) |
| ES | `canturrear` | Sustituida la etiqueta gramatical y la expresión «a media voz» por «cantar en voz baja». [DLE](https://dle.rae.es/canturrear) |

## Lote 52

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cocorota` | Explicada directamente la parte alta de la cabeza y aclarado su uso para nombrar la cabeza; retirado «cogote» como sinónimo impreciso. [DLE](https://dle.rae.es/cocorota) |
| ES | `cocorronazo` | Aclarado que es un golpe dado con los dedos doblados y que se usa en Venezuela; ajustado el ejemplo. [DLE](https://dle.rae.es/cocorronazo) |
| ES | `cogorza` | Sustituida «embriaguez» por «borrachera» y acortado el ejemplo. [DLE](https://dle.rae.es/cogorza) |

## Lote 53

| Idioma | ID | Decisión |
|---|---|---|
| ES | `condumio` | Retirada la etiqueta gramatical; explicado directamente como comida preparada y conservado el uso informal. [DLE](https://dle.rae.es/condumio) |
| ES | `cotorreo` | Sustituida la explicación gramatical por una charla animada y ruidosa; simplificados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/cotorreo), [DLE: cotorrear](https://dle.rae.es/cotorrear) |
| ES | `comistrajo` | Sustituida «poco apetecible» por palabras corrientes y aclarada la mezcla rara de comida; reescrito el ejemplo. [DLE](https://dle.rae.es/comistrajo) |

## Lote 54

| Idioma | ID | Decisión |
|---|---|---|
| ES | `desparpajo` | Sustituidos «suma facilidad» y «desembarazo» por palabras directas; añadida su acepción regional de desorden. [DLE](https://dle.rae.es/desparpajo) |
| ES | `entendederas` | Explicada directamente la capacidad de entender y expresado con palabras sencillas su uso burlón; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/entendederas) |
| ES | `manduca` | Explicada directamente como comida, conservado el uso informal y retirado el sinónimo poco común «condumio». [DLE](https://dle.rae.es/manduca) |

## Lote 55

| Idioma | ID | Decisión |
|---|---|---|
| ES | `desesperar` | Simplificados los sentidos de perder la esperanza e impacientar; expresado con palabras directas su uso raro para quitarse la vida. [DLE](https://dle.rae.es/desesperar) |
| ES | `desfachatado` | Sustituidas «insolencia» y «desvergonzado» por una descripción directa; simplificados los sinónimos. [DLE](https://dle.rae.es/desfachatado) |
| ES | `desgraciar` | Simplificados los sentidos de dañar, afear, herir o matar; aclarado también el uso pronominal («arruinarse»). [DLE](https://dle.rae.es/desgraciar) |

## Lote 56

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cagalera` | Definición directa de «diarrea»; registro vulgar e informal expresado con palabras sencillas. [DLE](https://dle.rae.es/cagalera) |
| ES | `cagarruta` | Sustituida la fórmula metalingüística por «caca de animal»; precisado el uso vulgar e informal y simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/cagarruta) |
| ES | `cagueta` | Sustituida la etiqueta técnica «voz malsonante y coloquial» por una nota sencilla de uso; simplificado un sinónimo difícil. [DLE](https://dle.rae.es/cagueta) |

## Lote 57

| Idioma | ID | Decisión |
|---|---|---|
| ES | `bergante` | Sustituida «voz despectiva o jocosa» por una definición directa; conservado el sentido de «sinvergüenza». [DLE](https://dle.rae.es/bergante) |
| ES | `bobalicon` | Sustituido «aumentativo coloquial» por una explicación directa; simplificados los sinónimos. [DLE](https://dle.rae.es/bobalic%C3%B3n) |
| ES | `camaranchon` | Sustituida «voz despectiva» por una nota sencilla; explicada la ubicación con palabras comunes. [DLE](https://dle.rae.es/camaranch%C3%B3n) |

## Lote 58

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cabronada` | Reunidas las dos acepciones en una explicación directa; sustituida «voz malsonante y coloquial» por una nota sencilla. [DLE](https://dle.rae.es/cabronada) |
| ES | `carpanta` | Sustituido «voz coloquial» por una descripción directa y más simple de «hambre intensa»; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/carpanta) |
| ES | `mataburros` | Sustituida la fórmula «palabra coloquial» por una definición directa; conservada la nota sobre su uso en varios países americanos. [DLE](https://dle.rae.es/mataburros) |

## Lote 59

| Idioma | ID | Decisión |
|---|---|---|
| ES | `camastro` | Sustituido «lecho» y la etiqueta «voz despectiva» por una explicación directa. [DLE](https://dle.rae.es/camastro) |
| ES | `chiquilin` | Sustituida la explicación gramatical «diminutivo afectivo y coloquial» por palabras directas; conservado el tono cariñoso. [DLE](https://dle.rae.es/chiquil%C3%ADn) |
| ES | `casuca` | Sustituida «dicho de forma despectiva» por una nota sencilla; ajustados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/casuca) |

## Lote 60

| Idioma | ID | Decisión |
|---|---|---|
| ES | `churumbel` | Sustituida la etiqueta «uso coloquial» por una nota sencilla de uso; conservados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/churumbel) |
| ES | `cuartucho` | Sustituida la etiqueta «voz despectiva» y simplificados la explicación, los sinónimos y el ejemplo. [DLE](https://dle.rae.es/cuartucho) |
| ES | `cubata` | Sustituida «nombre coloquial» por una descripción directa de la bebida y una nota sencilla de uso. [DLE](https://dle.rae.es/cubata) |

## Lote 61

| Idioma | ID | Decisión |
|---|---|---|
| ES | `carcamal` | Sustituidas las etiquetas de registro por una explicación directa; simplificado el ejemplo con «anciano». [DLE](https://dle.rae.es/carcamal) |
| ES | `cursilon` | Sustituida la explicación gramatical «aumentativo coloquial» por una descripción directa de su significado. [DLE](https://dle.rae.es/cursil%C3%B3n) |
| ES | `meapilas` | Explicadas directamente sus dos acepciones y cambiado «término despectivo» por «insulto». [DLE](https://dle.rae.es/meapilas) |

## Lote 62

| Idioma | ID | Decisión |
|---|---|---|
| ES | `dedocracia` | Recortada la definición larga y sustituido el rótulo «coloquial y despectiva» por una explicación directa. [DLE](https://dle.rae.es/dedocracia) |
| ES | `gayola` | Sustituida «nombre coloquial» por el significado directo y conservada la nota de uso informal. [DLE](https://dle.rae.es/gayola) |
| ES | `quitapenas` | Sustituida la fórmula «nombre coloquial» por «licor»; simplificados el texto alternativo y los sinónimos. [DLE](https://dle.rae.es/quitapenas) |

## Lote 63

| Idioma | ID | Decisión |
|---|---|---|
| ES | `afatar` | Sustituida «verbo transitivo» y «aparejar» por una explicación directa; conservado el uso regional. [DLE](https://dle.rae.es/afatar) |
| ES | `almondiga` | Sustituidas «forma vulgar y desusada» y la explicación larga por una nota directa sobre su uso antiguo y popular. [DLE](https://dle.rae.es/alm%C3%B3ndiga) |
| ES | `argamandijo` | Sustituida «voz coloquial desusada» y simplificada la explicación de los objetos. [DLE](https://dle.rae.es/argamandijo) |

## Lote 64

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aquerarse` | Sustituido «apolillarse» por una descripción directa y corregido el ejemplo-sinónimo que no explicaba el sentido. [DLE](https://dle.rae.es/aquerarse) |
| ES | `ardeviejas` | Sustituida «nombre coloquial» por una descripción directa de la planta; conservada la relación con la aulaga. [DLE](https://dle.rae.es/ardeviejas) |
| ES | `berrin` | Sustituida la nota metalingüística y la variante poco clara por una explicación directa; simplificado el ejemplo. [DLE](https://dle.rae.es/berr%C3%ADn) |

## Lote 65

| Idioma | ID | Decisión |
|---|---|---|
| ES | `almendrera` | Simplificada la descripción del árbol y explicada con palabras directas la frase antigua «florecer la almendrera». [DLE](https://dle.rae.es/almendrera) |
| ES | `almondiguilla` | Sustituida «forma vulgar y desusada» por una explicación directa y una nota de uso acorde con el DLE; actualizado el ejemplo. [DLE](https://dle.rae.es/almondiguilla) |
| ES | `almorron` | Explicado con palabras directas cómo el montón guía el agua; retirado el sinónimo menos común «caballón». [DLE](https://dle.rae.es/almorr%C3%B3n) |

## Lote 66

| Idioma | ID | Decisión |
|---|---|---|
| ES | `depre` | Sustituidos «acortamiento» y «adjetivo coloquial» por una explicación directa de sus dos usos. [DLE](https://dle.rae.es/depre) |
| ES | `diano` | Sustituido «eufemismo coloquial» por una explicación sencilla del uso más suave de «diablo». [DLE](https://dle.rae.es/dia%C3%B1o) |
| ES | `dianche` | Sustituido «eufemismo coloquial» por una explicación sencilla y actualizado el ejemplo. [DLE](https://dle.rae.es/dianche) |

## Lote 67

| Idioma | ID | Decisión |
|---|---|---|
| ES | `chufeta` | Explicados directamente sus dos sentidos; simplificados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/chufeta) [DLE](https://dle.rae.es/chofeta) |
| ES | `borronear` | Sustituida la explicación sobre el modo informal por una descripción directa de la acción; simplificado el ejemplo. [DLE](https://dle.rae.es/borronear) |
| ES | `espanolada` | Simplificada la explicación de la obra y conservada la nota sobre su uso despectivo con palabras directas. [DLE](https://dle.rae.es/españolado) |

## Lote 68

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achuchado` | Sustituida la etiqueta gramatical por el significado y conservada la nota de uso informal. [DLE](https://dle.rae.es/achuchado) |
| ES | `adulon` | Explicado directamente el sentido y conservadas con palabras sencillas las notas de uso. [DLE](https://dle.rae.es/adul%C3%B3n) |
| ES | `desentrampar` | Simplificados el significado y los ejemplos; se aclara la relación con las deudas y los objetos empeñados. [DLE](https://dle.rae.es/desentrampar) |

## Lote 69

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cobradero` | Sustituida la etiqueta gramatical por una explicación directa y simplificado el ejemplo financiero. [DLE](https://dle.rae.es/cobradero) |
| ES | `abreboca` | Simplificada la definición del aperitivo y actualizado el sinónimo para que sea más claro. [DLE](https://dle.rae.es/abreboca) |
| ES | `achuchon` | Sustituida la etiqueta gramatical; explicados sus sentidos con palabras directas. [DLE](https://dle.rae.es/achuch%C3%B3n) |

## Lote 70

| Idioma | ID | Decisión |
|---|---|---|
| EN | `sick-note` | Sustituida la etiqueta de uso por una explicación directa; conservada la denominación actual del Reino Unido. [NHS](https://www.nhs.uk/nhs-services/gps/getting-a-fit-note/) |
| EN | `strep` | Sustituida la explicación sobre la forma abreviada por el significado directo y una descripción sencilla de «strep throat». [CDC](https://www.cdc.gov/group-a-strep/about/strep-throat.html) |
| EN | `sync` | Explicado directamente cómo se sincronizan los datos y los eventos; conservada la nota sobre la forma corta. [Cambridge Dictionary](https://dictionary.cambridge.org/dictionary/english/sync) |

## Lote 71

| Idioma | ID | Decisión |
|---|---|---|
| ES | `stalkear` | Sustituida la etiqueta de registro por una explicación directa del uso en redes; simplificados el sinónimo y el ejemplo. [FundéuRAE](https://www.fundeu.es/recomendacion/espiar-acechar-o-acosar-mejor-que-stalkear/) |
| ES | `aborregado` | Sustituida la explicación gramatical por dos sentidos breves y directos. [DLE](https://dle.rae.es/aborregado) |
| ES | `abravecer` | Sustituida la etiqueta gramatical y el sinónimo difícil por dos explicaciones directas. [DLE](https://dle.rae.es/abravecer) [DLE](https://dle.rae.es/embravecer) |

## Lote 72

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aborregarse` | Sustituida la explicación gramatical por dos sentidos breves; actualizado el ejemplo-sinónimo. [DLE](https://dle.rae.es/aborregarse) |
| ES | `aborton` | Simplificados sus dos sentidos y actualizado el ejemplo para mostrar el nacimiento prematuro de una cría. [DLE](https://dle.rae.es/abort%C3%B3n) |
| ES | `aborujar` | Sustituida la explicación gramatical y la palabra difícil «borujos»; aclarado el uso pronominal. [DLE](https://dle.rae.es/aborujar) [DLE](https://dle.rae.es/borujo) |

## Lote 73

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abuelastro` | Simplificada la explicación de sus dos relaciones familiares; actualizados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/abuelastro) |
| ES | `abracadabrante` | Sustituida la etiqueta gramatical y «desconcertante» por una explicación directa. [DLE](https://dle.rae.es/abracadabrante) |
| ES | `abrotonar` | Sustituida la etiqueta gramatical por una explicación directa de los brotes; conservada la nota de poco uso. [DLE](https://dle.rae.es/abroto%C3%B1ar) |

## Lote 74

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abuhado` | Sustituido «abotagado» por «hinchado» y explicados sus dos sentidos. [DLE](https://dle.rae.es/abuhado) |
| ES | `abulico` | Sustituida la explicación de «abulia» por palabras directas; actualizado el ejemplo. [DLE](https://dle.rae.es/ab%C3%BAlico) |
| ES | `abrojal` | Explicado «abrojos» con palabras directas y simplificado el sinónimo. [DLE](https://dle.rae.es/abrojal) [DLE](https://dle.rae.es/abrojo) |

## Lote 75

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abuhardillado` | Explicadas directamente sus dos formas de uso; actualizado el ejemplo-sinónimo. [DLE](https://dle.rae.es/abuhardillado) [DLE](https://dle.rae.es/buhardilla) |
| ES | `abullonar` | Sustituida la referencia a «bullones» por una explicación directa de los pliegues. [DLE](https://dle.rae.es/abullonar) [DLE](https://dle.rae.es/bull%C3%B3n) |
| ES | `abstersivo` | Sustituida la explicación médica técnica por una descripción directa de su uso. [DLE](https://dle.rae.es/abstersivo) [DLE](https://dle.rae.es/absterger) |

## Lote 76

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abstinencia` | Acortada la definición y ampliada para incluir alimentos y actividades. [DLE](https://dle.rae.es/abstinencia) |
| ES | `abstractivo` | Sustituida la explicación de «abstraer» por una descripción del resultado. [DLE](https://dle.rae.es/abstractivo) |
| ES | `abstraer` | Sustituidos los términos gramaticales por descripciones directas de sus sentidos. [DLE](https://dle.rae.es/abstraer) |

## Lote 77

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abstruso` | Sustituida la explicación técnica por «difícil de entender» y actualizados los sinónimos. [DLE](https://dle.rae.es/abstruso) |
| ES | `abulia` | Reemplazado «disminución patológica» por una descripción directa de la falta de iniciativa. [DLE](https://dle.rae.es/abulia) |
| ES | `abulon` | Sustituido «gasterópodo» y «nacarada» por palabras más habituales; simplificado el ejemplo. [DLE](https://dle.rae.es/abul%C3%B3n) |

## Lote 78

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abulonar` | Añadida la marca regional y explicado «bulón» con palabras más comunes. [DLE](https://dle.rae.es/abulonar) |
| ES | `abunolar` | Sustituidos «huecos» y la referencia al buñuelo por palabras directas. [DLE](https://dle.rae.es/abu%C3%B1olar) |
| ES | `aburguesarse` | Reemplazada la explicación de «burguesía» por una descripción de esas costumbres. [DLE](https://dle.rae.es/aburguesar) |

## Lote 79

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aburrado` | Explicados sus dos sentidos con palabras directas y conservada su antigüedad de uso. [DLE](https://dle.rae.es/aburrado) |
| ES | `aburrarse` | Sustituida la definición circular por una explicación de la pérdida de capacidad para razonar. [DLE](https://dle.rae.es/aburrarse) [DLE](https://dle.rae.es/embrutecer) |
| ES | `aburujar` | Explicados «borujos» como «grumos» y actualizado el ejemplo. [DLE](https://dle.rae.es/aburujar) |

## Lote 80

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abusionero` | Explicada directamente la creencia en supersticiones y malos presagios. [DLE](https://dle.rae.es/abusionero) |
| ES | `abuzarse` | Quitada la etiqueta gramatical y conservada la postura corporal de su significado. [DLE](https://dle.rae.es/abuzarse) |
| ES | `abyecto` | Explicados sus sentidos actuales y antiguos con palabras más directas. [DLE](https://dle.rae.es/abyecto) |

## Lote 81

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acaballadero` | Cambiada «cubrir a las yeguas» por «aparearse» y explicados sus dos sentidos. [DLE](https://dle.rae.es/acaballadero) |
| ES | `acaballado` | Sustituida «perfil equino» por una comparación directa con la cabeza del caballo. [DLE](https://dle.rae.es/acaballado) |
| ES | `acaballar` | Simplificados los sentidos de superponer piezas y de apareamiento animal. [DLE](https://dle.rae.es/acaballar) |

## Lote 82

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acaballerar` | Explicado «dar condición de caballero» con palabras comunes y conservado que es poco usado. [DLE](https://dle.rae.es/acaballerar) |
| ES | `acaballonar` | Explicado «caballones» como montículos largos de tierra. [DLE](https://dle.rae.es/acaballonar) [DLE](https://dle.rae.es/caball%C3%B3n) |
| ES | `acabanar` | Explicada la construcción de un refugio mientras se cuida el ganado. [DLE](https://dle.rae.es/acaba%C3%B1ar) |

## Lote 83

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acabestrillar` | Explicada la caza con un buey de cabestrillo sin el término técnico. [DLE](https://dle.rae.es/acabestrillar) [DLE](https://dle.rae.es/buey) |
| ES | `acabildar` | Sustituida «juntar en un dictamen» por la acción de ponerse de acuerdo. [DLE](https://dle.rae.es/acabildar) |
| ES | `acabose` | Cambiado «lo último y extremo» por una explicación del colmo y su uso. [DLE](https://dle.rae.es/acabose) |

## Lote 84

| Idioma | ID | Decisión |
|---|---|---|
| ES | `academia` | Simplificada la definición de la sociedad oficial de especialistas. [DLE](https://dle.rae.es/academia) |
| ES | `academicismo` | Explicada directamente la relación con las reglas clásicas y su uso extendido. [DLE](https://dle.rae.es/academicismo) [DLE](https://dle.rae.es/acad%C3%A9mico) |
| ES | `academismo` | Definido el término directamente y añadida su frecuencia regional. [DLE](https://dle.rae.es/academismo) |

## Lote 85

| Idioma | ID | Decisión |
|---|---|---|
| ES | `academizar` | Explicada la acción de ajustar una obra a reglas académicas y conservado su tono despectivo. [DLE](https://dle.rae.es/academizar) |
| ES | `acaecer` | Simplificada la definición de «suceder» y añadido su sentido antiguo. [DLE](https://dle.rae.es/acaecer) [DLE](https://dle.rae.es/suceder) |
| ES | `acairelar` | Explicados los «caireles» como flecos colgantes. [DLE](https://dle.rae.es/acairelar) [DLE](https://dle.rae.es/cairel) |

## Lote 86

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acalia` | Sustituida la familia botánica por los nombres más conocidos de la planta. [DLE](https://dle.rae.es/acalia) |
| ES | `acamar` | Simplificado el sentido agrícola y añadido el sentido antiguo sobre animales. [DLE](https://dle.rae.es/acamar) |
| ES | `acambrayado` | Explicado el parecido con el cambray mediante sus rasgos textiles. [DLE](https://dle.rae.es/acambrayado) [DLE](https://dle.rae.es/cambray) |

## Lote 87

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acampo` | Sustituida «dehesa» por una descripción concreta del terreno y su uso. [DLE](https://dle.rae.es/acampo) [DLE](https://dle.rae.es/dehesa) |
| ES | `acanaladura` | Simplificada «ranura» y explicado su uso para el paso de líquidos. [DLE](https://dle.rae.es/acanaladura) |
| ES | `acanallado` | Sustituida «vil» por una descripción directa de la conducta. [DLE](https://dle.rae.es/acanallado) |

## Lote 88

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acanallar` | Sustituida «envilecer» por una descripción directa de la deshonestidad. [DLE](https://dle.rae.es/acanallar) |
| ES | `acandilado` | Explicados los sentidos de forma de lámpara y posición levantada. [DLE](https://dle.rae.es/acandilado) |
| ES | `acanillado` | Sustituida «canillas» por rayas y vetas irregulares en la tela. [DLE](https://dle.rae.es/acanillado) |

## Lote 89

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acanilladura` | Explicado el defecto de la tela con palabras concretas; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/acanilladura) [DLE](https://dle.rae.es/acanillado) |
| ES | `acantarar` | Explicada la cántara como medida para líquidos; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/acantarar) [DLE](https://dle.rae.es/c%C3%A1ntara) |
| ES | `acantilar` | Explicados los dos sentidos marineros con palabras más concretas; conservados ambos usos. [DLE](https://dle.rae.es/acantilar) [DLE](https://dle.rae.es/cantil) |

## Lote 90

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acantio` | Explicada la planta con rasgos visibles y sustituidos nombres científicos o poco claros. [DLE](https://dle.rae.es/acantio) |
| ES | `acantocito` | Sustituida la descripción médica técnica por la forma visible del glóbulo rojo. [DLE](https://dle.rae.es/acantocito) [NLM MeSH](https://meshb.nlm.nih.gov/record/ui?dcmsLinks=true&ui=D000050) |
| ES | `acarear` | Explicada la acción de poner a dos personas frente a frente; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/acarear) [DLE](https://dle.rae.es/carear) |

## Lote 91

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acaricida` | Sustituido «miticida» por una explicación directa y simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/acaricida) |
| ES | `acarnerado` | Descrita la forma de la cabeza del caballo con palabras más comunes. [DLE](https://dle.rae.es/acarnerado) |
| ES | `acaro` | Sustituida la descripción zoológica técnica por el parecido con una araña y su forma de vida. [DLE](https://dle.rae.es/%C3%A1caro) |

## Lote 92

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acarralar` | Separados sus dos sentidos y alineado el ejemplo con el sentido textil. [DLE](https://dle.rae.es/acarralar) |
| ES | `acarreador` | Explicada la labor de transporte de la cosecha con palabras comunes. [DLE](https://dle.rae.es/acarreador) |
| ES | `acarreo` | Simplificados el transporte y el sentido geológico. [DLE](https://dle.rae.es/acarreo) [Servicio Geológico Mexicano](https://www.sgm.gob.mx/Web/MuseoVirtual/Planeta/Geologia-Fisica.html) |

## Lote 93

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acartonado` | Separados sus usos literal y figurado; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/acartonado) |
| ES | `acasamatado` | Explicados sus dos usos mediante la cámara militar que define la casamata. [DLE](https://dle.rae.es/acasamatado) [DLE](https://dle.rae.es/casamata) |
| ES | `acatalecto` | Sustituido «pies métricos» por una explicación directa del ritmo y las sílabas. [DLE](https://dle.rae.es/acatalecto) [DLE](https://dle.rae.es/acatal%C3%A9ctico) |

## Lote 94

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acaudalado` | Sustituido «caudal» por «dinero o bienes» y actualizado el ejemplo. [DLE](https://dle.rae.es/acaudalado) |
| ES | `acceder` | Sustituida la expresión formal por «decir que sí»; actualizado el ejemplo. [DLE](https://dle.rae.es/acceder) |
| ES | `acceder-agree-to-idea-or-deal` | Simplificado el sentido de aceptar una idea o un acuerdo; ajustados sinónimo y ejemplo. [DLE](https://dle.rae.es/acceder) |

## Lote 95

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acceder-enter-place` | Verificada: definición, sinónimo y ejemplo ya explican el sentido con palabras comunes; se conservan. [DLE](https://dle.rae.es/acceder) |
| ES | `accesion` | Explicado el efecto legal sobre lo que produce o se añade a una propiedad; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/accesi%C3%B3n) |
| ES | `accesit` | Sustituido el lenguaje formal sobre certámenes por una explicación directa del premio. [DLE](https://dle.rae.es/acc%C3%A9sit) |

## Lote 96

| Idioma | ID | Decisión |
|---|---|---|
| ES | `accidentabilidad` | Explicada con palabras más directas la cantidad de accidentes; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/accidentabilidad) |
| ES | `accidentado` | Acotada al sentido del terreno que muestra el ejemplo; simplificados definición y ejemplo. [DLE](https://dle.rae.es/accidentado) |
| ES | `accidental-music` | Explicado el cambio que produce el signo en la nota; simplificados sinónimo y ejemplo. [DLE](https://dle.rae.es/accidental) |

## Lote 97

| Idioma | ID | Decisión |
|---|---|---|
| ES | `accidente-cerebrovascular` | Explicado el daño cerebral y sus causas con frases breves; simplificado el ejemplo y añadido «ataque cerebral» como sinónimo claro. [MedlinePlus](https://medlineplus.gov/spanish/stroke.html) |
| ES | `accionado` | Retirada la definición metalingüística; explicados con palabras sencillas los gestos que acompañan las palabras o la actuación. [DLE](https://dle.rae.es/accionado) |
| ES | `accionariado` | Simplificado el grupo al que se refiere y retirado un sentido no respaldado por el DLE; ajustados sinónimo y ejemplo. [DLE](https://dle.rae.es/accionariado) |

## Lote 98

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acebo` | Reducida la descripción botánica a hojas verdes, espinas y frutos rojos; sustituido el sinónimo raro y actualizado el ejemplo. [DLE](https://dle.rae.es/acebo) |
| ES | `acebollado` | Sustituida la referencia circular a «acebolladura» por una explicación directa de las capas separadas. [DLE](https://dle.rae.es/acebollado), [DLE: acebolladura](https://dle.rae.es/acebolladura) |
| ES | `acebolladura` | Explicada la separación de las capas de madera con palabras más corrientes; conservados sinónimo y situación del ejemplo. [DLE](https://dle.rae.es/acebolladura) |

## Lote 99

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acebuchal` | Separados sus dos sentidos y sustituida la referencia a «acebuche» por «olivo silvestre»; simplificados sinónimo y ejemplo. [DLE](https://dle.rae.es/acebuchal) |
| ES | `acebuche` | Explicado como olivo silvestre; simplificados su crecimiento, sus frutos y el ejemplo. [DLE](https://dle.rae.es/acebuche) |
| ES | `acebuchina` | Explicado el fruto con una comparación sencilla con la aceituna; actualizado el ejemplo. [DLE](https://dle.rae.es/acebuchina) |

## Lote 100

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acecinar` | Retirada la nota gramatical y simplificado cómo se sala, seca o ahúma la carne; acortado el ejemplo. [DLE](https://dle.rae.es/acecinar) |
| ES | `acefalia` | Explicados directamente el sentido literal y el de falta de dirección; simplificado el ejemplo. [DLE](https://dle.rae.es/acefalia) |
| ES | `aceifa` | Sustituida la etiqueta histórica y la palabra técnica «incursión» por un ataque militar explicado con claridad. [DLE](https://dle.rae.es/aceifa) |

## Lote 101

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aceitera` | Simplificados los sentidos del recipiente y el escarabajo; sustituido «alcuza» por una forma más clara y actualizado el ejemplo. [DLE](https://dle.rae.es/aceitera) |
| ES | `aceitero` | Separados el uso relativo al aceite, la persona que lo vende y los sentidos regionales; simplificado el ejemplo. [DLE](https://dle.rae.es/aceitero) |
| ES | `aceitunero` | Simplificados los sentidos de persona, actividad, lugar y época de cosecha; ajustado el ejemplo. [DLE](https://dle.rae.es/aceitunero) |

## Lote 102

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aceituni` | Explicados con palabras sencillas sus sentidos de tela medieval y decoración de edificios árabes; actualizado el ejemplo. [DLE](https://dle.rae.es/aceitun%C3%AD), [glosario de arquitectura de Protección Civil](https://ea1uro.com/proteccioncivil/vdm02522.htm) |
| ES | `aceituno` | Sustituida la descripción botánica técnica por una explicación directa; conservados el sinónimo y el ejemplo claros. [DLE](https://dle.rae.es/aceituno) |
| ES | `acelajado` | Sustituida la palabra poco común «celaje» por una explicación directa con nubes; conservados los ejemplos claros. [DLE](https://dle.rae.es/acelajado) |

## Lote 103

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acelerometro` | Explicado qué mide con acciones comunes; actualizado el ejemplo con una caída del móvil. [DLE](https://dle.rae.es/aceler%C3%B3metro) |
| ES | `acemileria` | Sustituidas «acémilas», «aparejos» y «oficio» por palabras más comunes; separados el lugar y el uso antiguo. [DLE](https://dle.rae.es/acemiler%C3%ADa) |
| ES | `acemilero` | Explicados con palabras sencillas el trabajo con mulas y el sentido adjetival; simplificado el sinónimo. [DLE](https://dle.rae.es/acemilero), [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/acemilero) |

## Lote 104

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acemita` | Explicado el tipo de pan con palabras comunes; sustituido el sinónimo circular y creado un ejemplo útil. [DLE](https://dle.rae.es/acemita), [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/acemita) |
| ES | `acemite` | Aclaradas la mezcla de salvado y harina y la preparación antigua de trigo tostado; simplificados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/acemite), [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/acemite) |
| ES | `acendrado` | Sustituida la metáfora «sin mancha» por «sin ningún defecto»; reemplazados los ejemplos genéricos por una situación clara. [DLE](https://dle.rae.es/acendrado) |

## Lote 105

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acendrar` | Explicado con palabras comunes cómo se limpia un metal precioso con fuego; actualizado el ejemplo y el sinónimo. [DLE](https://dle.rae.es/acendrar) |
| ES | `acensuar` | Explicada la carga legal como una renta anual sobre una propiedad; reemplazado el ejemplo genérico. [DLE](https://dle.rae.es/acensuar), [censo](https://dle.rae.es/censo) |
| ES | `acenero` | Explicada «aceña» como molino de agua; simplificados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/ace%C3%B1ero), [aceña](https://dle.rae.es/ace%C3%B1a) |

## Lote 106

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acepilladura` | Explicados directamente el alisado de madera y los restos que produce; actualizado el ejemplo. [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/acepilladura), [acepillar](https://dle.rae.es/acepillar) |
| ES | `aceptabilidad` | Simplificados el sentido general y el uso en lingüística; sustituidos tecnicismos y ejemplo. [DLE](https://dle.rae.es/aceptabilidad) |
| ES | `aceptador` | Explicado quién acepta y aclarada la expresión «aceptador de personas»; cambiado el sinónimo difícil y el ejemplo. [DLE](https://dle.rae.es/aceptador), [acepción](https://dle.rae.es/acepci%C3%B3n) |

## Lote 107

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acequiero` | Sustituida la explicación de la acequia por canales de riego y reparto del agua; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/acequiero) |
| ES | `acerado` | Simplificados los sentidos de material, resistencia, crítica y tratamiento del hierro; actualizado el ejemplo. [DLE](https://dle.rae.es/acerado), [acerar](https://dle.rae.es/acerar), [aceración](https://dle.rae.es/aceraci%C3%B3n) |
| ES | `acerbidad` | Explicados con palabras comunes el sabor amargo y agrio, y el trato cruel; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/acerbidad), [acerbo](https://dle.rae.es/acerbo) |

## Lote 108

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acerbo` | Explicados con palabras comunes los sentidos de sabor y trato cruel; actualizados los sinónimos. [DLE](https://dle.rae.es/acerbo) |
| ES | `acereria` | Definida directamente como fábrica de acero y corregido el ejemplo. [DLE](https://dle.rae.es/acer%C3%ADa) |
| ES | `acerico` | Simplificados los dos sentidos de almohadilla y almohada; cambiado el sinónimo difícil y actualizado el ejemplo. [DLE](https://dle.rae.es/acerico) |

## Lote 109

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acerineo` | Simplificada la relación botánica con los arces; aclarado el uso antiguo y cambiado el ejemplo metalingüístico. [DLE](https://dle.rae.es/acer%C3%ADneo), [aceráceo](https://dle.rae.es/acer%C3%A1ceo) |
| ES | `acernadar` | Explicada la pasta de ceniza con palabras comunes; simplificado el ejemplo veterinario. [DLE](https://dle.rae.es/acernadar), [cernada](https://dle.rae.es/cernada), [cataplasma](https://dle.rae.es/cataplasma) |
| ES | `acerola` | Simplificados el aspecto y sabor del fruto; sustituidos el sinónimo y ejemplo difíciles. [DLE](https://dle.rae.es/acerola) |

## Lote 110

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acerolo` | Sustituida la descripción botánica técnica por una explicación breve del árbol y sus rasgos visibles; simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/acerolo) |
| ES | `acerrimo` | Retirada la explicación gramatical del superlativo y expresados con palabras comunes los sentidos de firmeza y rechazo de ideas distintas. [DLE](https://dle.rae.es/ac%C3%A9rrimo) |
| ES | `aceruelo` | Explicado como silla para montar; conservados en una segunda frase los sentidos antiguos y actualizado el ejemplo. [DLE](https://dle.rae.es/aceruelo), [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/aceruelo) |

## Lote 111

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acervo` | Explicados los sentidos de bienes compartidos, transmisión entre generaciones y montón; simplificados los sinónimos. [DLE](https://dle.rae.es/acervo) |
| ES | `acetilcolina` | Sustituido el tecnicismo por la función de comunicación entre células nerviosas y movimiento muscular. [DLE](https://dle.rae.es/acetilcolina) |
| ES | `acetin` | Sustituida la descripción botánica por los rasgos visibles del arbusto; retirado el nombre científico y actualizado el ejemplo. [agracejo, DLE](https://dle.rae.es/agracejo) |

## Lote 112

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acetre` | Sustituido «aspersión» por la acción de rociar agua bendita; simplificado el ejemplo. [DLE](https://dle.rae.es/acetre) |
| ES | `acezante` | Explicados con palabras comunes los sentidos de respirar con dificultad y desear algo con fuerza; acortado el ejemplo. [DLE](https://dle.rae.es/acezante) |
| ES | `acezar` | Sustituida la definición circular y aclarados los sentidos de jadear y desear algo con fuerza. [DLE](https://dle.rae.es/acezar) |

## Lote 113

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achabacanar` | Sustituida la explicación circular por el efecto de volver algo vulgar o de mal gusto; actualizado el ejemplo. [DLE](https://dle.rae.es/achabacanar), [chabacano](https://dle.rae.es/chabacano) |
| ES | `achacable` | Reemplazadas «atribuible» e «imputable» por una frase común; actualizado el ejemplo. [DLE](https://dle.rae.es/achacable) |
| ES | `achacar` | Sustituidos los tecnicismos por «culpar» y simplificado el ejemplo. [DLE](https://dle.rae.es/achacar) |

## Lote 114

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achajuanado` | Explicado como «muy cansado» y conservada la marca de uso en Colombia; ejemplo cotidiano. [DLE](https://dle.rae.es/achajuanado), [chajuanado](https://dle.rae.es/chajuanado) |
| ES | `achajuanarse` | Explicada la sofocación de animales por trabajar con calor o estar muy gordos; conservada la marca de Colombia. [DLE](https://dle.rae.es/achajuanarse) |
| ES | `achancar` | Explicados en frases breves sus sentidos andaluces de aplastar, dejar sin respuesta, sentarse, agacharse y callarse; ejemplo concreto. [DLE](https://dle.rae.es/achancar) |

## Lote 115

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achantar` | Sustituidas las etiquetas gramaticales por los sentidos directos de intimidar, callarse, echarse atrás y esconderse; conservado el uso informal. [DLE](https://dle.rae.es/achantar) |
| ES | `achaparrarse` | Explicado como crecer bajo y ancho; conservado el sentido mexicano de agacharse mucho. [DLE](https://dle.rae.es/achaparrarse) |
| ES | `achaque` | Simplificados los sentidos comunes de molestia, enfermedad, defecto, excusa y tema. [DLE](https://dle.rae.es/achaque) |

## Lote 116

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achaquero` | Conservada la marca histórica y explicado como quien imponía o cobraba multas a ganaderos. [DLE](https://dle.rae.es/achaquero) |
| ES | `acharar` | Sustituidos los tecnicismos por «avergonzar» y «dar un susto»; conservado el uso andaluz de enfadar o dar celos. [DLE](https://dle.rae.es/acharar) |
| ES | `achares` | Simplificado como celos o penas por amor; conservada la marca de España. [DLE](https://dle.rae.es/achares) |

## Lote 117

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achicado` | Sustituida «aniñado» por una explicación directa del aspecto o comportamiento infantil. [DLE](https://dle.rae.es/achicado), [aniñado](https://dle.rae.es/ani%C3%B1ado) |
| ES | `achinar` | Sustituido «oblicuos» por «inclinados» y conservada la descripción como rasgos asociados; simplificado el ejemplo. [DLE](https://dle.rae.es/achinar) |
| ES | `achique` | Sustituida la definición circular por «sacar agua» de un barco o lugar inundado. [DLE](https://dle.rae.es/achique) |

## Lote 118

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achispar` | Explicados por separado el sentido de hacer que alguien beba demasiado y el de empezar a estar algo borracho. [DLE](https://dle.rae.es/achispar) |
| ES | `achocharse` | Simplificada la voz histórica como perder fuerza o claridad mental por la edad; se conserva el registro informal. [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/achocharse) |
| ES | `achocolatado` | Explicado como un color marrón parecido al chocolate o algo de ese color. [DLE](https://dle.rae.es/achocolatado) |

## Lote 119

| Idioma | ID | Decisión |
|---|---|---|
| ES | `achuchado` | Explicado como tener problemas, sobre todo de dinero; retiradas las etiquetas gramaticales. [DLE](https://dle.rae.es/achuchado) |
| ES | `achuchar` | Sustituidos «azuzar» y «atosigar» por «animar a atacar» y «presionar»; conservados el empujón, el aplastamiento y el abrazo fuerte. [DLE](https://dle.rae.es/achuchar) |
| ES | `achuchon` | Explicados directamente los sentidos de abrazo, empujón y malestar repentino. [DLE](https://dle.rae.es/achuch%C3%B3n) |

## Lote 120

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aciago` | Sustituidos «infausto» y «de mal agüero» por «que trae desgracias»; conservado el sentido sustantivo en desuso. [DLE](https://dle.rae.es/aciago) |
| ES | `acibar` | Explicada la sustancia como jugo amargo de áloe y traducido su uso antiguo a palabras comunes. [DLE](https://dle.rae.es/acíbar) |
| ES | `acibarar` | Sustituidos «turbar el ánimo» y «desazón» por causar tristeza o disgusto; explicado el sentido literal. [DLE](https://dle.rae.es/acibarar) |

## Lote 121

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acibarrar` | Explicado como arrojar algo contra otra cosa; conservado que es una palabra antigua y poco usada. [DLE](https://dle.rae.es/acibarrar) |
| ES | `aciberar` | Sustituido «cibera» por el significado directo «moler o triturar»; conservado que es una palabra antigua. [DLE](https://dle.rae.es/aciberar) |
| ES | `acicalado` | Sustituida «extremadamente pulcro» por «muy limpio y bien arreglado»; aclarado el sentido como sustantivo. [DLE](https://dle.rae.es/acicalado) |

## Lote 122

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acicalador` | Sustituida «que acicala» por «persona que arregla»; explicado también como instrumento. [DLE](https://dle.rae.es/acicalador) |
| ES | `acicaladura` | Explicado como acción de arreglarse o limpiar algo; conservada la marca histórica. [acicaladura, DLE](https://dle.rae.es/acicaladura), [acicalador, DLE](https://dle.rae.es/acicalador) |
| ES | `acicate` | Sustituido «estímulo» por «algo que anima a actuar»; explicado también como una punta para guiar al caballo. [DLE](https://dle.rae.es/acicate) |

## Lote 123

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acicatear` | Explicado directamente como animar a actuar o esforzarse. [DLE](https://dle.rae.es/acicatear) |
| ES | `aciche` | Explicados sus dos sentidos: herramienta antigua para colocar suelos y sal mineral; simplificados los términos técnicos. [DLE](https://dle.rae.es/aciche) |
| ES | `acicular` | Explicada la forma de aguja; conservados los usos para hojas y fibras con palabras sencillas. [DLE](https://dle.rae.es/acicular) |

## Lote 124

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acidaque` | Simplificado como dinero o bienes que el esposo entregaba a la esposa al casarse; conservada su marca histórica. [Tesoro de los diccionarios históricos de la RAE](https://temporalweb.asale.org/tdhle/acidaque) |
| ES | `acidia` | Aclaradas la falta de ganas y la tristeza; añadidos sus sentidos de agrura, trato áspero, amarillez de plantas y pez plano. [DLE](https://dle.rae.es/acidia), [acedía](https://dle.rae.es/aced%C3%ADa) |
| ES | `acidimetria` | Sustituida «procedimiento analítico» por «prueba para saber cuánta acidez tiene un líquido». [DLE](https://dle.rae.es/acidimetria) |

`acidalio` no se incluye en los lotes activos: no aparece en el runtime porque la capa de fusiones lo elimina.

## Lote 125

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acidioso` | Explicado como alguien perezoso y con pocas ganas de hacer algo. [DLE](https://dle.rae.es/acidioso) |
| ES | `acidosis` | Simplificado como demasiado ácido en la sangre y los tejidos del cuerpo. [DLE](https://dle.rae.es/acidosis) |
| ES | `acidulo` | Sustituido «ligeramente ácido» por «un poco ácido». [DLE](https://dle.rae.es/ac%C3%ADdulo) |

## Lote 126

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aciemar` | Aclarado como abonar la tierra con estiércol; conservado su uso rural y regional. [Tesoro de los diccionarios históricos de la RAE](https://temporalweb.asale.org/tdhle/aciemar) |
| ES | `acientifico` | Explicado directamente como ignorar o rechazar la ciencia y sus métodos. [DLE](https://dle.rae.es/acient%C3%ADfico) |
| ES | `acierto-correct-result` | Conservada la definición directa de resultado correcto; el sinónimo y el ejemplo ya son claros. [DLE](https://dle.rae.es/acierto) |

## Lote 127

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acierto` | Añadidos los sentidos de resultado correcto, habilidad, prudencia y casualidad; actualizado el sinónimo. [DLE](https://dle.rae.es/acierto) |
| ES | `aciguatado` | Explicados sus sentidos de padecer ciguatera y tener la piel pálida y amarillenta. [DLE](https://dle.rae.es/aciguatado), [ciguatera](https://dle.rae.es/ciguatera) |
| ES | `aciguatar` | Explicado como mirar algo a escondidas o vigilarlo; conservado el uso de Andalucía. [DLE](https://dle.rae.es/aciguatar) |

## Lote 128

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acijado` | Aclarado como el color de una sal llamada acije; indicado que puede ser verde. [Tesoro de los diccionarios históricos de la RAE](https://temporalweb.asale.org/tdhle/acijado) |
| ES | `acije` | Explicado como una sal mineral de hierro, cobre o zinc, también llamada caparrosa. [Tesoro de los diccionarios históricos de la RAE](https://temporalweb.asale.org/tdhle/aceche), [DLE](https://dle.rae.es/caparrosa) |
| ES | `acijoso` | Explicado como algo que contiene acije o caparrosa. [Tesoro de los diccionarios históricos de la RAE](https://temporalweb.asale.org/tdhle/acijoso) |

## Lote 129

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acimentarse` | Explicado como establecerse o echar raíces; conservada la marca de palabra antigua. [DLE](https://dle.rae.es/acimentarse) |
| ES | `acimo` | Normalizada la forma visible a «ácimo» y explicado como pan sin levadura. [DLE](https://dle.rae.es/%C3%A1cimo) |
| ES | `acinesia` | Sustituida la frase nominal «dolencia referida a…» por una explicación directa del término médico. [DLE](https://dle.rae.es/acinesia) |

## Lote 130

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acintado` | Conservada la definición sencilla; cambiado el ejemplo genérico por uno contextual. [DLE](https://dle.rae.es/acintado) |
| ES | `acinturar` | Explicado como ajustar o estrechar algo por la cintura. [DLE](https://dle.rae.es/acinturar) |
| ES | `acion` | Aclarado como correa entre el estribo y la silla de montar; explicado qué es el estribo. [DLE](https://dle.rae.es/aci%C3%B3n) |

## Lote 131

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acionero` | Explicado directamente como la persona que hacía las correas de los estribos; conservada la marca de uso antiguo. [DLE: ación](https://dle.rae.es/aci%C3%B3n) |
| ES | `acipado` | Simplificado como un paño con los hilos muy juntos; eliminado el tecnicismo «percha». [DLE](https://dle.rae.es/acipado) |
| ES | `acirate` | Separados sus dos sentidos: loma que marca un lindero y lomo de tierra entre surcos. [DLE](https://dle.rae.es/acirate), [caballón](https://dle.rae.es/caball%C3%B3n) |

## Lote 132

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aciron` | Explicado directamente como uno de varios tipos de arce; conservado el ejemplo de árbol. [MITECO: ficha de Acer opalus](https://www.miteco.gob.es/content/dam/miteco/es/parques-nacionales-oapn/publicaciones/Semillas%20-%20Fichas%20de%20especies%20A-B_tcm30-100336.pdf) |
| ES | `acivilar` | Simplificado «envilecer, abatir» como humillar o dejar sin ánimo; conservada la marca de uso antiguo. [DLE](https://dle.rae.es/acivilar) |
| ES | `aclamador` | Explicado como quien anima con gritos o aplausos; aclarado también su uso para nombrar a esa persona. [DLE](https://dle.rae.es/aclamador) |

## Lote 133

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aclamar` | Acortado a mostrar apoyo con gritos o aplausos; simplificados los sinónimos. [DLE](https://dle.rae.es/aclamar) |
| ES | `aclarado` | Simplificado el sentido heráldico y añadido el sentido de enjuagar, que también figura en el DLE. [DLE](https://dle.rae.es/aclarado) |
| ES | `aclarador` | Simplificado como algo que ayuda a entender; explicado el uso para productos que aclaran el pelo. [DLE](https://dle.rae.es/aclarador), [aclarar](https://dle.rae.es/aclarar) |

## Lote 134

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aclareo` | Explicado directamente como quitar plantas para dejar más espacio; reemplazados sinónimos técnicos. [DLE](https://dle.rae.es/aclareo) |
| ES | `aclavelado` | Simplificado como algo que se parece a un clavel. [DLE](https://dle.rae.es/aclavelado) |
| ES | `aclimatable` | Explicado directamente como algo que puede adaptarse a un clima nuevo. [DLE](https://dle.rae.es/aclimatable) |

## Lote 135

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aclimatar` | Simplificado como acostumbrar a un ser vivo a otro clima o ambiente, o acostumbrarse a él. [DLE](https://dle.rae.es/aclimatar) |
| ES | `aclocar` | Explicados sus dos sentidos: empollar los huevos y sentarse a gusto. Sustituidos sinónimos poco conocidos. [DLE](https://dle.rae.es/aclocar), [arrellanarse](https://dle.rae.es/arrellanarse) |
| ES | `aclorhidria` | Explicada como falta del ácido del estómago que ayuda a digerir los alimentos. [DLE](https://dle.rae.es/aclorhidria) |

## Lote 136

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aclorhidrico` | Explicado como relacionado con la falta de ácido en el estómago; aclarado también su uso para quien la tiene. [DLE](https://dle.rae.es/aclorh%C3%ADdrico) |
| ES | `acne` | Simplificado como un problema de la piel; cambiado el sinónimo técnico por una explicación común. [DLE](https://dle.rae.es/acn%C3%A9) |
| ES | `acobardado` | Explicado como tener miedo y no atreverse a actuar; conservado su uso para describir algo que expresa ese miedo. [DLE](https://dle.rae.es/acobardado) |

## Lote 137

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acobardar` | Simplificado como causar miedo o quitar el valor a alguien; cambiado «amedrentar» por un sinónimo común. [DLE](https://dle.rae.es/acobardar) |
| ES | `acobijar` | Explicado directamente como amontonar y apretar tierra alrededor de una planta. [DLE](https://dle.rae.es/acobijar), [aporcar](https://dle.rae.es/aporcar) |
| ES | `acobijo` | Simplificado como el montón de tierra que protege las raíces. [DLE](https://dle.rae.es/acobijo), [acobijar](https://dle.rae.es/acobijar) |

## Lote 138

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acobrado` | Explicado como parecido al cobre, también al hablar de la piel; sustituido «cobrizo» por una frase sencilla. [DLE](https://dle.rae.es/acobrado) |
| ES | `acocarse` | Explicado directamente para los frutos; quitados los términos menos conocidos «gorgojo» y «agusanarse». [DLE](https://dle.rae.es/acocarse), [coco](https://dle.rae.es/coco) |
| ES | `acoceador` | Sustituido «dar coces» por «dar patadas» y aclarado que se refiere a las patas traseras. [DLE](https://dle.rae.es/acoceador), [cocear](https://dle.rae.es/cocear) |

## Lote 139

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acocear` | Sustituido «dar coces» por «dar patadas con las patas traseras»; conservada la marca de uso poco frecuente. [DLE](https://dle.rae.es/acocear) |
| ES | `acochambrar` | Cambiado «cochambroso» por «ensuciar» y aclarado que se usa en Cuba y México. [DLE](https://dle.rae.es/acochambrar) |
| ES | `acocharse` | Simplificado como agacharse y acercar el cuerpo al suelo. [DLE](https://dle.rae.es/acocharse) |

## Lote 140

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acochinado` | Simplificadas sus acepciones antiguas y quitada la nota sobre el participio; la 24.ª edición del DLE recoge otra acepción. [Wikcionario: fuente histórica de 1866](https://es.wiktionary.org/wiki/acochinado), [DLE actual](https://dle.rae.es/acochinado) |
| ES | `acochinar` | Simplificados los sentidos de matar, asustar, acorralar una ficha o volverse sucio; quitados «degollar» e «intimidar». [DLE](https://dle.rae.es/acochinar) |
| ES | `acoclarse` | Explicado «ponerse en cuclillas» con palabras directas; conservada la marca de uso rural en Aragón. [DLE](https://dle.rae.es/acoclarse) |

## Lote 141

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acocotar` | Cambiado «cogote» y «acogotar» por «nuca» y una explicación directa del golpe mortal. [DLE](https://dle.rae.es/acocotar), [acogotar](https://dle.rae.es/acogotar) |
| ES | `acodado` | Simplificada la comparación «en forma de codo» y conservado el sentido de apoyarse. [DLE](https://dle.rae.es/acodado) |
| ES | `acodar` | Simplificados sus tres sentidos y explicado el uso agrícola sin «acodo» ni «tallo». [DLE](https://dle.rae.es/acodar) |

## Lote 142

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acodiciar` | Cambiado «codicia» por «desear mucho» y simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/acodiciar) |
| ES | `acogedizo` | Explicado como algo fácil de recoger sin elegirlo; corregido el ejemplo que lo aplicaba al carácter de un pueblo. [DLE](https://dle.rae.es/acogedizo) |
| ES | `acogeta` | Simplificado como lugar donde refugiarse; conservada la marca de palabra antigua. La voz ya no figura en el DLE actual. [DLE 23.ª edición, PDF](https://biblioteca.umem.mx/books/RAE/Diccionario%20de%20la%20Lengua%20Espanola%20%28%20%28335%29/Diccionario%20de%20la%20Lengua%20Espano%20-%20RAE.pdf), [DLE actual](https://dle.rae.es/acogeta) |

## Lote 143

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acogido` | Acortado y aclarado como una persona que recibe ayuda, comida o alojamiento de una institución. [DLE](https://dle.rae.es/acogido) |
| ES | `acogimiento` | Resumidos sus sentidos como recibir o proteger por un tiempo y aceptar bien una propuesta. [DLE](https://dle.rae.es/acogimiento) |
| ES | `acogimiento-familiar` | Explicado con dos frases cortas y sencillas; aclarado que quien cuida no es el padre ni la madre legal. [DLE: acoger](https://dle.rae.es/acoger) |

## Lote 144

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acogombradura` | Explicado como la acción de poner tierra alrededor de una planta y el montón que queda; sustituidos sinónimos técnicos en las capas de corrección. [DLE: aporcar](https://dle.rae.es/aporcar) |
| ES | `acogombrar` | Cambiado «amontonar» por «poner» y aclarado que se hace para proteger la planta. [DLE: aporcar](https://dle.rae.es/aporcar) |
| ES | `acogotar` | Cambiado «cogote» por «nuca» y aclarados sus sentidos de sujetar o golpear. [DLE](https://dle.rae.es/acogotar) |

## Lote 145

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acogullado` | Cambiado «cogulla» por «capucha» y simplificado el ejemplo del monje. [DLE](https://dle.rae.es/acogullado) |
| ES | `acohombrar` | Sustituido «aporcar» por «poner tierra alrededor» en la definición, el ejemplo y la capa de sinónimos. [DLE: aporcar](https://dle.rae.es/aporcar) |
| ES | `acojinar` | Resumida la explicación de la costura y añadido el sentido de cubrir con material blando. [DLE](https://dle.rae.es/acojinar) |

## Lote 146

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acojonante` | Simplificada la definición y conservada la marca de palabra grosera. [DLE](https://dle.rae.es/acojonante) |
| ES | `acojonar` | Cambiada «sorprenderlo mucho» por «dejarlo muy impresionado» y conservada la marca de palabra grosera. [DLE](https://dle.rae.es/acojonar) |
| ES | `acolar` | Sustituidos términos de heráldica por palabras más comunes y aclarada la unión de los escudos y las familias. [DLE](https://dle.rae.es/acolar) |

## Lote 147

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acolchonar` | Sustituida «mullida» por una explicación concreta y añadida la protección frente a golpes o frío. [DLE](https://dle.rae.es/acolchonar) |
| ES | `acolitado` | Cambiados «ministerio litúrgico» y «acólito» por una explicación sencilla del servicio religioso. [DLE](https://dle.rae.es/acolitado) |
| ES | `acolitar` | Sustituida la referencia técnica al acólito por «ayudar durante una ceremonia». [DLE](https://dle.rae.es/acolitar) |

## Lote 148

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acolito` | Simplificada la definición del monaguillo y explicado el sentido de la persona autorizada para ayudar en el altar. [DLE](https://dle.rae.es/ac%C3%B3lito) |
| ES | `acollarar` | Conservada la definición sencilla y sustituido «collarar» por «poner un collar»; corregido el ejemplo. [DLE](https://dle.rae.es/acollarar) |
| ES | `acollonar` | Sustituida «acobardar» por una explicación directa y aclarado que es una palabra informal. [DLE](https://dle.rae.es/acollonar) |

## Lote 149

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acolmillado` | Eliminado «colmudo» por ser menos claro; se conserva «con colmillos». [DLE](https://dle.rae.es/acolmillado) |
| ES | `acombar` | Explicada la idea de curvar algo y quedar curvo sin usar «combar» o «arquear». [DLE](https://dle.rae.es/acombar) |
| ES | `acomedido` | Sustituida «servicial» y la frase abstracta por «persona que suele ayudar». [DLE](https://dle.rae.es/acomedido) |

## Lote 150

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acomedirse` | Cambiada la explicación formal por «ofrecerse para ayudar» y sustituido «brindarse». [DLE](https://dle.rae.es/acomedirse) |
| ES | `acometedor` | Eliminada la definición circular y aclarados sus sentidos de atacar o empezar algo. [DLE](https://dle.rae.es/acometedor) |
| ES | `acometer` | Simplificada la definición y eliminado «embestir»; se conservan los sentidos de atacar y empezar una tarea. [DLE](https://dle.rae.es/acometer) |

## Lote 151

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acometividad` | Explicados sus sentidos de tendencia a atacar y decisión para empezar algo; sustituido «ímpetu». [DLE](https://dle.rae.es/acometividad) |
| ES | `acomodable` | Sustituida la definición circular por una explicación directa. [DLE](https://dle.rae.es/acomodable) |
| ES | `acomodadizo` | Corregida la definición para referirse a una persona y añadido un ejemplo acorde con ese sentido. [DLE](https://dle.rae.es/acomodadizo) |

## Lote 152

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acomodaticio` | Simplificada la definición y sustituido «conformista» por «flexible»; ajustado el ejemplo. [DLE](https://dle.rae.es/acomodaticio) |
| ES | `acomodo` | Sustituidos «acción y efecto» y «disposición conveniente» por una explicación directa. [DLE](https://dle.rae.es/acomodo) |
| ES | `acompanador` | Eliminada la repetición de «acompaña» y simplificado el ejemplo musical. [DLE](https://dle.rae.es/acompa%C3%B1ador) |

## Lote 153

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acompasado` | Sustituida «a compás» por «ritmo regular» y añadido su uso para hablar o moverse despacio. [DLE](https://dle.rae.es/acompasado) |
| ES | `acompasar` | Eliminado «compás» técnico y explicada la acción como seguir el mismo ritmo. [DLE](https://dle.rae.es/acompasar) |
| ES | `acomplejado` | Sustituida la referencia al «complejo psicológico» por una explicación directa. [DLE](https://dle.rae.es/acomplejado) |

## Lote 154

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acomplejar` | Sustituido «complejo psicológico» por una explicación sencilla del efecto en la persona. [DLE](https://dle.rae.es/acomplejar) |
| ES | `acomplexionado` | Sustituida «complexión» por una descripción sencilla del cuerpo; ajustado el ejemplo. [DLE](https://dle.rae.es/acomplexionado) |
| ES | `acomunalar` | Cambiada la explicación técnica por «tener trato» y conservada la marca de palabra antigua. [DLE](https://dle.rae.es/acomunalar) |

## Lote 155

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acomunar` | Simplificada la definición y conservada su condición de palabra antigua; ajustado el ejemplo. [DLE](https://dle.rae.es/acomunar) |
| ES | `aconchabarse` | Simplificado el sentido y expresado el uso informal con palabras sencillas. [DLE](https://dle.rae.es/aconchabarse) |
| ES | `acondicionar` | Sustituida la explicación abstracta por una formulación concreta; simplificado el ejemplo. [DLE](https://dle.rae.es/acondicionar) |

## Lote 156

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acondroplasia` | Simplificada la explicación del crecimiento y sustituidos los tecnicismos en sinónimo y ejemplo. [DLE](https://dle.rae.es/acondroplasia) |
| ES | `aconduchar` | Sustituida «conducho» por «comida» y conservada la marca de palabra antigua. [DLE](https://dle.rae.es/aconduchar) · [conducho](https://dle.rae.es/conducho) |
| ES | `aconfesional` | Explicado el sentido con «religión» y un ejemplo concreto sobre un Estado sin religión oficial. [DLE](https://dle.rae.es/aconfesional) |

## Lote 157

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aconfesionalidad` | Reescrita la definición sin usar el lema y explicado el sentido religioso con palabras conocidas. [DLE](https://dle.rae.es/aconfesionalidad) |
| ES | `acongojador` | Sustituida «congoja» y los sinónimos difíciles por una explicación y un ejemplo más cotidianos. [DLE](https://dle.rae.es/acongojador) · [congoja](https://dle.rae.es/congoja) |
| ES | `acongojante` | Cambiada «congoja» por palabras sencillas y conservado el sentido de tristeza o preocupación. [DLE](https://dle.rae.es/acongojante) · [congoja](https://dle.rae.es/congoja) |

## Lote 158

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acongojar` | Reescrita la definición para explicar tristeza, preocupación y temor sin usar «congoja». [DLE](https://dle.rae.es/acongojar) · [congoja](https://dle.rae.es/congoja) |
| ES | `aconsejador` | Simplificada la definición y mantenido el uso como nombre de una persona. [DLE](https://dle.rae.es/aconsejador) |
| ES | `aconsonantar` | Explicada la rima con palabras corrientes e incluida la rima accidental. [DLE](https://dle.rae.es/aconsonantar) |

## Lote 159

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acontecedero` | Simplificada la definición y marcado el uso poco frecuente con palabras comunes. [DLE](https://dle.rae.es/acontecedero) |
| ES | `acontecer` | Sustituido el listado redundante por «pasar» y aclarado cómo se usa el verbo. [DLE](https://dle.rae.es/acontecer) |
| ES | `acontiado` | Explicada la posesión de tierras y conservada la marca de palabra antigua. [DLE](https://dle.rae.es/acontiado) |

## Lote 160

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acopetado` | Explicada la forma del copete con referencias a plumas y pelo levantados. [DLE](https://dle.rae.es/acopetado) |
| ES | `acopiador` | Simplificada la definición y aclarado el uso regional para quien compra productos del campo. [DLE](https://dle.rae.es/acopiador) |
| ES | `acopiar` | Sustituidos «víveres» y «provisiones» por ejemplos cotidianos de productos. [DLE](https://dle.rae.es/acopiar) |

## Lote 161

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acoplador` | Explicada su función como unión de dos piezas y simplificado el ejemplo. [DLE](https://dle.rae.es/acoplador) |
| ES | `acopladura` | Sustituida la fórmula abstracta por una explicación directa de la unión entre piezas. [DLE](https://dle.rae.es/acopladura) |
| ES | `acoplar` | Cambiados «encajados» y «circunstancia» por expresiones más comunes, conservando dos sentidos. [DLE](https://dle.rae.es/acoplar) |

## Lote 162

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acople` | Explicados sus usos regionales como una unión o una pieza que une. [DLE](https://dle.rae.es/acople) |
| ES | `acoquinar` | Cambiada la explicación abstracta por acciones directas y vocabulario común; se mantiene el uso informal. [DLE](https://dle.rae.es/acoquinar) |
| ES | `acorarse` | Simplificada la acepción emocional ya presente en la ficha. El DLE vigente recoge otro sentido: «enfermar, desmedrar». [DLE](https://dle.rae.es/acorarse) |

## Lote 163

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acorazar` | Explicados con palabras comunes los dos sentidos: cubrir con placas y proteger. [DLE](https://dle.rae.es/acorazar) |
| ES | `acorazonado` | Simplificada la definición y adelantado el sinónimo que explica claramente su forma. [DLE](https://dle.rae.es/acorazonado) |
| ES | `acorcharse` | Simplificadas sus dos acepciones y acortado el ejemplo, conservando el caso de la fruta. [DLE](https://dle.rae.es/acorcharse) |

## Lote 164

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acordante` | Explicado su sentido con palabras comunes y conservado que es una palabra antigua. [DLE](https://dle.rae.es/acordante) |
| ES | `acordonar` | Simplificado el uso de cerrar el paso y añadido el sentido de atar con un cordón. [DLE](https://dle.rae.es/acordonar) |
| ES | `acorneador` | Explicado con una descripción directa; se indica que es una palabra antigua. [DLE](https://dle.rae.es/acorneador) |

## Lote 165

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acornear` | Simplificada la acción y cambiado el ejemplo por una situación más común. [DLE](https://dle.rae.es/acornear) |
| ES | `acorralar` | Explicadas sus dos ideas con palabras directas y un ejemplo claro. [DLE](https://dle.rae.es/acorralar) |
| ES | `acorredor` | Sustituida la etiqueta técnica por una definición directa; el DLE vigente no marca desuso. [DLE](https://dle.rae.es/acorredor) |

## Lote 166

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acorrer` | Simplificada la ayuda y resumidos los usos antiguos con palabras comunes. [DLE](https://dle.rae.es/acorrer) |
| ES | `acorro` | Sustituida la definición abstracta y mantenido que es una palabra antigua. [DLE](https://dle.rae.es/acorro) |
| ES | `acorrucarse` | Cambiada la definición circular por una descripción concreta del movimiento. [DLE](https://dle.rae.es/acorrucarse) |

## Lote 167

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acortejarse` | Sustituida la etiqueta «antiguo» por el uso regional vigente y simplificada la definición. [DLE](https://dle.rae.es/acortejarse) |
| ES | `acorvar` | Cambiados los sinónimos circulares por una explicación directa de la forma curva. [DLE](https://dle.rae.es/acorvar) |
| ES | `acorzar` | Simplificada la explicación y conservado el uso regional de Aragón. [DLE](https://dle.rae.es/acorzar) |

## Lote 168

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acose` | Explicada directamente la molestia de perseguir o insistir mucho, con un ejemplo de denuncia. [DLE](https://dle.rae.es/acose) |
| ES | `acosmismo` | Explicada la idea filosófica con palabras comunes y conservada la posibilidad hipotética. [DLE](https://dle.rae.es/acosmismo) |
| ES | `acotado` | Sustituidos términos técnicos por límites y bordes claros, con un ejemplo concreto. [DLE](https://dle.rae.es/acotado) |

## Lote 169

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acotejar` | Simplificada la explicación regional y usado «poner cada cosa en su sitio»; actualizado el ejemplo. [DLE](https://dle.rae.es/acotejar) |
| ES | `acotillo` | Confirmada la definición directa; retirado un sinónimo poco claro y acortado el ejemplo. [TDHLE](https://temporalweb.asale.org/tdhle/acotillo) |
| ES | `acoyundar` | Explicado con palabras comunes cómo se unen los bueyes para tirar del arado. [DLE](https://dle.rae.es/acoyundar) |

## Lote 170

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acoyuntar` | Cambiada la definición con «yunta» por una explicación directa de cómo los labradores juntan sus animales. [DLE](https://dle.rae.es/acoyuntar) |
| ES | `acoyuntero` | Sustituidos «yunta» y «conjuntamente» por una descripción sencilla del campesino que aporta animales. [DLE](https://dle.rae.es/acoyuntar) |
| ES | `acrata` | Explicada la idea de eliminar toda autoridad y conservado el uso como nombre y adjetivo. [DLE](https://dle.rae.es/%C3%A1crata) |

## Lote 171

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acratico` | Explicada la relación con la idea de eliminar toda autoridad, sin usar «acracia». [DLE](https://dle.rae.es/acr%C3%A1tico) |
| ES | `acre` | Simplificado el sentido activo de olor o sabor fuerte y picante. [DLE](https://dle.rae.es/acre) |
| ES | `acrecentador` | Sustituida la definición circular por «Que hace que algo aumente» y mejorado el ejemplo. [DLE](https://dle.rae.es/acrecentador) |

## Lote 172

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acrecentar` | Reducidas las listas abstractas y conservados los sentidos de aumentar y mejorar. [DLE](https://dle.rae.es/acrecentar) |
| ES | `acreditacion` | Simplificada la explicación del documento que prueba una representación y permite entrar a ciertos lugares. [DLE](https://dle.rae.es/acreditaci%C3%B3n) |
| ES | `acreditacion-de-identidad` | Cambiada la definición técnica por una explicación directa de cómo se comprueba quién es alguien. [DLE](https://dle.rae.es/acreditaci%C3%B3n) |

## Lote 173

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acreditar` | Simplificada la explicación de probar un hecho o reconocer oficialmente el valor o la capacidad de alguien. [DLE](https://dle.rae.es/acreditar) |
| ES | `acreedor` | Explicado quién es con una frase directa; ajustados el sinónimo y su ejemplo al sentido de deber dinero; corregida después la frase del sinónimo en el ejemplo. [DLE](https://dle.rae.es/acreedor) |
| ES | `acreer` | Sustituida «conceder crédito» por «prestar» y conservada la indicación de que es una palabra antigua. [DLE](https://dle.rae.es/acreer) |

## Lote 174

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acrianzar` | Reducida la definición a los sentidos de criar y educar. [DLE](https://dle.rae.es/acrianzar) |
| ES | `acribadura` | Explicada la limpieza de semillas con palabras directas; rehechos el sinónimo y el ejemplo. [DLE](https://dle.rae.es/acribadura) |
| ES | `acribillar` | Separados en dos frases los sentidos de herir, agujerear y hacer muchas preguntas; alineado después el ejemplo con la frase sinónima. [DLE](https://dle.rae.es/acribillar) |

## Lote 175

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acridido` | Explicado con la referencia conocida del saltamontes y la característica indicada por el DLE. [DLE](https://dle.rae.es/acr%C3%ADdido) |
| ES | `acriminador` | Sustituida la definición circular por una explicación directa de quién acusa. [DLE](https://dle.rae.es/acriminador) |
| ES | `acriminar` | Simplificada la definición a «acusar» y ajustados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/acriminar) |

## Lote 176

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acrimonia` | Explicados por separado el trato duro y el sabor áspero; simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/acrimonia) |
| ES | `acrisolador` | Reducidos los sentidos de purificar y fortalecer una cualidad. [DLE](https://dle.rae.es/acrisolador) |
| ES | `acrisolar` | Explicados por separado los sentidos de purificar metales y fortalecer una cualidad. [DLE](https://dle.rae.es/acrisolar) |

## Lote 177

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acristalamiento` | Explicados por separado la instalación de cristales y el conjunto instalado. [DLE](https://dle.rae.es/acristalamiento) |
| ES | `acristalar` | Sustituida la definición extensa por «poner cristales» y simplificado el ejemplo. [DLE](https://dle.rae.es/acristalar) |
| ES | `acristianado` | Simplificados los sentidos y conservada su marca de palabra antigua. [DLE](https://dle.rae.es/acristianado) |

## Lote 178

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acristianar` | Sustituida la definición circular por una explicación directa de convertir al cristianismo. [DLE](https://dle.rae.es/cristianizar) |
| ES | `acritud` | Simplificados por separado los sentidos del olor o sabor y del trato. [DLE](https://dle.rae.es/acritud) |
| ES | `acroamatico` | Explicada la forma de enseñanza con palabras cotidianas y mantenido el ejemplo. [DLE](https://dle.rae.es/acroam%C3%A1tico) |

## Lote 179

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acroe` | Explicado como un antiguo cargo de la corte, aclarado quién lo ejercía y retirado el sinónimo difícil. [DLE: acroy](https://dle.rae.es/acroy) |
| ES | `acromado` | Sustituida la referencia poco clara a un cromo por una imagen impresa y conservado el uso crítico. [DLE](https://dle.rae.es/acromado) |
| ES | `acromatico` | Separados los sentidos de óptica y biología con explicaciones breves. [DLE](https://dle.rae.es/acrom%C3%A1tico) |

## Lote 180

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acromatismo` | Explicada la propiedad de una lente sin usar «aberración cromática». [DLE](https://dle.rae.es/acromatismo) |
| ES | `acromatizar` | Explicado el ajuste de una lente y simplificado el ejemplo de los colores. [DLE](https://dle.rae.es/acromatizar) |
| ES | `acromatopsia` | Sustituida «percibir» por «ver» y explicado el alcance parcial o total. [DLE](https://dle.rae.es/acromatopsia) |

## Lote 181

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acromegalia` | Simplificada la causa y los cambios físicos descritos, manteniendo el exceso de hormona del crecimiento. [DLE](https://dle.rae.es/acromegalia), [NIDDK](https://www.niddk.nih.gov/health-information/endocrine-diseases/acromegaly) |
| ES | `acromegalico` | Simplificada la definición y sustituida la explicación difícil del ejemplo; alineada después la frase sinónima. [DLE](https://dle.rae.es/acromeg%C3%A1lico) |
| ES | `acrono` | Cambiada la definición circular por «que no ocurre en una época concreta» y corregido el ejemplo. [DLE: ácrono](https://dle.rae.es/%C3%A1crono) |

## Lote 182

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acropolis` | Explicada como la parte alta y protegida de una ciudad griega, con sus edificios principales. [DLE](https://dle.rae.es/acr%C3%B3polis) |
| ES | `acrostico` | Simplificada la definición y el ejemplo; actualizadas las dos capas editoriales que repetían la definición anterior. [DLE](https://dle.rae.es/acr%C3%B3stico) |

## Lote 183

| Idioma | ID | Decisión |
|---|---|---|
| ES | `actinico` | Sustituida la formulación técnica por una explicación directa de las lesiones causadas por el sol; simplificados sinónimo y ejemplo, y alineadas después las frases. [DLE](https://dle.rae.es/act%C3%ADnico) |
| ES | `actinio` | Explicado como un metal radiactivo muy raro y retirados detalles técnicos innecesarios para identificarlo. [DLE](https://dle.rae.es/actinio), [Royal Society of Chemistry](https://periodic-table.rsc.org/element/89/Actinium) |
| ES | `actinomices` | Simplificada la descripción de las bacterias y explicado el nombre de la infección que algunas causan. [MedlinePlus](https://medlineplus.gov/spanish/ency/article/000599.htm) |
| ES | `actinomicosis` | Explicada la infección con palabras comunes y simplificados el ejemplo y el sinónimo. [DLE](https://dle.rae.es/actinomicosis), [MedlinePlus](https://medlineplus.gov/spanish/ency/article/000599.htm) |

| ES | `acribadura` | Acortado el ejemplo del sinónimo para conservar la misma idea en una frase sencilla. [DLE](https://dle.rae.es/acribadura) |
| ES | `acristalamiento` | Simplificados el sinónimo y su ejemplo; conservada la idea de aislamiento del doble cristal. [DLE](https://dle.rae.es/acristalamiento) |
| ES | `acromatico` | Sustituido el tecnicismo del sinónimo por una imagen clara de la lente y sus colores. [DLE](https://dle.rae.es/acrom%C3%A1tico) |
| ES | `acromatizar` | Sustituido el ejemplo largo por una acción concreta sobre las franjas de color; alineado después con la frase sinónima. [DLE](https://dle.rae.es/acromatizar) |
| ES | `acromatopsia` | Acortado el ejemplo con el sinónimo para explicar directamente la pérdida de visión de los colores. [DLE](https://dle.rae.es/acromatopsia) |
| ES | `acromegalia` | Acortados el sinónimo y su ejemplo sin perder la referencia al exceso de hormona del crecimiento. [DLE](https://dle.rae.es/acromegalia) |
| ES | `acrostico` | Acortados los dos ejemplos y simplificado el sinónimo para que expresen la misma idea. [DLE](https://dle.rae.es/acr%C3%B3stico) |

## Lote 184

| Idioma | ID | Decisión |
|---|---|---|
| ES | `actinota` | Acortadas la definición y el ejemplo; conservado el nombre actual del mineral. [TDHLE](https://temporalweb.asale.org/tdhle/actinolita), [Museo de Mineralogía de la Universidad de Zaragoza](https://museomine.unizar.es/actinolita/) |
| ES | `actitudinal` | Sustituida la fórmula circular por una explicación directa y corregida la capa editorial que conservaba el sinónimo anterior. [DLE](https://dle.rae.es/actitudinal) |
| ES | `activador` | Explicados sus usos con palabras comunes y simplificados el sinónimo y el ejemplo; hecho coincidir después el ejemplo con la frase sinónima. [DLE](https://dle.rae.es/activador) |
| ES | `activar-estimular-una-actividad-o-respuesta` | Revisadas la definición y las dos frases; se conservan porque explican directamente la acción con un ejemplo claro. [DLE](https://dle.rae.es/activar) |

## Lote 185

| Idioma | ID | Decisión |
|---|---|---|
| ES | `actividades-extraescolares` | Explicada con palabras cotidianas y corregido el sinónimo que dejaba una frase poco natural. [DLE](https://dle.rae.es/extraescolar) |
| ES | `activismo` | Acortada la definición y reemplazados los sinónimos difíciles por una descripción concreta. [DLE](https://dle.rae.es/activismo) |
| ES | `actoral` | Sustituida la definición circular y actualizado el ejemplo de la capa editorial posterior. [DLE](https://dle.rae.es/actoral) |
| ES | `actualizacion-automatica` | Mantenida la explicación directa y corregido el sinónimo que confundía «automática» con «sin avisar». [DLE](https://dle.rae.es/actualizar) |

## Lote 186

| Idioma | ID | Decisión |
|---|---|---|
| ES | `actualizacion-de-la-renta` | Sustituida la idea de subida automática por un cambio previsto en el contrato. [BOE, art. 18](https://www.boe.es/eli/es/l/1994/11/24/29/con/20261002) |
| ES | `actualizacion-de-seguridad` | Simplificada la definición y aclarado que la actualización corrige fallos y protege los datos. [DLE](https://dle.rae.es/actualizar) |
| ES | `actualizador` | Acortada la definición y retirado el sinónimo técnico sobre software. [DLE](https://dle.rae.es/actualizar) |
| ES | `actuante` | Sustituida la fórmula jurídica larga por una explicación directa y un ejemplo concreto. [DLE](https://dle.rae.es/actuante) |
| ES | `actuarial` | Explicados con palabras comunes los cálculos relacionados con seguros y pensiones. [DLE](https://dle.rae.es/actuarial), [actuario de seguros](https://dle.rae.es/actuario) |

## Lote 187

| Idioma | ID | Decisión |
|---|---|---|
| ES | `actuosidad` | Simplificada la definición circular y conservada la marca de palabra antigua. [TDHLE](https://temporalweb.asale.org/tdhle/actuosidad), [DLE: actuoso](https://dle.rae.es/actuoso) |
| ES | `actuoso` | Sustituidos los términos poco comunes por «que hace las cosas con cuidado»; mantenida la marca de palabra antigua. [DLE](https://dle.rae.es/actuoso) |
| ES | `acuadrillar` | Explicados por separado sus sentidos de juntar y dirigir un grupo; retirado el tecnicismo gramatical. [DLE](https://dle.rae.es/acuadrillar) |
| ES | `acuantiar` | Sustituida «cuantía» por «cantidad» y simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/acuantiar) |
| ES | `acuarela` | Explicados con palabras comunes los sentidos de pintura, técnica y color; corregido el ejemplo redundante. [DLE](https://dle.rae.es/acuarela) |

## Lote 188

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abietaceo` | Retirada la jerga botánica; se explica el grupo con ejemplos conocidos. [DLE](https://dle.rae.es/abiet%C3%A1ceo), [pináceo](https://dle.rae.es/pin%C3%A1ceo) |
| ES | `ablativo` | Sustituida la etiqueta gramatical por una explicación directa y conservado el sentido médico. [DLE](https://dle.rae.es/ablativo), [ablación](https://dle.rae.es/ablaci%C3%B3n) |
| ES | `abobar` | Sustituida la fórmula de diccionario por los efectos que produce en una persona. [DLE](https://dle.rae.es/abobar), [embobar](https://dle.rae.es/embobar) |
| ES | `abocado` | Cambiada la explicación metalingüística por una descripción directa del vino. [DLE](https://dle.rae.es/abocado) |
| ES | `abollar` | Simplificados los tres sentidos y marcada de forma sencilla la acepción de Burgos. [DLE](https://dle.rae.es/abollar) |

## Lote 189

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acudiciar` | Cambiada la referencia circular por una explicación directa y marcada la palabra como antigua. [DLE](https://dle.rae.es/acudiciar), [acodiciar](https://dle.rae.es/acodiciar) |
| ES | `acuitar` | Sustituida «cuita» y retirada la etiqueta gramatical; se conserva el uso reflexivo. [DLE](https://dle.rae.es/acuitar) |
| ES | `acular` | Explicados por separado sus usos cotidianos y el sentido de navegación. [DLE](https://dle.rae.es/acular) |
| ES | `acunador` | Reemplazada la fórmula «adjetivo o sustantivo» por los usos de la palabra. [DLE](https://dle.rae.es/acu%C3%B1ador) |
| ES | `acurdarse` | Simplificada la definición y marcada como palabra antigua según su fuente histórica. [TDHLE](https://temporalweb.asale.org/tdhle/acurdarse) |

## Lote 190

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acusica` | Retirada la etiqueta gramatical y explicado el uso con una situación infantil concreta. [DLE](https://dle.rae.es/acusica) |
| ES | `acusique` | Sustituida la etiqueta «poco usado» por una nota directa sobre su frecuencia. [DLE](https://dle.rae.es/acusique) |
| ES | `acuson` | Cambiada la etiqueta gramatical por una definición directa y una marca de uso sencilla. [DLE](https://dle.rae.es/acus%C3%B3n) |
| ES | `abrogar` | Quitado el tecnicismo «verbo transitivo»; se explica qué ocurre con la norma. [DLE](https://dle.rae.es/abrogar) |
| ES | `acuclillarse` | Explicada la postura con acciones concretas y retirado «verbo pronominal». [DLE](https://dle.rae.es/acuclillarse) |

## Lote 191

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acuartar` | Sustituida «yunta» y «animales de tiro» por una acción concreta; conservada la marca de León. [DLE](https://dle.rae.es/acuartar) |
| ES | `aculturar` | Simplificado el concepto cultural y eliminado «verbo transitivo». [DLE](https://dle.rae.es/aculturar) |
| ES | `acumulador` | Separados sus sentidos de reunir cosas y guardar energía; retiradas las etiquetas gramaticales. [DLE](https://dle.rae.es/acumulador) |
| ES | `adaguar` | Explicado con palabras comunes el uso regional para dar agua al ganado. [DLE](https://dle.rae.es/adaguar) |
| ES | `adecuar` | Cambiada la definición técnica por una explicación directa con una situación corriente. [DLE](https://dle.rae.es/adecuar) |

## Lote 192

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adecentar` | Explicados sus sentidos con acciones concretas; retirada la etiqueta «verbo transitivo». [DLE](https://dle.rae.es/adecentar) |
| ES | `adelgazante` | Cambiadas las etiquetas gramaticales por una explicación directa de sus dos usos. [DLE](https://dle.rae.es/adelgazante) |
| ES | `adentrarse` | Sustituida la etiqueta gramatical y simplificados sus sentidos de lugar y tema. [DLE](https://dle.rae.es/adentrarse) |
| ES | `adepto` | Retirada «adjetivo o sustantivo» y explicado con palabras comunes qué hace esa persona. [DLE](https://dle.rae.es/adepto) |
| ES | `adiestrar` | Explicados con verbos comunes el aprendizaje de personas y animales. [DLE](https://dle.rae.es/adiestrar) |

## Lote 193

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adamascar` | Sustituida la explicación sobre damasco por una descripción concreta del dibujo tejido. [DLE](https://dle.rae.es/adamascar) |
| ES | `adardear` | Simplificada la definición y expresada su baja frecuencia con palabras comunes. [DLE](https://dle.rae.es/adardear) |
| ES | `adargar` | Explicados sus sentidos con palabras conocidas y retirada la etiqueta gramatical. [DLE](https://dle.rae.es/adargar) |
| ES | `adecenar` | Cambiada «por decenas» por «grupos de diez» y añadida la idea de dividir. [DLE](https://dle.rae.es/adecenar) |
| ES | `adentellar` | Sustituida la etiqueta gramatical por una explicación directa de morder. [DLE](https://dle.rae.es/adentellar) |

## Lote 194

| Idioma | ID | Decisión |
|---|---|---|
| ES | `agalludo` | Explicados directamente sus dos sentidos y conservada la diferencia regional en la capa de corrección editorial. [DLE](https://dle.rae.es/agalludo) |
| ES | `agazapar` | Sustituida una definición imprecisa por los sentidos de esconderse, acechar y ocultar. [DLE](https://dle.rae.es/agazapar) |
| ES | `ahitera` | Cambiada la explicación formal por «empacho» y conservada la nota de poco uso. [DLE](https://dle.rae.es/ahitera) |
| ES | `ahombrado` | Explicados directamente sus dos sentidos con palabras comunes y ajustado el ejemplo al lema exacto. [DLE](https://dle.rae.es/ahombrado) |
| ES | `ajuntar` | Sustituida la etiqueta gramatical y regional por una explicación directa. [DLE](https://dle.rae.es/ajuntar) |

## Lote 195

| Idioma | ID | Decisión |
|---|---|---|
| ES | `ajuston` | Sustituida la etiqueta gramatical por el sentido regional de apretón. [DLE](https://dle.rae.es/ajust%C3%B3n) |
| ES | `aleonar` | Cambiada la definición coloquial general por el sentido de Chile. [DLE](https://dle.rae.es/aleonar) |
| ES | `alfarnate` | Ajustada al sentido dominicano del DLE y retirada la etiqueta anticuada. [DLE](https://dle.rae.es/alfarnate) |
| ES | `alicaido` | Simplificados sus sentidos de debilidad y pérdida de posición. [DLE](https://dle.rae.es/alica%C3%ADdo) |
| ES | `alicantina` | Explicada directamente la trampa y conservada su nota de uso informal. [DLE](https://dle.rae.es/alicantina) |

## Lote 196

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aldeorrio` | Retirada la etiqueta metalingüística y explicada la forma despectiva de «aldea». [TDHLE](https://temporalweb.asale.org/tdhle/aldeorrio), [ASJU](https://ojs.ehu.eus/index.php/ASJU/article/download/7313/8467) |
| ES | `almidonado` | Explicados directamente el tratamiento de la ropa y el uso para una persona. [DLE](https://dle.rae.es/almidonado) |
| ES | `almiranta` | Sustituida «nave capitana» por «barco del almirante» y simplificada la segunda acepción. [DLE](https://dle.rae.es/almiranta) |
| ES | `almodrote` | Explicados por separado la salsa y el sentido coloquial poco usado. [DLE](https://dle.rae.es/almodrote) |
| ES | `amolar` | Simplificados los sentidos de afilar y molestar y corregidos los ejemplos. [DLE](https://dle.rae.es/amolar) |

## Lote 197

| Idioma | ID | Decisión |
|---|---|---|
| ES | `bragado` | Sustituida la explicación metalingüística por sentidos directos; añadida la acepción «con intención de hacer daño» de la edición actual del DLE. [DLE](https://dle.rae.es/bragado) |
| ES | `cachetear` | Explicados directamente el golpe y el sentido de Puerto Rico; reemplazada «de gorra» por palabras comunes. [DLE](https://dle.rae.es/cachetear) |

## Lote 198

| Idioma | ID | Decisión |
|---|---|---|
| ES | `round2718-forrarse-rich` | Quitada la etiqueta «habla coloquial» y explicado directamente que significa hacerse muy rico; simplificados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/forrar) |
| ES | `round2718-forrarse-eat` | Quitada la etiqueta «habla coloquial» y explicado directamente que significa comer hasta llenarse; simplificados los sinónimos y el ejemplo. [DLE](https://dle.rae.es/forrar) |
| ES | `rayar-4` | Explicado directamente el sentido de molestar o enfadar mucho; conservada una nota sencilla de uso informal. [DLE](https://dle.rae.es/rayar) |
| ES | `rayar-5` | Sustituida la etiqueta metalingüística por el sentido directo de «hacer que alguien pierda la razón». [DLE](https://dle.rae.es/rayar) |
| ES | `sobar-sleep-colloquial` | Sustituida la etiqueta de uso por «dormir» y conservada una nota breve de informalidad. [DLE](https://dle.rae.es/sobar) |

## Lote 199

| Idioma | ID | Decisión |
|---|---|---|
| ES | `pasma` | Sustituida la etiqueta metalingüística por una explicación directa; conservada una nota sencilla de uso informal. [DLE](https://dle.rae.es/pasma) |
| ES | `quisicosa` | Explicado directamente el sentido de misterio o pregunta difícil; indicada su informalidad con palabras comunes. [DLE](https://dle.rae.es/quisicosa) |
| ES | `trinquis` | Cambiada la fórmula «en el habla coloquial» por una definición directa y breve. [DLE](https://dle.rae.es/trinquis) |
| ES | `zapatiesta` | Sustituida la etiqueta coloquial por una explicación directa del alboroto o la pelea. [DLE](https://dle.rae.es/zapatiesta) |
| ES | `malasangre` | Sustituida la etiqueta coloquial por una explicación directa de cómo es esa persona. [DLE](https://dle.rae.es/malasangre) |

## Lote 200

| Idioma | ID | Decisión |
|---|---|---|
| ES | `besucon` | Sustituida la etiqueta gramatical por una explicación directa y una nota breve de uso informal. [DLE](https://dle.rae.es/besuc%C3%B3n) |
| ES | `cinefilo` | Reducida una definición repetitiva a la idea directa de que a alguien le gusta el cine. [DLE](https://dle.rae.es/cin%C3%A9filo) |
| ES | `zamacuco` | Explicados los dos sentidos con frases breves; se conservan la variación regional y la informalidad. [DLE](https://dle.rae.es/zamacuco) |
| ES | `clamoreo` | Explicados por separado el ruido repetido y la petición insistente; simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/clamoreo) |
| ES | `garatero` | Cambiada la fórmula «dicho de una persona» por una explicación directa de la conducta. [DLE](https://dle.rae.es/garatero) |

## Lote 201

| Idioma | ID | Decisión |
|---|---|---|
| EN | `snoopy` | Sustituida la etiqueta de registro por una explicación directa; conservada su carga negativa. [Cambridge](https://dictionary.cambridge.org/us/dictionary/english/snoopy) |
| EN | `jumpy-market-2344` | Simplificada la explicación y el ejemplo; conservada una nota breve de uso informal. [Cambridge](https://dictionary.cambridge.org/dictionary/english/jumpy) |
| EN | `hairy-5` | Separados el sentido literal y el uso figurado con palabras directas. [Cambridge](https://dictionary.cambridge.org/dictionary/english/hairy) |
| EN | `funny-strange-or-unusual` | Simplificada la acepción de «funny» que significa «extraño» y conservado el ejemplo correspondiente. [Cambridge](https://dictionary.cambridge.org/dictionary/english/funny) |
| EN | `round2596-mourning-wail` | Reducida la explicación y corregido el ejemplo para que coincida con el sinónimo. [Cambridge](https://dictionary.cambridge.org/us/dictionary/english/mourning) |

## Lote 202

| Idioma | ID | Decisión |
|---|---|---|
| ES | `alumnado` | Retirada la explicación sobre la clase gramatical y reducido el sinónimo a «grupo de estudiantes». [DLE](https://dle.rae.es/alumnado) |
| ES | `gestante` | Sustituida la explicación gramatical por una definición directa y conservada su relación con textos médicos. [DLE](https://dle.rae.es/gestante) |
| ES | `adoptando` | Retiradas las etiquetas jurídicas y gramaticales; corregida la restricción innecesaria a menores. [DLE](https://dle.rae.es/adoptando) |
| ES | `cesante` | Simplificados sus sentidos y conservada una nota breve sobre el uso regional. [DLE](https://dle.rae.es/cesante) |
| ES | `forense` | Simplificados los sentidos de pruebas judiciales y especialista; ajustados sinónimo y ejemplo. [DLE](https://dle.rae.es/forense) |

## Lote 203

| Idioma | ID | Decisión |
|---|---|---|
| ES | `auto-judicial` | Simplificada la definición legal y sustituida la etiqueta gramatical por el sentido. [DLE](https://dle.rae.es/auto) |
| ES | `en-directo` | Retirada la fórmula «dicho de una emisión» y explicado el momento de la transmisión. [DLE](https://dle.rae.es/directo) |
| ES | `codigo-abierto` | Acortada la definición y conservada la diferencia entre código abierto y precio gratuito. [OSI](https://opensource.org/osd) |
| ES | `autoinmune` | Sustituida la explicación técnica por una referencia clara a las defensas del cuerpo. [DLE](https://dle.rae.es/autoinmune) |
| ES | `monoparental` | Cambiado «progenitor» por palabras más conocidas y ajustado el ejemplo. [DLE](https://dle.rae.es/monoparental) |

## Lote 204

| Idioma | ID | Decisión |
|---|---|---|
| ES | `intestado` | Sustituida la fórmula «dicho de una persona» por el sentido directo. [DLE](https://dle.rae.es/intestado) |
| ES | `laborable` | Explicado qué significa para un día, con palabras comunes. [DLE](https://dle.rae.es/laborable) |
| ES | `pluriempleado` | Cambiada «dicho de una persona» y «pluriempleo» por una explicación directa. [DLE](https://dle.rae.es/pluriempleado) |
| ES | `semielaborado` | Cambiada «dicho de un producto» por una explicación concreta. [DLE](https://dle.rae.es/semielaborado) |
| ES | `embargable` | Explicado quién puede retener el bien y para qué. [DLE](https://dle.rae.es/embargable) |

## Lote 205

| Idioma | ID | Decisión |
|---|---|---|
| ES | `asperges` | Cambiada «antífona» por «oración» y explicada la locución directamente. [DLE](https://dle.rae.es/asperges) |
| ES | `chapeton` | Simplificadas la inexperiencia, la enfermedad antigua y la locución. [DLE](https://dle.rae.es/chapet%C3%B3n) |
| ES | `chipen` | Explicados «verdad» y «bondad»; la locución «de chipé» queda en su entrada propia. [DLE](https://dle.rae.es/chip%C3%A9n), [chipé](https://dle.rae.es/chip%C3%A9) |
| ES | `cuezo` | Sustituida «artesa» y explicada la locución «meter el cuezo». [DLE](https://dle.rae.es/cuezo) |
| ES | `descosido` | Cambiada «trabazón» por «orden» y explicada la locución con palabras directas. [DLE](https://dle.rae.es/descosido) |

## Lote 206

| Idioma | ID | Decisión |
|---|---|---|
| ES | `sancionar` | Reunidos los sentidos de aprobar y castigar en dos frases directas. [DLE](https://dle.rae.es/sancionar) |
| ES | `aplicado` | Simplificada la explicación de una persona atenta; conservado el sentido de algo puesto en práctica. [DLE](https://dle.rae.es/aplicado) |
| ES | `maleducado` | Cambiada la fórmula «dicho de un niño» por una explicación directa. [DLE](https://dle.rae.es/maleducado) |
| ES | `laborioso` | Retirada la etiqueta «dicho de una persona» y mantenido el sentido de esfuerzo. [DLE](https://dle.rae.es/laborioso) |
| ES | `consumible` | Cambiada la explicación técnica por «que se gasta al usarlo». [DLE](https://dle.rae.es/consumible) |

## Lote 207

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acuatizar` | Sustituida «dicho de una aeronave» por el sentido directo. [DLE](https://dle.rae.es/acuatizar) |
| ES | `transgenico` | Simplificada la explicación de los genes añadidos y su propósito. [DLE](https://dle.rae.es/transg%C3%A9nico) |
| ES | `urbanizable` | Acortada la definición y conservada la nota sobre permisos de construcción. [DLE](https://dle.rae.es/urbanizable) |
| ES | `apelable` | Explicado qué se puede pedir que revise un juez. [DLE](https://dle.rae.es/apelable) |
| ES | `antirrobo` | Cambiada «dicho de un sistema» por una explicación directa. [DLE](https://dle.rae.es/antirrobo) |

## Lote 208

| Idioma | ID | Decisión |
|---|---|---|
| ES | `confluir` | Reunidos en dos frases los sentidos de juntarse y coincidir. [DLE](https://dle.rae.es/confluir) |
| ES | `cosmopolita` | Simplificadas las acepciones de persona y lugar; precisado el sentido zoológico. [DLE](https://dle.rae.es/cosmopolita) |
| ES | `consonante` | Sustituida la explicación fonética técnica y aclarados los sentidos de rima y conformidad. [DLE](https://dle.rae.es/consonante) |
| ES | `cojear` | Simplificados los sentidos de caminar, mueble y uso figurado; ajustado el ejemplo al sentido físico. [DLE](https://dle.rae.es/cojear) |
| ES | `decapodo` | Conservada la definición breve y sustituido el ejemplo automático por uno cotidiano. [DLE](https://dle.rae.es/dec%C3%A1podo) |

## Lote 209

| Idioma | ID | Decisión |
|---|---|---|
| ES | `concursado` | Explicado el proceso legal por deudas con palabras directas; actualizado el ejemplo. [DLE](https://dle.rae.es/concursado) |
| ES | `autorizador` | Sustituida «dicho de» por «que da permiso» y simplificado el ejemplo. [DLE](https://dle.rae.es/autorizador) |
| ES | `circular` | Separados en dos frases los sentidos de aviso y forma circular. [DLE](https://dle.rae.es/circular) |
| ES | `interlocutorio` | Simplificada la explicación de una decisión judicial que no cierra el juicio. [DLE](https://dle.rae.es/interlocutorio) |
| ES | `concursada` | Simplificado el proceso judicial por deudas y conservada la variación regional. [DLE](https://dle.rae.es/concursado) |

## Lote 210

| Idioma | ID | Decisión |
|---|---|---|
| ES | `descastado` | Reunidos los sentidos de ingratitud, rechazo del origen y uso taurino. [DLE](https://dle.rae.es/descastado) |
| ES | `criba` | Simplificados los sentidos del utensilio, la selección y la parte de una planta. [DLE](https://dle.rae.es/criba) |
| ES | `atrampar` | Explicados directamente los sentidos de atrapar, atascar un conducto y bloquear un pestillo. [DLE](https://dle.rae.es/atrampar) |
| ES | `arrullar` | Reunidos los sentidos de acunar, atraer con arrullos y decir palabras cariñosas. [DLE](https://dle.rae.es/arrullar) |
| ES | `correoso` | Revisión de seguimiento: separados en frases directas los sentidos de flexibilidad, alimento que pierde calidad y resistencia física; retirado «dúctil». [DLE](https://dle.rae.es/correoso) |

## Lote 211

| Idioma | ID | Decisión |
|---|---|---|
| ES | `competente` | Separados el sentido de capacidad y el uso legal de una autoridad. [DLE](https://dle.rae.es/competente) |
| ES | `aerobus` | Simplificadas las definiciones del avión grande y del autobús aeroportuario regional. [DLE](https://dle.rae.es/aerob%C3%BAs) |
| ES | `aglutinante` | Cambiada la explicación técnica por unir elementos y formar palabras juntando partes. [DLE](https://dle.rae.es/aglutinante) |
| ES | `allegado` | Quitada la fórmula «dicho de» y explicados los sentidos personales y de cercanía. [DLE](https://dle.rae.es/allegado) |
| ES | `buenaventura` | Separadas la buena suerte y la predicción del futuro; actualizado el ejemplo. [DLE](https://dle.rae.es/buenaventura) |

## Lote 212

| Idioma | ID | Decisión |
|---|---|---|
| ES | `admisibilidad` | Explicada como posibilidad de aceptar algo según las reglas; ajustado el ejemplo legal. [DLE](https://dle.rae.es/admisibilidad) |
| ES | `adiamantado` | Reunidos los sentidos de brillo, dureza, talla y adorno con diamantes. [DLE](https://dle.rae.es/adiamantado) |
| ES | `bisiesto` | Explicado el día adicional de febrero y resumida la regla para años de siglo. [DLE](https://dle.rae.es/bisiesto) |
| ES | `alcotan` | Simplificada la descripción del ave y ajustado el sinónimo al ejemplo. [DLE](https://dle.rae.es/alcot%C3%A1n) |
| ES | `alcaiceria` | Simplificados el mercado de seda y el cobro histórico de impuestos. [DLE](https://dle.rae.es/alcaicer%C3%ADa) |

## Lote 213

| Idioma | ID | Decisión |
|---|---|---|
| ES | `copar` | Simplificados los sentidos de ocupar puestos, apostar todo el dinero y capturar una fuerza enemiga. [DLE](https://dle.rae.es/copar) |
| ES | `desbordar` | Explicados con palabras directas los sentidos de rebosar, superar, agobiar, descontrolarse y dejar atrás a un defensa. [DLE](https://dle.rae.es/desbordar) |
| ES | `ahocicar` | Explicados directamente el castigo de un animal y los sentidos de vencer o rendirse en una disputa. [DLE](https://dle.rae.es/ahocicar) |
| ES | `descorche` | Explicadas la retirada de la corteza y el pago a acompañantes por las bebidas que piden los clientes. [DLE](https://dle.rae.es/descorche) |
| ES | `contrafigura` | Explicados directamente el parecido y la sustitución teatral. [DLE](https://dle.rae.es/contrafigura) |

## Lote 214

| Idioma | ID | Decisión |
|---|---|---|
| ES | `subsanar` | Resumidos los sentidos de corregir, reparar un daño, completar y disculpar. [DLE](https://dle.rae.es/subsanar) |
| ES | `requerimiento` | Explicada como petición o aviso formal; aclarado el sentido jurídico. [DLE](https://dle.rae.es/requerimiento) |
| ES | `interponer` | Separados el sentido de poner entre cosas, mediar por alguien y pedir una revisión formal. [DLE](https://dle.rae.es/interponer) |
| ES | `resolucion` | Simplificados los sentidos de resolver un problema, decidir y solucionar en matemáticas. [DLE](https://dle.rae.es/resoluci%C3%B3n) |
| ES | `suministro` | Sustituida la fórmula «acción y efecto» por la entrega de bienes, servicios y productos. [DLE](https://dle.rae.es/suministro) |

## Lote 215

| Idioma | ID | Decisión |
|---|---|---|
| ES | `garantia` | Acortada la explicación de la garantía de un producto y alineado el ejemplo con el primer sinónimo. [DLE](https://dle.rae.es/garant%C3%ADa) |
| ES | `solicitud` | Separados en dos frases la petición y el documento que la presenta; simplificado el ejemplo. [DLE](https://dle.rae.es/solicitud) |
| ES | `seguridad-social` | Explicados los servicios que ofrece y aclarada la variación entre países. [DLE](https://dle.rae.es/seguridad#seguridad-social) |
| ES | `salario-minimo` | Resumida como el pago mínimo que fija la ley. [DLE](https://dle.rae.es/salario#salario-minimo) |
| ES | `vertigo` | Simplificados el giro, la pérdida de equilibrio y el miedo a caer desde una altura. [DLE](https://dle.rae.es/v%C3%A9rtigo) |

## Lote 216

| Idioma | ID | Decisión |
|---|---|---|
| ES | `curatela` | Cambiada la idea de sustitución por apoyo para decidir; aclarado el marco español. [DLE](https://dle.rae.es/curatela), [BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2021-9233) |
| ES | `demandante` | Explicada como persona que presenta una demanda ante un juez; actualizado el ejemplo. [DLE](https://dle.rae.es/demandante) |
| ES | `derecho-defensa` | Acortada la definición y expresado el derecho con palabras corrientes. [DLE](https://dle.rae.es/defensa) |
| ES | `aire-acondicionado` | Acortada la definición y reemplazado «climatización» por una explicación concreta. [DLE](https://dle.rae.es/aire#aire-acondicionado) |
| ES | `tarjeta-credito` | Simplificados el uso y la devolución del dinero; retirado el sinónimo «plástico para pagar a plazos». [DLE](https://dle.rae.es/tarjeta#tarjeta-de-cr%C3%A9dito) |

## Lote 217

| Idioma | ID | Decisión |
|---|---|---|
| ES | `inversion` | Acortada la explicación de usar recursos para obtener un beneficio; cambiado el ejemplo alternativo a una frase directa. [DLE](https://dle.rae.es/inversi%C3%B3n) |
| ES | `banca-online` | Sustituida «hacer operaciones del banco» por trámites en la web o el móvil; corregido el ejemplo redundante. |
| ES | `reunion` | Retirada la fórmula «acción y efecto» y explicado el encuentro de forma directa. [DLE](https://dle.rae.es/reuni%C3%B3n) |
| ES | `aumento` | Quitada la causa incorrectamente limitada a rendimiento o cambio de puesto; explicada como subida de sueldo. [DLE](https://dle.rae.es/aumento) |
| ES | `comite-empresa` | Acortada la definición del grupo elegido para representar los intereses del personal. [DLE](https://dle.rae.es/comit%C3%A9#comit%C3%A9-de-empresa) |

## Lote 218

| Idioma | ID | Decisión |
|---|---|---|
| ES | `apartheid` | Simplificada la explicación histórica y conservado el uso figurado. [DLE](https://dle.rae.es/apartheid) |
| ES | `balanza` | Sustituida la explicación técnica por el uso para pesar; resumidos los sentidos figurados y económicos. [DLE](https://dle.rae.es/balanza) |
| ES | `ayuntamiento` | Explicadas de forma directa las dos acepciones de gobierno municipal y edificio. [DLE](https://dle.rae.es/ayuntamiento) |
| ES | `cantaro` | Acortada la descripción de la vasija y aclarados la medida de vino y el uso «a cántaros». [DLE](https://dle.rae.es/c%C3%A1ntaro) |
| ES | `comisario` | Retirada la definición circular y aclarados sus usos policial, público y de exposiciones. [DLE](https://dle.rae.es/comisario) |

## Lote 219

| Idioma | ID | Decisión |
|---|---|---|
| ES | `agujeta` | Eliminada la etiqueta gramatical y aclarados los usos de cordón y dolor muscular. [DLE](https://dle.rae.es/agujeta) |
| ES | `aflorar` | Sustituidas las etiquetas de transitividad por explicaciones directas de sus sentidos. [DLE](https://dle.rae.es/aflorar) |
| ES | `columpiar` | Explicados directamente el movimiento en un columpio y los usos figurados. [DLE](https://dle.rae.es/columpiar) |
| ES | `comunicacion` | Cambiada «acción y efecto» por una explicación del intercambio de información y otros usos. [DLE](https://dle.rae.es/comunicaci%C3%B3n) |
| ES | `desabrido` | Retirada la etiqueta «adjetivo» y explicados con palabras comunes los sentidos activos. [DLE](https://dle.rae.es/desabrido) |

## Lote 220

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abonar` | Sustituidas las etiquetas de infinitivo por usos directos y reescrito el ejemplo para el sentido de pagar. [DLE](https://dle.rae.es/abonar) |
| ES | `atizar` | Explicados los usos de avivar, golpear y comer o beber mucho; conservada la marca coloquial. [DLE](https://dle.rae.es/atizar) |
| ES | `anteojera` | Explicados con palabras comunes los sentidos de la pieza, la funda y la visión limitada. [DLE](https://dle.rae.es/anteojera) |
| ES | `desahogar` | Retirada la etiqueta de verbo y aclarados los sentidos de aliviar, expresarse y recuperarse. [DLE](https://dle.rae.es/desahogar) |
| ES | `descolgar` | Sustituidas las etiquetas gramaticales por ejemplos concretos de sus sentidos activos. [DLE](https://dle.rae.es/descolgar) |

## Lote 221

| Idioma | ID | Decisión |
|---|---|---|
| EN | `guarantee` | Simplificada la explicación de la garantía de un producto y de la deuda que otra persona respalda. [Cambridge](https://dictionary.cambridge.org/dictionary/english/guarantee) |
| EN | `plot` | Explicados con frases cortas los sentidos de historia, plan, terreno y marcar un lugar. [Cambridge](https://dictionary.cambridge.org/dictionary/english/plot) |
| EN | `shackle` | Cambiada la descripción técnica por las ideas de sujeción y restricción. [Cambridge](https://dictionary.cambridge.org/dictionary/english/shackle) |
| EN | `mortar` | Resumidos los sentidos de mezcla de obra, arma y cuenco. [Cambridge](https://dictionary.cambridge.org/dictionary/english/mortar) |
| EN | `pinch` | Sustituidas las etiquetas gramaticales por usos directos y explicado «at a pinch». [Cambridge](https://dictionary.cambridge.org/dictionary/english/pinch) |

## Lote 222

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comba` | Explicados directamente el juego, la cuerda y la forma curva; simplificados los sinónimos y alineados los ejemplos. [DLE](https://dle.rae.es/comba) |
| ES | `creacionismo` | Resumidos con palabras comunes los sentidos religioso y literario; revisados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/creacionismo) |
| ES | `adoptador` | Aclarados los usos para quien adopta una idea o a una persona; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/adoptador) |
| ES | `atrofiar` | Explicados los sentidos de reducir la función de un órgano y debilitar una capacidad. [DLE](https://dle.rae.es/atrofiar) |
| ES | `contera` | Explicado el protector de un extremo con palabras comunes y resumidos otros sentidos. [DLE](https://dle.rae.es/contera) |

## Lote 223

| Idioma | ID | Decisión |
|---|---|---|
| ES | `incurso` | Reemplazadas las expresiones imprecisas por un uso legal más claro y revisados los sinónimos. [DLE](https://dle.rae.es/incurso) |
| ES | `instancia` | Retirada la idea de que siempre es un formulario; explicada como escrito para presentar una petición. [DLE](https://dle.rae.es/instancia) |
| ES | `compulsar` | Cambiada la explicación coloquial por la comparación de una copia con el original. [DLE](https://dle.rae.es/compulsar) |
| ES | `apostilla` | Precisado que certifica la firma de un documento público para usarlo en otro país; corregida la referencia a un simple sello. [HCCH](https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille) |
| ES | `silencio-administrativo` | Aclarado que la ley determina si la falta de respuesta se entiende como aceptación o rechazo. [DLE](https://dle.rae.es/silencio), [Administración](https://administracion.gob.es/informacion/ayudame/glosario) |

## Lote 224

| Idioma | ID | Decisión |
|---|---|---|
| ES | `fehaciente` | Cambiado el sinónimo poco claro por «fiable» y conservada la idea de prueba clara. [DLE](https://dle.rae.es/fehaciente) |
| ES | `cautelar` | Explicado como algo que previene un daño; aclarado su uso mientras se decide un caso. [DLE](https://dle.rae.es/cautelar) |
| ES | `usufructo` | Aclarados el uso, los beneficios y el deber de cuidar un bien ajeno. [DLE](https://dle.rae.es/usufructo) |
| ES | `litigio` | Sustituido «conflicto de intereses» por una disputa legal y retirado «causa legal». [DLE](https://dle.rae.es/litigio) |
| ES | `afasia` | Explicado como un problema del lenguaje que puede afectar habla, comprensión, lectura y escritura; retirado «pérdida del habla». [MedlinePlus](https://medlineplus.gov/spanish/aphasia.html) |

## Lote 225

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cefalea` | Confirmada la definición directa «Dolor de cabeza» y el ejemplo con «dolor de cabeza». [DLE](https://dle.rae.es/cefalea) |
| ES | `disnea` | Conservada la definición clara y retirado «dificultad respiratoria» por ser menos común que «falta de aire». [MedlinePlus](https://medlineplus.gov/spanish/ency/article/003075.htm) |
| ES | `disfagia` | Conservada «dificultad para tragar» y retirado «deglución»; simplificado el ejemplo. [MedlinePlus](https://medlineplus.gov/spanish/pruebas-de-laboratorio/pruebas-de-disfagia/) |
| ES | `edema` | Sustituido «tejidos» por una explicación breve de la hinchazón por líquido acumulado. [MedlinePlus](https://medlineplus.gov/spanish/edema.html) |
| ES | `bradicardia` | Alineado el ejemplo alternativo con el sinónimo «latido lento del corazón». [MedlinePlus](https://www.medlineplus.gov/spanish/ency/article/007856.htm) |

## Lote 226

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cianosis` | Conservados el cambio de color y las causas posibles, sin afirmar que siempre falte oxígeno. [MedlinePlus](https://medlineplus.gov/spanish/ency/article/003215.htm) |
| ES | `astenia` | Retirada la duración arbitraria de «varios días» y aclarada la falta de fuerza y energía. [DLE](https://dle.rae.es/astenia) |
| ES | `disuria` | Retirada «micción dolorosa» y conservadas las expresiones comunes «dolor» o «dificultad al orinar». [DLE](https://dle.rae.es/disuria), [MedlinePlus](https://medlineplus.gov/spanish/ency/article/003145.htm) |
| ES | `eritema` | Simplificada la descripción a que la piel se pone roja y cambiado «cutáneo» por «de la piel». [DLE](https://dle.rae.es/eritema) |
| ES | `dermatitis` | Reemplazada la frase poco natural «sale rojez» por irritación, picor y enrojecimiento. [DLE](https://dle.rae.es/dermatitis), [MedlinePlus](https://medlineplus.gov/spanish/rashes.html) |

## Lote 227

| Idioma | ID | Decisión |
|---|---|---|
| ES | `artrosis` | Explicado el desgaste de la capa que protege los huesos con palabras comunes; conservados sus posibles efectos. [MedlinePlus](https://medlineplus.gov/spanish/osteoarthritis.html) |
| ES | `artritis` | Explicada como inflamación de una o varias articulaciones; los síntomas se presentan como posibles. [MedlinePlus](https://medlineplus.gov/spanish/ency/article/001243.htm) |
| ES | `biopsia` | Explicada como una prueba que toma y analiza una muestra; cambiado «prueba de tejido» por «toma de una muestra» y simplificado el ejemplo alternativo. [MedlinePlus](https://medlineplus.gov/spanish/ency/article/003416.htm) |
| ES | `luxacion` | Sustituida «desplazamiento» por una explicación directa de que los huesos salen de su sitio; retirado el sinónimo técnico «desplazamiento articular». [MedlinePlus](https://medlineplus.gov/spanish/dislocations.html) |
| ES | `ambulatorio` | Aclarado que no requiere quedarse en el hospital y cambiado «sin ingreso» por una expresión más clara; matizado el regreso a casa. [MedlinePlus](https://medlineplus.gov/spanish/ency/article/002935.htm) |

## Lote 228

| Idioma | ID | Decisión |
|---|---|---|
| ES | `agur` | Sustituida la etiqueta «interjección» por el uso directo de la palabra al despedirse. [DLE](https://dle.rae.es/agur) |
| ES | `aho` | Corregido «saludo» por el uso antiguo para llamar a alguien desde lejos. [DLE](https://dle.rae.es/ah%C3%B3) |
| ES | `aliron` | Explicados directamente sus dos sentidos; retirado «victoria» como sinónimo y alineado el ejemplo con «grito de celebración». [DLE](https://dle.rae.es/alir%C3%B3n) |
| ES | `alon` | Simplificados los tres sentidos y conservado el uso antiguo para pedir que alguien cambie de sitio o tarea. [DLE](https://dle.rae.es/al%C3%B3n) |
| ES | `andropausia` | Sustituida «término coloquial» por una explicación sencilla de la bajada de testosterona y los cambios físicos; aclarado que no equivale a la menopausia. [DLE](https://dle.rae.es/andropausia), [MedlinePlus](https://medlineplus.gov/spanish/ency/patientinstructions/000722.htm) |

## Lote 229

| Idioma | ID | Decisión |
|---|---|---|
| ES | `caracho` | Sustituida la etiqueta gramatical por una explicación directa; conservado el uso informal en palabras comunes. [DLE](https://dle.rae.es/caracho) |
| ES | `carape` | Cambiados «interjección eufemística» por «palabra suave» y simplificados los usos; revisados los sinónimos. [DLE](https://dle.rae.es/carape) |
| ES | `chite` | Explicada como palabra antigua para pedir silencio y alineado el ejemplo con un sinónimo claro. [DLE](https://dle.rae.es/chite) |
| ES | `chito` | Simplificada la explicación y conservado el uso regional para llamar o detener animales. [DLE](https://dle.rae.es/chito) |
| ES | `chiton` | Explicados directamente los dos usos: pedir silencio o recomendarlo para evitar un peligro. [DLE](https://dle.rae.es/chit%C3%B3n) |

## Lote 230

| Idioma | ID | Decisión |
|---|---|---|
| ES | `ascua` | Sustituida la descripción técnica por palabras comunes y separado el uso plural para expresar dolor o sorpresa. [DLE](https://dle.rae.es/ascua) |
| ES | `clo` | Explicado como el sonido de una gallina y sustituido «cloqueo» por la variante «cloc». [DLE](https://dle.rae.es/clo) |
| ES | `cloc` | Explicada su relación con «clo» en dos frases directas y sencillas. [DLE](https://dle.rae.es/cloc) |
| ES | `corcholis` | Cambiada la etiqueta «interjección» por el uso directo; «palabra suave» conserva el matiz eufemístico. [DLE](https://dle.rae.es/c%C3%B3rcholis) |
| ES | `jolines` | Sustituida la etiqueta gramatical por una explicación directa; conservados el uso informal y la marca de España. [DLE](https://dle.rae.es/jolines) |

## Lote 231

| Idioma | ID | Decisión |
|---|---|---|
| ES | `mecachis` | Cambiada «interjección coloquial y eufemística» por una explicación directa que conserva el tono suave e informal. [DLE](https://dle.rae.es/mecachis) |
| ES | `chist` | Sustituida «interjección» por una explicación directa de sus usos para llamar a alguien o pedir silencio. [DLE](https://dle.rae.es/chist), [chis](https://dle.rae.es/chis) |
| ES | `ayayay` | Simplificada la etiqueta gramatical y mantenidos el dolor, la pena y la sorpresa. [DLE](https://dle.rae.es/ayayay) |
| ES | `diantre-2` | Sustituido «interjección coloquial» por palabras comunes y retirado «demonios» como sinónimo por su tono más fuerte. [DLE](https://dle.rae.es/diantre) |
| ES | `pucha-2` | Simplificada la definición y retirado el sinónimo genérico «expresión de disgusto»; aclarado el ejemplo. [DLE](https://dle.rae.es/pucha) |

## Lote 232

| Idioma | ID | Decisión |
|---|---|---|
| ES | `dominicanismo` | Aclarada con palabras directas la relación entre la palabra y el español de República Dominicana. [DLE](https://dle.rae.es/dominicanismo) |
| ES | `fanfarroneria` | Sustituida «forma de hablar o actuar de quien presume con arrogancia» por una acción directa; reemplazados sinónimos menos comunes. [DLE](https://dle.rae.es/fanfarroner%C3%ADa) |
| ES | `hispanismo` | Cambiado «giro» por «palabra o expresión» y aclarados dos sentidos con frases cortas. [DLE](https://dle.rae.es/hispanismo) |
| ES | `jerigonza` | Simplificada a lenguaje propio de un grupo o difícil de entender; aclarado el ejemplo. [DLE](https://dle.rae.es/jerigonza) |
| ES | `mejicanismo` | Sustituida la frase «palabra o forma de hablar propia» por una explicación directa del español de México. [DLE](https://dle.rae.es/mexicanismo) |

## Lote 233

| Idioma | ID | Decisión |
|---|---|---|
| ES | `metonimia` | Reemplazada la explicación indirecta por una descripción directa y un sinónimo formado con palabras comunes. [DLE](https://dle.rae.es/metonimia) |
| ES | `mordacidad` | Explicada con palabras sencillas la burla que puede hacer daño; simplificado el sinónimo y el ejemplo. [DLE](https://dle.rae.es/mordacidad) |
| ES | `perendeca` | Reemplazada la etiqueta «coloquial y despectiva» por dos frases claras que explican el sentido y el tono ofensivo. [DLE](https://dle.rae.es/perendeca) |
| ES | `salve` | Cambiada «interjección literaria» por el uso directo y conservado el contexto de los textos literarios. [DLE](https://dle.rae.es/salve) |
| ES | `andalucismo` | Precisado que es una palabra o rasgo del español de Andalucía; alineado el sinónimo con el ejemplo del seseo. [DLE](https://dle.rae.es/andalucismo) |

## Lote 234

| Idioma | ID | Decisión |
|---|---|---|
| ES | `pche` | Sustituida la categoría «interjección» por una explicación directa de la indiferencia o falta de opinión. [DLE](https://dle.rae.es/pche) |
| ES | `opa-interjection` | Explicado directamente el uso para animar o pedir que algo se levante; actualizado el ejemplo con «aúpa». [DLE](https://dle.rae.es/opa) |
| ES | `pajolero-intensifier` | Reemplazada la etiqueta «palabra coloquial» por una explicación sencilla de cómo expresa enfado o cariño. [DLE](https://dle.rae.es/pajolero) |
| ES | `chis-call-someone` | Sustituida «interjección» por el uso directo: llamar a alguien. [DLE](https://dle.rae.es/chis) |
| ES | `chis-ask-for-silence` | Sustituida «interjección coloquial» por el uso directo y naturalizado el ejemplo del sinónimo. [DLE](https://dle.rae.es/chis) |

## Lote 235

| Idioma | ID | Decisión |
|---|---|---|
| ES | `anglicismo` | Sustituidos «giro» y «modo de hablar» por dos sentidos directos: palabra o expresión inglesa y su uso en otra lengua. [DLE](https://dle.rae.es/anglicismo) |
| ES | `arabismo` | Explicados con palabras comunes los sentidos de palabra o expresión árabe propia o usada en otra lengua. [DLE](https://dle.rae.es/arabismo) |
| ES | `culteranismo` | Acortada la definición y reemplazados «cultismos» y «alusiones eruditas» por palabras y frases poco comunes o complejas. [DLE](https://dle.rae.es/culteranismo) |
| ES | `mimesis-2` | Cambiada «forma de hablar» por «cómo habla» y simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/m%C3%ADmesis) |
| ES | `revestir-embellish-writing` | Explicado directamente el sentido de añadir adornos a un escrito; conservado el ejemplo con metáforas. [DLE](https://dle.rae.es/revestir) |

## Lote 236

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cuti` | Sustituido «interjección» por la explicación directa del sonido repetido para llamar a los cerdos. [Wikcionario](https://es.wiktionary.org/wiki/cut%C3%AD) |
| ES | `jesucristo` | Simplificada la definición de la figura religiosa y cambiada «interjección» por el uso para mostrar sorpresa o enfado. [Castellano Actual, Universidad de Piura](https://www.udep.edu.pe/castellanoactual/dios-mio/) |
| ES | `round3369-lisura-sincerity` | Reemplazada «forma de hablar o actuar» por los sentidos directos de sinceridad y sencillez. [DLE](https://dle.rae.es/lisura) |
| ES | `mistica-3` | Sustituida «expresión literaria de una experiencia» por una explicación más directa de la escritura espiritual. [DLE](https://dle.rae.es/m%C3%ADstica) |
| ES | `refinar-3` | Reemplazada «forma de hablar» por acciones concretas y cambiado el sinónimo «pulir» por «mejorar». [DLE](https://dle.rae.es/refinar) |

## Lote 237

| Idioma | ID | Decisión |
|---|---|---|
| EN | `hallelujah` | Reemplazada «interjection or noun» por el uso directo: alabar o dar gracias a Dios. [Merriam-Webster](https://www.merriam-webster.com/dictionary/hallelujah) |
| EN | `jesus-christ` | Cambiada «expression used to show» por el efecto directo de la exclamación. [Castellano Actual, Universidad de Piura](https://www.udep.edu.pe/castellanoactual/dios-mio/) |
| EN | `girl-2` | Sustituida «informal term for» por el significado directo y una nota de uso sencilla. [Cambridge Dictionary](https://www.merriam-webster.com/dictionary/girl) |
| EN | `shrink-7` | Reemplazada «informal term for» por «psychiatrist» y una nota breve sobre el uso casual. [Merriam-Webster](https://www.merriam-webster.com/dictionary/shrink) |
| EN | `pasting` | Reemplazados «the act of» e «informal term» por dos sentidos directos en frases breves. [Merriam-Webster](https://www.merriam-webster.com/dictionary/pasting) |

## Lote 238

| Idioma | ID | Decisión |
|---|---|---|
| EN | `wokeism` | Reemplazada «informal term for» por una descripción directa y conservado que suele usarse para desacreditar esas ideas. [Collins](https://www.collinsdictionary.com/us/dictionary/english/wokeism) |
| EN | `ick` | Cambiada «exclamation used to show» por una frase directa sobre expresar disgusto. [Merriam-Webster](https://www.merriam-webster.com/dictionary/ick) |
| EN | `the-deuce` | Sustituida «way of saying» por el sentido directo y una explicación breve del uso. [Merriam-Webster](https://www.merriam-webster.com/dictionary/deuce) |
| EN | `honorific-2` | Reemplazada «word or form used to show» por un título o terminación que indica respeto. [Merriam-Webster](https://www.merriam-webster.com/dictionary/honorific) |
| EN | `shrapnel-british-small-change-1382` | Cambiada «British informal term for» por el significado directo y un ejemplo cotidiano con monedas. [Cambridge Dictionary](https://dictionary.cambridge.org/dictionary/english/shrapnel) |

## Lote 239

| Idioma | ID | Decisión |
|---|---|---|
| EN | `pass-away` | Cambiada «a polite or softened way of saying» por el sentido directo y conservado el tono amable. [Merriam-Webster](https://www.merriam-webster.com/dictionary/pass%20away) |
| EN | `yup` | Sustituida «informal way to say» por «yes, said casually». [Merriam-Webster](https://www.merriam-webster.com/dictionary/yup) |
| EN | `ibidem` | Reemplazado «used to show» por una explicación directa de la referencia a la cita anterior. [Merriam-Webster](https://www.merriam-webster.com/dictionary/ibidem) |
| EN | `good-10` | Cambiado «used to show approval» por una frase directa: se dice cuando se aprueba o acepta algo. [Merriam-Webster](https://www.merriam-webster.com/dictionary/good) |
| EN | `round2372-lamb-affection` | Sustituida «a loving word» por el sentido directo de afecto o compasión; alineado el sinónimo del ejemplo. [Merriam-Webster](https://www.merriam-webster.com/dictionary/lamb) |

## Lote 240

| Idioma | ID | Decisión |
|---|---|---|
| ES | `caracho` | Sustituida la explicación metalingüística por el uso directo de la interjección. [DLE](https://dle.rae.es/caracho) |
| ES | `carape` | Explicado directamente el sentido y conservado que es una expresión suave. [DLE](https://dle.rae.es/carape) |
| ES | `chito` | Reemplazada la etiqueta por el sentido directo; conservada la nota regional de uso. [DLE](https://dle.rae.es/chito) |
| ES | `din` | Cambiada la etiqueta gramatical por una explicación concreta del sonido. [DLE](https://dle.rae.es/din) |
| ES | `demontre` | Explicado directamente el uso y conservado que es una expresión suave. [DLE](https://dle.rae.es/demontre) |

## Lote 241

| Idioma | ID | Decisión |
|---|---|---|
| ES | `archiperres` | Sustituida la paráfrasis larga por una explicación sencilla de los objetos; conservado el uso informal. [DLE](https://dle.rae.es/archiperres) |
| ES | `comilona` | Simplificada la definición con palabras de uso común. [DLE](https://dle.rae.es/comilona) |
| ES | `deshambrido` | Reemplazadas las palabras menos comunes por una explicación directa. [DLE](https://dle.rae.es/deshambrido) |
| ES | `cincuenton` | Simplificado el sentido y añadido el sinónimo «cincuagenario» a la ficha para que coincida con el ejemplo. [DLE](https://dle.rae.es/cincuent%C3%B3n) |
| ES | `feten` | Simplificada la definición y conservado el tono informal en palabras comunes. [DLE](https://dle.rae.es/fet%C3%A9n) |

## Lote 242

| Idioma | ID | Decisión |
|---|---|---|
| ES | `agarrafar` | Sustituida la explicación técnica por el sentido directo. [Tesoro histórico de la RAE-ASALE](https://temporalweb.asale.org/tdhle/agarrafar) |
| ES | `agibilibus` | Simplificada la definición y ordenados los sinónimos para que el primero coincida con el ejemplo. [DLE](https://dle.rae.es/agib%C3%ADlibus) |
| ES | `agilibus` | Simplificada la definición y quitada una referencia circular. [DLE](https://dle.rae.es/ag%C3%ADlibus) |
| ES | `apechugar` | Explicado el sentido con palabras comunes y alineado el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/apechugar) |
| ES | `apencar` | Simplificado el sentido con una explicación directa. [DLE](https://dle.rae.es/apencar) |

## Lote 243

| Idioma | ID | Decisión |
|---|---|---|
| ES | `burriciego` | Sustituida la categoría gramatical por el sentido directo; conservado que la palabra puede sonar ofensiva. [DLE](https://dle.rae.es/burriciego) |
| ES | `camandulero` | Explicados los sentidos con palabras comunes y conservado el tono coloquial. [DLE](https://dle.rae.es/camandulero) |
| ES | `cambalachar` | Reemplazada la categoría gramatical por los sentidos directos y alineado el primer sinónimo con su ejemplo. [DLE](https://dle.rae.es/cambalachar) |
| ES | `canijo` | Separados los sentidos de tamaño y debilidad; alineado «enclenque» con el ejemplo. [DLE](https://dle.rae.es/canijo) |
| ES | `catacaldos` | Reemplazada la categoría gramatical por una descripción directa de la persona. [DLE](https://dle.rae.es/catacaldos) |

## Lote 244

| Idioma | ID | Decisión |
|---|---|---|
| ES | `calientapollas` | Sustituida la etiqueta metalingüística por el sentido directo; conservado que es un insulto vulgar. [DLE](https://dle.rae.es/calientapollas) |
| ES | `calzonazos` | Quitadas las categorías gramaticales y explicado el sentido con palabras comunes; conservado que es un insulto coloquial. [DLE](https://dle.rae.es/calzonazos) |
| ES | `canear` | Eliminada la categoría gramatical y dejado el sentido directo, sin repetir el contexto del ejemplo. [DLE](https://dle.rae.es/ca%C3%B1ear) |
| ES | `capitoste` | Sustituida la categoría gramatical por el significado directo; conservado el tono despectivo con una nota sencilla y priorizado «mandamás» como sinónimo del ejemplo. [DLE](https://dle.rae.es/capitoste) |
| ES | `caprichudo` | Reemplazadas la categoría gramatical y la paráfrasis por «Que actúa según sus caprichos»; alineado el primer sinónimo con su ejemplo. [DLE](https://dle.rae.es/caprichudo) |

## Lote 245

| Idioma | ID | Decisión |
|---|---|---|
| ES | `amiguete` | Sustituida la abreviatura gramatical por una explicación directa; conservado que puede decirse con desprecio y alineado «conocido» con el ejemplo. [DLE](https://dle.rae.es/amiguete) |
| ES | `arrabalero` | Reemplazado «arrabal» por «barrio de las afueras» y «zafio» por «grosero»; explicados los dos sentidos. [DLE](https://dle.rae.es/arrabalero) |
| ES | `cantamananas` | Sustituidas las etiquetas y palabras menos comunes por una explicación directa; simplificado el sinónimo del ejemplo. [DLE](https://dle.rae.es/cantama%C3%B1anas) |
| ES | `discursear` | Reemplazada la etiqueta gramatical y la paráfrasis por «Dar discursos»; actualizado el ejemplo con una situación clara. [DLE](https://dle.rae.es/discursear) |
| ES | `round2358-enjabonar-flatter` | Eliminada «Coloquial» como etiqueta inicial; explicado el sentido con palabras comunes y alineado el ejemplo con «decir cosas buenas». [DLE](https://dle.rae.es/enjabonar) |

## Lote 246

| Idioma | ID | Decisión |
|---|---|---|
| ES | `alipori` | Sustituida «Coloq.» por una explicación directa de la vergüenza que se siente por otra persona. [DLE](https://dle.rae.es/alipori) |
| ES | `amigacho` | Reemplazada la abreviatura gramatical por una explicación sencilla; conservado que puede decirse con desprecio. [DLE](https://dle.rae.es/amigacho) |
| ES | `amigote` | Simplificada la definición y explicado el matiz despectivo con palabras comunes. [DLE](https://dle.rae.es/amigote) |
| ES | `amiguero` | Sustituidas las etiquetas por los dos sentidos directos; conservada la información regional de forma breve. [DLE](https://dle.rae.es/amiguero) |
| ES | `amonarse` | Quitadas las abreviaturas y recogidos en frases breves los sentidos de emborracharse y sentirse molesto. [DLE](https://dle.rae.es/amonarse) |

## Lote 247

| Idioma | ID | Decisión |
|---|---|---|
| EN | `halitosis` | Simplificada la definición a «bad breath» y alineado el ejemplo con el sinónimo. [Merriam-Webster](https://www.merriam-webster.com/dictionary/halitosis) |
| EN | `grippe` | Conservado que es una palabra antigua y explicado el sentido como «flu»; actualizado el ejemplo. [Merriam-Webster](https://www.merriam-webster.com/dictionary/grippe) |
| EN | `although` | Sustituida la explicación gramatical por «even though» y un ejemplo de contraste cotidiano. [Merriam-Webster](https://www.merriam-webster.com/dictionary/although) |
| EN | `alms` | Explicado el sentido con palabras comunes y alineado el ejemplo con «gifts». [Merriam-Webster](https://www.merriam-webster.com/dictionary/alms) |
| EN | `womanizer` | Explicado el sentido con palabras comunes y conservado que se usa como insulto. [Merriam-Webster](https://www.merriam-webster.com/dictionary/womanizer) |

## Lote 248

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adir` | Simplificada la definición legal y cambiado el ejemplo por una situación sencilla de herencia. [DLE](https://dle.rae.es/adir) |
| ES | `apechusques` | Corregido el significado erróneo; explicado como «utensilios» y conservado que es regional. [DLE](https://dle.rae.es/apechusques) |
| ES | `aljofaina` | Sustituida «jofaina» por una explicación directa y alineado el ejemplo con «palangana». [DLE](https://dle.rae.es/aljofaina) |
| ES | `anadidura` | Explicados por separado el objeto añadido y el sentido de «por añadidura». [DLE](https://dle.rae.es/a%C3%B1adidura) |
| ES | `asenso` | Simplificado el sentido de acuerdo y explicado «dar asenso» con palabras comunes. [DLE](https://dle.rae.es/asenso) |

## Lote 249

| Idioma | ID | Decisión |
|---|---|---|
| ES | `calabazada` | Separados el golpe en la cabeza y la frase «darse de calabazadas», con palabras comunes. [DLE](https://dle.rae.es/calabazada) |
| ES | `calceta` | Simplificados los sentidos de media, tejido, labor de punto y antigua pieza para sujetar presos. [DLE](https://dle.rae.es/calceta) |
| ES | `campal` | Conservado el sentido antiguo y explicado su uso actual en «batalla campal». [DLE](https://dle.rae.es/campal) |
| ES | `carpetazo` | Simplificados los sentidos regional argentino y de «dar carpetazo»; corregidos sinónimo y ejemplo. [DLE](https://dle.rae.es/carpetazo) |
| ES | `circunloquio` | Reducida la definición a «rodeo de palabras» y actualizado el ejemplo con el sinónimo sencillo. [DLE](https://dle.rae.es/circunloquio) |

## Lote 250

| Idioma | ID | Decisión |
|---|---|---|
| ES | `calo` | Simplificada la profundidad del agua y explicado «hacer calo» con palabras comunes. [DLE](https://dle.rae.es/calo) |
| ES | `calzador` | Definido el objeto de forma directa y explicado «entrar con calzador» sin tecnicismos. [DLE](https://dle.rae.es/calzador) |
| ES | `candilon` | Simplificado el sentido de lámpara y explicado el uso antiguo con palabras breves. [DLE](https://dle.rae.es/candil%C3%B3n) |
| ES | `ceca` | Sustituida la descripción institucional por «lugar oficial donde se hacen monedas»; conservada la locución. [DLE](https://dle.rae.es/ceca) |
| ES | `contrapelo` | Quitada la etiqueta gramatical; explicados directamente el sentido del pelo y el figurado. [DLE](https://dle.rae.es/contrapelo) |

## Lote 251

| Idioma | ID | Decisión |
|---|---|---|
| ES | `ansina` | Sustituida «Coloq. y desus.» por una explicación directa; conservado el uso rural y antiguo. [DLE](https://dle.rae.es/ansina) |
| ES | `anteojudo` | Explicado directamente quién usa la palabra; conservado que es despectiva y regional. [DLE](https://dle.rae.es/anteojudo) |
| ES | `antigualla` | Explicados los sentidos con palabras comunes y separadas las acepciones plurales y poco usadas. [DLE](https://dle.rae.es/antigualla) |
| ES | `arrumaco` | Cambiada la etiqueta «Coloq.» por una explicación directa de sus dos sentidos; corregido un sinónimo. [DLE](https://dle.rae.es/arrumaco) |
| ES | `asneria` | Sustituida «Coloq.» por los sentidos directos; actualizado el ejemplo para mostrar el primero. [DLE](https://dle.rae.es/asner%C3%ADa) |

## Lote 252

| Idioma | ID | Decisión |
|---|---|---|
| ES | `alimania` | Sustituida la remisión «alimaña» por una explicación sencilla del animal dañino. [DLE](https://dle.rae.es/alimania) |
| ES | `alimara` | Explicada la señal de humo con palabras comunes; conservado cómo se hacía. [DLE](https://dle.rae.es/alimara) |
| ES | `alimpiar` | Quitada la abreviatura y explicado directamente que es una forma antigua de «limpiar». [DLE](https://dle.rae.es/alimpiar) |
| ES | `animalias` | Sustituidos «sufragios» y «exequias» por «rezos y ceremonias por una persona muerta». [DLE](https://dle.rae.es/animalias) |
| ES | `alioj` | Quitada la definición técnica sobre la piedra; explicado directamente como «mármol». [DLE](https://dle.rae.es/alioj) |

## Lote 253

| Idioma | ID | Decisión |
|---|---|---|
| ES | `alimental` | Convertida «Desus.» en «palabra antigua» y quitada la repetición de «alimentar». [DLE](https://dle.rae.es/alimental) |
| ES | `alimpiador` | Explicado como persona o cosa que limpia; conservado que es una palabra antigua. [DLE](https://dle.rae.es/alimpiador) |
| ES | `alinoso` | Explicados por separado los dos sentidos de «aliñoso» con palabras comunes. [DLE](https://dle.rae.es/ali%C3%B1oso) |
| ES | `alisadura` | Explicado qué es alisar y qué restos nombra en plural; conservado que es poco usado. [DLE](https://dle.rae.es/alisadura) |
| ES | `alivioso` | Explicado como algo que alivia una molestia; simplificado el primer sinónimo y el ejemplo. [DLE](https://dle.rae.es/alivioso) |

## Lote 254

| Idioma | ID | Decisión |
|---|---|---|
| ES | `alizace` | Sustituida «Desus.» y la expresión técnica «zanja de cimentación» por una explicación concreta. [DLE](https://dle.rae.es/alizace) |
| ES | `anivelar` | Explicados los dos sentidos con palabras comunes; conservado que es una forma antigua. [DLE](https://dle.rae.es/anivelar) |
| ES | `antiquismo` | Explicada la remisión «arcaísmo» con una definición sencilla. [DLE](https://dle.rae.es/antiquismo) |
| ES | `asayar` | Sustituida «experimentar» por «probar algo y ver qué resultado da»; conservado el uso antiguo. [DLE](https://dle.rae.es/asayar) |
| ES | `asconder` | Cambiada la marca antigua por el uso de Burgos; explicada también la forma pronominal. [DLE](https://dle.rae.es/asconder) |

## Lote 255

| Idioma | ID | Decisión |
|---|---|---|
| ES | `ascoroso` | Explicado directamente como algo que da asco; conservado que es una forma antigua. [DLE](https://dle.rae.es/ascoroso) |
| ES | `asmar` | Explicados los tres sentidos antiguos con palabras comunes; renovados ejemplo y sinónimos. [DLE](https://dle.rae.es/asmar) |
| ES | `asnerizo` | Sustituido «arriero de asnos» por «quien guía burros»; conservado que es una palabra antigua. [DLE](https://dle.rae.es/asnerizo) |
| ES | `asobarcar` | Explicados los dos sentidos de «sobarcar» y conservado su uso antiguo y coloquial. [DLE](https://dle.rae.es/asobarcar), [sobarcar](https://dle.rae.es/sobarcar) |
| ES | `asutilar` | Explicado el sentido y el uso con «se» con palabras comunes. [DLE](https://dle.rae.es/asutilar), [sutilizar](https://dle.rae.es/sutilizar) |

## Lote 256

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atabacado` | Explicados directamente el color y su uso para describir algo de ese color. [DLE](https://dle.rae.es/atabacado) |
| ES | `atabalear` | Sustituida la referencia a los atabales por golpes de patas o dedos. [DLE](https://dle.rae.es/atabalear) |
| ES | `atabanado` | Explicado el patrón del pelo del caballo con palabras comunes; ajustado el sinónimo. [DLE](https://dle.rae.es/atabanado) |
| ES | `atal` | Sustituida la marca antigua y explicada la palabra con un uso directo. [DLE](https://dle.rae.es/atal) |
| ES | `atapar` | Cambiada la abreviatura antigua por una explicación directa y sencilla. [DLE](https://dle.rae.es/atapar) |

## Lote 257

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atarantado` | Simplificados los sentidos y conservado el uso informal. [DLE](https://dle.rae.es/atarantado) |
| ES | `atarantar` | Explicado el sentido y el uso con «se» con palabras comunes. [DLE](https://dle.rae.es/atarantar) |
| ES | `atarragar` | Recuperados el sentido regional y el uso antiguo; corregida la capa de sinónimos. [DLE](https://dle.rae.es/atarragar) |
| ES | `atarugar` | Sustituidos los términos técnicos por «unir con clavijas» y «tapar agujeros». [DLE](https://dle.rae.es/atarugar) |
| ES | `ataviar` | Sustituida la explicación gramatical por dos sentidos directos; ordenado el sinónimo. [DLE](https://dle.rae.es/ataviar) |

## Lote 258

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atener` | Simplificados los sentidos actuales y antiguos en dos frases directas. [DLE](https://dle.rae.es/atener) |
| ES | `atenuar` | Sustituidos «tenue» y «sutil» por «menos intenso» y «más fino». [DLE](https://dle.rae.es/atenuar) |
| ES | `aterir` | Explicado el efecto del frío y el uso con «se» con palabras comunes. [DLE](https://dle.rae.es/aterir) |
| ES | `atigrado` | Cambiada la etiqueta «dicho de» por una descripción directa de las rayas. [DLE](https://dle.rae.es/atigrado) |
| ES | `atiplado` | Sustituida la explicación sobre «tono elevado» por «tono alto». [DLE](https://dle.rae.es/atiplado) |

## Lote 259

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atiriciarse` | Explicada la enfermedad con una frase común sobre la piel y los ojos. [DLE](https://dle.rae.es/atiriciarse), [ictericia](https://dle.rae.es/ictericia) |
| ES | `atisbadura` | Sustituida la remisión circular por una explicación breve de la mirada. [DLE](https://dle.rae.es/atisbadura), [atisbar](https://dle.rae.es/atisbar) |
| ES | `atizacandiles` | Sustituidos «metomentodo» y «desus.» por una explicación directa. [DLE](https://dle.rae.es/atizacandiles) |
| ES | `atollar` | Explicados los sentidos costarricenses y los de atascarse con palabras comunes. [DLE](https://dle.rae.es/atollar) |
| ES | `atolondrar` | Sustituida la nota sobre «pronominal» por una explicación directa. [DLE](https://dle.rae.es/atolondrar) |

## Lote 260

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atono` | Cambiada la abreviatura fonética por una explicación directa de cómo suena. [DLE: átono](https://dle.rae.es/%C3%A1tono) |
| ES | `atontar` | Simplificados los sentidos y el uso con «se». [DLE](https://dle.rae.es/atontar) |
| ES | `atorar` | Sustituida la nota gramatical por los dos usos explicados directamente. [DLE](https://dle.rae.es/atorar) |
| ES | `atordecer` | Convertida la marca «desus.» en «palabra antigua»; explicado también el uso con «se». [DLE](https://dle.rae.es/atordecer) |
| ES | `atortolar` | Simplificada la etiqueta coloquial y explicado el sentido poco usado con palabras comunes. [DLE](https://dle.rae.es/atortolar) |

## Lote 261

| Idioma | ID | Decisión |
|---|---|---|
| ES | `atoxicar` | Sustituida la abreviatura y la nota gramatical por los dos usos explicados directamente. [DLE](https://dle.rae.es/atoxicar) |
| ES | `atragantar` | Simplificados los cuatro sentidos y actualizado el ejemplo para que muestre el ahogo por comida. [DLE](https://dle.rae.es/atragantar) |
| ES | `atraillar` | Explicada la traílla como una correa usada para cazar y aclarados los otros sentidos. [DLE](https://dle.rae.es/atraillar) |
| ES | `atramentoso` | Sustituida «tener la propiedad» por «poder» y aclarada la marca de uso antiguo. [DLE](https://dle.rae.es/atramentoso) |
| ES | `atravesano` | Definida con palabras comunes según la remisión actual a «travesaño». [DLE: atravesaño](https://dle.rae.es/atravesa%C3%B1o), [travesaño](https://dle.rae.es/travesa%C3%B1o) |

## Lote 262

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abaritonado` | Sustituida la explicación sobre el timbre por una descripción directa de la voz y el sonido; simplificado el sinónimo. [DLE](https://dle.rae.es/abaritonado) |
| ES | `abatanado` | Explicados los sentidos de sustantivo y adjetivo sin remitir al participio ni a «abatanar». [DLE](https://dle.rae.es/abatanado) |
| ES | `abductor` | Cambiados «eje» y «abducción» por una explicación del movimiento; simplificado el sinónimo. [DLE](https://dle.rae.es/abductor) |
| ES | `abigarrar` | Sustituidos «heterogéneas» y «sin concierto» por «distintas» y «sin orden». [DLE](https://dle.rae.es/abigarrar) |
| ES | `abiotico` | Sustituida la etiqueta «dicho de» y mejorado el ejemplo con «sin vida». [DLE: abiótico](https://dle.rae.es/abi%C3%B3tico) |

## Lote 263

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abocetado` | Sustituida la fórmula «dicho de» y explicado «boceto» como primer dibujo; simplificado el ejemplo. [DLE](https://dle.rae.es/abocetado) |
| ES | `abochornar` | Explicados los sentidos de vergüenza, calor y plantas con frases directas. [DLE](https://dle.rae.es/abochornar) |
| ES | `abohetado` | Sustituida la palabra poco común «abuhado» por «hinchado» en la definición y el ejemplo. [DLE](https://dle.rae.es/abohetado) |
| ES | `abollonar` | Cambiados «repujar» y «bollón» por «hacer relieves» y «echar yemas». [DLE](https://dle.rae.es/abollonar), [bollón](https://dle.rae.es/boll%C3%B3n) |
| ES | `abotonar` | Resumidos los usos de la ropa, las plantas y los huevos con palabras comunes. [DLE](https://dle.rae.es/abotonar) |

## Lote 264

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abrasivo` | Explicados el desgaste y el pulido con palabras comunes; ordenado el sinónimo más claro. [DLE](https://dle.rae.es/abrasivo) |
| ES | `abridero` | Sustituida la etiqueta botánica y aclarados sus usos como adjetivo y como nombre de una fruta. [DLE](https://dle.rae.es/abridero) |
| ES | `achelense` | Explicado el período y las herramientas de dos caras; sustituidos «bifaz» y la fórmula «dicho de». [DLE](https://dle.rae.es/achelense), [bifaz](https://dle.rae.es/bifaz) |
| ES | `acribador` | Explicada la separación con una malla y cambiado el sinónimo por una frase directa. [DLE](https://dle.rae.es/acribador) |
| ES | `acuartillar` | Sustituido el término «cuartillas» por una explicación sencilla de cómo camina el caballo. [DLE](https://dle.rae.es/acuartillar) |

## Lote 265

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aculado` | Cambiada la explicación heráldica por una descripción de la postura del caballo. [DLE](https://dle.rae.es/aculado) |
| ES | `aculebrinado` | Explicado el rasgo principal del cañón con palabras comunes; el DLE no recoge esta forma. [Archivo Azcárate](https://archivo.vocabularioartistico.com/terminos/a/aculebrinado), [Museo del Ejército](https://ejercito.defensa.gob.es/museo/Galerias/documentos/MUSEO/FOLLETO_PIEZAS_SIGNIFICATIVAS.pdf) |
| ES | `acuoso` | Sustituida la etiqueta «dicho de» y aclarados los sentidos de las frutas y los líquidos. [DLE](https://dle.rae.es/acuoso) |
| ES | `acutangulo` | Sustituida la etiqueta geométrica por el límite de 90 grados; el nombre correcto es «acutángulo». [DLE](https://dle.rae.es/acut%C3%A1ngulo) |
| ES | `adimensional` | Explicado «sin dimensiones» con unidades de medida y un ejemplo de división. [DLE](https://dle.rae.es/adimensional) |

## Lote 266

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abofado-swollen` | Quitada la etiqueta «dicho de»; la definición nombra directamente la parte del cuerpo. [DLE](https://dle.rae.es/abofado) |
| ES | `abogador` | Explicado con palabras comunes el sentido actual y el antiguo oficio de una hermandad. [DLE](https://dle.rae.es/abogador) |
| ES | `abolengo` | Simplificados los sentidos de antepasados, linaje, origen y tradición. [DLE](https://dle.rae.es/abolengo) |
| ES | `abolsarse` | Separado el sentido general del uso de la pintura en techos y paredes. [DLE](https://dle.rae.es/abolsarse) |
| ES | `abonado` | Resumidos con lenguaje directo los sentidos adjetivos y sustantivos. [DLE](https://dle.rae.es/abonado) |

## Lote 267

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abocelado` | Explicada la forma redonda y saliente sin usar «bocel». [DLE](https://dle.rae.es/abocelado) |
| ES | `abomaso` | Cambiada la etiqueta zoológica por una descripción sencilla de su lugar en el estómago. [DLE](https://dle.rae.es/abomaso) |
| ES | `abombar` | Eliminada la frase metalingüística y separadas sus acepciones; se conserva el uso regional. [DLE](https://dle.rae.es/abombar) |
| ES | `abonador` | Aclarados los sentidos de quien responde por un fiador, quien abona la tierra y una barrena. [DLE](https://dle.rae.es/abonador) |
| ES | `abonanzar` | Sustituida la etiqueta «dicho del tiempo» por una explicación directa. [DLE](https://dle.rae.es/abonanzar) |

## Lote 268

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abaluartar` | Explicada la fortificación con baluartes como protección con muros salientes. [DLE](https://dle.rae.es/abaluartar), [baluarte](https://dle.rae.es/baluarte) |
| ES | `abarrancar` | Quitada la etiqueta «como pronominal» y explicados con claridad los usos del verbo. [DLE](https://dle.rae.es/abarrancar) |
| ES | `abastionar` | Explicada la defensa con bastiones como protección con salientes en las murallas. [DLE](https://dle.rae.es/abastionar), [bastión](https://dle.rae.es/basti%C3%B3n) |
| ES | `abatanar` | Sustituidos «batán» y «enfurtir» por una explicación sencilla del trabajo con telas. [DLE](https://dle.rae.es/abatanar) |
| ES | `abemolar` | Explicado el sentido musical con los signos que bajan una nota medio tono. [DLE](https://dle.rae.es/abemolar) |

## Lote 269

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abacial` | Reemplazada la construcción «perteneciente o relativo a» por una explicación directa. [DLE](https://dle.rae.es/abacial) |
| ES | `abadengo` | Explicado con palabras comunes que algo pertenece a un abad o una abadesa. [DLE](https://dle.rae.es/abadengo) |
| ES | `abanderar` | Simplificado el registro de barcos y la defensa de una causa. [DLE](https://dle.rae.es/abanderar) |
| ES | `abduccion` | Sustituido «plano medio» por una explicación del movimiento desde el centro del cuerpo. [DLE](https://dle.rae.es/abducci%C3%B3n) |
| ES | `abintestato` | Explicado el trámite judicial de herencia sin testamento con palabras comunes. [DLE](https://dle.rae.es/abintestato) |

## Lote 270

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abocardado` | Quitada la etiqueta «dicho de» y explicado con una trompeta como comparación. [DLE](https://dle.rae.es/abocardado) |
| ES | `abogadil` | Explicado el sentido y conservado el posible matiz despectivo y su excepción en Costa Rica. [DLE](https://dle.rae.es/abogadil) |
| ES | `abogadismo` | Expresado con palabras comunes el exceso de influencia de los abogados; el DLE no recoge esta voz. [DLE](https://dle.rae.es/abogadismo) |
| ES | `abismar` | Sustituida la etiqueta «como pronominal» por ejemplos directos de los sentidos. [DLE](https://dle.rae.es/abismar) |
| ES | `abjurar` | Eliminado el comentario gramatical y explicado el sentido en frases breves. [DLE](https://dle.rae.es/abjurar) |

## Lote 271

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abnegado` | Explicada la renuncia a los deseos con palabras comunes y una frase breve. [DLE](https://dle.rae.es/abnegado) |
| ES | `abocar` | Simplificados los sentidos de pasar contenido, acercar, terminar, reunirse y dedicarse. [DLE](https://dle.rae.es/abocar) |
| ES | `abocetar` | Sustituida la descripción larga por las acciones de dibujar y describir por encima. [DLE](https://dle.rae.es/abocetar) |
| ES | `abominar` | Explicados por separado el rechazo y la condena, sin comentario gramatical. [DLE](https://dle.rae.es/abominar) |
| ES | `abotonador` | Explicada la función del utensilio en una frase. El DLE no recoge esta voz. [DLE](https://dle.rae.es/abotonador) |

## Lote 272

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aborrecer` | Sustituida la fórmula «dicho de» por acciones directas; se conservan el rechazo y el abandono animal. [DLE](https://dle.rae.es/aborrecer) |
| ES | `abotagarse` | Explicado directamente el hinchamiento corporal. El sentido mental figura en una entrada separada. [DLE](https://dle.rae.es/abotagarse) |
| ES | `abotagarse-mental` | Revisada como ficha separada; se conserva porque su segunda parte explica el sentido con palabras comunes. [DLE](https://dle.rae.es/abotagarse) |
| ES | `abrasar` | Agrupados sus sentidos en dos frases breves con palabras comunes. [DLE](https://dle.rae.es/abrasar) |
| ES | `acumulativo` | Sustituida la definición circular por una explicación de sumar resultados y cantidades. [DLE](https://dle.rae.es/acumulativo) |
| ES | `adiposo` | Sustituida «perteneciente o relativo» por una explicación directa sobre la grasa. [DLE](https://dle.rae.es/adiposo) |

## Lote 273

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acrobatico` | Sustituida la definición repetitiva por una explicación directa de sus movimientos y ejercicios. [DLE](https://dle.rae.es/acrob%C3%A1tico) |
| ES | `acuarelistico` | Simplificada la definición, conservado su uso poco frecuente y sustituido el sinónimo circular por una frase clara. [DLE](https://dle.rae.es/acuarel%C3%ADstico) |
| ES | `acuntir` | Explicado el sentido con «ocurrir» y «pasar»; el ejemplo usa el sinónimo más común. [DLE](https://dle.rae.es/acuntir) |
| ES | `adamado` | Simplificada la definición; conservados los sentidos antiguos y despectivos con etiquetas claras. [DLE](https://dle.rae.es/adamado) |
| ES | `adamar` | Quitado el metalenguaje gramatical y separados los sentidos de cortejar, amar intensamente y enamorarse. [DLE](https://dle.rae.es/adamar) |

## Lote 274

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abrevador` | Explicadas directamente sus funciones para dar agua al ganado y como lugar donde bebe. [DLE](https://dle.rae.es/abrevador) |
| ES | `acuchillador` | Simplificados los sentidos de herir, manejar la espada y alisar suelos; ejemplo y primer sinónimo coinciden. [DLE](https://dle.rae.es/acuchillador) |
| ES | `adamarse` | Reescrita la fórmula gramatical con una explicación breve; conservados el uso poco frecuente y el sentido antiguo. [DLE](https://dle.rae.es/adamarse) |
| ES | `adamico` | Sustituida la definición circular por una explicación directa sobre Adán y sus descendientes. [DLE](https://dle.rae.es/ad%C3%A1mico) |
| ES | `adamita` | Explicada con palabras comunes la relación con el grupo religioso y sus ideas. [DLE](https://dle.rae.es/adamita), [adamismo](https://dle.rae.es/adamismo) |

## Lote 275

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adaptativo` | Quitada la fórmula «perteneciente o relativo»; se explica directamente el ajuste a cambios. [DLE](https://dle.rae.es/adaptativo) |
| ES | `adehesar` | Explicado el terreno con pastos y árboles; conservado el uso pronominal. [DLE](https://dle.rae.es/adehesar) |
| ES | `adenoideo` | Sustituida la referencia a la nasofaringe por una ubicación común: detrás de la nariz. [DLE](https://dle.rae.es/adenoideo), [MedlinePlus](https://medlineplus.gov/adenoids.html) |
| ES | `adenopatico` | Sustituida la fórmula gramatical por una explicación breve sobre los ganglios linfáticos. [DLE](https://dle.rae.es/adenop%C3%A1tico), [MedlinePlus](https://medlineplus.gov/ency/article/003097.htm) |
| ES | `adensar` | Quitada la fórmula gramatical y ordenados los sinónimos para que el ejemplo use el primero. [DLE](https://dle.rae.es/adensar) |

## Lote 276

| Idioma | ID | Decisión |
|---|---|---|
| ES | `admisible` | Simplificada la definición y conservada la diferencia entre poder valorar una prueba y demostrar que sea cierta. [DLE](https://dle.rae.es/admisible) |
| ES | `adquiriente` | Explicado como quien recibe un bien o derecho; se mantiene el caso de la compraventa. [DLE](https://dle.rae.es/adquiriente) |
| ES | `adulteracion` | Explicada como un cambio intencional; se mantienen sus posibles efectos y el uso para engañar. [DLE](https://dle.rae.es/adulteraci%C3%B3n) |
| ES | `adecuacion` | Sustituida la fórmula circular por «ajuste» y conservado el uso jurídico en palabras simples. [DLE](https://dle.rae.es/adecuaci%C3%B3n) |
| ES | `adenoides` | Sustituida la ubicación anatómica técnica por una descripción común y conservada su función. [MedlinePlus](https://medlineplus.gov/spanish/adenoids.html) |

## Lote 277

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adagial` | Quitada la etiqueta gramatical; explicado directamente como relativo a un dicho o proverbio. [DLE](https://dle.rae.es/adagial) |
| ES | `adamantino` | Explicado con palabras directas y conservado su uso sobre todo poético. [DLE](https://dle.rae.es/adamantino) |
| ES | `adaptabilidad` | Quitada la etiqueta gramatical y explicada como capacidad de ajustarse a cambios. [DLE](https://dle.rae.es/adaptabilidad) |
| ES | `adaptable` | Quitada la etiqueta gramatical; se explica directamente que algo puede ajustarse. [DLE](https://dle.rae.es/adaptable) |
| ES | `adaptador` | Explicados directamente los sentidos de dispositivo y de persona que adapta algo. [DLE](https://dle.rae.es/adaptador) |

## Lote 278

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adherencia` | Simplificados los sentidos de unión física y seguimiento del tratamiento acordado. [DLE](https://dle.rae.es/adherencia), [AHRQ](https://www.ahrq.gov/patient-safety/settings/hospital/red/toolkit/redtool5.html) |
| ES | `administracion-judicial` | Explicada como gestión bajo control judicial y conservado que no exige insolvencia. [DLE](https://dle.rae.es/administraci%C3%B3n) |
| ES | `adjudicatario` | Explicado como quien recibe un bien o contrato por decisión oficial; ejemplo y primer sinónimo coinciden. [DLE](https://dle.rae.es/adjudicatario) |
| ES | `adaptacion-curricular` | Sustituida la lista técnica por una explicación breve de los cambios para atender a un alumno. [DLE](https://dle.rae.es/adaptaci%C3%B3n), [Ministerio de Educación](https://www.educacionfpydeportes.gob.es/dam/jcr%3A7325e479-f83c-467d-9023-709e8817ad00/re35810.pdf) |
| ES | `adoptable` | Simplificada la definición y conservado que la adopción de una persona depende de la ley. [DLE](https://dle.rae.es/adoptable) |

## Lote 279

| Idioma | ID | Decisión |
|---|---|---|
| ES | `apechar` | Explicado directamente como cargar con algo no deseado; el primer sinónimo coincide con el ejemplo. [DLE](https://dle.rae.es/apechar) |
| ES | `apiparse` | Quitadas las etiquetas gramatical y de registro; explicado como comer o beber demasiado. Se priorizó un sinónimo más claro. [DLE](https://dle.rae.es/apiparse) |
| ES | `aquellar` | Explicado directamente el uso para reemplazar un verbo que no se sabe o no se quiere decir. [DLE](https://dle.rae.es/aquellar) |
| ES | `arrancapinos` | Explicada primero la idea y conservado el uso informal con palabras sencillas. [DLE](https://dle.rae.es/arrancapinos) |
| ES | `berzas` | Sustituida la etiqueta técnica «coloquial y despectivo» por «insulto informal» y una explicación directa. [DLE](https://dle.rae.es/berzas) |

## Lote 280

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cantonero` | Reunidos sus sentidos con palabras directas; el primer sinónimo y el ejemplo ahora coinciden. [DLE](https://dle.rae.es/cantonero), [cantonear](https://dle.rae.es/cantonear) |
| ES | `carcaman` | Actualizados los sentidos y el uso regional; aclarado el significado de cada uno. [DLE](https://dle.rae.es/carcam%C3%A1n) |
| ES | `corriveras` | Explicado directamente como variante de «correverás»; quitadas las etiquetas innecesarias. [DLE](https://dle.rae.es/correver%C3%A1s) |
| ES | `diantre` | Simplificada la explicación del nombre y añadidos sus usos para expresar sorpresa, admiración o disgusto. [DLE](https://dle.rae.es/diantre) |
| ES | `diantre-2` | Cambiada la etiqueta gramatical por una explicación directa de cuándo se dice. [DLE](https://dle.rae.es/diantre) |
| ES | `empanado-distracted` | Explicado directamente como distraído o confuso; conservado el uso informal en España. [DLE](https://dle.rae.es/empanado) |

## Lote 281

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acumen` | Explicado como capacidad para entender y juzgar; simplificado el primer sinónimo y alineado el ejemplo. [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/acumen) |
| ES | `acumulo` | Sustituida la explicación circular por «reunir o amontonar cosas». [DLE](https://dle.rae.es/ac%C3%BAmulo) |
| ES | `adanismo` | Quitada la etiqueta gramatical; separados el hábito y los sentidos históricos con palabras más directas. [DLE](https://dle.rae.es/adanismo) |
| ES | `adarce` | Simplificada la descripción de la costra de sal que deja el agua del mar. [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/adarce) |
| ES | `adarme` | Explicada la antigua unidad de peso en gramos; se priorizó «pizca» para el ejemplo. [DLE](https://dle.rae.es/adarme) |

## Lote 282

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acuatil` | Sustituida la etiqueta gramatical y la explicación circular por una frase directa. |
| ES | `acubado` | Quitada la etiqueta gramatical y ordenados los sinónimos según el ejemplo. [DLE](https://dle.rae.es/acubado) |
| ES | `acubilar` | Explicado como llevar al cerdo a la pocilga; conservado el uso en Asturias. [DLE](https://dle.rae.es/acubilar) |
| ES | `acucharado` | Quitada la etiqueta gramatical y explicado el parecido con la parte honda de una cuchara. [DLE](https://dle.rae.es/acucharado) |
| ES | `acuchilladizo` | Sustituido «esgrimidor» por «luchador con espada» y conservado que es una palabra antigua. [DLE](https://dle.rae.es/acuchilladizo) |

## Lote 283

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acucia` | Explicados con palabras comunes sus sentidos de prisa, cuidado y deseo intenso. [DLE](https://dle.rae.es/acucia) |
| ES | `acuciosidad` | Sustituida la fórmula circular por una explicación directa de cuidado y rapidez. [DLE](https://dle.rae.es/acuciosidad) |
| ES | `acucioso` | Simplificados sus dos sentidos; se cambió «diligente» por «cuidadoso» en el primer sinónimo. [DLE](https://dle.rae.es/acucioso) |
| ES | `acuicultura` | Explicado como cría de animales y plantas acuáticos y como las técnicas para hacerlo. [DLE](https://dle.rae.es/acuicultura) |
| ES | `acumulable` | Explicado en el contexto del ejemplo: algo que puede sumarse a otras ayudas. [DLE](https://dle.rae.es/acumulable) |

## Lote 284

| Idioma | ID | Decisión |
|---|---|---|
| ES | `acuidad` | Explicados con palabras directas sus sentidos de filo, percepción e intensidad. [DLE](https://dle.rae.es/acuidad) |
| ES | `acultural` | Quitada la etiqueta gramatical; explicado como algo ajeno a una cultura o sin rasgos culturales. [DLE](https://dle.rae.es/acultural) |
| ES | `acuminado` | Cambiado «gradualmente» por «poco a poco» y simplificados ejemplo y sinónimo. [DLE](https://dle.rae.es/acuminado) |
| ES | `acuminoso` | Sustituida la etiqueta «desusado» por «palabra antigua»; el ejemplo ahora coincide con el primer sinónimo. [DLE](https://dle.rae.es/acuminoso) |
| ES | `acuosidad` | Quitadas la etiqueta gramatical, la explicación circular y el sinónimo en inglés. [DLE](https://dle.rae.es/acuosidad) |

## Lote 285

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abisal` | Explicados con palabras sencillas el sentido general y el uso para las zonas marinas profundas. [DLE](https://dle.rae.es/abisal) |
| ES | `acurado` | Quitada la etiqueta gramatical y explicado con palabras comunes; se conserva que es una palabra antigua. [DLE](https://dle.rae.es/acurado) |
| ES | `acusable` | Conservada la definición breve; sustituido el sinónimo técnico por una frase directa. [DLE](https://dle.rae.es/acusable) |
| ES | `acuto` | Sustituida la etiqueta «desusado» y simplificados los sentidos de punta y sonido. [DLE](https://dle.rae.es/acuto) |
| ES | `adahala` | Explicada como un extra añadido al precio o al sueldo; se indica que es una palabra antigua. [DLE](https://dle.rae.es/adahala), [adehala](https://dle.rae.es/adehala) |

## Lote 286

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adamadura` | Sustituida la etiqueta gramatical; explicadas sus ideas de feminidad y manera de comportarse. [DLE](https://dle.rae.es/adamadura), [Tesoro histórico](https://temporalweb.asale.org/tdhle/adamadura) |
| ES | `adamante` | Cambiada la etiqueta «desusado» por «palabra antigua». [DLE](https://dle.rae.es/adamante) |
| ES | `adanico` | Quitada la etiqueta gramatical y explicada la relación con Adán en palabras directas. [DLE](https://dle.rae.es/ad%C3%A1nico) |
| ES | `adanida` | Explicada como persona considerada descendiente de Adán; se mantiene su uso religioso. [DLE](https://dle.rae.es/adanida), [Tesoro histórico](https://temporalweb.asale.org/tdhle/adanida) |
| ES | `adaraga` | Explicada como variante antigua de «adarga»; simplificada la descripción del escudo. [Tesoro histórico de la RAE](https://temporalraeweb.rae.es/dhle/adarga), [DLE](https://dle.rae.es/adarga) |

## Lote 287

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adargama` | Explicada como harina muy fina; cambiado «desusado» por «palabra antigua». [DLE](https://dle.rae.es/ad%C3%A1rgama) |
| ES | `adefesio` | Simplificados sus sentidos de persona o cosa ridícula y de algo absurdo. [DLE](https://dle.rae.es/adefesio) |
| ES | `adefina` | Resumidos los sentidos de guiso y recipiente; explicado el uso antiguo. [DLE](https://dle.rae.es/adefina) |
| ES | `adehala` | Explicados los extras que se añaden al precio o al sueldo. [DLE](https://dle.rae.es/adehala) |
| ES | `adelantador` | Quitadas las etiquetas gramaticales y expresado de forma directa que algo avanza o hace avanzar. [DLE](https://dle.rae.es/adelantador) |

## Lote 288

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adelfico` | Simplificada la explicación de los estambres unidos; se conserva el sentido botánico histórico. [DLE](https://dle.rae.es/ad%C3%A9lfico), [Tesoro histórico](https://temporalweb.asale.org/tdhle/adelfia) |
| ES | `adelfo` | Explicados con palabras comunes los estambres unidos por sus hilos; se conserva el sentido histórico. [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/adelfo) |
| ES | `adelgazador` | Separados sus sentidos de ayuda para adelgazar y producto que diluye pintura. [DLE](https://dle.rae.es/adelgazador), [diluyente](https://temporalweb.asale.org/diccionario-estudiante/diluyente) |
| ES | `adelinar` | Quitada la etiqueta técnica; explicados los sentidos de aliñar, arreglar y corregir. [DLE](https://dle.rae.es/adeli%C3%B1ar) |
| ES | `adelino` | Sustituida la explicación circular por «arreglo o aliño»; se indica que es una palabra antigua. [DLE, 23.ª edición](https://dle.rae.es/docs/DLE-Edici%C3%B3n-del-Tricentenario.pdf) |

## Lote 289

| Idioma | ID | Decisión |
|---|---|---|
| ES | `ademan` | Quitada la etiqueta gramatical y explicado el gesto con una frase directa. [DLE](https://dle.rae.es/adem%C3%A1n) |
| ES | `ademar` | Explicado como poner soportes en una mina; el ejemplo usa un sinónimo claro. [DLE](https://dle.rae.es/ademar) |
| ES | `adempribio` | Resumido como pasto comunal compartido por pueblos de Aragón. [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/adempribio) |
| ES | `ademprio` | Simplificada la definición del terreno comunal de pastos en Aragón. [DLE](https://dle.rae.es/ademprio) |
| ES | `adenda` | Quitadas las etiquetas gramaticales y la repetición; ajustado el ejemplo al primer sinónimo. [DLE](https://dle.rae.es/adenda) |

## Lote 290

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adenoideo` | Explicado con palabras directas como relativo al tejido situado detrás de la nariz. [DLE](https://dle.rae.es/adenoideo) |
| ES | `adenopatico` | Simplificada la referencia médica a ganglios hinchados o con cambios. [DLE](https://dle.rae.es/adenop%C3%A1tico) |
| ES | `adenoso` | Quitada la etiqueta gramatical y explicado su sentido con glándulas; se indica que es palabra antigua. [DLE](https://dle.rae.es/adenoso) |
| ES | `adensar` | Revisadas y conservadas sus dos definiciones breves; el ejemplo muestra cómo se espesa el aceite. [DLE](https://dle.rae.es/adensar) |
| ES | `adentellar` | Conservada la definición sencilla de «morder» y cambiado el ejemplo por una situación cotidiana. [DLE](https://dle.rae.es/adentellar) |

## Lote 291

| Idioma | ID | Decisión |
|---|---|---|
| ES | `aderra` | Explicada como cuerda para prensar aceitunas y señalada como palabra antigua. [Nota académica de la RAE](https://revistas.rae.es/bilrae/article/view/285/711) |
| ES | `adestrar` | Cambiada la etiqueta gramatical por una explicación directa; se indica que se usa poco. [DLE](https://dle.rae.es/adestrar), [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/adestrar) |
| ES | `adestria` | Simplificada como habilidad y señalada como palabra poco usada. |
| ES | `adherecer` | Explicado como pegarse; se indica que es una palabra antigua. [DLE](https://dle.rae.es/adherecer) |
| ES | `adherente` | Resumidos sus sentidos de algo que pega y de persona que apoya una idea. [DLE](https://dle.rae.es/adherente) |

## Lote 292

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adherir` | Separados con frases breves los sentidos de pegarse a algo y apoyar una idea. [DLE](https://dle.rae.es/adherir) |
| ES | `adhesividad` | Quitada la etiqueta gramatical y explicada como capacidad para pegarse. [DLE](https://dle.rae.es/adhesividad) |
| ES | `adhortar` | Simplificada como pedir o animar; se indica que es una palabra antigua. [DLE](https://dle.rae.es/adhortar) |
| ES | `adiafa` | Explicada como regalo o comida que recibían los marineros en el puerto. [DLE](https://dle.rae.es/adiafa) |
| ES | `adiano` | Explicado como algo muy bueno o valioso; se indica que es palabra antigua. [DLE](https://dle.rae.es/adiano) |

## Lote 293

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adiar` | Explicado como elegir fecha; se conserva que es una palabra poco usada. [DLE](https://dle.rae.es/adiar) |
| ES | `adicionador` | Quitada la etiqueta gramatical y aclarado el uso como sustancia que se añade. [DLE](https://dle.rae.es/adicionador) |
| ES | `adicionar` | Quitada la etiqueta gramatical y resumido como añadir algo a un grupo o escrito. [DLE](https://dle.rae.es/adicionar) |
| ES | `adinamia` | Sustituida la etiqueta médica por una explicación directa de la debilidad muscular. [DLE](https://dle.rae.es/adinamia) |
| ES | `adinerarse` | Explicado con palabras comunes como hacerse rico o tener más dinero. [DLE](https://dle.rae.es/adinerado) |

## Lote 294

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adiposidad` | Quitada la etiqueta gramatical y sustituido «tejido adiposo» por «grasa». [DLE](https://dle.rae.es/adiposidad) |
| ES | `adiposis` | Simplificada la definición de acumulación excesiva de grasa; ajustado el ejemplo al primer sinónimo. [DLE](https://dle.rae.es/adiposis) |
| ES | `aditamento` | Quitada la etiqueta gramatical y resumido como cosa añadida a otra. [DLE](https://dle.rae.es/aditamento) |
| ES | `aditicio` | Definición directa según la acepción «que añade»; ajustado el ejemplo. [DLE](https://dle.rae.es/aditicio) |
| ES | `adivinaja` | Simplificada como adivinanza; corregida la marca de uso a «palabra coloquial». [DLE](https://dle.rae.es/adivinaja) |

## Lote 295

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adjetivar` | Reducida la explicación a los usos de aplicar adjetivos y convertir una palabra en adjetivo. [DLE](https://dle.rae.es/adjetivar) |
| ES | `adjuntar` | Definido directamente como enviar algo junto con un escrito o mensaje. [DLE](https://dle.rae.es/adjuntar) |
| ES | `adjuntia` | Simplificada como puesto de profesor o profesora adjunta. [DLE](https://dle.rae.es/adjunt%C3%ADa) |
| ES | `adjurable` | Sustituida la explicación técnica y conservado su uso antiguo con palabras sencillas. [DLE](https://dle.rae.es/adjurable) |
| ES | `adjurador` | Explicado como quien hace un conjuro para expulsar un espíritu; se conserva que es una palabra antigua. [DLE](https://dle.rae.es/adjurador) |

## Lote 296

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adjurar` | Corregido el significado según el DLE y explicado como pedir algo con insistencia; se conserva que es una palabra antigua. [DLE](https://dle.rae.es/adjurar) |
| ES | `adjutor` | Quitada la marca de desuso que no aparece en el DLE actual y simplificada la definición. [DLE](https://dle.rae.es/adjutor) |
| ES | `adlatere` | Simplificada la definición y conservado el sentido despectivo. [DLE](https://dle.rae.es/adl%C3%A1tere) |
| ES | `adminicular` | Simplificada la definición y mantenido su uso sobre todo jurídico. [DLE](https://dle.rae.es/adminicular) |
| ES | `adminiculo` | Resumidos sus dos sentidos: ayuda y objeto que se lleva por si hace falta. [DLE](https://dle.rae.es/admin%C3%ADculo) |

## Lote 297

| Idioma | ID | Decisión |
|---|---|---|
| ES | `admirativo` | Quitada la explicación gramatical, simplificados los sinónimos y definida directamente. [DLE](https://dle.rae.es/admirativo) |
| ES | `admixtion` | Reducida la definición a «mezcla», simplificados los sinónimos y conservado que es una palabra antigua. [DLE](https://dle.rae.es/admixti%C3%B3n) |
| ES | `admonitor` | Simplificada la definición y los sinónimos; conservado el uso religioso. [DLE](https://dle.rae.es/admonitor) |
| ES | `adobador` | Explicados con palabras sencillas sus usos y sinónimos para alimentos, pieles y otros objetos. [DLE](https://dle.rae.es/adobador) |
| ES | `adobar` | Resumidos sus usos y sinónimos para sazonar alimentos, preparar pieles y arreglar algo. [DLE](https://dle.rae.es/adobar) |

## Lote 298

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adocenado` | Simplificadas sus dos acepciones; actualizado el primer sinónimo y su ejemplo. [DLE](https://dle.rae.es/adocenado) |
| ES | `adocenar` | Definido directamente como agrupar cosas de doce en doce; ajustado el ejemplo. [DLE](https://dle.rae.es/adocenar) |
| ES | `adocilar` | Simplificada la definición y conservado el uso rural de Valladolid según fuentes históricas de la RAE. [Tesoro histórico de la RAE](https://temporalweb.asale.org/tdhle/adocilar) |
| ES | `adoctrinador` | Sustituida la explicación abstracta por una descripción directa y ejemplos claros. [DLE](https://dle.rae.es/adoctrinador) |
| ES | `adoctrinar` | Explicado con palabras comunes y actualizado el ejemplo para que muestre el significado. [DLE](https://dle.rae.es/adoctrinar) |

## Lote 299

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adolecer` | Resumidos sus usos actuales y antiguo; simplificado el ejemplo con la falta de financiación. [DLE](https://dle.rae.es/adolecer) |
| ES | `adoleciente` | Explicado con palabras sencillas a partir de los sentidos de enfermedad, defecto y carencia. [DLE](https://dle.rae.es/adoleciente) |
| ES | `adolorado` | Sustituida la explicación por «que siente dolor» y alineado el ejemplo con «dolorido». [DLE](https://dle.rae.es/adolorado) |
| ES | `adolorar` | Simplificado como entristecer o causar pesar; conservado que se usa poco. [DLE](https://dle.rae.es/adolorar) |
| ES | `adonado` | Explicado con palabras comunes y conservado que es una palabra antigua. [DLE](https://dle.rae.es/adonado) |

## Lote 300

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adonarse` | Simplificada la definición y conservado que es una palabra antigua. [DLE](https://dle.rae.es/adonarse) |
| ES | `adonecer` | Explicado como aumentar o crecer; conservado su uso regional. [DLE](https://dle.rae.es/adonecer) |
| ES | `adonico` | Explicado como algo relativo al adonio, con una descripción breve del verso. [DLE](https://dle.rae.es/ad%C3%B3nico) |
| ES | `adonio` | Simplificado como verso de cinco sílabas; añadido un sinónimo descriptivo. [DLE](https://dle.rae.es/adonio) |
| ES | `adonizarse` | Simplificada la definición y cambiado el primer sinónimo para alinearlo con el ejemplo. [DLE](https://dle.rae.es/adonizarse) |

## Lote 301

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adopcionismo` | Simplificada la explicación de la doctrina y actualizado el ejemplo. [DLE](https://dle.rae.es/adopcionismo) |
| ES | `adoptante` | Definido directamente y actualizado el ejemplo para mostrar a una persona adoptante. [DLE](https://dle.rae.es/adoptante) |
| ES | `adoquinado` | Explicados sus usos como adjetivo y sustantivo con palabras comunes; renovado el ejemplo. [DLE](https://dle.rae.es/adoquinado) |
| ES | `adoquinar` | Simplificada la definición como poner adoquines para pavimentar. [DLE](https://dle.rae.es/adoquinar) |
| ES | `ador` | Definido como el tiempo asignado para regar por turnos. [DLE](https://dle.rae.es/ador) |
## Lote 302

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adorador` | Simplificada la definición para incluir el sentido de culto y el de admiración. [DLE](https://dle.rae.es/adorador) |
| ES | `adorante` | Definido directamente como quien adora o rinde culto. [DLE](https://dle.rae.es/adorante) |
| ES | `adoratriz` | Explicado con palabras comunes y conservado el uso femenino. [DLE](https://dle.rae.es/adoratriz) |
| ES | `adormecedor` | Simplificadas sus ideas de causar sueño y reducir la sensibilidad. [DLE](https://dle.rae.es/adormecedor) |
| ES | `adormecer` | Simplificadas sus ideas de causar sueño, reducir sensibilidad y perder atención. [DLE](https://dle.rae.es/adormecer) |
## Lote 303

| Idioma | ID | Decisión |
|---|---|---|
| ES | `reoca` | Se explica directamente cuándo algo o alguien es «la reoca» y se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/reoca) |
| ES | `repanocha` | Se elimina la fórmula «expresión para decir» y se aclara el sentido positivo o negativo. [DLE](https://dle.rae.es/repanocha) |
| ES | `sanseacabo` | Se describe directamente su uso para dar un asunto por terminado. [DLE](https://dle.rae.es/sanseacab%C3%B3) |
| ES | `provincialismo` | Se sustituye la explicación metalingüística por una definición directa y se conserva el ejemplo regional. [DLE](https://dle.rae.es/provincialismo) |
| ES | `tragala` | Se aclaran con palabras comunes los sentidos de canción política histórica e imposición. [DLE](https://dle.rae.es/tr%C3%A1gala) |
## Lote 304

| Idioma | ID | Decisión |
|---|---|---|
| ES | `armoniaco` | Se elimina «otra forma de decir» y se conserva que es un nombre antiguo del amoniaco. [DLE](https://dle.rae.es/armoniaco) |
| ES | `bufonada` | Se sustituye la explicación metalingüística por «broma o burla» y se rehace el ejemplo. [DLE](https://dle.rae.es/bufonada) |
| ES | `concuno` | Se explica la relación con «concuñado» y se mantiene su uso regional. [DLE](https://dle.rae.es/concu%C3%B1o) |
| ES | `te-veo-mensaje` | Se define el propósito del mensaje con palabras directas y se conserva el ejemplo del chat. |
| ES | `erasmiano` | Se explica la pronunciación del griego antiguo con frases cortas y se actualiza el ejemplo. [DLE](https://dle.rae.es/erasmiano) |
## Lote 305

| Idioma | ID | Decisión |
|---|---|---|
| ES | `chinchoso` | Se elimina «en uso coloquial» y se define directamente como «Que molesta y resulta pesado»; el ejemplo usa el sinónimo en la misma situación. [DLE](https://dle.rae.es/chinchoso) |

## Lote 306

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cacarear` | Se definen directamente sus dos sentidos y se conserva un ejemplo breve con el sinónimo exacto del canto del gallo. [DLE](https://dle.rae.es/cacarear) |

## Lote 307

| Idioma | ID | Decisión |
|---|---|---|
| ES | `timo` | Se conserva como entrada de anatomía: el DLE distingue la glándula de otras palabras homónimas. Se acorta la explicación y se sustituye el ejemplo metalingüístico por uno de cocina. [DLE](https://dle.rae.es/timo) |
| ES | `tojarra` | Se elimina la exclusión por fauna o flora: el DLE la define como un tronco hueco donde anidan abejas. Se explica directamente y se crea un ejemplo. [DLE](https://dle.rae.es/tojarra), [tojo](https://dle.rae.es/tojo) |

## Lote 308

| Idioma | ID | Decisión |
|---|---|---|
| ES | `morro-7` | Se cambia «en sentido coloquial» por una nota sencilla de uso informal. Se sustituye «labios gruesos» por «labios» para que el sinónimo y el ejemplo sean naturales. [DLE](https://dle.rae.es/morro) |
| ES | `morro-8` | Se define directamente el descaro y se expresa el registro con «Es un uso informal». [DLE](https://dle.rae.es/morro) |
| ES | `moscardon-2` | Se elimina la etiqueta metalingüística y se explica directamente por qué molesta la persona. Se conserva la nota de uso informal. [DLE](https://dle.rae.es/moscard%C3%B3n) |
| ES | `moscon-2` | Se define directamente a la persona que molesta e insiste; el registro se expresa con palabras sencillas. [DLE](https://dle.rae.es/mosc%C3%B3n) |

## Lote 309

| Idioma | ID | Decisión |
|---|---|---|
| ES | `berzotas` | Se explica directamente como insulto informal y se alinea el primer sinónimo con la frase del ejemplo. [DLE](https://dle.rae.es/berzotas) |
| ES | `cambalachear` | Se cambia la etiqueta gramatical y la definición circular por «Hacer trueques de algo». Se reescribe el ejemplo con el primer sinónimo. [DLE](https://dle.rae.es/cambalachear) |
| ES | `cambalachero` | Se reemplaza la descripción gramatical por «Persona que hace trueques» y se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/cambalachero) |

## Lote 310

| Idioma | ID | Decisión |
|---|---|---|
| ES | `candajon` | Se explica directamente que la persona va de casa en casa; se conserva el uso informal con una nota sencilla y se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/candaj%C3%B3n), [corretear](https://dle.rae.es/corretear) |
| ES | `cansio` | Se elimina la etiqueta gramatical y se explica el significado con una referencia directa a Salamanca. [DLE](https://dle.rae.es/cans%C3%ADo) |
| ES | `cantoneo` | Se cambia «contoneo» y la explicación gramatical por una descripción directa; se conserva el registro informal con palabras sencillas. [DLE](https://dle.rae.es/cantoneo) |
| ES | `carpinterear` | Se cambia la etiqueta gramatical por una explicación directa y se conserva el uso regional; se ajustan el sinónimo y el ejemplo. [DLE](https://dle.rae.es/carpinterear) |

## Lote 311

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cachondear` | Se sustituye la etiqueta gramatical por una explicación directa y se conservan tanto el sentido informal como el uso de México; se alinea el ejemplo con el primer sinónimo. [DLE](https://dle.rae.es/cachondear) |
| ES | `cerracatin` | Se retira la etiqueta gramatical y se explica «tacaño» con palabras cotidianas. [DLE](https://dle.rae.es/cerracat%C3%ADn) |
| ES | `chacharon` | Se cambia la etiqueta gramatical por «persona que habla mucho» y una nota sencilla de uso informal. [DLE](https://dle.rae.es/chachar%C3%B3n), [chacharero](https://dle.rae.es/chacharero) |
| ES | `comadrear` | Se sustituye la etiqueta gramatical por una explicación directa y se conservan sus sentidos regionales; se simplifican los sinónimos y el ejemplo. [DLE](https://dle.rae.es/comadrear) |

## Lote 312

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comadreo` | Se define directamente como una conversación informal y se cambian el ejemplo y el primer sinónimo. [DLE](https://dle.rae.es/comadreo) |
| ES | `comiqueria` | Se explica como un grupo de cómicos con palabras sencillas; se reemplaza el ejemplo histórico por una situación actual. [DLE](https://dle.rae.es/comiquer%C3%ADa) |
| ES | `conteston` | Se sustituye la explicación gramatical por una descripción directa y se simplifica el ejemplo. [DLE](https://dle.rae.es/contest%C3%B3n) |
| ES | `copion` | Se elimina la etiqueta gramatical y se aclara el sentido y el tono de la palabra. [DLE](https://dle.rae.es/copi%C3%B3n) |

## Lote 313

| Idioma | ID | Decisión |
|---|---|---|
| ES | `corajina` | Se explica directamente como un enojo repentino e intenso; se alinea el ejemplo con un sinónimo más claro. [DLE](https://dle.rae.es/corajina) |
| ES | `corcusido` | Se conserva la idea de una costura mal hecha y se quita la etiqueta gramatical. [DLE](https://dle.rae.es/corcusido) |
| ES | `corcusir` | Se explica directamente cómo se cose la ropa; se simplifica el sinónimo y se ajusta el ejemplo. [DLE](https://dle.rae.es/corcusir) |
| ES | `corpachon` | Se cambia la explicación gramatical por «cuerpo muy grande» y se conserva la nota de uso informal. [DLE](https://dle.rae.es/corpach%C3%B3n) |
## Lote 314

| Idioma | ID | Decisión |
|---|---|---|
| ES | `correveidile` | Se explica directamente qué hace, se conserva el otro sentido y se indica que es una palabra informal. [DLE](https://dle.rae.es/correveidile), [alcahuete](https://dle.rae.es/alcahuete) |
| ES | `cosicosa` | Se define como acertijo, se marca su uso informal con palabras sencillas y se pone «acertijo» primero entre los sinónimos. [DLE](https://dle.rae.es/cosicosa) |
| ES | `critiqueo` | Se elimina la etiqueta gramatical y se explica como una conversación con comentarios negativos. [DLE](https://dle.rae.es/critiqueo), [criticar](https://dle.rae.es/criticar) |
| ES | `curda` | Se explican con frases sencillas los sentidos de persona borracha y borrachera, y se indica que es informal. [DLE](https://dle.rae.es/curda) |

## Lote 315

| Idioma | ID | Decisión |
|---|---|---|
| ES | `curre` | Se explica directamente como trabajo o acción de trabajar y se expresa su uso informal con palabras sencillas. [DLE](https://dle.rae.es/curre) |
| ES | `currelar` | Se explica directamente como trabajar y se conserva en lenguaje sencillo que es una palabra informal de España. [DLE](https://dle.rae.es/currelar), [currar](https://dle.rae.es/currar) |
| ES | `cusir` | Se explica que es coser mal, se mejora el ejemplo y se alinea con «mal cosido». [DLE](https://dle.rae.es/cusir), [corcusir](https://dle.rae.es/corcusir) |
| ES | `cuzo` | Se explica la conducta con una frase directa y se conserva la zona donde se usa. [DLE](https://dle.rae.es/cuzo) |
## Lote 316

| Idioma | ID | Decisión |
|---|---|---|
| ES | `derrenegar` | Se explica como «odiar mucho» y se cambia el ejemplo para que suene natural con el sinónimo. [DLE](https://dle.rae.es/derrenegar) |
| ES | `desbeber` | Se cambia la explicación médica por «hacer pis» y se alinea el ejemplo. [DLE](https://dle.rae.es/desbeber) |
| ES | `descomer` | Se cambia la explicación técnica por «hacer caca» y se crea un ejemplo cotidiano. [DLE](https://dle.rae.es/descomer) |
| ES | `dicharachero-2` | Se explica directamente qué suele decir la persona y se expresa su uso informal con palabras sencillas. [DLE](https://dle.rae.es/dicharachero) |
## Lote 317

| Idioma | ID | Decisión |
|---|---|---|
| ES | `dicharacho` | Se define como una frase grosera y se conserva la nota de uso informal con palabras sencillas. [DLE](https://dle.rae.es/dicharacho) |
| ES | `dificultoso-3` | Se explica directamente el uso referido a una cara o figura de aspecto raro. [DLE](https://dle.rae.es/dificultoso) |
| ES | `dolorosa-bill` | Se define como una cuenta y se explica que se dice en broma. [DLE](https://dle.rae.es/doloroso) |
| ES | `empapelar-expediente` | Se explica como iniciar un caso oficial y se alinea el ejemplo con ese sinónimo sencillo. [DLE](https://dle.rae.es/empapelar) |
## Lote 318

| Idioma | ID | Decisión |
|---|---|---|
| ES | `empapelar-proceso` | Se explica como empezar un juicio y se sustituye el sinónimo jurídico por una frase más clara. [DLE](https://dle.rae.es/empapelar) |
| ES | `empaquetar-multar` | Se cambia la fórmula metalingüística por una explicación directa de la multa o el castigo. [DLE](https://dle.rae.es/empaquetar) |
| ES | `emparrado-hairstyle` | Se explica el peinado con palabras sencillas y se conserva que el término es informal. [DLE](https://dle.rae.es/emparrado) |
| ES | `empelotarse-tangle` | Se cambia «riña» por «pelea» y se explica directamente la expresión. [DLE](https://dle.rae.es/empelotarse) |
## Lote 319

| Idioma | ID | Decisión |
|---|---|---|
| ES | `empelotarse-undress` | Se define como desnudarse o quedarse sin ropa y se conserva dónde se usa. [DLE](https://dle.rae.es/empelotarse) |
| ES | `empinar-beber` | Se explica directamente como beber mucho, especialmente vino, y se indica que es informal. [DLE](https://dle.rae.es/empinar) |
| ES | `empingorotar-adornar` | Se explica como adornar demasiado y se conserva el tono de desprecio con palabras sencillas. [DLE](https://dle.rae.es/empingorotar) |
| ES | `empollar-estudiar` | Se define como estudiar mucho una materia o lección y se indica que es informal. [DLE](https://dle.rae.es/empollar) |
## Lote 320

| Idioma | ID | Decisión |
|---|---|---|
| ES | `enjaretar` | Se explica como hacer o decir algo deprisa y sin orden; se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/enjaretar) |
| ES | `enzalamar` | Se cambia la etiqueta gramatical por una explicación directa y un sinónimo sencillo. [DLE](https://dle.rae.es/enzalamar) |
| ES | `escamonearse` | Se define directamente como empezar a desconfiar y se expresa el uso informal con claridad. [DLE](https://dle.rae.es/escamonearse) |
| ES | `estirajar` | Se define como estirar hasta deformar y se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/estirajar) |
## Lote 321

| Idioma | ID | Decisión |
|---|---|---|
| ES | `estirajon` | Se explica como un tirón brusco; se conserva la marca de uso informal con palabras sencillas. [DLE](https://dle.rae.es/estiraj%C3%B3n), [estirón](https://dle.rae.es/estir%C3%B3n) |
| ES | `estirazar` | Se define directamente como estirar algo y se alinea el ejemplo con el primer sinónimo. [DLE](https://dle.rae.es/estirazar) |
| ES | `fachoso` | Se explica el sentido mostrado por el ejemplo como tener mal aspecto o parecer ridículo; se conserva la marca de uso informal en lenguaje sencillo. [DLE](https://dle.rae.es/fachoso) |
| ES | `falton` | Se define directamente como no cumplir las obligaciones, promesas o citas; se usa «incumplidor» como primer sinónimo y en el ejemplo. [DLE](https://dle.rae.es/falt%C3%B3n) |

## Lote 322

| Idioma | ID | Decisión |
|---|---|---|
| ES | `fantasmada` | Se define como una afirmación o acción exagerada para presumir; se reemplaza la etiqueta «coloquial» por una nota sencilla de uso. [DLE](https://dle.rae.es/fantasmada) |
| ES | `farandulear` | Se explica directamente como presumir o intentar llamar la atención; se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/farandulear) |
| ES | `fardar` | Se define directamente como presumir y se conserva en lenguaje sencillo la marca regional y de uso. [DLE](https://dle.rae.es/fardar) |
| ES | `feten` | Se mantiene la definición sencilla y se cambia «habla coloquial» por «conversaciones informales». [DLE](https://dle.rae.es/fet%C3%A9n) |

## Lote 323

| Idioma | ID | Decisión |
|---|---|---|
| ES | `fijon` | Se explica directamente como alguien que se fija en los detalles y se conserva que el uso es informal en Cuba y México. [DLE](https://dle.rae.es/fij%C3%B3n) |
| ES | `gansear` | Se reemplaza «gansadas» por «tonterías» y se expresa el registro con palabras sencillas. [DLE](https://dle.rae.es/gansear) |
| ES | `jeremias` | Se define como una persona que se lamenta continuamente; se retira la explicación sobre el origen bíblico y se alinea el ejemplo con «llorica». [DLE](https://dle.rae.es/jerem%C3%ADas) |
| ES | `jumera` | Se define directamente como borrachera y se cambia la etiqueta «coloquial» por una nota sencilla de uso. [DLE](https://dle.rae.es/jumera) |

## Lote 324

| Idioma | ID | Decisión |
|---|---|---|
| ES | `lacha` | Se define directamente como vergüenza y se sustituye la etiqueta «coloquial» por una nota sencilla. [DLE](https://dle.rae.es/lacha) |
| ES | `lagarton` | Se explica «taimado» con palabras más comunes y se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/lagart%C3%B3n) |
| ES | `lelo` | Se cambia «aturdido» y «espabilado» por palabras más conocidas; se conserva la marca de uso. [DLE](https://dle.rae.es/lelo) |
| ES | `lesear` | Se conserva el sentido y la marca regional de Chile, con una explicación directa y sencilla. [DLE](https://dle.rae.es/lesear) |

## Lote 325

| Idioma | ID | Decisión |
|---|---|---|
| ES | `maja` | Se define directamente como agradable o atractiva y se expresa el registro con palabras sencillas. [DLE](https://dle.rae.es/majo) |
| ES | `majo` | Se define directamente y se conserva que es un uso informal de España; se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/majo) |
| ES | `malasombra` | Se define directamente como alguien que tiene malas intenciones y se reemplaza la etiqueta de registro por una nota sencilla. [DLE](https://dle.rae.es/malasombra) |
| ES | `mascujar` | Se explica «mascullar» con palabras más claras y se conserva que es informal. [DLE](https://dle.rae.es/mascujar) |

## Lote 326

| Idioma | ID | Decisión |
|---|---|---|
| ES | `manduca` | Se define directamente como comida y se cambia «habla informal» por una expresión más sencilla. [DLE](https://dle.rae.es/manduca) |
| ES | `mecachis` | Se explica como una palabra suave para expresar sorpresa o molestia y se aclara su uso informal. [DLE](https://dle.rae.es/mecachis) |
| ES | `melona` | Se reemplaza «necia» por «poco lista» y se expresa con claridad que es un insulto informal. [DLE](https://dle.rae.es/melona) |
| ES | `memo` | Se explica «poco juicio» con palabras más comunes y se conserva que es un insulto informal. [DLE](https://dle.rae.es/memo) |

## Lote 327

| Idioma | ID | Decisión |
|---|---|---|
| ES | `molon-3` | Se explica directamente como algo que gusta o resulta atractivo, con una nota sencilla de uso. [DLE](https://dle.rae.es/mol%C3%B3n) |
| ES | `momio-2` | Se cambia «cosa valiosa» por «algo valioso» y se conserva la idea de conseguirlo con poco dinero o esfuerzo. [DLE](https://dle.rae.es/momio) |
| ES | `morro-7` | Se revisa la ficha del lote 308 y se precisa que se refiere especialmente a labios grandes; se simplifica la nota de uso. [DLE](https://dle.rae.es/morro) |
| ES | `morro-8` | Se revisa la ficha del lote 308 y se aclara el significado con «descaro o atrevimiento». [DLE](https://dle.rae.es/morro) |

## Lote 328

| Idioma | ID | Decisión |
|---|---|---|
| ES | `palique` | Se define como una conversación sobre algo poco importante y se evita repetir «informal» en la explicación. [DLE](https://dle.rae.es/palique) |
| ES | `palmar-die` | Se define directamente como morir y se expresa el uso coloquial con palabras sencillas. [DLE](https://dle.rae.es/palmar) |
| ES | `palmar-lose` | Se explica directamente como perder en un juego o una apuesta, con una nota sencilla de uso. [DLE](https://dle.rae.es/palmar) |
| ES | `pampirolada-nonsense` | Se reemplazan «necedad» y «carece de importancia» por palabras más comunes; se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/pampirolada) |

## Lote 329

| Idioma | ID | Decisión |
|---|---|---|
| ES | `parida-2` | Se sustituye «sandez» por «tontería» y se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/parida) |
| ES | `parne` | Se explica directamente como dinero y se ordenan los sinónimos para que el primero coincida con el ejemplo. [DLE](https://dle.rae.es/parn%C3%A9) |
| ES | `pataleta` | Se conserva el sentido de disgusto o enfado y se simplifica la nota de uso. [DLE](https://dle.rae.es/pataleta) |
| ES | `patidifuso` | Se define como quedarse quieto por sorpresa y se sustituye «atónito» por «muy sorprendido» en el primer sinónimo y el ejemplo. [DLE](https://dle.rae.es/patidifuso) |

## Lote 330

| Idioma | ID | Decisión |
|---|---|---|
| ES | `patinar-5` | Se expresa directamente que puede significar perder eficacia o equivocarse, sin empezar con una etiqueta de uso. [DLE](https://dle.rae.es/patinar) |
| ES | `patinazo-2` | Se explica como un error importante y se sustituye «desacierto» por «error» en el primer sinónimo y el ejemplo. [DLE](https://dle.rae.es/patinazo) |
| ES | `patio-5` | Se define directamente como la situación o el estado de las cosas. [DLE](https://dle.rae.es/patio) |
| ES | `patitieso-2` | Se explica como quedarse muy sorprendido y se alinea el primer sinónimo sencillo con el ejemplo. [DLE](https://dle.rae.es/patitieso) |

## Lote 331

| Idioma | ID | Decisión |
|---|---|---|
| ES | `patada-2` | Se explica como una gestión o visita para conseguir algo y se conserva una nota sencilla de uso informal. [DLE](https://dle.rae.es/patada) |
| ES | `pataleta-2` | Se define la acepción de convulsión que parece fingida; se corrige el ejemplo para que la sustitución por «convulsión» conserve el sentido. [DLE](https://dle.rae.es/pataleta) |
| ES | `pateta` | Se explica directamente que significa «el diablo», con una nota sencilla de uso informal. [DLE](https://dle.rae.es/pateta) |
| ES | `pateta-2` | Se define como una persona con un problema en los pies o las piernas; se ajustan sinónimo y ejemplo a la acepción. [DLE](https://dle.rae.es/pateta) |

## Lote 332

| Idioma | ID | Decisión |
|---|---|---|
| ES | `paticojo` | Se define directamente como algo inestable o que cojea, y se cambia el ejemplo a un objeto inestable. [DLE](https://dle.rae.es/paticojo) |
| ES | `patitieso-3` | Se explica como caminar muy erguido para parecer importante; se alinea el primer sinónimo y el ejemplo. [DLE](https://dle.rae.es/patitieso) |
| ES | `patituerto-2` | Se expresa directamente que algo se desvía porque está torcido o mal hecho. [DLE](https://dle.rae.es/patituerto) |
| ES | `pechono` | Se conserva el uso boliviano y se explica como exagerar al practicar la religión; se actualiza la capa de rebase. [DLE](https://dle.rae.es/pecho%C3%B1o) |

## Lote 333

| Idioma | ID | Decisión |
|---|---|---|
| ES | `peladero-2` | Se sustituye la etiqueta metalingüística por una explicación directa y se simplifican sinónimo y ejemplo. [DLE](https://dle.rae.es/peladero) |
| ES | `pellejo-3` | Se define directamente como la piel de una persona, sin una nota de uso innecesaria. [DLE](https://dle.rae.es/pellejo) |
| ES | `peranton-3` | Se explica directamente que se refiere a una persona muy alta; se alinea el primer sinónimo. [DLE](https://dle.rae.es/perant%C3%B3n) |
| ES | `persignar-3` | Se expresan directamente los sentidos de sorpresa o escándalo y se conserva la nota de uso informal. [DLE](https://dle.rae.es/persignar) |

## Lote 334

| Idioma | ID | Decisión |
|---|---|---|
| ES | `persignar-4` | Se define directamente como empezar a vender y se alinea el ejemplo con el primer sinónimo. [DLE](https://dle.rae.es/persignar) |
| ES | `puntillon` | Se explica como un golpe con la punta del pie y se conserva la nota de uso informal. [DLE](https://dle.rae.es/puntill%C3%B3n) |
| ES | `perrillo-3` | Excluida: el sentido aparece solo en la locución completa «perrillo de todas bodas»; la ficha omite parte del lema. [DLE](https://dle.rae.es/perrillo) |
| ES | `pirla` | Excluida: el DLE recoge «pirla» como una peonza pequeña, no como un insulto a una persona. [DLE](https://dle.rae.es/pirla) |

## Lote 335

| Idioma | ID | Decisión |
|---|---|---|
| ES | `agramado` | Se explica directamente la acción de machacar lino o cáñamo y el sentido de golpe o tunda; se alinea el primer sinónimo. [DLE](https://dle.rae.es/agramado) [DLE](https://dle.rae.es/agramar) |
| ES | `ajamonarse` | Se sustituye la explicación metalingüística por «engordar después de la juventud» y se conserva la marca de uso informal. [DLE](https://dle.rae.es/ajamonarse) |
| ES | `alfenicarse` | Excluida: el DLE marca los sentidos como poco usado o desusado, fuera del uso actual del diccionario. [DLE](https://dle.rae.es/alfe%C3%B1icarse) |
| ES | `andorga` | Se define directamente como «vientre o tripa» y se conserva una nota sencilla de uso informal. [DLE](https://dle.rae.es/andorga) |

## Lote 336

| Idioma | ID | Decisión |
|---|---|---|
| ES | `adivinaja` | Se conserva la marca de uso informal con una nota sencilla: «Se usa en conversaciones informales». El DLE la define como «acertijo». [DLE](https://dle.rae.es/adivinaja) |
| ES | `calzonazos` | Se mantiene el sentido de hombre que se deja dominar o convencer por su pareja; se cambia «insulto coloquial» por «insulto informal». [DLE](https://dle.rae.es/calzonazos) |
| ES | `camandulero` | Se explican directamente la hipocresía y el engaño con palabras comunes; se ajusta el ejemplo para mostrar ese sentido. [DLE](https://dle.rae.es/camandulero) |
| ES | `cambalachar` | Se define directamente como intercambiar una cosa por otra y se quita el sentido de trato engañoso, que no respalda el DLE. [DLE](https://dle.rae.es/cambalachar) |

## Lote 337

| Idioma | ID | Decisión |
|---|---|---|
| ES | `caraba` | Se mantiene el sentido regional de «reunión festiva». Se aparta el significado de «ser la caraba», que el DLE registra como una locución. [DLE](https://dle.rae.es/caraba) |
| ES | `camelo` | Se explican con palabras comunes sus sentidos de noticia falsa, engaño, discurso sin sentido, burla y galanteo. [DLE](https://dle.rae.es/camelo) |
| ES | `caco` | Se conserva el sentido actual de «ladrón» y se retira de esta definición el sentido desusado de hombre tímido. [DLE](https://dle.rae.es/caco) |
| ES | `canonjia` | Se explica el cargo religioso y se conserva el sentido coloquial de empleo con poco trabajo y beneficio. [DLE](https://dle.rae.es/canonj%C3%ADa) |

## Lote 338

| Idioma | ID | Decisión |
|---|---|---|
| ES | `chorbo` | Se define directamente como «novio o novia» y se quita la condición de relación estable, que el DLE no incluye en este sentido. [DLE](https://dle.rae.es/chorbo) |
| ES | `canguis` | Se define directamente como «miedo» y se conserva la nota de uso informal. [DLE](https://dle.rae.es/canguis) |
| ES | `chorrocientos` | Se explica la cantidad con palabras comunes y se conserva la nota de uso en El Salvador y México. [DLE](https://dle.rae.es/chorrocientos) |
| ES | `curdela` | Se cambia «coloquial» por una nota sencilla de uso informal y se define directamente como «persona borracha». [DLE](https://dle.rae.es/curdela) |

## Lote 339

| Idioma | ID | Decisión |
|---|---|---|
| EN | `pill` | Se explica directamente como una dosis sólida de medicamento que se traga; se conserva «informally» porque aclara el uso de «tablet» o «capsule». [Cambridge](https://dictionary.cambridge.org/us/dictionary/english/pill) |
| EN | `ripoff` | Se sustituyen las etiquetas de uso por sus sentidos directos: trato o precio injusto, estafa o copia. Se ajustan los sinónimos y el ejemplo para mostrar el primer sentido. [Cambridge](https://dictionary.cambridge.org/dictionary/english/rip-off) |
| EN | `snoop` | Se explica directamente la búsqueda secreta de información y se conserva en una frase breve que suele referirse a asuntos privados y sonar desaprobatoria. [Cambridge](https://dictionary.cambridge.org/us/dictionary/learner-english/snoop) |
| EN | `keto` | Se quita la etiqueta «informal» y se explica directamente la dieta con pocos carbohidratos y más grasa; se ajusta el sinónimo del ejemplo. [Cambridge](https://dictionary.cambridge.org/dictionary/english/keto-diet) |

## Lote 340

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cachivache` | Se explican directamente sus sentidos de objeto y utensilio; el sentido antiguo de insulto se mantiene con palabras sencillas. [DLE](https://dle.rae.es/cachivache) |
| ES | `cambalache` | Se explican directamente el acuerdo poco claro y el intercambio de poco valor; se cambia el ejemplo al sentido de acuerdo y se ajusta el primer sinónimo. [DLE](https://dle.rae.es/cambalache) |
| ES | `camandula` | Se cambia «en uso coloquial» por una explicación directa de la hipocresía, la astucia y la persona poco fiable. El ejemplo muestra el primer sentido. [DLE](https://dle.rae.es/cam%C3%A1ndula) |
| ES | `camelador` | Se sustituye la etiqueta «adjetivo o sustantivo coloquial» por una explicación directa; el ejemplo conserva los halagos y coincide con el primer sinónimo. [DLE](https://dle.rae.es/camelador) |

## Lote 341

| Idioma | ID | Decisión |
|---|---|---|
| ES | `bailongo` | Se explican directamente sus dos sentidos: una persona aficionada al baile y un baile popular y alegre. El ejemplo muestra el primer sentido. [DLE](https://dle.rae.es/bailongo) |
| ES | `castanazo` | Se quita la etiqueta «coloquial» y se define directamente como golpe fuerte o puñetazo. El ejemplo usa «porrazo», que encaja con la caída. [DLE](https://dle.rae.es/casta%C3%B1azo) |
| ES | `cegato` | Se define directamente como alguien que ve poco. Se conserva en una frase sencilla que puede sonar ofensivo y se alinea el ejemplo con «corto de vista». [DLE](https://dle.rae.es/cegato) |
| ES | `chisgarabis` | Se cambia la etiqueta «coloquial» por una explicación directa de «poca seriedad» y «poca importancia». Se añade un sinónimo sencillo y se adapta el ejemplo. [DLE](https://dle.rae.es/chisgarab%C3%ADs) |

## Lote 342

| Idioma | ID | Decisión |
|---|---|---|
| ES | `casposo` | Se explican directamente sus sentidos literal y figurado; se conserva el uso negativo en España y se adapta el ejemplo al primer sinónimo. [DLE](https://dle.rae.es/casposo) |
| ES | `chorar` | Se define directamente como robar; se conserva en una frase sencilla que es una palabra informal y puede referirse a robar con habilidad. El ejemplo usa «robar». [DLE](https://dle.rae.es/chorar) |
| ES | `chorizar` | Se cambia la etiqueta «verbo coloquial o de germanía» por una definición directa y una nota sencilla de uso informal. Se conserva el ejemplo con «robar». [DLE](https://dle.rae.es/chorizar) |
| ES | `chupoptero` | Se explican directamente el aprovechamiento de otras personas y el sueldo cobrado sin trabajar. Se conserva que se usa como insulto y se ajusta el ejemplo. [DLE](https://dle.rae.es/chup%C3%B3ptero) |

## Lote 343

| Idioma | ID | Decisión |
|---|---|---|
| ES | `chirimbolo` | Se explican directamente sus sentidos de objeto extraño, redondo y de utensilio o cosa parecida; se conserva el ejemplo con «cacharro». [DLE](https://dle.rae.es/chirimbolo) |
| ES | `chiquilicuatre` | Se cambia la etiqueta «coloquial» por una explicación directa de la persona que arma líos, no piensa antes de actuar o es poco seria. Se añade un sinónimo sencillo y se adapta el ejemplo. [DLE](https://dle.rae.es/chiquilicuatre) |
| ES | `chupacirios` | Se define directamente a la persona muy religiosa que va mucho a la iglesia. Se conserva en lenguaje sencillo que se usa como insulto. [DLE](https://dle.rae.es/chupacirios) |
| ES | `chamar` | Se cambia «entre chamarileros» y «mediante trueque» por una explicación directa del intercambio y una nota sencilla sobre su uso poco frecuente. [DLE](https://dle.rae.es/chamar) |

## Lote 344

| Idioma | ID | Decisión |
|---|---|---|
| ES | `casquivano` | Se explican directamente sus sentidos: actuar sin pensar o cambiar de opinión, y coquetear o tener relaciones breves. Se simplifican los sinónimos y se corrige su ejemplo. [DLE](https://dle.rae.es/casquivano) |
| ES | `cerril` | Se conservan los sentidos de terreno áspero, animal sin domar y persona terca o grosera. Se separan en dos frases y se alinea el ejemplo con «áspero». [DLE](https://dle.rae.es/cerril) |
| ES | `chufletero` | Se sustituye la etiqueta «coloquial» por una explicación directa y se acorta el ejemplo. [DLE](https://dle.rae.es/chufletero) |
| ES | `chirlador` | Se explica directamente cómo habla la persona. «Hoy se usa poco» conserva con palabras sencillas la marca de uso desusado. [DLE](https://dle.rae.es/chirlador) |

## Lote 345

| Idioma | ID | Decisión |
|---|---|---|
| ES | `chirlear` | Se sustituye «dicho de un pájaro» por una explicación directa. El ejemplo conserva el sentido de emitir chillidos. [DLE](https://dle.rae.es/chirlear) |
| ES | `chochear` | Se explica directamente el sentido relacionado con la edad y se conserva el uso informal y el sentido de mostrar mucho cariño. El ejemplo corresponde a este último. [DLE](https://dle.rae.es/chochear) |
| ES | `chulear` | Se conserva que decir piropos es un uso de algunos países y se explican también los sentidos de burlarse, presumir y aprovecharse. [DLE](https://dle.rae.es/chulear) |
| ES | `chivar` | Se sustituye «verbo coloquial» por sentidos directos y se conserva el uso canario. El ejemplo anterior describía sudar, un sentido regional argentino que no estaba en la definición; se alinea ahora con «delatar». [DLE](https://dle.rae.es/chivar) |

## Lote 346

| Idioma | ID | Decisión |
|---|---|---|
| ES | `chochera` | Se cambia la definición circular por una explicación directa y se conserva con palabras sencillas que es informal. El ejemplo y el sinónimo se alinean con la pérdida de claridad mental por la edad. [DLE](https://dle.rae.es/chochera) |
| ES | `chocolateado` | Se elimina «dicho de una cosa» y se explica directamente que tiene chocolate. [DLE](https://dle.rae.es/chocolateado) |
| ES | `chozpar` | Se elimina la etiqueta «verbo intransitivo, dicho de» y se explica directamente qué hace el animal. [DLE](https://dle.rae.es/chozpar) |
| ES | `chulada` | Se simplifica la acepción activa de cosa bonita y su ejemplo. La acepción de belleza personal en Guatemala y México sigue excluida como `chulada-personal-beauty`; no se cuenta como activa. [DLE](https://dle.rae.es/chulada) |
| ES | `chulada-indecent-action` | Se simplifica «acción indecorosa» y se reemplaza «canallada» por «mala acción». Esta es otra ficha activa de «chulada», distinta de la acepción excluida de belleza personal. [DLE](https://dle.rae.es/chulada) |

## Lote 347

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cibelina` | Se cambia la etiqueta «dicho de» por una explicación breve del animal y su piel. Se mantiene «marta cibelina» como nombre exacto y el ejemplo muestra su uso en una prenda. [DLE](https://dle.rae.es/cibelina), [marta cibelina](https://dle.rae.es/marta) |
| ES | `cibo` | Se sustituye «sustantivo masculino desusado» por «comida para animales» y una nota sencilla de que hoy se usa poco. Se elimina «cebo», que no equivale en todos los casos. [DLE](https://dle.rae.es/cibo) |
| ES | `ciclotimico` | Se explica sin repetir «ciclotimia» y se conserva que la palabra puede describir un problema de salud o a una persona que lo tiene. Se simplifica el ejemplo clínico. [DLE](https://dle.rae.es/ciclotímico), [MedlinePlus](https://medlineplus.gov/spanish/ency/article/001550.htm) |
| ES | `cienoso` | Se cambia «dicho de un terreno» y las palabras «cieno», «fangoso» y «cenagoso» por «cubierto de barro o lodo». El ejemplo conserva el mismo camino. [DLE](https://dle.rae.es/cienoso) |

## Lote 348

| Idioma | ID | Decisión |
|---|---|---|
| ES | `ciente` | Se sustituye «sabedor» por «informado» y se conserva con palabras sencillas que la voz se usa poco. Se rehace el ejemplo. [DLE](https://dle.rae.es/ciente) |
| ES | `cimarron` | Se explican en dos frases los sentidos histórico y de animal o planta silvestre. Se ordenan los sinónimos y se alinea el ejemplo con «silvestre». [DLE](https://dle.rae.es/cimarr%C3%B3n) |
| ES | `cimento` | Se simplifica la explicación mineral. Se retira la coletilla que lo presentaba como forma antigua o regional de «cimiento», pues el DLE consultado solo recoge el sentido mineral de «cimento». [DLE](https://dle.rae.es/cimento), [cimiento](https://dle.rae.es/cimiento) |
| ES | `cincuentavo` | Se cambia «dicho de una parte» y «quincuagésima» por «una de las 50 partes iguales»; se alinea el ejemplo. [DLE](https://dle.rae.es/cincuentavo) |
| ES | `cinquena` | Se cambia la referencia circular a «cinqueno» por «quinta en una serie» y se conserva en palabras sencillas que hoy se usa poco. Se elimina «quincena», que la ficha ya marcaba como no equivalente. [DLE](https://dle.rae.es/cinqueno) |
| ES | `ciquiricata` | Se cambia «ademán», «demostración» y «lisonjear» por una explicación directa. Se conserva que es un uso informal y se simplifica el ejemplo. [DLE](https://dle.rae.es/ciquiricata) |

## Lote 349

| Idioma | ID | Decisión |
|---|---|---|
| ES | `circunciso` | Se explica con palabras sencillas el resultado de la circuncisión y se evita la etiqueta «dicho de». Se rehace el ejemplo médico. [DLE](https://dle.rae.es/circunciso) |
| ES | `circunvenir` | Se cambia «estrechar u oprimir con artificio engañoso» por «presionar con engaños». Se conserva con palabras sencillas que hoy se usa poco. [DLE](https://dle.rae.es/circunvenir) |
| ES | `ciscar` | Se indica que el primer sentido se usa en conversaciones informales y que el segundo se expresa con «ciscarse». Se mantienen separados en dos frases breves. El ejemplo muestra el sentido de ensuciar. [DLE](https://dle.rae.es/ciscar) |
| ES | `citano` | Se aclara que se usa junto a «fulano» o «mengano» para hablar de alguien sin nombrarlo. Se acorta la definición y se ajustan sinónimo y ejemplo a ese uso. [DLE](https://dle.rae.es/citano) |
| ES | `citola` | Se acorta la explicación del mecanismo del molino y se conserva el uso antiguo como «cítara». Se toma como referencia la forma acentuada «cítola» del DLE; se mantiene la lista revisada de sinónimos, que no incluye «tarabita». [DLE](https://dle.rae.es/c%C3%ADtola) |
| ES | `citote` | Se explica directamente la citación y se expresa con sencillez que antes también nombraba a quien la llevaba. Se alinea el ejemplo con «citación». [DLE](https://dle.rae.es/citote) |

## Lote 350

| Idioma | ID | Decisión |
|---|---|---|
| ES | `civilidad` | Se explica primero el sentido actual con palabras sencillas; se conserva el sentido antiguo como «ser tacaño o grosero». Se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/civilidad) |
| ES | `civilizador` | Se quitan las etiquetas gramaticales y se explica directamente el uso como adjetivo y como nombre. Se rehacen el primer sinónimo y el ejemplo. [DLE](https://dle.rae.es/civilizador) |
| ES | `civilizar` | Se simplifica el sentido actual y se conserva el uso histórico de imponer a otros pueblos formas de vida consideradas «civilizadas». Se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/civilizar) |
| ES | `civismo` | Se pone primero el sentido actual y se explica el otro como interés por el país. Se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/civismo) |
| ES | `cizalla` | Se explica la herramienta con una comparación conocida y se simplifican el primer sinónimo y el ejemplo. [DLE](https://dle.rae.es/cizalla) |
| ES | `cizanador` | Se sustituye la etiqueta gramatical y «siembra cizaña» por una explicación directa de cómo enfrenta a las personas. [DLE](https://dle.rae.es/ciza%C3%B1ador) |

## Lote 351

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cizanar` | Se quita «verbo transitivo» y la explicación circular «meter cizaña». Se explica como enfrentar a unas personas y se actualizan sinónimos y ejemplo. [DLE](https://dle.rae.es/ciza%C3%B1ar) |
| ES | `cizanear` | Se simplifica «discordia o enemistad» como enfrentar a unas personas. Se corrigen la fuente, la ficha editorial y el ejemplo. [DLE](https://dle.rae.es/ciza%C3%B1ear) |
| ES | `cizanero` | Se quitan las etiquetas gramaticales y se explica directamente qué hace la persona. [DLE](https://dle.rae.es/ciza%C3%B1ero) |
| ES | `clamar` | Se cambia «con vehemencia» por «con fuerza o urgencia» y se aclara el sentido de pedir ayuda a gritos. [DLE](https://dle.rae.es/clamar) |
| ES | `clamor` | Se explica con palabras sencillas el grito colectivo y el uso figurado como protesta. Se actualizan el overlay B15 y la capa final de rebase, además del sinónimo y el ejemplo. [DLE](https://dle.rae.es/clamor) |
| ES | `clamor-1555-2` | Se simplifica «voz que se da con mucha fuerza» como «grito fuerte». Se conserva el ejemplo y se actualiza la capa editorial. [DLE](https://dle.rae.es/clamor) |

## Lote 352

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clamor-1555-3` | Revisada y conservada: la frase corta explica el grito que expresa dolor; sinónimo y ejemplo muestran ese sentido. [DLE](https://dle.rae.es/clamor) |
| ES | `clamoreada` | Se sustituyen las etiquetas gramaticales y las remisiones por dos explicaciones directas; se actualiza el ejemplo. [DLE](https://dle.rae.es/clamoreada) |
| ES | `clamorear` | Se sustituyen «instancias» y «voces lastimeras» por «quejas o gritos»; se explica con claridad el toque de campanas por una muerte. [DLE](https://dle.rae.es/clamorear) |
| ES | `clamoreo` | Se explican directamente las voces repetidas y la petición que molesta; se ajustan el overlay B15, sinónimos y ejemplo. [DLE](https://dle.rae.es/clamoreo) |
| ES | `clamosidad` | Se elimina la remisión circular «cualidad de clamoso» y se explica directamente el uso poco frecuente. Se rehacen sinónimo y ejemplo. [DLE](https://dle.rae.es/clamosidad) |
| ES | `clamoso` | Se quitan las etiquetas y se conservan en palabras sencillas el significado y el uso antiguo. Se alinea sinónimo y ejemplo. [DLE](https://dle.rae.es/clamoso) |

## Lote 353

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clandestino` | Se acorta la explicación y se conserva que puede ser ilegal, pero no siempre. Se corrige el género del ejemplo y se alinea con «oculto». [DLE](https://dle.rae.es/clandestino) |
| ES | `clangor` | Se corrige el sentido: nombra el sonido de una trompeta o un clarín, en especial en textos literarios. Se ajustan el overlay B15, el sinónimo y el ejemplo. [DLE](https://dle.rae.es/clangor) |
| ES | `claqueta` | Se explican con frases cortas las piezas que chocan, su función y la versión electrónica. Se alinea el primer sinónimo con el ejemplo. [DLE](https://dle.rae.es/claqueta) |
| ES | `clarar` | Se sustituye la etiqueta gramatical por el significado directo y se conserva con palabras sencillas que es una palabra antigua y poco usada. [DLE](https://dle.rae.es/clarar) |
| ES | `clarea` | Se quita la etiqueta gramatical y se explican los ingredientes con palabras comunes. Se simplifica el primer sinónimo. [DLE](https://dle.rae.es/clarea) |
| ES | `clarecer` | Se quitan las etiquetas gramaticales y se conserva que es una palabra poco usada. Se retiran sinónimos poco comunes y se actualiza la capa final de rebase. [DLE](https://dle.rae.es/clarecer) |

## Lote 354

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clarete` | Se quita la etiqueta gramatical y se explica directamente como vino tinto de color claro. Se actualiza el ejemplo. [DLE](https://dle.rae.es/clarete) |
| ES | `claretiano` | Se explica directamente su relación con san Antonio María Claret y el uso para nombrar a sus miembros. Se alinean sinónimo y ejemplo. [DLE](https://dle.rae.es/claretiano) |
| ES | `claridad` | Se cambia «cualidad» por una explicación directa de la facilidad para ver o entender. Se actualizan el overlay B15 y el rebase final. [DLE](https://dle.rae.es/claridad) |
| ES | `claridad-frank-remark` | Se sustituye la explicación metalingüística por «comentario sincero» y se ajustan sinónimo y ejemplo en las capas B15 y rebase. [DLE](https://dle.rae.es/claridad) |
| ES | `claridad-light-in-a-space` | Revisada y conservada: la definición explica de forma directa la luz que ilumina un lugar; el ejemplo y el sinónimo corresponden a ese sentido. [DLE](https://dle.rae.es/claridad) |
| ES | `claridad-sharp-perception` | Se sustituye «percibir» por «notar» para explicar la facilidad de entender ideas o notar sensaciones. Se actualizan B15 y el rebase final. [DLE](https://dle.rae.es/claridad) |

## Lote 355

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clarificador` | Se quita la etiqueta gramatical y se explica directamente que algo ayuda a aclarar o explicar. Se alinean sinónimo y ejemplo. [DLE](https://dle.rae.es/clarificador) |
| ES | `clarificar` | Se explican por separado sus usos y se ajusta el ejemplo para que sustituya la palabra por el primer sinónimo, «aclarar». [DLE](https://dle.rae.es/clarificar) |
| ES | `clarifico` | Se cambia la etiqueta de estilo por una explicación directa y se conserva con palabras sencillas que es una palabra antigua. Se renueva el ejemplo. [DLE](https://dle.rae.es/clar%C3%ADfico) |
| ES | `clarin` | Se quita la etiqueta gramatical y se acorta la definición; se conservan los usos como instrumento, sonido del órgano y trompeta militar. [DLE](https://dle.rae.es/clar%C3%ADn) |
| ES | `clarinada` | Se explica directamente el dicho fuera de lugar y se mejora el ejemplo para mostrar ese sentido. [DLE](https://dle.rae.es/clarinada) |
| ES | `clarinada-inappropriate-remark` | Revisada por separado: es otra ficha activa del mismo sentido. Se actualizan la definición y el ejemplo en la capa que la genera. [DLE](https://dle.rae.es/clarinada) |
| ES | `clarinada-clarion-call` | Se simplifica la definición y se conserva que este sentido se usa en el habla informal. Se aclara el ejemplo. [DLE](https://dle.rae.es/clarinada) |

## Lote 356

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clarinete` | Se acorta la definición y se explica cómo se toca el instrumento. Se conservan el sinónimo y el ejemplo, que encajan con el uso. [DLE](https://dle.rae.es/clarinete) |
| ES | `clarion` | Se quita la etiqueta gramatical y se explica con palabras sencillas de qué está hecha esta barra y para qué sirve. [DLE](https://dle.rae.es/clarión) |
| ES | `claroscuro` | Se sustituyen las etiquetas y palabras difíciles por dos frases breves. Se conservan el contraste en una obra, los rasgos opuestos y el uso antiguo; se ajustan sinónimos y ejemplo. [DLE](https://dle.rae.es/claroscuro) |
| ES | `clarucho` | Se explica directamente como algo muy aguado y se conserva con palabras simples que se dice con desprecio. El sinónimo y el ejemplo corresponden. [DLE](https://dle.rae.es/clarucho) |
| ES | `clases-de-refuerzo` | Se acorta la definición y se centra en practicar y repasar. Se cambia el sinónimo por «clases de apoyo» y se alinea el ejemplo. [clase](https://dle.rae.es/clase), [refuerzo](https://dle.rae.es/refuerzo) |
| ES | `clasicismo` | Se sustituyen etiquetas y términos difíciles («Antigüedad grecorromana», «academicismo») por dos frases sencillas sobre el estilo, la forma de crear y la cualidad clásica. Se cambian sinónimo y ejemplo. [DLE](https://dle.rae.es/clasicismo) |

## Lote 357

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clasismo` | Se quita la etiqueta y se explica directamente la discriminación por clase social. Se cambian sinónimo y ejemplo. [DLE](https://dle.rae.es/clasismo) |
| ES | `claudicante` | Se explican por separado sus dos sentidos: ceder ante presión y caminar con dificultad. Se conserva el uso médico en palabras sencillas y se simplifica el ejemplo. [DLE](https://dle.rae.es/claudicante) |
| ES | `claustral` | Se explican directamente los usos relacionados con monasterios, centros educativos y religiosos. Se reemplazan los sinónimos técnicos y se simplifica el ejemplo. [DLE](https://dle.rae.es/claustral) |
| ES | `claustrar` | Se elimina la etiqueta gramatical; se conserva que es una palabra antigua y se explica directamente como rodear un terreno con una valla. [DLE](https://dle.rae.es/claustrar) |
| ES | `clausula` | Se corrige la explicación confusa sobre las firmas y se define la cláusula como una condición escrita. [DLE](https://dle.rae.es/cl%C3%A1usula) |
| ES | `clausula-abusiva` | Se acorta la definición legal y se mantienen el perjuicio, la falta de negociación por separado y la valoración según contrato. Se hacen más claros sinónimos y ejemplo. [BOE, artículo 82](https://www.boe.es/buscar/act.php?id=BOE-A-2007-20555&p=20260228&tn=1) |

## Lote 358

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clausura` | Se conserva el sentido de vida religiosa apartada y se explica con palabras sencillas. Se cambian sinónimo y ejemplo. [DLE](https://dle.rae.es/clausura) |
| ES | `clausurar` | Se quita la etiqueta gramatical y se separan sus dos usos: terminar una actividad y cerrar un local. Se acortan definición y ejemplo. [DLE](https://dle.rae.es/clausurar) |
| ES | `clavadora` | Se quita la etiqueta gramatical y se explica directamente qué hace la máquina. Se simplifican sinónimo y ejemplo. [DLE](https://dle.rae.es/clavadora) |
| ES | `clavazon` | Se sustituyen «alguna cosa» y «preparados para ponerlos» por una explicación más corta; se actualizan el overlay B15, el rebase, sinónimo y ejemplo. [DLE](https://dle.rae.es/clavaz%C3%B3n) |
| ES | `clave` | Se cambia la explicación con «cifra» por una frase directa sobre entender un mensaje secreto. Se actualiza el ejemplo en la fuente y el rebase. [DLE](https://dle.rae.es/clave) |
| ES | `clavecin` | Se explica cómo producen sonido sus teclas y cuerdas. Se corrige el ejemplo para que sea natural y se actualiza el rebase. [DLE](https://dle.rae.es/clavec%C3%ADn) |

## Lote 359

| Idioma | ID | Decisión |
|---|---|---|
| ES | `claveque` | Se explica con palabras sencillas que es cuarzo redondeado y tallado; se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/claveque) |
| ES | `clavera` | Se explican el agujero y el molde con palabras sencillas, y se aclara el uso extremeño. Se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/clavera), [mojonera](https://dle.rae.es/mojonera) |
| ES | `claveta` | Se corrige el material: la claveta es una pieza de madera o caña, no de metal. Se simplifican definición, sinónimo y ejemplo. [DLE](https://dle.rae.es/claveta) |
| ES | `clavete` | Se acorta la explicación del sentido de clavo pequeño y se actualizan ejemplo y sinónimo. El DLE actual recoge además un sentido musical; este no corresponde a la ficha revisada. [DLE](https://dle.rae.es/clavete), [diccionario de términos mineros](https://upload.wikimedia.org/wikipedia/commons/d/d5/A_dictionary_of_Spanish%2C_Spanish-American%2C_Portuguese%2C_and_Portuguese-American_mining%2C_metallurgical_and_allied_terms_%28IA_dictionaryspanish00halsrich%29.pdf) |
| ES | `clavetear` | Se quita la etiqueta gramatical y se explican sus usos con frases breves. Se revisan sinónimos y ejemplo. [DLE](https://dle.rae.es/clavetear) |
| ES | `claveteo` | Se sustituye la definición circular por una explicación directa y se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/claveteo) |

## Lote 360

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clavicembalo` | Se precisa que es un instrumento de teclado y cuerdas. El sinónimo y el ejemplo ya eran claros. [DLE](https://dle.rae.es/clavic%C3%A9mbalo) |
| ES | `clavicordio` | Se cambia la explicación del mecanismo por una frase directa sobre cómo produce sonido. Se conserva el uso de «espineta» como instrumento parecido. [DLE](https://dle.rae.es/clavicordio) |
| ES | `clavijera` | Se quitan las etiquetas gramatical y de registro, y se explica el uso de Aragón con palabras sencillas. Se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/clavijera) |
| ES | `clavito` | Se sustituye la explicación metalingüística por «clavo pequeño» y se ajusta el ejemplo. [DLE](https://dle.rae.es/clavito) |
| ES | `clema` | Se quitan la etiqueta técnica y la lista de términos eléctricos. Se explica directamente para qué sirve y se actualizan sinónimo y ejemplo. [DLE](https://dle.rae.es/clema) |
| ES | `clembuterol` | Se quitan la etiqueta de bioquímica y «anabolizante». Se explican directamente los usos y se actualizan sinónimo y ejemplo. [DLE](https://dle.rae.es/clembuterol) |

## Lote 361

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clepsidra` | Se cambia «flujo» por «agua que pasa» y se acortan el ejemplo y su sustitución. [DLE](https://dle.rae.es/clepsidra) |
| ES | `cleptomania` | Se quita la recomendación ajena a la definición y se explica el impulso con palabras sencillas. Se revisan sinónimo y ejemplo. [DLE](https://dle.rae.es/cleptoman%C3%ADa) |
| ES | `cleptomaniaco` | Se cambia la fórmula «dicho de una persona» por una explicación directa y un sinónimo comprensible. [DLE](https://dle.rae.es/cleptoman%C3%ADaco), [cleptómano](https://dle.rae.es/clept%C3%B3mano) |
| ES | `cleptomano` | Se sustituye la etiqueta gramatical por una explicación directa y se alinea el ejemplo con «persona con cleptomanía». [DLE](https://dle.rae.es/clept%C3%B3mano) |
| ES | `clerecia` | Se explican en dos frases los sentidos de grupo y ocupación, y se acorta el ejemplo. [DLE](https://dle.rae.es/clerec%C3%ADa) |
| ES | `clerical` | Se separan el sentido general y el político, y se explica cada uno con palabras sencillas. [DLE](https://dle.rae.es/clerical) |

## Lote 362

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clericato` | Se conserva la marca «poco usado», se explica el sentido directamente y se aclara «clericato de cámara». [DLE](https://dle.rae.es/clericato) |
| ES | `clericatura` | Se sustituye «estado clerical» por una explicación directa y se revisan el sinónimo y el ejemplo. [DLE](https://dle.rae.es/clericatura) |
| ES | `clerigo` | Se quita la etiqueta gramatical y se explica qué órdenes recibe y para qué sirven. [DLE](https://dle.rae.es/cl%C3%A9rigo) |
| ES | `clerizon` | Se explican sus dos sentidos y se conserva la marca de uso antiguo. Se ajustan sinónimo y ejemplo. [DLE](https://dle.rae.es/cleriz%C3%B3n), [clerizonte](https://dle.rae.es/clerizonte) |
| ES | `clerizonte` | Se explican por separado el sentido despectivo y el uso para quien viste de cura sin ser sacerdote. [DLE](https://dle.rae.es/clerizonte) |
| ES | `clero` | Se conserva la definición breve y se ajustan el sinónimo y el ejemplo para incluir a otros ministros. [DLE](https://dle.rae.es/clero) |

## Lote 363

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cliche` | Se conserva la definición directa del sentido de idea repetida; el sinónimo y el ejemplo son claros y equivalentes. [DLE](https://dle.rae.es/clich%C3%A9) |
| ES | `cliche-photographic-negative` | Se aclara que la imagen tiene luces y sombras invertidas; el ejemplo y «negativo fotográfico» describen el mismo uso. [DLE](https://dle.rae.es/clich%C3%A9) |
| ES | `cliche-printing-plate` | Se conserva la explicación breve y se cambia «molde» por «plancha», que nombra con más precisión la pieza de imprenta; se actualiza el ejemplo. [DLE](https://dle.rae.es/clich%C3%A9) |
| ES | `clientelismo` | Se explica directamente la práctica política y se cambia «patronazgo político» por «intercambio de favores», más fácil; el ejemplo lo sustituye con naturalidad. [DLE](https://dle.rae.es/clientelismo) |
| ES | `clima` | Se acorta la definición y se conserva la diferencia entre el clima habitual de una región y el tiempo de un día; sinónimo y ejemplo encajan. [DLE](https://dle.rae.es/clima) |
| ES | `climaterico` | Se quita «Adjetivo» y se explican por separado sus dos sentidos. El ejemplo usa el sentido de una etapa importante de la vida. [DLE](https://dle.rae.es/climat%C3%A9rico) |

## Lote 364

| Idioma | ID | Decisión |
|---|---|---|
| ES | `climatizador` | Se quitan las etiquetas gramaticales y se explican por separado el uso descriptivo y el aparato. [DLE](https://dle.rae.es/climatizador) |
| ES | `climatizar` | Se reemplaza la definición en inglés y se explica de forma directa cómo se ajustan temperatura y humedad. Se usa «acondicionar» en el ejemplo. [DLE](https://dle.rae.es/climatizar) |
| ES | `climatologia` | Se explican por separado los sentidos de condiciones del clima y estudio del clima; se quitan las etiquetas metalingüísticas. [DLE](https://dle.rae.es/climatolog%C3%ADa) |
| ES | `climograma` | Se cambia «precipitación» por «lluvia» y se explica qué datos muestra el gráfico. [DLE](https://dle.rae.es/climograma) |
| ES | `clin` | Se quita la marca «variante antigua», que no aparece en el DLE, y se explica la forma con la que remite. [DLE](https://dle.rae.es/clin), [crin](https://dle.rae.es/crin) |
| ES | `clinico` | Se simplifica la definición en la capa que la sobrescribía y se ajustan las palabras de ejemplo en la capa editorial posterior. [DLE](https://dle.rae.es/cl%C3%ADnico) |

## Lote 365

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clinker` | Se reemplaza «granulado» por «pequeños trozos» y se explica para qué sirve. Se conserva el sinónimo y el ejemplo. [DLE](https://dle.rae.es/cl%C3%ADnker) |
| ES | `clipeo` | Se quita la etiqueta gramatical y se explican por separado el escudo y la parte de la cabeza del insecto. Esta última acepción se contrasta con un manual universitario de entomología. [DLE](https://dle.rae.es/cl%C3%ADpeo), [manual de entomología de la Universidad de la República](https://www.colibri.udelar.edu.uy/jspui/bitstream/20.500.12008/1301/1/uy24-14805.pdf) |
| ES | `cliquear` | Se conserva: la definición, el sinónimo «pulsar» y el ejemplo son claros y concordantes. [DLE](https://dle.rae.es/cliquear) |
| ES | `clistel` | Se elimina la etiqueta gramatical y se explica con palabras sencillas qué es un enema. Se cambia «clister», poco claro, por «lavativa» en el ejemplo. [DLE](https://dle.rae.es/clistel), [enema](https://dle.rae.es/enema) |
| ES | `clitometro` | Se sustituye «inclinación» por «cuánto se inclina», que expresa la medida con palabras más directas. [DLE](https://dle.rae.es/clit%C3%B3metro) |
| ES | `clitoriano` | Se conserva la definición directa y se cambia el sinónimo por «del clítoris», más breve y fácil de usar en el ejemplo. [DLE](https://dle.rae.es/clitoriano) |

## Lote 366

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clivoso` | Se explica directamente que algo está en cuesta y se conserva, con palabras sencillas, la nota de uso literario del DLE. [DLE](https://dle.rae.es/clivoso) |
| ES | `cloaca` | Se conserva la definición sencilla, el sinónimo «alcantarilla» y el ejemplo, que concuerdan. [DLE](https://dle.rae.es/cloaca) |
| ES | `cloaca-animal-cavity` | Se explican por separado la ubicación y los usos de esta abertura; se cambia «abertura común» por «abertura final» y se adapta el ejemplo. [DLE](https://dle.rae.es/cloaca) |
| ES | `cloaca-filthy-place` | Se conserva: la definición, el sinónimo «pocilga» y el ejemplo son claros y concuerdan. [DLE](https://dle.rae.es/cloaca) |
| ES | `clocar` | Se elimina la etiqueta verbal y se explica directamente el sonido de la gallina. Se conserva «cloquear» como sinónimo y se adapta el ejemplo. [DLE](https://dle.rae.es/clocar) |
| ES | `clonacion` | Se incluyen genes, células y seres vivos, y se explica que el parecido depende del método; se adapta el ejemplo. [DLE](https://dle.rae.es/clonaci%C3%B3n), [clonar](https://dle.rae.es/clonar) |

No se registran exclusiones nuevas en este lote.

## Lote 392

| Idioma | ID | Decisión |
|---|---|---|
| ES | `colicuar` | Se explica directamente que varias sustancias se vuelven líquidas a la vez; se conserva el uso pronominal. [DLE](https://dle.rae.es/colicuar) |
| ES | `colicuecer` | Se reemplaza la remisión circular a «colicuar» por una explicación sencilla. [DLE](https://dle.rae.es/colicuecer), [colicuar](https://dle.rae.es/colicuar) |
| ES | `colidir` | Se explican los sentidos de chocar y frotar; se conserva con palabras simples que es una palabra antigua. El ejemplo deja de hablar de la palabra y muestra una acción. [DLE](https://dle.rae.es/colidir) |
| ES | `coligadura` | Se elimina la explicación por «coligarse» y se define como una unión para lograr algo. El ejemplo usa «alianza». [DLE](https://dle.rae.es/coligadura) |
| ES | `coligarse` | Se explica directamente que varias personas o grupos se unen para lograr algo. [DLE](https://dle.rae.es/coligarse) |
| ES | `colindante` | Se sustituye la definición circular por «que está junto a otro terreno o lugar». [DLE](https://dle.rae.es/colindante) |
| ES | `colindar` | Se explica que dos terrenos comparten un límite; el ejemplo muestra ese sentido. [DLE](https://dle.rae.es/colindar) |
| ES | `colisionar` | Se explican por separado chocar con fuerza y estar en desacuerdo; el ejemplo muestra el primer sentido. [DLE](https://dle.rae.es/colisionar) |

No se registran exclusiones nuevas en este lote.

## Lote 393

| Idioma | ID | Decisión |
|---|---|---|
| ES | `collado` | Se explican por separado la elevación baja y el paso entre montañas; se adapta el ejemplo al primer sentido. [DLE](https://dle.rae.es/collado) |
| ES | `collazo` | Se explican con palabras sencillas los sentidos de hermano de leche, sirviente, palo andaluz y golpe en la nuca. El ejemplo muestra el primer sentido. [DLE](https://dle.rae.es/collazo) |
| ES | `collera` | Se simplifican los sentidos activos y el ejemplo. «Gemelos de camisa» permanece en la fuente base, pero la capa editorial no incluye ese sentido en el runtime. [DLE](https://dle.rae.es/collera) |
| ES | `colmado` | Se explican el adjetivo y los usos como tienda o lugar donde sirven mariscos. El ejemplo muestra el sentido de «lleno». [DLE](https://dle.rae.es/colmado) |
| ES | `colmar` | Se explican por separado llenar hasta rebosar, dar en abundancia y cumplir un deseo. El ejemplo muestra el primer sentido. [DLE](https://dle.rae.es/colmar) |
| ES | `colmenar` | Se explica directamente que es un lugar con colmenas; se adapta el ejemplo al sinónimo. [DLE](https://dle.rae.es/colmenar) |
| ES | `colmenero` | Se explica quién tiene o cuida colmenas; se conserva con palabras simples el sentido antiguo. [DLE](https://dle.rae.es/colmenero) |
| ES | `colodion` | Se explica con palabras sencillas de qué está hecho y para qué se usa. [DLE](https://dle.rae.es/colodi%C3%B3n) |

No se registran exclusiones nuevas de entradas en este lote.

## Lote 394

| Idioma | ID | Decisión |
|---|---|---|
| ES | `colodra` | Se acortan los sentidos de vasija, recipiente para afilar y gran bebedor; se adapta el ejemplo al sentido de ordeñar. [DLE](https://dle.rae.es/colodra) |
| ES | `colofon` | Se explican directamente el final de algo y la nota al final de un libro; se adapta el ejemplo a «remate». [DLE](https://dle.rae.es/colof%C3%B3n) |
| ES | `colofonia` | Se reemplaza la explicación técnica de la resina y se conserva su uso en barnices y arcos. [DLE](https://dle.rae.es/colofonia) |
| ES | `coloide` | Se corrige una capa editorial que ponía una definición en inglés sobre el español; se simplifican la definición y el ejemplo. [DLE](https://dle.rae.es/coloide) |
| ES | `colombianismo` | Se explican con palabras sencillas los usos de palabra, amor por Colombia y condición de colombiano; se corrige el ejemplo para que corresponda al primer sentido. [DLE](https://dle.rae.es/colombianismo) |
| ES | `colombicultura` | Se reemplazan las etiquetas gramaticales por la cría de palomas y las formas de cuidarlas. [DLE](https://dle.rae.es/colombicultura) |
| ES | `colombino` | Se sustituye la etiqueta «adjetivo» por «relacionado con Cristóbal Colón» y se adapta el ejemplo. [DLE](https://dle.rae.es/colombino) |
| ES | `colombofilia` | Se explican la cría, el entrenamiento y las formas de cuidar palomas mensajeras. [DLE](https://dle.rae.es/colombofilia) |

No se registran exclusiones nuevas de entradas en este lote.

## Lote 395

| Idioma | ID | Decisión |
|---|---|---|
| ES | `colombofilo` | Se explican la persona que cría palomas mensajeras y el uso como adjetivo. [DLE](https://dle.rae.es/colomb%C3%B3filo) |
| ES | `colonia` | Se cambia «conjunto de residentes» por una explicación directa de las personas que viven fuera de su país; se actualiza el ejemplo. [DLE](https://dle.rae.es/colonia) |
| ES | `colonial` | Se explica su relación con una colonia y con la época en que otro país la controlaba. [DLE](https://dle.rae.es/colonial) |
| ES | `colonialismo` | Se explica el control de un país sobre otro y la idea que lo defiende. [DLE](https://dle.rae.es/colonialismo) |
| ES | `colonizador` | Se quitan las etiquetas «adjetivo» y «sustantivo»; se explican ambos usos con palabras comunes. [DLE](https://dle.rae.es/colonizador) |
| ES | `colono` | Se sustituye «quien habita» por «persona que vive» y se adapta el ejemplo. [DLE](https://dle.rae.es/colono) |
| ES | `colonoscopia` | Se explica la prueba por lo que hace: mirar el intestino grueso con una cámara. [DLE](https://dle.rae.es/colonoscopia) |
| ES | `coloquial` | Se explica directamente como algo que se usa al hablar de manera informal; se cambia el ejemplo metalingüístico por una situación común. [DLE](https://dle.rae.es/coloquial) |

No se registran exclusiones nuevas de entradas en este lote.

## Lote 396

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coloquio` | Se explican la conversación, la reunión para debatir y el texto en forma de diálogo. Se adapta el ejemplo. [DLE](https://dle.rae.es/coloquio) |
| ES | `colorar` | Se quitan las etiquetas gramaticales; se explican el uso principal y los usos antiguos con palabras sencillas. [DLE](https://dle.rae.es/colorar) |
| ES | `colorete` | Se explica directamente como maquillaje para las mejillas. [DLE](https://dle.rae.es/colorete) |
| ES | `coloridor` | Se sustituye la definición metalingüística por una explicación directa y se conserva que se usa poco. [DLE](https://dle.rae.es/coloridor) |
| ES | `colorimetro` | Se quitan las etiquetas técnicas y el sinónimo inglés; se explica que mide el color de una muestra. [DLE](https://dle.rae.es/color%C3%ADmetro) |
| ES | `colorin` | Se corrige la capa editorial: se retira la acepción de enfermedad de la vid, que no consta en el DLE, y se explican los sentidos recogidos allí. [DLE](https://dle.rae.es/color%C3%ADn) |
| ES | `colorir` | Se explican con palabras sencillas sus dos sentidos y que se usa poco; se quita la nota técnica sobre conjugación. [DLE](https://dle.rae.es/colorir) |
| ES | `colpar` | Se sustituye el ejemplo metalingüístico por uno concreto y se conserva con palabras comunes que es una palabra antigua. [DLE](https://dle.rae.es/colpar) |

No se registran exclusiones nuevas de entradas en este lote.

## Lote 397

| Idioma | ID | Decisión |
|---|---|---|
| ES | `colpe` | Se define directamente como «golpe» y se conserva con palabras sencillas que es una palabra antigua. [DLE](https://dle.rae.es/colpe) |
| ES | `coludir` | Se explica el sentido legal como un acuerdo secreto para perjudicar a otros; se cambia el ejemplo metalingüístico por uno de empresas. [DLE](https://dle.rae.es/coludir) |
| ES | `coludo` | Se explica directamente qué característica tiene el animal y se conserva que el uso varía por país. [DLE](https://dle.rae.es/coludo) |
| ES | `columbio` | Se sustituye la explicación de número atómico por el sentido activo: nombre poco usado del metal niobio. [DLE](https://dle.rae.es/columbio) |
| ES | `columbrar` | Se explican por separado ver algo de lejos y entender algo por sus señales. [DLE](https://dle.rae.es/columbrar) |
| ES | `columbron` | Se cambia la definición de germanía por palabras sencillas y se explica que es una palabra antigua usada por delincuentes. [DLE](https://dle.rae.es/columbr%C3%B3n) |
| ES | `coluna` | Se explica directamente como otra forma, poco usada, de decir «columna»; se cambia el ejemplo metalingüístico por una situación concreta. [DLE](https://dle.rae.es/coluna) |
| ES | `colusion` | Se simplifica la definición en la fuente y en el parche español de `js/data.en.2.js`, que sobrescribía el runtime con una versión extensa. [DLE](https://dle.rae.es/colusi%C3%B3n) |

No se registran exclusiones nuevas de entradas en este lote.

## Lote 398

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coluvie` | Se explican sus sentidos como lugar sucio y grupo de pícaros; se conserva que la palabra se usa poco. [DLE](https://dle.rae.es/coluvie) |
| ES | `comadre` | Se explican sus sentidos de partera, madrina, madre del ahijado, vecina amiga y mujer que une parejas; el ejemplo muestra el uso como partera. [DLE](https://dle.rae.es/comadre) |
| ES | `comanda` | Se define directamente como el pedido que anota el camarero. [DLE](https://dle.rae.es/comanda) |
| ES | `comandancia` | Se explica como la oficina de mando policial o de la Guardia Civil; se alinea también el parche editorial de `js/data.es.2b.js`. [DLE](https://dle.rae.es/comandancia) |
| ES | `comandanta` | Se explican el barco de mando de una flota y el uso familiar para la mujer del comandante. [DLE](https://dle.rae.es/comandanta) |
| ES | `comanditar` | Se sustituye la explicación comercial técnica por aportar dinero a una empresa sin asumir obligaciones comerciales. [DLE](https://dle.rae.es/comanditar) |
| ES | `comanditario` | Se explica como socio que aporta dinero, no dirige la empresa y responde de forma limitada; se alinean el rebase y la corrección de sinónimos. [DLE](https://dle.rae.es/comanditario) |
| ES | `comarcano` | Se define directamente como algo que está cerca de otro lugar. [DLE](https://dle.rae.es/comarcano) |

No se registran exclusiones nuevas en este lote.

## Lote 399

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comarcar` | Se explican sus dos sentidos con palabras directas; se simplifican sinónimos y se cambia el ejemplo al uso de compartir un límite. [DLE](https://dle.rae.es/comarcar) |
| ES | `comatoso` | Se quitan la explicación extensa y la advertencia técnica; se aclaran el coma y la falta de respuesta. Se alinean la corrección y el parche ES de `js/data.en.2.js`. [DLE](https://dle.rae.es/comatoso) |
| ES | `combadura` | Se sustituye «efecto de combar» por una curvatura o deformación concreta; se alinea la capa del rebase y la tarjeta editorial. [DLE](https://dle.rae.es/combadura) |
| ES | `combar` | Se quitan las etiquetas gramaticales; se explican con claridad los usos de curvar algo y curvarse. [DLE](https://dle.rae.es/combar) |
| ES | `combatiente` | Se sustituye la definición metalingüística «que combate» por una persona que participa en una lucha o guerra; se rehacen el ejemplo y el sinónimo. [DLE](https://dle.rae.es/combatiente) |
| ES | `combatividad` | Se explica como ganas de luchar o defender una causa; el ejemplo muestra a trabajadores que defienden sus derechos. [DLE](https://dle.rae.es/combatividad) |
| ES | `combativo` | Se quitan las etiquetas gramaticales y se explica la disposición a luchar o defender ideas; se adapta el ejemplo. [DLE](https://dle.rae.es/combativo) |
| ES | `combeneficiado` | Se sustituye la explicación metalingüística por la de un clérigo que comparte un cargo religioso y sus ingresos; se alinea el parche editorial. [DLE](https://dle.rae.es/combeneficiado) |

No se registran exclusiones nuevas en este lote.

## Lote 400

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comblezo` | Se explican con palabras comunes el rival amoroso y el sentido femenino de mujer que vive con un hombre casado. [DLE](https://dle.rae.es/comblezo) |
| ES | `combluezo` | Se conserva activa como forma antigua: una enmienda histórica de la RAE la documenta, aunque el DLE actual remite a `comblezo`. Se simplifican la definición y el ejemplo. [DLE actual](https://dle.rae.es/combluezo), [enmienda histórica de la RAE](https://webfrl.rae.es/BRAE_DB_PDF/TOMO_LXXI/CCLII/Enmiendas_adiciones_DRAE_15_34.pdf) |
| ES | `comburente` | Se explica como una sustancia que ayuda a que un combustible arda; se conserva el ejemplo del oxígeno con palabras más comunes. [DLE](https://dle.rae.es/comburente) |
| ES | `combustibilidad` | Se explica como la facilidad con que un material puede arder; se simplifican los sinónimos y el ejemplo. [DLE](https://dle.rae.es/combustibilidad) |
| ES | `comecandela-persona-que-presume-de-valentia` | Se conserva solo el sentido activo de persona que presume de ser valiente; se indica con lenguaje sencillo que se usa en Cuba. [DLE](https://dle.rae.es/comecandela) |
| ES | `comedero` | Se define como recipiente para comida de animales y se adapta el ejemplo al uso con alpiste. [DLE](https://dle.rae.es/comedero) |
| ES | `comedia` | Se explica como obra de teatro o película que busca hacer reír y suele acabar bien. [DLE](https://dle.rae.es/comedia) |
| ES | `comedia-1555-2` | Se define el sentido activo como un tipo de obra que busca hacer reír; se cambia el sinónimo por una forma más clara. [DLE](https://dle.rae.es/comedia) |

No se registran exclusiones nuevas en este lote. `combluezo` permanece activa por su documentación histórica en la RAE.

## Lote 461

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cordialidad` | Se quita la etiqueta gramatical y se explican por separado el trato amable y la sinceridad al hablar. [DLE](https://dle.rae.es/cordialidad) |
| ES | `cordiforme` | Se quita la etiqueta y se conserva un sinónimo fácil de entender. [DLE](https://dle.rae.es/cordiforme) |
| ES | `cordonazo` | Se quita la etiqueta gramatical y se cambia el ejemplo abstracto por una situación concreta. [DLE](https://dle.rae.es/cordonazo) |
| ES | `cordoncillo` | Se revisa de nuevo la ficha del lote 2 y se sincronizan la fuente y las capas editoriales activas para explicar los sentidos de tela, bordado y moneda. El sentido de arbusto recogido por el DLE no está en la ficha activa. [DLE](https://dle.rae.es/cordoncillo) |
| ES | `corear` | Se quitan la etiqueta verbal y las explicaciones metalingüísticas; se conservan el canto, la recitación y la repetición en grupo. [DLE](https://dle.rae.es/corear) |
| ES | `corego` | Se sustituye la etiqueta gramatical y se explica con palabras sencillas quién pagaba el montaje teatral. [DLE](https://dle.rae.es/corego) |
| ES | `coreo` | Se explican por separado los sentidos de poesía y música sin tecnicismos. [DLE](https://dle.rae.es/coreo) |
| ES | `coreografiar` | Se sustituye la etiqueta verbal por una explicación directa de los pasos de baile. [DLE](https://dle.rae.es/coreografiar) |

Las ocho entradas estaban activas; `cordoncillo` ya constaba en el lote 2. No se añaden exclusiones.

## Lote 460

| Idioma | ID | Decisión |
|---|---|---|
| ES | `corcovado` | Se quita la etiqueta gramatical, se explica con «joroba» y se conservan solo sinónimos claros; se usa un ejemplo con un camello. [DLE](https://dle.rae.es/corcovado) |
| ES | `corcovar` | Se sustituye la etiqueta verbal y se explica cómo queda la cosa que se dobla. [DLE](https://dle.rae.es/corcovar) |
| ES | `corcovear` | Se explica directamente el salto y la postura del animal, y se quita un sinónimo circular. [DLE](https://dle.rae.es/corcovear) |
| ES | `corcoveo` | Se conserva el salto animal, se indica que la palabra se usa en Honduras y Venezuela y se dejan sinónimos claros. [DLE](https://dle.rae.es/corcoveo) |
| ES | `corcovo` | Se explica el salto del animal, se ajusta el ejemplo y se quita un sinónimo poco claro. [DLE](https://dle.rae.es/corcovo) |
| ES | `corcusido` | Se explica como una costura mal hecha, se conserva que es informal y se quita un sinónimo difícil. [DLE](https://dle.rae.es/corcusido) |
| ES | `corcusir` | Se explica directamente cómo se tapa mal un agujero de la ropa; se conserva que es informal. [DLE](https://dle.rae.es/corcusir) |
| ES | `cordelero` | Se explica el oficio con palabras comunes y se cambian los sinónimos difíciles. [DLE](https://dle.rae.es/cordelero) |

Las ocho entradas estaban activas. Se mantiene el alcance de los sentidos activos: `corcovo` conserva el salto animal, sin añadir su uso coloquial para una torcedura; `cordelero` conserva el oficio, sin mezclar el adjetivo ni el uso poco frecuente para un religioso. No se añaden exclusiones.

## Lote 459

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coralino` | Se quita la etiqueta gramatical y se explica directamente como «de coral o parecido a él». [DLE](https://dle.rae.es/coralino) |
| ES | `corambre` | Se conservan las pieles curtidas o sin curtir y se usan palabras comunes. La ficha activa mantiene solo el sentido de conjunto de pieles, no el de recipiente. [DLE](https://dle.rae.es/corambre) |
| ES | `corbachada` | Se explica como un golpe de látigo y se conserva el ejemplo histórico. [DLE](https://dle.rae.es/corbachada) |
| ES | `corbacho` | Se sustituye «cómitre» y «forzados» por una explicación sencilla del castigo en las galeras. [DLE](https://dle.rae.es/corbacho) |
| ES | `corbatin` | Se explican por separado los dos tipos de corbata y cómo se ajustan. [DLE](https://dle.rae.es/corbat%C3%ADn) |
| ES | `corchete` | Se conservan el broche y el signo [ ], y se corrige el ejemplo para que corresponda al sinónimo «broche». [DLE](https://dle.rae.es/corchete) |
| ES | `corcholis` | Se sustituye la etiqueta de interjección por una explicación directa y se sincroniza la corrección persistente. [DLE](https://dle.rae.es/c%C3%B3rcholis) |
| ES | `corcova` | Se corrige la definición para describir la curvatura anormal de la espalda o el pecho; se alinea el ejemplo con ese sentido. [DLE](https://dle.rae.es/corcova) |

Las ocho entradas estaban activas en los índices del runtime. No se añaden exclusiones.

## Lote 458

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coquizar` | Se quita la etiqueta técnica y se explica el proceso con carbón y calor. [DLE](https://dle.rae.es/coquizar) |
| ES | `corajina` | Se conserva que es una palabra de uso informal y se explica como enojo repentino. [DLE](https://dle.rae.es/corajina) |
| ES | `corajoso` | Se explican sus sentidos de enojo y de valentía; se conserva que el segundo es antiguo. [DLE](https://dle.rae.es/corajoso) |
| ES | `corajudo` | Se explican con palabras directas sus sentidos de valentía y de enojo fácil. [DLE](https://dle.rae.es/corajudo) |
| ES | `coralero` | Se quita la etiqueta gramatical y se explica el trabajo con corales. [DLE](https://dle.rae.es/coralero) |
| ES | `coralifero` | Se quita la etiqueta gramatical y se explica directamente que un lugar tiene corales. [DLE](https://dle.rae.es/coral%C3%ADfero) |
| ES | `coralillo` | Se describe la serpiente y se conserva que hay especies venenosas y otras que se les parecen. [DLE](https://dle.rae.es/coralillo), [UNAM](https://tesiunamdocumentos.dgb.unam.mx/ppt2004/0333840/0333840.pdf) |
| ES | `coralina` | Se conserva el sentido textil activo y se explica con palabras comunes. Fabricantes describen la coralina como tela suave y cálida de microfibra de poliéster; el DLE consultado recoge otros sentidos. [Borman Textil](https://bormantextil.com/tela-de-coralina), [Ribes & Casals](https://www.ribescasals.com/collections/telas-coralina), [DLE](https://dle.rae.es/coralino) |

Las ocho entradas estaban activas en el runtime. No se añaden exclusiones.

## Lote 457

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coptico` | Se explica directamente como propio de los coptos y se retira una paráfrasis repetida. [DLE](https://dle.rae.es/c%C3%B3ptico) |
| ES | `copto` | Se simplifican sus sentidos de pertenencia y de lengua antigua. [DLE](https://dle.rae.es/copto) |
| ES | `copudo` | Se quita la etiqueta gramatical y se explica la copa frondosa del árbol. [DLE](https://dle.rae.es/copudo) |
| ES | `copula` | Se quitan las etiquetas y se conservan los sentidos de unión, relación sexual y gramática. [DLE](https://dle.rae.es/c%C3%B3pula) |
| ES | `copular` | Se sustituye la etiqueta verbal por «unirse sexualmente» y se simplifica el ejemplo. [DLE](https://dle.rae.es/copular) |
| ES | `copyright` | Se explican por separado el derecho de autor y el aviso que lo señala. [DLE](https://dle.rae.es/copyright) |
| ES | `coqueteria` | Se explican sus sentidos de cuidado personal y de intento de atraer a alguien. [DLE](https://dle.rae.es/coqueter%C3%ADa) |
| ES | `coqueto` | Se simplifica la definición y se sincronizan la fuente editorial y la corrección persistente. [DLE](https://dle.rae.es/coqueto) |

Las ocho entradas estaban activas en el runtime. No se añaden exclusiones.

## Lote 456

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coposesor` | Se explica como persona que posee algo junto con otra y se mejora el ejemplo. [DLE](https://dle.rae.es/coposesor) |
| ES | `copresidente` | Se quita la etiqueta gramatical y se explica que comparte el cargo con otra persona. [DLE](https://dle.rae.es/copresidente) |
| ES | `coproducir` | Se sustituye la etiqueta gramatical por una explicación directa de producir una obra en colaboración. [DLE](https://dle.rae.es/coproducir) |
| ES | `coprofagia` | Se reemplaza «ingestión» por «comer» y se conservan los casos en animales y personas. [DLE](https://dle.rae.es/coprofagia) |
| ES | `coprofago` | Se quitan las etiquetas gramaticales y se explica como animal que come excrementos. [DLE](https://dle.rae.es/copr%C3%B3fago) |
| ES | `coprolito` | Se simplifica la definición y se conservan sus sentidos de fósil y de masa endurecida en el intestino. [DLE](https://dle.rae.es/coprolito) |
| ES | `coprologico` | Se cambia la explicación metalingüística por una referencia directa al análisis de las heces. [DLE](https://dle.rae.es/coprol%C3%B3gico) |
| ES | `coprotagonizar` | Se simplifica la definición y el ejemplo para indicar que dos personas comparten un papel principal. [DLE](https://dle.rae.es/coprotagonizar) |

Las ocho entradas estaban activas en el runtime. No se añaden exclusiones.

## Lote 455

| Idioma | ID | Decisión |
|---|---|---|
| ES | `copion` | Se explica que copia o imita a otros y se conserva el tono despectivo con palabras sencillas. [DLE](https://dle.rae.es/copi%C3%B3n) |
| ES | `copiosidad` | Se cambia la definición a «gran cantidad» y se retiran sinónimos menos claros. [DLE](https://dle.rae.es/copiosidad) |
| ES | `copioso` | Se quitan las etiquetas gramaticales y se explica como algo que hay en gran cantidad. [DLE](https://dle.rae.es/copioso) |
| ES | `copisteria` | Se sustituye la etiqueta gramatical por «lugar» y se revisan sinónimos y ejemplo. [DLE](https://dle.rae.es/copister%C3%ADa) |
| ES | `copla` | Se explican sus sentidos de estrofa y canción en dos frases breves. [DLE](https://dle.rae.es/copla) |
| ES | `copleria` | Se explica directamente como colección de coplas y se ajusta el ejemplo. [DLE](https://dle.rae.es/copler%C3%ADa) |
| ES | `coplon` | Se conserva el sentido despectivo y su uso más frecuente en plural. [DLE](https://dle.rae.es/copl%C3%B3n) |
| ES | `copon` | Se quita la etiqueta gramatical y se explica el uso del vaso en la misa. [DLE](https://dle.rae.es/cop%C3%B3n) |

Las ocho entradas estaban activas en el runtime. No se añaden exclusiones.

## Lote 454

| Idioma | ID | Decisión |
|---|---|---|
| ES | `copetudo` | Se explican sus sentidos de copete y persona presumida; se expresa el uso coloquial como «tono informal». [DLE](https://dle.rae.es/copetudo) |
| ES | `copiador` | Se explica qué copia o sirve para copiar y se distingue el libro copiador. Se retira «reproductor», que no encaja con los sentidos. [DLE](https://dle.rae.es/copiador) |
| ES | `copiante` | Se conserva que es una palabra antigua y se explica con «copista». [DLE](https://dle.rae.es/copiante) |
| ES | `copilador` | Se sustituye la etiqueta gramatical por una explicación directa de quien reúne textos. [DLE](https://dle.rae.es/copilador) |
| ES | `copilar` | Se quita la etiqueta gramatical y se explica como reunir textos en una obra. [DLE](https://dle.rae.es/copilar) |
| ES | `copina` | Se conserva que es una voz poco usada en México y se aclara que la piel se saca de una pieza. [DLE](https://dle.rae.es/copina) |
| ES | `copinar` | Se conserva que es una voz poco usada en México y se explica cómo se quita la piel. [DLE](https://dle.rae.es/copinar) |
| ES | `copino` | Se explica el sentido activo de medida local para materiales sueltos. El DLE también recoge, como desusado, el sentido de vaso pequeño. [DLE](https://dle.rae.es/copino) |

Las ocho entradas estaban activas en el runtime. No se añaden exclusiones.

## Lote 453

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coordinativo` | Se quita la etiqueta gramatical y se explica con palabras directas. Se ajustan el sinónimo y los ejemplos. [DLE](https://dle.rae.es/coordinativo) |
| ES | `copar` | Se conservan sus sentidos de ocupar puestos, apostar y capturar por sorpresa, con frases más sencillas. [DLE](https://dle.rae.es/copar) |
| ES | `cope` | Se cambia «espesa o tupida» por «más cerrada» y se simplifica el ejemplo. [DLE](https://dle.rae.es/cope) |
| ES | `copear` | Se mantiene su significado activo y se hacen más naturales los ejemplos. [DLE](https://dle.rae.es/copear) |
| ES | `copela` | Se conserva su uso para separar metales y se retira un sinónimo técnico poco claro. [DLE](https://dle.rae.es/copela) |
| ES | `copelar` | Se quitan las etiquetas gramaticales y se explican sus dos usos con frases breves. [DLE](https://dle.rae.es/copelar) |
| ES | `copeo` | Se sustituye «acción y efecto de» por una explicación directa y se aclaran los sinónimos. [DLE](https://dle.rae.es/copeo) |
| ES | `copete` | Se explican sus cuatro sentidos activos con palabras sencillas y en dos frases. [DLE](https://dle.rae.es/copete) |

Las ocho entradas estaban activas en el runtime. No se añaden exclusiones.

## Lote 452

| Idioma | ID | Decisión |
|---|---|---|
| ES | `convite` | Se explican sus sentidos de invitación y comida ofrecida con frases cortas. Se retira un sinónimo menos común. [DLE](https://dle.rae.es/convite) |
| ES | `conviviente` | Se elimina la etiqueta gramatical y se explica como persona que vive con otra. Se usa una frase más clara en el ejemplo. [DLE](https://dle.rae.es/conviviente) |
| ES | `convivio` | Se simplifica a una comida o reunión festiva para celebrar algo. [DLE](https://dle.rae.es/convivio) |
| ES | `convulsivo` | Se reemplaza la etiqueta gramatical por una explicación directa sobre la convulsión y sus movimientos. Se retira un sinónimo poco claro. [DLE](https://dle.rae.es/convulsivo) |
| ES | `convulso` | Se explican sus dos sentidos: sufrir convulsiones y estar muy agitado. [DLE](https://dle.rae.es/convulso) |
| ES | `conon` | Se conserva con una nota sencilla de que es una palabra vulgar y se simplifican los sinónimos. [DLE](https://dle.rae.es/co%C3%B1%C3%B3n) |
| ES | `cooptar` | Se explica como elegir a una persona para un puesto vacante mediante el voto de quienes ya forman parte del grupo. [DLE](https://dle.rae.es/cooptar) |
| ES | `coordenado` | Se reemplaza la explicación técnica por una línea, eje o plano que ayuda a localizar un punto. Se actualiza también la corrección persistente. [DLE](https://dle.rae.es/coordenado) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones, los sinónimos y los ejemplos se sincronizan en las fuentes canónicas y el overlay español de `js/data.en.2.js`; `coordenado` también se actualiza en `synonym-corrections-es.json` y en la actualización de rebase.
## Lote 451

| Idioma | ID | Decisión |
|---|---|---|
| ES | `convencionalismo` | Se separan el sentido de costumbre aceptada y el uso filosófico. Se reemplazan frases técnicas por palabras comunes. [DLE](https://dle.rae.es/convencionalismo) |
| ES | `convenir` | Se explican por separado los sentidos de acordar algo, estar de acuerdo y resultar útil o adecuado. [DLE](https://dle.rae.es/convenir) |
| ES | `conventual` | Se elimina la etiqueta gramatical y se explica directamente que algo pertenece a un convento o a quienes viven allí. [DLE](https://dle.rae.es/conventual) |
| ES | `conversable` | Se reemplazan «tratable» y «comunicativo» por una explicación concreta y un sinónimo común. [DLE](https://dle.rae.es/conversable) |
| ES | `convexo` | Se cambia «se abomba» por «se curva hacia fuera» y se ajusta el ejemplo al sinónimo. [DLE](https://dle.rae.es/convexo) |
| ES | `convidado` | Se sustituye la etiqueta gramatical por «persona invitada» y se simplifican los contextos. [DLE](https://dle.rae.es/convidado) |
| ES | `convidador` | Se explica directamente que es una persona que invita a otras y se ajusta el ejemplo. [DLE](https://dle.rae.es/convidador) |
| ES | `convidar` | Se separan los sentidos de invitar y ofrecer algo. Se retira un sinónimo poco común. [DLE](https://dle.rae.es/convidar) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones, los sinónimos y los ejemplos se sincronizan en las fuentes canónicas y el overlay español de `js/data.en.2.js`.
## Lote 450

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contumelioso` | Se explica con dos palabras comunes que algo resulta ofensivo o insultante. Se simplifican los sinónimos. [DLE](https://dle.rae.es/contumelioso) |
| ES | `conturbado` | Se cambia la lista de adjetivos difíciles por «inquieto o confuso» y se ajusta el ejemplo. [DLE](https://dle.rae.es/conturbado) |
| ES | `conturbar` | Se explica directamente que es inquietar o alterar a alguien. [DLE](https://dle.rae.es/conturbar) |
| ES | `contusionar` | Se explica que es causar una lesión al golpear o apretar el cuerpo, sin herida abierta. [DLE](https://dle.rae.es/contusionar) |
| ES | `contuso` | Se cambia la explicación médica por una frase directa sobre una lesión causada por un golpe. [DLE](https://dle.rae.es/contuso) |
| ES | `convaleciente` | Se elimina la etiqueta gramatical y se explica que es una persona que se recupera. [DLE](https://dle.rae.es/convaleciente) |
| ES | `convalidar` | Se separan sus sentidos académico y legal con frases cortas. [DLE](https://dle.rae.es/convalidar) |
| ES | `convector` | Se explica el aparato como un calefactor que mueve el aire y se aclara su uso en física. [DLE](https://dle.rae.es/convector) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones, los sinónimos y los ejemplos se sincronizan en las fuentes canónicas y el overlay español de `js/data.en.2.js`.
## Lote 449

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contribuidor` | Se explica como la persona que aporta algo a una causa o proyecto y se retira un sinónimo ambiguo. [DLE](https://dle.rae.es/contribuidor) |
| ES | `contribular` | Se conserva que es una palabra antigua y se explica con palabras comunes que causa tristeza o angustia. Se corrige el sinónimo del ejemplo. [DLE](https://dle.rae.es/contribular) |
| ES | `contristar` | Se explica que significa entristecer a alguien y se aclara su uso pronominal. Se sincronizan los sinónimos de la capa de correcciones. [DLE](https://dle.rae.es/contristar) |
| ES | `contrito` | Se cambia «haber obrado mal» por «haber hecho algo malo» y se retira un sinónimo menos común. [DLE](https://dle.rae.es/contrito) |
| ES | `controvertible` | Se sustituye la explicación gramatical por «se puede discutir o poner en duda». Se sincronizan los sinónimos de la capa de correcciones. [DLE](https://dle.rae.es/controvertible) |
| ES | `controvertir` | Se explica directamente que es discutir una afirmación o argumento y defender otra opinión. Se hace coincidir el ejemplo con un sinónimo sencillo. [DLE](https://dle.rae.es/controvertir) |
| ES | `contubernio` | Se explican por separado el acuerdo censurable y la vida en pareja de personas no casadas. Se conserva el tono crítico con palabras sencillas. [DLE](https://dle.rae.es/contubernio) |
| ES | `contumelia` | Se explica como un insulto grave dicho cara a cara y se ajusta el ejemplo a ese uso. [DLE](https://dle.rae.es/contumelia) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones, los sinónimos y los ejemplos se sincronizan en las fuentes canónicas y el overlay español de `js/data.en.2.js`; los sinónimos de `contristar` y `controvertible` también se sincronizan en `synonym-corrections-es.json`.
## Lote 448

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contrapuesto` | Se explica directamente que algo está puesto en contra de otra cosa y se aclara que es una forma de «contraponer». [DLE](https://dle.rae.es/contrapuesto) |
| ES | `contrariar` | Se explican en dos frases los sentidos de oponerse a lo que alguien quiere y disgustar. [DLE](https://dle.rae.es/contrariar) |
| ES | `contrariedad` | Se aclaran por separado el problema que dificulta lograr algo y la oposición entre dos cosas. [DLE](https://dle.rae.es/contrariedad) |
| ES | `contrasellar` | Se sustituye la etiqueta verbal y la explicación técnica por poner otro sello. Se ajusta el ejemplo. [DLE](https://dle.rae.es/contrasellar) |
| ES | `contrasello` | Se explica el sello pequeño y la marca que deja; se conserva la protección frente a copias falsas. [DLE](https://dle.rae.es/contrasello) |
| ES | `contrastar` | Se explican sus sentidos de mostrar diferencias y comprobar que algo sea auténtico o correcto. [DLE](https://dle.rae.es/contrastar) |
| ES | `contrasto` | Se conserva que es una palabra antigua y se explica directamente quién es un «contrasto». [DLE](https://dle.rae.es/contrasto) |
| ES | `contraventana` | Se explica qué parte de la ventana cubre y para qué sirve con palabras directas. Se ajustan sinónimos y ejemplo. [DLE](https://dle.rae.es/contraventana) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones, los sinónimos y los ejemplos se sincronizan en las fuentes canónicas y el overlay español de `js/data.en.2.js`.
## Lote 447

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contrapartida` | Se aclara la idea de compensar y se explica con palabras sencillas el sentido contable. [DLE](https://dle.rae.es/contrapartida) |
| ES | `contrapas` | Se cambia la explicación gramatical por una frase directa sobre el paso de baile. [DLE](https://dle.rae.es/contrap%C3%A1s) |
| ES | `contrapelo` | Se explica la locución «a contrapelo» y sus dos sentidos: ir contra el pelo y actuar contra lo habitual. [DLE](https://dle.rae.es/contrapelo) |
| ES | `contrapeso` | Se resumen sus sentidos de peso que equilibra y de algo que compensa o modera. Se retira un sinónimo poco claro. [DLE](https://dle.rae.es/contrapeso) |
| ES | `contrapicado` | Se explica la toma de cámara desde abajo y se ajusta el ejemplo. [DLE](https://dle.rae.es/contrapicado) |
| ES | `contraponer` | Se explican por separado los usos de comparar y poner algo contra otra cosa. [DLE](https://dle.rae.es/contraponer) |
| ES | `contraportada` | Se describe directamente la parte de atrás de un libro y se aclara el ejemplo. [DLE](https://dle.rae.es/contraportada) |
| ES | `contrapropuesta` | Se cambia la explicación larga por una propuesta que responde a otra y busca sustituirla. [DLE](https://dle.rae.es/contrapropuesta) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones, los sinónimos y los ejemplos se sincronizan en las fuentes canónicas y el overlay español de `js/data.en.2.js`.
## Lote 446

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contrahacer` | Se explican con frases breves los sentidos de copiar, falsificar, imitar y fingir. [DLE](https://dle.rae.es/contrahacer) |
| ES | `contrahecho` | Se aclara el sentido de cuerpo torcido o encorvado y se conserva el uso como forma de «contrahacer». Se ajusta el ejemplo y se deja un sinónimo claro. [DLE](https://dle.rae.es/contrahecho) |
| ES | `contraindicar` | Se reemplaza la explicación larga por dos frases sobre algo que puede hacer daño en ciertos casos. [DLE](https://dle.rae.es/contraindicar) |
| ES | `contraluz` | Se corrige al español una definición inglesa que persistía en las capas editoriales y se explican sus dos sentidos. [DLE](https://dle.rae.es/contraluz) |
| ES | `contramarca` | Se acorta la definición y se conservan los usos de distinguir objetos, indicar el pago de un impuesto y marcar monedas o medallas. [DLE](https://dle.rae.es/contramarca) |
| ES | `contramarcar` | Se explica directamente que es poner una segunda marca y se ajusta el ejemplo del sinónimo. [DLE](https://dle.rae.es/contramarcar) |
| ES | `contraoferta` | Se reemplaza la explicación larga por una oferta que responde a otra anterior. [DLE](https://dle.rae.es/contraoferta) |
| ES | `contraorden` | Se explica que es una orden que cambia o anula otra anterior. Se usa un sinónimo más claro en el ejemplo. [DLE](https://dle.rae.es/contraorden) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las fichas se sincronizan en las fuentes canónicas y el overlay español de `js/data.en.2.js`; la definición de `contraluz` también se corrige en `rebase-merge-09fc.json` y `synonym-corrections-es.json`.
## Lote 445

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contracultural` | Se explica como algo propio de un movimiento que rechaza las ideas aceptadas. Se conserva el sinónimo más claro. [DLE](https://dle.rae.es/contracultural) |
| ES | `contracurva` | Se quita la etiqueta gramatical y se explica directamente que la curva va en sentido contrario a la anterior. [DLE](https://dle.rae.es/contracurva) |
| ES | `contradictor` | Se explican por separado el uso para describir a alguien y el nombre de quien contradice. Se retiran sinónimos poco comunes. [DLE](https://dle.rae.es/contradictor) |
| ES | `contraejemplo` | Se explica con palabras directas que un contraejemplo demuestra que una regla no siempre se cumple. Se ajustan el sinónimo y los ejemplos. [DLE](https://dle.rae.es/contraejemplo) |
| ES | `contrafacer` | Se conserva que es una palabra antigua y se explican por separado sus sentidos de falsificar e ir contra una regla. [DLE](https://dle.rae.es/contrafacer) |
| ES | `contrafigura` | Se acorta la explicación del parecido y se conserva el uso teatral. Se mantienen el sinónimo y el ejemplo de la escena peligrosa. [DLE](https://dle.rae.es/contrafigura) |
| ES | `contrafuego` | Se acorta la explicación del fuego que detiene otro incendio y se corrige la capa que retiraba «contracandela». [DLE](https://dle.rae.es/contrafuego) |
| ES | `contraguardia` | Se explica su función de protección y se aclara «baluarte» con palabras sencillas. [DLE](https://dle.rae.es/contraguardia) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones y ejemplos se sincronizan en `js/data.es.js` y en el overlay español de `js/data.en.2.js`; los sinónimos de `contradictor` y `contrafigura` también se actualizan en `rebase-merge-09fc.json`, y los de `contrafuego` en `synonym-corrections-es.json`.
## Lote 444

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contorsionarse` | Se quita la etiqueta verbal y se explica el giro forzado del cuerpo. Se conserva «retorcerse» y se mantiene la situación de la acróbata. [DLE](https://dle.rae.es/contorsionarse) |
| ES | `contraataguia` | Se explica como una barrera que refuerza otra y frena el agua. Se simplifican los sinónimos y se conserva el ejemplo de instalación. [DLE](https://dle.rae.es/contraatagu%C3%ADa) |
| ES | `contrabalancear` | Se explican por separado el equilibrio de una balanza y la compensación de una fuerza o un efecto. Se simplifica el ejemplo. [DLE](https://dle.rae.es/contrabalancear) |
| ES | `contracara` | Se retira el sentido de reverso físico, que no corresponde a la ficha del DLE. Se define como aspecto opuesto o negativo y se adapta el sinónimo. [DLE](https://dle.rae.es/contracara) |
| ES | `contrachapado` | Se acorta la explicación del tablero y se conservan las capas pegadas y las fibras cruzadas. Se elimina el sinónimo en inglés. [DLE](https://dle.rae.es/contrachapado) |
| ES | `contracorriente` | Se explican por separado la corriente opuesta y el sentido de «a contracorriente». Se simplifican los sinónimos y el ejemplo. [DLE](https://dle.rae.es/contracorriente) |
| ES | `contractil` | Se quita la etiqueta gramatical y se explica directamente que algo puede contraerse. Se corrige el ejemplo para que coincida con el sinónimo. [DLE](https://dle.rae.es/contr%C3%A1ctil) |
| ES | `contracultura` | Se explican por separado el movimiento social y sus ideas y prácticas. Se conserva «cultura alternativa» y se adapta el ejemplo. [DLE](https://dle.rae.es/contracultura) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones y ejemplos se sincronizan en `js/data.es.js` y en el overlay español de `js/data.en.2.js`.
## Lote 443

| Idioma | ID | Decisión |
|---|---|---|
| ES | `continuismo` | Se simplifica como mantener una situación y evitar cambios. Se actualizan los sinónimos y el ejemplo. [DLE](https://dle.rae.es/continuismo) |
| ES | `contonearse` | Se reemplaza la explicación metalingüística por el movimiento del cuerpo al andar. Se adapta el ejemplo y se conserva un sinónimo sencillo. [DLE](https://dle.rae.es/contonear) |
| ES | `contoneo` | Se define como movimiento del cuerpo al andar. Se sustituye la lista de sinónimos por «balanceo» y se rehace el ejemplo. [DLE](https://dle.rae.es/contoneo) |
| ES | `contorcerse` | Se retiran la etiqueta verbal y «contorsionarse»; se explica el movimiento forzado y se adapta el ejemplo al sinónimo «retorcerse». [DLE](https://dle.rae.es/contorcerse) |
| ES | `contornado` | Se explica hacia qué lado mira el animal del escudo. Se quita «alterado», que no describe este sentido, y se simplifica el ejemplo. [DLE](https://dle.rae.es/contornado) |
| ES | `contornar` | Se quita la etiqueta verbal y se explica directamente la acción de rodear un lugar por el borde. Se simplifica el ejemplo. [DLE](https://dle.rae.es/contornar), [contornear](https://dle.rae.es/contornear) |
| ES | `contornear` | Se quita la etiqueta verbal y se explica directamente el sentido de rodear un lugar o seguir su borde. Se adapta el ejemplo. [DLE](https://dle.rae.es/contornear) |
| ES | `contorneo` | Se explican por separado dibujar el borde de una figura y rodear un lugar. Se retiran sinónimos de movimiento corporal que el DLE no recoge para esta palabra. [DLE](https://dle.rae.es/contorneo), [contornear](https://dle.rae.es/contornear) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones y ejemplos se sincronizan en `js/data.es.js` y en el overlay español de `js/data.en.2.js`; los sinónimos de `contoneo` también se actualizan en `synonym-corrections-es.json` y `rebase-merge-09fc.json`.
## Lote 442

| Idioma | ID | Decisión |
|---|---|---|
| ES | `contero` | Se quita la etiqueta técnica y se explica la moldura con palabras concretas. Se adapta el ejemplo a «moldura de cuentas». [DLE](https://dle.rae.es/contero) |
| ES | `contertulio` | Se sustituye la etiqueta gramatical por una explicación directa. Se conserva el sinónimo más claro y su ejemplo. [DLE](https://dle.rae.es/contertulio) |
| ES | `contestable` | Se explican por separado los sentidos de poder discutirse y poder recibir respuesta. Se simplifican los sinónimos y los ejemplos. [DLE](https://dle.rae.es/contestable) |
| ES | `conteston` | Se explica directamente la forma de responder y se retira una nota de registro que no aporta claridad. Se rehace el ejemplo. [DLE](https://dle.rae.es/contest%C3%B3n) |
| ES | `contextual` | Se quita la etiqueta gramatical y se explica la relación con la situación. Se adapta el ejemplo y el sinónimo. [DLE](https://dle.rae.es/contextual) |
| ES | `contextualizar` | Se quita la etiqueta verbal y se explica cómo añadir información para entender algo. Se emparejan los ejemplos. [DLE](https://dle.rae.es/contextualizar) |
| ES | `contextura` | Se explican por separado la unión de las partes y la forma del cuerpo. Se simplifican los sinónimos y el ejemplo. [DLE](https://dle.rae.es/contextura) |
| ES | `contiguidad` | Se explica la cercanía entre dos cosas, se quita un sinónimo repetido y se corrige «contigüidad» en el ejemplo. El ID interno se mantiene; el DLE recoge la forma con diéresis. [DLE](https://dle.rae.es/contiguidad), [contigüidad](https://dle.rae.es/contig%C3%BCidad) |

No se registran exclusiones nuevas. Las ocho entradas siguen activas. Las definiciones se sincronizan en `js/data.es.js` y en el overlay español de `js/data.en.2.js`; `contestón` también en `rebase-merge-09fc.json`, y los sinónimos de `contestable` en `synonym-corrections-es.json`.

## Lote 441

| Idioma | ID | Decisión |
|---|---|---|
| ES | `consustanciarse` | Se explica directamente como identificarse mucho y se conserva la variante escrita con «b». Se adapta el ejemplo. [DLE](https://dle.rae.es/consustanciarse) |
| ES | `contaminador` | Se sustituye la etiqueta gramatical por el significado directo y se retira el uso como sustantivo, que el DLE no recoge en esta entrada. Se conserva «contaminante». [DLE](https://dle.rae.es/contaminador) |
| ES | `contemporaneidad` | Se explica con palabras directas que dos hechos ocurren en la misma época. Se mantienen sinónimos y ejemplo. [DLE](https://dle.rae.es/contemporaneidad) |
| ES | `contemporizador` | Se cambia la explicación circular por una frase directa sobre adaptarse a otros para evitar problemas. [DLE](https://dle.rae.es/contemporizador), [contemporizar](https://dle.rae.es/contemporizar) |
| ES | `contemporizar` | Se simplifica «acomodarse al gusto o dictamen ajeno» y se adapta el ejemplo a «transigir». [DLE](https://dle.rae.es/contemporizar) |
| ES | `contender` | Se explican por separado la lucha o competición y el debate. Se conserva el ejemplo deportivo con «competir». [DLE](https://dle.rae.es/contender) |
| ES | `contentadizo` | Se sustituyen las etiquetas gramaticales por una explicación directa y se rehace el ejemplo. Se conserva el sentido de «mal contentadizo». [DLE](https://dle.rae.es/contentadizo) |
| ES | `contera` | Se acortan los sentidos del protector y los remates, manteniendo cañón, estribillo y sextina. Se sincronizan el overlay editorial y el rebase. [DLE](https://dle.rae.es/contera) |

No se registran exclusiones nuevas en este lote. Las ocho entradas siguen activas.

## Lote 440

| Idioma | ID | Decisión |
|---|---|---|
| ES | `constrinir` | Se conserva que es una forma antigua de «constreñir» y se explican con verbos sencillos sus sentidos. Se usa «obligar» en el ejemplo. [DLE](https://dle.rae.es/constri%C3%B1ir), [constreñir](https://dle.rae.es/constre%C3%B1ir) |
| ES | `constructo` | Se quitan las etiquetas técnicas y se explican por separado el concepto y su uso en psicología. Se acorta el ejemplo y se cambia el sinónimo. [DLE](https://dle.rae.es/constructo) |
| ES | `consubstanciarse` | Se explica la variante ortográfica y se sustituye «identificarse íntimamente» por palabras directas. Se ajusta el ejemplo. [DLE](https://dle.rae.es/consustanciarse) |
| ES | `consuegro` | Se explica la relación familiar y se retiran «coterráneo» y «paisano», que no significan lo mismo. Se cambia el ejemplo al sinónimo. [DLE](https://dle.rae.es/consuegro) |
| ES | `consueta` | Se quitan las etiquetas gramaticales y se explican el apuntador de teatro, los rezos de ciertos días y las reglas de algunas iglesias. Se adapta el ejemplo. [DLE](https://dle.rae.es/consueta) |
| ES | `consueto` | Se explica directamente como algo que se hace por costumbre o es habitual. Se conserva que es una palabra poco usada y se retira el sentido eclesiástico, que el DLE recoge en la entrada distinta «consueta». [DLE](https://dle.rae.es/consueto), [consueta](https://dle.rae.es/consueta) |
| ES | `consuntivo` | Se explican con palabras directas sus dos sentidos: el consumo y las enfermedades que debilitan el cuerpo. Se adapta el sinónimo y el ejemplo al uso de gastos. [DLE](https://dle.rae.es/consuntivo) |
| ES | `consustancial` | Se simplifica el sentido general y se aclara el uso de la fe católica. Se conserva el ejemplo con «inherente». [DLE](https://dle.rae.es/consustancial) |

No se registran exclusiones nuevas en este lote. Las ocho entradas siguen activas.

## Lote 439

| Idioma | ID | Decisión |
|---|---|---|
| ES | `constar` | Se quita la etiqueta verbal y se explican directamente los sentidos de ser cierto, quedar registrado y tener varias partes. Se adapta el ejemplo. [DLE](https://dle.rae.es/constar) |
| ES | `consternar` | Se sustituye «conturbar» por una explicación directa y se simplifica el ejemplo con «entristecer». [DLE](https://dle.rae.es/consternar) |
| ES | `constipado` | Se elimina la etiqueta gramatical y se define directamente como catarro o resfriado. El parche de sinónimos ya retira «resfrío»; el runtime conserva «resfriado». [DLE](https://dle.rae.es/constipado) |
| ES | `constipar` | Se quita la etiqueta verbal y se explican por separado cerrar los poros y resfriarse. Se conserva la nota sobre la teoría antigua en el ejemplo. [DLE](https://dle.rae.es/constipar) |
| ES | `constituir` | Se sustituyen las etiquetas y las listas gramaticales por los sentidos de formar, crear y asumir una obligación. Se ajusta el ejemplo a «formar». [DLE](https://dle.rae.es/constituir) |
| ES | `constitutivo` | Se elimina la etiqueta gramatical y se explica que algo forma parte esencial de otra cosa y ayuda a distinguirla. Se adapta el ejemplo a «esencial». [DLE](https://dle.rae.es/constitutivo) |
| ES | `constrictivo` | Se sustituyen «constriñe» y «coercitivo» por palabras directas; se conservan el sentido general y el fonético con un ejemplo claro. [DLE](https://dle.rae.es/constrictivo) |
| ES | `constringir` | Se explica directamente como una palabra antigua para obligar, apretar o limitar. Se reemplaza el ejemplo metalingüístico por uno concreto. [DLE](https://dle.rae.es/constringir) |

No se registran exclusiones nuevas en este lote. Las ocho entradas siguen activas.

## Lote 438

| Idioma | ID | Decisión |
|---|---|---|
| ES | `consiervo` | Se quita la etiqueta gramatical y se explica de forma directa que es un esclavo que sirve al mismo amo que otros. Se simplifica el ejemplo. [DLE](https://dle.rae.es/consiervo) |
| ES | `consistir` | Se sustituyen «estribar» y «efecto» por palabras comunes. El ejemplo muestra el uso de estar formado por algo. [DLE](https://dle.rae.es/consistir) |
| ES | `consoldar` | Se conserva con palabras sencillas que es una forma antigua de «consolidar» y se ajusta el ejemplo. [DLE](https://dle.rae.es/consoldar), [consolidar](https://dle.rae.es/consolidar) |
| ES | `consolidado` | Se quita la etiqueta gramatical y se explica directamente que algo se ha vuelto firme o estable. Se mantiene el ejemplo con «establecido». [DLE](https://dle.rae.es/consolidar) |
| ES | `consome` | Se elimina la etiqueta gramatical y se define directamente como caldo concentrado de carne. Se conserva el ejemplo. [DLE](https://dle.rae.es/consom%C3%A9) |
| ES | `consonante` | Revisada de nuevo porque el parche de rebase restauraba la definición anterior. Se simplifica la definición de sonido y letra, la rima y el uso de «de acuerdo»; se alinean las capas editoriales y el parche. [Lote 208](#lote-208), [DLE](https://dle.rae.es/consonante) |
| ES | `conspicuo` | Se cambian «ilustre» y «sobresaliente» por expresiones directas para sus sentidos de fama, importancia y visibilidad. Se conserva el ejemplo. [DLE](https://dle.rae.es/conspicuo) |
| ES | `constable` | Se simplifica la definición y se conserva el uso policial y el cargo histórico. Para el sentido policial se consulta Collins, pues el DLE recoge otro uso español desusado. [Collins](https://www.collinsdictionary.com/dictionary/english/constable), [DLE](https://dle.rae.es/constable) |

No se registran exclusiones nuevas en este lote. Las ocho entradas siguen activas.

## Lote 437

| Idioma | ID | Decisión |
|---|---|---|
| ES | `consanguinidad` | Se sustituye la etiqueta gramatical por «parentesco de sangre» y se simplifica el ejemplo. [DLE](https://dle.rae.es/consanguinidad) |
| ES | `conseja` | Se explica directamente como cuento antiguo; se quita «patraña» y se adapta el ejemplo al sinónimo. [DLE](https://dle.rae.es/conseja) |
| ES | `consejar` | Se explican sus dos sentidos con palabras sencillas y se conserva que es una palabra antigua. El ejemplo muestra el uso de aconsejar. [DLE](https://dle.rae.es/consejar) |
| ES | `consentidor` | Se elimina la fórmula gramatical y se explica que la persona permite algo que podría impedir. Se acorta el ejemplo. [DLE](https://dle.rae.es/consentidor) |
| ES | `conserjeria` | Se explican por separado el lugar y el trabajo del conserje. Se ajustan los sinónimos y el ejemplo al sentido de lugar. [DLE](https://dle.rae.es/conserjer%C3%ADa) |
| ES | `conservadurismo` | Se quita la etiqueta gramatical y se explican directamente sus sentidos general y político. Se cambia el ejemplo al sinónimo sencillo. [DLE](https://dle.rae.es/conservadurismo) |
| ES | `conservativo` | Se elimina la etiqueta gramatical y se explica directamente qué hace algo conservativo. Se usa «conservador» en el ejemplo. [DLE](https://dle.rae.es/conservativo) |
| ES | `considerador` | Se sustituye la fórmula «que considera» por una explicación directa y se ajusta el ejemplo a «reflexivo». La voz figura en repertorios académicos e históricos. [DLE](https://dle.rae.es/considerador), [Tesoro de los diccionarios históricos de la RAE](https://temporalweb.asale.org/tdhle/considerador) |

No se registran exclusiones nuevas en este lote. Las ocho entradas siguen activas.

## Lote 436

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conopeo` | Se quitan las etiquetas de género y liturgia, y se explica el velo con palabras conocidas. Se añade una aclaración breve sobre el sagrario y se sustituye «tiempo litúrgico» por una situación concreta. [DLE](https://dle.rae.es/conopeo) |
| ES | `conqueridor` | Se quitan las etiquetas gramaticales y se conserva que es una palabra antigua. La definición y el ejemplo explican directamente que nombra a quien conquista un lugar. [DLE](https://dle.rae.es/conqueridor) |
| ES | `conquiforme` | Se elimina la etiqueta gramatical y se conserva la definición directa «Que tiene forma de concha». Se cambia el sinónimo técnico por una frase sencilla y se alinea el ejemplo. [DLE](https://dle.rae.es/conquiforme) |
| ES | `conquiliologia` | Se quitan las etiquetas gramaticales y «zoología». Se explica qué estudia y se aclara qué son los moluscos con ejemplos. Se elimina «malacología», que nombra un campo más amplio. [DLE](https://dle.rae.es/conquiliolog%C3%ADa) |
| ES | `conquistable` | Se quitan las etiquetas y «asequible» y «obtenible». Se conservan por separado los sentidos de conquistar y de conseguir algo con facilidad. [DLE](https://dle.rae.es/conquistable) |
| ES | `conrear` | Se cambia la explicación técnica por dos usos directos: preparar una tela o un terreno y trabajar la tierra por segunda vez. Se adapta el ejemplo y el término resaltado. [DLE](https://dle.rae.es/conrear) |
| ES | `consabido` | Se quitan las etiquetas y la frase larga sobre quienes comparten una situación. Se conservan sus sentidos de algo ya conocido y de algo habitual; se elimina «consensuado», que no equivale. [DLE](https://dle.rae.es/consabido) |
| ES | `consagrar` | Se quita la etiqueta gramatical y se explican en dos frases sus usos religiosos, de dedicación, fama y reconocimiento oficial. Se acortan el sinónimo y el ejemplo. [DLE](https://dle.rae.es/consagrar) |

No se registran exclusiones nuevas en este lote. Las ocho entradas siguen activas.
## Lote 435

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conmocionar` | Se eliminan las etiquetas gramaticales y términos difíciles. Se explican por separado causar una impresión fuerte y quedar muy afectado; se ajusta el ejemplo. [DLE](https://dle.rae.es/conmocionar) |
| ES | `conmover` | Se explican directamente los sentidos de afectar mucho y causar ternura o compasión. Se simplifica el ejemplo con «emocionar». [DLE](https://dle.rae.es/conmover) |
| ES | `conmutador` | Se quita la etiqueta gramatical y se explican por separado los sentidos eléctrico y telefónico. Se conserva que el uso telefónico es regional. [DLE](https://dle.rae.es/conmutador) |
| ES | `conmutatriz` | Se quitan las etiquetas gramaticales y técnicas, y se explica directamente el cambio entre corriente alterna y continua. Se acortan el ejemplo y el sinónimo. [DLE](https://dle.rae.es/conmutatriz) |
| ES | `connacional` | Se quitan las etiquetas gramaticales y se define con palabras directas. Se elimina «paisano», que no siempre significa lo mismo, y se acorta el ejemplo. [DLE](https://dle.rae.es/connacional) |
| ES | `connatural` | Se quitan las etiquetas y «innato» e «inherente». Se explica con «propio por naturaleza» y se adapta el ejemplo a «natural». [DLE](https://dle.rae.es/connatural) |
| ES | `connaturalizar` | Se quitan las etiquetas gramaticales y se explican con palabras comunes los sentidos de hacer algo propio y acostumbrarse a algo nuevo. [DLE](https://dle.rae.es/connaturalizar) |
| ES | `conocible` | Se quitan las etiquetas gramaticales y se cambia la explicación larga por «Que se puede conocer». Se reemplaza «cognoscible» por una frase sencilla y se adapta el ejemplo. [DLE](https://dle.rae.es/conocible) |

No se registran exclusiones nuevas en este lote. Las ocho entradas siguen activas.
## Lote 434

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conjurar-3` | Se mantiene la explicación directa del sentido de decir oraciones para expulsar un espíritu; queda separado del sentido de invocarlo. [DLE](https://dle.rae.es/conjurar) |
| ES | `conjurar-4` | Se mantiene la explicación directa del sentido de llamar a un espíritu para que se presente; queda separado del sentido de expulsarlo. [DLE](https://dle.rae.es/conjurar) |
| ES | `conllevador` | Se quita la etiqueta gramatical y se define directamente como algo que implica o produce otra cosa; se alinea el ejemplo. [DLE](https://dle.rae.es/conllevador) |
| ES | `conllevar` | Se quita la etiqueta gramatical y se explican por separado sus sentidos de implicar una consecuencia, soportar algo difícil o aguantar el mal carácter de alguien. [DLE](https://dle.rae.es/conllevar) |
| ES | `conllorar` | Se quita la etiqueta gramatical y se explican en dos frases los sentidos de acompañar a alguien que sufre y compartir la tristeza por una desgracia. [DLE](https://dle.rae.es/conllorar) |
| ES | `conmensurar` | Se quita la etiqueta gramatical y se simplifica la idea de medir dos cosas para ver si guardan la misma proporción. [DLE](https://dle.rae.es/conmensurar) |
| ES | `conminuta` | Se conserva el sentido médico de la fractura y se cambia «fragmentos» por «trozos» para facilitar la lectura; se alinea el sinónimo y el ejemplo. [DLE](https://dle.rae.es/conminuta) |
| ES | `conmiserativo` | Se quita la etiqueta gramatical y se reemplaza «conmiseración» por «compasión o lástima»; se simplifica el ejemplo. [DLE](https://dle.rae.es/conmiserativo) |

No se registran exclusiones nuevas en este lote.

## Lote 433

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conjetural` | Se quita la etiqueta gramatical y se explica directamente que algo se basa en suposiciones sin demostrar; se simplifica el ejemplo. [DLE](https://dle.rae.es/conjetural) |
| ES | `conjeturar` | Se elimina la etiqueta gramatical y se define con palabras sencillas como formar una idea probable a partir de indicios; se ajusta el sinónimo del ejemplo. [DLE](https://dle.rae.es/conjeturar) |
| ES | `conjugable` | Se reemplaza la explicación técnica sobre persona, tiempo y modo por una frase directa sobre cómo cambia un verbo. [DLE](https://dle.rae.es/conjugable) |
| ES | `conjuntar` | Se quita la etiqueta gramatical, se explica la idea de combinar cosas para que queden bien juntas y se conserva con palabras sencillas su sentido antiguo de «juntar». [DLE](https://dle.rae.es/conjuntar) |
| ES | `conjuntival` | Se aclara con una frase breve que significa «de la conjuntiva» y se conserva una explicación sencilla de dónde está esa capa del ojo. [DLE](https://dle.rae.es/conjuntival) |
| ES | `conjuntivitis` | Se divide la explicación en frases breves: qué es la conjuntiva, dónde está y cuáles son causas posibles; se retira «ojo rojo» porque es un síntoma, no un sinónimo exacto. [DLE](https://dle.rae.es/conjuntivitis) |
| ES | `conjurar` | Se mantiene separado el sentido activo de unirse para actuar contra alguien y se corrige la fuente base, que tenía el sentido de hacer un exorcismo. [DLE](https://dle.rae.es/conjurar) |
| ES | `conjurar-2` | Se mantiene la definición directa de evitar o alejar un peligro; se conserva como ficha separada del sentido de conspirar de `conjurar`. [DLE](https://dle.rae.es/conjurar) |

No se registran exclusiones nuevas en este lote.

## Lote 432

| Idioma | ID | Decisión |
|---|---|---|
| ES | `congrua` | Se mantienen su sentido de «adecuada» y el sentido jurídico, pero se expresan con frases breves y se aclara el ejemplo del pago mínimo. [DLE](https://dle.rae.es/congruo) |
| ES | `conguito` | Excluida: la definición activa «cantidad muy pequeña» no coincide con los sentidos regionales documentados por el DLE y el Diccionario de americanismos. No se sustituye por otro significado sin validar la fuente de la ficha. [DLE](https://dle.rae.es/conguito), [Diccionario de americanismos](https://temporalweb.asale.org/damer/conguito) |
| ES | `conhortar` | Se cambia la etiqueta «desusado» por «palabra antigua» y se explican directamente los sentidos de consolar y dar ánimo. [DLE](https://dle.rae.es/conhortar) |
| ES | `conhorte` | Se cambia la etiqueta «desusado» por «palabra antigua» y se define directamente como consuelo o ánimo. [DLE](https://dle.rae.es/conhorte) |
| ES | `conica` | Se elimina la explicación técnica extensa y se explica con palabras más comunes cómo se forma la curva; se conservan sus ejemplos geométricos. [DLE](https://dle.rae.es/c%C3%B3nica) |
| ES | `conicidad` | Se explica como forma de cono o medida de cuánto se estrecha una pieza; se ajustan el sinónimo y el ejemplo al sentido técnico. [DLE](https://dle.rae.es/conicidad) |
| ES | `conico` | Se quita la etiqueta gramatical y se conserva la explicación directa de que tiene forma de cono o guarda relación con él; se retira el sinónimo menos conocido. [DLE](https://dle.rae.es/c%C3%B3nico) |
| ES | `conjeturador` | Se sustituye la etiqueta gramatical y la explicación técnica por «Que hace suposiciones a partir de indicios»; se retira el sinónimo de la misma familia que el lema. [DLE](https://dle.rae.es/conjeturador) |

## Lote 431

| Idioma | ID | Decisión |
|---|---|---|
| ES | `congojar` | Se corrige la fuente base, que definía la palabra con una explicación metalingüística; la capa activa ya usa una explicación directa. [DLE](https://dle.rae.es/congojar) |
| ES | `congojoso` | Se quita la etiqueta gramatical y la definición circular; se explican por separado los sentidos de causar angustia y sentirla. [DLE](https://dle.rae.es/congojoso) |
| ES | `congosto` | Se elimina la etiqueta gramatical y se define directamente como un paso estrecho entre montañas; se mantiene el ejemplo contextual. [DLE](https://dle.rae.es/congosto) |
| ES | `congraciador` | Se sustituye la definición circular por una explicación directa y sencilla de quien intenta ganarse la simpatía de alguien. [DLE](https://dle.rae.es/congraciador) |
| ES | `congraciar` | Se quitan las etiquetas gramaticales y se separan en dos frases los sentidos de despertar simpatía y ganársela; se alinea el sinónimo con el ejemplo. [DLE](https://dle.rae.es/congraciar) |
| ES | `congratular` | Se definen sus sentidos con frases breves y se conserva el uso americano de «felicitar»; se actualizan también las capas de corrección. [DLE](https://dle.rae.es/congratular) |
| ES | `congregar` | Se mantiene la definición directa del runtime y se corrige la fuente base, que explicaba la palabra mediante «congregación». [DLE](https://dle.rae.es/congregar) |
| ES | `congresual` | Se mantiene la definición directa del runtime y se corrige la fuente base, que repetía una descripción gramatical. [DLE](https://dle.rae.es/congresual) |

No se registran exclusiones nuevas en este lote.

## Lote 430

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conglobar` | Se conserva la explicación directa del runtime y se corrige la fuente base, que tenía una definición en forma de glosa y ejemplos metalingüísticos. [DLE](https://dle.rae.es/conglobar) |
| ES | `conglomerado` | Se aclara que este registro se refiere a un grupo de empresas; se alinea la definición con el sinónimo y el ejemplo. [DLE](https://dle.rae.es/conglomerado) |
| ES | `conglomerado-geological-rock` | Se cambia «fragmentos» por «trozos» para facilitar la lectura; se mantienen el sentido geológico, el sinónimo y el ejemplo. [DLE](https://dle.rae.es/conglomerado) |
| ES | `conglomerado-pressed-wood-board` | Se mantiene la definición directa del tablero de madera, con su sinónimo y ejemplo coherentes. [DLE](https://dle.rae.es/conglomerado) |
| ES | `conglomerante` | Se sustituye la explicación química extensa por una frase concreta sobre cómo une materiales; se alinea con el ejemplo de arena y grava. [DLE](https://dle.rae.es/conglomerante) |
| ES | `conglomerar` | Se quita la etiqueta gramatical y se separan en dos frases los sentidos de juntar y unir trozos para formar una masa; se simplifican sinónimos y ejemplo. [DLE](https://dle.rae.es/conglomerar) |
| ES | `conglutinoso` | Se reemplaza la definición circular por una explicación directa de que algo sirve para pegar; se hace más concreto el ejemplo. [DLE](https://dle.rae.es/conglutinoso) |
| ES | `congoja` | Se retira la etiqueta gramatical y se explican por separado la angustia intensa y los sentidos de cansancio o desmayo; el ejemplo ilustra el primero. [DLE](https://dle.rae.es/congoja) |

No se registran exclusiones nuevas en este lote.

## Lote 429

| Idioma | ID | Decisión |
|---|---|---|
| ES | `congenere` | Se quitan las etiquetas gramaticales y se explica que algo es del mismo tipo o tiene el mismo origen; se simplifican el ejemplo y los sinónimos. [DLE](https://dle.rae.es/cong%C3%A9nere) |
| ES | `congenial` | Se corrige la definición con las acepciones españolas documentadas: algo acorde con el carácter y algo presente desde el nacimiento. Se alinean sinónimo y ejemplo con la primera. [DLE](https://dle.rae.es/congenial) |
| ES | `congenito` | Se quita la etiqueta gramatical y se explica directamente que algo está presente desde el nacimiento; se retiran sinónimos que podían confundirse con «hereditario». [DLE](https://dle.rae.es/cong%C3%A9nito) |
| ES | `congerie` | Se explican con palabras sencillas sus sentidos de montón antiguo y lista de palabras parecidas en un discurso; se retira «sinatroísmo». [DLE](https://dle.rae.es/congerie) |
| ES | `congeries` | Se resume la figura retórica como acumulación de palabras o frases parecidas; se retira el sinónimo técnico. [DLE](https://dle.rae.es/congeries) |
| ES | `congestion` | Se resume en dos frases el sentido de acumulación que dificulta el paso, con ejemplos de tráfico y salud; se eliminan las aclaraciones entre paréntesis. [DLE](https://dle.rae.es/congesti%C3%B3n) |
| ES | `congestionar` | Se quitan las etiquetas gramaticales y se separan en dos frases los sentidos de acumular sangre y dificultar el paso. [DLE](https://dle.rae.es/congestionar) |
| ES | `congio` | Se explica la medida con palabras sencillas y se conserva su equivalencia aproximada de tres litros. [DLE](https://dle.rae.es/congio) |

No se registran exclusiones nuevas en este lote.

## Lote 428

| Idioma | ID | Decisión |
|---|---|---|
| ES | `confrontar` | Se conserva el sentido activo de poner a dos personas frente a frente y se alinea la fuente base con el ejemplo. [DLE](https://dle.rae.es/confrontar) |
| ES | `confucianismo` | Se sustituyen las etiquetas gramaticales y la descripción larga por una explicación directa de la religión y sus enseñanzas. [DLE](https://dle.rae.es/confucianismo) |
| ES | `confucionismo` | Se quita la explicación de variante y se define directamente la religión y las enseñanzas de Confucio. [DLE](https://dle.rae.es/confucionismo) |
| ES | `confundir` | Se mantiene el sentido activo de tomar a alguien o algo por otra persona o cosa; se reemplaza el ejemplo metalingüístico. [DLE](https://dle.rae.es/confundir) |
| ES | `confuso` | Se simplifica el sentido activo: algo difícil de entender; se conserva el ejemplo del informe. [DLE](https://dle.rae.es/confuso) |
| ES | `confutador` | Se quitan las etiquetas gramaticales y los sinónimos técnicos; se explica que rebate una afirmación o argumento. [DLE](https://dle.rae.es/confutador) |
| ES | `congelable` | Se quita la etiqueta gramatical y se cambia el sinónimo difícil por «apto para congelar»; se ajusta el ejemplo. [DLE](https://dle.rae.es/congelable) |
| ES | `congelamiento` | Se explica el daño que el frío causa en la piel y se alinea el ejemplo con «daño por el frío». [DLE](https://dle.rae.es/congelamiento) |

Las listas editoriales ya excluyen los sentidos `confrontar-comparar-datos`, `confundir-mezclar-cosas` y `confuso-desorientado`. Este lote revisa solo las fichas activas `confrontar`, `confundir` y `confuso`, que tienen otros sentidos. No se modifican ni presentan como activas las exclusiones.

No se registran exclusiones nuevas en este lote.

## Lote 427

| Idioma | ID | Decisión |
|---|---|---|
| ES | `confortable` | Se acorta la definición al sentido de comodidad y se corrige «a gusto». El ejemplo del sillón y «cómodo» encajan. [DLE](https://dle.rae.es/confortable) |
| ES | `confortador` | Se quitan las etiquetas gramaticales y se explica directamente que algo o alguien da ánimo o consuelo; se conserva un sinónimo claro. [DLE](https://dle.rae.es/confortador) |
| ES | `confortante` | La definición ya explica directamente que algo da consuelo; se conserva un ejemplo breve con «reconfortante». [DLE](https://dle.rae.es/confortante) |
| ES | `confortar` | Se quitan las etiquetas gramaticales y se resumen los sentidos de dar ánimo, consuelo o fuerza. [DLE](https://dle.rae.es/confortar) |
| ES | `conforte` | Se explica directamente como ayuda o consuelo y se mantiene, con palabras sencillas, que es una palabra antigua. El ejemplo usa «consuelo». [DLE](https://dle.rae.es/conforte) |
| ES | `conforto` | Se explica directamente como ayuda o consuelo y se mantiene que se usa poco. Se cambia el sinónimo y se simplifica el ejemplo. [DLE](https://dle.rae.es/conforto) |
| ES | `confraternidad` | Se separan con claridad los sentidos de relación entre hermanos y amistad cercana; se simplifica el ejemplo y se alinea con «amistad». [DLE](https://dle.rae.es/confraternidad) |
| ES | `confraternizar` | Se sustituye «camaradería» y la explicación formal por «llevarse bien»; se alinea el ejemplo con ese sinónimo. [DLE](https://dle.rae.es/confraternizar) |

No se registran exclusiones nuevas en este lote.

## Lote 426

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conflictividad` | Se sustituye la explicación circular por una frase directa sobre la frecuencia de desacuerdos o enfrentamientos; se ajusta el ejemplo al sinónimo. [DLE](https://dle.rae.es/conflictividad) |
| ES | `conflictivo` | Se quita la etiqueta gramatical y se explican por separado el uso para situaciones y para personas. [DLE](https://dle.rae.es/conflictivo) |
| ES | `conflicto-de-interes` | Se acorta la explicación y se explica que basta con que un interés personal pueda influir, incluso en apariencia; se revisan los sinónimos y el ejemplo. [DLE](https://dle.rae.es/conflicto), [interés](https://dle.rae.es/inter%C3%A9s) |
| ES | `conflictual` | Se quita la etiqueta gramatical y la equivalencia metalingüística; se alinea el ejemplo con «conflictivo». [DLE](https://dle.rae.es/conflictual) |
| ES | `confluente` | La definición, el sinónimo y el ejemplo ya explican con claridad que algo se une con otra cosa. [DLE](https://dle.rae.es/confluente) |
| ES | `confluir` | Se explica directamente la unión de ríos, caminos o personas y la coincidencia de ideas; se conserva un ejemplo concreto. [DLE](https://dle.rae.es/confluir) |
| ES | `conformismo` | La definición ya es directa; se cambia el sinónimo por «aceptación pasiva» y se ajusta el ejemplo para que la sustitución encaje. [DLE](https://dle.rae.es/conformismo) |
| ES | `confortabilidad` | Se sustituye la explicación circular por una frase sencilla sobre comodidad y se alinean el sinónimo y el ejemplo. [DLE](https://dle.rae.es/confortabilidad) |

No se registran exclusiones nuevas en este lote.

## Lote 425

| Idioma | ID | Decisión |
|---|---|---|
| ES | `confirmante` | Se quita la etiqueta gramatical; se conserva el ejemplo de una prueba que confirma una hipótesis. [DLE](https://dle.rae.es/confirmante) |
| ES | `confiscacion` | Se explica la confiscación como una autoridad que quita bienes por orden legal; se conserva «decomiso». [DLE](https://dle.rae.es/confiscaci%C3%B3n) |
| ES | `confiscar` | Se explica quién quita los bienes y dónde van; se aclara con palabras simples que no siempre equivale a una retirada temporal. [DLE](https://dle.rae.es/confiscar) |
| ES | `confit` | Se sustituye «conservada» por «guardada» y se alinea la explicación con el plato de pato. [DLE](https://dle.rae.es/confit) |
| ES | `confite` | Se explica directamente qué dulce es y se conserva que suele usarse en plural. [DLE](https://dle.rae.es/confite) |
| ES | `confitera` | Se separan los sentidos de persona y recipiente; se ajusta el ejemplo y su sinónimo al sentido de persona. [DLE](https://dle.rae.es/confitera) |
| ES | `confiteria` | Se resumen con palabras sencillas los sentidos de tienda y trabajo de preparar dulces. [DLE](https://dle.rae.es/confiter%C3%ADa) |
| ES | `conflagrar` | Se quita la etiqueta gramatical y se simplifican la definición y el ejemplo. [DLE](https://dle.rae.es/conflagrar) |

No se registran exclusiones nuevas en este lote.

## Lote 424

| Idioma | ID | Decisión |
|---|---|---|
| ES | `confiador` | Se explica como quien garantiza una deuda junto con otra persona y se conserva que es una palabra antigua. [DLE](https://dle.rae.es/confiador), [cofiador](https://dle.rae.es/cofiador) |
| ES | `confidencialidad` | Se sustituye la explicación larga y normativa por una frase concreta sobre quién puede ver información privada; se retira un sinónimo demasiado limitado. [DLE](https://dle.rae.es/confidencialidad) |
| ES | `confidente` | Se quitan las etiquetas gramaticales y se resumen los usos de persona de confianza e informante secreto. [DLE](https://dle.rae.es/confidente) |
| ES | `configuracion-privacidad` | La definición ya explica con palabras directas quién puede ver la información; el ejemplo y sus sinónimos encajan. |
| ES | `confin` | Se explican directamente el uso adjetivo y los dos sentidos de límite. [DLE](https://dle.rae.es/conf%C3%ADn) |
| ES | `confinante` | Se deja claro que comparte un límite con otra zona y se alinea el ejemplo con «contiguo». [DLE](https://dle.rae.es/confinante) |
| ES | `confinar` | Se resumen en dos frases los sentidos de obligar a permanecer en un lugar y compartir límite con otro territorio. [DLE](https://dle.rae.es/confinar) |
| ES | `confirmador` | Se quita la etiqueta gramatical y se acorta el ejemplo para mostrar el uso con claridad. [DLE](https://dle.rae.es/confirmador) |

No se registran exclusiones nuevas en este lote.

## Lote 423

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conferir` | Se quitan las etiquetas gramaticales y se resumen los sentidos principales y poco frecuentes en dos frases. [DLE](https://dle.rae.es/conferir) |
| ES | `confesable` | Se explica directamente que algo se puede contar o admitir; se alinea el sinónimo y su ejemplo. [DLE](https://dle.rae.es/confesable) |
| ES | `confesional` | Se cambia la explicación metalingüística por una frase directa sobre su relación con la religión. [DLE](https://dle.rae.es/confesional) |
| ES | `confesionalidad` | Se explica el vínculo oficial de una institución con una religión y se alinea el ejemplo con el sinónimo. [DLE](https://dle.rae.es/confesionalidad) |
| ES | `confesor` | La definición y el ejemplo son breves y explican directamente el uso religioso. [DLE](https://dle.rae.es/confesor) |
| ES | `confiabilidad` | Se reemplaza «cualidad» por una explicación más directa y se conserva «fiabilidad» como sinónimo. [DLE](https://dle.rae.es/confiabilidad) |
| ES | `confiabilidad-function` | Se revisa el sentido de probabilidad y se simplifica la frase del sinónimo para que encaje en el ejemplo. [DLE](https://dle.rae.es/confiabilidad) |
| ES | `confiado` | Se explica directamente que la persona confía demasiado y no actúa con prudencia. [DLE](https://dle.rae.es/confiado) |

No se registran exclusiones nuevas en este lote.

## Lote 422

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conexion-segura-https` | Se explica HTTPS como una conexión que protege los datos enviados a una página web; se mantiene el ejemplo de HTTPS. |
| ES | `conexionarse` | Se quitan las etiquetas gramaticales y se explica el uso poco frecuente con palabras directas. [DLE](https://dle.rae.es/conexionar) |
| ES | `confabulador` | Se explican el sentido actual y el sentido antiguo de contar fábulas; se simplifica el ejemplo. [DLE](https://dle.rae.es/confabulador) |
| ES | `confabularse` | Se resume el acuerdo secreto para hacer algo malo; se mantiene el ejemplo de ocultar pruebas. [DLE](https://dle.rae.es/confabular) |
| ES | `confeccionador` | Se cambia la explicación circular por una descripción breve que cubre hacer o preparar cosas; se simplifica el ejemplo de los uniformes. [DLE](https://dle.rae.es/confeccionador) |
| ES | `confederal` | Se explica el adjetivo con una unión de grupos o estados; se conserva el sinónimo «confederativo» y su ejemplo. [DLE](https://dle.rae.es/confederal), [confederación](https://dle.rae.es/confederaci%C3%B3n) |
| ES | `conferenciante` | Se sustituye «diserta» por «habla» y se conserva el ejemplo de preguntas del público. [DLE](https://dle.rae.es/conferenciante) |
| ES | `conferenciar` | Se quita la etiqueta gramatical y se separan los sentidos de reunirse y hablar en público. [DLE](https://dle.rae.es/conferenciar) |

No se registran exclusiones nuevas en este lote.

## Lote 421

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coneja` | Se explican el animal y el uso insultante sobre una mujer; se deja claro que el segundo sentido es ofensivo. [DLE](https://dle.rae.es/conejo) |
| ES | `conejal` | Se sustituye la referencia circular a «conejar» por una explicación directa del lugar. [DLE](https://dle.rae.es/conejal) |
| ES | `conejar` | Se explica como madriguera o lugar de cría con palabras más comunes. [DLE](https://dle.rae.es/conejar) |
| ES | `conejera` | Se resumen los sentidos de madriguera y recinto donde viven los conejos. [DLE](https://dle.rae.es/conejero) |
| ES | `conejil` | Se explican con frases directas el sentido relativo al conejo y el uso para una sonrisa; se alinea el ejemplo con el primer sentido. [DLE](https://dle.rae.es/conejil) |
| ES | `conejuna` | Se explica directamente como pelo de conejo y se simplifica el ejemplo. [DLE](https://dle.rae.es/conejuno) |
| ES | `conejuno` | Se simplifican sus sentidos de adjetivo y se mantiene la acepción femenina de pelo de conejo. [DLE](https://dle.rae.es/conejuno) |
| ES | `conexion-internet` | Se explica el acceso a internet desde dispositivos conocidos y se aclara qué no se puede hacer sin conexión. [DLE](https://dle.rae.es/conectar) |

No se registran exclusiones nuevas en este lote.

## Lote 420

| Idioma | ID | Decisión |
|---|---|---|
| ES | `condonar` | Se explican por separado la deuda y la pena; se sustituye «remitir» por palabras más comunes y se ajusta el ejemplo. [DLE](https://dle.rae.es/condonar) |
| ES | `condotiero` | Se explica como jefe o soldado que luchaba por dinero; se simplifican los sinónimos y el ejemplo. [DLE](https://dle.rae.es/condotiero) |
| ES | `conducente` | Se cambia la referencia abstracta a «un fin» por «ayudar a conseguir un resultado» y se adapta el ejemplo. [DLE](https://dle.rae.es/conducente) |
| ES | `conduchar` | Se conserva el uso regional de Badajoz y sus dos sentidos; se explican con palabras sencillas y se adapta el ejemplo. [DLE](https://dle.rae.es/conduchar) |
| ES | `conducidor` | Se sustituye la explicación gramatical por una definición directa y se indica que es una palabra antigua. [DLE](https://dle.rae.es/conducidor) |
| ES | `conductismo` | Se explica qué estudia esta teoría y qué deja fuera, con frases breves y directas. [DLE](https://dle.rae.es/conductismo) |
| ES | `condurar` | Se conserva el uso regional de Extremadura y se explica con palabras más comunes. [DLE](https://dle.rae.es/condurar) |
| ES | `conectar` | Se amplía la explicación para incluir la comunicación entre cosas y se actualizan sinónimos y ejemplo en la fuente y el rebase. [DLE](https://dle.rae.es/conectar) |

No se registran exclusiones nuevas en este lote.

## Lote 419

| Idioma | ID | Decisión |
|---|---|---|
| ES | `condicionar` | Se resumen con lenguaje directo los sentidos generales y el uso textil; se ajustan sinónimos y ejemplo. [DLE](https://dle.rae.es/condicionar) |
| ES | `condiciones-generales` | Se explica como reglas del contrato y se conserva que dependen del acuerdo y de la ley; se simplifican sinónimos. [BOE, Ley 7/1998](https://www.boe.es/eli/es/l/1998/04/13/7) |
| ES | `condigno` | Se corrige la sobrescritura en inglés de las capas editoriales y se explica como algo merecido; se actualizan el ejemplo y los sinónimos. [DLE](https://dle.rae.es/condigno) |
| ES | `condiscipulo` | Se explica con palabras comunes quién estudia con el mismo maestro; se simplifican sinónimos y ejemplo. [DLE](https://dle.rae.es/condisc%C3%ADpulo) |
| ES | `condoler` | Se aclara que el uso de esta forma es antiguo y que hoy se usa más «condolerse»; se actualiza el ejemplo. [DLE](https://dle.rae.es/condoler) |
| ES | `condolerse` | Se cambia «sufrimiento ajeno» por «alguien que sufre» y se simplifica el ejemplo. [DLE](https://dle.rae.es/condoler) |
| ES | `condominio` | Se explican sus sentidos de propiedad compartida y edificio residencial; se adapta el ejemplo al segundo sentido. [DLE](https://dle.rae.es/condominio) |
| ES | `condonacion-deuda` | Se sustituye «remisión» y «extingue la obligación» por la explicación directa del perdón total o parcial; se actualiza la capa de ejemplos. [DLE](https://dle.rae.es/condonaci%C3%B3n) |

No se registran exclusiones nuevas en este lote.

## Lote 418

| Idioma | ID | Decisión |
|---|---|---|
| ES | `condenable` | Se explica como algo que merece crítica o castigo y se sustituyen sinónimos difíciles por otros más comunes. [DLE](https://dle.rae.es/condenable) |
| ES | `condenado` | Se simplifica la definición religiosa sin quitar el contexto de creencia ni la idea de castigo eterno; se actualiza el rebase. [DLE](https://dle.rae.es/condenado) |
| ES | `condenador` | Se explica directamente el adjetivo y el uso para nombrar a quien critica; se simplifican el ejemplo y un sinónimo. [DLE](https://dle.rae.es/condenador) |
| ES | `condescender` | Se separan sus dos sentidos con frases cortas; se cambian sinónimos abstractos y se adapta el ejemplo. [DLE](https://dle.rae.es/condescender) |
| ES | `condescendiente` | Se sustituye la definición circular por una explicación directa; se actualiza el rebase. [DLE](https://dle.rae.es/condescendiente) |
| ES | `condesil` | Se explica el sentido con palabras directas y se conserva que es humorística; se quita un sinónimo muy poco conocido. [DLE](https://dle.rae.es/condesil) |
| ES | `condicionado` | Se separan sus dos sentidos principales y se omite la nota gramatical, que no ayuda a entender la palabra. [DLE](https://dle.rae.es/condicionado) |
| ES | `condicional` | Se cambia la definición circular por una explicación directa y se adapta el ejemplo; se actualiza el rebase. [DLE](https://dle.rae.es/condicional) |

No se registran exclusiones nuevas en este lote.

## Lote 417

| Idioma | ID | Decisión |
|---|---|---|
| ES | `concursar` | Se corrige la confusión con el concurso de acreedores: se explica como participar en un concurso; se ajustan sinónimos, ejemplo y capa de correcciones editoriales. [DLE](https://dle.rae.es/concursar) |
| ES | `concurso-de-acreedores` | Se explica como un proceso legal para ordenar las deudas cuando una persona o empresa no puede pagarlas; se simplifican sinónimos y ejemplo en la fuente y el rebase. [DLE](https://dle.rae.es/concurso) [BOE, art. 2](https://www.boe.es/eli/es/rdlg/2020/05/05/1) |
| ES | `condado` | Se conserva el sentido de título nobiliario y se explica con palabras más directas; se actualiza también el rebase. [DLE](https://dle.rae.es/condado) |
| ES | `conde` | Se cambia la escala nobiliaria descrita con palabras complejas por una explicación directa; se actualiza también el rebase. [DLE](https://dle.rae.es/conde) |
| ES | `condecente` | Se explica como «adecuado o apropiado» y se mantiene que es una palabra antigua, dato útil porque apenas se usa. [DLE](https://dle.rae.es/condecente) |
| ES | `condecir` | Se explica como combinar bien una cosa con otra y se conserva que es una palabra poco usada; se simplifica el sinónimo del ejemplo. [DLE](https://dle.rae.es/condecir) |
| ES | `condecorar` | Se sustituye la definición circular por una explicación directa y se simplifica el segundo sentido; se conserva el ejemplo de premiar. [DLE](https://dle.rae.es/condecorar) |
| ES | `condena` | Se explica como el castigo que impone un juez; se reemplaza «veredicto de culpabilidad», que no expresa el mismo sentido, y se ajustan ejemplo y capa de correcciones editoriales. [DLE](https://dle.rae.es/condena) |

No se registran exclusiones nuevas en este lote.

## Lote 416

| Idioma | ID | Decisión |
|---|---|---|
| ES | `concubino` | Se cambia la definición circular por una explicación directa de la pareja que vive sin casarse; se conserva «pareja» como sinónimo. [DLE](https://dle.rae.es/concubino) |
| ES | `concubio` | Se mantiene activa como voz histórica documentada en una fuente de la RAE que cita el NTLLE de 1936; se acortan definición y ejemplo. [BRAE](https://revistas.rae.es/brae/article/view/134/270) |
| ES | `conculcador` | Se sustituye «que conculca» por una explicación directa; se simplifican el sinónimo y el ejemplo. [DLE](https://dle.rae.es/conculcador) |
| ES | `conculcar` | Se explican sus tres sentidos con palabras directas y se conserva que el uso de «someter» es poco frecuente; se actualizan sinónimos y ejemplo. [DLE](https://dle.rae.es/conculcar) |
| ES | `concunado` | Se explican con palabras comunes los dos parentescos; el ejemplo muestra el sentido de hermano del cuñado. [DLE](https://dle.rae.es/concuñado) |
| ES | `concupiscente` | Se sustituye la definición circular por una explicación directa del deseo sexual y los placeres del cuerpo; se simplifican sinónimos y ejemplo. [DLE](https://dle.rae.es/concupiscente) |
| ES | `concupiscible` | Se aclaran sus sentidos de algo deseable y, en filosofía, de algo que busca placer físico. [DLE](https://dle.rae.es/concupiscible) |
| ES | `concurrir` | Se resumen sus sentidos de reunirse, coincidir, aportar dinero y competir; se corrige el ejemplo para que «participar» encaje. [DLE](https://dle.rae.es/concurrir) |

No se registran exclusiones nuevas en este lote.

## Lote 415

| Idioma | ID | Decisión |
|---|---|---|
| ES | `concitar` | Se explican con palabras directas los sentidos de causar una reacción, reunir y poner a alguien en contra de otra persona. [DLE](https://dle.rae.es/concitar) |
| ES | `conciudadano` | Se acorta la definición y se ajusta el ejemplo para que «vecino» describa la misma situación. [DLE](https://dle.rae.es/conciudadano) |
| ES | `conclave` | Se incorporan los usos generales y religiosos del cónclave y se aclara que también puede nombrar el lugar; se actualiza la capa editorial. [DLE](https://dle.rae.es/c%C3%B3nclave) |
| ES | `concomerse` | Se sustituye la serie de sinónimos por la explicación directa de preocuparse mucho; se empareja el ejemplo. [DLE](https://dle.rae.es/concomer) |
| ES | `concomio` | Se explica como una preocupación que causa inquietud y se expresa el uso informal con palabras sencillas. [DLE](https://dle.rae.es/concomio) |
| ES | `concorde` | Se cambia «de un mismo sentir y parecer» por «pensar lo mismo»; se actualiza la capa de rebase y el ejemplo. [DLE](https://dle.rae.es/concorde) |
| ES | `concretar` | Se explican con sencillez los sentidos de aclarar una idea y fijar detalles; se actualiza la capa de rebase. [DLE](https://dle.rae.es/concretar) |
| ES | `concubinato` | Se explica directamente la relación de pareja sin matrimonio y se conserva un sinónimo claro; se actualiza la corrección editorial. [DLE](https://dle.rae.es/concubinato) |

No se registran exclusiones nuevas en este lote. La exclusión inglesa existente `ayeaye` conserva el encabezado y el motivo de la fuente; su corrección histórica se omite porque la entrada está excluida.

## Lote 414

| Idioma | ID | Decisión |
|---|---|---|
| ES | `conceto` | Se explica directamente como idea o pensamiento y se conserva que es una forma antigua; se adapta el ejemplo para mostrar el uso. [DLE](https://dle.rae.es/conceto) |
| ES | `conchabar` | Se aclaran el acuerdo, su posible fin ilegal y el sentido de unir; se alinean el parche de sinónimos y el ejemplo con el sentido de confabularse. [DLE](https://dle.rae.es/conchabar) |
| ES | `conchero` | Se acortan sus dos sentidos activos y se identifica como argentino el uso de la prenda; se conserva el ejemplo arqueológico con «conchal». [DLE](https://dle.rae.es/conchero), [Wikcionario](https://en.wiktionary.org/wiki/conchero) |
| ES | `concienciar` | Se explican directamente el uso transitivo y el pronominal; se conservan las decisiones previas sobre sinónimos. [DLE](https://dle.rae.es/concienciar) |
| ES | `conciliable` | Se sustituye la definición metalingüística por «que puede encajar» y se alinea el sinónimo con el ejemplo. [DLE](https://dle.rae.es/conciliable) |
| ES | `conciliabulo` | Se explican la reunión secreta y el sentido religioso no autorizado con palabras sencillas; se alinea el ejemplo con «reunión secreta». [DLE](https://dle.rae.es/concili%C3%A1bulo) |
| ES | `conciliador` | Se separan el uso para resolver conflictos y el uso para una persona; se simplifican los sinónimos y se alinea el ejemplo. [DLE](https://dle.rae.es/conciliador) |
| ES | `concionador` | Se explica directamente como una persona que habla en público sobre religión y se conserva que es una palabra antigua. [DLE](https://dle.rae.es/concionador) |

No se registran exclusiones nuevas en este lote.

## Lote 413

| Idioma | ID | Decisión |
|---|---|---|
| ES | `concentrico` | Se explica como compartir el centro con otra figura o cuerpo; se alinea el ejemplo con «con el mismo centro». [DLE](https://dle.rae.es/conc%C3%A9ntrico) |
| ES | `conceptismo` | Se explica como un estilo del Barroco que usa pocas palabras e ideas ingeniosas; se simplifican el sinónimo y el ejemplo. [DLE](https://dle.rae.es/conceptismo) |
| ES | `conceptivo` | Se aclara como la capacidad de tener hijos o crías; se alinea el ejemplo veterinario con «fértil». [DLE](https://dle.rae.es/conceptivo) |
| ES | `conceptualizar` | Se cambia «reducir algo a un concepto o representación mental» por «formar una idea general»; se alinea el ejemplo. [DLE](https://dle.rae.es/conceptualizar) |
| ES | `conceptuar` | Se cambia «formar un concepto o juicio» por «formarse una opinión» y se alinea el ejemplo con «considerar». [DLE](https://dle.rae.es/conceptuar) |
| ES | `conceptuosidad` | Se sustituye la remisión a «conceptuoso» por una explicación directa del uso de ideas ingeniosas y breves al escribir. [DLE](https://dle.rae.es/conceptuosidad) |
| ES | `conceptuoso` | Se aclaran en dos frases sus usos positivo y despectivo; se quitan sinónimos técnicos y se conserva un ejemplo positivo. [DLE](https://dle.rae.es/conceptuoso) |
| ES | `concernir` | Se explica como tener relación con algo, afectarlo o interesar; se expresa con sencillez la restricción de uso y se alinea el ejemplo. [DLE](https://dle.rae.es/concernir) |

No se registran exclusiones nuevas en este lote.

## Lote 412

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comunicacional` | Se cambia «perteneciente o relativo» por «relacionado» y se alinea el ejemplo con «de comunicación». [DLE](https://dle.rae.es/comunicacional) |
| ES | `comunicante` | Se aclara que comunica algo o transmite un mensaje; se alinea el ejemplo con «emisor». [DLE](https://dle.rae.es/comunicante) |
| ES | `comunicativo` | Se separan el uso relativo a la comunicación y el que describe a una persona sociable y fácil de tratar; se alinea el ejemplo. [DLE](https://dle.rae.es/comunicativo) |
| ES | `concanonigo` | Se sustituye «canónigo» por una descripción directa del cargo compartido en una iglesia; se conserva el ejemplo con «canónigo colega». [DLE](https://dle.rae.es/concan%C3%B3nigo) |
| ES | `concatenar` | Se cambia «formando una serie o cadena» por «unir varias cosas para formar una serie»; se alinea el ejemplo con «unir». [DLE](https://dle.rae.es/concatenar) |
| ES | `concausa` | Se explica como una causa que, junto con otras, produce un resultado; se alinea el ejemplo con «otra causa». [DLE](https://dle.rae.es/concausa) |
| ES | `concavidad` | Se explican directamente la forma curva hacia dentro y la parte hundida; se alinea el ejemplo con «cavidad». [DLE](https://dle.rae.es/concavidad) |
| ES | `concavo` | Se explica la forma curvada hacia dentro y el uso como nombre para un hueco; se alinea el ejemplo con la descripción sencilla. [DLE](https://dle.rae.es/c%C3%B3ncavo) |

No se registran exclusiones nuevas en este lote.

## Lote 411

| Idioma | ID | Decisión |
|---|---|---|
| ES | `computable` | Se explica como algo que se puede calcular o contar; se alinea el ejemplo con «calculable». [DLE](https://dle.rae.es/computable) |
| ES | `computar` | Se distinguen con palabras comunes contar o calcular algo y tenerlo en cuenta al calcular. [DLE](https://dle.rae.es/computar) |
| ES | `computarizar` | Se quita «tratamiento informático» y se explica como usar una computadora para procesar datos o realizar tareas; se alinea el override editorial. [DLE](https://dle.rae.es/computarizar) |
| ES | `computo` | Se elimina la etiqueta metalingüística sobre la tilde y se define directamente como cuenta o cálculo; se alinea el ejemplo con «recuento». [DLE](https://dle.rae.es/c%C3%B3mputo) |
| ES | `comulgante` | Se explica directamente como la persona que recibe la comunión; se alinea el ejemplo con esa explicación. [DLE](https://dle.rae.es/comulgante) |
| ES | `comulgar` | Se separan los usos de recibir o dar la comunión y estar de acuerdo con alguien; se alinea el ejemplo con «recibir la comunión». [DLE](https://dle.rae.es/comulgar) |
| ES | `comunalia` | Se sustituye «medianía o condición de lo mediano» por «situación entre dos extremos» y se indica que está en desuso. [DLE](https://dle.rae.es/comunal%C3%ADa), [medianía](https://dle.rae.es/median%C3%ADa) |
| ES | `comunicable` | Se aclaran los dos sentidos activos: algo que se puede compartir y una persona abierta y fácil de tratar; se alinea el ejemplo. [DLE](https://dle.rae.es/comunicable) |

No se registran exclusiones nuevas en este lote.

## Lote 410

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comprendedor` | Se explica como alguien que entiende y acepta a otras personas; se conserva el ejemplo con «comprensivo». [DLE](https://dle.rae.es/comprendedor) |
| ES | `comprensibilidad` | Se cambia «cualidad de aquello que puede comprenderse» por «facilidad con que se entiende algo»; se alinea el ejemplo con «claridad». [DLE](https://dle.rae.es/comprensibilidad) |
| ES | `compresibilidad` | Se explica como la posibilidad de que algo ocupe menos espacio al apretarlo; se alinea el ejemplo con «capacidad de compresión». [DLE](https://dle.rae.es/compresibilidad) |
| ES | `compresible` | Se explica directamente como algo que puede apretarse y ocupar menos espacio; se mantiene la sustitución por «comprimible». [DLE](https://dle.rae.es/compresible) |
| ES | `comprobante` | Se distinguen con palabras comunes los dos usos activos: algo que confirma y el documento que prueba un pago o gestión. [DLE](https://dle.rae.es/comprobante) |
| ES | `comprometedor` | Se explica como algo que puede dejar a alguien en mala situación o causarle problemas; se alinea el ejemplo con «embarazosa». [DLE](https://dle.rae.es/comprometedor) |
| ES | `compungido` | Se aclara que describe a alguien muy triste o arrepentido, incluso por el dolor ajeno; se alinea el ejemplo con «apenado». [DLE](https://dle.rae.es/compungido) |
| ES | `compungir` | Se separan en dos frases breves los usos de causar tristeza o remordimiento y de sentir tristeza por una culpa o dolor ajeno. [DLE](https://dle.rae.es/compungir) |

No se registran exclusiones nuevas en este lote.

## Lote 409

| Idioma | ID | Decisión |
|---|---|---|
| ES | `completud` | Se sustituye la remisión a «completitud» por una explicación directa del estado de algo completo. [DLE](https://dle.rae.es/completud) |
| ES | `complexionado` | Se aclaran con palabras comunes los sentidos de «bien» y «mal complexionado». [DLE](https://dle.rae.es/complexionado), [complexión](https://dle.rae.es/complexi%C3%B3n) |
| ES | `componedor` | Se simplifican los dos sentidos activos. La corrección existente mantiene fuera el uso regional para tratar huesos y «amigable componedor»; no son exclusiones nuevas. [DLE](https://dle.rae.es/componedor) |
| ES | `componenda` | Se aclaran sus sentidos activos: acuerdo deshonesto, antiguo pago por permisos religiosos y arreglo informal para evitar un daño. Se actualizan también la capa que fija el ejemplo y la definición. [DLE](https://dle.rae.es/componenda) |
| ES | `compost` | Se explica como abono hecho de restos orgánicos. La variante «composta» sigue fuera por la corrección editorial existente. La ficha española continúa activa; la exclusión de la entrada inglesa es independiente. [DLE](https://dle.rae.es/compost) |
| ES | `compotera` | Se explica como recipiente con tapa para servir compota o postre; se cambia «frutero» por una frase que encaja con el ejemplo. [DLE](https://dle.rae.es/compotera) |
| ES | `comprante` | Se cambia la remisión «comprador» por «persona que compra» y se indica con palabras sencillas que está en desuso; se alinea el ejemplo. [DLE](https://dle.rae.es/comprante) |
| ES | `comprehender` | Se aclara la variante antigua de «comprender» como entender o incluir algo; se quita la etiqueta metalingüística. [DLE](https://dle.rae.es/comprehender) |

No se registran exclusiones nuevas en este lote.

## Lote 408

| Idioma | ID | Decisión |
|---|---|---|
| ES | `compenetrarse` | Se resumen en dos frases los usos activos entre personas, sustancias y cosas. Se conserva la exclusión editorial existente del uso mexicano «comprender por completo». [DLE](https://dle.rae.es/compenetrarse) |
| ES | `competer` | Se explica como corresponder o ser responsabilidad de alguien; se añade una nota sencilla sobre sus formas de uso. [DLE](https://dle.rae.es/competer) |
| ES | `compincharse` | Se explica como ponerse de acuerdo para hacer algo malo o a escondidas; se sustituye el ejemplo por una situación corriente. [DLE](https://dle.rae.es/compincharse) |
| ES | `complacedero` | Se quita la remisión a «complaciente» y se explica directamente; se indica con palabras sencillas que está en desuso. [DLE](https://dle.rae.es/complacedero) |
| ES | `complacedor` | Se aclara que puede ser una persona o cosa que agrada o complace; se adapta el ejemplo. [DLE](https://dle.rae.es/complacedor) |
| ES | `complementar` | Se distinguen con palabras comunes los usos de añadir algo, servir para completar y completar otra palabra en una oración. [DLE](https://dle.rae.es/complementar) |
| ES | `completez` | Se cambia la remisión a palabras igualmente difíciles por «estado de algo que está completo»; se conserva la sustitución en el ejemplo. [DLE](https://dle.rae.es/completez) |
| ES | `completitud` | Se explica directamente como el estado de algo completo y sin partes faltantes; se conserva el ejemplo con «completez». [DLE](https://dle.rae.es/completitud) |

No se registran exclusiones nuevas en este lote.

## Lote 407

| Idioma | ID | Decisión |
|---|---|---|
| ES | `compatrioto` | Se sustituye la remisión circular por «persona del mismo país» y se indica con palabras sencillas que la voz está en desuso; se adapta el ejemplo. [DLE](https://dle.rae.es/compatrioto) |
| ES | `compeler` | Se explica como obligar a alguien a actuar contra su voluntad; se quita la etiqueta gramatical y se alinea el ejemplo con «obligar». [DLE](https://dle.rae.es/compeler) |
| ES | `compelir` | Se explica directamente el significado y se conserva, con palabras sencillas, que se usa poco; se alinea el ejemplo con «obligar». [DLE](https://dle.rae.es/compelir) |
| ES | `compendiador` | Se explica como quien resume un tema y reúne sus ideas principales; se separa el uso como adjetivo del uso como nombre. [DLE](https://dle.rae.es/compendiador) |
| ES | `compendiar` | Se cambia «reducir a compendio» por «resumir y reunir las ideas principales»; se conserva el ejemplo con «resumir». [DLE](https://dle.rae.es/compendiar) |
| ES | `compendio` | Se define con palabras comunes como resumen breve y se conserva el ejemplo. La corrección editorial mantiene fuera el sentido regional salvadoreño de «complicación»; no es una exclusión nueva. [DLE](https://dle.rae.es/compendio) |
| ES | `compendioso` | Se expresan directamente los sentidos de reunir ideas brevemente y resumir muchas cosas; se simplifican el ejemplo y su sustitución. [DLE](https://dle.rae.es/compendioso) |
| ES | `compendizar` | Se explica como resumir y reunir las ideas principales; se indica con palabras sencillas que la voz está en desuso. [DLE](https://dle.rae.es/compendizar) |

No se registran exclusiones nuevas en este lote.

## Lote 406

| Idioma | ID | Decisión |
|---|---|---|
| ES | `compaginar` | Se explican con palabras comunes ordenar cosas relacionadas y combinar actividades; se elimina la jerga de los sentidos y se alinea el ejemplo. [DLE](https://dle.rae.es/compaginar) |
| ES | `companeria` | Se explica como un antiguo local donde se pagaba por sexo. Solo se conserva el sentido activo del runtime; no se añade el sentido figurado que el DLE también recoge. [DLE](https://dle.rae.es/compa%C3%B1er%C3%ADa) |
| ES | `compano` | Se aclaran los sentidos antiguos de compañero y de «compaña», sin etiquetas gramaticales ni notas de sentido. [DLE](https://dle.rae.es/compa%C3%B1o) |
| ES | `comparsa` | Se agrupan en dos frases los sentidos activos de grupo en una obra o fiesta y de persona sin protagonismo; se simplifican las notas en sinónimos. [DLE](https://dle.rae.es/comparsa) |
| ES | `compartimentar` | Se explica como dividir algo en partes; se aclara con palabras sencillas el sentido náutico de crear zonas que no dejan pasar el agua. [DLE](https://dle.rae.es/compartimentar) |
| ES | `compasado` | Se sustituyen los sinónimos técnicos por «ordenado, moderado y sensato» y se quita la nota metalingüística sobre el participio. [DLE](https://dle.rae.es/compasado) |
| ES | `compaseo` | Se quita la etiqueta de música y se explica directamente como marcar el ritmo de una pieza musical. [DLE](https://dle.rae.es/compaseo) |
| ES | `compatricio` | Se sustituye la remisión circular a «compatriota» por «persona del mismo país». [DLE](https://dle.rae.es/compatricio) |

No se registran exclusiones nuevas en este lote.

## Lote 405

| Idioma | ID | Decisión |
|---|---|---|
| ES | `compacidad` | Se sustituye la explicación circular por la cualidad de estar muy apretado; el sinónimo y el ejemplo describen ese estado con palabras comunes. [DLE](https://dle.rae.es/compacidad) |
| ES | `compactar` | Se quita la etiqueta gramatical y se explica directamente como apretar algo para que ocupe menos espacio. [DLE](https://dle.rae.es/compactar) |
| ES | `compactibilidad` | Se explica como la posibilidad de apretarse hasta ocupar menos espacio; se alinean el sinónimo y el ejemplo. [DLE](https://dle.rae.es/compactibilidad) |
| ES | `compadecer` | Se distinguen con palabras sencillas sentir pena por alguien y encajar con otra cosa; se corrige el ejemplo pronominal. [DLE](https://dle.rae.es/compadecer) |
| ES | `compadrar` | Se quitan las etiquetas gramaticales y la explicación repetida; se conservan el sentido de amistad y el vínculo entre padres y padrinos. [DLE](https://dle.rae.es/compadrar) |
| ES | `compadreo` | Se simplifica la ayuda mutua y se conserva su uso negativo cuando las personas se favorecen injustamente; se alinea el ejemplo. [DLE](https://dle.rae.es/compadreo) |
| ES | `compaginado` | Se elimina la nota metalingüística sobre el participio y se explica directamente la página con textos y columnas ordenados para imprimir. [DLE](https://dle.rae.es/compaginado) |
| ES | `compaginador` | Se quitan las etiquetas gramaticales y se define como la persona que ordena las páginas antes de imprimirlas. [DLE](https://dle.rae.es/compaginador) |

No se registran exclusiones nuevas en este lote.

## Lote 404

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comiqueria` | Se explica como grupo de cómicos y se conserva en palabras sencillas que es informal y se usa poco. [DLE](https://dle.rae.es/comiquer%C3%ADa) |
| ES | `comisariado` | Se explica como el cargo de quien se encarga de un asunto; se aclara el uso en arte y se alinea el ejemplo. [DLE](https://dle.rae.es/comisariado), [comisario](https://dle.rae.es/comisario) |
| ES | `comisariar` | Se quitan las etiquetas gramaticales y se explica como organizar una exposición artística o cultural. [DLE](https://dle.rae.es/comisariar) |
| ES | `comiscar` | Se explica directamente que es comer a menudo pequeñas cantidades de varias cosas; se conserva con palabras sencillas el sentido antiguo de roer o desgastar y se rehace el ejemplo con dos alimentos. [DLE](https://dle.rae.es/comiscar) |
| ES | `comisquear` | Se quitan las etiquetas gramaticales, se simplifica la explicación y se rehace el ejemplo con varios alimentos. [DLE](https://dle.rae.es/comisquear) |
| ES | `comistrajo` | Se sustituye la explicación técnica por una mezcla rara y poco apetecible de alimentos; se corrigen la fuente y sus parches editoriales. [DLE](https://dle.rae.es/comistrajo) |
| ES | `comisura` | Se quitan las etiquetas de sentido y se explican la unión de los labios y la unión dentada de los huesos del cráneo. [DLE](https://dle.rae.es/comisura) |
| ES | `comodante` | Se corrige la capa editorial que mostraba una definición en inglés y se explica quién presta algo gratis y debe recibirlo de vuelta. [DLE](https://dle.rae.es/comodante) |

No se registran exclusiones nuevas en este lote.

## Lote 403

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cometida` | Se corrige la acepción antigua como ataque o embestida y se rehace el ejemplo. [DLE](https://dle.rae.es/cometida), [acometida](https://dle.rae.es/acometida) |
| ES | `comible` | Se explican directamente los sentidos de poder comerse y tener un sabor aceptable; se alinean la fuente y sus dos parches editoriales. [DLE](https://dle.rae.es/comible) |
| ES | `comicidad` | Se quita la etiqueta gramatical y se explica como la cualidad de hacer reír; se simplifican los sinónimos y el ejemplo. [DLE](https://dle.rae.es/comicidad), [cómico](https://dle.rae.es/c%C3%B3mico) |
| ES | `comidilla` | Se explican el tema de un chisme y aquello que gusta mucho; se quitan etiquetas y notas de sentido y se rehace el ejemplo. [DLE](https://dle.rae.es/comidilla) |
| ES | `comilon` | Se conserva el sentido activo de persona que come mucho y se quita la acepción femenina de «comilona», que tiene ficha propia; se retira una corrección de sinónimos que ya no hacía falta. [DLE](https://dle.rae.es/comil%C3%B3n) |
| ES | `comilona` | Se hace más directa la explicación de una comida abundante y variada; se alinea el ejemplo con un sinónimo sencillo. [DLE](https://dle.rae.es/comil%C3%B3n) |
| ES | `cominear` | Se sustituye la explicación circular sobre «cominerías» por ocuparse de detalles pequeños sin importancia. [DLE](https://dle.rae.es/cominear) |
| ES | `comineria` | Se quita la etiqueta gramatical y se explica directamente como un detalle sin importancia. [DLE](https://dle.rae.es/cominer%C3%ADa) |

No se registran exclusiones nuevas en este lote.

## Lote 402

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comendaticio` | Se explica como una cualidad de las cartas de recomendación de un obispo; se rehace el ejemplo para que el sinónimo encaje. [DLE](https://dle.rae.es/comendaticio) |
| ES | `comensalia` | Se acorta la definición a compartir casa y comidas; el ejemplo y el sinónimo usan la misma situación. [DLE](https://dle.rae.es/comensal%C3%ADa) |
| ES | `comenzante` | Se conserva la definición breve y se cambia el ejemplo para usar el sinónimo común «inicial». [DLE](https://dle.rae.es/comenzante) |
| ES | `comerciable` | Se explican sus dos sentidos sin etiquetas: algo que puede venderse y, antiguamente, una persona sociable y amable. El ejemplo muestra el primer sentido. [DLE](https://dle.rae.es/comerciable) |
| ES | `comercialismo` | Se quita la etiqueta gramatical y se explica directamente la tendencia a poner el interés comercial por delante de otros valores. [DLE](https://dle.rae.es/comercialismo) |
| ES | `comercializadora` | Se explica como empresa que vende electricidad y gestiona contratos; se distingue de la empresa que mantiene la red. La ficha sigue activa como término del sector. [CNMC](https://www.cnmc.es/facil-para-ti/que-hace-la-cnmc-para-consumidores/comercializacion-y-suministro-electrico), [Consumo](https://www.dsca.gob.es/es/consumo/preguntas-frecuentes/cual-es-diferencia-empresa-comercializadora-distribuidora-electricidad) |
| ES | `comercializar` | Se explican los sentidos de preparar un producto para venderlo y de ponerlo a la venta; se quitan etiquetas y notas metalingüísticas. [DLE](https://dle.rae.es/comercializar) |
| ES | `cometedor` | Se explica quién comete una falta y se conserva con palabras sencillas el sentido antiguo de atacar; se rehacen el ejemplo y su sustitución. [DLE](https://dle.rae.es/cometedor) |

No se registran exclusiones nuevas en este lote.

## Lote 401

| Idioma | ID | Decisión |
|---|---|---|
| ES | `comedia-1555-3` | Se revisa el sentido de un suceso real que hace reír; la definición y el ejemplo ya son claros y naturales. [DLE](https://dle.rae.es/comedia) |
| ES | `comediar` | Se explican sus dos sentidos antiguos sin etiquetas gramaticales y se cambia el ejemplo metalingüístico por uno de reparto. [DLE](https://dle.rae.es/comediar) |
| ES | `comedido` | Se simplifica el sentido activo: actuar con prudencia y moderación. No se añade el uso regional de ser servicial, que no aparece en el runtime activo. [DLE](https://dle.rae.es/comedido) |
| ES | `comedio` | Se explican el centro de un lugar y el tiempo entre dos épocas con palabras sencillas; se quitan las etiquetas de sentido. [DLE](https://dle.rae.es/comedio) |
| ES | `comediografo` | Se sustituye la etiqueta gramatical por «persona que escribe obras de teatro cómicas» y se conserva un ejemplo natural. [DLE](https://dle.rae.es/comediógrafo) |
| ES | `comedir` | Se explica el sentido antiguo de pensar o preparar algo y el uso activo de moderarse. No se añade el uso regional de ofrecerse, ausente del runtime. [DLE](https://dle.rae.es/comedir) |
| ES | `comedirse` | Se elimina la etiqueta gramatical; se conserva el sentido activo de moderarse o contenerse. No se añade el uso regional de ofrecerse, ausente del runtime. [DLE](https://dle.rae.es/comedir) |
| ES | `comedor-escolar` | Se explica directamente como el comedor de una escuela y se adapta el ejemplo. [DLE](https://dle.rae.es/comedor) |

No se registran exclusiones nuevas de entradas en este lote.

## Lote 391

| Idioma | ID | Decisión |
|---|---|---|
| ES | `colerizar` | Se explica como «enfadar» y se conserva con palabras sencillas que se usa poco. El ejemplo muestra ese sentido. [DLE](https://dle.rae.es/colerizar) |
| ES | `colesterina` | Se sustituye la explicación técnica por su relación directa con el colesterol; se rehace el ejemplo. [DLE](https://dle.rae.es/colesterina) |
| ES | `coletazo` | Se explican el golpe de cola y el sentido de última reacción. El ejemplo muestra el primer sentido. [DLE](https://dle.rae.es/coletazo) |
| ES | `coletero` | Se explican con palabras comunes el objeto para el pelo y el antiguo oficio. [DLE](https://dle.rae.es/coletero) |
| ES | `coletilla` | Se distinguen el mechón recogido con cinta y la nota o frase añadida. [DLE](https://dle.rae.es/coletilla) |
| ES | `coleto` | El runtime solo muestra la prenda de cuero; se simplifica esa acepción y el ejemplo. Los sentidos regionales y las expresiones de la fuente base no aparecen como activos. [DLE](https://dle.rae.es/coleto) |
| ES | `colgadura` | Se corrige la capa editorial que sustituía la definición española por una inglesa. La acepción de cubrecama queda solo en la fuente base, no en el runtime activo. [DLE](https://dle.rae.es/colgadura) |
| ES | `colica` | Se explica el dolor pasajero por indigestión con síntomas conocidos y se rehace el ejemplo. [DLE](https://dle.rae.es/c%C3%B3lico) |

No se registran exclusiones nuevas en este lote.

## Lote 390

| Idioma | ID | Decisión |
|---|---|---|
| ES | `colectivizar` | Se explica la acción con palabras comunes y se mantiene el ejemplo sobre el uso compartido del agua. El primer sinónimo concuerda con el ejemplo. [DLE](https://dle.rae.es/colectivizar) |
| ES | `colegiar` | Se explican la inscripción profesional y el sentido de reunirse con personas de la misma profesión. [DLE](https://dle.rae.es/colegiar) |
| ES | `colegiata` | Se explica qué iglesia es y se aclara que no es la principal de un obispo. [DLE](https://dle.rae.es/colegiata) |
| ES | `colegiatura` | Se sustituye «colegial» por una explicación sencilla de la beca o plaza. [DLE](https://dle.rae.es/colegiatura) |
| ES | `colegir` | Se conservan los sentidos de sacar una conclusión y unir cosas; el ejemplo muestra el primero. [DLE](https://dle.rae.es/colegir) |
| ES | `colegislador` | Se cambia la etiqueta gramatical por una explicación directa y se rehace el ejemplo para que contenga la palabra y su sustitución. [DLE](https://dle.rae.es/colegislador) |
| ES | `coleoptero` | Se explica la forma de sus alas y se conserva un ejemplo de un insecto. Se corrigen también dos capas editoriales que insertaban la definición en inglés. [DLE](https://dle.rae.es/cole%C3%B3ptero) |
| ES | `colerico` | Se explican con palabras sencillas el carácter irritable y el sentido relacionado con la enfermedad del cólera. [DLE](https://dle.rae.es/col%C3%A9rico) |

No se registran exclusiones nuevas en este lote.

## Lote 389

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coladizo` | Se explica directamente que algo se cuela por huecos con facilidad; el ejemplo concuerda con el sinónimo. [DLE](https://dle.rae.es/coladizo) |
| ES | `colaudar` | Se sustituye la definición metalingüística por «alabar» y se conserva que es una palabra antigua. [DLE](https://dle.rae.es/colaudar) |
| ES | `colchoneria` | Se explican la tienda o el taller de colchones y la tienda de lana con palabras comunes. [DLE](https://dle.rae.es/colchoner%C3%ADa), [lanería](https://dle.rae.es/laner%C3%ADa) |
| ES | `colear` | Se simplifican los dos sentidos activos. Otras acepciones regionales permanecen en la fuente base, pero no se presentan como activas en el runtime. [DLE](https://dle.rae.es/colear) |
| ES | `coleccionismo` | Se explican la afición de reunir objetos y la forma de ordenar una colección; el ejemplo concuerda con «afición por coleccionar». [DLE](https://dle.rae.es/coleccionismo) |
| ES | `colectar` | Se explica directamente que es reunir o recibir dinero; el ejemplo usa «reunir». [DLE](https://dle.rae.es/colectar) |
| ES | `colecticio` | Se aclara que es una tropa nueva, sin disciplina y formada por personas de distintos lugares. [DLE](https://dle.rae.es/colecticio) |
| ES | `colectividad` | Se explica el grupo y el objetivo que comparten sus integrantes. [DLE](https://dle.rae.es/colectividad) |

No se registran exclusiones nuevas en este lote.

## Lote 388

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cohonestar` | Se explican con palabras comunes sus dos sentidos: presentar como justa una acción injusta y hacer que dos cosas puedan ir juntas. [DLE](https://dle.rae.es/cohonestar) |
| ES | `coincidente` | Se sustituyen «coincidir» y «concordante» por «igual» y se conserva el sentido de ocurrir al mismo tiempo. [DLE](https://dle.rae.es/coincidente) |
| ES | `coinquinar` | Se mantienen los sentidos antiguo y pronominal con palabras comunes; el ejemplo muestra el sentido de manchar. [DLE](https://dle.rae.es/coinquinar) |
| ES | `cointeresado` | Se explica quién comparte un bien, negocio o asunto y se cambia «copartícipe» por «participante» en el ejemplo. [DLE](https://dle.rae.es/cointeresado) |
| ES | `coitar` | Se explica directamente el sentido sexual y se conserva la penetración como parte del significado. Se sustituye el ejemplo metalingüístico por uno de salud. [DLE](https://dle.rae.es/coitar) |
| ES | `cojijo` | Se separan el sentido de bicho y el de preocupación intensa; el ejemplo muestra el primero. [DLE](https://dle.rae.es/cojijo) |
| ES | `cojitranco` | Se explica el paso largo y se conserva con una frase clara que es una palabra despectiva. [DLE](https://dle.rae.es/cojitranco) |
| ES | `cojon` | Se aclara el sentido singular de testículo y se mantiene que la palabra es vulgar. El uso exclamativo plural se documenta en la ficha activa separada `cojones-expletive-sense`. [DLE](https://dle.rae.es/coj%C3%B3n) |
| ES | `cojones-expletive-sense` | Se explica en español el uso vulgar del plural para expresar enfado, sorpresa o énfasis; queda separado del sentido singular. [DLE](https://dle.rae.es/coj%C3%B3n) |

No se registran exclusiones nuevas. No se repiten `cojear` ni `cojinete`, ya revisadas en lotes anteriores.

## Lote 387

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cohesionar` | Se elimina la etiqueta gramatical y se explica directamente que es unir personas o partes. El ejemplo usa «unir». [DLE](https://dle.rae.es/cohesionar) |
| ES | `cohesivo` | Se sustituye «cohesión» por la explicación sencilla de mantener unidas las partes; el ejemplo muestra el uso como material aglutinante. [DLE](https://dle.rae.es/cohesivo) |
| ES | `cohete` | Se simplifica el sentido activo de vehículo impulsado por gases y se conserva el uso espacial. La ficha pirotécnica `cohete-firework` está excluida y no se cuenta como activa en este lote. [DLE](https://dle.rae.es/cohete) |
| ES | `coheteria` | Se explica el taller o tienda con palabras sencillas y se alinea el ejemplo con «taller de cohetes». [DLE](https://dle.rae.es/coheter%C3%ADa) |
| ES | `coheteria-rocket-activity-sense` | Se simplifica la técnica para usar cohetes y se conserva el sentido de grupo lanzado a la vez. El ejemplo concuerda con «lanzamiento de cohetes». [DLE](https://dle.rae.es/coheter%C3%ADa) |
| ES | `cohibir` | Se explican por separado frenar una acción y hacer que alguien sienta vergüenza; se cambia el ejemplo para mostrar el primer sentido. [DLE](https://dle.rae.es/cohibir) |
| ES | `cohonder` | Se conservan los sentidos antiguos con palabras comunes y se marca su antigüedad una sola vez. Se cambia el ejemplo metalingüístico por uno concreto. [DLE](https://dle.rae.es/cohonder) |
| ES | `cohonestador` | Se explican sus dos sentidos con frases breves y se conserva la nota «poco usado». Se alinea el ejemplo con «justificador». [DLE](https://dle.rae.es/cohonestador), [cohonestar](https://dle.rae.es/cohonestar) |

No se registran exclusiones nuevas en este lote.

## Lote 386

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cohabitacion` | Se explica como vida en común de personas o grupos y se conserva con claridad que no exige matrimonio. [DLE](https://dle.rae.es/cohabitaci%C3%B3n) |
| ES | `cohabitar` | Se separa la convivencia personal de la convivencia política en dos frases sencillas. [DLE](https://dle.rae.es/cohabitar) |
| ES | `cohechar-sobornar-funcionario` | Se conserva la definición directa del sentido de sobornar a un funcionario y su ejemplo claro. [DLE](https://dle.rae.es/cohechar) |
| ES | `cohechar` | Se explica directamente el sentido agrícola de preparar la tierra antes de sembrar. [DLE](https://dle.rae.es/cohechar) |
| ES | `cohecho` | Se recupera el sentido agrícola que la corrección editorial había omitido y se conserva el sentido jurídico. [DLE](https://dle.rae.es/cohecho), [cohechar](https://dle.rae.es/cohechar) |
| ES | `coheredar` | Se simplifica la definición del verbo y se conserva el ejemplo de varias personas que heredan una casa. [DLE](https://dle.rae.es/coheredar) |
| ES | `coheredero` | Se elimina la repetición y se cambia el sinónimo y su ejemplo por «heredero». [DLE](https://dle.rae.es/coheredero) |
| ES | `cohermano` | Se conservan sus sentidos antiguos en dos frases breves y se explican con palabras comunes. [DLE](https://dle.rae.es/cohermano) |

No se registran exclusiones nuevas en este lote.

## Lote 385

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cogollo` | Se acortan los sentidos de verdura, brote y parte principal; el ejemplo muestra el primero. [DLE](https://dle.rae.es/cogollo) |
| ES | `cogolmar` | Se explica directamente como llenar un recipiente hasta que rebose y se indica que es una palabra antigua. [DLE](https://dle.rae.es/cogolmar) |
| ES | `cogombrillo` | Se explica la planta y el fruto amargo en vez de remitir a otra palabra difícil. [DLE](https://dle.rae.es/cogombrillo), [cohombrillo](https://dle.rae.es/cohombrillo) |
| ES | `cogorza` | Se conserva el sentido de «borrachera» y se expresa el uso informal con palabras sencillas. [DLE](https://dle.rae.es/cogorza) |
| ES | `cogotazo` | Se mantiene el golpe con la mano abierta y se simplifica la definición. [DLE](https://dle.rae.es/cogotazo) |
| ES | `cogotera` | Se conserva el sentido de dolor de cuello documentado en La Gomera y se marca como canario; se distingue del sentido de prenda que recoge el DLE. [Academia Canaria de la Lengua](https://portal.academiacanarialengua.org/wp-content/uploads/2022/04/Vocabulario-tradicional-de-la-Gomera-I.pdf), [DLE](https://dle.rae.es/cogotera) |
| ES | `coguelmo` | Se explica el uso de Salamanca con palabras comunes y se conserva el sentido de «colmo». [DLE](https://dle.rae.es/cog%C3%BCelmo), [colmo](https://dle.rae.es/colmo) |
| ES | `cogullada` | Se explica la papada del cerdo con una frase breve. [DLE](https://dle.rae.es/cogullada), [papada](https://dle.rae.es/papada) |

No se registran exclusiones nuevas en este lote.

## Lote 384

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cognocer` | Se explica como forma antigua de «conocer» y se simplifica el ejemplo. [DLE](https://dle.rae.es/cognocer) |
| ES | `cognombre` | Se conserva que es una palabra antigua y se explica como sobrenombre o apellido. [DLE](https://dle.rae.es/cognombre) |
| ES | `cognomen` | Se explica el sobrenombre romano y su posible uso familiar con frases sencillas. [DLE](https://dle.rae.es/cognomen) |
| ES | `cognomento` | Se explica directamente como nombre recibido por algo notable y se ajusta el ejemplo de Toledo. [DLE](https://dle.rae.es/cognomento) |
| ES | `cognoscente` | Se conserva el uso filosófico y se explica como la persona que conoce o puede conocer. [DLE](https://dle.rae.es/cognoscente) |
| ES | `cognoscibilidad` | Se conserva el campo de la filosofía y se explica como la posibilidad de conocer algo. [DLE](https://dle.rae.es/cognoscibilidad) |
| ES | `cognoscible` | Se cambia la definición por «que se puede conocer» y se acorta el ejemplo. [DLE](https://dle.rae.es/cognoscible) |
| ES | `cognoscitivo` | Se explica con palabras comunes cómo se relaciona con pensar, aprender y recordar. [DLE](https://dle.rae.es/cognoscitivo) |

No se registran exclusiones nuevas en este lote.

## Lote 383

| Idioma | ID | Decisión |
|---|---|---|
| ES | `round2498-espartillo-colloquial-expression` | Se explica directamente el sentido coloquial confirmado por el DLE y se ajusta el ejemplo. [DLE](https://dle.rae.es/espartillo) |
| ES | `cogermano` | Se corrige el sentido: significa «primo hermano». Se indica que es una palabra antigua y se corrige su traducción. [DLE](https://dle.rae.es/cogermano), [primo hermano](https://dle.rae.es/primo) |
| ES | `cogestion` | Se explica con acciones sencillas y se añade el sentido de participación de los trabajadores. [DLE](https://dle.rae.es/cogesti%C3%B3n) |
| ES | `cogida` | Se conservan por separado el sentido taurino y el de recoger la cosecha. [DLE](https://dle.rae.es/cogida) |
| ES | `cogitabundo` | Se quitan las etiquetas y se conserva el significado directo «muy pensativo». [DLE](https://dle.rae.es/cogitabundo) |
| ES | `cogitar` | Se cambia «meditar detenidamente» por «pensar con cuidado» y se indica que es una palabra antigua. [DLE](https://dle.rae.es/cogitar) |
| ES | `cognaticio` | Se explica con palabras comunes a qué vínculos familiares se refiere. [DLE](https://dle.rae.es/cognaticio), [cognación](https://dle.rae.es/cognaci%C3%B3n) |
| ES | `cognitivo` | Se explica que se relaciona con pensar, aprender y recordar. [DLE](https://dle.rae.es/cognitivo) |

No se registran exclusiones nuevas en este lote.

## Lote 382

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cofrade` | Se quita la etiqueta y se explica directamente quién pertenece a una cofradía. [DLE](https://dle.rae.es/cofrade) |
| ES | `cofradero` | Se corrige el sentido y se explica su uso antiguo: avisar de los actos de una cofradía. [DLE](https://dle.rae.es/cofradero), [muñidor](https://dle.rae.es/mu%C3%B1idor) |
| ES | `cofradia` | Se explican por separado el grupo con un fin común y la hermandad religiosa. [DLE](https://dle.rae.es/cofrad%C3%ADa) |
| ES | `cofrear` | Se cambia «estregar» por «frotar» y se indica que es una palabra antigua. [DLE](https://dle.rae.es/cofrear) |
| ES | `cogedor` | Se define como una pala con mango y se conserva «recogedor». [DLE](https://dle.rae.es/cogedor) |
| ES | `cogedor-small-palm-scraper` | Se explica con palabras sencillas de qué material está hecho y para qué sirve. [DLE](https://dle.rae.es/cogedor) |
| ES | `cogedor-fireplace-scoop` | Se acorta la definición y se cambia «cucharón para brasas» por una opción más clara. [DLE](https://dle.rae.es/cogedor) |
| ES | `round3391-losilla-idiom` | Se conserva el sentido coloquial que confirma el DLE y se mejora el ejemplo. [DLE](https://dle.rae.es/losilla) |

No se registran exclusiones nuevas en este lote.

## Lote 381

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coercible` | Se quita la etiqueta y se explica con la idea de poder limitar algo. [DLE](https://dle.rae.es/coercible) |
| ES | `coercitivo` | Se quita la etiqueta gramatical y se explica qué efecto tiene. [DLE](https://dle.rae.es/coercitivo) |
| ES | `coetaneo` | Se explican por separado sus sentidos de edad y época. [DLE](https://dle.rae.es/coet%C3%A1neo) |
| ES | `coexistente` | Se explica que algo existe a la vez que otra cosa. [DLE](https://dle.rae.es/coexistente) |
| ES | `coexistir` | Se elimina la referencia al mismo lugar, que no aparece en la definición consultada. [DLE](https://dle.rae.es/coexistir) |
| ES | `coextenderse` | Se acorta la definición y se cambia el ejemplo abstracto por uno concreto. [DLE](https://dle.rae.es/coextenderse) |
| ES | `cofiador` | Se explica de forma directa la responsabilidad que comparte con otra persona. [DLE](https://dle.rae.es/cofiador) |
| ES | `cofinanciar` | Se usa «pagar» y se corrige el ejemplo roto de la fuente canónica. [DLE](https://dle.rae.es/cofinanciar) |

No se registran exclusiones nuevas en este lote.

## Lote 380

| Idioma | ID | Decisión |
|---|---|---|
| ES | `codigo-sms` | Se explica como un número que llega por mensaje para confirmar una operación. |
| ES | `codigo-promocional` | Se acorta la definición y se conserva el descuento como idea principal. |
| ES | `codigo-qr` | Se explica cómo se lee y se aclara que puede llevar información distinta. [GS1](https://support.gs1.org/support/solutions/articles/43000755322-what-is-the-main-difference-between-qr-code-and-gs1-data-matrix-) |
| ES | `codigo-swift` | Se separa qué identifica el código y para qué se usa. [SWIFT](https://www.swift.com/standards/data-standards/bic-business-identifier-code) |
| ES | `codirigir` | Se elimina la etiqueta gramatical y se explica directamente la acción. |
| ES | `codon` | Se cambia la explicación técnica por una descripción breve de sus tres partes y su función. [DLE](https://dle.rae.es/cod%C3%B3n) |
| ES | `coeducar` | Se simplifica la definición y se corrige el ejemplo, que tenía palabras sobrantes. [DLE](https://dle.rae.es/coeducar) |
| ES | `coercer` | Se quita la etiqueta gramatical y se explica la idea de obligar con presión. [DLE](https://dle.rae.es/coercer) |

No se registran exclusiones nuevas en este lote.

## Lote 379

| Idioma | ID | Decisión |
|---|---|---|
| ES | `codificador` | Se explican por separado el aparato o programa y la persona que ordena leyes. Se quita la etiqueta gramatical. [DLE](https://dle.rae.es/codificador) |
| ES | `codificar` | Se explican con palabras sencillas sus sentidos sobre mensajes y leyes. Se quita la etiqueta verbal. [DLE](https://dle.rae.es/codificar) |
| ES | `codigo-abierto` | Se conserva: explica que el programa permite consultar, cambiar y compartir el código, y que puede ser de pago o gratis. |
| ES | `codigo-civil` | Se sustituye «el libro» por «conjunto de leyes» para explicar mejor qué es. [BOE: Código Civil](https://www.boe.es/eli/es/rd/1889/07/24/%281%29/con/20250103) |
| ES | `codigo-barras` | Se cambia «saber qué es» por «identificar» y se quita la referencia poco clara a un papel. |
| ES | `codigo-de-seguridad-de-tarjetas-de-credito` | Se cambia «dígitos» por «cifras» y «operaciones sin presencia física» por un ejemplo de pago por internet. |
| ES | `codigo-fuente` | Se explica como texto con instrucciones que las personas pueden leer y cambiar. |
| ES | `codigo-penal` | Se sustituye «el libro que reúne todos los delitos» por una explicación breve y directa. [BOE: Código Penal](https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444&p=20260409&tn=2) |

No se registran exclusiones nuevas en este lote.

## Lote 378

| Idioma | ID | Decisión |
|---|---|---|
| ES | `codero` | Se explica el turno de riego y se indica que la palabra se usa en Aragón. [DLE](https://dle.rae.es/codero) |
| ES | `codeudor` | Se quita la etiqueta jurídica y se explica que comparte la responsabilidad de pagar la deuda. [DLE](https://dle.rae.es/codeudor) |
| ES | `codice` | Se quita «sustantivo masculino» y se explica el libro con palabras conocidas. Se simplifica el sinónimo como «libro escrito a mano» y se alinea el ejemplo. [DLE](https://dle.rae.es/c%C3%B3dice) |
| ES | `codiciable` | Se elimina la definición circular y se explica que muchas personas desean tenerlo. [DLE](https://dle.rae.es/codiciable) |
| ES | `codiciar` | Se elimina la etiqueta verbal y la restricción a bienes ajenos; se explica como desear algo con muchas ganas. Se simplifica el sinónimo y se cambia el ejemplo. [DLE](https://dle.rae.es/codiciar) |
| ES | `codicilar` | Se quita la etiqueta de derecho y se explica el término legal con una frase sencilla. [DLE](https://dle.rae.es/codicilar), [codicilo](https://dle.rae.es/codicilo) |
| ES | `codicologia` | Se sustituyen «ciencia» y «códices» por una explicación directa de los libros escritos a mano. [DLE](https://dle.rae.es/codicolog%C3%ADa) |
| ES | `codificable` | Se cambia «mediante» por «con» y se conserva el sinónimo que concuerda con el ejemplo. [DLE](https://dle.rae.es/codificable) |

No se registran exclusiones nuevas en este lote.

## Lote 377

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cocorronazo` | Se corrige el tipo de golpe: se da con los nudillos de la mano cerrada. Se conserva que se usa en Venezuela y se alinea la capa de rebase, que restauraba la definición anterior. [DLE](https://dle.rae.es/cocorronazo) |
| ES | `cocota` | Se corrige una definición sin respaldo: el DLE recoge «cabeza» en uso coloquial. Se ajustan sinónimo, ejemplo, traducción y categoría. [DLE](https://dle.rae.es/cocota) |
| ES | `cocotero` | Se quita la etiqueta gramatical y se explica directamente que es la palmera que da cocos. [DLE](https://dle.rae.es/cocotero) |
| ES | `cocotologia` | Se explica directamente que es hacer pajaritas de papel y se conserva que es una palabra poco usada. [DLE](https://dle.rae.es/cocotolog%C3%ADa) |
| ES | `cocteleria` | Se quitan las etiquetas y «arte y técnica»; se explican por separado los dos sentidos. El ejemplo muestra el bar, como el sinónimo elegido. [DLE](https://dle.rae.es/cocteler%C3%ADa) |
| ES | `codear` | Se explica el uso de los codos y el trato de igual a igual, sin la etiqueta «lenguaje informal». Se corrige la capa de rebase que restauraba el texto anterior. [DLE](https://dle.rae.es/codear) |
| ES | `codelincuente` | Se sustituyen «comisión» y «participa» por una explicación directa; se cambia «cómplice», que no es siempre equivalente. [DLE](https://dle.rae.es/codelincuente) |
| ES | `codeo` | Se explica la acción de mover o golpear con los codos y se simplifica el segundo sentido como «trato de igual a igual». El ejemplo muestra los codazos. [DLE](https://dle.rae.es/codeo), [codear](https://dle.rae.es/codear) |

No se registran exclusiones nuevas en este lote. «Cocota» permanece activa con un sentido documentado por el DLE.

## Lote 376

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cochinada` | Se explican sus dos sentidos con palabras comunes. El ejemplo muestra la suciedad y el sinónimo encaja. [DLE](https://dle.rae.es/cochinada) |
| ES | `cochineria` | Se cambia la definición circular por el sentido directo «cosa sucia o desagradable»; se conserva un ejemplo breve. [DLE](https://dle.rae.es/cochiner%C3%ADa), [cochinada](https://dle.rae.es/cochinada) |
| ES | `cochiquera` | Se quitan las etiquetas gramaticales y se explica directamente que es un lugar para guardar cerdos. [DLE](https://dle.rae.es/cochiquera) |
| ES | `cochitril` | Se explican por separado la habitación pequeña y sucia y el lugar donde se guardan cerdos. [DLE](https://dle.rae.es/cochitril) |
| ES | `cochizo` | Se cambia la etiqueta técnica por una explicación sencilla de la parte más valiosa de una mina. [DLE](https://dle.rae.es/cochizo) |
| ES | `cocinilla` | Se elimina la etiqueta gramatical y se explica que es una cocina pequeña que se puede llevar. [DLE](https://dle.rae.es/cocinilla) |
| ES | `cocobolo-valuable-hard-wood` | Se cambian «rojiza» y «carpintería» por palabras más comunes; se conserva su uso para fabricar muebles. [DLE](https://dle.rae.es/cocobolo) |
| ES | `cocorota` | Se explica directamente qué parte de la cabeza nombra y se conserva el uso para hablar de toda la cabeza. [DLE](https://dle.rae.es/cocorota) |

No se registran exclusiones nuevas en este lote.

## Lote 375

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cocedizo` | Se cambia la idea de rapidez por la de facilidad para cocer, que es el sentido del DLE; se reemplaza el ejemplo por una comida concreta. [DLE](https://dle.rae.es/cocedizo) |
| ES | `cocedor` | Se quitan las etiquetas gramaticales y se explican por separado la persona y el lugar. El ejemplo usa el sentido de lugar. [DLE](https://dle.rae.es/cocedor), [cocedero](https://dle.rae.es/cocedero) |
| ES | `cochambre` | Se quitan las etiquetas y se acortan los sentidos a suciedad grasienta y maloliente. «Mugre» y el ejemplo muestran el uso. [DLE](https://dle.rae.es/cochambre) |
| ES | `cochambroso` | Se explica directamente con «muy sucio» y se ajustan el sinónimo y el ejemplo. [DLE](https://dle.rae.es/cochambroso) |
| ES | `cochastro` | Se corrige un error de significado: no es un coche viejo, sino un jabalí lechal. Se define como cría de jabalí que aún toma leche. [DLE](https://dle.rae.es/cochastro) |
| ES | `coche-patrulla` | Se sustituye «vehículo» por «coche» y se explica para qué sirve con frases cortas. La RAE no recoge el compuesto; se mantiene el sentido de la ficha activa. [DLE: consulta exacta](https://dle.rae.es/coche-patrulla) |
| ES | `cochevira` | Se retira «sustantivo femenino» y se conserva una nota sencilla sobre su poco uso. [DLE](https://dle.rae.es/cochevira) |
| ES | `cochifrito` | Se conserva que es un plato de España y se explican los ingredientes y la preparación con palabras comunes. [DLE](https://dle.rae.es/cochifrito) |

No se registran exclusiones nuevas en este lote. «Cochastro» permanece activa con el sentido documentado por el DLE.

## Lote 367

| Idioma | ID | Decisión |
|---|---|---|
| ES | `clonico` | Se elimina la definición circular y se explica con palabras sencillas que se crea al copiar células o seres vivos. Se adapta el ejemplo. [DLE](https://dle.rae.es/cl%C3%B3nico) |
| ES | `clonico-identical-to-pattern` | Se conserva: la definición directa, el sinónimo «idéntico» y el ejemplo son claros y concuerdan. [DLE](https://dle.rae.es/cl%C3%B3nico) |
| ES | `cloquear` | Se quita la etiqueta verbal y se explica el sonido de la gallina con la onomatopeya «cloc, cloc». Se conserva «clocar» y el ejemplo. [DLE](https://dle.rae.es/cloquear) |
| ES | `cloqueo` | Se explica el sonido de la gallina sin «clueca» ni «onomatopeya». Se reemplaza ese término técnico en el sinónimo y el ejemplo. [DLE](https://dle.rae.es/cloqueo) |
| ES | `cloro` | Se simplifica la explicación del elemento químico y se cambia el ejemplo para que hable del símbolo Cl. [DLE](https://dle.rae.es/cloro) |
| ES | `cloro-bleach-cleaning-liquid` | Se sustituye «hipoclorito» por un uso concreto y se conserva «lejía» como sinónimo. [DLE](https://dle.rae.es/lej%C3%ADa) |

No se registran exclusiones nuevas en este lote.

## Lote 368

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cloroacetico` | Se reemplaza la explicación técnica por una frase directa sobre el ácido. El DLE no recoge el lema; se contrasta el compuesto con [PubChem](https://pubchem.ncbi.nlm.nih.gov/compound/300). [Consulta del DLE](https://dle.rae.es/cloroac%C3%A9tico) |
| ES | `clota` | Se cambia «hoya» por «hoyo», se conserva la nota de uso en Aragón y se adapta el ejemplo. [DLE](https://dle.rae.es/clota) |
| ES | `clown` | Se eliminan las etiquetas gramaticales y de origen; se explica directamente que es un payaso de circo. [DLE](https://dle.rae.es/clown) |
| ES | `clueco` | Se elimina la etiqueta gramatical, se explica «empollar» y se corrige el ejemplo: el DLE habla de gallinas y otras aves, no de gallos. [DLE](https://dle.rae.es/clueco) |
| ES | `cluniacense` | Se sustituye «orden monástica» por «orden» y se conserva el ejemplo claro con «monje de Cluny». [DLE](https://dle.rae.es/cluniacense) |
| ES | `coaccion` | Se explica la fuerza, la presión o la amenaza sin afirmar que todo acuerdo firmado así sea inválido. Se adapta el ejemplo. [DLE](https://dle.rae.es/coacci%C3%B3n) |

No se registran exclusiones nuevas en este lote.

## Lote 369

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coaccionar` | Se quitan la etiqueta jurídica y la advertencia sobre leyes; se explica directamente qué hace la persona y se adapta el ejemplo. [DLE](https://dle.rae.es/coaccionar) |
| ES | `coacervar` | Se conserva: la definición, el sinónimo «amontonar» y el ejemplo son claros y concuerdan. [DLE](https://dle.rae.es/coacervar) |
| ES | `coacreedor` | Se conserva la definición sencilla y se pone primero el sinónimo que ya expresa el ejemplo: «uno de los acreedores». [DLE](https://dle.rae.es/coacreedor) |
| ES | `coactivo` | Se elimina la etiqueta gramatical y «coacción»; se explica la obligación con palabras directas y se adapta el ejemplo. [DLE](https://dle.rae.es/coactivo) |
| ES | `coacusado` | Se conserva la definición y se cambia «coprocesado», menos común, por «otra persona acusada» en el sinónimo y el ejemplo. [DLE](https://dle.rae.es/coacusado) |
| ES | `coadjutor` | Se conserva la definición y el ejemplo claros; se elimina la variante poco común «coadyutor». [DLE](https://dle.rae.es/coadjutor) |

No se registran exclusiones nuevas en este lote.

## Lote 370

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coadunar` | Se explica directamente la acción y se rehace el ejemplo para que «reunir» lo sustituya de forma natural. [DLE](https://dle.rae.es/coadunar) |
| ES | `coadyuvar` | Se retiran la etiqueta gramatical y la nota de construcción; se explica la ayuda de forma directa. [DLE](https://dle.rae.es/coadyuvar) |
| ES | `coagulacion` | Se explica el proceso en líquidos y su función en la sangre, sin «hemostasia» ni notas de uso médico. [DLE](https://dle.rae.es/coagulaci%C3%B3n) |
| ES | `coagular` | Se retiran las etiquetas gramaticales y se explican los usos de hacer sólido un líquido y volverse sólido. El ejemplo concuerda con «cuajar». [DLE](https://dle.rae.es/coagular) |
| ES | `coagulo` | Se acorta la explicación clínica a la masa de sangre y su función; se simplifica el ejemplo. [DLE](https://dle.rae.es/co%C3%A1gulo) |
| ES | `coalescente` | Se elimina la etiqueta técnica y se explica directamente cómo gotas o partículas se unen. Se ajustan el sinónimo y el ejemplo. [DLE](https://dle.rae.es/coalescente) |
| ES | `coaligarse` | Se retira la etiqueta gramatical, se prioriza «aliarse» y se elimina «coligarse», menos común. [DLE](https://dle.rae.es/coaligarse) |
| ES | `coartada` | Se acorta la explicación jurídica y se sustituyen «alegación» y «prueba de presencia» por palabras más sencillas. [DLE](https://dle.rae.es/coartada) |

No se registran exclusiones nuevas en este lote.

## Lote 371

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coartador` | Se explican con palabras sencillas sus usos como cualidad y como persona; se adapta el ejemplo. [DLE](https://dle.rae.es/coartador) |
| ES | `coartar` | Se retiran la etiqueta gramatical y el sinónimo condicional; se explica directamente la limitación. [DLE](https://dle.rae.es/coartar) |
| ES | `coautor` | Se conserva el sentido de crear una obra y se añade, en otra frase, el uso para quien comete un delito con otra persona. [DLE](https://dle.rae.es/coautor) |
| ES | `coaxial` | Se elimina la etiqueta técnica y se explica la idea del eje común con un ejemplo más breve. [DLE](https://dle.rae.es/coaxial) |
| ES | `cobaltico` | Se explica el uso químico con palabras directas; PubChem identifica el ion cobáltico como Co³⁺. [PubChem](https://pubchem.ncbi.nlm.nih.gov/compound/105146) |
| ES | `cobalto` | Se acorta la definición y se cambia «elemento metálico» por «metal»; se alinea el ejemplo. [DLE](https://dle.rae.es/cobalto) |
| ES | `cobaltoterapia` | Se quita el detalle técnico y temporal; queda el tratamiento con radiación de cobalto-60. [DLE](https://dle.rae.es/cobaltoterapia) |
| ES | `cobardear` | Se retiran las etiquetas gramatical y de registro; se explica directamente el miedo. [DLE](https://dle.rae.es/cobardear) |

No se registran exclusiones nuevas en este lote.

## Lote 372

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cobardica` | Se cambia «timorato» por «miedoso» y se conserva la referencia a España, útil para entender su uso. [DLE](https://dle.rae.es/cobardica) |
| ES | `cobardon` | Se retiran la etiqueta gramatical, la explicación del aumentativo y sinónimos menos comunes; se simplifica el ejemplo. [DLE](https://dle.rae.es/cobard%C3%B3n) |
| ES | `cobayo` | Se acorta la descripción y se separa en frases la información sobre su uso como mascota y en experimentos. [DLE](https://dle.rae.es/cobayo), [cobaya](https://dle.rae.es/cobaya) |
| ES | `cobertera` | Se reduce la definición a su uso como tapa de una olla o recipiente; se alinea el ejemplo con «tapa». [DLE](https://dle.rae.es/cobertera) |
| ES | `cobertero` | Se explica con palabras comunes y se conserva activa la voz antigua; se simplifican el sinónimo y el ejemplo. [DLE](https://dle.rae.es/cobertero) |
| ES | `cobertor` | Se acorta la explicación a la tela que protege o da calor; se corrige también el shard que sobrescribía la definición. [DLE](https://dle.rae.es/cobertor) |
| ES | `cobertura-movil` | Se acorta la definición y se elimina la repetición del ejemplo sin añadir «en un lugar». [DLE](https://dle.rae.es/cobertura) |
| ES | `cobijador` | Se retira la etiqueta gramatical y se explican sus usos como cualidad, persona o cosa protectora. Se alinea el ejemplo. [DLE](https://dle.rae.es/cobijar) |

No se registran exclusiones nuevas en este lote.

## Exclusiones registradas durante el lote 303

La lista editorial creció mientras se regeneraba el runtime. Estas entradas constan ahora como excluidas por alcance, pero aún aparecían en el runtime de esa compilación. `avechucho` también tiene un sentido despectivo referido a una persona; `avellana` tiene además un sentido minero. Esos sentidos quedan señalados para comprobar si requieren fichas independientes.

| Idioma | ID | Motivo y evidencia |
|---|---|---|
| ES | `aspidistra` | Nombre de una planta ornamental. [DLE](https://dle.rae.es/aspidistra) |
| ES | `asturion` | Nombre de un esturión o de un caballo pequeño. [DLE](https://dle.rae.es/asturi%C3%B3n) |
| ES | `atabaca` | Nombre regional de la altabaca, una planta. [DLE](https://dle.rae.es/atabaca) |
| ES | `atahorma` | Nombre antiguo del aguilucho, un ave. [DLE](https://dle.rae.es/atahorma) |
| ES | `atramuz` | Nombre del altramuz, la planta y su fruto. [DLE](https://dle.rae.es/atramuz) |
| ES | `avechucho` | Nombre de un ave; el DLE también recoge un sentido despectivo referido a una persona. [DLE](https://dle.rae.es/avechucho) |
| ES | `avellana` | Fruto del avellano; el DLE recoge además un sentido minero. [DLE](https://dle.rae.es/avellana) |
| ES | `azofaifo` | Variante de «azufaifo», nombre de un árbol. [DLE](https://dle.rae.es/azofaifo) |
| ES | `azufaifa` | Fruto del azufaifo. [DLE](https://dle.rae.es/azufaifa) |
| ES | `babosilla` | Nombre poco usado de una babosa. [DLE](https://dle.rae.es/babosilla) |
| ES | `badian` | Nombre de un árbol cuyas semillas se usan como condimento. [DLE](https://dle.rae.es/badi%C3%A1n) |
| ES | `baladre` | Nombre de la adelfa, un arbusto. [DLE](https://dle.rae.es/baladre) |


## Lote 373

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cobijar` | Se quita la etiqueta verbal y se separan los sentidos de dar refugio y cubrir para proteger. [DLE](https://dle.rae.es/cobijar) |
| ES | `cobijera` | Se corrige el sentido de «manta»: el DLE recoge dos usos antiguos para una mujer de cámara o alcahueta. Se simplifican la definición, el sinónimo y el ejemplo. [DLE](https://dle.rae.es/cobijera) |
| ES | `cobrable` | Se explica que puede reclamarse el pago y se reemplaza el ejemplo metalingüístico. [DLE](https://dle.rae.es/cobrable) |
| ES | `cobranza` | Se explica directamente como cobro o gestión para que se pague una deuda; se alinea el ejemplo con «cobro». [DLE](https://dle.rae.es/cobranza) |
| ES | `cobreado` | Se sustituye «acción y efecto de» por una explicación directa del proceso y su resultado; se corrige el ejemplo. [DLE](https://dle.rae.es/cobreado), [cobrear](https://dle.rae.es/cobrear) |
| ES | `cobrear` | Se simplifica «recubrir» como «cubrir» y se reemplaza el ejemplo metalingüístico. [DLE](https://dle.rae.es/cobrear) |
| ES | `cobrizo` | Se acorta la definición y se reemplaza el ejemplo metalingüístico por una situación concreta. [DLE](https://dle.rae.es/cobrizo) |
| ES | `cocador` | Se sustituyen «cocos», «carantoñas» y «zalamero» por palabras más comunes; se conserva su uso antiguo y coloquial. [DLE](https://dle.rae.es/cocador), [cocar](https://dle.rae.es/cocar) |

No se registran exclusiones nuevas en este lote. «Cobijera» permanece activa con el sentido que documenta el DLE.
## Lote 374

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cocaina` | Se cambia la explicación química por una definición directa; se conserva un ejemplo sobre sus efectos en la salud. [DLE](https://dle.rae.es/coca%C3%ADna) |
| ES | `cocainomania` | Se quita «término antiguo» y se explica directamente como adicción a la cocaína. [DLE](https://dle.rae.es/cocainoman%C3%ADa) |
| ES | `cocainomano` | Se usa una descripción centrada en la persona y un sinónimo sencillo; se conserva una nota breve sobre posible uso ofensivo, acorde con la guía de lenguaje sobre adicciones. [DLE](https://dle.rae.es/cocain%C3%B3mano), [NIDA: Words Matter](https://nida.nih.gov/sites/default/files/nidamed_words_matter_terms.pdf) |
| ES | `cocama-tupi-guarani-language` | Se cambia el nombre técnico de la familia lingüística por una explicación directa. [DLE](https://dle.rae.es/cocama) |
| ES | `cocar` | Se retiran «cocos» y «carantoñas»; se explica qué hace la persona y se conserva su uso antiguo y coloquial. [DLE](https://dle.rae.es/cocar) |
| ES | `coccineo` | Se corrige la fuente: el DLE lo relaciona con el púrpura, no con el escarlata; se explica el color con palabras comunes. [DLE](https://dle.rae.es/cocc%C3%ADneo), [púrpura](https://dle.rae.es/p%C3%BArpura) |
| ES | `coceador` | Se retiran las etiquetas gramaticales y se explica «cocear» con palabras comunes. [DLE](https://dle.rae.es/coceador) |
| ES | `cocear` | Se cambia «coces» por «patadas» y se añade el sentido coloquial de rechazar algo. [DLE](https://dle.rae.es/cocear) |

No se registran exclusiones nuevas en este lote.

## Exclusiones registradas después del lote 304

| Idioma | ID | Motivo y evidencia |
|---|---|---|
| ES | `crustaceo` | Como sustantivo, nombra un grupo de animales; el adjetivo «que tiene costra» queda señalado para revisar si necesita una ficha aparte. [DLE](https://dle.rae.es/crust%C3%A1ceo) |
| ES | `ctenoforo` | Nombre de un animal marino que también se usa para el grupo taxonómico. [DLE](https://dle.rae.es/cten%C3%B3foro) |
| ES | `cuculiforme` | Nombre de un ave o del grupo de aves al que pertenece. [DLE](https://dle.rae.es/cuculiforme) |
| ES | `cuatropea-four-footed-animal-1378` | La definición de origen lo identifica como animal; no se encontró una entrada exacta en el DLE. [Consulta del DLE](https://dle.rae.es/?w=cuatropea) |
| ES | `cruza-result-of-crossbreeding` | La ficha se refiere al cruce de animales; el DLE da ejemplos de cruzas de ganado. [DLE](https://dle.rae.es/cruza) |
| ES | `detienebuey` | El DLE remite a la gatuña, una planta. [DLE](https://dle.rae.es/detienebuey) |
| ES | `diaquenio` | Término botánico para un fruto formado por dos aquenios unidos. [DLE](https://dle.rae.es/diaquenio) |
| ES | `dibranquial` | Describe moluscos cefalópodos y se usa para el grupo taxonómico. [DLE](https://dle.rae.es/dibranquial) |
| ES | `dionea` | El DLE la identifica con la atrapamoscas, una planta. [DLE](https://dle.rae.es/dionea) |
## Exclusiones registradas después del lote 305

| Idioma | ID | Motivo y evidencia |
|---|---|---|
| ES | `dondiego` | Nombre de una planta. [DLE](https://dle.rae.es/dondiego) |
| ES | `dulcamara` | Nombre de una planta trepadora tóxica. [DLE](https://dle.rae.es/dulcamara) |
| ES | `elaterio` | El DLE lo identifica con el cohombrillo amargo, una planta. [DLE](https://dle.rae.es/elaterio) |
| ES | `emperador-pez` | La ficha se refiere al pez emperador, un pez marino. [DLE](https://dle.rae.es/emperador) |
| ES | `endrina` | Fruto del endrino. [DLE](https://dle.rae.es/endrino) |
| ES | `endrino` | Nombre de un ciruelo silvestre. [DLE](https://dle.rae.es/endrino) |
| ES | `enebrina` | Fruto del enebro. [DLE](https://dle.rae.es/enebrina) |
| ES | `enebro` | Nombre de un arbusto. [DLE](https://dle.rae.es/enebro) |
| ES | `enredadera` | Planta trepadora que se enreda en otras plantas o soportes. [DLE](https://dle.rae.es/enredadera) |
| ES | `eperlano` | Nombre de un pez de los mares del norte de Europa. [DLE](https://dle.rae.es/eperlano) |
| ES | `equisetineo` | Relativo a un grupo de plantas. [DLE](https://dle.rae.es/equiset%C3%ADneo) |
| ES | `eringe` | Nombre de una planta. [DLE](https://dle.rae.es/eringe) |
| ES | `eritroxilaceo` | Relativo a un grupo de árboles y arbustos. [DLE](https://dle.rae.es/eritroxil%C3%A1ceo) |
| ES | `ervato` | El DLE lo identifica con el servato, una planta. [DLE](https://dle.rae.es/ervato) |
| ES | `escabiosa` | Nombre de varias plantas. [DLE](https://dle.rae.es/escabiosa) |
| ES | `round2458-escatofago-animal` | Describe a un animal que ingiere excrementos. [DLE](https://dle.rae.es/escat%C3%B3fago) |
| ES | `round2476-escualido-zoologia` | Describe un pez del grupo de los escualos. [DLE](https://dle.rae.es/escu%C3%A1lido) |
| ES | `round2476-escualo` | Nombre de un pez del grupo de los escuálidos. [DLE](https://dle.rae.es/escualo) |
| ES | `round2477-escudete-nenufar` | Sentido específico que el DLE identifica con el nenúfar; la palabra tiene otros sentidos aparte. [DLE](https://dle.rae.es/escudete) |
| ES | `round2478-escuerzo-anfibio` | Sentido referido al sapo; el DLE recoge además un uso despectivo para una persona. [DLE](https://dle.rae.es/escuerzo) |
| ES | `round2480-escupina-molusco` | Nombre de un molusco bivalvo. [DLE](https://dle.rae.es/escupi%C3%B1a) |
| ES | `round2481-escusa-res-pastor` | Sentido referido a ganado; el DLE también recoge otros usos de «escusa». [DLE](https://dle.rae.es/escusa) |
| ES | `esfenisciforme` | Relativo a pingüinos y otras aves que no vuelan. [DLE](https://dle.rae.es/esfenisciforme) |
| ES | `round2492-espadin-fish` | Sentido referido a un pez parecido a la sardina; el DLE recoge además una espada estrecha. [DLE](https://dle.rae.es/espad%C3%ADn) |
| ES | `esparraguera` | Sentido referido a la planta; el DLE también recoge sentidos para personas que cultivan o venden espárragos. [DLE](https://dle.rae.es/esparraguero) |
| ES | `esparver` | Nombre del gavilán, un ave. [DLE](https://dle.rae.es/esparver) |
## Exclusiones incorporadas en el lote 300

La lista editorial actualizada el 24 de noviembre de 2026 excluye estos nombres de plantas, árboles, frutos y animales, además de términos taxonómicos. Las entradas están ausentes del runtime regenerado. Se enlaza la consulta del DLE que respalda la clasificación; `abrepuno` aparece en el DLE como `abrepuño`, y `oliva` ya constaba en una revisión anterior antes de aplicarse el criterio de alcance actualizado.

| Idioma | ID | Decisión |
|---|---|---|
| ES | `abrepuno` | Excluida por alcance; el DLE recoge la forma relacionada «abrepuño» como planta. [DLE](https://dle.rae.es/abrepu%C3%B1o) |
| ES | `abietaceo` | Excluido por alcance; el DLE lo identifica con las pináceas y señala que se usó como nombre taxonómico. [DLE](https://dle.rae.es/abiet%C3%A1ceo) |
| ES | `alhucena` | Excluida por alcance; el DLE recoge «alhuceña» como planta. [DLE](https://dle.rae.es/alhuce%C3%B1a) |
| ES | `alpiste` | Excluida por alcance; el DLE recoge la planta y su semilla. [DLE](https://dle.rae.es/alpiste) |
| ES | `aron` | Excluida por alcance; el DLE remite a «aro», nombre de planta. [DLE](https://dle.rae.es/aron) |
| ES | `arzolla` | Excluida por alcance; el DLE la define como planta y también recoge un segundo sentido relacionado con un cardo. [DLE](https://dle.rae.es/arzolla) |
| ES | `artanita` | Excluida por alcance; el DLE la identifica con el ciclamen. [DLE](https://dle.rae.es/artanita) |
| ES | `asnacho` | Excluida por alcance; el DLE la define como planta y también la relaciona con la gatuña. [DLE](https://dle.rae.es/asnacho) |
| ES | `asperilla` | Excluida por alcance; el DLE la define como planta. [DLE](https://dle.rae.es/asperilla) |
| ES | `avispon` | Excluida por alcance; el DLE define «avispón» como una especie de avispa. [DLE](https://dle.rae.es/avisp%C3%B3n) |
| ES | `ayua` | Excluida por alcance; el DLE la define como árbol. [DLE](https://dle.rae.es/ay%C3%BAa) |
| ES | `bada` | Excluida por alcance; el DLE recoge su uso antiguo como «rinoceronte». [DLE](https://dle.rae.es/bada) |
| ES | `brionia` | Excluida por alcance; el DLE la define como planta. [DLE](https://dle.rae.es/brionia) |
| ES | `bovido` | Excluida por alcance; el DLE describe «bóvido» como grupo de mamíferos. [DLE](https://dle.rae.es/b%C3%B3vido) |
| ES | `bufalo` | Excluida por alcance; el DLE define «búfalo» como animal. [DLE](https://dle.rae.es/b%C3%BAfalo) |
| ES | `calaminta` | Excluida por alcance; el DLE la define como hierba. [DLE](https://dle.rae.es/calaminta) |
| ES | `coniza` | Excluida por alcance; el DLE la define como planta. [DLE](https://dle.rae.es/coniza) |
| ES | `coronillo` | Excluida por alcance; el DLE lo define como arbusto. [DLE](https://dle.rae.es/coronillo) |
| ES | `correyuela` | Excluida por alcance; el DLE remite a «correhuela», una planta. [DLE](https://dle.rae.es/correyuela) |
| ES | `crisantemo` | Excluida por alcance; el DLE recoge la planta y su flor. [DLE](https://dle.rae.es/crisantemo) |
| ES | `dictamo` | Excluida por alcance; el DLE lo define como arbusto y recoge otras plantas con ese nombre. [DLE](https://dle.rae.es/d%C3%ADctamo) |
| ES | `equiseto` | Excluida por alcance; el DLE lo define como nombre de un grupo de plantas. [DLE](https://dle.rae.es/equiseto) |
| ES | `gradiolo` | Excluida por alcance según la decisión editorial; no se encontró una entrada exacta en el DLE. [Consulta del DLE](https://dle.rae.es/?w=grad%C3%ADolo) |
| ES | `grajilla` | Excluida por alcance; el DLE la define como ave. [DLE](https://dle.rae.es/grajilla) |
| ES | `iguedo` | Excluida por alcance; el DLE lo define como animal cabrío. [DLE](https://dle.rae.es/ig%C3%BCedo) |
| ES | `mirsinaceo` | Excluida por alcance; el DLE lo describe como grupo de plantas. [DLE](https://dle.rae.es/mirsin%C3%A1ceo) |
| ES | `malvaceo` | Excluido por alcance; el DLE lo describe como planta y recoge la forma plural como nombre de un grupo taxonómico. [DLE](https://dle.rae.es/malv%C3%A1ceo) |
| ES | `mostajo` | Excluida por alcance; el DLE lo define como árbol. [DLE](https://dle.rae.es/mostajo) |
| ES | `nastuerzo-planta` | Excluida por alcance; el DLE remite a «mastuerzo», nombre de planta. [DLE](https://dle.rae.es/nastuerzo) |
| ES | `oliva` | Actualizada su situación: ya constaba en una revisión anterior y ahora se excluye por el criterio de alcance. [DLE](https://dle.rae.es/oliva) |
| ES | `psitacida` | Excluida por alcance; el DLE la define como grupo de aves. [DLE](https://dle.rae.es/psit%C3%A1cida) |
| ES | `psitacida-2` | Excluida por alcance; el DLE define «psitácida» como grupo de aves. [DLE](https://dle.rae.es/psit%C3%A1cida) |
| ES | `round3434-malagueta-tree` | Excluida por alcance según la decisión editorial; el DLE recoge «malagueta» como nombre de planta. [DLE](https://dle.rae.es/malagueta) |
| ES | `round3567-mesto-rebollo` | Excluida por alcance; el DLE recoge «mesto» como árbol híbrido. [DLE](https://dle.rae.es/mesto) |
| ES | `viverrido` | Excluida por alcance; el DLE lo define como grupo de mamíferos. [DLE](https://dle.rae.es/viv%C3%A9rrido) |
| ES | `yuglandaceo` | Excluido por alcance; el DLE lo define como grupo de árboles y señala su uso como nombre taxonómico. [DLE](https://dle.rae.es/yugland%C3%A1ceo) |
| EN | `caprifoliaceous` | Excluida por alcance; la definición la vincula con la familia vegetal Caprifoliaceae. [Collins, *caprifoliaceous*](https://www.collinsdictionary.com/us/dictionary/english/caprifoliaceous) |
| EN | `saxifragaceous` | Excluida por alcance; significa «perteneciente a la familia vegetal Saxifragaceae». [Collins, *saxifragaceous*](https://www.collinsdictionary.com/us/dictionary/english/saxifragaceous) |
| EN | `round2473-magnoliaceous` | Excluida por alcance; «magnoliaceous» significa «relativo a la familia vegetal Magnoliaceae». [Collins, *magnoliaceous*](https://www.collinsdictionary.com/us/dictionary/english/magnoliaceous) |
| EN | `borage-family-adj` | Excluida por alcance; la definición la vincula con la familia botánica Boraginaceae. [NCBI MeSH, Boraginaceae](https://meshb.nlm.nih.gov/record/ui?ui=D028082) |
| ES | `aroideo` | Excluido por alcance; el DLE lo define como relativo a la familia de las aráceas. [DLE](https://dle.rae.es/aroideo) |
| ES | `campanulaceo` | Excluido por alcance; el DLE lo define como relativo a las campanuláceas. [DLE](https://dle.rae.es/campanul%C3%A1ceo) |
| ES | `caprifoliaceo` | Excluido por alcance; el DLE lo define como relativo a las caprifoliáceas. [DLE](https://dle.rae.es/caprifoli%C3%A1ceo) |
| ES | `colquicaceo` | Excluido por alcance; el DLE lo define como relativo a las colquicáceas. [DLE](https://dle.rae.es/colquic%C3%A1ceo) |
| ES | `cupresaceo` | Excluido por alcance; el DLE lo define como relativo a las cupresáceas. [DLE](https://dle.rae.es/cupres%C3%A1ceo) |
| ES | `cupulifero` | Excluido por alcance; el DLE lo relaciona con plantas cupulíferas, como robles y castaños. [DLE](https://dle.rae.es/cupul%C3%ADfero) |
| ES | `droseraceo` | Excluido por alcance; el DLE lo define como relativo a las droseráceas. [DLE](https://dle.rae.es/droser%C3%A1ceo) |
| ES | `equisetaceo` | Excluido por alcance; el DLE lo define como relativo a las equisetáceas. [DLE](https://dle.rae.es/equiset%C3%A1ceo) |
| ES | `fagaceo` | Excluido por alcance; el DLE lo define como relativo a las fagáceas. [DLE](https://dle.rae.es/fag%C3%A1ceo) |
| ES | `felido` | Excluido por alcance; el DLE lo define como relativo a los félidos, una familia de mamíferos. [DLE](https://dle.rae.es/f%C3%A9lido) |
| ES | `mirtaceo` | Excluido por alcance; el DLE lo define como relativo a las mirtáceas. [DLE](https://dle.rae.es/mirt%C3%A1ceo) |
| ES | `monimiaceo` | Excluido por alcance; el DLE lo define como relativo a las monimiáceas. [DLE](https://dle.rae.es/monimi%C3%A1ceo) |
| ES | `moraceo` | Excluido por alcance; el DLE lo define como relativo a las moráceas. [DLE](https://dle.rae.es/mor%C3%A1ceo) |
| ES | `oleaceo` | Excluido por alcance; el DLE lo define como relativo a las oleáceas. [DLE](https://dle.rae.es/ole%C3%A1ceo) |
| ES | `oxalidaceo` | Excluido por alcance; el DLE lo define como relativo a las oxalidáceas. [DLE](https://dle.rae.es/oxalid%C3%A1ceo) |
| ES | `pontederiaceo` | Excluido por alcance; el DLE lo define como relativo a las pontederiáceas. [DLE](https://dle.rae.es/pontederi%C3%A1ceo) |
| ES | `sapotaceo` | Excluido por alcance; el DLE lo define como relativo a las sapotáceas. [DLE](https://dle.rae.es/sapot%C3%A1ceo) |
| ES | `verbenaceo` | Excluido por alcance; el DLE lo define como relativo a las verbenáceas. [DLE](https://dle.rae.es/verben%C3%A1ceo) |

| ES | `aborton` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye por alcance. El DLE recoge sentidos sobre un animal nacido antes de tiempo y su piel. [DLE](https://dle.rae.es/abort%C3%B3n) |
| ES | `abrunal` | Excluido por la decisión editorial de alcance; no se encontró una entrada exacta en el DLE. [Consulta del DLE](https://dle.rae.es/abrunal) |
| ES | `acalia` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE la define como planta. [DLE](https://dle.rae.es/acalia) |
| ES | `acantio` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE lo define como cardo. [DLE](https://dle.rae.es/acantio) |
| ES | `acebuche` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE lo define como árbol. [DLE](https://dle.rae.es/acebuche) |
| ES | `acebuchina` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE la define como fruto del acebuche. [DLE](https://dle.rae.es/acebuchina) |
| ES | `acerola` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE la define como fruto. [DLE](https://dle.rae.es/acerola) |
| ES | `acerolo` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE lo define como árbol. [DLE](https://dle.rae.es/acerolo) |
| ES | `acetin` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye según el criterio de alcance editorial. [Consulta del DLE](https://dle.rae.es/acet%C3%ADn) |
| ES | `acaro` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE lo define como arácnido y lo usa como taxón. [DLE](https://dle.rae.es/%C3%A1caro) |
| ES | `acridido` | Actualizada su situación: ya constaba en una revisión activa; ahora se excluye porque el DLE lo define como grupo de insectos. [DLE](https://dle.rae.es/acr%C3%ADdido) |
| ES | `agerato` | Excluido por alcance; el DLE lo define como planta. [DLE](https://dle.rae.es/ag%C3%A9rato) |
| ES | `agnocasto` | Excluido por alcance; el DLE lo identifica con el sauzgatillo, una planta. [DLE](https://dle.rae.es/agnocasto) |
| ES | `agracejina` | Excluida por alcance; el DLE la define como fruto del agracejo. [DLE](https://dle.rae.es/agracejina) |
| ES | `agrazon` | Excluido por alcance; el DLE recoge varios sentidos de plantas y frutos, además de un uso figurado. [DLE](https://dle.rae.es/agraz%C3%B3n) |
| ES | `agrecillo` | Excluido por alcance; el DLE lo identifica con el agracejo. [DLE](https://dle.rae.es/agrecillo) |
| ES | `agreta` | Excluida por alcance; el DLE la remite a la acedera, una planta. [DLE](https://dle.rae.es/agreta) |
| ES | `agriaz` | Excluido por alcance; el DLE lo identifica con el cinamomo, un árbol. [DLE](https://dle.rae.es/agriaz) |
| ES | `agrifolio` | Excluido por alcance; el DLE lo identifica con el acebo, un árbol. [DLE](https://dle.rae.es/agrifolio) |
| ES | `agrion` | Excluido por alcance; el DLE lo vincula con el agriaz y también recoge un sentido veterinario. [DLE](https://dle.rae.es/agri%C3%B3n) |
| ES | `aguamala` | Excluida por alcance; el DLE la identifica con la medusa. [DLE](https://dle.rae.es/aguamala) |
| ES | `aguamar` | Excluido por alcance; el DLE lo identifica con la medusa. [DLE](https://dle.rae.es/aguamar) |
| ES | `aguin` | Excluido por alcance; el DLE lo identifica con el tejo, un árbol. [DLE](https://dle.rae.es/agu%C3%ADn) |
| ES | `ailanto` | Excluido por alcance según la decisión editorial; el DLE recoge el ailanto como árbol. [DLE](https://dle.rae.es/ailanto) |
## Exclusiones coincidentes con la compilación anterior

La lista editorial siguió creciendo después de la última compilación. Estas 13 fichas todavía aparecían en sus índices; la siguiente compilación debe retirarlas. Se enlaza el DLE para registrar el motivo de alcance. En «nepente», «oblada» y «ostra» hay sentidos adicionales; «ontina» y «orobanca» tienen definiciones fuente que no coinciden con el DLE, por lo que conviene revisar esas fichas si se reconsidera su exclusión.

| Idioma | ID | Motivo y evidencia |
|---|---|---|
| ES | `nepente` | El DLE recoge una hierba carnívora y una bebida mitológica. [DLE](https://dle.rae.es/nepente) |
| ES | `oblada-pez` | El DLE recoge «oblada» como pez; también distingue otra entrada para una ofrenda a los difuntos. [DLE](https://dle.rae.es/oblada) |
| ES | `ocra` | Planta cultivada cuyo fruto se usa en guisos. [DLE](https://dle.rae.es/ocra) |
| ES | `olivarda` | Ave y planta. [DLE](https://dle.rae.es/olivarda) |
| ES | `olivillo` | Arbusto de las Antillas. [DLE](https://dle.rae.es/olivillo) |
| ES | `onagra` | Arbusto. [DLE](https://dle.rae.es/onagra) |
| ES | `ontina` | El DLE la define como planta; la definición fuente actual la describe como una persona que gasta demasiado. [DLE](https://dle.rae.es/ontina) |
| ES | `orobanca` | El DLE la define como planta parásita; la definición fuente actual la describe como un juego de cartas. [DLE](https://dle.rae.es/orobanca) |
| ES | `oropendola` | Nombre de un ave. [DLE](https://dle.rae.es/orop%C3%A9ndola) |
| ES | `orozuz` | Planta cuya raíz se usa para obtener un jugo dulce. [DLE](https://dle.rae.es/orozuz) |
| ES | `ortiga` | Planta que tiene pelos que irritan la piel. [DLE](https://dle.rae.es/ortiga) |
| ES | `osteictio` | Término zoológico para los peces con esqueleto óseo. [DLE](https://dle.rae.es/oste%C3%ADctio) |
| ES | `ostra` | Molusco y su concha; el DLE también recoge un uso coloquial para una persona retraída. [DLE](https://dle.rae.es/ostra) |
| ES | `abedul` | Árbol; el DLE también recoge su madera. [DLE](https://dle.rae.es/abedul) |
| ES | `abiar` | Remite a «manzanilla loca», una planta. [DLE](https://dle.rae.es/abiar), [manzanilla loca](https://dle.rae.es/manzanilla) |
| ES | `ahogaviejas` | La ficha fuente lo definía como planta, pero el lema no aparece en el DLE; se excluye por falta de verificación léxica. [Consulta del DLE](https://dle.rae.es/?w=ahogaviejas) |
| ES | `ajebe` | Voz desusada para «jebe» y nombre antiguo de la hevea, un árbol. [DLE](https://dle.rae.es/ajebe) |
| ES | `albarcoquero` | Variante de «albaricoquero», nombre de un árbol. [DLE](https://dle.rae.es/albarcoquero), [albaricoquero](https://dle.rae.es/albaricoquero) |
| ES | `albaricoquero` | Árbol que da albaricoques; también se usa su madera. [DLE](https://dle.rae.es/albaricoquero) |
| ES | `alcabota` | Nombre regional andaluz de una planta llamada «cabezuela». [DLE](https://dle.rae.es/alcabota), [cabezuela](https://dle.rae.es/cabezuela) |
| ES | `alcamar` | Nombre de un ave rapaz americana. [DLE](https://dle.rae.es/alcamar) |
| ES | `alcanforero` | Árbol del que se extrae alcanfor. [DLE](https://dle.rae.es/alcanforero) |
| ES | `alfilerillo` | Nombre de varias plantas y de un insecto que ataca el tabaco. [DLE](https://dle.rae.es/alfilerillo) |

## Exclusiones retiradas en la compilación de las 19:08

Estas quince entradas seguían activas en los índices anteriores. La compilación de las 19:08 las retiró del runtime. Se conserva la evidencia y se anotan los sentidos adicionales y las diferencias con las fichas fuente para evitar confundirlos con la acepción que motivó cada decisión.

| Idioma | ID | Motivo y evidencia |
|---|---|---|
| ES | `tangerina` | El DLE remite a la mandarina, un fruto. [DLE](https://dle.rae.es/tangerina) |
| ES | `tartago` | El DLE recoge una planta y también sentidos de disgusto o chasco pesado. [DLE](https://dle.rae.es/t%C3%A1rtago) |
| ES | `tellina` | Molusco marino parecido a una almeja; la ficha fuente lo llama mejillón. [DLE](https://dle.rae.es/tellina), [telina](https://dle.rae.es/telina) |
| ES | `round5103-tijereta-bird` | La ficha fuente y una acepción del DLE nombran un ave marina. [DLE](https://dle.rae.es/tijereta) |
| ES | `tijereta` | La ficha fuente corresponde al insecto; el DLE también recoge el ave y un zarcillo de vid. [DLE](https://dle.rae.es/tijereta) |
| ES | `tijerilla` | El DLE la define como un zarcillo de la vid, aunque la ficha fuente la describe como insecto. [DLE](https://dle.rae.es/tijerilla) |
| ES | `tilo` | Árbol del que se obtiene la tila. [DLE](https://dle.rae.es/tilo) |
| ES | `tipa` | Árbol sudamericano; el DLE también recoge un cesto argentino. [DLE](https://dle.rae.es/tipa) |
| ES | `tipula` | La forma acentuada «típula» nombra un insecto; el lema sin tilde no figura en el DLE. [Consulta del DLE](https://dle.rae.es/tipula), [típula](https://dle.rae.es/t%C3%ADpula) |
| ES | `toba-thistle` | La ficha fuente recoge el sentido de cardo; «toba» tiene otros sentidos de roca y costra. [DLE](https://dle.rae.es/toba) |
| ES | `tijeruela` | El DLE la define como zarcillo de la vid; la ficha fuente describe un cuchillo. [DLE](https://dle.rae.es/tijeruela) |
| ES | `vieira` | Molusco comestible y su concha; el DLE recoge ambos sentidos. Conviene revisar si el uso como alimento necesita una ficha aparte. [DLE](https://dle.rae.es/vieira) |
| ES | `viviparo` | Adjetivo de zoología para un animal cuyas crías se desarrollan dentro de la madre. No nombra una especie. [DLE](https://dle.rae.es/viv%C3%ADparo) |
| ES | `yute` | Planta y fibra textil; el DLE también recoge el tejido hecho con esa fibra. Conviene revisar esos usos de material. [DLE](https://dle.rae.es/yute) |
| ES | `zapote-edible-fruit` | Fruto dulce del zapote. [DLE](https://dle.rae.es/zapote) |
## Lote 462

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coreografico` | Explicado directamente como algo relacionado con los pasos de baile; ajustados sinónimo y ejemplo. [DLE](https://dle.rae.es/coreogr%C3%A1fico) |
| ES | `coriaceo` | Simplificada la comparación con el cuero y aclarado el sentido botánico; ajustados ejemplo y sinónimos. [DLE](https://dle.rae.es/cori%C3%A1ceo) |
| ES | `coribante` | Explicado como sacerdote que bailaba en las fiestas de Cibeles; simplificados sinónimo y ejemplo. [DLE](https://dle.rae.es/coribante) |
| ES | `corifeo` | Simplificado el sentido del coro y conservado el uso como líder o portavoz; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/corifeo) |
| ES | `corindon` | Explicado como piedra muy dura usada para pulir; conservadas sus variedades rubí y zafiro, y sincronizados los sinónimos en las capas editoriales. [DLE](https://dle.rae.es/corind%C3%B3n) |
| ES | `corladura` | Explicados por separado el barniz y la técnica; ajustados sinónimo y ejemplo. [DLE](https://dle.rae.es/corladura) |
| ES | `corma` | Simplificados el sentido del cepo y el uso figurado; expresada con sencillez la marca de uso poco frecuente. [DLE](https://dle.rae.es/corma) |
| ES | `cornaca` | Explicado directamente como quien doma, guía y cuida elefantes; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/cornaca) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones nuevas en este lote. La exclusión `entunarse` corresponde a la ficha «Entuñarse»: la RAE marca su uso como regional de Salamanca y la guía excluye regionalismos. [DLE](https://dle.rae.es/entu%C3%B1arse)
## Lote 463

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cornada` | Separados el golpe y la herida en frases breves; aclarado «herida de asta» como «herida de cuerno». [DLE](https://dle.rae.es/cornada) |
| ES | `cornalina` | Simplificada la descripción del color y explicado su uso para adornos. [DLE](https://dle.rae.es/cornalina) |
| ES | `cornalon` | Explicado directamente como toro o vaca con cuernos muy grandes; retirado el sinónimo ambiguo «cornudo». [DLE](https://dle.rae.es/cornal%C3%B3n) |
| ES | `cornamenta` | Simplificada la definición y conservado un sinónimo de uso común; actualizado el ejemplo para que coincida. [DLE](https://dle.rae.es/cornamenta) |
| ES | `corneador` | Explicado directamente como quien ataca con los cuernos; reducido el sinónimo a una forma clara. [DLE](https://dle.rae.es/corneador) |
| ES | `cornear` | Retirada la etiqueta gramatical y explicado el verbo con palabras corrientes; simplificados sinónimo y ejemplo. [DLE](https://dle.rae.es/cornear) |
| ES | `cornete` | Simplificada la explicación anatómica y retirado un sinónimo poco claro. [DLE](https://dle.rae.es/cornete) |
| ES | `cornetin` | Simplificada la descripción musical y militar en tres frases cortas; sincronizadas las capas editoriales que la sobrescribían. [DLE](https://dle.rae.es/cornet%C3%ADn) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones nuevas.
## Lote 464

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cornucopia` | Sustituida la explicación simbólica extensa por una descripción directa de la vasija y su uso como adorno. [DLE](https://dle.rae.es/cornucopia) |
| ES | `cornupeta` | Simplificados los sentidos del animal con cuernos y del uso como adjetivo; retirado el sinónimo no estándar y revisado el ejemplo. [DLE](https://dle.rae.es/corn%C3%BApeta) |
| ES | `cornupeto` | Excluida: la fuente la identifica como variante no estándar y el DLE no recoge el lema; remite a «cornúpeta». [DLE](https://dle.rae.es/corn%C3%BApeto) |
| ES | `cornuto` | Explicado directamente como animal con cuernos; simplificados el sinónimo y el ejemplo. [DLE](https://dle.rae.es/cornuto) |
| ES | `corpachon` | Revisión de seguimiento del lote 313: se conserva la definición sencilla, se expresa con claridad el uso informal y se retira «cuerpo corpulento». [DLE](https://dle.rae.es/corpach%C3%B3n) |
| ES | `corpezuelo` | Explicado como cuerpo pequeño y conservada la marca de uso poco frecuente; sustituidos sinónimo y ejemplo metalingüístico. [DLE](https://dle.rae.es/corpezuelo) |
| ES | `corporalidad` | Separados y simplificados los sentidos de presencia física y condición de tener cuerpo; actualizado el ejemplo. [DLE](https://dle.rae.es/corporalidad) |
| ES | `corporeizar` | Sustituida la expresión abstracta «dar cuerpo» por una explicación concreta; reducido el sinónimo a «materializar». [DLE](https://dle.rae.es/corporeizar) |

Se revisaron siete fichas activas; `corpachon` ya constaba en el lote 313 y se volvió a revisar. `cornupeto` estaba activa antes de la revisión y se excluyó con la evidencia indicada.
## Lote 465

| Idioma | ID | Decisión |
|---|---|---|
| ES | `corporeo` | Quitadas las etiquetas gramaticales y la repetición del lema; explicados por separado los dos sentidos. [DLE](https://dle.rae.es/corp%C3%B3reo) |
| ES | `corporificar` | Explicado directamente como dar forma física a algo que no la tiene; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/corporificar) |
| ES | `corporizar` | Simplificada la explicación de cómo una idea o algo no material adquiere forma; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/corporizar) |
| ES | `corpusculo` | Simplificada la explicación de su tamaño; retirados sinónimos que nombraban tipos o ejemplos, no equivalentes claros. [DLE](https://dle.rae.es/corp%C3%BAsculo) |
| ES | `correazo` | Quitada la etiqueta gramatical y conservados dos sinónimos más claros. [DLE](https://dle.rae.es/correazo) |
| ES | `corredero` | Explicado directamente como algo que se desliza por un carril; retirada la acepción de carril, que corresponde a «corredera». [DLE](https://dle.rae.es/corredero) |
| ES | `corredizo` | Simplificado el sentido referido sobre todo a un nudo; retirados sinónimos poco ajustados a ese uso. [DLE](https://dle.rae.es/corredizo) |
| ES | `corredura` | Explicada como la parte del líquido que rebosa al medirlo; actualizado el ejemplo para mostrar esa situación. [DLE](https://dle.rae.es/corredura) |

Las ocho fichas estaban activas en el runtime; `correveidile` y `corriveras` ya constaban en lotes anteriores y se revisaron de nuevo. No se añadieron exclusiones.
## Lote 466

| Idioma | ID | Decisión |
|---|---|---|
| ES | `correero` | Quitada la etiqueta gramatical y explicado directamente el oficio; retirado un sinónimo especializado. [DLE](https://dle.rae.es/correero) |
| ES | `corregidor` | Simplificados el sentido de «que corrige» y los dos usos históricos, sin eliminar la función de administrar justicia. [DLE](https://dle.rae.es/corregidor) |
| ES | `correlato` | Sustituida la explicación metalingüística por «elemento que se corresponde con otro»; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/correlato) |
| ES | `corresponsabilidad` | Quitada la etiqueta gramatical y conservado el sentido de responsabilidad compartida. [DLE](https://dle.rae.es/corresponsabilidad) |
| ES | `corretear` | Acortada la definición activa y sincronizada su corrección editorial; la fuente conserva aparte el uso regional de «perseguir». [DLE](https://dle.rae.es/corretear) |
| ES | `correteo` | Explicado directamente como acción de correr de un lado a otro; retirado «persecución» por no encajar con el ejemplo. [DLE](https://dle.rae.es/correteo) |
| ES | `corretero` | Explicado como quien corre de un lado a otro por juego; expresado con sencillez su uso informal y revisados sinónimo y ejemplo. [DLE](https://dle.rae.es/corretero) |

Las ocho fichas estaban activas en el runtime; `correoso` ya figuraba en la auditoría y se volvió a revisar. No se añadieron exclusiones.
## Lote 467

| Idioma | ID | Decisión |
|---|---|---|
| ES | `correton` | Explicados directamente sus dos sentidos; ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/corret%C3%B3n) |
| ES | `correturnos` | Quitada la etiqueta gramatical y cambiado «librar» por «tener el día libre»; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/correturnos) |
| ES | `correveidile` | Revisada de nuevo: explicados directamente sus dos sentidos; conservado el uso informal sin etiqueta y revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/correveidile) |
| ES | `correveras` | Quitadas la etiqueta gramatical y la explicación del origen; conservado el sinónimo regional y ajustado el ejemplo. [DLE](https://dle.rae.es/correver%C3%A1s) |
| ES | `corrigendo` | Simplificada la explicación de la persona que cumple una pena o recibe corrección; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/corrigendo) |
| ES | `corrillo` | Explicado directamente como grupo apartado para conversar; retirado un sinónimo poco conocido. [DLE](https://dle.rae.es/corrillo) |
| ES | `corriveras` | Revisada de nuevo: conservado su uso en Asturias y explicado el juguete directamente; actualizado el rebase editorial, los sinónimos y el ejemplo. [DLE](https://dle.rae.es/corriver%C3%A1s) |
| ES | `corroedor` | Explicado directamente el desgaste gradual; retirado un sinónimo especializado y ajustado el ejemplo. [DLE](https://dle.rae.es/corroedor) |

Las ocho fichas estaban activas en el runtime; `correveidile` y `corriveras` ya constaban en lotes anteriores y se revisaron de nuevo. No se añadieron exclusiones.

## Lote 468

| Idioma | ID | Decisión |
|---|---|---|
| ES | `corroer` | Simplificados sus sentidos de desgaste y sufrimiento; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/corroer) |
| ES | `corrosivo` | Explicados directamente sus sentidos material y figurado; retirados sinónimos menos claros. [DLE](https://dle.rae.es/corrosivo) |
| ES | `corrugar` | Explicado como formar surcos; conservado el sentido menos usado de «arrugar». [DLE](https://dle.rae.es/corrugar) |
| ES | `corruptela` | Explicada como práctica deshonesta o mala costumbre; retirado un sinónimo difícil. [DLE](https://dle.rae.es/corruptela) |
| ES | `corruptible` | Explicados los sentidos de estropearse y aceptar dinero para actuar mal; corregidos sinónimos y ejemplo. [DLE](https://dle.rae.es/corruptible) |
| ES | `corseteria` | Quitada la etiqueta gramatical y explicadas directamente la tienda y la fábrica; actualizado el ejemplo. [DLE](https://dle.rae.es/corseter%C3%ADa) |
| ES | `cortacesped` | Quitada la etiqueta gramatical, conservado en palabras sencillas el uso femenino y ajustados sinónimos y ejemplo. [DLE](https://dle.rae.es/cortac%C3%A9sped) |
| ES | `cortadura` | Simplificados los sentidos con palabras conocidas y conservadas las acepciones de papel, montaña, minería y defensa. [DLE](https://dle.rae.es/cortadura) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 469

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cortafrio` | Quitada la etiqueta gramatical; simplificada la herramienta y mantenido el ajuste editorial que elimina «cortafierro». [DLE](https://dle.rae.es/cortafr%C3%ADo) |
| ES | `cortaplumas` | Quitada la etiqueta gramatical y explicados su uso antiguo y el actual; retirado un sinónimo poco común. [DLE](https://dle.rae.es/cortaplumas) |
| ES | `cortapuros` | Quitada la etiqueta gramatical y aclarado qué punta corta el utensilio. [DLE](https://dle.rae.es/cortapuros) |
| ES | `cortaunas` | Explicado directamente el utensilio; retirado el sinónimo repetido y simplificado el ejemplo del sinónimo. [DLE](https://dle.rae.es/corta%C3%BA%C3%B1as) |
| ES | `cortedad` | Explicados en dos frases sus sentidos de poca extensión, falta de capacidad o valor y timidez; revisados sinónimos. [DLE](https://dle.rae.es/cortedad) |
| ES | `cortejador` | Sustituida la explicación de «cortejar» por una frase directa y sencilla; retirados sinónimos menos claros. [DLE](https://dle.rae.es/cortejador) |
| ES | `cortesania` | Explicada directamente como trato amable y respetuoso; retirados términos menos conocidos y actualizado el ejemplo. [DLE](https://dle.rae.es/cortesan%C3%ADa) |
| ES | `cortijo` | Quitada la etiqueta gramatical y explicadas con palabras sencillas la finca y su ubicación; simplificados sinónimos y ejemplo. [DLE](https://dle.rae.es/cortijo) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 470

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cortisquear` | Quitada la etiqueta gramatical y explicado directamente el acto de hacer cortes; ajustados los ejemplos. [DLE](https://dle.rae.es/cortisquear) |
| ES | `cortocircuitar` | Simplificados los sentidos eléctrico y figurado; revisados el sinónimo y los ejemplos. [DLE](https://dle.rae.es/cortocircuitar) |
| ES | `corusco` | Explicado como algo que brilla; conservado su uso en textos poéticos con palabras sencillas. [DLE](https://dle.rae.es/corusco) |
| ES | `corveta` | Quitada la etiqueta gramatical y explicado directamente el movimiento del caballo. [DLE](https://dle.rae.es/corveta) |
| ES | `corvetear` | Explicado directamente el movimiento del caballo; retiradas expresiones circulares o poco precisas. [DLE](https://dle.rae.es/corvetear) |
| ES | `corvino` | Simplificados los sentidos referido al cuervo y referido al pez; ajustado un ejemplo poco natural. [DLE](https://dle.rae.es/corvino) |
| ES | `corvo` | Simplificados sus sentidos de forma, herramienta y parte de la pierna; revisados sinónimos y ejemplo. [DLE](https://dle.rae.es/corvo) |
| ES | `coscorron` | Simplificado el sentido activo del golpe y sus sinónimos. La corrección editorial existente deja fuera el uso chileno del poroto, que no se presenta como activo. [DLE](https://dle.rae.es/coscorr%C3%B3n) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 471

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cosechador` | Quitada la etiqueta gramatical y explicados sus usos como adjetivo y como persona. [DLE](https://dle.rae.es/cosechador) |
| ES | `cosechadora` | Quitada la etiqueta gramatical y simplificada la explicación de la máquina. [DLE](https://dle.rae.es/cosechador) |
| ES | `cosicosa` | Revisada de nuevo: conservados su sentido de acertijo y el uso informal; retirado un sinónimo poco conocido. [DLE](https://dle.rae.es/cosicosa) |
| ES | `cosmetico` | Simplificados los usos de producto, conjunto, aplicación y sentido figurado en dos frases. [DLE](https://dle.rae.es/cosm%C3%A9tico) |
| ES | `cosmogonia` | Explicados directamente el relato mítico y la teoría científica sobre el origen del universo. [DLE](https://dle.rae.es/cosmogon%C3%ADa) |
| ES | `cosmogonico` | Sustituida la explicación gramatical por una frase directa sobre el origen del universo. [DLE](https://dle.rae.es/cosmog%C3%B3nico) |
| ES | `cosmografico` | Sustituida la explicación gramatical por una frase directa sobre la descripción del universo. [DLE](https://dle.rae.es/cosmogr%C3%A1fico) |
| ES | `cosmologico` | Sustituida la explicación gramatical por una frase directa sobre el origen y la estructura del universo. [DLE](https://dle.rae.es/cosmol%C3%B3gico) |

Las ocho fichas estaban activas; `cosicosa` ya constaba en un lote anterior y se revisó de nuevo. No se añadieron exclusiones.
## Lote 472

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cosmonauta` | Quitada la etiqueta gramatical y explicada directamente la persona y su misión. [DLE](https://dle.rae.es/cosmonauta) |
| ES | `cosmonautico` | Sustituida la explicación gramatical por una frase directa sobre los viajes espaciales. [DLE](https://dle.rae.es/cosmon%C3%A1utico) |
| ES | `cosmopolita` | Revisada de nuevo y sincronizada la capa de rebase; explicados los sentidos de persona, lugar y ser vivo. [DLE](https://dle.rae.es/cosmopolita) |
| ES | `cosmopolitismo` | Explicada directamente la actitud de sentirse parte del mundo y abrirse a otras culturas. [DLE](https://dle.rae.es/cosmopolitismo) |
| ES | `cospel` | Quitada la etiqueta gramatical y explicada la pieza de metal con palabras conocidas. [DLE](https://dle.rae.es/cospel) |
| ES | `cosquillar` | Quitada la etiqueta gramatical y simplificados sus sentidos de cosquillas y sensación agradable. [DLE](https://dle.rae.es/cosquillar) |
| ES | `cosquillear` | Simplificados sus sentidos de hacer cosquillas y causar otra sensación agradable. [DLE](https://dle.rae.es/cosquillear) |
| ES | `cosquilloso` | Explicados directamente los sentidos de sensibilidad a las cosquillas y facilidad para ofenderse; ajustado el ejemplo del sinónimo. [DLE](https://dle.rae.es/cosquilloso) |

Las ocho fichas estaban activas; `cosmopolita` ya constaba en un lote anterior y se revisó de nuevo. No se añadieron exclusiones.
## Lote 473

| Idioma | ID | Decisión |
|---|---|---|
| ES | `costalada` | Quitada la etiqueta gramatical y simplificada la caída como causa del golpe. [DLE](https://dle.rae.es/costalada) |
| ES | `costanero` | Explicados sus usos de costa, cuesta y avenida en femenino; ajustados los sinónimos al ejemplo. [DLE](https://dle.rae.es/costanero) |
| ES | `costarriquenismo` | Simplificados los sentidos de palabra o uso, identidad y apego a Costa Rica; sincronizada la corrección de sinónimos y ejemplo. [DLE](https://dle.rae.es/costarrique%C3%B1ismo) |
| ES | `costeador` | Quitadas las etiquetas gramaticales y metalingüísticas; explicados los usos de pago y navegación. [DLE](https://dle.rae.es/costeador) |
| ES | `costero` | Sustituida la explicación gramatical por usos directos de la costa y navegación. [DLE](https://dle.rae.es/costero) |
| ES | `costumbrismo` | Explicado directamente como arte o literatura que muestra costumbres; simplificados los sinónimos. [DLE](https://dle.rae.es/costumbrismo) |
| ES | `costurero` | Quitada la etiqueta gramatical y separadas en dos frases la persona y la caja o mueble. [DLE](https://dle.rae.es/costurero) |
| ES | `costuron` | Quitada la etiqueta gramatical y explicado directamente como una costura grande y mal hecha. [DLE](https://dle.rae.es/costur%C3%B3n) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.
## Lote 474

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cotarro` | Sustituida la etiqueta de registro por «habla informal» y explicados sus sentidos con palabras directas. [DLE](https://dle.rae.es/cotarro) |
| ES | `cotejable` | Quitada la etiqueta gramatical; explicado como algo que se puede comparar con otra cosa. [DLE](https://dle.rae.es/cotejable) |
| ES | `cotejar` | Explicada directamente la acción de comparar y se mantienen ejemplos y sinónimos pertinentes. [DLE](https://dle.rae.es/cotejar) |
| ES | `cotejo` | Quitadas etiquetas metalingüísticas y simplificado el sentido común y el uso jurídico. [DLE](https://dle.rae.es/cotejo) |
| ES | `cotera` | Quitada la etiqueta gramatical; conservado el sentido de cerro bajo y empinado. [DLE](https://dle.rae.es/cotera) |
| ES | `cotidianeidad` | Explicado como los hechos y actividades de la vida diaria; se conserva la relación con «cotidianidad». [DLE](https://dle.rae.es/cotidianeidad) |
| ES | `cotidianidad` | Quitada la etiqueta gramatical y explicada con una frase directa. [DLE](https://dle.rae.es/cotidianidad) |
| ES | `cotillo` | Quitada la etiqueta gramatical y descrita la parte de la herramienta con palabras sencillas. [DLE](https://dle.rae.es/cotillo) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones. Se detectó que `cotar` está en la fuente canónica, pero no en el runtime; queda pendiente aclarar su estado y no se considera exclusión editorial sin evidencia.

## Lote 475

| Idioma | ID | Decisión |
|---|---|---|
| ES | `coton` | Quitada la etiqueta gramatical y descrita la tela con los rasgos que recoge el diccionario. [DLE](https://dle.rae.es/cot%C3%B3n) |
| ES | `coturno` | Simplificado el calzado antiguo y separado el uso literario en una frase breve. [DLE](https://dle.rae.es/coturno) |
| ES | `covacha` | Simplificados sus dos sentidos activos y cambiado el ejemplo para que muestre el de cueva pequeña. [DLE](https://dle.rae.es/covacha) |
| ES | `coxis` | Quitadas las etiquetas gramatical y anatómica; descrita su ubicación con palabras conocidas. [DLE](https://dle.rae.es/coxis) |
| ES | `coyunda` | Quitadas las etiquetas gramaticales y separados los sentidos de atar animales y sujetar cosas. [DLE](https://dle.rae.es/coyunda) |
| ES | `coyuntero` | Simplificado el trabajo con animales unidos; se conserva el sentido rural. [Vocabulario local](https://www.tubilladellago.com/vocabulario.html) |
| ES | `coyuntura` | Quitada la etiqueta gramatical y explicados en frases breves los sentidos de articulación, situación y oportunidad. [DLE](https://dle.rae.es/coyuntura) |
| ES | `coyuntural` | Quitada la etiqueta gramatical; explicado como algo que depende de las circunstancias de un momento. [DLE](https://dle.rae.es/coyuntural) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 476

| Idioma | ID | Decisión |
|---|---|---|
| ES | `craneoencefalico` | Quitada la explicación gramatical y simplificada la definición médica, que conserva los términos anatómicos necesarios. [DLE](https://dle.rae.es/craneoencef%C3%A1lico) |
| ES | `crapula` | Explicadas directamente la persona y la conducta; adaptado el ejemplo para que muestre el sentido de persona. [DLE](https://dle.rae.es/cr%C3%A1pula) |
| ES | `craqueo` | Sustituida la explicación técnica extensa por una frase directa y cambiado el ejemplo de sinónimo por una forma en español. [DLE](https://dle.rae.es/craqueo) |
| ES | `crascitar` | Quitada la etiqueta verbal y explicado el sonido del cuervo; se conserva la corrección de sinónimos y se usa «graznar» en el ejemplo alternativo. [DLE](https://dle.rae.es/crascitar) |
| ES | `crayon` | Quitada la etiqueta gramatical y descrito el objeto con palabras directas. [DLE](https://dle.rae.es/cray%C3%B3n) |
| ES | `crecedero` | Quitada la etiqueta gramatical y simplificado el sentido activo; no se añadió el sentido de ropa infantil. [DLE](https://dle.rae.es/crecedero) |
| ES | `crecepelo` | Quitadas las etiquetas gramatical y coloquial; explicado como producto que se usa para intentar que crezca el pelo. [DLE](https://dle.rae.es/crecepelo) |
| ES | `credulidad` | Explicada directamente la facilidad de creer sin pruebas; conservado el sentido antiguo con una nota sencilla. [DLE](https://dle.rae.es/credulidad) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 477

| Idioma | ID | Decisión |
|---|---|---|
| ES | `creedero` | Simplificadas las dos acepciones y cambiado el sinónimo del ejemplo por una palabra más común. [DLE](https://dle.rae.es/creedero) |
| ES | `creedor` | Explicados directamente los sentidos de creer con facilidad y exigir el cumplimiento de una obligación antigua. [DLE](https://dle.rae.es/creedor) |
| ES | `creendero` | Quitadas las etiquetas gramaticales y de uso; explicado como hombre recomendado o apoyado. [DLE](https://dle.rae.es/creendero) |
| ES | `crehuela` | Quitada la etiqueta gramatical y sustituido el término «crea» por «tela». [DLE](https://dle.rae.es/crehuela) |
| ES | `cremar` | Alineada la fuente canónica con la corrección editorial activa, que ya explicaba la palabra en lenguaje directo. [DLE](https://dle.rae.es/cremar) |
| ES | `crematistica` | Quitada la etiqueta gramatical y simplificados los sentidos de interés por el dinero y la filosofía aristotélica. [DLE](https://dle.rae.es/cremat%C3%ADstica) |
| ES | `crematistico` | Quitada la etiqueta gramatical y explicado como algo relacionado con dinero o riqueza. [DLE](https://dle.rae.es/cremat%C3%ADstico) |
| ES | `crencha` | Quitada la etiqueta gramatical y separados con claridad la raya y los mechones de cabello. [DLE](https://dle.rae.es/crencha) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 478

| Idioma | ID | Decisión |
|---|---|---|
| ES | `crenchar` | Explicado como hacer una raya en el pelo y cambiado el ejemplo por una acción cotidiana. [DLE](https://dle.rae.es/crenchar) |
| ES | `crepitar` | Quitada la etiqueta gramatical y descrito el sonido con una imagen conocida. [DLE](https://dle.rae.es/crepitar) |
| ES | `creso` | Quitada la etiqueta gramatical y la explicación histórica; explicado directamente como hombre muy rico. [DLE](https://dle.rae.es/creso) |
| ES | `crestado` | Quitada la etiqueta gramatical y simplificada la definición a «que tiene cresta». [DLE](https://dle.rae.es/crestado) |
| ES | `crestomatia` | Quitadas las etiquetas gramatical y de uso; explicada como colección de textos para enseñar o aprender. [DLE](https://dle.rae.es/crestomat%C3%ADa) |
| ES | `crestudo` | Separados el sentido de tener mucha cresta y el uso como insulto. [DLE](https://dle.rae.es/crestudo) |
| ES | `cretaceo` | Quitada la explicación gramatical y resumido como propio del período Cretácico. [DLE](https://dle.rae.es/cret%C3%A1ceo) |
| ES | `cretacico` | Quitadas las etiquetas de especialidad y resumidos el período y el uso adjetivo. [DLE](https://dle.rae.es/cret%C3%A1cico) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 479

| Idioma | ID | Decisión |
|---|---|---|
| ES | `cretinez` | Quitada la etiqueta gramatical y resumida como tontería o necedad. [DLE](https://dle.rae.es/cretinez) |
| ES | `cretona` | Quitada la etiqueta de especialidad y explicados en dos frases el material y sus usos. [DLE](https://dle.rae.es/cretona) |
| ES | `criazon` | Explicados con palabras sencillas sus sentidos activos y actualizado el ejemplo para que corresponda a la servidumbre doméstica. [DLE](https://dle.rae.es/criaz%C3%B3n) |
| ES | `cribar` | Separados en frases breves los sentidos de separar, seleccionar y hacer pruebas médicas. [DLE](https://dle.rae.es/cribar) |
| ES | `cribo` | Quitada la etiqueta gramatical y explicado como utensilio con agujeros para separar tamaños. [DLE](https://dle.rae.es/cribo) |
| ES | `cric` | Simplificado el uso actual y explicado el sentido antiguo de artillería con palabras directas. [DLE](https://dle.rae.es/cric) |
| ES | `crica` | Quitada la etiqueta gramatical y explicado directamente el sentido anatómico. [DLE](https://dle.rae.es/crica) |
| ES | `cricri` | Quitada la etiqueta de onomatopeya y explicados el sonido y su imitación. [DLE](https://dle.rae.es/cricr%C3%AD) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 480

| Idioma | ID | Decisión |
|---|---|---|
| ES | `criminar` | Quitada la etiqueta verbal y explicados en frases directas los sentidos de acusar y censurar. [DLE](https://dle.rae.es/criminar) |
| ES | `criminologico` | Explicado como algo relacionado con el estudio de los delitos y sus causas; quitado el sinónimo que repetía la entrada. [DLE](https://dle.rae.es/criminol%C3%B3gico) |
| ES | `crinado` | Corregida la acepción según el DLE: en literatura, «que tiene el pelo largo»; alineados sinónimos y ejemplo. [DLE](https://dle.rae.es/crinado) |
| ES | `crinar` | Quitada la etiqueta verbal y separadas las acciones de peinar y desenredar o limpiar pelo o lana. [DLE](https://dle.rae.es/crinar) |
| ES | `crinera` | Quitada la etiqueta gramatical y precisada su ubicación en el cuello del caballo. [DLE](https://dle.rae.es/crinera) |
| ES | `crinolina` | Simplificados sus sentidos de tela de crin y falda interior que daba volumen. [DLE](https://dle.rae.es/crinolina) |
| ES | `criptografico` | Explicado con palabras directas como algo que usa códigos para proteger información; ajustado el sinónimo de ejemplo. [DLE](https://dle.rae.es/criptogr%C3%A1fico) |
| ES | `cripton` | Simplificada la definición y conservados el símbolo químico y el número atómico. [Real Academia de Ingeniería](https://diccionario.raing.es/es/lema/cript%C3%B3n) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Lote 481

| Idioma | ID | Decisión |
|---|---|---|
| ES | `crisalida` | Quitadas las etiquetas de zoología y explicado directamente como la etapa inmóvil antes de ser adulto. [DLE](https://dle.rae.es/cris%C3%A1lida) |
| ES | `crismar` | Explicados directamente sus sentidos religiosos; se conserva que es una palabra antigua y se aclara «crisma» como aceite. [DLE](https://dle.rae.es/crismar) |
| ES | `crismon` | Quitadas las etiquetas gramatical y religiosa; descrito el símbolo con palabras directas. [DLE](https://dle.rae.es/crism%C3%B3n) |
| ES | `crisneja` | Explicados los sentidos de trenza de cabello y cuerda trenzada; ajustado el ejemplo al segundo uso. [DLE](https://dle.rae.es/crizneja) |
| ES | `crisolada` | Quitada la etiqueta gramatical y acortada la definición de la cantidad de metal fundido. [DLE](https://dle.rae.es/crisolada) |
| ES | `crisolito` | Quitadas las etiquetas gramatical y geológica; simplificados el material y el uso como piedra preciosa. [DLE](https://dle.rae.es/cris%C3%B3lito) |
| ES | `crispante` | Quitada la etiqueta gramatical y reducido el sentido a irritar o molestar. [DLE](https://dle.rae.es/crispante) |
| ES | `crispar` | Quitada la etiqueta gramatical y separados en frases breves los sentidos físico e informal; simplificado el ejemplo. [DLE](https://dle.rae.es/crispar) |

Las ocho fichas estaban activas en el runtime. No se añadieron exclusiones.

## Cobertura

En el inicio de esta auditoría, el runtime contenía 32.554 entradas ES y 27.254 EN. Un escaneo superficial señaló 6.893 definiciones ES y 5.427 EN con alguna frase de más de 12 palabras, además de 710 ES y 162 EN con más de dos frases. Son candidatas automáticas, no errores confirmados; el conteo no detecta por sí solo vocabulario difícil ni evalúa la precisión de cada sentido.

El barrido de definiciones que contienen «coloquial» encuentra 162 entradas ES activas. Son candidatas, no errores confirmados: la marca de registro puede ayudar a entender el uso. La ausencia de una ficha en el runtime no demuestra que esté excluida; solo se registra como exclusión cuando hay una decisión editorial documentada con su motivo y evidencia. La locución incompleta `round2497-a-esparragar-idiom` consta como excluida en la nota del lote 1 y no forma parte de las entradas activas revisadas.

Última compilación verificada: 30.793 entradas ES y 26.141 EN, versión de caché `sinonimia-v6180`. El runtime tiene 56.934 entradas activas; quedan **55.099** sin revisión manual. Los lotes 300–480 reúnen 1377 decisiones sobre 1366 fichas identificadas por idioma e ID: 1164 aparecen en el runtime y 202 no. De las activas de ese tramo, 1160 son ES y 4 EN. En las 1160 definiciones ES activas revisadas de estos lotes, ninguna frase supera las 12 palabras; la más larga tiene 12. Se revisaron también sinónimos y ejemplos en contexto. En total, las tablas de auditoría reúnen 2514 filas y 2439 fichas identificadas por idioma e ID. De ellas, 1835 están activas en el runtime y 604 no aparecen en él; esa ausencia no confirma por sí sola una exclusión editorial. Las exclusiones nuevas se documentan por separado con su motivo y evidencia. La última comprobación completa `node scripts/check.js`, anterior al lote 225, terminó con código 1 por 76 discrepancias entre ejemplos y sinónimos; no se ha repetido después.
