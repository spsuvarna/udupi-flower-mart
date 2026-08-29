import { websiteSettings } from '../data/settings';
export const formatCurrency = (value:number) => new Intl.NumberFormat(websiteSettings.locale,{style:'currency',currency:websiteSettings.currency,maximumFractionDigits:0}).format(value);
