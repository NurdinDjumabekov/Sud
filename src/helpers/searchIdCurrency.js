export const searchIdCurrency = (arr, id) => {
  const newArr = arr?.filter((i) => {
    if (+i.codeid === +id) {
      return i?.name;
    }
  });
  console.log(newArr?.[0]?.name, "newArr");
  return newArr?.[0]?.name;
};
