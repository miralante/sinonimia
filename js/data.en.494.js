(()=>{const ids=new Set(['quinquaagena','quintant','quintar-for-the-second-time','quinten','quiridium','quirite','quite-2','quite-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 quina:{definition:'A bitter medicinal substance obtained from the bark of cinchona trees; also, the bark itself.',synonyms:['cinchona bark','quinine bark']},
 quince:{definition:'The hard, aromatic, usually yellow fruit of the quince tree; also, the tree itself.',synonyms:['quince fruit','quince tree','Cydonia oblonga']},
 quinceanera:{definition:'In Latin American culture, a girl’s fifteenth-birthday celebration; also, the young woman being celebrated.',synonyms:['fifteenth-birthday celebration','young woman celebrating her fifteenth birthday']},
 'quince-tree':{definition:'A small deciduous tree (Cydonia oblonga) that bears hard, aromatic yellow fruit.',synonyms:['quince','Cydonia oblonga']},
 quincuncial:{definition:'Arranged in a quincunx: four items at the corners of a square and one in the center.',synonyms:['quincunx-arranged','five-point arrangement']},
 quinquelingual:{definition:'Able to speak or use five languages.',synonyms:['five-language','speaking five languages']},
 quinquennial:{definition:'Occurring once every five years or lasting five years; also, an event held every five years.',synonyms:['five-yearly','every five years']},
 quinquennium:{definition:'A period of five years.',synonyms:['five-year period','five-year cycle']},
 quintain:{definition:'A post or other target used in medieval tilting practice; also, the exercise of tilting at such a target.',synonyms:['tilting target','jousting target']},
 quintessence:{definition:'The purest or most essential form of something; the most perfect example of a quality.',synonyms:['essence','embodiment','epitome','purest form']},
 quintile:{definition:'Any of five equal groups into which a ranked population or data set is divided; also, the cut-off value separating such a group.',synonyms:['one-fifth group','five-part statistical division']},
 quintuple:{definition:'To make or become five times as great; also, fivefold or consisting of five parts.',synonyms:['multiply by five','fivefold','five-part']},
 quintuplet:{definition:'One of five children born at the same birth; also, a group of five notes or things.',synonyms:['one of five siblings born together','group of five','five-note group']},
 quipu:{definition:'A record-keeping device used by Andean civilizations, consisting of cords of different colors with knots that encode information.',synonyms:['khipu','knotted-cord record','Andean record device']},
 quirinal:{definition:'Of or relating to the Quirinal Hill or Palace in Rome.',synonyms:['of the Quirinal','Quirinal Hill-related']},
 quirquincho:{definition:'A South American armadillo, especially the small hairy armadillo (Chaetophractus nationi).',synonyms:['Andean hairy armadillo','armadillo']},
 quit:{definition:'To leave a job, school, or activity; to stop doing something; or, in an older use, to free someone from an obligation or debt.',synonyms:['resign','give up','stop','release from a debt']},
 quite:{definition:'To the fullest extent or degree; also, fairly or rather, depending on context.',synonyms:['completely','entirely','rather','fairly']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
