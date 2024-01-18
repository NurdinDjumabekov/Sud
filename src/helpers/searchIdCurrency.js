export const searchIdCurrency = (arr, id) => {
  const newArr = arr?.filter((i) => {
    if (+i.codeid === +id) {
      return i?.name;
    }
  });
  return newArr?.[0]?.name;
};
