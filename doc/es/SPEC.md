# SPEC.md — Definición de producto

> **Este documento define QUÉ es Sinonimia, PARA QUIÉN es y por qué.**
>
> Para saber CÓMO está construida la aplicación (arquitectura, ficheros),
> consulta [`tecnico.md`](tecnico.md).

---

## Para quién es

Sinonimia es un diccionario para **cualquiera que se encuentre una palabra
difícil** en un trámite, en una carta oficial o en la consulta del médico.
Está escrito para que se entienda a la primera, sin dar nada por sabido.

No hace distinciones sobre quién lo usa ni por qué: la palabra "usufructo"
o "cefalea" es igual de difícil de entender la primera vez la lea quien la
lea. Diseñar para que se entienda a la primera hace la web más clara para
todo el mundo, no solo para quien más lo necesita.

No es un diccionario general de sinónimos. Solo recoge palabras **difíciles o
técnicas** (de la administración, la justicia y la salud) y las explica de
forma que se puedan entender a la primera.

## Objetivo y origen (contexto interno)

Sinonimia nace como herramienta de apoyo en **terapia ocupacional**,
pensada específicamente para **personas con discapacidad intelectual**. Ese
es el objetivo real del proyecto y la razón de ser de casi todas sus reglas
de diseño: la lectura fácil no es una preferencia de estilo, es el
requisito que hace que la herramienta cumpla su función; la gamificación es
ligera y nunca punitiva porque así lo exige el contexto terapéutico; los
pictogramas existen porque son el apoyo visual habitual en comunicación
aumentativa.

Esto es información de contexto para quien mantiene o contribuye al
proyecto — explica el "por qué" de las reglas de más abajo. No cambia la
sección anterior ("Para quién es"): de cara a quien usa la web, el texto se
mantiene deliberadamente universal y no nombra ningún colectivo, para que
nadie se sienta señalado ni excluido. Un objetivo terapéutico específico y
una redacción pública inclusiva no son contradictorios: son la misma
decisión de diseño vista desde dentro y desde fuera.

Ver también [`roles.md`](roles.md) para quién participa en el proyecto y
cómo.

### Regla de obligado cumplimiento: cero menciones en el producto de cara al usuario

