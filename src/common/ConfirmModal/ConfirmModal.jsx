import React from "react";

////// style
import "./style.scss";
import MyModals from "../MyModals/MyModals";

const ConfirmModal = (props) => {
  const { openModal, no, yes, title } = props;

  const accept = () => {
    yes();
    no();
  };

  return (
    <div className="confirmModal">
      <MyModals openModal={openModal} closeModal={no} title={title}>
        <div className="confirmModal__inner">
          <button onClick={no}>Нет</button>
          <button onClick={accept}>Да</button>
        </div>
      </MyModals>
    </div>
  );
};

export default ConfirmModal;
