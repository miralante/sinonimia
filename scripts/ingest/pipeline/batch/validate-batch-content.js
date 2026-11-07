"use strict";

function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function replaceAll(text, find, replacement) {
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(escaped, "g"), replacement);
}

function validateBatchContent(batch) {
  const messages = [];
  let count = 0;
  batch.forEach(function (entry) {
    const required = [
      "id", "palabra", "imagen", "definicion", "sinonimos",
      "ejemplo", "ejemploSinonimo", "situacion",
    ];
    required.forEach(function (key) {
      if (!(key in entry)) {
        messages.push(`FALTA ${key} en ${entry.id}`);
        count += 1;
      }
    });

    if (entry.ejemplo && entry.ejemplo.palabra && entry.ejemplo.texto &&
        !normalize(entry.ejemplo.texto).includes(normalize(entry.ejemplo.palabra))) {
      messages.push(`ejemplo.palabra NO es subcadena de ejemplo.texto: ${entry.id}`);
      count += 1;
    }
    if (entry.ejemploSinonimo && entry.ejemploSinonimo.palabra && entry.ejemploSinonimo.texto &&
        !normalize(entry.ejemploSinonimo.texto).includes(normalize(entry.ejemploSinonimo.palabra))) {
      messages.push(`ejemploSinonimo.palabra NO es subcadena de ejemploSinonimo.texto: ${entry.id}`);
      count += 1;
    }
    if (entry.ejemplo && entry.ejemploSinonimo) {
      const synonymExample = replaceAll(
        entry.ejemplo.texto,
        entry.ejemplo.palabra,
        entry.ejemploSinonimo.palabra
      );
      if (synonymExample !== entry.ejemploSinonimo.texto) {
        messages.push(`ejemplo y ejemploSinonimo NO son la misma frase al sustituir: ${entry.id}`);
        messages.push(`  ejemplo: "${entry.ejemplo.texto}"`);
        messages.push(`  sin pal: "${synonymExample}"`);
        messages.push(`  sinonim: "${entry.ejemploSinonimo.texto}"`);
        count += 1;
      }
    }
  });
  return { messages: messages, count: count };
}

module.exports = { validateBatchContent: validateBatchContent };
