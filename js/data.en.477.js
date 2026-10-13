(()=>{const ids=new Set(['public-wifi-network-2','published','pudding-2','puddle-4','puddle-5','puff-3','puff-4','puff-5','puff-6','puff-7']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 'puddle-jumper':{definition:'Informal, especially in North America: a small, light airplane used for short flights between nearby or regional destinations; also, an old or rickety car.',synonyms:['small regional aircraft','commuter plane','flivver (old car sense)']},
 puddinga:{definition:'Geology. A conglomerate rock made of rounded pebbles or fragments cemented in a finer matrix; also called puddingstone.',synonyms:['puddingstone','conglomerate rock']},
 pucker:{definition:'To draw or gather into small wrinkles or folds; of the skin, lips, or fabric, to become wrinkled or puckered.',synonyms:['wrinkle','gather','crease','draw together']},
 'puff-2':{definition:'To ornament fabric with raised, rounded folds or gathers.',synonyms:['puff (sewing)','gather into puffs','ruche']},
 'public-wifi-network':{definition:'Wireless internet access made available to the public in a place such as a café, library, or station; it may be free or paid.',synonyms:['public Wi-Fi','public wireless network','Wi-Fi hotspot']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
