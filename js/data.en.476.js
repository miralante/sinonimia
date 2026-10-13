(()=>{const ids=new Set(['pubertal-2','puberty-2','public-body-2','public-deed-2','public-wifi-network-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 pubertal:{synonyms:['relating to puberty','puberal','adolescent (broader)']},
 puberty:{definition:'The stage of development during which a person’s body undergoes changes that lead to sexual maturity and adult reproductive function.',synonyms:['sexual maturation','adolescent development (broader)']},
 pubian:{definition:'Relating to the pubis or the pubic region; a rare or less usual variant of “pubic.”',synonyms:['pubic','of the pubis']},
 'public-address-system':{definition:'An electronic system that amplifies sound so announcements or other audio can be heard by people in a public or shared space.',synonyms:['PA system','public address system','loudspeaker system']},
 'public-employment':{definition:'Employment in government or in an organization that provides public services; exact coverage depends on the country and context.',synonyms:['public-sector employment','government employment','civil service employment (in some contexts)']},
 'public-function':{definition:'A duty, role, or activity carried out by a public authority or by someone acting in an official public capacity.',synonyms:['official duty','public duty','government function']},
 publicly:{definition:'In a way that is open or accessible to the public, or done openly rather than privately.',synonyms:['openly','in public','publicly available (by context)']},
 'public-tender':{definition:'A competitive procurement process in which suppliers submit offers for a contract, often one issued by a government or public body.',synonyms:['public procurement','competitive tender','government tender']},
 'public-wifi':{definition:'Wireless internet access made available to the public in a place such as a café, library, or station; it may be free or paid.',synonyms:['public Wi-Fi','public wireless network','Wi-Fi hotspot']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
