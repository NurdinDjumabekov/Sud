import React, { useRef, useState } from "react";
import "./PdfOpis.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../../Modals/Modals";
import { newListDocs } from "../../../helpers/newListDocs";
import { key } from "../../../helpers/localData";

const PdfOpis = ({ lookOpis, setLookOpis }) => {
  const [date, setDate] = useState("");
  const editorRef = useRef(null);
  const { applicationList } = useSelector((state) => state.applicationsSlice);

  const handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
  };

  React.useEffect(() => {
    const currentDateObject = new Date();
    const day = currentDateObject.getDate();
    const month = currentDateObject.getMonth() + 1; // Месяцы начинаются с 0
    const year = currentDateObject.getFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}г.`;

    setDate(formattedDate);
  }, []);
  //   console.log(applicationList, "applicationList");

  ///////////////нахуй не нужный код, он для отталкивания блока стоит////////////////// 64 - 108 строки
  const initialContent = `
    <div class="block-container">
      <table style="width: 100%; border: 1px solid transparent !important">
          <tr>
              <td style="width: 48%; position: relative;border: 1px solid transparent !important">
                  <p style="text-align: left;  position: absolute; top: 10px; left: 10px;">${date}</p>
              </td>
              <td style="width: 50%; text-align: left; border: 1px solid transparent !important">
                  <p style="text-align: right;">Форма № 107</p>
                  <div class="text-left">
                  <p style="margin-top: 50px;"><b>ОПИСЬ</b></p>
                  <p>Вложения в <b>ценное письмо</b></p>
                  <p><b>Куда</b></p>
                  <p><b>На имя</b></p>
                  </div>
                  ${newListDocs(applicationList)}
                  <div class="text-left">
                  <p>Общий итог ценности <b>5 (пять) сом</b></p>
                  <p>Отправил  _________________________________________</p>
                  <p><b>Проверил</b> _________________________________________</p>
                  </div>
                  <p style="text-align:right; margin: 0 15px 0 0;">(подпись приемщика)</p>
              </td>
          </tr>
      </table>
    </div>
  `;

  return (
    <Modals openModal={lookOpis} setOpenModal={() => setLookOpis()}>
      <div className="pdfFile newPdf">
        <Editor
          apiKey={key}
          initialValue={initialContent}
          init={{
            height: "100%",
            width: "100%",
            menubar: {
              file: {
                title: "File",
                items: "print | undo redo",
              },
            },
            content_style:
              "body { font-family: 'Times New Roman', sans-serif; }",
            toolbar: false,
          }}
          onEditorChange={handleEditorChange}
          ref={editorRef}
        />
      </div>
    </Modals>
  );
};

export default PdfOpis;
