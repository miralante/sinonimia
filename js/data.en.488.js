(()=>{const ids=new Set(['pyrriquio','pythio','quadral','quadrangle-2','quadratin','quadrennial-2','quadrennium-2','quadricenal']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 pyroxylin:{definition:'A nitrocellulose compound made by treating cellulose with nitric acid; used in collodion, lacquers, and plastics.',synonyms:['nitrocellulose','pyroxyline','soluble guncotton']},
 pyrrhonian:{definition:'Of or relating to Pyrrhonism or its radical form of philosophical skepticism; also, a follower of Pyrrhonism.',synonyms:['skeptical','Pyrrhonist']},
 pyrrhonism:{definition:'A school of ancient Greek skepticism that suspends judgment because it holds that certainty is unattainable.',synonyms:['Pyrrhonian skepticism','skepticism']},
 pythagorean:{definition:'Of or relating to Pythagoras, his philosophy, or the school founded by him; also, a follower of that school.',synonyms:['Pythagorean philosopher','relating to Pythagoras']},
 pythagoreanism:{definition:'The philosophical and religious doctrines associated with Pythagoras and his followers.',synonyms:['Pythagorean philosophy','Pythagorean doctrine']},
 qibla:{definition:'The direction of the Kaaba in Mecca, toward which Muslims turn to pray; also, the wall or niche in a mosque that indicates this direction.',synonyms:['direction of prayer','direction of Mecca','mihrab (the indicating niche)']},
 'qr-code':{synonyms:['Quick Response code','two-dimensional barcode','matrix barcode']},
 quack:{definition:'Noun: the harsh call of a duck; informally, an unqualified or fraudulent medical practitioner. Verb: to make a duck’s call.',synonyms:['duck call','charlatan','fraudulent doctor']},
 quadragesimal:{definition:'Relating to Lent or the forty-day Lenten fast.',synonyms:['Lenten','relating to Lent']},
 quadrangle:{definition:'A plane figure with four straight sides; also, a rectangular courtyard enclosed by buildings.',synonyms:['quadrilateral','four-sided figure','courtyard']},
 quadrantal:{definition:'Of or relating to a quadrant; measuring or occupying one quarter of a circle.',synonyms:['quadrant-related','quarter-circle']},
 quadratic:{definition:'Of or relating to a mathematical expression, equation, or function of degree two.',synonyms:['second-degree','of degree two']},
 quadrennial:{definition:'Occurring once every four years; also, an event or period that occurs every four years.',synonyms:['every-four-years','four-yearly']},
 quadrennium:{definition:'A period of four years.',synonyms:['four-year period','four-year cycle']},
 quadric:{definition:'A surface in three-dimensional space defined by a second-degree equation in Cartesian coordinates.',synonyms:['quadric surface','second-degree surface']},
 quadricular:{definition:'Of or relating to a grid or lattice.',synonyms:['grid-related','lattice-like']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
