export const shortenToTwoWords = (str) => {
  const words = str.split(" ");
  // return words.slice(0, 2).join(" ");
  return words.slice(0, 1).join(" ");
};
