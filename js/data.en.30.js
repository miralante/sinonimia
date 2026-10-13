/* Reviewed English dictionary updates for batch 1994. */
(()=>{
  const reviewed=['exterior','exterminator','extra','unofficial','extraordinarily','extraterrestrial','extremely','extreme','ejaculate','factory'];
  for(const id of reviewed){const e=DICCIONARIOS.en.find(x=>x.id===id);if(!e)throw Error('Missing en/'+id);delete e.translation;}
  const ejaculate=DICCIONARIOS.en.find(e=>e.id==='ejaculate');
  ejaculate.definition="To expel semen from the body; also, to utter or exclaim something suddenly or forcefully.";
  ejaculate.synonyms=['expel semen','emit semen','exclaim','utter suddenly'];
  ejaculate.example={word:'ejaculate',text:'The textbook describes how mammals ejaculate; in the novel, the startled guard ejaculated a brief warning.'};
  ejaculate.exampleSynonym={word:'exclaim',text:'The textbook describes how mammals emit semen; in the novel, the startled guard exclaimed a brief warning.'};
})();
