import React, { useRef } from "react";
import "./PdfFile.scss";
import pdf from "../../asstes/pdf/sud_pdf.pdf";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { searchIdCurrency } from "../../helpers/searchIdCurrency";

const PdfFile = ({ modal, typerole }) => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const { selCurrency } = useSelector((state) => state.selectsSlice);

  const handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
  };

  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  // console.log(adff, 'adff');
  // console.log(typerole, "typerole");
  // console.log(todosApplications, "todosApplications");

  const transformData = (arr, type) => {
    let allText = `<div style="font-weight: 500; font-size: 20px;">`;
    for (const text of arr) {
      const titleText = `<div style="display:inline-block;margin: 35px 0px 0px 0px;"><h3 style="display:inline;margin: 0px 5px 0px 0px;">${mainText(
        type
      )} </h3>    ${text.name}</div>`;
      const phoneText = `<div style="display:flex; align-items:center"><span>Телефон: </span> ${text.numPhone}</div>`;
      const adresText = `<div style="display:flex; align-items:center"><span>Адрес: </span> ${text.country}, ${text.region}, ${text.district}, ${text.city}, ${text.street}, ${text.numObj}</div>`;
      const email = `<div style="display:flex; align-items:center"><span>Почта: </span> ${text.email}</div>`;
      const inn = `<div style="display:flex; align-items:center"><span>Инн: </span> ${text.inn}</div>`;
      allText += titleText + phoneText + adresText + email + inn;
    }
    allText += "</div>";
    return allText;
  };

  const mainText = (type) => {
    if (type === 1) {
      return "Истец: ";
    } else if (type === 2) {
      return "<h3 style='display:flex; margin: 0px 0px 5px 0px'>Представитель по доверенности: </h3>";
    } else if (type === 3) {
      return "Ответчик: ";
    } else if (type === 4) {
      return "<h3 style='display:flex; margin: 0px 0px 5px 0px'>Представитель ответчика: </h3>";
    }
  };

  const initialContent = `
    <div>
      <div>
        <div style="display:flex; justify-content:right; margin: 40px 0px 20px 0px; font-size:16px !important">
          <div style="
              width: 350px;
              padding: 0px 10px 0px 0px;
              line-height: 25px;
              font-weight: 600;
              font-family: 'Times New Roman', sans-serif;
              ">
            <p style="margin: 0px; font-size: 20px;">Международный Третейский суд</p>
            <p style="margin: 0px; font-size: 20px;">при Торгово-Промышленной палате</p>
            <p style="margin: 0px; font-size: 20px;">Кыргызской Республики</p>
            <div style="margin: 0px">${transformData(
              todosApplications?.plaintiff,
              1
            )}</div>
            <div style="margin: 0px">${transformData(
              todosApplications?.plaintiffResper,
              2
            )}</div>
            <div style="margin: 0px">${transformData(
              todosApplications?.defendant,
              3
            )}</div>
            <div style="margin: 0px">${transformData(
              todosApplications?.defendantResper,
              4
            )}</div>
             <p style=" font-size: 20px;">${
               todosApplications?.summ === "0" ||
               todosApplications?.summ === "" ||
               todosApplications?.summ === 0
                 ? ""
                 : `Цена иска: ${
                     todosApplications?.summ === ""
                       ? ""
                       : `${todosApplications?.summ}${" "}${
                           searchIdCurrency(
                             selCurrency,
                             +todosApplications?.summ_curr
                           )
                             ? searchIdCurrency(
                                 selCurrency,
                                 +todosApplications?.summ_curr
                               )
                             : ""
                         }`
                   }`
             }
              </p>
          </div>
        </div>
        ${
          todosApplications?.name === ""
            ? ""
            : `<h4 style="text-align:center; font-size: 25px;">
              ${todosApplications?.name}
            </h4>`
        }
        ${
          todosApplications?.description === ""
            ? ""
            : `<p style=" font-size: 20px; text-indent: 40px; margin: 5px 0px">${todosApplications?.description}</p>`
        }
        ${
          todosApplications?.motivation === ""
            ? ""
            : `<p style=" font-size: 20px; text-indent: 40px; margin: 5px 0px">${todosApplications?.motivation}</p>`
        }
        ${
          todosApplications?.obosnovanie === ""
            ? ""
            : `<p style=" font-size: 20px; text-indent: 40px; margin: 5px 0px">${todosApplications?.obosnovanie}</p>`
        }
        ${
          todosApplications?.finance_raschet === ""
            ? ""
            : `<p style=" font-size: 20px; text-indent: 40px; margin: 5px 0px">${todosApplications?.finance_raschet}</p>`
        }
        ${
          todosApplications?.law_links === ""
            ? ""
            : `<p style=" font-size: 20px; text-indent: 40px; margin: 5px 0px">${todosApplications?.law_links}</p>`
        }
        ${
          todosApplications?.claim === ""
            ? ""
            : `<p style=" font-size: 20px; text-indent: 40px;">${todosApplications?.claim}</p>`
        }
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

// import React, { useRef, useState } from "react";
// import "./PdfFile.scss";
// import pdf from "../../asstes/pdf/sud_pdf.pdf";
// import { Editor } from "@tinymce/tinymce-react";
// import { useDispatch, useSelector } from "react-redux";

// const PdfFile = ({ modal, typerole }) => {
//   const dispatch = useDispatch();
//   const editorRef = useRef(null);
//   const [arrData, setArrData] = useState({ arr1: [], arr2: [] });

//   console.log(arrData);

//   const handleEditorChange = (content, editor) => {
//     // console.log('Content was updated:', content);
//   };

//   const { todosApplications } = useSelector((state) => state.applicationsSlice);
//   // console.log(adff, 'adff');
//   // console.log(typerole, "typerole");

//   console.log(todosApplications, "todosApplications");

//   React.useEffect(() => {
//     todosApplications?.plaintiff?.map((i) => {
//       const newArr = [];
//       newArr.push(i.name);
//       newArr.push(i.country);
//       newArr.push(i.region);
//       newArr.push(i.city);
//       newArr.push(i.district);
//       newArr.push(i.street);
//       newArr.push(i.numObj);
//       console.log(newArr);
//       // setArrData({ ...arrData, arr1: "" })
//     });
//   }, [todosApplications]);

//   const initialContent = `
//     <div>
//       <div style="display:flex; justify-content:right; margin: 40px 0px 20px 0px; font-size:16px !important">
//         <div style="
//             width: 350px;
//             padding: 0px 10px 0px 0px;
//             line-height: 25px;
//             font-weight: 600;
//             font-family: 'Times New Roman', sans-serif;">
//           <p style="margin:0px">Международный Третейский суд</p>
//           <p style="margin:0px">при Торгово-Промышленной палате</p>
//           <p style="margin:0px">Кыргызской Республики</p>
//           <p style="margin:0px">

//           </p>
//       </div>
//     </div>
//   `;

//   return (
//     <div className="pdfFile">
//       <Editor
//         apiKey="frhhgiuyhy64k6q9ojm6xdiqqvkg6ee4yka7yracc74t2i5a"
//         initialValue={initialContent}
//         init={{
//           // height: modal ? 660 : 800,
//           // width: modal ? 800 : '100%',
//           height: "100%",
//           width: "100%",
//           menubar: {
//             file: {
//               title: "File",
//               items: "newdocument restoredraft | preview | print ",
//             },
//           },
//           content_style: "body { font-family: 'Times New Roman', sans-serif; }",
//           toolbar: false,
//         }}
//         onEditorChange={handleEditorChange}
//         ref={editorRef}
//       />
//     </div>
//   );
// };

// export default PdfFile;
