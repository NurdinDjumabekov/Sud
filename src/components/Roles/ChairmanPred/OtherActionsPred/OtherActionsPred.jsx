///////hooks
import React from "react";
import { useDispatch, useSelector } from "react-redux";

///fns
import { editIsks } from "../../../../store/reducers/applicationsSlice";
import { changeLookDocs } from "../../../../store/reducers/stateSlice";

const OtherActionsPred = (props) => {
  const { row, setSendStatusIsk, setIsType } = props;

  const dispatch = useDispatch();

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const lookIsks = (id, type) => {
    setSendStatusIsk(true);
    setIsType({ type, id });

    const obj = { id, tokenA, applicationList };

    dispatch(editIsks(obj));
    dispatch(changeLookDocs(false)); /// для сброса cостояния просмтотра доков только у председателя
  };

  return (
    <td className="table_isk_td">
      <button className="proceduresButton">...</button>
      <div className="otherActions">
        <button onClick={() => lookIsks(row?.codeid, 7)}>Отвод арбитра</button>
        <button onClick={() => lookIsks(row?.codeid, 8)}>
          Прекратить исковое дело
        </button>
        <button>Продлить сроки искового дела</button>
      </div>
    </td>
  );
};

export default OtherActionsPred;
