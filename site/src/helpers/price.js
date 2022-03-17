export const convertStripeAmountToPrice = (amount) => {
  // 50200 --> 502.00

  const stringified = amount.toString();
  const length = stringified.length;
  const section1 = stringified.substring(0, length - 2);
  const section2 = stringified.substring(length, length - 2);

  return parseFloat(`${section1}.${section2}`);
};

export const convertPriceToStripeAmount = (price) => {
  // 502.00 --> 50200
  const sections = price.toString().split('.');
  return sections[1] ? parseInt(`${sections[0]}${sections[1]}`) : parseInt(sections[0]);
};

export const toTwoDecimalPlaces = (value) => {
  return parseFloat(value).toFixed(2);
};
