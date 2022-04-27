// Reusable Functon wich detects if color would be green or red
export const colorDetect = (price) => {
  let percantageColor;

  if (price < 0) {
    percantageColor = "redColor";
  } else {
    percantageColor = "greenColor";
  }

  return percantageColor;
};
