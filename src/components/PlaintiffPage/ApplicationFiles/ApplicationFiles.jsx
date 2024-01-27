import React, { useState } from "react";
import "./ApplicationFiles.scss";
import krestik from "../../../asstes/icons/krestik.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDocsIsks,
  sendDocsIsks,
  toTakeTypeTypeDocs,
} from "../../../store/reducers/applicationsSlice";
import LookDocs from "../../PdfFile/LookDocs/LookDocs";
import { jwtDecode } from "jwt-decode";
import PdfOpis from "../../PdfFile/PdfOpis/PdfOpis";

const ApplicationFiles = () => {
  const dispatch = useDispatch();
  const [lookOpis, setLookOpis] = useState(false);
  const { todosApplications, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const handleFileChange = (id, e) => {
    const newFiles = Array.from(e.target.files);

    // Проверка размера каждого файла
    const isFileSizeValid = newFiles.every(
      (file) => file.size <= 100 * 1024 * 1024
    ); // 2 MB

    if (!isFileSizeValid) {
      alert("Размер файла должен быть не более 100 МБ");
      return;
    }

    // Отправка каждого файла на сервер отдельно
    newFiles.forEach((file) => {
      // console.log(file, "file");
      if (file) {
        const fileData = new FormData();
        fileData.append("code_isk", +todosApplications?.codeid);
        fileData.append("code_file", +id);
        fileData.append("file", file);
        fileData.append("name", file?.name);
        dispatch(
          sendDocsIsks({ fileData, tokenA, code_file: +id, name: file?.name })
        );
      }
    });
  };

  const handleButtonClick = (id) => {
    const fileInput = document.getElementById(`fileInput-${id}`);
    fileInput.click();
  };

  // console.log(selTypeTypeDocs, "selTypeTypeDocs");
  console.log(applicationList, "applicationList");
  // console.log(selectedFilesArray, "selectedFilesArray");\

  React.useEffect(() => {
    return () => {
      dispatch(toTakeTypeTypeDocs(tokenA));
    };
  }, []);

  const decodedToken = jwtDecode(tokenA);

  return (
    <>
      <div className="plaintiFilling__container">
        <div className="applicationFiles">
          <h5>Документы</h5>
          {applicationList.map((docs) => (
            <div key={+docs?.codeid} className="applicationFiles__inner">
              <div
                className="clickInputFile"
                onClick={() => handleButtonClick(docs?.codeid)}
              >
                <input
                  id={`fileInput-${+docs?.codeid}`}
                  type="file"
                  onChange={(e) => handleFileChange(docs?.codeid, e)}
                  style={{ display: "none" }}
                  multiple
                  disabled={+decodedToken?.type_user === 4 ? false : true}
                />
                <button>Добавить</button>
                <span>
                  {docs?.name}{" "}
                  <b className="required" style={{ fontSize: "22px" }}>
                    *
                  </b>
                </span>
              </div>
              <div className="filesBlock">
                {docs?.arrDocs.map((file) => (
                  <div key={+file?.codeid_file} className="file-item">
                    {/* <span >{file.name}</span> */}
                    <LookDocs file={file} key={file?.codeid_file} />
                    <button
                      disabled={+decodedToken?.type_user === 4 ? false : true}
                      onClick={() => {
                        dispatch(
                          deleteDocsIsks({
                            file: file?.codeid_file,
                            tokenA,
                            code_isk: todosApplications.codeid,
                          })
                        );
                      }}
                    >
                      <img src={krestik} alt="x" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="applicationFiles__inner">
            <div className="clickInputFile">
              <button
                className="downloadOpis"
                onClick={() => setLookOpis(true)}
              >
                Скачать опись
              </button>
            </div>
          </div>
        </div>
      </div>
      <PdfOpis lookOpis={lookOpis} setLookOpis={setLookOpis} />
    </>
  );
};

export default ApplicationFiles;
