import React, { useRef } from 'react';
import './PdfFile.scss';
import pdf from '../../asstes/pdf/sud_pdf.pdf';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput } from '../../store/reducers/inputSlice';

const PdfFile = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
    // dispatch(changeInput(content)); // Dispatch the action with the updated content
  };

  const handlePrint = () => {
    // window.print();
  };

  const { input } = useSelector((state) => state.inputSlice);
  console.log(input, 'input');

  const initialContent = `
    <div>
      <div style="display:flex; justify-content:right; margin: 20px 0px 20px 0px; font-size:18px !important">
        <div style="
            width:300px;
            padding:0px 50px 0px 0px;
            line-height:25px;
            font-weight: 600;
            font-family: 'Times New Roman', sans-serif;" >
          <p style="margin:0px">Международный Третейский суд</p>
          <p style="margin:0px">при Торгово-Промышленной палате</p>
          <p style="margin:0px">Кыргызской Республики</p>
        </div>
      </div>
      <div font-weight: 500; font-family: 'Times New Roman', serif; font-size:16px">
        <h3 style="text-align: center; font-weight: 600; font-size:18px; padding-top:80px;">Приложения в копиях</h3>
        <p>${input}</p>
      </div>
    </div>
  `;

  return (
    <div className="pdfFile">
      <Editor
        apiKey="frhhgiuyhy64k6q9ojm6xdiqqvkg6ee4yka7yracc74t2i5a"
        initialValue={initialContent}
        init={{
          height: 900,
          width: 1000,
          menubar: {
            file: {
              title: 'File',
              items: 'newdocument restoredraft | preview | print ',
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
