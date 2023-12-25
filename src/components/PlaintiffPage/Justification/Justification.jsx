import React from 'react';
import ExampleBlock from '../../ExampleBlock/ExampleBlock';

const Justification = () => {
  return (
    <div className="plaintiFilling__container">
      <div className="descriptionClaim">
        <ExampleBlock
          text={'Пример названия и описания иска должен быть таким-то'}
          typeText={'Пример обоснования'}
        />
        <form>
          <div>
            <label htmlFor="name">Обоснование</label>
            <textarea name="" id="name"></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Justification;
