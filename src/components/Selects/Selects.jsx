import React from 'react';
import './Selects.scss';
import img from '../../asstes/icons/arrowBtn.svg';

const Selects = ({ arr, change, choice, initText }) => {
  const [active, setActive] = React.useState(false);
  const accordionRef = React.useRef(null);

  React.useEffect(() => {
    change(arr?.[0]?.name);
  }, []);

  React.useEffect(() => {
    const handleChange = (e) => {
      if (
        active &&
        accordionRef.current &&
        !accordionRef.current.contains(e.target)
      ) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleChange);

    return () => {
      document.removeEventListener('click', handleChange);
    };
  }, [active]);

  const clickSelect = (id, name) => {
    setActive(false);
    change(name);
  };

  return (
    <div className="selectBlockMain">
      <h5>{initText}</h5>
      <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div
          className="selectBlock__inner"
          onClick={() => setActive((prevState) => !prevState)}
        >
          <p>{choice}</p>
          <img
            src={img}
            alt="<"
            style={active ? { transform: 'rotate(90deg)' } : {}}
          />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {arr?.map((sel) => (
              <p onClick={() => clickSelect(sel?.id, sel?.name)} key={sel.id}>
                {sel.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Selects;
