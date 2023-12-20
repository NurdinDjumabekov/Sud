import React from 'react';
import Selects from '../Selects/Selects';
import './Calculator.scss';

const Calculator = () => {
  const [type, setType] = React.useState('');

  const selectArr = [
    { id: 0, name: 'Мужской' },
    { id: 1, name: 'Женский' },
  ];
  return (
    <div className="calculator">
      <div className="calculator__count">
        <label>
          <p>Сумма иска в USD</p>
          <input type="number" name="" />
        </label>
        <Selects
          arr={selectArr}
          change={setType}
          choice={type}
          initText={'Тип спора'}
        />
        <button>Расчитать</button>
      </div>
      <div className="calculator__result">
        <div>
          <h5>Сбор</h5>
          <div>
            <h5>Сумма Обычный регламент единоличный арбитр (-30%)</h5>
            <h5> Обычный регламент</h5>
          </div>
        </div>
        <div className='tablesresult'>
          <div>
            <p>Регистрационный (c НДС 12% и налогом с продаж 2%) $0 </p>
          </div>
          <div>
            <p>Арбитражный (c НДС 12% и налогом с продаж 2%)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
