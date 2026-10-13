(()=>{const u={
 exorcismo:{definition:'Práctica religiosa o ritual destinada a expulsar o alejar un espíritu maligno, demonio o influencia considerada dañina.',synonyms:['ritual de expulsión','conjuro','rito de purificación']},
 exornar:{definition:'Adornar o embellecer algo, especialmente el lenguaje o un discurso, con recursos expresivos.',synonyms:['adornar','embellecer','ornamentar']},
 exosfera:{word:'Exósfera',definition:'Capa más externa de la atmósfera terrestre, donde las partículas de gas son muy escasas y pueden escapar al espacio.',synonyms:['capa exterior de la atmósfera']},
 exosmosis:{definition:'Ósmosis hacia el exterior: paso neto de disolvente desde el interior de una célula o compartimento a través de una membrana semipermeable.',synonyms:['ósmosis hacia el exterior','salida osmótica']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.es.find(x=>x.id===id);if(!r)throw Error('Missing es/'+id);Object.assign(r,p);delete r.translation;}})();
