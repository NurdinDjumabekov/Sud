/////// hooks
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// helpers

////// style
import "./style.scss";

////// icons
import DeleteIcon from "../../asstes/icons/MyIcons/DeleteIcon";
import EditIcon from "../../asstes/icons/MyIcons/EditIcon";
import EyesIcon from "../../asstes/icons/MyIcons/EyesIcon";
import AddIcon from "../../asstes/icons/MyIcons/AddIcon";

///// fns
import { crudJournals, getJournals } from "../../store/reducers/archiveSlice";
import ActionsArchive from "../../components/ArchivePage/ActionsArchive/ActionsArchive";
import { useState } from "react";
import ConfirmModal from "../../common/ConfirmModal/ConfirmModal";

////// components

const ArchivePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    status: 0,
    name: "",
    description: "",
    codeid: 0,
  });
  // 1- создание, 2 - редактирование, 3 - удаление

  const closeModal = () => {
    setData({ status: 0, name: "", description: "", codeid: 0 });
  };

  const { listYesrs } = useSelector((state) => state.archiveSlice);

  useEffect(() => {
    dispatch(getJournals()); //// get список годов
  }, []);

  const openModalCRUD = (obj, status) => {
    // 1- создание, 2 - редактирование, 3 - удаление
    setData({ ...data, ...obj, status });
  };

  const delJournal = async () => {
    const res = await dispatch(crudJournals({ data })).unwrap();
    if (res?.result == 1) {
      dispatch(getJournals()); //// get список годов
      closeModal();
    }
  };

  const navInfo = ({ codeid }) =>
    navigate(`/history_isk`, { state: { codeid } });

  return (
    <>
      <div className="archivePage">
        <div className="mainTables">
          <div className="header">
            <h5>Список партиций</h5>
            <button className="actionsBtn" onClick={() => openModalCRUD({}, 1)}>
              <AddIcon width={22} height={22} color={"#fff"} />
              <p>Добавить</p>
            </button>
          </div>
          <div className="iskData listYesrs">
            {listYesrs?.map((item, index) => (
              <div
                className="every"
                onClick={() => navInfo(item)}
                key={item?.codeid}
              >
                <div className="title">
                  <span>{index + 1}.</span>
                  <div>
                    <p>{item?.name}</p>
                    <b>{item?.description}</b>
                  </div>
                </div>
                <div className="actions">
                  <button onClick={() => {}}>
                    <EyesIcon width={22} height={22} color={"#222"} />
                  </button>
                  <button onClick={() => openModalCRUD(item, 2)}>
                    <EditIcon width={22} height={22} color={"#222"} />
                  </button>
                  <button onClick={() => openModalCRUD(item, 3)}>
                    <DeleteIcon width={25} height={25} color={"red"} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ActionsArchive setData={setData} data={data} closeModal={closeModal} />
      <ConfirmModal
        openModal={data?.status == 3}
        no={closeModal}
        yes={delJournal}
        title={"Удалить ?"}
      />
    </>
  );
};

export default ArchivePage;
