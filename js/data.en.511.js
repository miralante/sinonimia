(()=>{const ids=new Set(['canine-hunger','ravine-3','ravine-4','raw-2','raw-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 ravelin:{definition:'A detached, usually triangular fortification built in front of a larger fort to protect its entrance or divide an attacking force.',synonyms:['outwork','detached fortification','demilune']},
 raven:{definition:'A large, glossy black bird of the crow family, with a heavy bill and a deep, harsh call.',synonyms:['common raven','Corvus corax']},
 ravenala:{definition:'Any tree of the genus Ravenala, especially the traveler’s tree, a large fan-leaved plant native to Madagascar.',synonyms:['traveler’s tree','Ravenala madagascariensis']},
 'ravenously':{definition:'In a way that shows an intense hunger or desire; voraciously.',synonyms:['voraciously','greedily','hungrily']},
 ravine:{definition:'A deep, narrow valley or gorge, often with steep sides and formed by erosion.',synonyms:['gorge','gully','defile']},
 raving:{definition:'Speaking or behaving in a wildly irrational or delirious way; also, an instance of such speech.',synonyms:['ranting','delirious','wildly incoherent']},
 raw:{definition:'Uncooked or unprocessed; also, rough, unfinished, exposed, or painfully direct, depending on context.',synonyms:['uncooked','unprocessed','rough','unvarnished']},
 'raw-rubber-lump':{definition:'A mass of raw rubber formed when latex coagulates.',synonyms:['coagulated latex','raw rubber mass']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
