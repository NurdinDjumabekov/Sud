///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import "./style.scss";
import { choiceSecr } from "../../../../../store/reducers/sendDocsSlice";
import Modals from "../../../../Modals/Modals";
import { toTakeSecretarList } from "../../../../../store/reducers/selectsSlice";
import Selects from "../../../../Selects/Selects";

const ChoiceSecr = ({ item }) => {
  const dispatch = useDispatch();
  const { codeid, isk_status } = item;
  const [modal, setModal] = useState(false);

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  const { selSecretarDela, typeSecretarDela } = useSelector(
    (state) => state.selectsSlice
  );

  useEffect(() => {
    dispatch(toTakeSecretarList(tokenA));
  }, []);

  const send = () => {
    setModal(false);
    dispatch(choiceSecr({ typeSecretarDela, code_isk: codeid }));
  };

  if (isk_status === 2 || isk_status === 4 || isk_status === 6) {
    //// отклонён пред. и ответ. секр
    return <></>;
  }

  if (type_user == 3) {
    return (
      <span>
        <button className="choiceBtn" onClick={() => setModal(true)}>
          Выбрать секретаря
        </button>
        <Modals openModal={modal} setOpenModal={() => setModal()}>
          <div className="choiceInner">
            <Selects
              arr={selSecretarDela}
              initText={"Выберите секретаря дела"}
              keys={{ typeKey: typeSecretarDela, type: "typeSecretarDela" }}
              type="secr"
              urgently={false}
            />
            <button className="acceptSecr" onClick={send}>
              Подтвердить
            </button>
          </div>
        </Modals>
      </span>
    );
  }
};

export default ChoiceSecr;
