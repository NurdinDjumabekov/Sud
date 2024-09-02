export const roundedNumberFN = (num) => {
  const newNum = +num?.toFixed(1); // Округление до одного знака после запятой
  return newNum;
};
