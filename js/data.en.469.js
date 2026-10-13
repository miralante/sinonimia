(()=>{const u={
 proud:{definition:'Feeling or showing pleasure or satisfaction in one’s achievements, qualities, or associations; also, having self-respect or a high opinion of oneself.',synonyms:['pleased','satisfied','self-respecting','arrogant (sometimes)']},
 proverbial:{definition:'Relating to or characteristic of a proverb; also, so well known that it is commonly used as an example.',synonyms:['like a proverb','widely known','notorious'],example:{word:'proverbial',text:'She arrived at the proverbial eleventh hour.'},exampleSynonym:{word:'widely known',text:'She arrived at the widely known eleventh hour.'}}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
