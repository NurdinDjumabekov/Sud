import React, { useRef } from "react";
import "./style.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { key } from "../../../helpers/localData";

const PdfFileOtvodArbitr = ({ istype, editorRef }) => {
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { dataIsk } = useSelector((state) => state.applicationsSlice);
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  const transform = (arr) => {
    if (arr.length === 1) {
      return arr[0].name;
    } else if (arr.length === 2) {
      return `${arr[0].name} и ${arr[1].name}`;
    } else {
      const namesString = arr.map((item) => item.name).join(", ");
      return `${namesString.substring(
        0,
        namesString.lastIndexOf(",")
      )} и${namesString.substring(namesString.lastIndexOf(",") + 1)}`;
    }
  };

  const initialContent = `
    <div>
      <div>
        <div style="display:flex; justify-content:right; margin: 20px 0px 20px 0px; font-size:16px !important; min-width:100%">
          <div style="
              width: 100%;
              padding: 10px 0px 0px 0px;
              line-height: 18px;
              font-weight: 500;
              font-family: "Times New Roman", sans-serif;
              height: 250px;
              position: relative;
              font-size:16px !important;
              ">
              <div style"position: absolute; top:10px; left:10px">
                <p>Кыргызская Республика, 720001,<br>г.Бишкек, ул.Турусбекова 109/3,<br>БЦ "Максимум плюс", 6 этаж, офис 601/2</p>
                <p>Моб.: +996 770 900 920 <br>Тел.: +996 312 383 005 <br>office@arbitricaccikr.com <br>www.arbitricaccikr.com</p>
              </div>
              <div style="width: 340px; position: absolute; top: 10px; right: 10px; display: block; text-align: right;">
              
              </div>
            </div>
        </div>
      </div>
    </div>
    <h4 style="text-align:center; font-size: 22px; margin: 80px 0 0 0;">Отвод арбитру в </h4>
    <h4 style="text-align:center; font-size: 18px; margin: 0px;"> исковом заявлении № ${dataIsk?.isk_number}</h4>
    <h4 style="text-align:right !important; font-size: 18px; margin: 20px 0 0 0px; padding: 0px 30px 0px 0px;">г.Бишкек</h4>
    <p style=" font-size: 18px; text-indent: 40px; margin: 20px 0px 0 0">Международный Третейский Суд при Торгово-промышленной палате Кыргызской Республики (МТС ТПП) в лице Председателя Майчиева Шамарала Юсуповича, ..... </p>
    <h4 style="text-align:center; font-size: 18px; margin: 20px 0 0 0px;">По причине:</h4>
    <p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px"></p>
    <p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px"></p>
    <div style="display:flex; gap:200px; padding: 20px 0 0 0px">
      <h4 style="text-align:center; font-size: 18px; margin: 20px 0 0 0px;">Председатель Майчиев Ш.Ю.</h4>
      </div>
      `;

  return (
    <div className="pdfFileReject">
      <Editor
        apiKey={key}
        initialValue={initialContent}
        init={{
          height: "100%",
          width: "100%",
          menubar: {
            file: {
              title: "File",
              items: "preview | print | save",
            },
          },
          content_style: 'body { font-family: "Times New Roman", sans-serif; }',
          toolbar: false,
        }}
        ref={editorRef}
      />
    </div>
  );
};

export default PdfFileOtvodArbitr;
