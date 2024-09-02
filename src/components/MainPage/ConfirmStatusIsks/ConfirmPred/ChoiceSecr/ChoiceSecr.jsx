///// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// components
import { jwtDecode } from "jwt-decode";
import Modals from "../../../../Modals/Modals";
import Selects from "../../../../Selects/Selects";

/////// fns
import { choiceSecr } from "../../../../../store/reducers/sendDocsSlice";
import { toTakeSecretarList } from "../../../../../store/reducers/selectsSlice";

/////// imgs
import editIcon from "../../../../../asstes/icons/editUser.svg";

////// style
import "./style.scss";

const ChoiceSecr = ({ item }) => {
  const dispatch = useDispatch();
  const { codeid, isk_status, secretary } = item;
  const [modal, setModal] = useState(false);

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { type_user } = jwtDecode(tokenA);

  const { selSecretarDela, typeSecretarDela } = useSelector(
    (state) => state.selectsSlice
  );

  useEffect(() => {
    dispatch(toTakeSecretarList());
  }, []);

  const send = () => {
    dispatch(choiceSecr({ typeSecretarDela, code_isk: codeid }));
    setModal(false);
  };

  if (isk_status === 2 || isk_status === 4 || isk_status === 6) {
    //// отклонён пред. и ответ. секр или на доработке
    return <></>;
  }

  if (type_user == 3) {
    if (!!secretary) {
      return (
        <div className="statusIsks editSecr">
          <span>{secretary}</span>
          <button className="choiceBtn" onClick={() => setModal(true)}>
            <img src={editIcon} alt="()" />
            {/* <span>Заменить секретаря дела</span> */}
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
        </div>
      );
    }
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
