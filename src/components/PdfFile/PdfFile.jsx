import React from 'react';
import './PdfFile.scss';
import pdf from '../../asstes/pdf/sud_pdf.pdf';
import { Editor } from '@tinymce/tinymce-react';

const PdfFile = () => {
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  return (
    <>
      <Editor
        apiKey="frhhgiuyhy64k6q9ojm6xdiqqvkg6ee4yka7yracc74t2i5a"
        init={{
          height: 700,
          width: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        }}
        onEditorChange={handleEditorChange}
      />
    </>
  );
};

export default PdfFile;
