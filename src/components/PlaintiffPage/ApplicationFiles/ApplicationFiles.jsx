import React from "react";
import "./ApplicationFiles.scss";
import krestik from "../../../asstes/icons/krestik.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDocsIsks,
  sendDocsIsks,
} from "../../../store/reducers/applicationsSlice";

const ApplicationFiles = () => {
  const dispatch = useDispatch();
  const { todosApplications, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const handleFileChange = (id, e) => {
    const newFiles = Array.from(e.target.files);

    // Проверка размера каждого файла
    const isFileSizeValid = newFiles.every(
      (file) => file.size <= 2 * 1024 * 1024
    ); // 2 MB

    if (!isFileSizeValid) {
      alert("Размер файла должен быть не более 2 МБ");
      return;
    }

    // Отправка каждого файла на сервер отдельно
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = {
          code_isk: todosApplications.codeid,
          file: {
            name: file.name,
            base64: reader.result.split(",")[1],
            code_file: +id,
          },
        };
        dispatch(sendDocsIsks({ fileData, tokenA }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleButtonClick = (id) => {
    const fileInput = document.getElementById(`fileInput-${id}`);
    fileInput.click();
  };

  // console.log(selTypeTypeDocs, "selTypeTypeDocs");
  console.log(applicationList, "applicationList");
  // console.log(selectedFilesArray, "selectedFilesArray");

  const arr = [
    {
      id: 1,
      nur: 555,
      arrDocs: [
        { name: "jkkdas324jkh", codeid_file: 33 },
        { name: "jkkasdasasdsajkh", codeid_file: 34 },
        { name: "jkksadasdjkh", codeid_file: 35 },
        { name: "jkkasdasdjkh", codeid_file: 36 },
      ],
    },
    {
      id: 2,
      nur: 888,
      arrDocs: [
        { name: "jkkdas324jkh", codeid_file: 33 },
        { name: "jkkasdasasdsajkh", codeid_file: 34 },
        { name: "jkksadasdjkh", codeid_file: 35 },
        { name: "jkkasdasdjkh", codeid_file: 36 },
      ],
    },
    {
      id: 3,
      nur: 456,
      arrDocs: [
        { name: "jkkdas324jkh", codeid_file: 30 },
        { name: "jkkasdasasdsajkh", codeid_file: 34 },
        { name: "jkksadasdjkh", codeid_file: 35 },
        { name: "jkkasdasdjkh", codeid_file: 36 },
      ],
    },
  ];

  const idnum = 30;

  const filteredArr = arr.map((item) => ({
    ...item,
    arrDocs: item.arrDocs.filter((doc) => doc.codeid_file !== idnum),
  }));

  console.log(filteredArr, "filteredArr");

  return (
    <div className="plaintiFilling__container">
      <div className="applicationFiles">
        <h5>Документы</h5>
        {applicationList.map((docs) => (
          <div key={docs?.codeid} className="applicationFiles__inner">
            <div
              className="clickInputFile"
              onClick={() => handleButtonClick(docs?.codeid)}
            >
              <input
                id={`fileInput-${docs?.codeid}`}
                type="file"
                onChange={(e) => handleFileChange(docs?.codeid, e)}
                style={{ display: "none" }}
                multiple
              />
              <button>Выбрать файлы</button>
              <span>{docs?.name} *</span>
            </div>
            <div className="filesBlock">
              {docs?.arrDocs.map((file) => (
                <div key={file?.codeid_file} className="file-item">
                  <span>{file.name}</span>
                  <button
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
      </div>
    </div>
  );
};

export default ApplicationFiles;
