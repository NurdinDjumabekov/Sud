import React from 'react';
import ExampleBlock from '../../ExampleBlock/ExampleBlock';

const ClaimRequaire = () => {
  return (
    <div className="plaintiFilling__container">
      <div className="descriptionClaim">
        <ExampleBlock
          text={'Пример названия и описания иска должен быть таким-то'}
          typeText={'Пример исковых требований'}
        />
        <form>
          <div>
            <label htmlFor="name">Исковые требования</label>
            <textarea name="" id="name"></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimRequaire;
