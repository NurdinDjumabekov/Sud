import "./ConfirmStatusPred.scss";

/// hooks
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

///// states
import {
  changeActionFullfilled,
  changeActionOtvod,
  changeActionRedone,
  changeActionReject,
  changeActionStop,
  changeArbitrPred,
  clearMainBtnList,
} from "../../../../store/reducers/stateSlice";
import { changeAlertText } from "../../../../store/reducers/typesSlice";
import {
  changeTypeSecretarDela,
  toTakeSecretarList,
} from "../../../../store/reducers/selectsSlice";
import { toTakeTypeTypeDocs } from "../../../../store/reducers/applicationsSlice";
import {
  changeStatusOrg,
  sendDocsEveryIsks,
} from "../../../../store/reducers/sendDocsSlice";

//// components
import ApplicationFiles from "../../../PlaintiffPage/ApplicationFiles/ApplicationFiles";
import ChoiceArbitrsPred from "../ChoiceArbitrsPred/ChoiceArbitrsPred";
import PdfFileReject from "../../../PdfFile/PdfFileReject/PdfFileReject";
import PdfFulfilled from "../../../PdfFile/PdfFulfilled/PdfFulfilled";
import Modals from "../../../Modals/Modals";
import PdfFile from "../../../PdfFile/PdfFile";

///// imgs
import imgWarning from "../../../../asstes/images/warning.png";
import Selects from "../../../Selects/Selects";
import PdfFileRedone from "../../../PdfFile/PdfFileRedone/PdfFileRedone";
import PdfFileOtvodArbitr from "../../../PdfFile/PdfFileOtvodArbitr/PdfFileOtvodArbitr";
import PdfFileStopIsks from "../../../PdfFile/PdfFileStopIsks/PdfFileStopIsks";

