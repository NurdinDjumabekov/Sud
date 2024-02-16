import React from "react";
import "./ChoiceArbitrsPred.scss";

const ChoiceArbitrsPred = () => {
  const [arbitrs, setArbitrs] = React.useState(false);
  return (
    <>
      <button onClick={() => setArbitrs(true)}>Арбитры</button>
      {arbitrs && (
        <div className="choiceArbitrs">
          <button>Скоро будут Арбитры</button>
          <button onClick={() => setArbitrs(false)}>Закрыть</button>
        </div>
      )}
    </>
  );
};

export default ChoiceArbitrsPred;
