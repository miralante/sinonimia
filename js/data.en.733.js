(()=>{const u={
  unbeatable:{definition:'Impossible or extremely difficult to defeat, overcome, or surpass; also, exceptionally good or attractive in informal use.',synonyms:['invincible','unconquerable','unsurpassed']},
  unbind:{definition:'To remove a binding, tie, or restraint; figuratively, to release someone from a restriction or obligation.',synonyms:['untie','unbind','release','free']},
  unblinking:{definition:'Not blinking; staring steadily without closing the eyes.',synonyms:['steady-eyed','unflinching','steady']},
  unborn:{definition:'Not yet born.',synonyms:['not yet born','prenatal (context-dependent)']},
  unbox:{definition:'To remove an item from its box or packaging; in computing, to convert a boxed value to its underlying value.',synonyms:['unpack','remove from a box']},
  unbrake:{definition:'To release or disengage a brake.',synonyms:['release the brake','disengage the brake']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['unbeatable-2','unbeatable-3','unbind-2','unbind-3','unbind-4','unbind-5','unbind-6','unbind-7','unbinding','unbinding-2','unblow','unbranch','unbreakable-2','unbreakable-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
