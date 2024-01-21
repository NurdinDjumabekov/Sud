import React, { useState } from 'react';
import Modals from '../Modals/Modals';
import './ConfirmStatus.scss';
import imgWarning from '../../asstes/images/warning.png';
import { changeStatusOrg } from '../../store/reducers/sendDocsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ExampleBlock from '../ExampleBlock/ExampleBlock';

const ConfirmStatus = ({ setSendStatusIsk, sendStatusIsk, istype }) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleConfirm = (type) => {
    dispatch(
      changeStatusOrg({
        id: istype.id,
        tokenA,
        description: type === 1 || type === 3 ? '' : input,
        isk_status: +type,
      })
    );
    setSendStatusIsk(false);
  };

  React.useEffect(() => {
    return () => setSendStatusIsk({ type: 0, id: 0 });
  }, []);

  return (
    <div className="blockModal">
      <Modals openModal={sendStatusIsk} setOpenModal={() => setSendStatusIsk()}>
        {(istype.type === 1 || istype.type === 3) && (
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5>Вы уверены что хотите поменять статус иска?</h5>
            <p>После подтверждения обратно иск поменять не получится...</p>
            <div className="btnsSendIsks">
              <button onClick={() => handleConfirm(istype.type)}>
                Принять иск
              </button>
              <button onClick={() => setSendStatusIsk(false)}>Отмена</button>
            </div>
          </div>
        )}
        {(istype.type === 2 || istype.type === 4) && (
          <div className="plaintiFilling__container moreStyle">
            <div className="descriptionClaim">
              <ExampleBlock
                text={'Пример названия и описания иска должен быть таким-то'}
                typeText={'Пример названия и описания иска'}
              />
              <form>
                <div>
                  <label htmlFor="name">Напишите причину отказа</label>
                  <textarea
                    name="name"
                    id="name"
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  ></textarea>
                </div>
                <div className="modalchangeStatus">
                  <div className="btnsSendIsks">
                    <div className="btnsSendIsks">
                      <button
                        onClick={() => {
                          dispatch(
                            changeStatusOrg({
                              id: istype.id,
                              tokenA,
                              description: input,
                              isk_status: istype.type,
                            })
                          );
                          setSendStatusIsk(false);
                        }}
                      >
                        Отклонить иск
                      </button>
                      <button onClick={() => setSendStatusIsk(false)}>
                        Отмена
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Modals>
    </div>
  );
};

export default ConfirmStatus;
