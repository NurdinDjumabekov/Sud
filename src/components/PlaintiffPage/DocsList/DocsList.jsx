////// hooks
import React from "react";
import { useSelector } from "react-redux";

////// style
import "./style.scss";

///// components
import DocsListInner from "../DocsListInner/DocsListInner";

const DocsList = ({ typerole, typeSide }) => {
  const { plaintiff, plaintiffResper, defendant, defendantResper } =
    useSelector((state) => state.applicationsSlice.todosApplications);

  const options = {
    1: { firstList: plaintiff, secondList: plaintiffResper },
    2: { firstList: defendant, secondList: defendantResper },
  };

  return (
    <DocsListInner
      {...options[typeSide]}
      typerole={typerole}
      typeSide={typeSide}
    />
  );
};

export default DocsList;
