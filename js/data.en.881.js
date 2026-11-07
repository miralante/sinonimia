(()=>{const d=globalThis.DICCIONARIOS?.en;if(!d)throw Error('missing en dictionary');const set=(id,f)=>{const x=d.find(q=>q.id===id);if(!x)throw Error('missing en '+id);Object.assign(x,f);delete x.translation};
set('red-handed',{image:{id:11291,alt:'A person is caught while doing something wrong.'},definition:'Doing something wrong when someone catches you.',synonyms:['in the act'],example:{word:'red-handed',text:'The guard caught the thief red-handed.'},exampleSynonym:{word:'in the act',text:'The guard caught the thief in the act.'},situacion:'seguridad'});
})();
