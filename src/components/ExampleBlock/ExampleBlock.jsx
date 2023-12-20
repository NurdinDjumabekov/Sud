import React from 'react';
import './ExampleBlock.scss';

const ExampleBlock = ({ text, typeText }) => {
  return (
    <div className="exampleBlock">
      <h5>{typeText}</h5>
      <p>{text}</p>
    </div>
  );
};

export default ExampleBlock;
