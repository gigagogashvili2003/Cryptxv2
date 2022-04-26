export const colorDetect = (price) => {
  let percantageColor;

  if (price < 0) {
    percantageColor = "redColor";
  } else {
    percantageColor = "greenColor";
  }

  return percantageColor;
};
