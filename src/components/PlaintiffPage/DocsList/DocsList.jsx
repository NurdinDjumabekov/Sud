import React from "react";
import "./DocsList.scss";
import { useSelector } from "react-redux";
import DocsListInner from "../DocsListInner/DocsListInner";
/// imgs
import editBtn from "../../../asstes/icons/editBtn.svg";
import deleteBtn from "../../../asstes/icons/deleteBtn.svg";

const DocsList = ({ typerole }) => {
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  // console.log(typerole, "typerole");
  if (typerole === "истца") {
    return (
      <DocsListInner
        arr={todosApplications?.plaintiff}
        arr2={todosApplications?.plaintiffResper}
        typerole={typerole}
      />
    );
  } else if (typerole === "ответчика") {
    return (
      <DocsListInner
        arr={todosApplications?.defendant}
        arr2={todosApplications?.defendantResper}
        typerole={typerole}
      />
    );
  }
};

export default DocsList;
