////hooks
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

////// helpers

//// imgs
import docsImg from "../../asstes/images/docs.jpg";

////// style
import "./style.scss";

const DocsPage = () => {
  const listDocs = [
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
    {
      name: "Исковое Заявление",
      url: "",
    },
  ];

  return (
    <div className="docsPage">
      <div className="docsPage__list">
        {listDocs?.map((i) => (
          <a
            className="every"
            href="http://mttp-renaissance.333.kg/files/w6AWYMtPfUkc36e8UJVlyor6K.pdf"
          >
            <h6>{i?.name}</h6>
            <div>{<img src={docsImg} alt="[]" />}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DocsPage;
