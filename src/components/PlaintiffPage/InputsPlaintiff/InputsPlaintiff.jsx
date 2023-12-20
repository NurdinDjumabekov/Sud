import React, { useState } from 'react';
import './InputsPlaintiff.scss';
import FillingPlaintiff from '../FillingPlaintiff/FillingPlaintiff';
import TargetPlaintiff from '../TargetPlaintiff/TargetPlaintiff';

const InputsPlaintiff = () => {
  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: 'Истец',
      bool: false,
      components: <FillingPlaintiff typerole={'истца'} />,
    },
    {
      id: 2,
      name: 'Ответчик',
      bool: false,
      components: <FillingPlaintiff typerole={'Ответчика'} />,
    },
    {
      id: 3,
      name: 'Цена иска',
      bool: true,
      components: <TargetPlaintiff />,
    },
    {
      id: 4,
      name: 'Описание',
      bool: false,
    },
    {
      id: 5,
      name: 'Мотивационная часть',
      bool: false,
    },
    {
      id: 6,
      name: 'Обоснование',
      bool: false,
    },
    {
      id: 7,
      name: 'Финансовый расчет',
      bool: false,
    },
    {
      id: 8,
      name: 'Общая информация',
      bool: false,
    },

    {
      id: 9,
      name: 'Ссылка на законы',
      bool: false,
    },

    {
      id: 10,
      name: 'Исковые требования',
      bool: false,
    },
    {
      id: 11,
      name: 'Приложения',
      bool: false,
    },
    {
      id: 12,
      name: 'Опись документов',
      bool: false,
    },
  ]);

  const [indexComp, setIndexComp] = useState(0);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? !item.bool : false,
      };
    });

    setBtnList(newList);
    const activeIndex = newList.findIndex((item) => item.bool);
    setIndexComp(activeIndex);
  };

  // console.log(indexComp, 'indexComp');

  // <ExampleBlock
  //   text={'nurdin nurdin adkjlalkjdk jasdljas'}
  //   typeText={'klasdjask jdasjdjalsjdljasld jalsjdkljasldjaslklads'}
  // />;

  return (
    <div className="plaintiffData">
      <ul className="plaintiffData__list">
        {btnList?.map((btn) => (
          <li key={btn.id}>
            <button
              className={btn?.bool ? 'activeBtn' : ''}
              onClick={() => clickBtn(btn.id)}
            >
              {btn.name}
            </button>
          </li>
        ))}
      </ul>
      {/* <>{btnList?.[2]?.components}</> */}
      <>{btnList?.[indexComp]?.components}</>
    </div>
  );
};

export default InputsPlaintiff;
