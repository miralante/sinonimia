/* Reviewed English dictionary updates for batch 1981. */
(()=>{
  const reviewed=['essential','essentially','sphere','slogan','spatial','capacious','scare','scatter','spartan','spice'];
  for(const id of reviewed){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
  const spartan=DICCIONARIOS.en.find(e=>e.id==='spartan');
  spartan.definition="Adjective: very plain, strict, or self-disciplined, with little comfort or decoration.";
  const removed=new Set(['dacian']);
  DICCIONARIOS.en=DICCIONARIOS.en.filter(e=>!removed.has(e.id));
  for(const language of ['es','en'])for(const entry of DICCIONARIOS[language]){const key=language==='es'?'en':'es',value=entry.translation?.[key];if(!value)continue;const kept=(Array.isArray(value)?value:[value]).filter(id=>!removed.has(id));if(kept.length)entry.translation={...entry.translation,[key]:Array.isArray(value)?kept:kept[0]};else delete entry.translation;}
})();
