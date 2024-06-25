import React from "react";
import { useSelector } from "react-redux";

///// componnets
import ActionPlaintiff from "../ActionPlaintiff/ActionPlaintiff";
import ActionRespSecr from "../ActionRespSecr/ActionRespSecr";
import ActionPred from "../ActionPred/ActionPred";

const TypeActionsUsers = ({ row }) => {
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  // const list = [
  //   //////// для ответ. секр и председателя 1 - 6
  //   { id: 0, name: "Иски", bool: true },
  //   { id: 1, name: "Принятые отв. секретарём", bool: false },
  //   { id: 2, name: "Отклонённые отв. секретарём", bool: false },
  //   { id: 3, name: "Принятые председателем", bool: false },
  //   { id: 4, name: "Отклонённые председателем", bool: false },
  //   { id: 9, name: "На доработке ", bool: false },

  //   //////// для истца 6 - 11
  //   { id: 0, name: "Все иски", bool: true },
  //   { id: 6, name: "Поданные", bool: false },
  //   { id: 7, name: "Принятые", bool: false },
  //   { id: 8, name: "Отказанные", bool: false },
  //   { id: 9, name: "На доработке", bool: false },

  //   ///////////////// для обычных секретарей 12 - 15
  //   { id: 0, name: "Все иски", bool: true },
  //   { id: 9, name: "На доработке", bool: false },
  //   { id: 10, name: "Назначенные председателем", bool: false },
  // ];

  // console.log(list, "list");

  // const tranform = (list) => {};

  const components = {
    4: <ActionPlaintiff row={row} />,
    2: <ActionRespSecr row={row} />,
    3: <ActionPred row={row} />,
  };

  return <>{components?.[typeUser]}</>;
};

export default TypeActionsUsers;

// typeUser
// 1  Секретарь
// 2  Ответственный секретарь
// 3  Председатель
// 4  Истец
