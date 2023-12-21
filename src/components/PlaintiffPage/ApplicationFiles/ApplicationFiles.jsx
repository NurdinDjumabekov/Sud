import React, { useState } from 'react';
import './ApplicationFiles.scss';
import krestik from '../../../asstes/icons/krestik.svg';

const ApplicationFiles = () => {
  const [selectedFilesArray, setSelectedFilesArray] = useState(
    Array(11).fill([])
  );

  const applications = [
    'Копия искового заявления',
    'Истец *',
    'Доверенность представителя Истца',
    'Представитель Истца *',
    'Квитанция об уплате регистрационного и арбитражного сбора',
    'Заявление об избрании арбитра',
    'Соглашение об арбитражной оговорке',
    'Расчет исковых требований',
    'Почтовая квитанция о направлении копии искового заявления с приложенными документами ответчику',
    'Копии искового завявления с приложенными документами',
    'Иные документы для рассмотрения ',
  ];

  const handleFileChange = (setIndex, e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFilesArray((prevFilesArray) => {
      const updatedFilesArray = [...prevFilesArray];
      updatedFilesArray[setIndex] = [...prevFilesArray[setIndex], ...newFiles];
      return updatedFilesArray;
    });
  };

  const handleRemoveFile = (setIndex, fileIndex) => {
    setSelectedFilesArray((prevFilesArray) => {
      const updatedFilesArray = [...prevFilesArray];
      updatedFilesArray[setIndex].splice(fileIndex, 1);
      return updatedFilesArray;
    });
  };

  const handleButtonClick = (setIndex) => {
    const fileInput = document.getElementById(`fileInput-${setIndex}`);
    fileInput.click();
  };

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
                onChange={(e) => handleFileChange(setIndex, e)}
                style={{ display: 'none' }}
                multiple
              />
              <button>Выбрать файлы</button>
              <span>
                {applications[setIndex].includes('*')
                  ? applications[setIndex]
                  : `${applications[setIndex]} *`}
              </span>
            </div>
            <div className='filesBlock'>
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
