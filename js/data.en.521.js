(()=>{const ids=new Set(['payment-receipt','receipt-return','receive-2','receive-4','receiver-2','receiver-3','receiver-4','receivership-2','re-celled']);DICCIONARIOS.en=DICCIONARIOS.en.filter(r=>!ids.has(r.id));})();
(()=>{const u={
 receipt:{definition:'A written or electronic record showing that money, goods, or information have been received; also, the act of receiving them.',synonyms:['proof of payment','acknowledgment of receipt','delivery record']},
 'receipt-of-payment':{definition:'A document or electronic record confirming that a payment has been made or received.',synonyms:['payment receipt','proof of payment']},
 receive:{definition:'To get, accept, or be given something that is sent, offered, or delivered; also, to welcome or admit someone.',synonyms:['get','be given','obtain','accept','welcome']},
 'receive-payment':{definition:'To get money paid for goods, services, work, or repayment of a debt.',synonyms:['get paid','collect payment']},
 receiver:{definition:'A person or device that receives something; in law or finance, an official appointed to take custody or control of property or a business.',synonyms:['recipient','receiving device','court-appointed administrator']},
 'receivership':{definition:'A legal or financial arrangement in which a receiver is appointed to take custody or control of specified property, assets, or a business, often for the benefit of creditors.',synonyms:['receiver administration','court-appointed control','insolvency administration']}
};for(const[id,p]of Object.entries(u)){const r=DICCIONARIOS.en.find(x=>x.id===id);if(!r)throw Error('Missing en/'+id);Object.assign(r,p);delete r.translation;}})();
