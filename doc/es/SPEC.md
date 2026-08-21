# SPEC.md - Definición de producto

> Este documento define **qué es Sinonimia, para quién es y por qué**.
> Describe las decisiones de producto, contenido y experiencia que deben
> mantenerse aunque cambie la implementación.
>
> Para saber **cómo** está construida la aplicación, consulta
> [`tecnico.md`](tecnico.md). Para añadir o ampliar idiomas, consulta
> [`idiomas.md`](idiomas.md).

## 1. Resumen del producto

Sinonimia es un diccionario de **palabras difíciles o técnicas** que aparecen
en trámites, cartas oficiales, procesos judiciales y consultas médicas. Cada
palabra se explica con lenguaje claro, un sinónimo sencillo, un ejemplo real y
un pictograma.

No es un diccionario general de sinónimos. No incluye vocabulario común como
"casa", "feliz" o "comer", porque esas palabras ya suelen entenderse. Su
valor está en explicar las palabras que pueden dejar fuera a quien no las
conoce.

## 2. Público objetivo y origen

### 2.1 Público de cara al producto

Sinonimia es para **cualquier persona que se encuentre una palabra difícil**
en un trámite, una carta oficial o una visita al médico. La explicación debe
entenderse a la primera y no debe dar conocimientos previos por supuestos.

La web no distingue quién la usa ni por qué. La primera vez que alguien lee
"usufructo" o "cefalea", esas palabras pueden ser difíciles para cualquiera.
Diseñar para la comprensión inmediata hace la web más clara para todo el
mundo, sin señalar ni excluir a nadie.

### 2.2 Objetivo interno del proyecto

Sinonimia nace como herramienta de apoyo en **terapia ocupacional**, pensada
para ayudar específicamente a **personas con discapacidad intelectual a
aprender vocabulario**. Este es el objetivo real del proyecto y explica sus
decisiones principales:

- La lectura fácil no es un adorno de estilo: es el requisito que permite que
  la herramienta cumpla su función.
- La gamificación es ligera y nunca punitiva porque debe apoyar, no presionar.
- Los pictogramas aportan un apoyo visual habitual en la comunicación
  aumentativa.
- Las categorías se inspiran en las áreas de autonomía de las actividades
  instrumentales de la vida diaria (AIVD).

Este contexto es para quienes mantienen o contribuyen al proyecto. No cambia
el lenguaje público de la sección anterior: una finalidad terapéutica
específica y una presentación universal son decisiones compatibles. Consulta
[`roles.md`](roles.md) para los perfiles de participación en el proyecto.

### 2.3 Regla obligatoria: cero menciones en el producto visible

Ningún texto que pueda ver la persona usuaria puede mencionar, directa o
indirectamente, la discapacidad intelectual, la terapia ocupacional, los
menores, los niños ni expresiones equivalentes como "dificultades cognitivas",
"necesidades especiales", "capacidades diferentes" o "menor de edad".

La regla cubre:

- `index.html`, incluidos títulos, metadescripción y texto estático.
- Los textos de `js/i18n.js`, en todos los idiomas, incluidos botones,
  etiquetas, mensajes y textos alternativos.
- `about/privacidad.html`, porque es una página visible para quien llegue a
  ella aunque no esté enlazada.

La regla no cubre:

- `js/data.<idioma>.js`: una entrada puede definir legítimamente un trámite
  relacionado con discapacidad o edad.
- La documentación interna, `CLAUDE.md`, los documentos de contribución,
  los README y `doc/es/SPEC.md` / `doc/en/SPEC.md`.
- `about/index.html`, que presenta el origen y el contexto interno del
  proyecto.

`node scripts/check.js` comprueba automáticamente los archivos visibles
indicados arriba. No se debe ocultar una mención problemática trasladándola a
otro texto de interfaz.

### 2.4 Eufemismo público: "usuario/a tipo"

