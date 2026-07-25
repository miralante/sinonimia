# Contribuir a Sinonimia

Gracias por dedicarle tiempo a este proyecto. Antes de nada: **lee
`PRODUCT.md`**. No es documentación opcional — son las reglas que hacen que
Sinonimia sea útil para quien la necesita, y mandan sobre cualquier otra
consideración (incluida la precisión técnica de una definición).

## Añadir una palabra

0. Antes de elegir qué palabra añadir, ejecuta `node scripts/estado-contenido.js`
   (añade `--detalle` para ver las palabras y sinónimos que ya existen por
   categoría). Te dice qué categorías tienen pocas palabras y evita que
   propongas un concepto que ya está cubierto con otra palabra. Ver
   "Proceso para ampliar el contenido" en `PRODUCT.md` para el
   procedimiento completo.
1. Elige el archivo de su idioma: `js/data.es.js` o `js/data.en.js`. Cada
   idioma se amplía por separado: el diagnóstico del paso 0 cuenta las
   categorías idioma por idioma, y una palabra no tiene por qué tener
   equivalente en el otro idioma (busca términos candidatos en una fuente
   del idioma que estás editando, no traduzcas palabras del otro archivo).
   Ver "Proceso para ampliar el contenido" en `PRODUCT.md`.
2. Copia un bloque `{ ... }` entero y rellena sus campos. El comentario al
   principio de cada archivo explica cada campo.
3. Sigue las reglas de lectura fácil de `PRODUCT.md` al pie de la letra:
   frases cortas, una idea por frase, palabras conocidas, nada de
   abstracciones evitables. Léela en voz alta al terminar: si suena a texto
   legal o clínico, reescríbela.
4. Comprueba que `ejemplo.palabra` y `ejemploSinonimo.palabra` aparecen tal
   cual dentro de `ejemplo.texto` y `ejemploSinonimo.texto` (con su
   conjugación o género exactos) — de eso depende que la web resalte la
   palabra y que el juego de completar la frase funcione. `node
   scripts/validar.js` te avisa si no coincide.
5. Necesita un pictograma. Antes de descargar nada, comprueba si ya existe
   una imagen para ese concepto en `img/` — se puede reutilizar entre
   palabras e idiomas. Para buscar candidatos:
   ```
   node scripts/buscar-pictograma.js "palabra clave" <idioma>
   ```
   Usa el mismo código de idioma que la palabra (`es`, `en`...) — no
   dejes siempre `es` si la palabra es de otro idioma. Busca primero en
   **OpenSymbols** (agrega ARASAAC, Sclera, Mulberry y
   otros bancos) si tienes configurada la variable de entorno
   `OPENSYMBOLS_SECRET` (se consigue gratis en
   https://www.opensymbols.org/api — piden organización, email y para qué
   lo vas a usar; no la subas nunca al repositorio). **Sin esa variable, o
   si OpenSymbols falla o no encuentra nada, el script recurre solo a la
   API pública de ARASAAC automáticamente** (esa parte no necesita ninguna
   clave). En ambos casos solo lista candidatos con su banco, licencia y
   autor — el pictograma se descarga a mano en `img/<id>.png`.
   - La búsqueda es literal, no por significado: si el término exacto de
     la palabra no devuelve nada (pasa a menudo con palabras abstractas
     como "aforo" o "incidencia"), prueba con un sinónimo suyo o de su
     definición antes de darlo por imposible — casi siempre hay un
     pictograma para el concepto, aunque no esté indexado bajo esa palabra
     exacta.
   - En Windows, si descargas la imagen con `curl` y falla con un error de
     `schannel`/revocación de certificado, añade `--ssl-no-revoke` al
     comando.
   - **Importante sobre la licencia**: si el pictograma elegido no es de
     ARASAAC, anota su banco, licencia y autor — el crédito del pie de
     página (`js/i18n.js`, clave `pieCreditosHtml`) solo menciona ARASAAC
     ahora mismo y hay que ampliarlo antes de fusionar el cambio. Ver
     "Pictograms" en `ARCHITECTURE.md`.
6. `situacion` tiene que ser una de las claves compartidas por todos los
   idiomas: `tramites`, `salud`, `vida-diaria`, `finanzas`, `vivienda`,
   `trabajo` o `legal` (ver "Arquitectura multi-idioma" en `PRODUCT.md`
   para qué cubre cada una). No inventes una clave nueva para dos o tres
   palabras sueltas, y si de verdad hace falta una, añade también su
   etiqueta en `js/i18n.js` (`tema_<clave>`) para cada idioma.

## Añadir un idioma

Está descrito paso a paso en la sección "Cómo añadir un idioma nuevo" de
`PRODUCT.md`. En resumen: un bloque nuevo en `I18N` (`js/i18n.js`), un
archivo `js/data.<idioma>.js` nuevo, su `<script>` en `index.html` y un
botón en el selector de idioma. `js/app.js` no se toca: ya funciona con
cualquier idioma que aparezca en `DICCIONARIOS`.

## Cambios de código

- No hay build ni framework: HTML, CSS y JavaScript directos. Mantenlo así
  — es una decisión de diseño (ver "Mantenimiento" en `PRODUCT.md`), no una
  limitación temporal.
- Si añades una función a la interfaz (sobre todo si es gamificación),
  repasa las reglas de `PRODUCT.md`: nunca esconder la definición, el
  sinónimo o el ejemplo detrás de un clic o de un juego, y nunca hacer la
  interacción punitiva (sin cronómetros, sin "vidas", sin mensajes de fallo
  duros).
- Los textos de la interfaz van en `js/i18n.js`, nunca escritos a mano en
  `js/app.js` ni en `index.html`. Si añades un texto nuevo, añade su clave
  en **todos** los idiomas de `I18N`.

## Antes de enviar un cambio

```
node scripts/validar.js
```

Revisa sintaxis de los archivos JS, balance de llaves del CSS, que cada
palabra tenga pictograma y ejemplos bien formados, que las claves de
interfaz existan en todos los idiomas y que los ids que usa `js/app.js`
existan en `index.html`. Se ejecuta también automáticamente en cada pull
request.

## Código de conducta

Este proyecto sigue el `CODE_OF_CONDUCT.md`. Participar implica aceptarlo.
