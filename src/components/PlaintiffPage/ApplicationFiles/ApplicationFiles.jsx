import React, { useState, useEffect } from "react";
import "./ApplicationFiles.scss";
import krestik from "../../../asstes/icons/krestik.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeApplicationList } from "../../../store/reducers/applicationsSlice";

const ApplicationFiles = () => {
  const dispatch = useDispatch();
  const { selTypeTypeDocs } = useSelector((state) => state.selectsSlice);
  const { todosApplications, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const [selectedFilesArray, setSelectedFilesArray] = useState(() => {
    // Пытаемся получить данные из localStorage при первой загрузке
    const storedData = localStorage.getItem("selectedFilesArray");
    return storedData
      ? JSON.parse(storedData)
      : Array(selTypeTypeDocs?.length).fill([]);
  });

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const dataArr = selTypeTypeDocs.map((item) => ({
      name: item?.name,
      code_file: item?.codeid,
    }));
    setApplications(dataArr);
  }, [selTypeTypeDocs]);

  const saveToLocalStorage = (data) => {
    // Сохраняем данные в localStorage
    localStorage.setItem("selectedFilesArray", JSON.stringify(data));
  };

  const handleFileChange = (setIndex, e, id) => {
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
            code_file: id,
          },
        };

        // Отправляем файл на сервер
        uploadFileToServer(fileData, id, setIndex);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (setIndex, fileIndex) => {
    setSelectedFilesArray((prevFilesArray) => {
      const updatedFilesArray = [...prevFilesArray];
      updatedFilesArray[setIndex].splice(fileIndex, 1);
      saveToLocalStorage(updatedFilesArray); // Сохраняем после удаления
      return updatedFilesArray;
    });
  };

  const uploadFileToServer = (fileData, id, setIndex) => {
    // Отправляем данные на сервер
    fetch("http://mttp-renaissance.333.kg/api/isks/crud/files", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenA}`,
      },
      body: JSON.stringify(fileData),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedFilesArray = selectedFilesArray.map((fileObj, index) => {
          if (index === setIndex) {
            return [
              ...fileObj,
              {
                id: +id,
                file_path: data?.file_path,
                name: fileData?.file?.name,
              },
            ];
          }
          return fileObj;
        });
        setSelectedFilesArray(updatedFilesArray);
        saveToLocalStorage(updatedFilesArray); // Сохраняем после добавления
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных на сервер:", error);
        alert("Ошибка! Не удалось загрузить файл");
      });
  };

  const handleButtonClick = (setIndex) => {
    const fileInput = document.getElementById(`fileInput-${setIndex}`);
    fileInput.click();
  };

  console.log(selTypeTypeDocs, "selTypeTypeDocs");
  console.log(applicationList, "applicationList");
  console.log(selectedFilesArray, "selectedFilesArray");

  return (
    <div className="plaintiFilling__container">
      <div className="applicationFiles">
        <h5>Документы</h5>
        {selectedFilesArray.map((selectedFiles, setIndex) => (
          <div key={setIndex} className="applicationFiles__inner">
            <div
              className="clickInputFile"
              onClick={() => handleButtonClick(setIndex)}
            >
              <input
                id={`fileInput-${setIndex}`}
                type="file"
                onChange={(e) =>
                  handleFileChange(
                    setIndex,
                    e,
                    applications[setIndex]?.code_file
                  )
                }
                style={{ display: "none" }}
                multiple
              />
              <button>Выбрать файлы</button>
              <span>{applications[setIndex]?.name}*</span>
            </div>
            <div className="filesBlock">
              {selectedFiles.map((file, fileIndex) => (
                <div key={fileIndex} className="file-item">
                  <span>{file.name}</span>
                  <button onClick={() => handleRemoveFile(setIndex, fileIndex)}>
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

// import React, { useState } from "react";
// import "./ApplicationFiles.scss";
// import krestik from "../../../asstes/icons/krestik.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { changeApplicationList } from "../../../store/reducers/applicationsSlice";

// const ApplicationFiles = () => {
//   const dispatch = useDispatch();
//   const { selTypeTypeDocs } = useSelector((state) => state.selectsSlice);
//   const { todosApplications, applicationList } = useSelector(
//     (state) => state.applicationsSlice
//   );
//   const { tokenA } = useSelector((state) => state.saveDataSlice);

//   const [selectedFilesArray, setSelectedFilesArray] = useState(
//     Array(selTypeTypeDocs?.length).fill([])
//   );

//   const [applications, setApplications] = useState([]);

//   React.useEffect(() => {
//     const dataArr = selTypeTypeDocs.map((item) => {
//       return {
//         name: item?.name,
//         code_file: item?.codeid,
//       };
//     });
//     setApplications(dataArr);
//   }, [selTypeTypeDocs]);

//   const handleFileChange = (setIndex, e, id) => {
//     const newFiles = Array.from(e.target.files);

//     // Проверка размера каждого файла
//     const isFileSizeValid = newFiles.every(
//       (file) => file.size <= 2 * 1024 * 1024
//     ); // 2 MB

//     if (!isFileSizeValid) {
//       alert("Размер файла должен быть не более 2 МБ");
//       return;
//     }

//     // Отправка каждого файла на сервер отдельно
//     newFiles.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const fileData = {
//           code_isk: todosApplications.codeid,
//           file: {
//             name: file.name,
//             base64: reader.result.split(",")[1],
//             code_file: id,
//           },
//         };

//         // Отправляем файл на сервер
//         uploadFileToServer(fileData, id, setIndex);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleRemoveFile = (setIndex, fileIndex) => {
//     setSelectedFilesArray((prevFilesArray) => {
//       const updatedFilesArray = [...prevFilesArray];
//       updatedFilesArray[setIndex].splice(fileIndex, 1);
//       return updatedFilesArray;
//     });
//   };

//   const uploadFileToServer = (fileData, id, setIndex) => {
//     // Отправляем данные на сервер
//     fetch("http://mttp-renaissance.333.kg/api/isks/crud/files", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${tokenA}`,
//       },
//       body: JSON.stringify(fileData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const updatedFilesArray = selectedFilesArray.map((fileObj, index) => {
//           if (index === setIndex) {
//             return [
//               ...fileObj,
//               {
//                 id: +id,
//                 file_path: data?.file_path,
//                 name: fileData?.file?.name,
//               },
//             ];
//           }
//           return fileObj;
//         });

//         setSelectedFilesArray(updatedFilesArray);
//       })
//       .catch((error) => {
//         console.error("Ошибка при отправке данных на сервер:", error);
//         alert("Ошибка! Не удалось зргрузить файл");
//       });
//   };

//   const handleButtonClick = (setIndex) => {
//     const fileInput = document.getElementById(`fileInput-${setIndex}`);
//     fileInput.click();
//   };

//   console.log(selTypeTypeDocs, "selTypeTypeDocs");
//   console.log(applicationList, "applicationList");
//   console.log(selectedFilesArray, "selectedFilesArray");

//   return (
//     <div className="plaintiFilling__container">
//       <div className="applicationFiles">
//         <h5>Документы</h5>
//         {selectedFilesArray.map((selectedFiles, setIndex) => (
//           <div key={setIndex} className="applicationFiles__inner">
//             <div
//               className="clickInputFile"
//               onClick={() => handleButtonClick(setIndex)}
//             >
//               <input
//                 id={`fileInput-${setIndex}`}
//                 type="file"
//                 onChange={(e) =>
//                   handleFileChange(
//                     setIndex,
//                     e,
//                     applications[setIndex]?.code_file
//                   )
//                 }
//                 style={{ display: "none" }}
//                 multiple
//               />
//               <button>Выбрать файлы</button>
//               <span>{applications[setIndex]?.name}*</span>
//             </div>
//             <div className="filesBlock">
//               {selectedFiles.map((file, fileIndex) => (
//                 <div key={fileIndex} className="file-item">
//                   <span>{file.name}</span>
//                   <button onClick={() => handleRemoveFile(setIndex, fileIndex)}>
//                     <img src={krestik} alt="x" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ApplicationFiles;
