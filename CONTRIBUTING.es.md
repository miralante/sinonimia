# Contribuir a Sinonimia

> 🌐 **Otros idiomas:** [English](CONTRIBUTING.md)

Sinonimia tiene **dos roles diferenciados** en su comunidad (ver
[`doc/es/roles.md`](doc/es/roles.md) para el razonamiento — a diferencia
de proyectos con un rol de apoyo dedicado, Sinonimia está pensada para
consultarse sola, sin que nadie tenga que mediar):

1. 👤 **Persona usuaria** — cualquiera que se encuentra una palabra
   difícil (en origen, personas con discapacidad intelectual en un
   contexto de terapia ocupacional). Usa la web directamente. **No lee
   ni escribe código**, y ese es justamente el objetivo: que la
   herramienta sea para ella.
2. 💻 **Persona colaboradora** — quien propone una palabra nueva, un
   idioma nuevo, o toca el código. Este rol cubre tanto contenido como
   código; ver las secciones siguientes.

Esta guía es para el rol de **persona colaboradora**. Las personas
usuarias no leen esta documentación.

---

## 👥 Los roles del proyecto

| # | Rol | Quién es | Participa en GitHub |
|---|---|---|---|
| 1 | 👤 **Persona usuaria** | Cualquiera que se encuentra una palabra difícil | No. Usa la web de forma autónoma. Su experiencia es el centro del producto, pero no lee esta documentación. |
| 2 | 💻 **Persona colaboradora** (contenido o código) | Quien propone una palabra nueva, un idioma nuevo, o toca el código | **Sí**: con contenido (definiciones en lectura fácil, ejemplos, pictogramas) o con código (HTML/CSS/JS). |

> ⚠️ Las decisiones puramente técnicas (GitHub, arquitectura del código,
> infraestructura) las toman las personas colaboradoras, **no porque se
> ignore a la persona usuaria, sino porque es el ámbito propio de cada
> rol**. Las decisiones de producto, contenido, lenguaje y diseño de la
> interfaz **sí se prueban y se validan con ella** siempre que es
> posible, y su feedback es la fuente principal para mejorarlas.

Consulta [`doc/es/roles.md`](doc/es/roles.md) para saber por dónde debe
empezar cada rol.

## 🔀 Flujo de trabajo en GitHub

Este es el flujo que usamos para integrar contribuciones de forma
ordenada.

### Para cualquier perfil participante

```
1. 🔍 Buscar o crear un issue (en español o inglés)
2. 💬 Comentar y consensuar el alcance
3. 🌿 Crear una rama (fork si no tienes acceso de push)
4. ✏️  Hacer los cambios siguiendo nuestras guías
5. 📤 Abrir un Pull Request (PR) referenciando el issue
6. 👀 Esperar revisión (al menos 1 de una persona maintainer)
7. ✅ Merge cuando hay aprobación
```

**Etiquetas de issues** (las usamos para clasificar):

| Etiqueta | Significado |
|---|---|
| `contenido` | Palabra nueva, definición, ejemplo o pictograma |
| `i18n` | Idioma nuevo, traducción pendiente, arreglo de locale |
| `UX` | Mejora de usabilidad o accesibilidad |
| `bug` | Error reproducible en el comportamiento |
| `tech` | Implementación técnica, refactor, deuda técnica |
| `docs` | Cambios en la documentación |
| `good first issue` | Apto para una primera contribución |
| `necesita-contenido` | Espera revisión de contenido antes del merge |
| `necesita-dev` | Espera revisión de desarrollo antes del merge |

### Convenciones de ramas

- `feat/<slug>` — nuevas funcionalidades
- `fix/<slug>` — corrección de bugs
- `docs/<slug>` — cambios solo en documentación
- `content/<slug>` — palabra nueva o cambios de contenido (definiciones, ejemplos)
- `i18n/<código>` — traducción a un idioma (ej. `i18n/ca`, `i18n/gl`)

Ejemplos:
- `content/nueva-palabra-aforo`
- `i18n/ca-catalan`
- `fix/audio-no-suena-en-movil`

### Commits

- Mensaje en **inglés** (convención del repo), resumen en imperativo
- Una cosa por commit — commits grandes se pueden pedir trocear
- Si cierran un issue, incluir `Closes #123` al final

---

## 📝 Guía para personas colaboradoras de contenido

### Qué puedes aportar

- **Añadir una palabra nueva** con su definición, sinónimo, dos ejemplos
  y un pictograma
- **Añadir un idioma nuevo** (cobertura completa o parcial)
- **Revisar el wording** de entradas existentes (estilo de lectura fácil,
  tono, exactitud)
- **Cruzar traducciones** entre idiomas con el campo `traduccion`
- **Sugerir adaptaciones** para perfiles concretos de usuario

### Cómo empezar

1. Lee [`doc/es/SPEC.md`](doc/es/SPEC.md) — no es documentación
   opcional. Contiene las reglas de lectura fácil, la arquitectura
   multi-idioma y las restricciones innegociables del producto que tu
   contenido nunca debe romper.
