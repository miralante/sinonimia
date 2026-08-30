# Guía para crear actividades

> **Cómo diseñar y añadir contenido nuevo a Sinonimia: entradas de
> diccionario, juegos y variantes de juegos.**
>
> Las "actividades" de Sinonimia son las **entradas del diccionario**
> (la actividad principal) y los dos **juegos** cortos que se
> construyen encima. El trabajo pedagógico ocurre al escribir una
> buena entrada; los juegos en sí están fijos y consumen lo que el
> diccionario tenga.
>
> Este documento **no** duplica la guía pedagógica canónica del
> suite; apunta a ella y solo recoge lo específico de Sinonimia. Si
> una regla aquí entra en conflicto con la guía canónica o con
> `tecnico.md`, `tecnico.md` gana.

---

## 1. La guía pedagógica canónica

Las técnicas didácticas, de gamificación, de persuasión y de
neuromarketing completas que comparten todos los proyectos hermanos
de Apptonomia viven en el repositorio de **Routime** en
[`guia-crear-actividades.md`](https://github.com/thenkdframe/routime/blob/main/doc/es/guia-crear-actividades.md).

Léela antes de diseñar nada. Cubre (entre otras cosas):

- Las 13 reglas obligatorias de accesibilidad (con su porqué).
- La escalera de pistas del método socrático (pista → pista más
  grande → respuesta).
- La paleta de refuerzo positivo (sonidos, animaciones, micro-copy).
- Los patrones de neuromarketing adaptados a la audiencia.
- La lista de comprobación del diseño de niveles (progresión
  Fácil → Medio → Difícil).

## 2. Lo específico de Sinonimia

### 2.1 La unidad de contenido es la entrada, no la actividad

No añadas una carpeta de "actividad" nueva para cada tema. Añade
una **entrada de diccionario** al tema correspondiente en
`js/data.<lang>.js`. Los juegos (Emparejar, Ordenar) recogen la
nueva entrada automáticamente en la siguiente carga.

Si de verdad necesitas un modo de juego nuevo (p. ej. un tipo de
ejercicio que el runtime no soporta), eso es un cambio de
ingeniería, no de contenido — consúltalo con el rol de build antes
de abrir un PR.

### 2.2 Anatomía de la entrada

Cada entrada sigue el esquema definido en [`tecnico.md`](tecnico.md)
§"Modelo de datos". Campos obligatorios:

- `palabra` (la palabra en sí, en el idioma del diccionario).
- `definicion` (definición en lectura fácil, ver [`SPEC.md`](SPEC.md)).
- `ejemplo` (una frase de ejemplo en el mismo idioma).
- `categoria` (uno de los temas listados en
  [`actividades.md`](actividades.md) §1).
- `pictograma` (referencia al pictograma; búscalo con
  `node scripts/buscar-pictograma.js`).

Campos opcionales:

- `traduccion` — equivalente(s) más cercano(s) en otro idioma (se
  permite uno-a-muchos).
- `audio` — pronunciación o audio de la frase de ejemplo.
- `notas` — notas internas, no se muestran a quien lee.

### 2.3 La regla "la palabra debe ser difícil en su propio idioma"

Esta es la regla editorial más importante (ver [`SPEC.md`](SPEC.md)
"Proceso para ampliar el contenido"). Sinonimia **no traduce
palabra por palabra** entre diccionarios: cada idioma elige las
palabras que son genuinamente difíciles **en ese idioma**. Un
término burocrático español sin equivalente inglés (y al revés) es
un caso normal y esperado.

### 2.4 Las reglas de lectura fácil aplican a cada entrada

El diccionario **es** el producto que ve quien lee. Cada entrada
debe cumplir:

- **Una idea por frase** en la definición.
- **Vocabulario cotidiano** (sin jerga clínica o técnica sin
  explicar).
- **Frases cortas** (ver las reglas UNE 153101 resumidas en
  [`SPEC.md`](SPEC.md)).
- **Sin etiquetas clínicas** sobre quien lee (la entrada nunca dice
  "para personas con X").

Estas reglas aplican por igual a la frase de ejemplo y a la
traducción opcional.

### 2.5 "Mis frases" es contenido de quien lee, no del editor

Las frases propias de quien lee ("Mis frases") se guardan en el
`localStorage` de quien lee y nunca se convierten en entradas del
diccionario. El rol de apoyo no las cura; si quien escribe una
frase deja ver un hueco de vocabulario, el siguiente paso
adecuado es **añadir una entrada adecuada al diccionario**, no
copiar la frase de quien lee dentro.

## 3. La receta técnica

Añadir una entrada requiere editar `js/data.<lang>.js` (y **solo**
ese fichero). El validador (`scripts/check.js`) recorre todos los
idiomas en una sola pasada y rechaza:

- Una entrada que no encaja con el esquema.
- Una entrada cuya categoría no está en el catálogo.
- Una palabra duplicada en el mismo idioma.
- Una entrada que incumple las comprobaciones de lectura fácil
  descritas en [`SPEC.md`](SPEC.md).

Antes de abrir el PR:

```sh
node scripts/estado-contenido.js --detalle --categoria <categoria> --lang <lang>
node scripts/check.js
```

## 4. Lista de comprobación antes de abrir un PR

- [ ] Palabra elegida genuinamente difícil **en este idioma**, no
      una traducción palabra-por-palabra de una entrada en
      español/inglés.
- [ ] Entrada conforme al esquema de
      [`tecnico.md`](tecnico.md) §"Modelo de datos".
- [ ] Definición en lectura fácil (una idea por frase, corta,
      palabras llanas).
- [ ] Frase de ejemplo que usa la palabra en un contexto real y
      concreto.
- [ ] Pictograma localizado e inspeccionado
      (`node scripts/buscar-pictograma.js`).
- [ ] Sin duplicado de una entrada existente en el mismo idioma y
      tema.
- [ ] `node scripts/check.js` pasa.

## 5. Ver también

- Guía pedagógica canónica (Routime):
  [guia-crear-actividades.md](https://github.com/thenkdframe/routime/blob/main/doc/es/guia-crear-actividades.md).
- Fuentes y flujo editorial:
  [`fuentes.md`](fuentes.md).
- Idiomas:
  [`idiomas.md`](idiomas.md).
- Receta técnica:
  [`tecnico.md`](tecnico.md).
- Reglas innegociables del producto:
  [`SPEC.md`](SPEC.md).
- Catálogo de palabras y juegos:
  [`actividades.md`](actividades.md).
