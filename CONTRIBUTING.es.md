# Contribuir a Sinonimia

> 🌐 **Otros idiomas:** [English](CONTRIBUTING.md)
>
> **Parte de la suite [Miralante](https://apptonomia.uk)** —
> Sinonimia es uno de los siete proyectos hermanos (Apptonomia,
> Calculia, Memofun, Okeymoney, Routime, Sinonimia, Teclatlon) que
> comparten el mismo flujo de trabajo, las mismas reglas de
> accesibilidad y el mismo código de conducta. Este repo publica
> **Sinonimia** en sí.

Gracias por tu interés en contribuir. Esta guía cubre el flujo de
trabajo en GitHub que seguimos en toda la suite, los roles del
proyecto y el pequeño conjunto de recetas que mantienen a cada
hermano coherente.

---

## 🔀 Flujo de trabajo en GitHub

```text
1. 🔍 Buscar o crear un issue (en español o inglés)
2. 💬 Comentar y consensuar el alcance
3. 🌿 Crear una rama (fork si no tienes acceso de push)
4. ✏️  Hacer los cambios siguiendo las recetas de abajo
5. 📤 Abrir un Pull Request (PR) referenciando el issue
6. 👀 Esperar revisión (al menos 1 de un maintainer)
7. ✅ Merge cuando hay aprobación
```

**Etiquetas de issues** (las usamos para clasificar):

| Etiqueta | Significado |
|---|---|
| `UX` | Mejora de usabilidad o experiencia |
| `contenido` | Textos, traducciones, copy de accesibilidad |
| `bug` | Error reproducible en el comportamiento |
| `tech` | Implementación técnica, refactor |
| `docs` | Cambios en la documentación |
| `good first issue` | Apto para una primera contribución |

### Convenciones de ramas

- `feat/<slug>` — nuevas funcionalidades
- `fix/<slug>` — corrección de bugs
- `docs/<slug>` — cambios solo en documentación
- `content/<slug>` — cambios solo de contenido (definiciones, ejemplos, pictogramas)
- `i18n/<código>` — traducción a un idioma (ej. `i18n/ca`, `i18n/gl`)

### Commits

- Mensaje en **inglés** (convención del repo), resumen en imperativo.
- Una cosa por commit — commits grandes se pueden pedir trocear.
- Si cierran un issue, incluir `Closes #123` al final.

---

## 👥 Roles del proyecto

Sinonimia tiene **dos roles diferenciados** en su comunidad (a
diferencia de la mayoría de hermanos, que tienen un rol de apoyo
dedicado):

| # | Rol | Lee primero |
|---|---|---|
| 1 | 👤 **Persona usuaria** | La app — nunca este fichero. |
| 3 | 💻 **Persona constructora** (contenido o código) | Este fichero, más el `doc/es/SPEC.md`, el `doc/es/tecnico.md` y el `CLAUDE.md`. |

> Las decisiones puramente técnicas viven en el rol de persona
> constructora, **no porque se ignore a la persona usuaria, sino
> porque ese es el dominio de cada rol.** Las decisiones de
> producto, contenido, idioma y diseño de UI **se prueban y validan
> con la persona usuaria siempre que es posible**, y su feedback es
> la fuente principal de mejora.

---

## 📝 Qué puedes aportar

- **Añadir una nueva palabra** con definición, sinónimo, dos ejemplos
  y un pictograma (ver `doc/es/SPEC.md` para las reglas de lectura
  fácil).
- **Añadir un nuevo idioma** (cobertura completa o parcial).
- **Revisar la redacción** de entradas existentes (estilo de lectura
  fácil, tono, precisión).
- **Cruzar traducciones** entre idiomas con el campo `traduccion`.
- **Corrección de bugs** — cualquier cosa que se rompa en un
  navegador soportado.
- **Cabeceras de seguridad / CSP** — endurecer la política en
  `_headers`.

Para adiciones por lotes (10+ palabras nuevas de una vez) el flujo
sigue siendo el mismo; consulta
[`scripts/ingest/README.md`](scripts/ingest/README.md) para la
pipeline del maintainer.

---

## 🌐 Recetas

### Corrección de copy / palabra nueva

1. Lee `doc/es/SPEC.md` — no es opcional. Contiene las reglas de
   lectura fácil, la arquitectura multi-idioma y las restricciones
   innegociables de producto.
2. Ejecuta `node scripts/content-status.js --detalle --categoria
   <tema> --lang <es|en>` para ver qué palabras ya existen.
3. Edita `js/data.<lang>.js` y rellena los campos siguiendo la spec.
4. `ejemplo.palabra` y `ejemploSinonimo.palabra` deben aparecer
   literalmente dentro de `ejemplo.texto` y `ejemploSinonimo.texto`
   (el resaltado del sitio depende de ello).
5. Añade un `traduccion` por id si la palabra tiene una equivalente
   clara.
6. Consigue un pictograma con `node scripts/search-pictogram.js`
   (ARASAAC u OpenSymbols; respeta la licencia que indique el script).
7. Ejecuta `node scripts/check.js` para verificar que todo resuelve.

### Nuevo idioma

Consulta el `doc/es/I18N.md` para el paso a paso completo (un nuevo
bloque `I18N`, un nuevo `js/data.<lang>.js`, su `<script>`,
un botón). `js/app.js` no necesita tocarse: ya funciona con
cualquier idioma presente en `DICCIONARIOS`.

### Mejora de accesibilidad

Lee primero el `doc/es/SPEC.md` §3 — las restricciones innegociables
viven ahí (botones ≥ 64×64 px, contraste WCAG AA con AAA como
objetivo de diseño, copy en lectura fácil, feedback sin presión).
Cualquier cosa que las rompa será rechazada.

### Añadir o endurecer una cabecera de seguridad

Las cabeceras viven en `_headers`. La CSP es deliberadamente
estricta (`script-src 'self'`, sin scripts inline; JSON-LD es dato y
no necesita `unsafe-inline`). Endurecerla es bienvenido; relajarla
casi nunca lo es — abre un issue antes.

---

## ✅ Checklist antes de abrir PR

- [ ] `node scripts/check.js` pasa en local.
- [ ] Si añadiste o cambiaste palabras, **todos los locales
      soportados** siguen alineados (o anotaste la brecha
      explícitamente).
- [ ] Los pictogramas están acreditados (`footerCreditsHtml` en
      `js/i18n.js` menciona su banco, licencia y autoría).
- [ ] Probaste el flujo en al menos un navegador real de escritorio
      (Chrome / Firefox / Safari).
- [ ] No añadiste ninguna dependencia de runtime nueva — solo HTML /
      CSS / JS vanilla.
- [ ] No aflojaste la CSP en `_headers` sin abrir un issue.

---

## 🚫 Lo que este repositorio NO acepta

- **Relajar la CSP** (`script-src 'self'` se queda estricto).
- **Nuevas dependencias de runtime** — solo HTML / CSS / JS vanilla.
- **Añadir analítica / telemetría / llamadas a terceros.**
- **Datos personales** de cualquier tipo.
- **Bloquear contenido detrás de un juego** — ver
  `doc/es/SPEC.md`.
- **Una SPA, un router o un paso de build.**

---

## 📞 Comunicación

- **Issues** → canal principal para propuestas, bugs, preguntas.
- **Revisiones de Pull Request** → para revisar cambios concretos.

---

## 📜 Código de conducta

Este proyecto sigue [`CODE_OF_CONDUCT.es.md`](CODE_OF_CONDUCT.es.md).
Participar implica aceptarlo.

---

## 🙏 Gracias

Gracias por dedicar tiempo a una herramienta que ayuda a entender el
mundo un poco mejor.
