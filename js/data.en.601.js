(()=>{const ids=new Set(['respectfully-2','respectfully-3','respigator']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);if(r)if(r)delete r.translation;}}})();
