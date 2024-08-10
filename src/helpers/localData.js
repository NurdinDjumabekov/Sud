export const defaultSort = [
  //////// для ответ. секр и председателя
  { id: 0, name: "Все иски", bool: true },
  { id: 1, name: "Принятые отв. секретарём", bool: false },
  { id: 2, name: "Отклонённые отв. секретарём", bool: false },
  { id: 3, name: "Принятые председателем", bool: false },
  { id: 4, name: "Отклонённые председателем", bool: false },
  { id: 9, name: "На доработке ", bool: false },

  //////// для истца
  { id: 5, name: "Все иски", bool: true },
  { id: 6, name: "Поданные", bool: false },
  { id: 7, name: "Принятые", bool: false },
  { id: 8, name: "Отказанные", bool: false },
  { id: 9, name: "На доработке", bool: false },

  ///////////////// для обычных секретарей
  { id: 0, name: "Все иски", bool: true },
  { id: 9, name: "На доработке", bool: false },
  { id: 10, name: "Назначенные председателем", bool: false },
];
