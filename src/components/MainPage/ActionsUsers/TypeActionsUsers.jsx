import React from "react";
import { useSelector } from "react-redux";
import ActionPlaintiff from "./ActionPlaintiff/ActionPlaintiff";
import ActionRespSecr from "./ActionRespSecr/ActionRespSecr";

const TypeActionsUsers = ({ row }) => {
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  console.log(typeUser, "typeUser");

  if (typeUser == 4) {
    return <ActionPlaintiff row={row} />;
  } else if (typeUser == 2) {
    return <ActionRespSecr row={row} />;
  }
};

export default TypeActionsUsers;

// typeUser
// 1  Секретарь
// 2  Ответственный секретарь
// 3  Председатель
// 4  Истец
