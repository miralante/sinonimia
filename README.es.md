# Sinonimia 📖

> 🌐 **Otros idiomas:** [English](README.md)
>
> 🚀 **Pruébalo en vivo:** [sinonimia.miralante.workers.dev](https://sinonimia.miralante.workers.dev/)

Un diccionario en lenguaje sencillo para palabras difíciles: trámites,
justicia y salud. Cada palabra tiene una definición corta, un sinónimo
sencillo, una frase de la vida diaria (repetida con el sinónimo) y un
pictograma. Pensado siguiendo las pautas de **lectura fácil** (norma UNE
153101:2018 EX), para que se entienda a la primera.

No hay build, no hay backend, no hay dependencias: HTML, CSS y JavaScript
tal cual, pensado para ser fácil de mantener y de ampliar.

## Probarlo

Está desplegado en **[sinonimia.miralante.workers.dev](https://sinonimia.miralante.workers.dev/)**
— entra y úsalo directamente desde el navegador, sin instalar nada.

Si quieres ejecutarlo en local, basta con abrir `index.html` en un
navegador, o servir la carpeta con cualquier servidor estático, por
ejemplo:

```
npx serve .
```

## Qué incluye

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

## Documentación del proyecto

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
ampliar el contenido" en [`doc/es/SPEC.md`](doc/es/SPEC.md).

## Mantenimiento

El directorio `scripts/.cache/` (listas de frecuencias de palabras que
descarga `candidatos-corpus.js`) se puede vaciar con:

```
npm run clean-cache          # dry-run: muestra qué se borraría
node scripts/limpiar-cache.js --apply   # borra de verdad
```

La siguiente ejecución de `candidatos-corpus.js` reconstruye la caché
automáticamente. `scripts/.scratch/` (los scripts de exploración one-off
del mantenedor) **no** se toca con este comando — límpialo a mano si lo
necesitas.

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
| **Apptonomia** *(principal)* | Terapia ocupacional: 7 módulos, 69 actividades | [github.com/miralante/apptonomia](https://github.com/miralante/apptonomia) |
| Calculia | Cálculo y razonamiento lógico: 12 actividades | [github.com/miralante/calculia](https://github.com/miralante/calculia) |
| Okeymoney | Finanzas personales y autonomía cotidiana | [github.com/miralante/okeymoney](https://github.com/miralante/okeymoney) |
| Sinonimia | Diccionario en lectura fácil | [github.com/miralante/sinonimia](https://github.com/miralante/sinonimia) |
| Teclatlon | Mecanografía con el teclado físico | [github.com/miralante/teclatlon](https://github.com/miralante/teclatlon) |

La guía canónica de Cloudflare / despliegue para el grupo vive en
[`CLOUDFLARE.md` de Apptonomia](https://github.com/miralante/apptonomia/blob/master/CLOUDFLARE.md).
Este repo usa el modelo **Workers + static assets** (`wrangler.toml` +
`[assets]`), que es una forma distinta al modelo Pages clásico de
Apptonomia/Teclatlon — ver [`CLOUDFLARE.md`](CLOUDFLARE.md) para la guía local.
