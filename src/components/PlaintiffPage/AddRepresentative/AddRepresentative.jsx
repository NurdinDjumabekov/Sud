import React from 'react';
import './AddRepresentative.scss';
import Selects from '../../Selects/Selects';

const AddRepresentative = ({ typerole }) => {
  const [inputData, setInputData] = React.useState({});
  const [type, setType] = React.useState('');
  const sendData = () => {};

  const selectArr = [
    { id: 0, name: 'Мужской' },
    { id: 1, name: 'Женский' },
  ];

  return (
    <div className="addPlaintiff">
      <h3>Истец</h3>
      <form onSubmit={sendData}>
        <input type="text" placeholder="ФИО" />
        <div className="date">
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={'Пол *'}
          />
          <input type="date" placeholder="дата" className="inputDate" />

          <div className="inputsCheckbox">
            <input
              type="checkbox"
              id="checkboxDate"
              placeholder="ФИО"
              className="inputCheckbox"
            />
            <label htmlFor="checkboxDate">Неизвестна дата рождения</label>
          </div>
        </div>
        <div className="checkBoxBlock">
          <input type="text" placeholder="ИНН" />
          <div className="inputsCheckbox">
            <input
              type="checkbox"
              id="checkboxInn"
              placeholder="ФИО"
              className="inputCheckbox"
            />
            <label htmlFor="checkboxInn">Неизвестный ИНН</label>
          </div>
        </div>
        <div className="checkBoxBlock">
          <input type="text" placeholder="Серия и номер паспорта" />
          <div className="inputsCheckbox">
            <input
              type="checkbox"
              id="checkboxPass"
              placeholder="ФИО"
              className="inputCheckbox"
            />
            <label htmlFor="checkboxPass">Неизвестен паспорт</label>
          </div>
        </div>
        <div className="checkBoxBlock">
          <input type="date" placeholder="дата" className="inputDate" />
          <input type="date" placeholder="дата" className="inputDate" />
          <div className="inputsCheckbox">
            <input
              type="checkbox"
              id="checkboxInn"
              placeholder="ФИО"
              className="inputCheckbox"
            />
            <label htmlFor="checkboxInn">
              Не учитывайте срок действие паспорта
            </label>
          </div>
        </div>
        <div className="twoInputs">
          <input type="text" placeholder="Кем выдан*" />
          <input type="text" placeholder="Телефон*" />
        </div>
        <div className="twoInputs">
          <input type="email" placeholder="Электронная почта" />
          <input type="email" placeholder="Второй адрес электронной почты" />
        </div>
        <h3>Адрес</h3>
        <div className="moreInfo">
          <div>
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Страна *'}
            />
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Область *'}
            />
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Район *'}
            />
            <input type="text" placeholder="Город" />
          </div>
          <div>
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Адресный элемент *'}
            />
            <input type="text" placeholder="Улица" />
            <input type="text" placeholder="Номер объекта" />
            <input type="text" placeholder="Буквенный индекс" />
            <input type="text" placeholder="Квартира" />
          </div>
          <div>
            <input type="text" placeholder="Почтовый индекс" />
            <input type="text" placeholder="Описание" />
          </div>
        </div>
        <button className="saveBtn" type="sumbit">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default AddRepresentative;
