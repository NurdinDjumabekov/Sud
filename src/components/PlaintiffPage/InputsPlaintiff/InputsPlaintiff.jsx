import React, { useState } from "react";
import "./InputsPlaintiff.scss";
import PdfFile from "../../PdfFile/PdfFile";
import { useDispatch, useSelector } from "react-redux";
import { changeLookPDF } from "../../../store/reducers/stateSlice";
import Modals from "../../Modals/Modals";

//// imgs
import imsIcon from "../../../asstes/icons/IconPage/archive.svg";
import plaintiffs from "../../../asstes/icons/plaintiff/plaintiff.svg";
import many from "../../../asstes/icons/plaintiff/many.svg";
import description from "../../../asstes/icons/plaintiff/description.svg";
import DataArrPlaintiff from "../DataArrPlaintiff/DataArrPlaintiff";
import FillingPlaintiff from "../FillingPlaintiff/FillingPlaintiff";

const InputsPlaintiff = ({ btnList, setBtnList, indexComp }) => {
  const dispatch = useDispatch();
  const [pdfScreen, setPdfScreen] = useState(false);

  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { plaintiffType } = useSelector((state) => state.typesSlice);
  const { lookPdf, lookAddPlaintiff } = useSelector(
    (state) => state.stateSlice
  );
  // console.log(todosApplications, "todosApplications");

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1530) {
        setPdfScreen(false);
      } else {
        setPdfScreen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="plaintiffData">
      <div className="plantiffBlockMain">
        <React.Fragment key={indexComp}>
          {btnList?.[indexComp]?.components}
        </React.Fragment>
        {pdfScreen && (
          <PdfFile typerole={indexComp === 0 ? "Истец" : "Ответчик"} />
        )}
      </div>
      {/* <Modals
        openModal={lookPdf}
        setOpenModal={() => dispatch(changeLookPDF())}
      >
        <PdfFile
          modal={true}
          typerole={indexComp === 0 ? "Истец" : "Ответчик"}
        />
      </Modals> */}
    </div>
  );
};

export default InputsPlaintiff;
