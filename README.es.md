# Sinonimia 📖

> 🌐 **Otros idiomas:** [English](README.md)
>
> 🚀 **Pruébalo en vivo:** [sinonimia.miralante.workers.dev](https://sinonimia.miralante.workers.dev/)

[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)
[![Sin dependencias](https://img.shields.io/badge/dependencias-ninguna-success.svg)](#-caracter%C3%ADsticas)
[![Sitio estático](https://img.shields.io/badge/build-ninguno-informational.svg)](#-arranque-r%C3%A1pido)
[![Sin PWA](https://img.shields.io/badge/PWA-ninguna-lightgrey.svg)](#-caracter%C3%ADsticas)
[![i18n](https://img.shields.io/badge/i18n-es%20%7C%20en-yellow.svg)](#-documentaci%C3%B3n)
[![CI](https://img.shields.io/badge/CI-node%20scripts%2Fcheck.js-blue.svg)](.github/workflows/check.yml)

Un diccionario en lenguaje sencillo para palabras difíciles: trámites,
justicia y salud. Cada palabra tiene una definición corta, un sinónimo
sencillo, una frase de la vida diaria (repetida con el sinónimo) y un
pictograma. Pensado siguiendo las pautas de **lectura fácil** (norma UNE
153101:2018 EX), para que se entienda a la primera.

No hay build, no hay backend, no hay dependencias: HTML, CSS y JavaScript
tal cual, pensado para ser fácil de mantener y de ampliar.

## 🚀 Pruébalo en vivo

Está desplegado en **[sinonimia.miralante.workers.dev](https://sinonimia.miralante.workers.dev/)**
— entra y úsalo directamente desde el navegador, sin instalar nada.

Si quieres ejecutarlo en local, basta con abrir `index.html` en un
navegador, o servir la carpeta con cualquier servidor estático, por
ejemplo:

```
npx serve .
```

## ✨ Características

- **Buscador** instantáneo (por la palabra difícil o por su significado),
  filtro por tema y navegación por letra.
- **Español e inglés**, con arquitectura pensada para añadir más idiomas
  (ver "Cómo añadir un idioma nuevo" en [`doc/es/SPEC.md`](doc/es/SPEC.md)).
- **Accesibilidad**: tamaño de letra ajustable, alto contraste, foco visible,
  navegación por teclado, `aria-live` en los mensajes dinámicos.
- **Gamificación ligera** sin backend ni cuentas: palabra del día, botón
  "sorpréndeme", progreso guardado en el navegador, un campo para escribir
  tu propia frase con cada palabra, y dos juegos de practicar
  ("¿Qué palabra es?" y "Completa la frase").
- **Pictogramas de [ARASAAC](https://arasaac.org)**, compartidos entre
  idiomas cuando representan el mismo concepto.

## 👥 Roles del proyecto

| Rol | Quién es | Cómo participa | Dónde mira primero |
|---|---|---|---|
| 👤 **Persona usuaria** | Cualquiera que se encuentra una palabra difícil (en origen, **usuarios/as tipo** que se benefician de un contexto de terapia ocupacional — ver [`doc/es/roles.md`](doc/es/roles.md) para el detalle) | Usa la web directamente, sin registro ni cuenta | La propia web (`index.html`) |
| 💻 **Persona colaboradora** (contenido o código) | Quien propone una palabra nueva, un idioma nuevo, o toca el código | Sigue el proceso de [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md): añade una palabra siguiendo las reglas de lectura fácil, o implementa/revisa cambios de código | [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md) · [`tecnico.md`](doc/es/tecnico.md) |

Ver [`doc/es/roles.md`](doc/es/roles.md) para la descripción completa de
los roles y por qué Sinonimia no tiene un rol de "apoyo" dedicado — está
pensada para consultarse sola, sin que nadie tenga que mediar.

---

## 📚 Documentación del proyecto (bilingüe)

Toda la documentación del proyecto vive en la carpeta `doc/`, junto con
algunos archivos en la raíz del repositorio:

| Idioma | Punto de entrada |
|---|---|
| 🇪🇸 Español (este archivo) | [`doc/es/indice.md`](doc/es/indice.md) |
| 🇬🇧 English | [`doc/en/index.md`](doc/en/index.md) |

| Si quieres… | Empieza por… |
|---|---|
| Entender qué es Sinonimia y para quién es | [`doc/es/SPEC.md`](doc/es/SPEC.md) — la definición de producto: reglas de lectura fácil, arquitectura multi-idioma, reglas de gamificación. Fuente de la verdad sobre el contenido: léelo antes de añadir o editar palabras. |
| Saber quién participa en el proyecto y cómo | [`doc/es/roles.md`](doc/es/roles.md) |
| Ver la arquitectura técnica | [`doc/es/tecnico.md`](doc/es/tecnico.md) — cómo está construido el sistema, archivo por archivo, y la política de idioma del proyecto (inglés para código y comentarios, español/inglés para el contenido de producto). |
| Añadir una palabra, un idioma o un cambio de código | [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md) / [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| Un agente de IA vaya a tocar el código | `CLAUDE.md` (en inglés) |

## ✅ Validar los cambios

```
node scripts/check.js
```

Comprueba la sintaxis de los archivos JS, que las llaves del CSS estén
balanceadas, que cada palabra tenga su pictograma y sus ejemplos bien
formados, que las claves de texto de la interfaz existan en todos los
idiomas, y que los ids que usa `js/app.js` existan en `index.html`. Se
ejecuta también en cada pull request (`.github/workflows/check.yml`).

## ☁️ Despliegue

Sinonimia es un sitio totalmente estático (HTML/CSS/JS, sin build), así
que se publica directamente en **[Cloudflare Workers (static assets)](https://developers.cloudflare.com/workers/static-assets/)**
mediante su integración nativa con GitHub — no hay workflow personalizado
de GitHub Actions. Las cabeceras de seguridad HTTP viven en
[`_headers`](_headers), y la metadata del proyecto en
[`wrangler.toml`](wrangler.toml). Consulta [`CLOUDFLARE.md`](CLOUDFLARE.md)
con la guía completa (rebuild, rollback, dominio personalizado,
rotación de credenciales).

Para desplegar tu propia versión:

1. Crea un proyecto Cloudflare Workers desde este repo en el dashboard
   (**Workers & Pages → Create → Connect to Git**). El comando de build
   queda vacío; `wrangler.toml` declara el directorio de static assets.
2. Push a `main`. Cloudflare reconstruye y despliega automáticamente.
   El workflow de validación
   ([`.github/workflows/check.yml`](.github/workflows/check.yml))
   sigue corriendo en cada push y PR para gatekeeping de contenido,
   pero no despliega.

Las pull requests reciben automáticamente una URL de previsualización —
sin necesidad de un workflow extra.

## 🛠️ Preparar / Ampliar contenido

```
node scripts/estado-contenido.js
node scripts/estado-contenido.js --detalle --categoria <categoria> --lang <es|en>
```

Antes de añadir palabras, el primer comando dice qué categorías tienen
pocas (menos de 8); el segundo, acotado a la categoría+idioma elegidos,
lista las palabras que ya existen ahí con sus sinónimos, definición y
ejemplo, para no repetir un concepto ni un escenario ilustrativo — sin
abrir nunca el `js/data.<idioma>.js` de varios megabytes. Es el primer
paso del proceso descrito en "Proceso para
ampliar el contenido" en [`doc/es/SPEC.md`](doc/es/SPEC.md).

## 🧹 Mantenimiento

El directorio `scripts/.cache/` (listas de frecuencias de palabras que
descarga `candidatos-corpus.js`) se puede vaciar con:

```
node scripts/limpiar-cache.js            # dry-run: muestra qué se borraría
node scripts/limpiar-cache.js --apply    # borra de verdad
```

La siguiente ejecución de `candidatos-corpus.js` reconstruye la caché
automáticamente. `scripts/ingest/` (el pipeline de ingest por lotes
del mantenedor, los ficheros de datos de batches/fixes, y los scripts
de exploración one-off) **no** se toca con este comando — límpialo a
mano si lo necesitas, o lee [`scripts/ingest/README.md`](scripts/ingest/README.md)
para ver qué hay dentro y cómo está organizado.

## 📄 Licencia

- El **código** (HTML/CSS/JS) es de quien contribuye, bajo licencia MIT
  (ver `LICENSE`).
- El **contenido del diccionario** (definiciones, sinónimos, frases) está
  bajo Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0).
- Los **pictogramas** en `img/` no son nuestros: son de
  [ARASAAC](https://arasaac.org) (autor Sergio Palao, propiedad del
  Gobierno de Aragón), bajo licencia CC BY-NC-SA. Si añades un pictograma
  nuevo desde ARASAAC, mantén esa licencia y la atribución del pie de
  página — no se pueden usar con fines comerciales sin permiso de ARASAAC.

## 🙏 Créditos

Las definiciones y ejemplos se basan en glosarios públicos de "lenguaje
claro" de administraciones y tribunales (IVAP, Red de Lenguaje Claro) y en
glosarios médicos pensados para pacientes.

---

## 🙌 Contribuir

Las contribuciones son bienvenidas. Consulta [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md)
para el flujo (o [`CONTRIBUTING.md`](CONTRIBUTING.md) para la versión en
inglés). Todas las personas participantes deben seguir
[`CODE_OF_CONDUCT.es.md`](CODE_OF_CONDUCT.es.md).

---

## 🔐 Seguridad

Sinonimia es un sitio estático completamente del lado del cliente: sin
backend, sin base de datos, sin telemetría, sin servicios de terceros en
tiempo de ejecución. El modelo de amenaza es esencialmente "qué podría
hacer una página maliciosa offline contra el mismo origen", algo que el
navegador ya aísla. Ver [`SECURITY.es.md`](SECURITY.es.md) (o
[`SECURITY.md`](SECURITY.md)) para reportar una sospecha de forma privada.

---

## 🧩 Proyectos hermanos

Este proyecto forma parte de un pequeño grupo de proyectos hermanos
que comparten autor, la misma filosofía de accesibilidad y sin
backend, y la misma historia de despliegue en Cloudflare. **Apptonomia
es el proyecto principal**; los demás (Calculia, Okeymoney, Sinonimia,
Teclatlon) salieron de él o se construyeron a su lado sobre el mismo
stack.

| Proyecto | Qué es | Repositorio |
|---|---|---|
| **Apptonomia** *(principal)* | Actividades para rutinas y vida cotidiana (diseñado para nuestros/as usuarios/as tipo) | [github.com/miralante/apptonomia](https://github.com/miralante/apptonomia) |
| Calculia | Cálculo y razonamiento lógico | [github.com/miralante/calculia](https://github.com/miralante/calculia) |
| Memofun | Tarjetas de memoria con aprendizaje significativo | [github.com/miralante/memofun](https://github.com/miralante/memofun) |
| Okeymoney | Finanzas personales y autonomía cotidiana | [github.com/miralante/okeymoney](https://github.com/miralante/okeymoney) |
| Routime | Actividades para rutinas y vida cotidiana | [github.com/miralante/routime](https://github.com/miralante/routime) |
| Sinonimia | Diccionario en lectura fácil | [github.com/miralante/sinonimia](https://github.com/miralante/sinonimia) |
| Teclatlon | Mecanografía con el teclado físico | [github.com/miralante/teclatlon](https://github.com/miralante/teclatlon) |

La guía canónica de Cloudflare / despliegue para el grupo vive en
[`CLOUDFLARE.md` de Apptonomia](https://github.com/miralante/apptonomia/blob/master/CLOUDFLARE.md).
Este repo usa el modelo **Workers + static assets** (`wrangler.toml` +
`[assets]`), que es una forma distinta al modelo Pages clásico de
Apptonomia/Teclatlon — ver [`CLOUDFLARE.md`](CLOUDFLARE.md) para la guía local.
