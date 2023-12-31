import React from "react";
import "./Selects.scss";
import img from "../../asstes/icons/arrowBtn.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF, changeADUF } from "../../store/reducers/inputSlice";

const Selects = (props) => {
  const { arr, initText, keys, type } = props;
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(false);
  const accordionRef = React.useRef(null);
  const { adff, aduf } = useSelector((state) => state.inputSlice);

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

  const clickSelect = (name) => {
    setActive(false);
    if (type === "adff") {
      dispatch(changeADFF({ ...adff, [keys.type]: name }));
    } else {
      dispatch(changeADUF({ ...aduf, [keys.type]: name }));
    }
  };

  return (
    <div className="selectBlockMain">
      <h5>{initText}</h5>
      <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div
          className="selectBlock__inner"
          onClick={() => setActive((prevState) => !prevState)}
        >
          <p>{keys.typeKey}</p>
          <img
            src={img}
            alt="<"
            style={active ? { transform: "rotate(90deg)" } : {}}
          />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {arr?.map((sel) => (
              <p onClick={() => clickSelect(sel?.name)} key={sel.id}>
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
