import React from "react";
import { useDispatch } from "react-redux";

////// components
import MyModals from "../../../common/MyModals/MyModals";
import SendInput from "../../../common/SendInput/SendInput";

////// icons
import AddIcon from "../../../asstes/icons/MyIcons/AddIcon";

////// style
import "./style.scss";
import {
  crudJournals,
  getJournals,
} from "../../../store/reducers/archiveSlice";

const ActionsArchive = ({ data, setData, closeModal }) => {
  const dispatch = useDispatch();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const obj = { 1: "Создание", 2: "Редактирование" };
  const objSend = { 1: "Создать", 2: "Редактировать" };

  const sendJournal = async () => {
    if (!!!data?.name) alert("Название отчета не должно быть пустым");
    const res = await dispatch(crudJournals({ data })).unwrap();
    if (res?.result == 1) {
      dispatch(getJournals()); //// get список годов
      closeModal();
    }
  };

  return (
    <div className="actionsArchive">
      <MyModals
        openModal={data?.status == 1 || data?.status == 2}
        closeModal={closeModal}
        title={`${obj?.[data?.status]} отчета`}
      >
        <SendInput
          value={data?.name}
          onChange={onChange}
          title={"Название отчета"}
          name={"name"}
        />

        {/* <SendInput
          value={data?.date}
          onChange={onChange}
          title={"Год"}
          name={"date"}
          type={"date"}
        /> */}

        <SendInput
          value={data?.description}
          onChange={onChange}
          title={"Описание отчета"}
          name={"description"}
          typeInput={"textarea"}
        />

        <button className="actionsBtn" onClick={sendJournal}>
          <AddIcon width={22} height={22} color={"#fff"} />
          <p>{objSend?.[data?.status]}</p>
        </button>
      </MyModals>
    </div>
  );
};

export default ActionsArchive;
