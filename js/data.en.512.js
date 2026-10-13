(()=>{const ids=new Set(['reach-2','reached','reach-puberty']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 ray:{definition:'A narrow beam of light, heat, or other energy; a small amount or hint of something; a flat-bodied sea fish; or, in geometry, a half-line beginning at a point and extending infinitely in one direction.',synonyms:['beam','sunbeam','half-line','skate (the fish)']},
 rayadillo:{definition:'A blue-and-white striped cotton or flannel fabric, especially the material historically used for Spanish colonial military uniforms.',synonyms:['striped uniform fabric','Spanish colonial uniform cloth']},
 rayon:{definition:'A textile fiber made from regenerated cellulose; also, yarn, thread, or fabric made from this fiber.',synonyms:['viscose','regenerated cellulose fiber']},
 raze:{definition:'To destroy a building or other structure completely, reducing it to the ground; also, to erase or remove something from a surface.',synonyms:['demolish','level','erase','remove']},
 'raze-2':{definition:'To scrape, shave, or erase something from a surface.',synonyms:['scrape away','shave off','erase']},
 'raze-3':{definition:'To bring a structure or surface level with the ground or another surface.',synonyms:['level','flatten','raze']},
 razor:{definition:'A sharp-edged instrument used for shaving hair; also, to shave or cut with a razor.',synonyms:['shaving razor','razor blade','straight razor']},
 'razor-3':{definition:'A sharp-edged hand tool used to shave hair from the face or body.',synonyms:['razor','shaving blade']},
 'razor-4':{definition:'An electric device used for shaving hair.',synonyms:['electric razor','electric shaver']},
 reachable:{definition:'Able to be reached, contacted, attained, or obtained.',synonyms:['accessible','attainable','obtainable']},
 reacher:{definition:'A person or device that reaches, especially a tool used to grasp objects beyond arm’s length.',synonyms:['reaching tool','grabber','extender']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
