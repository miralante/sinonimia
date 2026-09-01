# Contenido detallado — Sinonimia

> 🌐 **Otro idioma:** [English](../en/CONTENTS.md)

Este documento es el **índice didáctico detallado de Sinonimia**.
Amplía [`actividades.md`](actividades.md) y
[`guia-crear-actividades.md`](guia-crear-actividades.md) listando
cada entrada del diccionario, tema y concepto pedagógico que
incluye la app, y remitiendo al documento canónico
correspondiente.

Sinonimia es una aplicación de un solo diccionario de lenguaje
claro: no hay shell de `tools/`, no hay enrutado por actividad.
El "contenido" de la app es, por tanto, el **corpus del
diccionario** (`js/data.<lang>.js`), agrupado por categoría y
referenciado por id de pictograma ARASAAC.

Usa este documento como el **cuaderno de Sinonimia**: cuando se
proponga una nueva entrada, cuando se rebalancee una categoría,
o cuando se revisen los ejemplos en lectura fácil, este es el
documento a leer primero.

> **Fuente de verdad de las reglas de producto**:
> [`SPEC.md`](SPEC.md).
> **Fuente de verdad de la pedagogía y de las reglas de
> escritura en lectura fácil**:
> [`guia-crear-actividades.md`](guia-crear-actividades.md).
> **Fuente de verdad del esquema del diccionario, mecánica de
> gamificación y lista de identificadores mantenidos
> deliberadamente en español**: [`tecnico.md`](tecnico.md).
> Este documento **no** redefine reglas; indexa el contenido que
> esas reglas producen.

---

## 0. Cómo está organizado este documento

1. La única actividad (`js/app.js` con hash routing).
2. Categorías (burocracia, legal, salud, …).
3. Entradas del diccionario, categoría por categoría, en orden
   didáctico.
4. Mecánicas de gamificación (los dos juegos).
5. Conceptos pedagógicos (qué trabaja cada entrada).
6. Restricciones y contenido prohibido.

> **Nota**: Sinonimia trabaja **el caso de uso de lectura en
> lenguaje claro**. El contenido del diccionario es
> intencionadamente agnóstico al idioma en `js/app.js` — pasa por
> `DICCIONARIOS[currentLanguage]` y `t(key)`, así que añadir un
> tercer idioma no requiere cambios en `js/app.js`. Ver
> [`I18N.md`](I18N.md) para la receta paso a paso.

---

## 1. La actividad

| Actividad | Slug | Objetivo didáctico | Vocabulario clave |
|---|---|---|---|
| Sinonimia (diccionario de lenguaje claro) | n/a (app de una sola actividad) | Sustituir palabras difíciles / técnicas / burocráticas por un sinónimo cotidiano más una definición en lectura fácil, un ejemplo en la misma frase y un pictograma ARASAAC. | sinónimo, definición, ejemplo, lectura fácil, pictograma, burocracia, certificado. |

---

## 2. Categorías

Esta sección es el **hueco para el inventario por categoría**.
Cuando añadas una categoría o rebalancees la cobertura,
documéntala aquí (nombre, alcance, pregunta típica de la
persona usuaria, términos relacionados) y enlaza la sección
correspondiente de
[`guia-crear-actividades.md`](guia-crear-actividades.md) que
gobierna la adición.

Secciones a desarrollar según crezca el proyecto:

- 2.1 Burocracia / administrativo.
- 2.2 Legal.
- 2.3 Salud.
- 2.4 Educación.
- 2.5 Finanzas (donde se solapa con procedimientos
  relacionados con discapacidad).
- 2.6 Vida cotidiana / vivienda.

---

## 3. Entradas del diccionario, categoría por categoría

Esta sección es el **hueco para el inventario de entradas por
categoría**. Para ver la lista real de entradas de una categoría,
usa `node scripts/estado-contenido.js --detalle --categoria <tema>
--lang <es|en>` (ver [`guia-rapida.md`](guia-rapida.md)) — ese
script lista cada término con sus sinónimos, definición y ejemplo,
acotado a una categoría + idioma. Reserva la lectura directa de
`js/data.<lang>.js` solo para arreglos quirúrgicos.

---

## 4. Mecánicas de gamificación

Sinonimia incluye dos juegos que operan sobre el mismo contenido
del diccionario; los juegos **no** añaden contenido, reutilizan
las entradas de `js/data.<lang>.js`:

- **Caza de palabras** (resalta la entrada en la frase de
  ejemplo).
- **Rellena el hueco** (deja el hueco del sinónimo vacío en el
  ejemplo, la persona usuaria lo completa).

Ambos juegos leen la misma forma de entrada y nunca saltan la
capa de localización `js/i18n.js`. Ver
[`tecnico.md`](tecnico.md) para los detalles de implementación.

---

## 5. Conceptos pedagógicos (qué trabaja cada entrada)

- Reconocer jerga burocrática en textos cotidianos.
- Mapear una palabra difícil a un sinónimo cotidiano.
- Leer una definición escrita a nivel de lectura fácil
  (UNE 153101; ver [`SPEC.md`](SPEC.md) §3.3).
- Usar la frase de ejemplo como pista contextual.

---

## 6. Restricciones y contenido prohibido

- **Ninguna mención clínica o de discapacidad en ninguna
  superficie visible para el usuario** (ver [`SPEC.md`](SPEC.md)
  § "Regla obligatoria: cero menciones en el producto visible").
  `scripts/check.js` lo aplica sobre `index.html` y `js/i18n.js`
  con un escaneo de lista negra.
- **Las entradas del diccionario que nombran un concepto clínico
  por su nombre real sí están permitidas** (p. ej. una entrada
  sobre un procedimiento de certificado de discapacidad): eso es
  contenido, no etiquetado de audiencia. `scripts/check.js` **no**
  escanea `js/data.<lang>.js` por este motivo.
- **Contenido en español primero** (`es` es la fuente de verdad;
  ver [`I18N.md`](I18N.md)).

---

## Ver también

- [`indice.md`](indice.md) — índice de documentación de primer
  nivel.
- [`guia-rapida.md`](guia-rapida.md) — orientación de una página.
- [`equipo.md`](equipo.md) — cobertura y guía terapéutica.
