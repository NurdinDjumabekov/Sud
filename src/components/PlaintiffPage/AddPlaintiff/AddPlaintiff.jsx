import React from 'react';
import './AddPlaintiff.scss';

const AddPlaintiff = () => {
  const sendData = () => {};
  return (
    <div className="addPlaintiff">
      <h3>Истец</h3>
      <form onSubmit={sendData}>
        <input type="text" placeholder="ФИО" />
        <div className="date">
          <select>
            <option value="" disabled selected hidden>
              Пол*
            </option>
            <option value="" selected>
              Мужской
            </option>
            <option value="" selected>
              Женский
            </option>
          </select>

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
        <div>
          <input type="text" placeholder="ИНН" />
          <div className="inputsCheckbox">
            <input
              type="checkbox"
              id="checkboxDate"
              placeholder="ФИО"
              className="inputCheckbox"
            />
            <label htmlFor="checkboxDate">Неизвестный ИНН</label>
          </div>
        </div>
        <div>
          <input type="text" placeholder="Серия и номер паспорта" />
          <div className="inputsCheckbox">
            <input
              type="checkbox"
              id="checkboxDate"
              placeholder="ФИО"
              className="inputCheckbox"
            />
            <label htmlFor="checkboxDate">Неизвестен паспорт</label>
          </div>
        </div>
        <div>
          <input type="date" placeholder="дата" className="inputDate" />
          <input type="date" placeholder="дата" className="inputDate" />
          <input type="date" placeholder="дата" className="inputDate" />
        </div>
        <div>
          <input type="text" placeholder="Кем выдан*" />
          <input type="text" placeholder="Телефон*" />
        </div>
        <div>
          <input type="email" placeholder="Электронная почта" />
          <input type="email" placeholder="Второй адрес электронной почты" />
        </div>
        <h3>Адрес</h3>
        <div className="moreInfo">
          <div>
            <select>
              <option value="" disabled selected hidden>
                Страна
              </option>
              <option value="" selected>
                Мужской
              </option>
              <option value="" selected>
                Женский
              </option>
            </select>
            <select>
              <option value="" disabled selected hidden>
                Область
              </option>
              <option value="" selected>
                Мужской
              </option>
              <option value="" selected>
                Женский
              </option>
            </select>
            <select>
              <option value="" disabled selected hidden>
                Район
              </option>
              <option value="" selected>
                Мужской
              </option>
              <option value="" selected>
                Женский
              </option>
            </select>
            <input type="text" placeholder="Город" />
          </div>
          <div>
            <select>
              <option value="" disabled selected hidden>
                Адресный элемент
              </option>
              <option value="" selected>
                Мужской
              </option>
              <option value="" selected>
                Женский
              </option>
            </select>
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
      </form>
    </div>
  );
};

export default AddPlaintiff;
