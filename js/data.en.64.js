/* Remove free-text translations after review of batch 2028. */
(()=>{
  const ids=["pismire","anthill","swarming","hormonal","horoscope","horrible","horribly","horror","poorhouse","hospital"];
  for(const id of ids){const row=DICCIONARIOS.en.find(e=>e.id===id);if(!row)throw Error('Missing en/'+id);delete row.translation;}
})();
