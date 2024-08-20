import React from "react";
import { useSelector } from "react-redux";

///// componnets
import ActionPlaintiff from "../ActionPlaintiff/ActionPlaintiff";
import ActionRespSecr from "../ActionRespSecr/ActionRespSecr";
import ActionPred from "../ActionPred/ActionPred";

const TypeActionsUsers = ({ row }) => {
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  const components = {
    ////// логика для обычных секретарей была перенесена в компонент в TimeAndActions
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
