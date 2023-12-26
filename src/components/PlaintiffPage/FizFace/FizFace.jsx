import React from 'react';
import './FizFace.scss';
import Selects from '../../Selects/Selects';
import { useDispatch, useSelector } from 'react-redux';
import { changeADFF } from '../../../store/reducers/inputSlice';
import { selectArr } from '../../../helpers/dataArr';

const FizFace = ({ typerole }) => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = React.useState({});
  const [type, setType] = React.useState('');
  const sendData = () => {};

  const { adff } = useSelector((state) => state.inputSlice);

  const changeInput = (e) => {
    e.preventDefault();
    dispatch(changeADFF({ ...adff, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    dispatch(changeADFF({ ...adff, sex: type }));
  }, [type]);

  return (
    <div className="addPlaintiffFiz">
      <h3>{typerole === 'истца' ? 'Истец' : 'Ответчик'}</h3>
      <form onSubmit={sendData}>
        <input
          type="text"
          placeholder="ФИО"
          name="name"
          onChange={changeInput}
          value={adff.name}
        />
        <div className="date">
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={'Пол *'}
          />

          <input
            type="date"
            placeholder="дата"
            className="inputDate"
            name="dob"
            onChange={changeInput}
          />

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
          <input
            type="text"
            placeholder="Телефон*"
            name="numberPlaintiff"
            onChange={changeInput}
          />
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
        <button className="saveBtn">Сохранить</button>
      </form>
    </div>
  );
};

export default FizFace;
