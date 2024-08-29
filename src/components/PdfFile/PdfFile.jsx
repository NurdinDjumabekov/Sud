////// hooks
import React, { useState } from "react";
import { useSelector } from "react-redux";

////// style
import "./PdfFile.scss";

////// components
import { Editor } from "@tinymce/tinymce-react";

////// helpers
import { searchIdCurrency } from "../../helpers/searchIdCurrency";
import { searchNameSelect } from "../../helpers/searchNameSelect";
import { addFilesList } from "../../helpers/addFilesList";
import { todayDate } from "../../helpers/todayDate";
import { key } from "../../helpers/localData";
import { comparisonCheck } from "../../helpers/getSelects";

const PdfFile = ({ editorRef, nonePdf }) => {
  const { selCurrency } = useSelector((state) => state.selectsSlice);
  const { selCountries } = useSelector((state) => state.selectsSlice);
  const { selRegions } = useSelector((state) => state.selectsSlice);
  const { selDistrict } = useSelector((state) => state.selectsSlice);

  const { todosApplications, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );

  const { isk_summ, isk_summ_curr } = todosApplications;

  const [data, setData] = useState("");

  const transformData = (arr, type) => {
    const selOptions = [selCountries, selRegions, selDistrict];

    const generateText = (text, selOptions) => {
      const districtText = searchNameSelect(selOptions[2], text?.district);

      const country = comparisonCheck(text?.country)
        ? `${searchNameSelect(selOptions[0], text?.country)}, `
        : "";

      const region = comparisonCheck(text?.region)
        ? `${searchNameSelect(selOptions[1], text?.region)}, `
        : "";

      const district = comparisonCheck(districtText)
        ? `${searchNameSelect(selOptions[2], text?.district)}, `
        : "";

      const city = text?.city ? `г. ${text.city}, ` : "";

      const street = text?.street ? `ул. ${text.street} ` : "";

      const numObj = text?.numObj ? `${text.numObj}` : "";

      const apartament = text?.apartament ? `, кв. ${text.apartament}` : "";

      // console.log(text?.district, "text?.district");

      return [
        text?.numPhone &&
          `<div style="display:flex; align-items:center"><span>Телефон: </span>${text.numPhone}</div>`,
        `<div style="display:flex; align-items:center"><span>Адрес: </span>${country} ${region} ${district} ${city}${street}${numObj}${apartament}</div>`,
        text?.email &&
          `<div style="display:flex; align-items:center"><span>Почта: </span>${text.email}</div>`,
        text?.inn &&
          `<div style="display:flex; align-items:center"><span>Инн: </span>${text.inn}</div>`,
      ]
        ?.filter(Boolean)
        ?.join("");
    };

    let allText = arr
      ?.map(
        (text) =>
          `<div style="display:inline-block; margin: 15px 5px 0px 0px;">${mainText(
            type
          )}${text.name}</div>` + generateText(text, selOptions)
      )
      ?.join("");

    return allText
      ? `<div style="font-weight: 500; font-size: 16px;">${allText}</div>`
      : `<div style="display: none"></div>`;
  };

  const mainText = (type) => {
    if (type === 1) {
      return "<h3 style='display:inline; margin: 0px 5px 5px 0px; font-size: 16px;'>Истец: </h3>";
    } else if (type === 2) {
      return "<h3 style='display:flex; margin: 0px 0px 5px 0px; font-size: 16px;'>Представитель по доверенности: </h3>";
    } else if (type === 3) {
      return "<h3 style='display:inline; margin: 0px 5px 5px 0px; font-size: 16px;'>Ответчик: </h3>";
    } else if (type === 4) {
      return "<h3 style='display:flex; margin: 0px 0px 5px 0px; font-size: 16px;'>Представитель ответчика: </h3>";
    }
  };

  const signaturePlaintiff = (arrData) => {
    const newHtml = `<div style="font-weight: 500; font-size: 16px; margin:0px 0px 0px 10px; text-align:right">
    ${arrData
      ?.map((i) => `<p><span>_______________________</span>  ${i?.name}</p>`)
      .join("")}
    </div>`;
    return newHtml;
  };

  const transformClaim = (arr) => {
    const content = arr
      ?.map(
        (item, index) =>
          `<p style="font-size: 18px; text-indent: 40px;">
        ${index + 1}. ${item?.claimText}
      </p>`
      )
      .join("");
    return `<div style="font-weight: 500; font-size: 16px;">${content}</div>`;
  };

  const plaintiff = transformData(todosApplications?.plaintiff, 1);
  const plaintiffResper = transformData(todosApplications?.plaintiffResper, 2);
  const defendant = transformData(todosApplications?.defendant, 3);
  const defendantResper = transformData(todosApplications?.defendantResper, 4);

  const iskSum = isk_summ === "0" || isk_summ === "" || isk_summ === 0;

  const iskSummCurr = searchIdCurrency(selCurrency, +isk_summ_curr);

  const money = `${
    !iskSum
      ? `Денежные требования: ${
          iskSummCurr
            ? `<span >${+todosApplications?.isk_summ}  ${iskSummCurr}</span>`
            : ""
        }`
      : ""
  }`;

  ///////////////нахуй не нужный код, он для отталкивания блока стоит////////////////// 89 - 131 строки
  const initialContent = `
    <div>
      <div>
       <div style="font-size: 16px; width: 100%; position: relative;">
        <p style="margin: 65px 0px 0px 10px; font-size: 16px;">от ${todayDate()} года</p>
        <div style="width: 280px;padding: 6px 10px 0px 0px;line-height: 25px;font-weight: 600;font-family: 'Times New Roman', sans-serif;">
          <p style="color: transparent; margin: 0px; font-size: 16px;">Международный Третейский суд</p>
          <p style="color: transparent; margin: 0px; font-size: 16px;">при Торгово-Промышленной палате</p>
          <p style="color: transparent; margin: 0px; font-size: 16px;">Кыргызской Республики</p>
          <div style="color: transparent; margin: 0px">${plaintiff}</div>
            <div style="color: transparent; margin: 0px">${plaintiffResper}</div>
            <div style="color: transparent; margin: 0px">${defendant}</div>
            <div style="color: transparent; margin: 0px">${defendantResper}</div>
          </div>
        </div>
        <div style="
              width: 280px;
              padding: 0px 10px 0px 0px;
              line-height: 25px;
              position: absolute;
              top: 62px;
              right: 10px;
              font-weight: 600;
              font-family: 'Times New Roman', sans-serif;
              ">
            <p style="margin: 0px; font-size: 16px;">Международный Третейский суд</p>
            <p style="margin: 0px; font-size: 16px;">при Торгово-Промышленной палате</p>
            <p style="margin: 0px; font-size: 16px;">Кыргызской Республики</p>
            <div style="margin: 0px">${plaintiff}</div>
            <div style="margin: 0px">${plaintiffResper}</div>
            <div style="margin: 0px">${defendant}</div>
            <div style="margin: 0px">${defendantResper}
            </div>
          </div>
        </div>
        ${
          +todosApplications?.non_proprietary === 0
            ? `<div>
                <div style="position: relative; width:100%; height: 60px; padding: 0px 0px 10px 0px "> 
                  <p style="
                    color: transparent";
                    line-height: 25px;
                    font-family: 'Times New Roman', sans-serif;
                    >${money}
                    </p>
                    <p style="
                        font-size: 16px;
                        position: absolute;
                        width: 275px;
                        line-height: 0px;
                        top: 15px;
                        right: 10px;
                        color:#000;
                        font-weight: 600;
                        font-family: 'Times New Roman', sans-serif;
                        padding: 0px;
                      ">${money}
                    </p>
              </div>
          </div>`
            : ""
        }
        ${
          !!todosApplications?.name
            ? `<h4 style="text-align:center; font-size: 18px; margin: 0 auto; width: 60%;">
                ${todosApplications?.name}
              </h4>`
            : ""
        }
        ${
          !!todosApplications?.description
            ? `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.description}</p>`
            : ""
        }
        ${
          !!todosApplications?.motivation
            ? `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.motivation}</p>`
            : ""
        }
        ${
          !!todosApplications?.obosnovanie
            ? `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.obosnovanie}</p>`
            : ""
        }
        ${
          !!todosApplications?.finance_raschet
            ? `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.finance_raschet}</p>`
            : ""
        }
        ${
          !!todosApplications?.law_links
            ? `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.law_links}</p>`
            : ""
        }
        ${
          !!todosApplications?.claim
            ? transformClaim(todosApplications?.claim)
            : ""
        }
        <p style="text-align:center; font-size: 20px;">Приложения в копиях</p>
        ${addFilesList(applicationList)}
        ${signaturePlaintiff(todosApplications?.plaintiff)}
    </div>
  `;

  React.useEffect(() => {
    if (todosApplications.content === "") {
      setData(initialContent);
    } else {
      setData(todosApplications?.content);
    }
  }, [initialContent]);

  React.useEffect(() => {
    setData(initialContent);
  }, [todosApplications]);

  React.useEffect(() => {
    setData(initialContent);
  }, [applicationList]);

  return (
    <div className={`pdfFile ${nonePdf}`}>
      <Editor
        apiKey={key}
        initialValue={data || todosApplications.content}
        init={{
          height: "100%",
          width: "100%",
          menubar: {
            file: {
              title: "File",
              items: "print | undo redo",
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

export default PdfFile;
