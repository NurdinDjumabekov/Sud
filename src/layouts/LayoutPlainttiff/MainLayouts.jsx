import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LogOut from "../../components/LogOut/LogOut";
import "./MainLayouts.scss";
import { jwtDecode } from "jwt-decode";

////// imgsBlack
import myIski from "../../asstes/icons/IconPage/me_iski.svg";
import notif from "../../asstes/icons/IconPage/notification.svg";
import create from "../../asstes/icons/IconPage/create.svg";
////
import myIskiWhite from "../../asstes/icons/IconPageWhite/me_iski.svg";
import notifWhite from "../../asstes/icons/IconPageWhite/notification.svg";
import createWhite from "../../asstes/icons/IconPageWhite/create.svg";

import faceImg from "../../asstes/icons/plaintiff/fiz_face.svg";
import logo from "../../asstes/images/logo.png";

import { useDispatch, useSelector } from "react-redux";
import { toTakeTypeTypeDocs } from "../../store/reducers/applicationsSlice";
import { toTakeIsksList } from "../../store/reducers/sendDocsSlice";
import { notificationCount } from "../../store/reducers/notificationSlice";
import { shortenToTwoWords } from "../../helpers/shortenToTwoWords";

const MainLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [lookInnerPages, setLookInnerPages] = useState(false);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { notifCount } = useSelector((state) => state.notificationSlice);

  const [pages, setPages] = useState([
    {
      id: 1,
      name: "Все иски",
      path: "/mainPlaintiff",
      bool: true,
      icon: myIski,
      iconWhite: myIskiWhite,
    },
    {
      id: 2,
      name: "Создать черновик",
      path: "/plaintiffCreate",
      bool: false,
      icon: create,
      iconWhite: createWhite,
    },
    {
      id: 3,
      name: "Уведомления",
      path: "/notifPlaintiff",
      bool: false,
      icon: notif,
      iconWhite: notifWhite,
      count: true,
    },
    // {
    //   id: 4,
    //   name: "Календарь дел",
    //   path: "/calTodoPlaintiff",
    //   bool: false,
    //   icon: meetingsPlaintiff,
    //   iconWhite: meetingsPlaintiffWhite,
    // },
    // {
    //   id: 5,
    //   name: "Календарь заседаний",
    //   path: "/meetingsPlaintiff",
    //   bool: false,
    //   icon: calTodoPlaintiff,
    //   iconWhite: calTodoPlaintiffWhite,
    // },
    // {
    //   id: 6,
    //   name: "Архив дел",
    //   path: "/archive",
    //   bool: false,
    //   icon: archive,
    //   iconWhite: archiveWhite,
    // },
  ]);

  React.useEffect(() => {
    setPages(
      pages.map((i) => ({
        ...i,
        bool: i.path === location.pathname,
      }))
    );
    setLookInnerPages(location.pathname === "/mainPlaintiff");
  }, [location.pathname]);

  React.useEffect(() => {
    dispatch(toTakeIsksList({ tokenA, id: "5" }));
    dispatch(toTakeTypeTypeDocs(tokenA));
    dispatch(notificationCount(tokenA));
  }, []);

  const clickMenu = (page) => {
    navigate(page.path);
    setLookInnerPages(!lookInnerPages);
  };

  const decodedToken = jwtDecode(tokenA);

  const checkCreate = location.pathname === "/plaintiffCreate";

  return (
    <div className="plaintiffBlock">
      <div className="plaintiffBlock__inner">
        <div className="logo" onClick={() => navigate("/mainPlaintiff")}>
          <img src={logo} alt="logo" />
        </div>
        <p className="moreInfoMenu">{decodedToken?.name}</p>
        <div className="mainUser">
          <button>
            <img
              src={faceImg}
              alt="иконка"
              className="imgIcon"
              style={{ width: "23px", height: "23px" }}
            />
            <span>{shortenToTwoWords(decodedToken?.fio)}</span>
          </button>
        </div>
        <p className="moreInfoMenu">Меню</p>
        {pages?.map((page) => (
          <div key={page.id}>
            <button
              onClick={() => clickMenu(page)}
              className={page.bool ? "activePage" : ""}
            >
              <div>
                <img
                  src={page.bool ? page.iconWhite : page.icon}
                  alt="иконка"
                  className={`${"imgIcon"} ${
                    (page.id === 4 || page.id === 6) && "size20"
                  }`}
                />
                <p>
                  {page.name}
                  {page?.count && (
                    <button className="notifNums">{notifCount || 0}</button>
                  )}
                </p>
              </div>
            </button>
          </div>
        ))}
        <LogOut />
      </div>
      <div
        className={`${"plaintiffBlock__content"} ${
          checkCreate && "positionStart"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
