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

const PdfFile = ({ editorRef, nonePdf }) => {
  const { selCurrency } = useSelector((state) => state.selectsSlice);
  const { selCountries } = useSelector((state) => state.selectsSlice);
  const { selRegions } = useSelector((state) => state.selectsSlice);
  const { selDistrict } = useSelector((state) => state.selectsSlice);

  const { todosApplications, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );

  const [data, setData] = useState("");

  const transformData = (arr, type) => {
    let allText = `<div style="font-weight: 500; font-size: 16px;">`;
    for (const text of arr) {
      console.log(
        searchNameSelect(selRegions, text?.region),
        text?.region,
        "region"
      );

      const titleText = `<div style="display:inline-block;margin: 15px 5px 0px 0px;">${mainText(
        type
      )}${text.name}</div>`;
      const phoneText = text?.numPhone
        ? `<div style="display:flex; align-items:center"><span>Телефон: </span> ${text?.numPhone}</div>`
        : "";

      const addresText = `<div style="display:flex; align-items:center"><span>Адрес: </span> ${searchNameSelect(
        selCountries,
        text?.country
      )}, ${searchNameSelect(selRegions, text?.region)}, ${searchNameSelect(
        selDistrict,
        text?.district
      )}${text?.city ? `, ${text?.city}` : ""}${
        text?.street ? `, ул. ${text?.street}` : ""
      }${text?.numObj ? `, дом ${text?.numObj}` : ""}${
        text?.apartament ? `, кв. ${text?.apartament}` : ""
      }</div>`;

      const email = text?.email
        ? `<div style="display:flex; align-items:center"><span>Почта: </span> ${text?.email}</div>`
        : "";

      const inn = text?.inn
        ? `<div style="display:flex; align-items:center"><span>Инн: </span> ${text?.inn}</div>`
        : "";

      allText += titleText + phoneText + addresText + email + inn;
    }
    allText += "</div>";

    const textDefault = `<div style="font-weight: 500; font-size: 16px;"></div>`;

    if (allText === textDefault) {
      // if данные не заполнены, то я возвращаю пустую строку без каких-то отступов
      return `<div style="display: none"></div>`;
    }
    return allText;
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
      ?.map(
        (i, ind) => `<p><span>_______________________</span>  ${i?.name}</p>`
      )
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

  ///////////////нахуй не нужный код, он для отталкивания блока стоит////////////////// 89 - 131 строки
  const initialContent = `
    <div>
      <div>
       <div style="font-size: 16px; width: 100%; position: relative;">
        <p style="margin: 0px 0px 0px 10px; font-size: 16px;">от ${todayDate()} года</p>
        <div style="
            width: 280px;
            padding: 0px 10px 0px 0px;
            line-height: 25px;
            font-weight: 600;
            font-family: 'Times New Roman', sans-serif;">
        <p style="color: transparent; margin: 0px; font-size: 16px;">Международный Третейский суд</p>
        <p style="color: transparent; margin: 0px; font-size: 16px;">при Торгово-Промышленной палате</p>
        <p style="color: transparent; margin: 0px; font-size: 16px;">Кыргызской Республики</p>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.plaintiff,
          1
        )}</div>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.plaintiffResper,
          2
        )}</div>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.defendant,
          3
        )}</div>
        <div style="color: transparent; margin: 0px">${transformData(
          todosApplications?.defendantResper,
          4
        )}
        </div>
             </p>
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
            )}
            </div>
            </div>
        </div>
        ${
          +todosApplications?.non_proprietary === 0
            ? `<div>
                <div style="margin: 0px; position: relative; width:100%; height: 60px; padding: 10px 0px "> 
                  <p style="
                    color: transparent";
                    line-height: 25px;
                    font-family: 'Times New Roman', sans-serif;
                    >${
                      todosApplications?.isk_summ === "0" ||
                      todosApplications?.isk_summ === "" ||
                      todosApplications?.isk_summ === 0
                        ? ""
                        : `Денежные требования: ${
                            searchIdCurrency(
                              selCurrency,
                              +todosApplications?.isk_summ_curr
                            )
                              ? `<span >${+todosApplications?.isk_summ}  ${searchIdCurrency(
                                  selCurrency,
                                  +todosApplications?.isk_summ_curr
                                )}</span>`
                              : ""
                          }`
                    }
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
                      ">${
                        todosApplications?.isk_summ === "0" ||
                        todosApplications?.isk_summ === "" ||
                        todosApplications?.isk_summ === 0
                          ? ""
                          : `Денежные требования: ${
                              searchIdCurrency(
                                selCurrency,
                                +todosApplications?.isk_summ_curr
                              )
                                ? `<span style="font-weight: 500;  font-size: 16px;">${
                                    todosApplications?.isk_summ
                                  }  ${searchIdCurrency(
                                    selCurrency,
                                    +todosApplications?.isk_summ_curr
                                  )}</span>`
                                : ""
                            }`
                      }
                    </p>
                </div>
              </div>`
            : ""
        }
        ${
          todosApplications?.name === ""
            ? ""
            : `<h4 style="text-align:center; font-size: 18px; margin: 0 auto; width: 60%;">
              ${todosApplications?.name}
            </h4>`
        }
        ${
          todosApplications?.description === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.description}</p>`
        }
        ${
          todosApplications?.motivation === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.motivation}</p>`
        }
        ${
          todosApplications?.obosnovanie === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.obosnovanie}</p>`
        }
        ${
          todosApplications?.finance_raschet === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.finance_raschet}</p>`
        }
        ${
          todosApplications?.law_links === ""
            ? ""
            : `<p style=" font-size: 18px; text-indent: 40px; margin: 5px 0px">${todosApplications?.law_links}</p>`
        }
        ${
          todosApplications?.claim?.length === 0
            ? ""
            : transformClaim(todosApplications?.claim)
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
        apiKey="aqp3lj8havavh7ud6btplh670nfzm8axex2z18lpuqrv30ag"
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
