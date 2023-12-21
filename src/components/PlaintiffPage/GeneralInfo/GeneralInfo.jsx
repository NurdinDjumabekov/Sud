import React from 'react';
import './GeneralInfo.scss';
import Selects from '../../Selects/Selects';

const GeneralInfo = () => {
  const [type, setType] = React.useState('');
  const selectArr = [
    { id: 0, name: 'Мужской' },
    { id: 1, name: 'Женский' },
  ];
  return (
    <div className="plaintiFilling__container">
      <div className="generalInfo">
        <form>
          <div className="blockSelects">
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Применимое право'}
            />
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Простой 1 арбитр'}
            />
          </div>
          <div className="blockSelects">
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Расторжение договора'}
            />
            <Selects
              arr={selectArr}
              change={setType}
              choice={type}
              initText={'Язык арбитража'}
            />
          </div>
          <div className="blockCheckBox">
            <input type="checkbox" id="lab" />
            <label htmlFor="lab">Выбрать арбитра по договору</label>
          </div>
          <button className="saveBtn">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default GeneralInfo;
