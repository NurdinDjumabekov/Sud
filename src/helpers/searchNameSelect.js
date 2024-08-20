export const searchNameSelect = (arr, num) => {
  const matchingItem = arr?.find((item) => +item.codeid === +num);

  if (matchingItem) {
    return matchingItem.name;
  } else {
    const defaultItem = arr?.find((item) => +item.codeid === 0);
    return defaultItem?.name || "Не выбрано";
  }
};
