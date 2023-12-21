import React from 'react';
import Selects from '../../Selects/Selects';
import './TargetPlaintiff.scss';
import Requisites from '../../Requisites/Requisites';
import Calculator from '../../Calculator/Calculator';
import ExampleBlock from '../../ExampleBlock/ExampleBlock';

const TargetPlaintiff = () => {
  const [type, setType] = React.useState('');
  const [btnSend, setBtnSend] = React.useState(true);

  const sendData = () => {};

  const selectArr = [
    { id: 0, name: 'Мужской' },
    { id: 1, name: 'Женский' },
  ];

  return (
    <div className="plaintiFilling__container">
      <div className="targetPlaintiff">
        <div>
          <input type="text" placeholder="сумма иска" name="" />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={'Фунт'}
          />
          <input type="text" name="" placeholder="арбитр. сбор" />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={'Валюта арбитра'}
          />
        </div>
        <div>
          <input type="text" placeholder="Рег. сбор" name="" />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={'фунт'}
          />
          <input type="text" placeholder="сумма доплаты" name="" />
          <Selects
            arr={selectArr}
            change={setType}
            choice={type}
            initText={'валюта надбавок'}
          />
        </div>
        <div className="dataTarget">
          <label>
            <p>Крайний срок уплаты арбитражного сбора *</p>
            <input type="date" placeholder="дата" className="inputDate" />
          </label>
          <label>
            <p>Красный срок доплаты арбитражного сбора *</p>
            <input type="date" placeholder="дата" className="inputDate" />
          </label>
        </div>

        <div className="btnsDataSum">
          <button
            className={btnSend ? 'activeBtns' : ''}
            onClick={() => setBtnSend(true)}
          >
            Реквизины
          </button>
          <button
            className={btnSend ? '' : 'activeBtns'}
            onClick={() => setBtnSend(false)}
          >
            Калькулятор
          </button>
        </div>
        {btnSend ? <Requisites /> : <Calculator />}
      </div>
    </div>
  );
};

export default TargetPlaintiff;
