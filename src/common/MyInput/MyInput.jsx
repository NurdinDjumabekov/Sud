import React from "react";

import "./style.scss";

const MyInput = (props) => {
  const { changeInput, value, required, title } = props;
  const { name, type, placeholder } = props;
  return (
    <div className="everyInput">
      <p>
        {title} {required && <b className="required">*</b>}
      </p>
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        onChange={changeInput}
        value={value}
        required={required}
      />
    </div>
  );
};

export default MyInput;
