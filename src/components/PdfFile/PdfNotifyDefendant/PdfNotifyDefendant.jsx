/////// hooks
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";

/////// style
import "./style.scss";

/////// helpers
import { key, logoMainBas64 } from "../../../helpers/localData";
import { transformRole } from "../../../helpers/transformArrDocs";
import { searchNameSelect } from "../../../helpers/searchNameSelect";
import { arbitrsLook } from "../../../helpers/HTML_helperes";
import { listAddresNotify } from "../../../helpers/HTML_helperes";
import { notifText1, notifText2 } from "../../../helpers/HTML_helperes";
import { notifText3, notifTitle } from "../../../helpers/HTML_helperes";
import { transformDate } from "../../../helpers/todayDate";
import { addFilesList } from "../../../helpers/addFilesList";

const PdfNotifyDefendant = ({ editorRef }) => {
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { applicationList } = useSelector((state) => state.applicationsSlice);
  const { selCountries } = useSelector((state) => state.selectsSlice);
  const { selRegions } = useSelector((state) => state.selectsSlice);
  const { selDistrict } = useSelector((state) => state.selectsSlice);

  const plaintiff = transformRole(todosApplications?.plaintiff);
  const defendant = transformRole(todosApplications?.defendant);

  //// addres
  const selOptions = [selCountries, selRegions, selDistrict];

  const country = (text) => searchNameSelect(selOptions[0], text?.country);
  const region = (text) => searchNameSelect(selOptions[1], text?.region);
  const district = (text) => searchNameSelect(selOptions[2], text?.district);

  const transformData = (arr) => {
    const generateText = (text) => {
      return [
        text?.numPhone &&
          `<div style="display:flex !important; align-items:center">${country(
            text
          )}, ${region(text)}, ${district(text)}${
            text?.city ? `, ${text?.city}` : ""
          }${text?.street ? `, ул. ${text?.street}` : ""}${
            text?.numObj ? `, дом ${text?.numObj}` : ""
          }${text?.apartament ? `, кв. ${text?.apartament}` : ""}</div>
          <div style="display:flex !important; align-items:center"><span>Телефон: </span>${
            text?.numPhone
          }</div>
          `,
      ]
        ?.filter(Boolean)
        ?.join("");
    };

    let allText = arr
      ?.map(
        (text) =>
          `<div style="display:inline-block; margin: 0px 5px 0px 0px;"><p style='display:inline; margin: 0px 5px 5px 0px; font-size: 16px;'>Ответчику: </p><h3 style="display:inline; font-size:16px;">${text?.name}</h3></div>` +
          generateText(text, selOptions)
      )
      ?.join("");

    return allText
      ? `<div style="font-weight: 500; font-size: 16px;">${allText}</div>`
      : `<div style="display: none"></div>`;
  };

  console.log(todosApplications, "todosApplications");

  const dateIsk = transformDate(`${todosApplications?.isk_date}`);

  const arbirts = arbitrsLook(todosApplications?.arbitrs);

  const noneStyle =
    "background: transparent !important; color: transparent !important;";

  const initialContent = `
      <div>
        <div>
          <div style="position: relative; margin: 20px 0px 20px 0px; font-size:16px !important; min-width:100%">
            <div style="${noneStyle} width: 380px;">
              ${transformData(todosApplications?.defendant, 3)}
            </div> 
            <img style="position: absolute; z-index: 1; top: 0; left: 0;" src="data:image/png;base64,${logoMainBas64}" alt="logo" height=120px width:950px >
            <div style="width: 380px; position: absolute; z-index: 1; top: 10px; right:0;">
              ${transformData(todosApplications?.defendant, 3)}
            </div>
          </div>
        </div>
      </div>

      <div style="position: relative; padding-left:230px; margin-top: 80px;">
        ${listAddresNotify(`${todosApplications?.isk_date}`)}
        <div>
         ${notifTitle}

          <div>
            <p style="font-size: 18px; text-indent: 40px; margin: 20px 0px 0px 0px">
              Настоящим уведомляем, что ${dateIsk} года ${plaintiff}  обратился  в МТС ТПП с исковым заявлением к ${defendant}   о ${
    todosApplications?.name
  }.
            </p>

            <p style="font-size: 18px; text-indent: 40px; margin: 0px 0px 0px 0px">
              В качестве арбитра для разрешения данного спора ${plaintiff} в своем заявлении о выборе арбитра, попросил назначить арбитра ${arbirts}.
            </p>

            <p style="font-size: 18px; text-indent: 40px; margin: 0px 0px 0px 0px">
              ${notifText1}
            </p>

            <p style="font-size: 18px; text-indent: 40px; margin: 0px 0px 0px 0px">
              ${notifText2}
            </p>

            <p style="font-size: 18px; text-indent: 40px; margin: 0px 0px 0px 0px">
              ${notifText3}
            </p>

            <p style="font-size: 18px; text-indent: 40px; margin: 10px 0px 0px 0px">
             Приложение:
            </p>

            <div style="font-size: 18px; margin: 0px 0px 0px 30px">
              ${addFilesList(applicationList)}
            </div>

            <div style="font-size: 18px; margin: 30px 0px 0px 0px">
              <h4 style="margin: 0px">Ответственный секретарь</h4>
              <div style="margin: 0px; position: relative;">
                <h4 style="margin: 0px;">Алтынбекова Ж.А</h4>
                <span style="position: absolute; z-index: 1; bottom: 0; left: 250px;">____________________________</span>
              </div>
            </div>
          </div>
          <div style="display:flex !important; gap: 200px; padding: 20px 0 0 0px">
          </div>
        </div>
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
          content_style: "body { font-family: 'Times New Roman', sans-serif; }",
          toolbar: false,
        }}
        ref={editorRef}
      />
    </div>
  );
};

export default PdfNotifyDefendant;
