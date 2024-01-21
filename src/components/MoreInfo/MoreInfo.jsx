import React from 'react';
import {
  changeIdStatus,
  changeListPlaint,
  changeLookChangeStatus,
  changeLookChangeStatusRS,
  changeLookDataAllPlaintiff,
} from '../../store/reducers/stateSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modals from '../Modals/Modals';
import './MoreInfo.scss';
import imgWarning from '../../asstes/images/warning.png';
// import { jwtDecode } from 'jwt-decode';
import {
  changeStatusIsks,
  changeStatusOrg,
} from '../../store/reducers/sendDocsSlice';

const MoreInfo = () => {
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { lookDataAllPlaintiff, listPlaint, lookChangeStatus, idStatus } =
    useSelector((state) => state.stateSlice);
  // const decodedToken = jwtDecode(tokenA);

  React.useEffect(() => {
    return () => {
      dispatch(changeListPlaint([]));
      dispatch(changeIdStatus(0));
    };
  }, []);

  return (
    <div className="blockModal">
      {/* ////// для отоюражения ФИО истцов */}
      <Modals
        openModal={lookDataAllPlaintiff}
        setOpenModal={() => dispatch(changeLookDataAllPlaintiff())}
      >
        <div className="main_tabla_isk">
          <table className="table_isk">
            <thead>
              <tr>
                <th className="table_isk_th">ФИО</th>
              </tr>
            </thead>
            <tbody className="tbody_isk">
              {listPlaint?.map((item) => (
                <tr key={item?.codeid}>
                  <td className="table_isk_td">
                    <span>{item?.name}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modals>

      {/* ////// для подтверждения отправки иска (изменения статуса) */}
      <Modals
        openModal={lookChangeStatus}
        setOpenModal={() => dispatch(changeLookChangeStatus())}
      >
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Вы уверены что хотите принят этот иск?</h5>
          <p>Если вы отправите этот иск, то он перейдёт к председателю</p>
          <div className="btnsSendIsks">
            <button
              onClick={() => {
                dispatch(changeStatusIsks({ idStatus, tokenA }));
                dispatch(changeLookChangeStatus(false));
              }}
            >
              Отправить
            </button>
            <button onClick={() => dispatch(changeLookChangeStatus(false))}>
              Отменить
            </button>
          </div>
        </div>
      </Modals>

      {/* ////// для подтверждения изменения статуса иска у ответ. секретаря*/}
      {/* <Modals
        openModal={lookChangeStatusRS}
        setOpenModal={() => dispatch(changeLookChangeStatusRS())}
      >
        <div className="modalchangeStatus">
          <div className="imgBlock">
            <img src={imgWarning} alt="send!" />
          </div>
          <h5>Вы уверены что хотите изменить статус иска?</h5>
          <p>
            Если вы поменяете статус этого иска, то у вас не будет возможности в
            дальнейшем его поменять!
          </p>
          <div className="btnsSendIsks">
            <button
              onClick={() => {
                dispatch(changeStatusOrg({ idStatus, tokenA }));
                dispatch(changeLookChangeStatusRS(false));
              }}
            >
              Отправить
            </button>
            <button onClick={() => dispatch(changeLookChangeStatusRS(false))}>
              Отменить
            </button>
          </div>
        </div>
      </Modals> */}
    </div>
  );
};

export default MoreInfo;
