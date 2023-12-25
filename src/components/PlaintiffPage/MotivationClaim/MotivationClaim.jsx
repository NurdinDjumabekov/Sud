import React from 'react';
import ExampleBlock from '../../ExampleBlock/ExampleBlock';

const MotivationClaim = () => {
  return (
    <div className="plaintiFilling__container">
      <div className="descriptionClaim">
        <ExampleBlock
          text={'Пример названия и описания иска должен быть таким-то'}
          typeText={'Пример мотивационная части иска'}
        />
        <form>
          <div>
            <label htmlFor="name">Мотивационная часть</label>
            <textarea name="" id="name"></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MotivationClaim;