const ConfirmStatusPred = (props) => {
  const { setSendStatusIsk, sendStatusIsk, setIsType, istype } = props;
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const editorRefReject = useRef(null);
  const navigate = useNavigate();

  const {
    confirmActionFullfilled,
    confirmActionReject,
    confirmActionRedone,
    confirmActionOtvod,
    confirmActionStop,
  } = useSelector((state) => state.stateSlice);

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { typeSecretarDela, selSecretarDela } = useSelector(
    (state) => state.selectsSlice
  );

  const rejectIsk = (e) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      // console.log(content, "content");
      dispatch(
        changeStatusOrg({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: istype?.type === 2 ? 13 : istype?.type === 4 ? 14 : 0,
          navigate,
        })
      );
      setSendStatusIsk(false);
      dispatch(clearMainBtnList());
    }

    dispatch(changeActionFullfilled(false));
    dispatch(changeActionReject(false));
  };

  const fulfilledIsk = (e) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        changeStatusOrg({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: 12, //// ???????
          navigate,
          idSecr: typeSecretarDela,
        })
      );
      dispatch(clearMainBtnList());
    }
    closeAllModal();
    dispatch(changeTypeSecretarDela(0)); /// обнуляю секретаря дела
  };

  const redoneIsk = (e) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();
      dispatch(
        changeStatusOrg({
          id: istype.id,
          tokenA,
          isk_status: istype.type,
          content,
          type: 18, //// отправить на доработку
          navigate,
        })
      );

      dispatch(clearMainBtnList());
      closeAllModal();
      dispatch(changeTypeSecretarDela(0)); /// обнуляю секретаря дела
      dispatch(changeActionRedone(false));
    }
  };

  const otvodArbitr = (e) => {
    e.preventDefault();
    if (editorRef.current && editorRef.current.editor) {
      const content = editorRef.current.editor.getContent();

      const obj = { content, type: 22, id: istype?.id, tokenA };
      dispatch(sendDocsEveryIsks(obj));
      /// для создания документа отвода
      closeAllModal();
      dispatch(changeActionOtvod(false));

      setTimeout(() => {
        dispatch(clearMainBtnList());
        dispatch(changeArbitrPred(0)); /// обнуляю выборку арбитра
      }, 500);
    }
  };

  const stopIsks = (e) => {
    e.preventDefault();
    // if (editorRef.current && editorRef.current.editor) {
    //   const content = editorRef.current.editor.getContent();
    //   dispatch(
    //     changeStatusOrg({
    //       id: istype.id,
    //       tokenA,
    //       isk_status: istype.type,
    //       content,
    //       type: 18, //// отправить на доработку
    //       navigate,
    //     })
    //   );

    dispatch(clearMainBtnList());
    closeAllModal();
    dispatch(changeActionStop(false));
    // }
  };

  const closeAllModal = () => {
    dispatch(changeActionFullfilled(false));
    dispatch(changeActionReject(false));
    setSendStatusIsk(false);
  };

  const goodIsks = () => {
    if (+typeSecretarDela === 0) {
      dispatch(changeActionFullfilled(false));
      dispatch(
        changeAlertText({
          text: "Выберите секретаря!",
          backColor: "#f9fafd",
          state: true,
        })
      );
    } else {
      dispatch(changeActionFullfilled(true));
    }
  };

  React.useEffect(() => {
    dispatch(toTakeSecretarList(tokenA));

    return () => {
      setIsType({ type: 0, id: 0 });
    };
  }, []);

  React.useEffect(() => {
    if (!sendStatusIsk) {
      dispatch(toTakeTypeTypeDocs(tokenA));
    }
  }, [sendStatusIsk]);

  const [listBtns, setListBtns] = useState([
    {
      id: 1,
      name: "Исковое заявление",
      bool: true,
      comp: <PdfFile editorRef={editorRefReject} />,
    },
    {
      id: 2,
      name: "Документы",
      bool: false,
      comp: (
        <div className="lookDocsIsksPred">
          <ApplicationFiles />
        </div>
      ),
    },
  ]);

  const clickType = (id) => {
    const newData = listBtns.map((button) => {
      return {
        ...button,
        bool: id === button.id,
      };
    });
    setListBtns(newData);
  };

  //// 1 - принять ответ. секр, 2 - отказ отв. секр, 3 - принять председ.
  //// 4 - отказ. председ. 5 - возражение

  return (
    <>
      <div className="blockModal moreStylePdf">
        <Modals
          openModal={sendStatusIsk}
          setOpenModal={() => setSendStatusIsk()}
        >
          {istype.type === 3 && (
            ////// принять исковое заявление
            <>
              <div className="choiceSecretard">
                {listBtns?.map((btn) => (
                  <button
                    key={btn?.id}
                    onClick={() => clickType(btn?.id)}
                    className={btn?.bool ? "activeBtnn" : ""}
                  >
                    {btn?.name}
                  </button>
                ))}
              </div>
              <div className="blockModal__inner">
                {listBtns?.map((btn) => (
                  <React.Fragment key={btn?.id}>
                    {btn?.bool && btn?.comp}
                  </React.Fragment>
                ))}
                <div className="plaintiFilling__container moreStyle">
                  <PdfFulfilled istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button onClick={() => goodIsks()}>Принять</button>
                  <button onClick={() => setSendStatusIsk(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            </>
          )}
          {istype.type === 4 && (
            ////// отклонить исковое заявление
            <>
              <div className="blockModal__inner">
                <PdfFile editorRef={editorRefReject} />
                <div className="plaintiFilling__container moreStyle">
                  <PdfFileReject istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button
                    onClick={(e) => dispatch(changeActionReject(true))}
                    className="rejectBtn"
                  >
                    Отклонить
                  </button>
                  <button onClick={() => setSendStatusIsk(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            </>
          )}
          {istype.type === 6 && (
            /// для отправки на доработку от председателя
            <>
              <div className="blockModal__inner">
                <PdfFile editorRef={editorRefReject} />
                <div className="plaintiFilling__container moreStyle">
                  <PdfFileRedone istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button
                    onClick={() => dispatch(changeActionRedone(true))}
                    className="btnsSendIsks"
                  >
                    На доработку
                  </button>
                  <button onClick={() => setSendStatusIsk(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            </>
          )}
          {istype.type === 7 && (
            /// для отвода арбитра
            <>
              <div className="blockModal__inner">
                <PdfFile editorRef={editorRefReject} />
                <div className="plaintiFilling__container moreStyle">
                  <PdfFileOtvodArbitr istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button
                    onClick={() => dispatch(changeActionOtvod(true))}
                    className="btnsSendIsks moreActionBtn"
                  >
                    Отвод арбитра
                  </button>
                  <button onClick={() => setSendStatusIsk(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            </>
          )}
          {istype.type === 8 && (
            /// для прекращения искового дела
            <>
              <div className="blockModal__inner">
                <PdfFile editorRef={editorRefReject} />
                <div className="plaintiFilling__container moreStyle">
                  <PdfFileStopIsks istype={istype} editorRef={editorRef} />
                </div>
              </div>
              <div className="modalchangeStatus" style={{ height: "auto" }}>
                <div className="btnsSendIsks">
                  <button
                    onClick={() => dispatch(changeActionStop(true))}
                    className="btnsSendIsks"
                  >
                    Прекратить
                  </button>
                  <button onClick={() => setSendStatusIsk(false)}>
                    Отмена
                  </button>
                </div>
              </div>
            </>
          )}
        </Modals>
      </div>
      <div className="blockModal moreStylePdf noneKrestic">
        {/* ////////// только для подтверждения иска  */}
        <Modals
          openModal={confirmActionFullfilled}
          setOpenModal={() => dispatch(changeActionFullfilled())}
        >
          {+istype.type === 3 && (
            //////// принять председ.
            <div className="modalchangeStatus">
              <div className="imgBlock">
                <img src={imgWarning} alt="send!" />
              </div>
              <h5>Принять иск?</h5>
              <div className="btnsSendIsks">
                <button onClick={(e) => fulfilledIsk(e)}>Да</button>
                <button onClick={() => dispatch(changeActionFullfilled(false))}>
                  Нет
                </button>
              </div>
            </div>
          )}
        </Modals>
        {/* /////// */}
        <Modals
          openModal={confirmActionReject}
          setOpenModal={() => dispatch(changeActionReject())}
        >
          {+istype.type === 4 && (
            //// 4 - отказ. председ.
            <div className="modalchangeStatus">
              <div className="imgBlock">
                <img src={imgWarning} alt="send!" />
              </div>
              <h5>Отказать в иске?</h5>
              <div className="btnsSendIsks">
                <button onClick={(e) => rejectIsk(e)}>Да</button>
                <button onClick={() => dispatch(changeActionReject(false))}>
                  нет
                </button>
              </div>
            </div>
          )}
        </Modals>

        {/*  //////// на доработку отв. секр */}
        <Modals
          openModal={confirmActionRedone}
          setOpenModal={() => dispatch(changeActionRedone())}
        >
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5>Отправить на доработку?</h5>

            <div className="btnsSendIsks">
              <button onClick={(e) => redoneIsk(e)}>Да</button>
              <button onClick={() => dispatch(changeActionRedone(false))}>
                нет
              </button>
            </div>
          </div>
        </Modals>

        {/*  //////// отвод арбитру от председателя */}
        <Modals
          openModal={confirmActionOtvod}
          setOpenModal={() => dispatch(changeActionOtvod())}
        >
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5>Подтвердить отвод?</h5>

            <div className="btnsSendIsks">
              <button onClick={(e) => otvodArbitr(e)}>Да</button>
              <button onClick={() => dispatch(changeActionOtvod(false))}>
                нет
              </button>
            </div>
          </div>
        </Modals>

        {/*  //////// прекрашение искового дела */}
        <Modals
          openModal={confirmActionStop}
          setOpenModal={() => dispatch(changeActionStop())}
        >
          <div className="modalchangeStatus">
            <div className="imgBlock">
              <img src={imgWarning} alt="send!" />
            </div>
            <h5> Прекратить исковое дело?</h5>
            <div className="btnsSendIsks">
              <button onClick={(e) => stopIsks(e)}>Да</button>
              <button onClick={() => dispatch(changeActionStop(false))}>
                нет
              </button>
            </div>
          </div>
        </Modals>
      </div>
    </>
  );
};
export default ConfirmStatusPred;