**Ningún texto que vea la persona usuaria puede mencionar, ni directa ni
indirectamente, la discapacidad intelectual, la terapia ocupacional, ni
expresiones equivalentes** ("dificultades cognitivas", "necesidades
especiales", "capacidades diferentes", etc.). Esto incluye todo lo visible
en la interfaz de la web: `index.html` (títulos, meta-descripción, textos
estáticos), los textos de `js/i18n.js` en todos los idiomas (botones,
etiquetas, mensajes, alt de iconos), y el pie de página. El motivo es
exactamente el de la sección anterior: que ninguna persona que use la web se
sienta señalada, inferior o discriminada por lo que la web dice de ella.

Dónde sí aplica y dónde no:

- **Sí aplica** a todo lo que la persona usuaria final ve en la web:
  `index.html`, `js/i18n.js`.
- **No aplica** al contenido del diccionario (`js/data.<idioma>.js`). Si en
  el futuro se añade una palabra difícil relacionada con la discapacidad
  como trámite (por ejemplo "certificado de discapacidad" o "incapacidad
  permanente"), se explica con total normalidad, igual que cualquier otra
  palabra — el objetivo ahí es definir la palabra, no describir a quien la
  consulta.
- **No aplica** a la documentación interna del proyecto (este documento,
  [`../../CLAUDE.md`](../../CLAUDE.md), [`../../CONTRIBUTING.es.md`](../../CONTRIBUTING.es.md),
  [`../../README.es.md`](../../README.es.md), `roles.md`): esos archivos los
  lee quien mantiene o contribuye al proyecto, no la persona usuaria final,
  y ahí sí debe quedar explicado el objetivo real (ver la sección anterior).

Esta regla se comprueba automáticamente: `node scripts/validar.js` falla si
alguno de esos términos aparece en `index.html` o en `js/i18n.js`.

## Principio de diseño: lectura fácil

Todo el contenido de Sinonimia se escribe siguiendo las pautas de
**lectura fácil**, la norma UNE 153101:2018 EX y las pautas europeas de
Inclusion Europe. Esto no es un detalle de estilo: es el criterio principal
que manda sobre cualquier otro (incluida la precisión técnica). Si una
definición es correcta pero difícil de entender, está mal escrita.

Reglas que se aplican a **cada palabra nueva** que se añade a `js/data.<idioma>.js`:

1. **Una idea por frase.** Nada de frases con "que", comas encadenadas o
   varias ideas juntas.
2. **Frases muy cortas.** Máximo 10-12 palabras por frase. La definición
   completa, 2 frases como mucho.
3. **Palabras conocidas.** Si para explicar una palabra difícil hace falta
   otra palabra difícil, se cambia por una palabra de uso diario.
4. **Nada de abstracciones evitables.** Mejor "un papel" que "un documento";
   mejor "duele" que "produce dolor"; mejor "no es grave" que "no reviste
   gravedad".
5. **Sin metáforas, sin ironía, sin dobles negaciones.**
6. **Voz activa y concreta.** Sujeto claro, verbo claro.
7. **El ejemplo manda.** La frase de ejemplo debe ser una situación real y
   corriente (un trámite, una visita al médico, un mensaje que llega a casa),
   nunca un caso abstracto.
8. **La repetición con sinónimo es la explicación, no un adorno.** La misma
   frase se repite cambiando solo la palabra difícil por la sencilla, para que
   se entienda por el contexto, no por la definición.

Antes de guardar una palabra nueva, léela en voz alta: si suena a texto
legal o clínico, hay que reescribirla.

## Principio de diseño: método socrático en los juegos

Cuando la persona falla en uno de los dos juegos, Sinonimia nunca se limita
a decirle que está mal: la redirige a mirar otra vez la pista, la palabra o
la frase de ejemplo, para que sea ella quien razone la respuesta en el
siguiente intento en vez de ir probando opciones al azar. El juego guía el
razonamiento hacia la respuesta, nunca la entrega directamente.

Esto es la regla 4 de la sección de gamificación más abajo (mensaje de
fallo: nunca "¡Mal!", siempre una invitación a releer la pista o la frase,
como ya hace `juegoPalabraIncorrecto` en `js/i18n.js`). Cualquier mensaje
de fallo nuevo que se añada a los juegos, en cualquier idioma, debe seguir
el mismo patrón.

## Palabras con doble significado

Algunas palabras difíciles son además homónimos: la misma palabra tiene dos
significados que no tienen nada que ver (por ejemplo "pensión" — el dinero
que se cobra al jubilarse, o una casa de huéspedes barata). Sinonimia los
trata como **dos entradas normales**, cada una con su propio `id` y su
propia `situacion`, y las dos usan el mismo texto en `palabra` a propósito
(no se desambigua añadiendo algo como "Pensión (dinero)" al campo
`palabra`: cada entrada ya se distingue por su `definicion` y por la
pastilla de tema en su página de detalle, igual que un diccionario en
papel numera las acepciones en vez de inventarse una palabra distinta para
cada una).

Esto es seguro porque el índice interno de `js/app.js` (`entryByName`,
usado para enlazar un sinónimo a su propia entrada y para elegir las
opciones falsas de los dos juegos) está preparado para que varias entradas
compartan `palabra`: nunca se pisan entre sí, y si el sinónimo de otra
palabra resulta ambiguo se enlaza a las dos, no a una elegida al azar. Ver
"Dictionary entry shape" en [`tecnico.md`](tecnico.md)
para el detalle técnico. Las dos entradas de `pensión` (`es`) y `pension`
(`en`) en `js/data.*.js` son el caso de referencia — cópialas si necesitas
añadir otro homónimo.

## Por qué "solo palabras difíciles"

El diccionario no incluye vocabulario común (casa, feliz, comer...) porque
ese vocabulario ya se entiende. El valor de Sinonimia está en las palabras
que aparecen en cartas del ayuntamiento, en juicios o en la consulta del
médico, y que suelen dejar fuera a quien no las conoce.

## Llamada a la acción y motivación (gamificación ligera)

Consultar una palabra debe sentirse ágil y con premio, no como rellenar un
formulario. Por eso la web incluye, sin backend ni cuentas de usuario:

- **Palabra del día**, con un botón claro para ir directamente a ella.
- **"Sorpréndeme"**, un botón que lleva a una palabra al azar, para explorar
  sin tener que buscar.
- **Progreso guardado en el navegador** (`localStorage`, sin servidor): cada
  palabra que se abre queda marcada como descubierta, con un contador y una
  barra de progreso. Es un premio visual, no un requisito para usar la web.
- **Micro-animaciones en CSS** (hover en las tarjetas, aparición suave de la
  frase con sinónimo, la barra de progreso al rellenarse) para que la
  interfaz se sienta viva, sin JavaScript pesado ni dependencias externas.
- **"Crea tu propia frase"**, debajo de las frases de ejemplo en cada
  palabra: un campo para que la persona escriba su propia frase usando la
  palabra, guardado en `localStorage` (por palabra e idioma). No se corrige
  ni se puntúa el texto — el objetivo es practicar produciendo lenguaje,
  no acertar. Al guardar se muestra la frase con un pequeño refuerzo visual.
- **Dos juegos**, accesibles desde el botón "🎮 Jugar", que abre un menú
  para elegir uno:
  - **"¿Qué palabra es?"**: se muestra el tema, la definición y el
    pictograma de una palabra y hay que elegir la palabra correcta entre
    3 opciones.
  - **"Completa la frase"**: se muestra la frase de ejemplo de una palabra
    con un hueco en el lugar de la palabra difícil, y hay que elegir cuál
    falta entre 3 opciones. Al acertar se revela la frase completa con la
    palabra resaltada, igual que en el detalle de la palabra.
  En los dos juegos, las opciones se reordenan al azar en cada pregunta
  (para que no se pueda memorizar la posición de la respuesta), no hay
  cronómetro ni penalización: si falla, se marca en rojo esa opción y se
  puede seguir probando el resto sin límite de intentos. Los aciertos de
  ambos juegos se acumulan juntos, con una ⭐, en `localStorage` por idioma.
  Los dos juegos usan siempre las palabras del idioma activo, así que
  funcionan igual al añadir un idioma nuevo — no hay que tocarlos.

Reglas que mandan sobre la gamificación:

1. **Nunca esconder ni retrasar la definición, el sinónimo o el ejemplo
   detrás de un clic o de un juego.** La gamificación premia la
   exploración; no debe ser una barrera para entender la palabra. Si algo
   compite con la claridad, gana la claridad.
2. **Nunca es punitiva.** Sin cronómetros, sin "vidas", sin mensajes de
   fallo duros ("¡Mal!", "Has perdido"). Un fallo en el juego se trata
   igual que un intento más: se invita a seguir probando, no se penaliza.
3. **Nada se corrige ni se puntúa como "incorrecto" fuera del propio
   juego.** "Crea tu propia frase" no se valida ni se juzga: cualquier
   frase que la persona escriba se guarda y se celebra igual.
4. **Método socrático al fallar.** Cuando se elige mal, el mensaje nunca
   se limita a decir que está mal: siempre redirige a la pista o a la
   frase ("Vuelve a leer la pista: ¿qué palabra encaja mejor?"), para que
   la persona razone su propia respuesta en el siguiente intento en vez de
   limitarse a ir probando opciones al azar. Nunca se da la respuesta
   correcta directamente.
5. **Las opciones deben distinguirse por contraste.** En los dos juegos,
   las palabras que no son la correcta se eligen primero de un tema
   distinto al de la palabra objetivo (`pickDistractorEntries` en
   `js/app.js`), y solo se recurre a otra palabra del mismo tema si no hay
   suficientes de temas distintos. La propia pista muestra el tema de la
   palabra objetivo (una pastilla `tema-pill`) para que ese contraste sea
   algo que la persona pueda ver y usar, no algo que tenga que saber de
   antemano. Así, releer la pista o la frase permite descartar las
   opciones por no encajar con el tema, en vez de tener que adivinar
   entre opciones parecidas.
6. **Estrellas como refuerzo positivo, nunca como puntuación que se
   pueda perder.** Cada acierto suma una ⭐ al contador (`juegoAciertos`
   en `js/i18n.js`), con una pequeña animación al ganarla. No hay
   estrellas que se quiten, ni un máximo, ni una tabla de clasificación:
   son un premio acumulativo, no una nota.

## Arquitectura multi-idioma

Sinonimia está pensada para tener varios idiomas (hoy español, en el futuro
inglés y los que hagan falta), sin backend y sin build. Cada pieza vive en
su propio archivo:

- `js/i18n.js` — los **textos fijos de la interfaz** (botones, etiquetas,
  mensajes) en un objeto `I18N` con una clave por idioma (`es`, `en`...).
  Esto NO son palabras del diccionario, son los rótulos de la web.
- `js/data.<idioma>.js` — el **diccionario de ese idioma**, como una lista
  que se añade a `DICCIONARIOS.<idioma>` (por ejemplo `DICCIONARIOS.es`,
  `DICCIONARIOS.en`). Cada idioma tiene sus propias palabras: no hace falta
  que "usufructo" (es) y "usufruct" (en) compartan nada más que la
  estructura del bloque.
- El campo `situacion` de cada palabra usa una **clave común a todos los
  idiomas**, para que el filtro por tema funcione igual en cualquier idioma.
  Su etiqueta visible en cada idioma se define en `js/i18n.js`
  (`tema_<clave>`), nunca en el archivo de datos. Las claves actuales son:

  - `tramites` — gestiones administrativas generales (avisos, resoluciones,
    documentos oficiales que no encajan mejor en otra categoría).
  - `salud` — términos médicos y de atención sanitaria.
  - `vida-diaria` — vocabulario de situaciones cotidianas que no encaja en
    ninguna categoría más específica.
  - `finanzas` — dinero, bancos, deudas, ahorro, impuestos.
  - `vivienda` — alquiler, hipoteca, empadronamiento, suministros del hogar.
  - `trabajo` — contratos laborales, nómina, bajas, derechos del trabajador.
  - `legal` — derechos, consentimiento, procesos judiciales, representación
    legal.

  Estas siete categorías salen de las **AIVD (actividades instrumentales de
  la vida diaria)**, el marco que usa la terapia ocupacional para identificar
  en qué áreas de la vida adulta suele hacer falta más apoyo para ganar
  autonomía — de ahí que finanzas, vivienda, trabajo y legal se traten como
  áreas propias y no como currículum genérico de "trámites". No añadas una
  categoría nueva para dos o tres palabras sueltas: hace falta un puñado de
  palabras reales que la justifiquen, si no el filtro de tema queda con
  casillas casi vacías.
- El campo `imagen.id` es el identificador del pictograma en ARASAAC.
  ARASAAC es un banco de pictogramas multi-idioma: la misma imagen sirve
  para el mismo concepto en cualquier idioma, así que dos palabras de
  idiomas distintos pueden apuntar al mismo `imagen.id` y compartir el
  archivo `img/<id>.png` sin descargarlo dos veces.
- La URL recuerda el idioma: `#/es/palabra/subsanar`, `#/en/palabra/rectify`.
  Cambiar de idioma no intenta traducir la palabra que estabas viendo:
  vuelve a la lista, en el idioma nuevo.
- El progreso ("palabras descubiertas"), los aciertos del juego y las
  frases propias se guardan por idioma (`localStorage`, claves
  `sinonimia-aprendidas-<idioma>`, `sinonimia-juego-aciertos-<idioma>` y
  `sinonimia-mis-frases-<idioma>`), porque son diccionarios de contenido
  distinto.

### Cómo añadir un idioma nuevo

1. Copia el bloque `es` (o `en`) entero dentro de `I18N` en `js/i18n.js` y
   tradúcelo, clave por clave.
2. Crea `js/data.<idioma>.js` copiando la estructura de `js/data.es.js` y
   escribe las palabras difíciles de ese idioma (no es necesario traducir
   las palabras existentes: elige las que de verdad sean difíciles en ese
   idioma). Usa las claves compartidas en `situacion`.
3. Añade `<script src="js/data.<idioma>.js"></script>` en `index.html`,
   junto a los otros `data.*.js`.
4. Añade un botón en `.idioma-selector` en `index.html`:
   `<button class="idioma-btn" data-lang="<idioma>">XX</button>`.

Nada de esto toca `js/app.js`: el buscador, el enrutado, el progreso y la
palabra del día ya funcionan para cualquier idioma que aparezca en
`DICCIONARIOS`.

## Proceso para ampliar el contenido

Escribir una definición en lectura fácil necesita criterio humano — no se
puede generar en plantilla sin que se note (por eso `scripts/validar.js`
comprueba la forma de los datos, pero nunca la calidad de una definición:
eso solo lo valora una persona, o una IA, leyéndola en voz alta). Lo que sí
se puede automatizar es la parte de contabilidad que hay que hacer antes de
escribir nada, y eso es lo que hace `scripts/estado-contenido.js`. El
proceso completo, repetible cada vez que se quiera hacer crecer el
diccionario:

1. **Diagnóstico**: `node scripts/estado-contenido.js` — cuenta las
   palabras que hay por categoría y por idioma, marca las categorías con
   menos de 8 palabras (el umbral que ya pedía la sección de "Arquitectura
   multi-idioma" para no dejar el filtro de tema con casillas vacías), y
   avisa si un idioma se ha quedado muy por detrás de otro en una misma
   categoría. Con `--detalle` lista además cada palabra ya existente con
   sus sinónimos, para no proponer un término que ya está cubierto bajo
   otra palabra.
2. **Elegir una categoría y un idioma** de los marcados por el
   diagnóstico. El diagnóstico cuenta cada idioma por separado a propósito:
   el contenido no se comparte entre idiomas (ver "Arquitectura
   multi-idioma" más arriba), así que cada combinación categoría+idioma se
   trabaja de forma independiente, aunque una misma pasada puede cubrir
   varias.
3. **Buscar términos candidatos** para esa categoría **en una fuente de
   referencia del idioma elegido** (para `es`, glosarios de lenguaje claro o
   glosarios médicos para pacientes en español; para `en` u otro idioma, el
   equivalente de "lenguaje claro" en ese idioma — no un glosario en
   español traducido a mano), descartando los que ya aparecen en el listado
   de `--detalle` de ese idioma. **No traduzcas las palabras que ya existen
   en el otro idioma**: cada idioma elige las palabras que de verdad son
   difíciles en ese idioma, que no tienen por qué coincidir con las del
   otro (lo mismo que ya dice "Cómo añadir un idioma nuevo" para el
   arranque de un idioma nuevo, aplica igual al hacer crecer uno que ya
   existe).
4. **Escribir cada entrada** siguiendo al pie de la letra las reglas de
   lectura fácil de este documento, **en el idioma elegido** — la entrada
   entera (`definicion`, `sinonimos`, `ejemplo`, `ejemploSinonimo`) va en
   `js/data.<idioma>.js`, nunca mezclada con otro idioma.
5. **Buscar el pictograma** con
   `node scripts/buscar-pictograma.js "<término>" <idioma>`, usando el
   mismo código de idioma que la palabra (`es`, `en`...), no siempre `es`
   (usa OpenSymbols si hay `OPENSYMBOLS_SECRET`, si no cae solo en
   ARASAAC). Antes de buscar, mira si el concepto ya tiene pictograma en
   `img/` por una palabra de otro idioma — los pictogramas de ARASAAC son
   dibujos sin texto, así que un mismo `imagen.id` sirve para el mismo
   concepto en cualquier idioma.
6. **Validar**: `node scripts/validar.js` antes de dar la palabra por
   terminada. Comprueba las palabras de todos los idiomas a la vez, así que
   basta una ejecución aunque hayas tocado varios `js/data.<idioma>.js`.

Este proceso no corre solo ni con un cron — no hay servidor donde
ejecutarlo, y automatizarlo del todo violaría la regla de que cada
definición se revisa a mano. Es un procedimiento para que cualquiera
(persona o agente) que quiera ampliar el diccionario sepa exactamente por
dónde empezar y qué pasos no se pueden saltar, **en cualquier idioma que
tenga el diccionario**.

### Ejemplo real de una pasada completa

Un caso real ayuda más que la lista abstracta de pasos. En una pasada por
`vida-diaria` (la categoría más floja en los dos idiomas: 3 palabras en
`es`, 0 en `en`), el proceso completo dejó la categoría en 8 palabras en
`es` y 5 en `en` — `aforo`, `franja horaria`, `justificante`, `incidencia`,
`extravío` y `overdue`, `complimentary`, `duplicate`, `enclosed`,
`lost property`. Dos cosas no obvias que salieron de esa pasada y que no
estaban documentadas antes:

- **`scripts/buscar-pictograma.js` busca por coincidencia literal de
  palabra, no por significado.** Términos exactos como "aforo",
  "capacidad", "justificante" o "incidencia" no devolvieron ningún
  resultado en ARASAAC, pero un sinónimo más común sí lo hizo ("lleno",
  "completo", "recibo", "problema"). Si el término exacto no encuentra
  nada, antes de descartar el pictograma prueba con un sinónimo de la
  propia palabra o de su definición.
- **Dos palabras de idiomas distintos pueden compartir `imagen.id`** si
  representan el mismo concepto, tal y como ya explica la sección de
  arquitectura multi-idioma más arriba: `extravío` (es) y `lost property`
  (en) usan las dos el pictograma 16159 ("lost item(s)"), sin descargarlo
  dos veces.

## Mantenimiento

Todo el contenido vive en archivos planos (`js/i18n.js`, `js/data.*.js`),
sin base de datos ni backend. Añadir una palabra es copiar un bloque en el
archivo de su idioma y rellenarlo siguiendo las reglas de arriba. No hace
falta tocar HTML, CSS ni el buscador.