2. Ejecuta `node scripts/estado-contenido.js` (añade `--detalle` para
   ver las palabras y sinónimos que ya existen por categoría). Te dice
   qué categorías tienen pocas palabras y evita que propongas un
   concepto que ya está cubierto con otra palabra.
3. Para el procedimiento completo, ver **"Proceso para ampliar el
   contenido"** en [`doc/es/SPEC.md`](doc/es/SPEC.md).

### Cómo añadir una palabra

0. Ejecuta primero `node scripts/estado-contenido.js` para elegir una
   categoría que necesite más palabras.
1. Elige el archivo de su idioma: `js/data.es.js` o `js/data.en.js`.
   Cada idioma se amplía por separado: el diagnóstico del paso 0
   cuenta las categorías idioma por idioma, y una palabra no tiene por
   qué tener equivalente en el otro idioma. Busca términos candidatos
   en una fuente del idioma que estás editando — no traduzcas palabras
   del otro archivo.
2. Copia un bloque `{ ... }` entero y rellena sus campos. El comentario
   al principio de cada archivo explica cada campo.
3. Sigue las reglas de lectura fácil de [`doc/es/SPEC.md`](doc/es/SPEC.md)
   al pie de la letra: frases cortas, una idea por frase, palabras
   conocidas, nada de abstracciones evitables. Léela en voz alta al
   terminar: si suena a texto legal o clínico, reescríbela.
4. Comprueba que `ejemplo.palabra` y `ejemploSinonimo.palabra` aparecen
   tal cual dentro de `ejemplo.texto` y `ejemploSinonimo.texto` (con su
   conjugación o género exactos) — de eso depende que la web resalte
   la palabra y que el juego de completar la frase funcione.
5. Si la palabra tiene un equivalente claro en otro idioma, añade un
   campo `traduccion` que la enlace por id — string para uno-a-uno,
   array para uno-a-muchos. Esto es opcional: cuando el pictograma de la
   palabra nueva es único en ambos lados, el fallback de pictograma
   compartido en `js/app.js` elige el enlace por ti. Pero como ARASAAC
   solo tiene un pictograma para "dinero", uno para "documento", etc.,
   el fallback solo resuelve una fracción de las entradas — sin un
   `traduccion` explícito, una palabra española cuyo pictograma lo
   comparten varias palabras sin relación (el caso habitual) no
   enlazará con su equivalente inglés. Añade el campo a mano en
   `js/data.es.js` (o en el archivo del idioma que estés editando).
