# Sinonimia 📖

> 🌐 **Otros idiomas:** [English](README.md)
>
> 🚀 **Pruébalo en vivo:** [sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk/)

[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)
[![Sin dependencias](https://img.shields.io/badge/dependencias-ninguna-success.svg)](#-caracter%C3%ADsticas)
[![Sitio estático](https://img.shields.io/badge/build-ninguno-informational.svg)](#-caracter%C3%ADsticas)
[![Sin PWA](https://img.shields.io/badge/PWA-ninguna-lightgrey.svg)](#-caracter%C3%ADsticas)
[![i18n](https://img.shields.io/badge/i18n-es%20%7C%20en-yellow.svg)](#-documentaci%C3%B3n-del-proyecto-biling%C3%BCe)
[![CI](https://img.shields.io/badge/CI-node%20scripts%2Fcheck.js-blue.svg)](.github/workflows/check.yml)

Un diccionario en lenguaje sencillo para palabras difíciles: trámites,
justicia y salud. Cada palabra tiene una definición corta, un sinónimo
sencillo, una frase de la vida diaria (repetida con el sinónimo) y un
pictograma. Pensado siguiendo las pautas de **lectura fácil** (norma
UNE 153101:2018 EX), para que se entienda a la primera.

No hay build, no hay backend, no hay dependencias: HTML, CSS y
JavaScript tal cual, pensado para ser fácil de mantener y de ampliar.

- 🌐 **Aplicación**: [sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk/)
- 📦 **Repositorio**: [github.com/miralante/sinonimia](https://github.com/miralante/sinonimia)
- 💻 **Ejecutar en local**: abre `index.html` directamente en un
  navegador, o sirve la carpeta con cualquier servidor estático
  (`npx serve .` / `python -m http.server 8080`).

---

## 🚀 Pruébalo en vivo

Sinonimia está desplegada en **[sinonimia.apptonomia.uk](https://sinonimia.apptonomia.uk/)**
— ábrela en el navegador y úsala directamente, sin instalar nada.

---

## ✨ Características

- **Buscador** instantáneo (por la palabra difícil o por su
  significado), filtro por tema y navegación por letra.
- **Español e inglés**, con arquitectura pensada para añadir más
  idiomas (ver "Cómo añadir un idioma nuevo" en
  [`doc/es/spec.md`](doc/es/spec.md)).
- **Gamificación ligera** sin backend ni cuentas: palabra del día,
  botón "sorpréndeme", progreso guardado en el navegador, un campo
  para escribir tu propia frase con cada palabra, y dos juegos de
  practicar ("¿Qué palabra es?" y "Completa la frase").
- **Pictogramas de [ARASAAC](https://arasaac.org)**, compartidos
  entre idiomas cuando representan el mismo concepto.
- **Accesibilidad**: tamaño de letra ajustable, alto contraste, foco
  visible, navegación por teclado, `aria-live` en los mensajes
  dinámicos.
- 🪶 **Cero dependencias en tiempo de ejecución** — HTML/CSS/JS
  puros, sin build.
- 🔒 **Privacidad por defecto** — sin backend, sin base de datos, sin
  telemetría, sin servicios de terceros.

---

## 👥 Roles del proyecto

| Rol | Quién es | Cómo participa | Dónde mira primero |
|---|---|---|---|
| 👤 **Persona usuaria** (persona tipo) | Se encuentra con una palabra difícil | Usa la web directamente, sin registro ni cuenta | La propia web (`index.html`) |
| 💻 **Persona colaboradora** (contenido o código) | Propone una palabra nueva, un idioma nuevo, o toca el código | Sigue el proceso de [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md): añade una palabra siguiendo las reglas de lectura fácil, o implementa/revisa cambios de código | [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md) · [`tecnico.md`](doc/es/tecnico.md) |

Sinonimia solo tiene dos roles — no hay un rol de "apoyo" dedicado:
el diccionario está pensado para consultarse solo, sin que nadie tenga
que mediar. Ver [`doc/es/roles.md`](doc/es/roles.md) para la
descripción completa de los roles y cómo Sinonimia encaja en los
patrones trio/par/único del conjunto de la suite.

---

## 📚 Documentación del proyecto (bilingüe)

Toda la documentación del proyecto vive en la carpeta `doc/`, junto
con algunos archivos en la raíz del repositorio:

| Idioma | Punto de entrada |
|---|---|
| 🇪🇸 Español (este archivo) | [`doc/es/indice.md`](doc/es/indice.md) |
| 🇬🇧 English | [`doc/en/index.md`](doc/en/index.md) |

| Tema | Documento |
|---|---|
| Producto, audiencia, reglas de lectura fácil | [`doc/es/spec.md`](doc/es/spec.md) · [`doc/en/spec.md`](doc/en/spec.md) |
| Arquitectura y referencia técnica | [`doc/es/tecnico.md`](doc/es/tecnico.md) · [`doc/en/technical.md`](doc/en/technical.md) |
| Internacionalización (añadir un idioma) | [`doc/es/i18n.md`](doc/es/i18n.md) · [`doc/en/i18n.md`](doc/en/i18n.md) |
| Roles (trio / par / único en la suite) | [`doc/es/roles.md`](doc/es/roles.md) · [`doc/en/roles.md`](doc/en/roles.md) |
| Guía de despliegue (Cloudflare Workers) | [`CLOUDFLARE.md`](CLOUDFLARE.md) |
| Flujo operativo para agentes de IA | `CLAUDE.md` |

### 📄 Otros documentos del repo

| Documento | Para quién |
|---|---|
| [`CONTRIBUTING.es.md`](CONTRIBUTING.es.md) | Familias, terapeutas y desarrolladores que quieran contribuir |
| `CLAUDE.md` | Agentes IA: reglas obligatorias y estado del proyecto |
| [`CLOUDFLARE.md`](CLOUDFLARE.md) | Guía canónica de despliegue en Cloudflare Workers para la suite (Sinonimia + Apptonomia + Calculia, Memofun, Okeymoney, Teclatlon) |
| Historial del proyecto | En `git log`; no se mantiene una hoja de ruta externa |

---

## 🛠️ Preparar / Ampliar contenido

Para ampliar el diccionario:

```bash
node scripts/content-status.js
node scripts/content-status.js --detalle --categoria <categoría> --lang <es|en>
```

Antes de añadir palabras, el primer comando dice qué categorías
tienen pocas (menos de 8); el segundo, acotado a la categoría+idioma
elegidos, lista las palabras que ya existen ahí con sus sinónimos,
definición y ejemplo, para no repetir un concepto ni un escenario
ilustrativo — sin abrir nunca el `js/data.<idioma>.js` de varios
megabytes. Es el primer paso del proceso descrito en "Proceso para
ampliar el contenido" en [`doc/es/spec.md`](doc/es/spec.md).

---

## ✅ Validar los cambios

```bash
node scripts/check.js
```

No hace falta `npm install` — el script solo usa la librería estándar
de Node. Comprueba la sintaxis de los archivos JS, que las llaves del
CSS estén balanceadas, que cada palabra tenga su pictograma y sus
ejemplos bien formados, que las claves de texto de la interfaz
existan en todos los idiomas, y que los ids que usa `js/app.js`
existan en `index.html`. También corre en cada pull request
([`.github/workflows/check.yml`](.github/workflows/check.yml)).

---

## ☁️ Despliegue

Sinonimia es un sitio totalmente estático (HTML/CSS/JS, sin build),
así que se publica directamente en **[Cloudflare Workers (static assets)](https://developers.cloudflare.com/workers/static-assets/)**
mediante su integración nativa con GitHub. Las cabeceras de seguridad
HTTP viven en [`_headers`](_headers), y la metadata del proyecto en
[`wrangler.toml`](wrangler.toml). Consulta [`CLOUDFLARE.md`](CLOUDFLARE.md)
con la guía completa (rebuild, rollback, dominio personalizado,
rotación de credenciales).

Para desplegar tu propia versión:

1. Crea un proyecto Cloudflare Workers desde este repo en el
   dashboard (**Workers & Pages → Create → Connect to Git**). El
   comando de build queda vacío; `wrangler.toml` declara el directorio
   de static assets.
2. Push a `main`. Cloudflare reconstruye y despliega
   automáticamente. El workflow de validación
   ([`.github/workflows/check.yml`](.github/workflows/check.yml))
   sigue corriendo en cada push y PR para gatekeeping de contenido,
   pero no despliega.

Las pull requests reciben automáticamente una URL de
previsualización — sin necesidad de un workflow extra.

---

## 🔐 Seguridad

Sinonimia es un sitio estático completamente del lado del cliente: sin
backend, sin base de datos, sin telemetría, sin servicios de terceros
en tiempo de ejecución. El modelo de amenaza es esencialmente "qué
podría hacer una página maliciosa offline contra el mismo origen",
algo que el navegador ya aísla. Ver [`SECURITY.es.md`](SECURITY.es.md)
(o [`SECURITY.md`](SECURITY.md)) para reportar una sospecha de forma
privada.

---

## 📄 Licencia

Sinonimia publica **tres** licencias, una por tipo de activo:

- El **código** (HTML/CSS/JS) es de quien contribuye, bajo **MIT**
  (ver [`LICENSE`](LICENSE)).
- El **contenido del diccionario** (definiciones, sinónimos, frases)
  está bajo **Creative Commons Attribution-ShareAlike 4.0
  (CC BY-SA 4.0)**.
- Los **pictogramas** en `img/` no son nuestros: son de
  [ARASAAC](https://arasaac.org) (autor Sergio Palao, propiedad del
  Gobierno de Aragón), bajo **CC BY-NC-SA**. Si añades un pictograma
  nuevo desde ARASAAC, mantén esa licencia y la atribución del pie
  de página — no se pueden usar con fines comerciales sin permiso de
  ARASAAC.

---

## 🧹 Mantenimiento

Este repo no tiene `node_modules` ni artefactos de build. Para limpiar
la caché local de la PWA durante el desarrollo, desregistra el service
worker desde DevTools (`Application → Service workers → Unregister`)
y borra los datos del sitio.

El directorio `scripts/.cache/` (listas de frecuencias de palabras
que descarga `corpus-candidates.js`) se puede vaciar con:

```bash
node scripts/clean-downloads.js            # dry-run: muestra qué se borraría
node scripts/clean-downloads.js --apply    # borra de verdad
```

La siguiente ejecución de `corpus-candidates.js` reconstruye la caché
automáticamente. `scripts/ingest/` (el pipeline de ingest por lotes
del mantenedor, los ficheros de datos de batches/fixes, y los scripts
de exploración one-off) **no** se toca con este comando — límpialo a
mano si lo necesitas, o lee [`scripts/ingest/README.md`](scripts/ingest/README.md)
para ver qué hay dentro y cómo está organizado.

---

## 🙏 Créditos

Las definiciones y ejemplos se basan en glosarios públicos de
"lenguaje claro" de administraciones y tribunales (IVAP, Red de
Lenguaje Claro) y en glosarios médicos pensados para pacientes.

---

## 🌐 La suite Miralante — proyectos del grupo

Sinonimia es una de las **seis apps** de la suite **Miralante**, que
comparten autor, la misma filosofía de accesibilidad sin backend y la
misma historia de despliegue en Cloudflare. Apptonomia, además de ser
una app en sí misma, actúa como **portal de la suite** que la presenta
al mundo. Ninguno de los siete repos es el "principal" — son iguales;
este es el producto original del que nació el grupo.

| Proyecto | Qué es | Repositorio |
|---|---|---|
| **Apptonomia** *(portal — landing only, no es app)* | Landing que presenta la suite Miralante (no es una app en tiempo de ejecución) | [github.com/miralante/apptonomia](https://github.com/miralante/apptonomia) |
| [Calculia](https://calculia.apptonomia.uk/) | Cálculo y razonamiento lógico | [github.com/miralante/calculia](https://github.com/miralante/calculia) |
| [Memofun](https://memofun.apptonomia.uk/) | Tarjetas de memoria con aprendizaje significativo | [github.com/miralante/memofun](https://github.com/miralante/memofun) |
| [Okeymoney](https://okeymoney.apptonomia.uk/) | Finanzas personales y autonomía cotidiana | [github.com/miralante/okeymoney](https://github.com/miralante/okeymoney) |
| [Routime](https://routime.apptonomia.uk/) | Actividades para rutinas y vida cotidiana | [github.com/miralante/routime](https://github.com/miralante/routime) |
| [Sinonimia](https://sinonimia.apptonomia.uk/) | Diccionario en lectura fácil | [github.com/miralante/sinonimia](https://github.com/miralante/sinonimia) |
| [Teclatlon](https://teclatlon.apptonomia.uk/) | Mecanografía con el teclado físico | [github.com/miralante/teclatlon](https://github.com/miralante/teclatlon) |

La guía canónica de Cloudflare / despliegue para el grupo vive en
[`CLOUDFLARE.md` de Apptonomia](https://github.com/miralante/apptonomia/blob/master/CLOUDFLARE.md).
Este repo usa el modelo **Workers + static assets** (`wrangler.toml`
+ `[assets]`), que es una forma distinta al modelo Pages clásico de
Apptonomia/Teclatlon — ver [`CLOUDFLARE.md`](CLOUDFLARE.md) para la
guía local.

## More about this project

- [About this project](https://sinonimia.apptonomia.uk/about/)
- [Privacy](https://sinonimia.apptonomia.uk/legal/privacidad.html)
