(()=>{const ids=new Set(['quaterna','quaterno','querandi','quetzaltecan','quiaca','quichuism','queism','quick-2','quick-3']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 quaternity:{definition:'The state or concept of being fourfold; in Jungian psychology, a four-part symbol of wholeness.',synonyms:['fourfoldness','four-part unity','Jungian fourfold symbol']},
 quatorvir:{definition:'A member of a board of four officials in ancient Rome; a variant spelling of quattuorvir.',synonyms:['quattuorvir','member of a four-person board']},
 quatorvirate:{definition:'A governing body or group of four people; also, the office or term of a quattuorvir.',synonyms:['four-person government','quattuorvirate']},
 quatrain:{definition:'A stanza or poem consisting of four lines.',synonyms:['four-line stanza','four-line poem']},
 quatrefoil:{definition:'Having four leaves or lobes; also, an ornamental design formed by four such parts.',synonyms:['four-leaved','four-lobed','four-petal ornament']},
 quechuism:{definition:'A word or expression borrowed from Quechua into another language.',synonyms:['Quechua loanword','Quechuan borrowing']},
 question:{definition:'Noun: an interrogative expression; a matter under discussion or dispute; or an act of asking. Verb: to ask, investigate, or express doubt about something.',synonyms:['query','inquiry','issue','ask','investigate']},
 'question-3':{definition:'An interrogative expression or sentence used to request information.',synonyms:['question','inquiry','interrogative']},
 questioner:{definition:'A person who asks questions, especially in an interview, inquiry, or examination.',synonyms:['interviewer','inquirer','questioning person']},
 'questioner-2':{definition:'A person who asks questions.',synonyms:['questioner','inquirer']},
 'questioner-3':{definition:'One who challenges or questions a person or claim.',synonyms:['challenger','interrogator','skeptic']},
 'question-mark':{definition:'The punctuation mark (?) placed at the end of a direct question.',synonyms:['?','interrogation mark']},
 quevedesque:{definition:'Resembling the style or works of the Spanish writer Francisco de Quevedo, especially in its wit, satire, or sharpness.',synonyms:['Quevedo-like','satirical','biting']},
 quick:{definition:'Adjective: moving, acting, or happening with speed; mentally agile; or responsive and sensitive. Adverb: quickly. Noun, chiefly in “the quick”: living flesh, especially under the nails.',synonyms:['rapid','swift','fast','prompt','living flesh']},
 'quick-4':{definition:'Done or occurring rapidly, forcefully, or hastily.',synonyms:['rapid','swift','hasty']},
 'quick-and-sharp-movement':{definition:'A movement made rapidly and abruptly.',synonyms:['swift movement','sudden movement','sharp motion']}
};for(const [id,p] of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
