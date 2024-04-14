import React, { useState } from "react";
import "./ChoiceSecr.scss";
import Modals from "../../../Modals/Modals";
import Selects from "../../../Selects/Selects";
import { useDispatch, useSelector } from "react-redux";
import { choiceSecr } from "../../../../store/reducers/sendDocsSlice";

const ChoiceSecr = ({ codeid }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const { selSecretarDela, typeSecretarDela } = useSelector(
    (state) => state.selectsSlice
  );

  const send = () => {
    setModal(false);
    dispatch(choiceSecr({ tokenA, typeSecretarDela, code_isk: codeid }));
  };

  return (
    <>
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
    </>
  );
};

export default ChoiceSecr;
