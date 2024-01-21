import React, { useState } from 'react';
import './MainPagePred.scss';
import imgPdf from '../../../asstes/icons/pdf.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeListPlaint,
  changeLookDataAllPlaintiff,
} from '../../../store/reducers/stateSlice';
import { changeAlertText } from '../../../store/reducers/typesSlice';
import ConfirmStatus from '../../ConfirmStatus/ConfirmStatus';

export const MainPagePred = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listTodos } = useSelector((state) => state.sendDocsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);
  const [sendStatusIsk, setSendStatusIsk] = useState(false);
  const [istype, setIsType] = useState({ type: 0, id: 0 }); // 1- подтвердить, 2 - отклонить

  const lookDataPlaintiff = (arr, type) => {
    if (arr?.length === 0) {
      dispatch(
        changeAlertText({
          text: `Данные ${type === 1 ? 'истца' : 'ответчика'} отсутствуют`,
          backColor: '#f9fafd',
          state: true,
        })
      );
    } else {
      dispatch(changeLookDataAllPlaintiff(true));
      dispatch(changeListPlaint(arr));
    }
  };

  const changeStatusIsks = (id, status) => {
    setSendStatusIsk(true);
    setIsType({ type: status, id: id });
  };

  const [btnList, setBtnList] = React.useState([
    {
      id: 1,
      name: 'Все иски',
      bool: true,
    },
    {
      id: 2,
      name: 'Принятые отвественным секретарём',
      bool: false,
    },
    {
      id: 3,
      name: 'Отклонённые отвественным секретарём',
      bool: false,
    },
    {
      id: 4,
      name: 'Принятые председателем',
      bool: false,
    },
    {
      id: 5,
      name: 'Отклонённые председателем',
      bool: false,
    },
  ]);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? true : false,
      };
    });
    setBtnList(newList);
  };

  console.log(listTodos, 'listTodos');
  // console.log(todosApplications, "todosApplications");

  const statusMessages = {
    // 1: 'Отправлено председателю',
    2: 'Иск отклонён ответственным секретарём',
    3: 'Иск принят председателем',
    4: 'Иск отклонён председателем',
  };

  return (
    <>
      <div className="mainTables">
        <ul className="choice__plaintiff">
          {btnList?.map((btn) => (
            <li key={btn.id}>
              <button
                className={btn?.bool ? 'activeBtnsPlaintiff' : ''}
                onClick={() => clickBtn(btn.id)}
              >
                {btn.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                <th className="table_isk_th">Иск</th>
                <th className="table_isk_th">Истец</th>
                <th className="table_isk_th">Ответчик</th>
                <th className="table_isk_th">Арбитражный сбор</th>
                <th className="table_isk_th">Регламент</th>
                <th className="table_isk_th">Арбитры</th>
                <th className="table_isk_th">Секретарь</th>
                <th className="table_isk_th">Статус</th>
                <th className="table_isk_th">Действие</th>
                <th className="table_isk_th">Документы</th>
              </tr>
            </thead>
            <tbody className="tbody_isk">
              {listTodos?.map((row, index) => (
                <tr
                  key={index}
                  style={
                    +index % 2 === 0
                      ? { background: '#fff' }
                      : { background: '#f9fafd' }
                  }
                >
                  <td className="table_isk_td">
                    <div>
                      <span className="span_teble">№ {row?.codeid}</span>
                    </div>
                  </td>
                  <td className="table_isk_td">
                    <span>
                      {row?.plaintiff?.length === 0 ? (
                        'ФИО истца отсутствует'
                      ) : row?.plaintiff?.length === 1 ? (
                        row?.plaintiff?.[0]?.name
                      ) : (
                        <>
                          {row?.plaintiff?.[0]?.name} и еще{' '}
                          {+row?.plaintiff?.length - 1}{' '}
                          {+row?.plaintiff?.length - 1 === 1
                            ? 'истец'
                            : 'истца'}
                        </>
                      )}
                    </span>
                    <button
                      className="btnPlaintiff"
                      onClick={() => lookDataPlaintiff(row?.plaintiff, 1)}
                    >
                      Посмотреть список истцов
                    </button>
                  </td>
                  <td className="table_isk_td">
                    <span>
                      {row?.defendant?.length === 0 ? (
                        'ФИО ответчика отсутствует'
                      ) : row?.defendant?.length === 1 ? (
                        row.defendant?.[0]?.name
                      ) : (
                        <>
                          {row?.defendant?.[0]?.name} и еще{' '}
                          {+row?.defendant?.length - 1}{' '}
                          {+row?.defendant?.length - 1 === 1
                            ? 'ответчик'
                            : 'ответчика'}
                        </>
                      )}
                    </span>
                    <button
                      className="btnPlaintiff"
                      onClick={() => lookDataPlaintiff(row?.defendant, 2)}
                    >
                      Посмотреть список ответчиков
                    </button>
                  </td>
                  {/* ///////////////////////////////////// */}
                  <td className="table_isk_td">
                    <span>
                      {+row?.arbitr_fee === 0 ? 'отсутствует' : row?.arbitr_fee}
                    </span>
                  </td>
                  <td className="table_isk_td">
                    <span>
                      {+row?.reglament === 0 ? 'отсутствует' : row?.reglament}
                    </span>
                  </td>
                  <td className="table_isk_td">
                    {row?.arbitrs?.length === 0 ? (
                      <span>Арбитр не назначен</span>
                    ) : (
                      row?.arbitrs?.map((i) => <span>{i?.name}</span>)
                    )}
                  </td>
                  <td className="table_isk_td">
                    {/* <span>{row.secretary}</span> */}
                    <span>Nurdin</span>
                  </td>
                  <td className="table_isk_td">
                    <span>{+row?.status === 1 ? 'Активен' : 'Не активен'}</span>
                  </td>
                  <td className="table_isk_td">
                    {+row?.isk_status === 0 || +row?.isk_status === 1 ? (
                      <div className="statusIsks">
                        <button
                          onClick={() => changeStatusIsks(row?.codeid, 3)}
                        >
                          Принять иск
                        </button>
                        <button
                          onClick={() => changeStatusIsks(row?.codeid, 4)}
                        >
                          Отклонить иск
                        </button>
                      </div>
                    ) : (
                      <>
                        {statusMessages[row?.isk_status] && (
                          <span style={{ padding: '0px 0px 0px 10px' }}>
                            {statusMessages[row?.isk_status]}
                          </span>
                        )}
                        {!statusMessages[row?.isk_status] && (
                          <span style={{ padding: '0px 0px 0px 10px' }}>
                            Ожидание ...
                          </span>
                        )}
                      </>
                    )}
                  </td>
                  <td className="table_isk_td">
                    <span className="documentBlock">
                      {row?.files?.length === 0 ? (
                        <span>Документы оттутствуют</span>
                      ) : (
                        <div className="docsBlock">
                          {row?.files?.map((i, ind) => (
                            <a
                              key={i?.codeid}
                              className="docsBlock__inner"
                              href={i?.path}
                              target="_blank"
                            >
                              <img src={imgPdf} alt="pdf" />
                              <span>{i?.document_name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmStatus
        setSendStatusIsk={setSendStatusIsk}
        sendStatusIsk={sendStatusIsk}
        istype={istype}
      />
    </>
  );
};
