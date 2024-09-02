export const searchNameSelect = (list, num) => {
  const matchingItem = list?.find((item) => +item.codeid === +num);

  if (matchingItem) {
    return matchingItem.name;
  } else {
    const defaultItem = list?.find((item) => +item.codeid === 0);
    return defaultItem?.name || "Не выбрано";
  }
};