Cuando se presenta el proyecto de cara al **público general** (prensa,
charlas, READMEs públicos que cualquiera pueda leer, el portal
`apptonomia.uk`, etc.) el término "discapacidad intelectual" **no debe
usarse** para describir la audiencia de la app, ni siquiera cuando el
texto que lo rodea sería público. El eufemismo aceptado en esas
superficies para referirse a la audiencia es **"usuario/a tipo"** (en
plural "usuarios/as tipo"), entendido como marcador genérico de perfil,
no como etiqueta para ninguna persona real.

Dónde se aplica y dónde no:

- **Se aplica** a cualquier texto que cualquier persona ajena al proyecto
  pueda leer sin autenticarse: `README.es.md`, `README.md`, el portal en
  `apptonomia.uk`, charlas públicas, copy en redes, notas de prensa,
  material de marketing. En estas superficies se habla de la audiencia
  como "el/la usuario/a tipo" o "los/las usuarios/as tipo" de la app.
- **No se aplica** a la documentación interna (`CLAUDE.md`,
  `doc/es/SPEC.md`, `doc/en/SPEC.md`, `tecnico.md`, `roles.md`,
  `CONTRIBUTING.es.md`, `CONTRIBUTING.md`) — esos archivos los lee quien
  mantiene o contribuye al proyecto, y "discapacidad intelectual" sigue
  siendo allí el término canónico, porque el proyecto necesita explicar
  sin ambigüedad su objetivo real a quien lo mantiene.
- **No se aplica** al contenido del diccionario (`js/data.*.js`): una
  entrada sobre un trámite real (certificado de discapacidad, prestación
  por incapacidad permanente, etc.) nombra el concepto como se nombra en
  el mundo real — eso es contenido, no etiquetado de audiencia.
- **No se aplica** a la UI de la propia web: la regla de §2.3 sigue
  prohibiendo **cualquier** mención, incluida "usuario/a tipo", en
  `index.html` / `js/i18n.js` / `about/privacidad.html`. El eufemismo es
  para el exterior, no para lo que lee quien visita el sitio.

Razón: presentar el objetivo real del proyecto en documentación interna
es útil y necesario; presentarlo en superficies de marketing o landing
no es necesario ni respetuoso con la audiencia — "usuario/a tipo"
permite describir en público para qué sirve la app (qué perfil tiene
quien la usa) sin nombrar públicamente un grupo clínico.

## 3. Principios de diseño

### 3.1 Lectura fácil

Todo el contenido sigue las pautas de lectura fácil, la norma UNE 153101:2018
EX y las pautas europeas de Inclusion Europe. La comprensión es el criterio
principal y prevalece sobre la precisión técnica expresada con dificultad.
Una definición técnicamente correcta pero difícil de entender está mal
redactada.

Cada entrada nueva debe cumplir estas reglas:

1. Una idea por frase.
2. Frases muy cortas: 10-12 palabras como máximo por frase y dos frases como
   máximo para la definición completa.
3. Palabras conocidas. No se explica una palabra difícil con otra igual de
   difícil.
4. Preferencia por expresiones concretas: "un papel" antes que "un
   documento"; "duele" antes que "produce dolor".
5. Sin metáforas, ironía ni dobles negaciones.
6. Voz activa, sujeto claro y verbo claro.
7. Ejemplos basados en situaciones reales y corrientes: un trámite, una
   consulta médica o un mensaje que llega a casa.
8. La frase con sinónimo repite la misma situación y cambia solo la palabra
   difícil por la sencilla. Esa repetición explica el significado por el
   contexto.

Antes de guardar una entrada, hay que leerla en voz alta. Si suena a texto
legal o clínico, hay que reescribirla.

### 3.2 Comprensión guiada en los juegos

Cuando una persona falla, el juego la invita a volver a mirar la pista, la
palabra o la frase de ejemplo. No se limita a decir que la respuesta es
incorrecta ni entrega directamente la solución. La interacción debe guiar el
razonamiento hacia la respuesta.

