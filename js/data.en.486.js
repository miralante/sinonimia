(()=>{const ids=new Set(['put-like-this','put-on','put-together-2','put-up-sandbars','puzzling-2','pyramided','pyrenean-2','pyrenean-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'put-on-noun':{definition:'An act or performance intended to deceive or impress; a pretence.',synonyms:['act','pretence','affectation']},
 'put-out':{definition:'Offended, annoyed, or inconvenienced.',synonyms:['annoyed','offended','inconvenienced']},
 'putrilage':{definition:'Medicine. Soft, pulpy material formed when tissue undergoes gangrenous necrosis.',synonyms:['necrotic tissue','gangrenous matter']},
 'put-up-with':{synonyms:['tolerate','endure','bear']},
 puzzling:{definition:'Causing confusion or difficulty in understanding; also, perplexing.',synonyms:['perplexing','mystifying','confusing']},
 pycnometer:{synonyms:['density bottle','specific-gravity bottle']},
 pygmy:{definition:'A member of any of several peoples whose adult average height is notably short; the term can be sensitive, so a specific people’s name is preferable when known. Also, something exceptionally small.',synonyms:['person of short stature (context-dependent)','very small thing']},
 pylon:{definition:'A tower or upright structure, especially one supporting overhead power lines; also, a monumental gateway or tower in ancient Egyptian architecture.',synonyms:['electricity transmission tower','support tower','monumental gateway']},
 pyogeny:{definition:'The formation or production of pus.',synonyms:['pus formation','suppuration']},
 pyre:{definition:'A heap of combustible material on which a dead body is burned, especially in a funeral ceremony.',synonyms:['funeral pyre','burning pile']},
 pyrethogen:{definition:'A substance or agent that produces fever.',synonyms:['fever-producing agent','pyrogen']},
 pyramidal:{definition:'Having the shape or form of a pyramid.',synonyms:['pyramid-shaped','pyramid-like']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
