/// при удалении истца(представителей и ответчика) я отпраляю запрос
/// и если запрос fulfilled, то эта функция ищет и удаляет обьект у меня,
/// который отправили request для удаления

export const delSidesIskFN = (obj) => {
  const { codeid, todosApplications, role } = obj;

  const roleObj = {
    1: "plaintiff",
    2: "defendant",
    3: "plaintiffResper",
    4: "defendantResper",
  };

  const sides = roleObj?.[role];

  console.log(todosApplications?.[sides], "todosApplicationstodosApplications");

  const newList = todosApplications?.[sides]?.filter(
    (item) => item?.codeid !== codeid
  );

  const newTodosApplications = { ...todosApplications, [sides]: newList };

  return newTodosApplications;
};
