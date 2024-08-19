import { useEffect } from "react";
import "./Modals.scss";
import krestIcon from "../../asstes/icons/krestik.svg";

const Modals = ({ openModal, children, setOpenModal, krest }) => {
  const closeModal = () => setOpenModal(false);

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
      <div className="modal">
        <div className="modal__shadow" onClick={closeModal}></div>
        <div className="modal__inner">
          {children}
          {!krest && (
            <button className="krest" onClick={closeModal}>
              <img src={krestIcon} alt="x" />
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Modals;
