import React from 'react';
import ExampleBlock from '../../ExampleBlock/ExampleBlock';
import './DescriptionClaim.scss';

const DescriptionClaim = () => {
  return (
    <div className="plaintiFilling__container">
      <div className="descriptionClaim">
        <ExampleBlock
          text={'Пример названия и описания иска должен быть таким-то'}
          typeText={' Пример названия и описания иска'}
        />
        <form>
          <div>
            <label htmlFor="name">Название иска</label>
            <textarea name="" id="name"></textarea>
          </div>
          <div>
            <label htmlFor="description">Описание иска</label>
            <textarea id="description" name=""></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DescriptionClaim;
