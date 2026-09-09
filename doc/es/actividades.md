# Catálogo de actividades y palabras

> Sinonimia es un **diccionario** — la "actividad" principal es la
> lectura de una entrada, complementada con dos juegos ligeros
> encima del diccionario. No hay una cuadrícula fija de actividades
> en el mismo sentido que en las otras apps de la suite (Calculia,
> Routime, Okeymoney). Este documento recoge lo que Sinonimia expone
> realmente, con la misma forma que `actividades.md` en los otros
> repos.

---

## 1. El diccionario en sí (la "actividad" principal)

El diccionario es el corazón del proyecto. Cada entrada sigue la
forma definida en [`SPEC.md`](SPEC.md) y las reglas editoriales de la
sección "Proceso para ampliar el contenido" de [`SPEC.md`](SPEC.md).
Cada entrada contiene, como mínimo:

- La **palabra** en sí (en el idioma del diccionario).
- Una **definición en lectura fácil** — frases cortas, vocabulario
  cotidiano.
- Una **frase de ejemplo** que muestra la palabra en contexto.
- Un `traduccion` **opcional** — el equivalente más cercano en otro
  idioma (se permite uno-a-muchos).
- Una **categoría** (administración, justicia, salud, finanzas,
  vida cotidiana…) que usa el filtro por tema.
- Un **pictograma** que da una pista visual.

### Temas que se distribuyen actualmente

El diccionario está organizado por temas para facilitar la
exploración:

| Tema | Qué cubre |
|---|---|
| **Administración** | Administración pública, trámites, certificados. |
| **Justicia** | Términos legales, procesos judiciales, derechos. |
| **Salud** | Salud, medicina, anatomía, la consulta del médico. |
| **Hacienda y finanzas** | Impuestos, banco, seguridad social, nómina. |
| **Vivienda y vida cotidiana** | Hogar, barrio, vida diaria. |
| **Educación y trabajo** | Escuela, formación, empleo, contratos. |

Las categorías exactas y el conteo de palabras por tema se pueden
consultar con `node scripts/content-status.js` (ver
[`guia-crear-elementos.md`](guia-crear-elementos.md) §3).

---

## 2. Los dos juegos

Sinonimia trae dos juegos ligeros sobre el diccionario. Reutilizan
las entradas que ya están en `js/data.<lang>.js` — no hay un fichero
de datos de "actividad" aparte.

| Juego | Qué entrena | Referencia |
|---|---|---|
| **Emparejar** | Reconocer una palabra a partir de su definición. | [`tecnico.md`](tecnico.md) §"Juegos". |
| **Ordenar** | Reordenar una frase de ejemplo mezclada. | [`tecnico.md`](tecnico.md) §"Juegos". |

Los juegos son cortos a propósito: una sesión son **5–10
preguntas**, no un examen. Recompensan el progreso con **mensajes
de ánimo en lectura fácil**, no con estrellas ni puntuación. No hay
estado de fallo ni feedback negativo (ver [`SPEC.md`](SPEC.md) §3).

## 3. Palabra del día y "Sorpréndeme"

Dos funciones de bajo esfuerzo ayudan al vocabulario pasivo:

- **Palabra del día** — una selección determinista por fecha,
  mostrada en la pantalla de inicio.
- **"Sorpréndeme"** — elige una entrada al azar del diccionario
  activo.

Ambas reutilizan las entradas del diccionario tal cual y no
requieren contenido extra.

## 4. "Escribe tu propia frase" (Mis frases)

La persona lectora puede escribir y guardar sus propias frases de
ejemplo para cualquier palabra. Estas frases se guardan **solo en
`localStorage`**, nunca se envían a un servidor, y son privadas
del navegador donde se escribieron. Consulta [`equipo.md`](equipo.md)
para la nota de privacidad para familias.

## 5. Cómo añadir una entrada nueva

Esta es la tarea del rol de apoyo. La versión corta:

1. Elige un tema y una palabra que sea genuinamente difícil **en el
   idioma de destino** (ver [`SPEC.md`](SPEC.md) "Proceso para
   ampliar el contenido").
2. Comprueba que la palabra no esté ya cubierta con una definición
   parecida (`node scripts/content-status.js --detalle`).
3. Escribe la entrada siguiendo las reglas de lectura fácil de
   [`SPEC.md`](SPEC.md).
4. Busca e inspecciona un pictograma
   (`node scripts/search-pictogram.js`).
5. Valida antes de abrir el PR: `node scripts/check.js`.

El flujo editorial completo, con las fuentes de candidatos y los
criterios de aceptación, vive en
[`guia-crear-elementos.md`](guia-crear-elementos.md).

---

## Ver también

- Producto: [`SPEC.md`](SPEC.md).
- Arquitectura: [`tecnico.md`](tecnico.md).
- Idiomas: [`idiomas.md`](idiomas.md).
- Fuentes y flujo editorial: [`guia-crear-elementos.md`](guia-crear-elementos.md).