### 3.3 Palabras con doble significado

Un homónimo se modela como **dos entradas normales**. Ambas pueden compartir
el mismo valor de `palabra`, pero deben tener distinto `id`, `situacion` y
`definicion`. No se añaden aclaraciones artificiales como "Pensión (dinero)"
al campo `palabra`.

La definición y la categoría distinguen las acepciones. El índice interno
acepta varias entradas con el mismo nombre y enlaza todas las coincidencias de
un sinónimo ambiguo. Las entradas de `pensión` en `js/data.es.js` y `pension`
en `js/data.en.js` son el caso de referencia. El comportamiento técnico está
descrito en [la forma de la entrada](tecnico.md#5-forma-de-una-entrada).

### 3.7 Comunicación persuasiva al servicio del aprendizaje

Sinonimia es una herramienta de comprensión, no un producto de consumo.
Su gamificación es ligera y su motivación es **intrínseca** (la
satisfacción de entender una palabra difícil y poder usarla), nunca
extrínseca. Por eso los patrones de mercado que funcionan en
aplicaciones de consumo — y que dependen de presión, comparación o
miedo a perder — **no pueden** aparecer en ningún punto del sitio.
Esta regla es suite-wide y se comparte con Apptonomia, Calculia,
Okeymoney, Memofun, Teclatlon y Routime; la lista concreta es la
misma en los siete proyectos para que ningún patrón que se rechace
aquí pueda entrar por la puerta de otro.

La lista cerrada de patrones prohibidos. Los siguientes patrones
forman parte de la "presión" que Sinonimia destierra y **no pueden**
aparecer en ningún punto del sitio:

- **Escasez**: "¡Solo te queda 1!", "Última oportunidad", "Date
  prisa", cuentas atrás, palabras o ejemplos que desaparecen.
- **Falsa urgencia**: cronómetros, carreras, "termina pronto",
  castigar la lentitud, cualquier tiempo límite que no sea el del
  flujo de carga del sitio.
- **Prueba social convertida en presión**: rankings de palabras
  descubiertas, posiciones, "otros ya han visto esta palabra" como
  presión social, comparaciones entre personas usuarias.
- **Coste irrecuperable / FOMO**: "perderás tu progreso si cierras",
  "no pierdas tu racha", mensajes forzados de retención,
  notificaciones de tipo "te echamos de menos".
- **Reciprocidad manipuladora / dark patterns**: registros forzados,
  casillas premarcadas, costes ocultos, alertas falsas,
  confirmaciones tramposas (por ejemplo, un botón de "no" que en
  realidad cierra la sesión o elimina el progreso).
- **Aversión a la pérdida explotadora**: "tenías X palabras
  descubiertas, has perdido Y". El progreso en Sinonimia **solo
  suma**, nunca resta como castigo (ver §4.1).

El tono por defecto en Sinonimia es **calmo y predecible**. La
persona consulta una palabra porque la necesita, no porque la
estemos empujando. Cuando un patrón de esta lista aparece en una
propuesta de producto o de UI, se rechaza por defecto; cualquier
excepción se discute en una PR con motivo explícito.

## 4. Experiencia y gamificación

Consultar una palabra debe ser ágil y agradable, no parecer un formulario.
La aplicación funciona sin backend ni cuentas de usuario e incluye:

- **Palabra del día**, con un botón para abrirla.
- **Sorpréndeme**, que abre una palabra al azar.
- **Progreso de descubrimiento**, guardado en el navegador, con contador y
  barra de progreso. Es un premio visual, nunca un requisito.
- **Microanimaciones CSS** para tarjetas, frases y progreso, sin JavaScript
  pesado ni dependencias externas.
- **Crea tu propia frase**, un campo por palabra e idioma que se guarda en
  `localStorage`. No se corrige ni se puntúa: practicar la producción del
  lenguaje importa más que acertar.
- **Dos juegos de opción múltiple**, accesibles desde el botón de jugar:
  - **¿Qué palabra es?** Muestra tema, definición y pictograma, y ofrece
    tres palabras posibles.
  - **Completa la frase** Muestra una frase con un hueco y ofrece tres
    palabras posibles. Al acertar, revela la frase completa con la palabra
    resaltada.

En ambos juegos las opciones se mezclan en cada pregunta. No hay cronómetro,
vidas ni límite de intentos: una opción fallida se marca y se puede continuar.
Los aciertos de ambos juegos se acumulan juntos con una estrella en
`localStorage`, separados por idioma. Siempre se usan las palabras del idioma
activo.

### 4.1 Reglas que limitan la gamificación

1. Nunca se esconde ni retrasa la definición, el sinónimo o el ejemplo detrás
   de un clic o de un juego.
2. El juego nunca es punitivo: no hay cronómetros, vidas, pérdida de puntos
   ni mensajes duros como "¡Mal!" o "Has perdido".
3. Fuera del juego, la frase propia no se valida ni se juzga. Cualquier texto
   guardado recibe el mismo refuerzo positivo.
4. Un fallo siempre redirige a una pista o a la frase para que la persona
   razone; nunca da la respuesta correcta directamente.
5. Los distractores se eligen primero de un tema distinto al objetivo y solo
   se usa el mismo tema si no hay suficientes opciones. La pastilla de tema
   hace visible ese contraste.
6. Las estrellas son refuerzo acumulativo. No se quitan, no tienen máximo y no
   hay clasificación.
7. No usa patrones de mercado prohibidos (escasez, falsa urgencia, prueba
   social como presión, FOMO, dark patterns, aversión explotadora a la
   pérdida). Lista cerrada y rationale en §3.7.

## 5. Arquitectura de contenido multi-idioma

Cada idioma tiene su propia interfaz y su propio diccionario. La aplicación
no traduce automáticamente las palabras existentes.

| Pieza | Responsabilidad |
|---|---|
| `js/i18n.js` | Textos fijos de interfaz en un objeto `I18N` por idioma. |
| `js/data.<idioma>.js` | Palabras, definiciones, ejemplos y pictogramas de un idioma. |
| `situacion` | Clave de categoría compartida por todos los idiomas. |
| `imagen.id` | Identificador de pictograma, reutilizable entre idiomas. |
| `traduccion` | Enlace explícito y opcional con una entrada equivalente en otro idioma. |

Las categorías actuales son:

- `tramites`: gestiones administrativas generales.
- `salud`: términos médicos y de atención sanitaria.
- `vida-diaria`: vocabulario difícil que no encaja mejor en otra categoría;
  funciona como criterio de desempate.
- `finanzas`: dinero, bancos, deudas, ahorro, impuestos y derechos del
  consumidor (garantías, devoluciones, reclamaciones de compra).
- `vivienda`: alquiler, hipoteca, empadronamiento y suministros del hogar.
- `trabajo`: contratos, nóminas, bajas y derechos laborales.
- `legal`: derechos, consentimiento, procesos judiciales y representación.
- `tecnologia`: dispositivos, aplicaciones, internet y comunicación digital.
- `seguridad`: emergencias, prevención de riesgos y protección personal.
- `educacion`: vocabulario y trámites escolares y universitarios.

Estas diez categorías se inspiran en las AIVD. No se debe crear una categoría
para dos o tres palabras sueltas: hace falta un grupo real de palabras y una
etiqueta `topic_<clave>` en todos los bloques de `I18N`.

La URL conserva el idioma, por ejemplo `#/es/palabra/subsanar` y
`#/en/palabra/rectify`. Cambiar de idioma vuelve a la lista: no intenta
traducir automáticamente la palabra abierta. El progreso, los aciertos y las
frases propias se separan por idioma mediante las claves de `localStorage`.

## 6. Añadir un idioma nuevo

Esta es la versión resumida; el procedimiento completo está en
[`idiomas.md`](idiomas.md).

1. Copiar y traducir un bloque completo de `I18N` en `js/i18n.js`, incluida
   `languageName_<idioma>` y `htmlLang`.
2. Crear `js/data.<idioma>.js` con palabras difíciles de ese idioma, usando
   las claves compartidas de `situacion`.
3. Cargar el nuevo archivo de datos en `index.html` antes de `js/app.js`.
4. Añadir el botón del idioma en `.idioma-selector`.
5. Añadir el código a la whitelist de `about.js` y bloques paralelos en
   `about/index.html`, `about/privacidad.html` y `404.html`.
6. Reflejar `htmlLang`, `metaTitle` y `metaDescription` en
   `js/bootstrap-i18n.js`.
7. Revisar RTL, variantes regionales, enlaces `traduccion` y categorías.
8. Ejecutar `node scripts/check.js`.

No se modifica `js/app.js`: búsqueda, rutas, juegos, progreso y palabra del
día funcionan con cualquier clave presente en `DICCIONARIOS`.

## 7. Proceso para ampliar el contenido

La calidad de una definición requiere criterio humano. El script de validación
comprueba la forma de los datos, pero no puede decidir si una definición se
entiende. El proceso recomendado es:

1. **Diagnosticar** con `node scripts/estado-contenido.js`. Revisar el número
   de palabras por categoría e idioma, las categorías con menos de 8 entradas
   y los desequilibrios entre idiomas. Usar `--detalle --categoria <tema>
   --lang <es|en>` para ver palabras, sinónimos, definiciones y ejemplos ya
   existentes. No abrir el archivo de datos completo para planificar: supera
   un megabyte.
2. **Elegir una combinación de idioma y categoría** marcada por el
   diagnóstico. El contenido no se comparte automáticamente entre idiomas.
3. **Buscar candidatos** en glosarios de lenguaje claro o mediante un corpus
   del dominio comparado con un corpus de lengua general. La técnica de
   *keyness* ayuda a encontrar términos propios del dominio, pero el criterio
   humano decide si son difíciles y en qué categoría encajan. Para el análisis
   de corpus se puede usar `node scripts/candidatos-corpus.js <archivo>
   <idioma>`.
4. **Descartar duplicados** y escenarios repetidos comparando la salida de
   `--detalle`. No traducir automáticamente las palabras del otro idioma.
   [`fuentes.md`](fuentes.md) contiene prompts y fuentes de referencia.
5. **Redactar la entrada completa** (`definicion`, `sinonimos`, `ejemplo` y
   `ejemploSinonimo`) en el idioma elegido y siguiendo la sección de lectura
   fácil.
6. **Buscar el pictograma** con `node scripts/buscar-pictograma.js
   "<término>" <idioma>`. Primero se intenta OpenSymbols si existe
   `OPENSYMBOLS_SECRET`; si no, o si falla, se usa automáticamente ARASAAC.
   Revisar siempre los candidatos y comprobar antes si el concepto ya usa una
   imagen de `img/`.
7. **Usar un respaldo de categoría** solo después de comprobar que la palabra,
   sus sinónimos y términos cercanos no tienen un pictograma adecuado. La
   tabla canónica está en `scripts/category-pictogram-defaults.js`.
8. **Validar** con `node scripts/check.js`.

Un resultado de búsqueda no descarga ni selecciona nada automáticamente. Si
se incorpora una imagen que no sea de ARASAAC, hay que revisar su licencia y
actualizar los créditos de `footerCreditsHtml` en el mismo cambio.

## 8. Mantenimiento y fuentes

El contenido vive en archivos planos, sin base de datos ni backend. Añadir una
palabra normalmente consiste en copiar un bloque al archivo de su idioma y
validarlo. Los detalles de licencias, búsqueda de pictogramas y fuentes
editoriales están en [`fuentes.md`](fuentes.md); los roles del proyecto están
en [`roles.md`](roles.md).
