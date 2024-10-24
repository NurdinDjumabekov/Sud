import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

////// style
import "./style.scss";

////// icons
import EditIcon from "../../../asstes/icons/MyIcons/EditIcon";
import EyesIcon from "../../../asstes/icons/MyIcons/EyesIcon";
import DeleteIcon from "../../../asstes/icons/MyIcons/DeleteIcon";

///// fns
import {
  deleteIsks,
  toTakeIsksList,
} from "../../../store/reducers/sendDocsSlice";
import { changeCheckEditPlaint } from "../../../store/reducers/saveDataSlice";
import {
  editIsks,
  editMainIskData,
} from "../../../store/reducers/applicationsSlice";

///// components
import ConfirmModal from "../../../common/ConfirmModal/ConfirmModal";
import MyModals from "../../../common/MyModals/MyModals";
import SendInput from "../../../common/SendInput/SendInput";
import Select from "react-select";
import ReactDatePicker, { registerLocale } from "react-datepicker";

///// helpers
import { ru } from "date-fns/locale";
import { transformLists } from "../../../helpers/transformArrDocs";
import {
  reverseTransformActionTime,
  transformDate,
  transformDateTime,
} from "../../../helpers/transformDate";
import AddIcon from "../../../asstes/icons/MyIcons/AddIcon";

registerLocale("ru", ru);

const ActionsTable = ({ row, listTodos }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listFilter } = useSelector((state) => state.applicationsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);
  const { selReglament } = useSelector((state) => state.selectsSlice);
  const listReglament = transformLists(selReglament, "codeid", "name");

  const [del, setDel] = useState(0);
  const [edit, setEdit] = useState({});

  const deleteIskFN = async () => {
    /////  удаление иска
    await dispatch(deleteIsks(del)).unwrap();
    dispatch(toTakeIsksList(listFilter?.[0]?.codeid_filter));
  };

  const lookIsksFN = (id) => {
    dispatch(editIsks({ id, tokenA, navigate, applicationList }));
    dispatch(changeCheckEditPlaint(false)); /// запрет на редактирование
  };

  const onChange = (e) => setEdit({ ...edit, [e.target.name]: e.target.value });

  const onChangeSel = (item) => setEdit({ ...edit, reglament: item });

  const editIsksModal = (row) => {
    /// "21.10.2024 21:58:04"
    const date = transformDate(row?.isk_active_date)?.slice(0, -3);
    console.log(date);
    const isk_active_date = reverseTransformActionTime(formatDateString(date));
    const reglament = { value: row?.reglament, label: row?.reglament_name };
    setEdit({ ...row, reglament, isk_active_date });
  };

  const editIsksFN = async () => {
    const data = {
      isk_active_date: `${transformDateTime(edit?.isk_active_date)}:00`,
      reglament: edit?.reglament?.value,
      isk_number: edit?.isk_number,
      codeid: edit?.codeid,
    };
    const res = await dispatch(editMainIskData({ data })).unwrap();
    if (res?.result == 1) {
      dispatch(toTakeIsksList(listFilter?.[0]?.codeid_filter)); /// запрос для получения списка
      setEdit({});
    }
  };

  return (
    <>
      <td className="actionsTable" style={{ width: 200 }}>
        <button onClick={() => setDel(row?.codeid)}>
          <DeleteIcon width={25} height={25} color={"red"} />
        </button>
        <button onClick={() => editIsksModal(row)}>
          <EditIcon width={22} height={22} color={"#222"} />
        </button>
        <button onClick={() => lookIsksFN(row?.codeid)}>
          <EyesIcon width={22} height={22} color={"#222"} />
        </button>
      </td>

      <ConfirmModal
        openModal={!!del}
        no={() => setDel(0)}
        yes={() => deleteIskFN()}
        title={"Удалить исковое заявление ?"}
      />

      <MyModals
        openModal={!!edit?.codeid}
        closeModal={() => setEdit({})}
        title={`Редактирование искового заявления`}
      >
        <div className="actionsTableModal">
          <SendInput
            value={edit?.isk_number}
            onChange={onChange}
            title={"Номер иска"}
            name={"isk_number"}
          />

          <div className="inputSend">
            <p>Дата поступления</p>
            <ReactDatePicker
              selected={edit?.isk_active_date}
              onChange={(date) => setEdit({ ...edit, isk_active_date: date })}
              showTimeSelect
              timeFormat="HH:mm"
              locale="ru"
              timeCaption="Время"
              dateFormat="d MMMM, yyyy HH:mm"
            />
          </div>

          <div className="inputSend">
            <p>Регламент</p>
            <Select
              options={listReglament}
              className="select"
              onChange={(item) => onChangeSel(item)}
              value={edit?.reglament}
            />
          </div>

          <button className="actionsBtn" onClick={editIsksFN}>
            <AddIcon width={22} height={22} color={"#fff"} />
            <p>Редактировать</p>
          </button>
        </div>
      </MyModals>
    </>
  );
};

export default ActionsTable;

const formatDateString = (dateString) => {
  // Пример входной строки: "21.10.2024 21:58:04"
  const [datePart, timePart] = dateString.split(" ");
  if (!datePart || !timePart) return null;

  const [day, month, year] = datePart.split(".");
  if (!day || !month || !year) return null;

  // Собираем дату в формате YYYY-MM-DD
  return `${year}.${month}.${day} ${timePart}`;
};
