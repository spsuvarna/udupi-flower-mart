export const isValidIndianMobile = (value:string) => /^[6-9]\d{9}$/.test(value.replace(/\D/g,''));
export const isValidPinCode = (value:string) => /^5\d{5}$/.test(value.trim());
export const getMinimumOrderDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const isValidFutureDate = (value:string) => {
  if (!value) return false;
  const chosen = new Date(`${value}T00:00:00`);
  const minimum = new Date(`${getMinimumOrderDate()}T00:00:00`);
  return chosen >= minimum;
};

export const daysUntilDate = (value:string) => {
  if (!value) return 0;
  const target = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
};
