/// при удалении истца(представителей и ответчика) я отпраляю запрос
/// и если запрос fulfilled, то эта функция ищет и удаляет обьект у меня,
/// который отправили request для удаления

export const sortDeletePlaintiff = (obj) => {
  const { codeid, todosApplications, role } = obj;

  const roleMappings = {
    1: "plaintiff",
    2: "defendant",
    3: "plaintiffResper",
    4: "defendantResper",
  };

  const field = roleMappings[role];

  if (field && todosApplications && todosApplications[field]) {
    const newData = todosApplications[field].filter(
      (i) => +i.codeid !== +codeid
    );

    return {
      ...todosApplications,
      [field]: [...newData],
    };
  }

  return todosApplications;
};

// export const sortDeletePlaintiff = (obj) => {
//   const { codeid, todosApplications, role } = obj;

//   if (role === 1) {
//     const newData = todosApplications?.plaintiff?.filter(
//       (i) => +i.codeid !== +codeid
//     );
//     return {
//       ...todosApplications,
//       plaintiff: [...newData],
//     };
//   } else if (role === 2) {
//     const newData = todosApplications?.defendant?.filter(
//       (i) => +i.codeid !== +codeid
//     );
//     return {
//       ...todosApplications,
//       defendant: [...newData],
//     };
//   } else if (role === 3) {
//     const newData = todosApplications?.plaintiffResper?.filter(
//       (i) => +i.codeid !== +codeid
//     );
//     return {
//       ...todosApplications,
//       plaintiffResper: [...newData],
//     };
//   } else if (role === 4) {
//     const newData = todosApplications?.defendantResper?.filter(
//       (i) => +i.codeid !== +codeid
//     );
//     return {
//       ...todosApplications,
//       defendantResper: [...newData],
//     };
//   }
// };
