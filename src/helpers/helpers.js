// Reusable Color Detect Functon if price is less than 0 it will return redColor else greenColor
export const colorDetect = (price) => {
  let percantageColor;

  if (price < 0) {
    percantageColor = "redColor";
  } else {
    percantageColor = "greenColor";
  }

  return percantageColor;
};
