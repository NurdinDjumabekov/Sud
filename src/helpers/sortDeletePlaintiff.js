/// при удалении истца(представителей и ответчика) я отпраляю запрос
/// и если запрос fulfilled, то эта функция ищет и удаляет обьект у меня

export const delSidesIskFN = (obj) => {
  const { codeid, dataIsk, role } = obj;

  const roleObj = {
    1: "plaintiff",
    2: "defendant",
    3: "plaintiffResper",
    4: "defendantResper",
  };

  const sides = roleObj?.[role];

  const newList = dataIsk?.[sides]?.filter((item) => item?.codeid !== codeid);

  const newdataIsk = { ...dataIsk, [sides]: newList };

  return newdataIsk;
};
