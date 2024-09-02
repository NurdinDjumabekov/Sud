//////// hooks
import React, { useRef, useState } from "react";

/////// style
import "./style.scss";

////// imgs
import img from "../../asstes/icons/arrowBtn.svg";

////// helpers
import { searchNameSelect } from "../../helpers/searchNameSelect";

const MySelects = (props) => {
  const { list, initText, urgently, nameKey, onChangeSel, value } = props;
  const [active, setActive] = useState(false);
  const accordionRef = useRef(null);

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

    document.addEventListener("click", handleChange);

    return () => {
      document.removeEventListener("click", handleChange);
    };
  }, [active]);

  const clickSelect = ({ codeid, name }) => {
    setActive(false);
    onChangeSel(nameKey, name, codeid);
  };

  return (
    <div className="selectBlockMain">
      <h5>
        {initText}
        {urgently ? <b className="required">*</b> : ""}
      </h5>
      <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div
          className="selectBlock__inner"
          onClick={() => setActive((prevState) => !prevState)}
        >
          <p>{searchNameSelect(list, value)}</p>
          <img
            src={img}
            alt="<"
            style={active ? { transform: "rotate(90deg)" } : {}}
          />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {list?.map(({ name, codeid }) => (
              <p onClick={() => clickSelect({ codeid, name })} key={codeid}>
                {name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySelects;
