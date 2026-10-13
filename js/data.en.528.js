(()=>{const ids=new Set(['recording-2','record-label-2','record-player-2','record-screen','recount-2','recover-2','recover-3','recover-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 recordable:{definition:'Able to be recorded, stored, or captured in a lasting form, such as on audio, video, or a digital device.',synonyms:['capturable','storable','registrable']},
 recording:{definition:'The act or process of capturing sound, images, or data; also, the captured audio, video, or other material.',synonyms:['audio capture','video capture','recorded material']},
 'record-label':{definition:'A company that records, produces, promotes, and distributes music recordings.',synonyms:['record company','music label']},
 'record-player':{definition:'A device that plays sound recordings from vinyl records by rotating the disc and reading its groove with a stylus.',synonyms:['turntable','phonograph','gramophone']},
 recount:{definition:'To tell someone about a past event or experience; also, to count something again, especially votes.',synonyms:['narrate','relate','count again','retally']},
 recover:{definition:'To get back something lost, stolen, or spent; to return to health or a normal state; or to regain control, composure, or use.',synonyms:['regain','retrieve','recoup','get well']},
 recoverable:{definition:'Able to be recovered, retrieved, or restored.',synonyms:['retrievable','restorable','reclaimable']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
