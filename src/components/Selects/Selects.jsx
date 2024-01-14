import React from "react";
import "./Selects.scss";
import img from "../../asstes/icons/arrowBtn.svg";
import { useDispatch, useSelector } from "react-redux";
import { changeADFF, changeADUF } from "../../store/reducers/inputSlice";
import { changeTodosApplications } from "../../store/reducers/applicationsSlice";

const Selects = (props) => {
  const { arr, initText, keys, type } = props;
  const dispatch = useDispatch();
  const [active, setActive] = React.useState(false);
  const [name, setName] = React.useState("");
  const accordionRef = React.useRef(null);
  const { adff, aduf } = useSelector((state) => state.inputSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

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

  const clickSelect = (name, id) => {
    setActive(false);
    if (type === "adff") {
      dispatch(changeADFF({ ...adff, [keys.type]: id }));
    } else if (type === "aduf") {
      dispatch(changeADUF({ ...aduf, [keys.type]: id }));
    } else if (type === "todos") {
      dispatch(
        changeTodosApplications({ ...todosApplications, [keys.type]: id })
      );
    }
  };

  React.useEffect(() => {
    for (const i of arr) {
      if (keys?.typeKey === i?.id) {
        setName(i.name);
      }
    }
  }, [keys?.typeKey]);

  // console.log(name, "name");
  return (
    <div className="selectBlockMain">
      <h5>{initText}</h5>
      <div className="selectBlock" id="uniqueSelectID" ref={accordionRef}>
        <div
          className="selectBlock__inner"
          onClick={() => setActive((prevState) => !prevState)}
        >
          <p>{name}</p>
          <img
            src={img}
            alt="<"
            style={active ? { transform: "rotate(90deg)" } : {}}
          />
        </div>
        {active && (
          <div className="selectBlock__activeBlock">
            {arr?.map((sel) => (
              <p onClick={() => clickSelect(sel?.name, sel.id)} key={sel.id}>
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
