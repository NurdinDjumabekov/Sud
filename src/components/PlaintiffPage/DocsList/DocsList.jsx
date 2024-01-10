import React from "react";
import "./DocsList.scss";
import { useSelector } from "react-redux";
import DocsListInner from "../DocsListInner/DocsListInner";
/// imgs
import editBtn from "../../../asstes/icons/editBtn.svg";
import deleteBtn from "../../../asstes/icons/deleteBtn.svg";

const DocsList = ({ typerole }) => {
  const { todosApplications } = useSelector((state) => state.applicationsSlice);

  if (typerole === "истца") {
    return (
      <DocsListInner
        arr={todosApplications?.plaitiff}
        arr2={todosApplications?.plaitiffResper}
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