6. Necesita un pictograma. Antes de descargar nada, comprueba si ya
   existe una imagen para ese concepto en `img/` — se puede reutilizar
   entre palabras e idiomas. Para buscar candidatos:
   ```
   node scripts/buscar-pictograma.js "palabra clave" <idioma>
   ```
   Usa el mismo código de idioma que la palabra (`es`, `en`...). Busca
   primero en **OpenSymbols** (agrega ARASAAC, Sclera, Mulberry y
   otros bancos) si tienes configurada la variable de entorno
   `OPENSYMBOLS_SECRET` (se consigue gratis en
   https://www.opensymbols.org/api — no la subas nunca). **Sin esa
   variable, o si OpenSymbols falla o no encuentra nada, el script
   recurre solo a la API pública de ARASAAC automáticamente** (esa
   parte no necesita ninguna clave). En ambos casos solo lista
   candidatos con su banco, licencia y autor — el pictograma se
   descarga a mano en `img/<id>.png`.
   - La búsqueda es literal, no por significado: si el término exacto
     de la palabra no devuelve nada (pasa a menudo con palabras
     abstractas como "aforo" o "incidencia"), prueba con un sinónimo
     suyo o de su definición antes de darlo por imposible.
   - En Windows, si descargas la imagen con `curl` y falla con un
     error de `schannel`/revocación de certificado, añade
     `--ssl-no-revoke`.
   - **Importante sobre la licencia**: si el pictograma elegido no es
     de ARASAAC, anota su banco, licencia y autor — el crédito del
     pie de página (`js/i18n.js`, clave `pieCreditosHtml`) solo
     menciona ARASAAC ahora mismo y hay que ampliarlo antes de
     fusionar el cambio. Ver "Pictogramas" en `doc/es/tecnico.md`.
7. `situacion` tiene que ser una de las claves compartidas por todos
   los idiomas: `tramites`, `salud`, `vida-diaria`, `finanzas`,
   `vivienda`, `trabajo`, `legal`, `tecnologia` o `seguridad` (ver
   "Arquitectura multi-idioma" en [`doc/es/SPEC.md`](doc/es/SPEC.md)
   para qué cubre cada una). No inventes una clave nueva para dos o
   tres palabras sueltas, y si de verdad hace falta una, añade también
   su etiqueta en `js/i18n.js` (`tema_<clave>`) para cada idioma.
8. Ejecuta `node scripts/validar.js` para asegurarte de que la palabra
   nueva está bien formada y (si añadiste una `traduccion` en el paso
   5) el enlace entre idiomas se resuelve.

### Cómo añadir un idioma

El paso a paso completo vive en [`doc/es/I18N.md`](doc/es/I18N.md).
Ese documento es la referencia canónica — el resumen corto es "un
bloque nuevo en `I18N` (`js/i18n.js`), un archivo `js/data.<idioma>.js`
nuevo, su `<script>` en `index.html` y un botón en el selector de
idioma", pero la guía completa cubre el espejo de `bootstrap-i18n.js`,
la whitelist de `about.js`, los bloques paralelos `data-lang-block` en
`about/*` y `404.html`, la clave `idiomaNombre_<idioma>` que hay que
añadir en cada bloque `I18N` existente, las convenciones de
cross-linking con `traduccion`, el umbral de 8 palabras por categoría,
y un checklist completo. `js/app.js` no se toca: ya funciona con
cualquier idioma que aparezca en `DICCIONARIOS`.

### Cómo revisar un PR de contenido

Cuando un PR añade o cambia contenido, tu revisión como persona
colaboradora de contenido valida que:

- La definición sigue las reglas de lectura fácil
- `ejemplo.palabra` y `ejemploSinonimo.palabra` están presentes tal cual
- El pictograma es adecuado y está correctamente licenciado
- El enlace `traduccion` entre idiomas (si lo hay) se resuelve

---

## 💻 Guía para personas colaboradoras de código (desarrolladores)

### Qué puedes aportar

- Añadir palabras, idiomas o enlaces entre idiomas
- Corregir bugs y mejorar rendimiento
- Refactorizar código compartido (`js/app.js`, `js/i18n.js`,
  `js/bootstrap-i18n.js`)
- Mejorar accesibilidad, PWA, responsive
- Mantener `doc/es/tecnico.md` al día

### Cómo empezar

1. Lee [`doc/es/SPEC.md`](doc/es/SPEC.md) §3–§4 — restricciones y
   principios de producto.
2. Lee [`doc/es/tecnico.md`](doc/es/tecnico.md) entero — entenderás la
   arquitectura, el esquema del diccionario y las recetas.
3. Ejecuta `node scripts/validar.js` para verificar que tu entorno está
   bien.

### Recetas rápidas

- **Palabra nueva** → la sección "Cómo añadir una palabra" de arriba
- **Idioma nuevo** → [`doc/es/I18N.md`](doc/es/I18N.md) §5
- **Búsqueda de pictogramas** → `scripts/buscar-pictograma.js`

### Checklist antes de abrir PR

- `node scripts/validar.js` pasa sin errores
- Probado en móvil (responsive 360 px)
- Sin errores en consola
- Si cambias textos de la UI, las claves existen en cada bloque `I18N`
- Si añadiste un id de DOM que `js/app.js` busca, existe en `index.html`

---

## 🚫 Lo que este repo NO acepta

(Están aquí para que no se sugieran y nos ahorren tiempo a todos)

- **Cambios que rompan lectura fácil, accesibilidad o privacidad** —
  son las restricciones innegociables del producto
  ([SPEC §3](doc/es/SPEC.md))
- **Dependencias nuevas** (npm, CDNs) — solo HTML/CSS/JS directos, ver
  [`doc/es/tecnico.md`](doc/es/tecnico.md)
- **Funcionalidades que añadan presión** al usuario final (cronómetros
  visibles, rankings, comparativas, "game over")
- **Lenguaje clínico o burocrático en la UI** — solo se permite en la
  documentación interna de `doc/*`; el contenido de cara al usuario
  debe estar en lectura fácil y nunca debe mencionar el origen en
  terapia ocupacional del proyecto
- **Datos personales** de ningún tipo — la web funciona en `localStorage`
  únicamente
- **Imponer decisiones técnicas a la persona usuaria** — su experiencia
  siempre se cuida desde el diseño, no se le consulta sobre GitHub

---

## 📞 Comunicación

- **Issues** → principal vía para propuestas, bugs, preguntas
- **Discussions** (si está habilitado) → para debate abierto, preguntas
  generales, ayuda
- **Pull Request reviews** → para revisión de cambios concretos

> 💡 **Consejo**: si tu contribución cruza límites (ej. una palabra
> nueva que necesita revisión de contenido y un enlace entre idiomas
> que necesita revisión de desarrollo), abre **dos issues relacionados**
> o un issue con ambas etiquetas (`necesita-contenido`,
> `necesita-dev`). Así ambas saben que tienen que intervenir.

---

## 📜 Código de conducta

Este proyecto sigue [`CODE_OF_CONDUCT.es.md`](CODE_OF_CONDUCT.es.md).
Participar implica aceptarlo.

---

## 🙏 Agradecimientos

Gracias por dedicarle tiempo a una herramienta que ayuda a hacer el
lenguaje un poco más accesible para quien lo necesita.
