import "./style.scss";
import { useEffect } from "react";

const MyModals = (props) => {
  const { openModal, children, closeModal, title } = props;
  const closeModalFN = () => closeModal();

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [openModal]);

  if (openModal) {
    return (
      <div className="myModal">
        <div className="myModal__shadow" onClick={closeModalFN}></div>
        <div className="myModal__inner">
          <h6>{title}</h6>
          <button className="krest" onClick={closeModalFN}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="gray"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-6 w-6"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="content">{children}</div>
        </div>
      </div>
    );
  }
};

export default MyModals;
