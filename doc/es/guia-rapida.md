# Guía rápida

> 🌐 **Otro idioma:** [English](../en/quick-guide.md)

Esta guía explica paso a paso cómo usar Sinonimia: desde cómo
abrirla hasta cómo buscar una palabra, jugar una partida corta,
cambiar de idioma o instalarla en el móvil. Incluye también
**cuatro formas de abrir la aplicación**, ordenadas de la más fácil
a la más elaborada.

> 📦 La versión detallada paso a paso (con el recorrido completo de
> instalación PWA y una sección completa de resolución de problemas)
> vive en la guía canónica transversal:
> [`routime/doc/es/guia-rapida.md`](https://github.com/thenkdframe/routime/blob/main/doc/es/guia-rapida.md).
> El **flujo de apertura, instalación PWA y resolución de problemas
> son idénticos** en todos los proyectos hermanos de Apptonomia.
> Este documento solo recoge lo específico de Sinonimia (sobre
> todo: no hay una cuadrícula fija de actividades — el diccionario
> **es** la actividad).

---

## 1. Cómo abrir Sinonimia

Hay **cuatro formas**, ordenadas de la más fácil a la más
elaborada. El recorrido completo está en la guía canónica enlazada
arriba. La versión corta:

| # | Método | Qué necesitas | ¿Sin conexión? | ¿Instalable como PWA? |
|---|---|---|---|---|
| **A** | Desde internet ([sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk)) | Un navegador | ❌ | ✅ |
| **B** | Descargando el ZIP de GitHub | Un navegador | ❌ | ❌ |
| **C** | Servidor local con Python | Python 3 | ❌ | ✅ |
| **D** | Servidor local con Node.js | Node.js | ✅ | ✅ |

> 💡 Si solo quieres **probar la app**, usa el método **A** o **B**.
> Para la **experiencia completa** (PWA, modo sin conexión, "Añadir
> a pantalla de inicio"), usa **C** o **D**.

---

## 2. La pantalla principal

La pantalla de inicio de Sinonimia es la **caja de búsqueda**. No
hay una cuadrícula fija de minijuegos — el diccionario **es** la
actividad. La pantalla de inicio muestra:

- Un **buscador** (autocompletar tras un par de caracteres).
- El **filtro alfabético** (saltar a palabras que empiezan por una
  letra).
- El **filtro por tema** (recorrer por dominio — administración,
  justicia, salud…).
- Los botones de **palabra del día** y **"Sorpréndeme"**.
- Un enlace a los dos juegos (Emparejar y Ordenar).

## 3. Buscar una palabra

1. Escribe la palabra en el buscador.
2. Elige la entrada en la lista desplegable.
3. Lee la **definición**, después la **frase de ejemplo** y luego el
   pictograma.
4. Opcional: usa **"Escribe tu propia frase"** (Mis frases) para
   guardar un ejemplo personal de la palabra. Se guarda solo en el
   `localStorage` de este navegador.

## 4. Filtrar por tema

Usa el **filtro por tema** para recorrer todo un dominio (p. ej.
todas las palabras administrativas, todas las palabras de salud).
La lista de temas refleja el catálogo que se distribuye — consulta
[`actividades.md`](actividades.md) §1.

## 5. Los dos juegos

Desde la pantalla de inicio también puedes iniciar uno de los dos
juegos cortos (ver [`actividades.md`](actividades.md) §2):

- **Emparejar** — asocia una palabra con su definición.
- **Ordenar** — reordena una frase de ejemplo mezclada.

Las sesiones son **5–10 preguntas**, no un examen. No hay estado de
fallo.

## 6. Audio

Cuando la entrada tiene audio (p. ej. una pronunciación grabada o
la frase de ejemplo leída en voz alta), aparece el botón 🔊.
Sinonimia respeta `prefers-reduced-motion` y la preferencia de
audio de los ajustes.

## 7. Mensajes de respuesta

Sinonimia **no tiene estado de fallo** en los juegos. Un emparejamiento
erróneo o una frase fuera de orden producen un mensaje amable
del tipo "casi, inténtalo otra vez". **No hay estrellas**, **no
hay puntuación**, **no hay feedback negativo** — ver
[`SPEC.md`](SPEC.md) §3.

## 8. Progreso y palabras aprendidas

Quien lee puede marcar una palabra como **aprendida** (👍) desde la
página de la entrada. Las palabras aprendidas se recuerdan en el
`localStorage` del navegador y se pueden repasar o restablecer
desde los ajustes. Consulta [`equipo.md`](equipo.md) para la nota
de privacidad para familias.

## 9. Cambiar idioma

Abre el menú de idioma desde la cabecera (icono del globo 🌐).
Disponibles: **Español (predeterminado)** e **Inglés**. Cada idioma
tiene su propio diccionario, sus juegos y su progreso. Consulta
[`idiomas.md`](idiomas.md) para ver cómo añadir un nuevo idioma.

## 10. Ajustes personales

Abre `/settings` (la ruta exacta depende del despliegue; Sinonimia
usa un hash router — ver [`tecnico.md`](tecnico.md)). Desde allí
puedes:

- Ver **Mis palabras aprendidas** (por idioma).
- Restablecer las **palabras aprendidas** y las **"Mis frases"** de
  un idioma (con confirmación, porque es destructivo).
- Gestionar las preferencias de audio y de movimiento reducido.

## 11. Instalar la app en el móvil

Los pasos completos (Android / iOS / escritorio) están en la guía
canónica. Versión corta: abre Sinonimia en el navegador, elige
"Añadir a pantalla de inicio" / "Instalar", confirma.

## 12. Resolución de problemas

Consulta **§11 Resolución de problemas** de la guía canónica —
esos apartados aplican idénticamente a Sinonimia.

## 13. Más ayuda

- Producto: [`SPEC.md`](SPEC.md).
- Arquitectura: [`tecnico.md`](tecnico.md).
- Catálogo de palabras y juegos: [`actividades.md`](actividades.md).
- Idiomas: [`idiomas.md`](idiomas.md).
- Para familias y personal de apoyo: [`equipo.md`](equipo.md).

## 14. Resumen rápido

1. Abre Sinonimia (4 métodos; el más fácil es **A**).
2. Busca una palabra o filtra por tema.
3. Lee definición + ejemplo; marca la palabra como aprendida si
   quieres.
4. Opcional: guarda tu propia frase de ejemplo ("Mis frases").
5. Opcional: juega una partida de 5–10 preguntas.
6. Cambia idioma con 🌐; instala como PWA para uso sin conexión.
