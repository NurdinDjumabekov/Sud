import React, { useRef } from "react";
import "./PdfFulfilled.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";

const PdfFulfilled = ({ istype, editorRef }) => {
  const dispatch = useDispatch();
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const initialContent = `
    <div>
      <div>
        <div style="display:flex; justify-content:right; margin: 40px 0px 20px 0px; font-size:16px !important; min-width:100%">
          <div style="
              width: 250px;
              padding: 0px 10px 0px 0px;
              line-height: 25px;
              font-weight: 600;
              font-family: 'Times New Roman', sans-serif;
              ">
            <p style="margin: 0px; font-size: 15px;">Международный Третейский суд</p>
            <p style="margin: 0px; font-size: 15px;">при Торгово-Промышленной палате</p>
            <p style="margin: 0px; font-size: 15px;">Кыргызской Республики</p>
            </div>
        </div>
      </div>
    </div>
    <h4 style="text-align:center; font-size: 22px; margin: 80px 0 0 0;">ОПРЕДЕЛЕНИЕ</h4>
    <h4 style="text-align:center; font-size: 18px; margin: 0px;">в принятии искового заявления к производству № ${istype?.id}</h4>
    <h4 style="text-align:right !important; font-size: 18px; margin: 20px 0 0 0px; padding: 0px 30px 0px 0px;">г.Бишкек</h4>
    <p style=" font-size: 18px; text-indent: 40px; margin: 20px 0px 0 0">Международный Третейский Суд при Торгово-промышленной палате Кыргызской Республики (МТС ТПП) в лице Председателя Майчиева Шамарала Юсуповича, отказывает принятии искового заявление в производство МТС ТПП</p>
    <h4 style="text-align:center; font-size: 18px; margin: 20px 0 0 0px;">По причине:</h4>
    <p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px"> </p>
    <p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px"> </p>
    <div style="display:flex; gap:200px; padding: 20px 0 0 0px">
      <h4 style="text-align:center; font-size: 18px; margin: 20px 0 0 0px;">Председатель Майчиев Ш.Ю.</h4>
      </div>
      `;

  return (
    <>
      <div className="pdfFileReject">
        <Editor
          apiKey="frhhgiuyhy64k6q9ojm6xdiqqvkg6ee4yka7yracc74t2i5a"
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
            content_style:
              "body { font-family: 'Times New Roman', sans-serif; }",
            toolbar: false,
          }}
          ref={editorRef}
        />
      </div>
    </>
  );
};

export default PdfFulfilled;
