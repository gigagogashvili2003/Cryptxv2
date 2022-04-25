// very reusable Util function wich formats numbers to currencies
export const currencyFormatter = (number, formatType, fracDigit) => {
  const formatCurrency = new Intl.NumberFormat(formatType, {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: fracDigit,
  });

  return formatCurrency.format(number);
};
