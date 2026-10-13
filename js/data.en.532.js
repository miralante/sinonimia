(()=>{const ids=new Set(['red-4','red-5','red-6','redden-2','redden-3','reddish-colored-tick','reded']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 red:{definition:'A color at the long-wavelength end of the visible spectrum; also, something of that color or a red cosmetic, and a political designation associated with left-wing or communist movements, depending on context.',synonyms:['scarlet','crimson','vermilion','rouge (cosmetic)']},
 'red-3':{definition:'Of a dark red color.',synonyms:['crimson','deep red','burgundy']},
 'red-bearded':{definition:'Having a red or reddish-colored beard.',synonyms:['ginger-bearded','red-haired']},
 redbreast:{definition:'A bird with a red or orange breast, especially the European robin.',synonyms:['robin','European robin']},
 'red-breasted':{definition:'Having a red or reddish-colored breast.',synonyms:['red-chested']},
 redbud:{definition:'Any tree or shrub of the genus Cercis, especially one with clusters of pink or purple flowers that bloom in spring.',synonyms:['Cercis','Judas tree']},
 redden:{definition:'To become red or make something red, especially through heat, color, or strong emotion.',synonyms:['turn red','become red','flush']},
 reddish:{definition:'Having a red tint or hue, without being fully red.',synonyms:['red-tinged','ruddy','somewhat red']},
 redecorating:{definition:'The act or process of decorating a room, building, or other space again.',synonyms:['refurbishing','redecorating a room','renewed decoration']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
