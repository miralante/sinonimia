# Sinonimia 📖

> 🌐 **Otros idiomas:** [English](README.md)

Un diccionario en lenguaje sencillo para palabras difíciles: trámites,
justicia y salud. Cada palabra tiene una definición corta, un sinónimo
sencillo, una frase de la vida diaria (repetida con el sinónimo) y un
pictograma. Pensado siguiendo las pautas de **lectura fácil** (norma UNE
153101:2018 EX), para que se entienda a la primera.

No hay build, no hay backend, no hay dependencias: HTML, CSS y JavaScript
tal cual, pensado para ser fácil de mantener y de ampliar.

## Probarlo

No hace falta instalar nada. Basta con abrir `index.html` en un navegador,
o servir la carpeta con cualquier servidor estático, por ejemplo:

```
npx serve .
```

## Qué incluye

- **Buscador** instantáneo (por la palabra difícil o por su significado),
  filtro por tema y navegación por letra.
- **Español e inglés**, con arquitectura pensada para añadir más idiomas
  (ver "Añadir un idioma" en `PRODUCT.md`).
- **Accesibilidad**: tamaño de letra ajustable, alto contraste, foco visible,
  navegación por teclado, `aria-live` en los mensajes dinámicos.
- **Gamificación ligera** sin backend ni cuentas: palabra del día, botón
  "sorpréndeme", progreso guardado en el navegador, un campo para escribir
  tu propia frase con cada palabra, y dos juegos de practicar
  ("¿Qué palabra es?" y "Completa la frase").
- **Pictogramas de [ARASAAC](https://arasaac.org)**, compartidos entre
  idiomas cuando representan el mismo concepto.

## Documentación del proyecto

- **`PRODUCT.md`** — la definición de producto: para quién es, las reglas de
  lectura fácil que debe cumplir cada definición y ejemplo, la arquitectura
  multi-idioma y las reglas que gobiernan la gamificación. Es la fuente de
  la verdad sobre el contenido: léelo antes de añadir o editar palabras.
- **`ARCHITECTURE.md`** (en inglés) — el documento técnico: cómo está
  construido el sistema, archivo por archivo, y la política de idioma del
  proyecto (inglés para código y comentarios, español/inglés para el
  contenido de producto).
- **`CLAUDE.md`** — guía técnica para quien (persona o agente) vaya a tocar
  el código.
- **`CONTRIBUTING.md`** — cómo proponer una palabra nueva, un idioma nuevo o
  un cambio de código, y cómo validar lo que se cambia antes de enviarlo.

## Validar los cambios

```
node scripts/validar.js
```

Comprueba la sintaxis de los archivos JS, que las llaves del CSS estén
balanceadas, que cada palabra tenga su pictograma y sus ejemplos bien
formados, que las claves de texto de la interfaz existan en todos los
idiomas, y que los ids que usa `js/app.js` existan en `index.html`. Se
ejecuta también en cada pull request (`.github/workflows/validate.yml`).

## Ampliar el diccionario

```
node scripts/estado-contenido.js --detalle
```

Antes de añadir palabras, este comando dice qué categorías tienen pocas
(menos de 8) y lista las que ya existen con sus sinónimos, para no repetir
un concepto. Es el primer paso del proceso descrito en "Proceso para
ampliar el contenido" en `PRODUCT.md`.

## Licencia

- El **código** (HTML/CSS/JS) es de quien contribuye, bajo licencia MIT
  (ver `LICENSE`).
- El **contenido del diccionario** (definiciones, sinónimos, frases) está
  bajo Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0).
- Los **pictogramas** en `img/` no son nuestros: son de
  [ARASAAC](https://arasaac.org) (autor Sergio Palao, propiedad del
  Gobierno de Aragón), bajo licencia CC BY-NC-SA. Si añades un pictograma
  nuevo desde ARASAAC, mantén esa licencia y la atribución del pie de
  página — no se pueden usar con fines comerciales sin permiso de ARASAAC.

## Créditos

Las definiciones y ejemplos se basan en glosarios públicos de "lenguaje
claro" de administraciones y tribunales (IVAP, Red de Lenguaje Claro) y en
glosarios médicos pensados para pacientes.
