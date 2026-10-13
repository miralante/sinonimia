(()=>{const u={
  tilter:{definition:'A person or device that tilts something.',synonyms:['tilting device']},
  tilting:{definition:'The act or process of moving or being moved into a sloping position.',synonyms:['inclining','leaning']},
  timbal:{definition:'A shallow, single-headed drum, usually played with sticks; often used in the plural for a pair of Latin percussion drums.',synonyms:['timbale drum']},
  timbalist:{definition:'A musician who plays timbales.',synonyms:['timbales player']},
  timber:{definition:'Wood prepared for use in building or carpentry; also, trees suitable for such use.',synonyms:['lumber','wood']},
  timbrology:{definition:'The study or collecting of postage stamps; philately.',synonyms:['philately','stamp collecting']},
  timeless:{definition:'Not limited to a particular time; enduring or seemingly unaffected by time.',synonyms:['eternal','enduring','everlasting']},
  time:{definition:'The continuous progression of existence; a measured duration or occasion; also, to measure or record the duration of something.',synonyms:['duration','period','occasion','measure']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['tilled','tilt-2','tilting-3','timar','timba','time-2','timeclimbing','timeleaceous']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
