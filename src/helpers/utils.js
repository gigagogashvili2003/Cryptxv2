// very reusable Util function wich formats numbers to currencies
export const currencyFormatter = (
  number,
  formatType,
  currency,
  style,
  minimumFractionDigits
) => {
  const formatCurrency = new Intl.NumberFormat(formatType, {
    currency,
    style,
    minimumFractionDigits,
  });

  return formatCurrency.format(number);
};

// Formatting time function

export const timeFormat = (time) => {
  const date = new Date(time);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

// Calculating time from before to now
export const calculateTime = (time) => {
  const currentDate = new Date();
  const date = new Date(time);

  const months =
    currentDate.getMonth() -
    date.getMonth() +
    12 * (currentDate.getFullYear() - date.getFullYear());

  return months;
};
