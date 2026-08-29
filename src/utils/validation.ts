export const isValidIndianMobile = (value:string) => /^[6-9]\d{9}$/.test(value.replace(/\D/g,''));
export const isValidPinCode = (value:string) => /^5\d{5}$/.test(value.trim());
export const isValidFutureDate = (value:string) => { if(!value) return false; const chosen=new Date(`${value}T00:00:00`); const today=new Date(); today.setHours(0,0,0,0); return chosen>=today; };
