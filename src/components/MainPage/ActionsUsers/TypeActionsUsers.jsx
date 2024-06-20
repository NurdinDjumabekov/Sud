import React from "react";
import { useSelector } from "react-redux";
import ActionPlaintiff from "./ActionPlaintiff/ActionPlaintiff";

const TypeActionsUsers = ({ row }) => {
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  console.log(typeUser, "typeUser");

  if (typeUser == 4) {
    return <ActionPlaintiff row={row} />;
  }
};

export default TypeActionsUsers;
