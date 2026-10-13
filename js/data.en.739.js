(()=>{const u={
  undercut:{definition:'To cut away material from beneath something; to sell for less than a competitor; or figuratively, to weaken or undermine someone or something.',synonyms:['undermine','undervalue','price below a competitor']},
  underdeveloped:{definition:'Not fully developed or mature; also, having a relatively low level of economic or social development.',synonyms:['undeveloped','immature','less developed']},
  underlined:{definition:'Marked with a line beneath; emphasized or made prominent.',synonyms:['emphasized','underscored','marked below']},
  undermine:{definition:'To weaken or damage something gradually or indirectly; literally, to excavate beneath a structure so that it becomes unstable.',synonyms:['weaken','erode','undercut','sabotage']},
  underpants:{definition:'A garment worn next to the skin beneath outer clothes, covering the hips and usually part or all of the lower torso.',synonyms:['underwear','briefs','knickers (British, depending on style)']},
  underside:{definition:'The lower or bottom surface of something.',synonyms:['bottom','undersurface','underneath']},
  undersell:{definition:'To sell something for less than a competitor or less than its value; also, to present it as less impressive than it is.',synonyms:['price below','undervalue','understate']},
  'underground':{definition:'Below the surface of the ground; also, an underground railway system or an organized resistance movement operating secretly.',synonyms:['belowground','subterranean','subway (transit system)']},
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(r){Object.assign(r,p);delete r.translation;}}
const ids=new Set(['underground-2','underpants-remover','understand-3','understand-4','understand-5','understand-6','understand-7']);
DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
