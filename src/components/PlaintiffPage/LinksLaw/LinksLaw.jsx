import React from 'react';
import ExampleBlock from '../../ExampleBlock/ExampleBlock';

const LinksLaw = () => {
  return (
    <div className="plaintiFilling__container">
      <div className="descriptionClaim">
        <ExampleBlock
          text={'Пример названия и описания иска должен быть таким-то'}
          typeText={'Пример cсылки на законы'}
        />
        <form>
          <div>
            <label htmlFor="name">Ссылка на законы</label>
            <textarea name="" id="name"></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinksLaw;
