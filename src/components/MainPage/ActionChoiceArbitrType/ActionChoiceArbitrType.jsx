import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

////// style
import "./style.scss";

//// components
import MyModals from "../../../common/MyModals/MyModals";
import Select from "react-select";

////// icons
import AddIcon from "../../../asstes/icons/MyIcons/AddIcon";
import EditIcon from "../../../asstes/icons/MyIcons/EditIcon";

////// fns
import { editTypeChoice } from "../../../store/reducers/applicationsSlice";
import { toTakeIsksList } from "../../../store/reducers/sendDocsSlice";

const ActionChoiceArbitrType = ({ type, row }) => {
  //// выбираю кто имеено выбрал арбитров за истца и ответчика
  const dispatch = useDispatch();

  const { listFilter } = useSelector((state) => state.applicationsSlice);

  const [active, setActive] = useState(false);
  const [edit, setEdit] = useState({});

  const { listChoiceArbitr } = useSelector((state) => state.selectsSlice);

  const onChangeSel = (item) => setEdit({ ...item });

  const saveData = async () => {
    const send = {
      codeid: row?.codeid,
      action: type,
      codeid_type: edit?.value,
    };
    const res = await dispatch(editTypeChoice(send)).unwrap();
    if (res?.result == 1) {
      dispatch(toTakeIsksList(listFilter?.[0]?.codeid_filter));
      setEdit({});
      setActive(false);
    }
  };

  const obj = { 1: "Истца", 2: "Ответчика" };
  const objRole = {
    1: "type_arbitr_choice_plaintiff",
    2: "type_arbitr_choice_defendant",
    3: "sole_arbitrator",
  };

  const openModal = () => {
    setActive(true);
    setEdit({ value: row?.[objRole?.[type]] });
  };

  const textChoice = (id) => {
    const item = listChoiceArbitr?.find((i) => i?.codeid === id);
    return item?.name || ""; // Возвращает имя или пустую строку, если элемент не найден
  };

  return (
    <>
      <td className="table_isk_td actionArbitr" style={{ width: 160 }}>
        {!!!row?.[objRole?.[type]] ? (
          <span className="choiceBtn">
            <button onClick={openModal}>
              <p>Выбрать</p>
              <EditIcon width={20} height={20} color={"#222"} />
            </button>
          </span>
        ) : (
          <div className="actionArbitr__inner">
            <span>{textChoice(row?.[objRole?.[type]])}</span>
            <button onClick={() => setActive(true)}>
              <EditIcon width={22} height={22} color={"#222"} />
            </button>
          </div>
        )}
      </td>

      <MyModals
        openModal={active}
        closeModal={() => setActive(false)}
        title={`Арбитр со стороны ${obj?.[type]}`}
      >
        <div className="actionsTableModal">
          <div className="inputSend">
            <p>Выбрать</p>
            <Select
              options={listChoiceArbitr}
              className="select"
              onChange={(item) => onChangeSel(item)}
              value={edit}
            />
          </div>

          <button className="actionsBtn" onClick={saveData}>
            <AddIcon width={22} height={22} color={"#fff"} />
            <p>Сохранить</p>
          </button>
        </div>
      </MyModals>
    </>
  );
};

export default ActionChoiceArbitrType;
