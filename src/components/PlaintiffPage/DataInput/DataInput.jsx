// import React, { useState } from "react";
// import "./DataInput.scss";

// const DataInput = ({ props, dispatch }) => {
//   //   console.log(props.keyData);
//   const [inputData, setInputData] = useState("");
//   return (
//     <>
//       <div className="date__inner">
//         <p>{props.title}</p>
//         <input
//           type="text"
//           placeholder={props.placeholder}
//           className="inputDate"
//           name={props.nameInput}
//           onChange={props?.change}
//           //   readOnly
//           value={props.keyData}
//         />
//       </div>
//       <input type="date" placeholder="дата" className="inputDate" name="dob" />
//     </>
//   );
// };

// export default DataInput;

import React, { useState } from "react";
import "./DataInput.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const YourComponent = ({ props }) => {
  //   const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  // формат 15/01/2024

  return (
    <div className="date__inner">
      <p>{props.title}</p>
      {/* <input
        type="text"
        placeholder={props.placeholder}
        className="inputDate"
        name={props.nameInput}
        onChange={props?.change}
        //   readOnly
        value={props.keyData}
      /> */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Выберите дату"
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default YourComponent;
