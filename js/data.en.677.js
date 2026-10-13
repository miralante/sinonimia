(()=>{const u={
  toilet:{definition:'A fixture for urination and defecation; a room containing such a fixture; also, the act or process of washing and grooming oneself.',synonyms:['lavatory','bathroom fixture','personal grooming']},
  'toilet-paper-holder':{definition:'A fixture or stand that holds a roll of toilet paper.',synonyms:['toilet roll holder']},
  'toiletry-bag':{definition:'A small bag used to carry toiletries and personal-care items while traveling.',synonyms:['toilet bag','washbag','dopp kit']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['traditional-footwear-from-the-region-of-galicia-made-of-tanned-leather','toil-2','toilet-2','toilet-3','toilet-4']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
