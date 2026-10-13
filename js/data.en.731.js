(()=>{const u={
  'ultrasonic':{definition:'Having a frequency above the upper limit of human hearing; also, relating to or using ultrasound.',synonyms:['ultrasound-frequency','above audible range']},
  'ultraviolet':{definition:'Of or relating to electromagnetic radiation with wavelengths shorter than visible violet light; also, this radiation itself.',synonyms:['UV','ultraviolet radiation']},
  'ultrared':{definition:'Relating to infrared radiation, beyond the red end of the visible spectrum.',synonyms:['infrared','infrared radiation']},
  'ultra-processed':{definition:'Describing food made through extensive industrial processing, often from multiple ingredients and additives.',synonyms:['highly processed','industrially processed']},
  'umayyad':{definition:'Relating to the Umayyad dynasty, or a member of that dynasty, which ruled parts of the Islamic world, including al-Andalus.',synonyms:['of the Umayyad dynasty','Umayyad dynasty member']},
  'unacceptably':{definition:'In a way that cannot be accepted; to an unacceptable degree.',synonyms:['in an unacceptable way','unreasonably']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['ultra-processed-2','umbracle','umbrella-2','umbrella-3','umbrella-4','umbrella-stand-2']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
