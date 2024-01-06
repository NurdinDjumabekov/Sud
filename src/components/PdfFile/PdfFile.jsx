import React, { useRef } from "react";
import "./PdfFile.scss";
import pdf from "../../asstes/pdf/sud_pdf.pdf";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";

const PdfFile = ({ modal, typerole }) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
  };

  const { adff } = useSelector((state) => state.inputSlice);
  // console.log(adff, 'adff');
  // console.log(typerole, "typerole");

  const initialContent = `
    <div>
      <div style="display:flex; justify-content:right; margin: 20px 0px 20px 0px; font-size:16px !important">
        <div style="
            width: 300px;
            padding: 0px 10px 0px 0px;
            line-height: 25px;
            font-weight: 600;
            font-family: 'Times New Roman', sans-serif;" >
          <p style="margin:0px">Международный Третейский суд</p>
          <p style="margin:0px">при Торгово-Промышленной палате</p>
          <p style="margin:0px">Кыргызской Республики</p>
          <p style="margin:0px">${adff.name !== "" ? `${typerole}: ` : ""} ${
    adff.name
  }</p>
          <p style="margin:0px">${adff.name !== "" ? `Адрес: ` : ""}</p>
          <p style="margin:0px">${
            adff.numberPlaintiff !== "" ? `Телефон: ` : ""
          } ${adff.numberPlaintiff}</p>
        </div>
      </div>
      <div font-weight: 500; font-family: 'Times New Roman', serif; font-size:16px">
        <h3 style="text-align: center; font-weight: 600; font-size:18px; padding-top:80px;">Приложения в копиях</h3>
        <p>${adff.name}</p>
        <p>${adff.sex}</p>
        <p>${adff.dob}</p>
      </div>
    </div>
  `;

  return (
    <div className="pdfFile">
      <Editor
        apiKey="frhhgiuyhy64k6q9ojm6xdiqqvkg6ee4yka7yracc74t2i5a"
        initialValue={initialContent}
        init={{
          // height: modal ? 660 : 800,
          // width: modal ? 800 : '100%',
          height: "100%",
          width: "100%",
          menubar: {
            file: {
              title: "File",
              items: "newdocument restoredraft | preview | print ",
            },
          },
          content_style: "body { font-family: 'Times New Roman', sans-serif; }",
          toolbar: false,
        }}
        onEditorChange={handleEditorChange}
        ref={editorRef}
      />
    </div>
  );
};

export default PdfFile;
