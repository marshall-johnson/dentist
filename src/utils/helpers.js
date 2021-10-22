export const formatPrice = price => `${(Math.round(price * 100) / 100).toFixed(2)}`;
export const roundNumber = (number, scale = 1) => (Math.round(number * 100) / 100).toFixed(scale);
