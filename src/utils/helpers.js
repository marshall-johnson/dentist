export const formatPrice = (price) =>
  `${(Math.round(price * 100) / 100).toFixed(2)}`;
export const roundNumber = (number, scale = 1) =>
  (Math.round(number * 100) / 100).toFixed(scale);

export const generateRandomNumber = () => {
  const randomNum = 1000 + Math.random() * 1000;
  return Math.round(randomNum / 100) * 100;
};

export const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
