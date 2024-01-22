import React, { useRef, useState } from "react";
import Modals from "../Modals/Modals";
import "./ConfirmStatus.scss";
import imgWarning from "../../asstes/images/warning.png";
import { changeStatusOrg } from "../../store/reducers/sendDocsSlice";
import { useDispatch, useSelector } from "react-redux";
import ExampleBlock from "../ExampleBlock/ExampleBlock";
import PdfFileReject from "../ResponsibleSecr/PdfFileReject/PdfFileReject";
import jsPDF from "jspdf";
import { sendDocsReject } from "../../store/reducers/applicationsSlice";

const ConfirmStatus = ({ setSendStatusIsk, sendStatusIsk, istype }) => {
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const [input, setInput] = useState("");
  const [sendDocs, setSendDocs] = useState(false);
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const handleConfirm = (type) => {
    dispatch(
      changeStatusOrg({
        id: istype.id,
        tokenA,
        description: type === 1 || type === 3 ? "" : input,
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
                text={"Пример отказа иска должен быть таким-то"}
                typeText={"Пример отказа иска"}
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
                          if (editorRef.current && editorRef.current.editor) {
                            const content = editorRef.current.editor.getContent();
                            const pdf = new jsPDF();
                            pdf.html(content, {
                              callback: function (pdf) {
                                const pdfData = pdf.output();
                                const formData = new FormData();
                                const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
                                formData.append("file", pdfBlob, "document.pdf");
                                formData.append("code_file", 14); //////// отказ иска отвественным секретарём
                                formData.append("code_isk", +istype.id);
                                dispatch(
                                  changeStatusOrg({
                                    id: istype.id,
                                    tokenA,
                                    description: input,
                                    isk_status: istype.type,
                                    formData
                                  })
                                  );
                              },
                            });
                          }
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
            <PdfFileReject
              input={input}
              istype={istype}
              editorRef={editorRef}
            />
          </div>
        )}
      </Modals>
    </div>
  );
};

export default ConfirmStatus;
