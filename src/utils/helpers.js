export const formatPrice = (price) =>
  `${(Math.round(price * 100) / 100).toFixed(2)}`;
export const roundNumber = (number, scale = 1) =>
  (Math.round(number * 100) / 100).toFixed(scale);

export const decFormatter = (value) => {
  const part = value.toString().split('.');
  const val1 = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const val2 = part[1];
  const renderVal2 = () => {
    if (val2 > 0) {
      return `.${val2}`;
    }
    return '';
  };
  return `$ ${val1}${renderVal2()}`;
};

export const decFormatterTotal = (value) => {
  const rounded = Math.round(value * 100) / 100;
  const part = rounded.toString().split('.');
  const val1 = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const val2 = part[1];
  const renderVal2 = () => {
    if (val2 > 0) {
      return `.${val2}`;
    }
    return '';
  };
  return `$ ${val1}${renderVal2()}`;
};

export const decFormatterNumberInput = (value) => {
  const rounded = Math.round(value * 100) / 100;
  const part = rounded.toString().split('.');
  const val1 = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const val2 = part[1];
  const renderVal2 = () => {
    if (val2 > 0) {
      return `.${val2}`;
    }
    return '.00';
  };
  return `${val1}${renderVal2()}`;
};

export const decFormatterNumber = (value, show = true) => {
  if (show === false) {
    return '';
  }
  if (!value) {
    return '0.00';
  }
  const part = value.toString().split('.');
  const val1 = part[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const val2 = part[1];
  const renderVal2 = () => {
    if (val2 > 0) {
      return `.${val2}`;
    }
    return '.00';
  };
  return `${val1}${renderVal2()}`;
};

export const generateRandomNumber = () => {
  const randomNum = 1000 + Math.random() * 1000;
  return Math.round(randomNum / 100) * 100;
};

export const formatCurrency = (amount) => {
  if (!amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    }).format(0);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';

  return string.charAt(0).toUpperCase() + string.slice(1);
};
