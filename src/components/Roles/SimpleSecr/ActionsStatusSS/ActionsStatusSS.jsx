import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editIsks } from "../../../../store/reducers/applicationsSlice";
import { changeCheckEditPlaint } from "../../../../store/reducers/saveDataSlice";

const ActionsStatusSS = ({ row, setSendStatusIsk, setIsType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const lookIsksFn = (obj) => {
    if (+obj.status === 1) {
      const send = { id: obj?.codeid, tokenA, navigate, applicationList };
      dispatch(editIsks(send));
      dispatch(changeCheckEditPlaint(false)); /// запрет на редактирование
    }
  };

  const checkDocs = (innerArr) => {
    // Для проверки документов: если в документе нет возражения, то отображать кнопку возражения, иначе не отображать
    return innerArr.some((i) => i.code_file_type === 17);
  };

  const openDataIsks = (id, status) => {
    setSendStatusIsk(true);
    setIsType({ type: status, id });
    dispatch(editIsks({ id, tokenA, applicationList }));
  };

  const notNull = row?.status !== 0;

  const darabotka = row?.isk_status === 6; //// if докумен на доработке

  if (!darabotka) {
    return (
      <>
        {row?.secretary && (
          <div className="statusIsks moreBtnStatus">
            <button onClick={() => openDataIsks(row?.codeid, 7)}>
              Сформировать документ о принятии иска
            </button>
          </div>
        )}
        {notNull && (
          <>
            {+row?.isk_status === 5 ? (
              <div className="statusIsks moreBtnStatus">
                <button onClick={() => lookIsksFn(row)}>Просмотреть</button>
              </div>
            ) : (
              <>
                {row?.isk_status !== 0 && (
                  <div className="statusIsks moreBtnStatus">
                    {!checkDocs(row.files) && (
                      <button onClick={() => openDataIsks(row?.codeid, 5)}>
                        Возражение
                      </button>
                    )}
                    <button onClick={() => openDataIsks(row?.codeid, 6)}>
                      Уведомить ответчика
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    );
  }
};

export default ActionsStatusSS;
