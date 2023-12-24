import React from 'react';
import './UrFace.scss';
import Selects from '../../Selects/Selects';

const UrFace = ({ typerole }) => {
  const [type, setType] = React.useState('');
  const selectArr = [
    { id: 0, name: 'Мужской' },
    { id: 1, name: 'Женский' },
  ];
  const [typeCompany, setTypeCompany] = React.useState(true);
  const send = () => {};
  return (
    <form onSubmit={send} className="urFace">
      <div>
        <input type="text" placeholder="Название *" />
        <input type="date" placeholder="Дата первичной регистрации" />
      </div>
      <div>
        <input type="text" placeholder="ИНН" />
        <input type="text" placeholder="ОКПО" />
      </div>
      <div>
        <input type="text" placeholder="Электронная почта" />
        <input type="text" placeholder="Второй адрес электронной почты" />
      </div>
      <input type="text" placeholder="Номер телефона" />
      <div className="selectsBlock">
        <Selects
          arr={selectArr}
          change={setType}
          choice={type}
          initText={'Вид организационно-правовой нормы'}
        />
        <Selects
          arr={selectArr}
          change={setType}
          choice={type}
          initText={'Тип компании'}
        />
        <Selects
          arr={selectArr}
          change={setType}
          choice={type}
          initText={'Страна'}
        />
      </div>
      <div className="btnsCompany">
        <span
          className={typeCompany ? 'activeBtn' : ''}
          onClick={() => setTypeCompany(true)}
        >
          Руководитель компании
        </span>
        <span
          className={typeCompany ? '' : 'activeBtn'}
          onClick={() => setTypeCompany(false)}
        >
          Адрес компании
        </span>
      </div>
      {typeCompany ? (
        <>
          <div className="dataBlock">
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Должность в компании'}
            />
            <input type="date" placeholder="Дата назначения" />
            <input type="date" placeholder="Дата истечения" />
          </div>
          <input
            type="text"
            placeholder="ФИО руководителя"
            className="mainFIO"
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </form>
  );
};

export default UrFace;
