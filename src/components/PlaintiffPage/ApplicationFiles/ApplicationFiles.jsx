////// hooks
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./ApplicationFiles.scss";

/////// imgs
import krestik from "../../../asstes/icons/krestik.svg";

////// fns
import { deleteDocsIsks } from "../../../store/reducers/applicationsSlice";
import { sendDocsIsks } from "../../../store/reducers/applicationsSlice";

////// componets
import LookDocs from "../../PdfFile/LookDocs/LookDocs";
import PdfOpis from "../../PdfFile/PdfOpis/PdfOpis";

const ApplicationFiles = () => {
  const dispatch = useDispatch();
  const [lookOpis, setLookOpis] = useState(false);

  const { dataIsk, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );

  const { checkEditPlaint } = useSelector((state) => state.saveDataSlice);

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
    newFiles?.forEach((file) => {
      // console.log(file, "file");
      if (file) {
        const fileData = new FormData();
        fileData.append("code_isk", +dataIsk?.codeid);
        fileData.append("code_file", +id);
        fileData.append("file", file);
        fileData.append("name", file?.name);
        dispatch(sendDocsIsks({ fileData, code_file: +id, name: file?.name }));
      }
    });
  };

  const handleButtonClick = (id) => {
    const fileInput = document.getElementById(`fileInput-${id}`);
    fileInput?.click();
  };

  const deleteDocs = ({ codeid_file }) => {
    const { codeid } = dataIsk;
    const send = { codeid_file, code_isk: codeid };
    dispatch(deleteDocsIsks(send));
  };

  return (
    <>
      <div className="plaintiFilling__container">
        <div className="applicationFiles">
          <h5>Документы</h5>
          {applicationList?.map((docs) => (
            <div key={docs?.codeid} className="applicationFiles__inner">
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
                  // disabled={editFileDocs ? false : true}
                />
                <button>Добавить</button>
                <span>
                  {docs?.name} <b className="required req">*</b>
                </span>
              </div>
              <div className="filesBlock">
                {docs?.arrDocs.map((file) => (
                  <div key={+file?.codeid_file} className="file-item">
                    <LookDocs file={file} key={file?.codeid_file} />
                    {checkEditPlaint && (
                      <button onClick={() => deleteDocs(file)}>
                        <img src={krestik} alt="x" />
                      </button>
                    )}
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
                Сформировать опись
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
