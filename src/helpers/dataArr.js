////// imgsBlack
import myIski from "../asstes/icons/IconPage/me_iski.svg";
import notif from "../asstes/icons/IconPage/notification.svg";
import create from "../asstes/icons/IconPage/create.svg";
import archive from "../asstes/icons/IconPage/archive.svg";

////imgsWhite
import myIskiWhite from "../asstes/icons/IconPageWhite/me_iski.svg";
import notifWhite from "../asstes/icons/IconPageWhite/notification.svg";
import createWhite from "../asstes/icons/IconPageWhite/create.svg";
import archiveWhite from "../asstes/icons/IconPageWhite/archive.svg";

export const selectArr = [
  { codeid: 1, name: "Мужской" },
  { codeid: 2, name: "Женский" },
];

export const typeOrganization = [
  { codeid: 0, name: "ОсОО" },
  { codeid: 1, name: "ОсДо" },
];

export const typeCountSum = [
  { codeid: 1, name: "спор материального характера" },
  { codeid: 2, name: "спор неимущественного характера" },
];

/// для отображения в таблице
export const plaintiffHeaders = [
  "Полное наименование номера дела",
  "Дата",
  "Истец",
  "Ответчик",
  "Арбитражный сбор",
  "Регламент",
  "Арбитры",
  "Секретарь",
  "Статус",
  "Действия",
  "На рассмотрении",
  "Документы",
];

export const simpleSecrHeaders = [
  "...",
  "№",
  "Полное наименование номера дела",
  "Дата поступления",
  "Истец",
  "Ответчик",
  "Арбитражный сбор",
  "Регламент",
  "Арбитр со стороны истца",
  "Арбитр со стороны ответчика",
  "Секретарь",
  "Статус",
  "Действие",
  "Документы",
];

///// для ответ. секретаря
export const respSecrHeaders = [
  "...",
  "№",
  "Полное наименование номера дела",
  "Дата поступления",
  "Истец",
  "Ответчик",
  "Арбитражный сбор",
  "Регламент",
  "Арбитр со стороны истца",
  "Арбитр со стороны ответчика",
  "Секретарь",
  "Статус",
  "До рассмотрения осталось",
  "Документы",
];

///// для  председателя
export const predHeaders = [
  "...",
  "№",
  "Полное наименование номера дела",
  "Дата поступления",
  "Истец",
  "Ответчик",
  "Арбитражный сбор",
  "Регламент",
  "Арбитр со стороны истца",
  "Арбитр со стороны ответчика",
  "Секретарь",
  "Статус",
  "До рассмотрения осталось",
  "Документы",
  "Действия",
];

export const listFace = [
  { id: 1, name: "Физическое лицо" },
  { id: 2, name: "Юридическое лицо" },
  { id: 3, name: "Индивидуальный предприниматель" },
];

export const listPages = [
  {
    id: 1,
    name: "Все иски",
    path: "/main",
    bool: true,
    icon: myIski,
    iconWhite: myIskiWhite,
    size: { width: 23, height: 23, marginRight: 5 },
  },
  {
    id: 2,
    name: "Создать черновик",
    path: "/create_isk/0",
    bool: false,
    icon: create,
    iconWhite: createWhite,
    size: { width: 23, height: 23, marginRight: 5 },
  },
  {
    id: 3,
    name: "Архив",
    path: "/history",
    bool: false,
    icon: archive,
    iconWhite: archiveWhite,
    size: { width: 16, height: 16, marginRight: 5, marginLeft: 3 },
  },
  {
    id: 4,
    name: "Уведомления",
    path: "/notif_user",
    bool: false,
    icon: notif,
    iconWhite: notifWhite,
    size: { width: 22, height: 22 },
    count: true,
  },
];
