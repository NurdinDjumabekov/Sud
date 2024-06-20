////hooks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

/////components
import LogOut from "../../components/LogOut/LogOut";

/////style
import "./MainLayouts.scss";

import { jwtDecode } from "jwt-decode";

////imgs
import faceImg from "../../asstes/icons/plaintiff/fiz_face.svg";
import logo from "../../asstes/images/logo.png";

///// store
import { toTakeTypeTypeDocs } from "../../store/reducers/applicationsSlice";
import { notificationCount } from "../../store/reducers/notificationSlice";
import { changeActivePage } from "../../store/reducers/typesSlice";

///// helpers
import { shortenToTwoWords } from "../../helpers/shortenToTwoWords";

const MainLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  const { notifCount } = useSelector((state) => state.notificationSlice);

  const { pages } = useSelector((state) => state.typesSlice);

  useEffect(() => {
    dispatch(changeActivePage({ path: location.pathname }));
    /////меняю активную страницу
  }, [location.pathname]);

  useEffect(() => {
    dispatch(toTakeTypeTypeDocs(tokenA));
    dispatch(notificationCount(tokenA));
  }, []);

  const clickMenu = ({ path }) => navigate(path); //// перехожу по страницам

  const decodedToken = jwtDecode(tokenA);

  return (
    <div className="plaintiffBlock">
      <div className="plaintiffBlock__menu">
        <div className="logo" onClick={() => navigate("/main")}>
          <img src={logo} alt="logo" />
        </div>
        <p className="title">{decodedToken?.name}</p>
        <div className="infoUser">
          <button>
            <img src={faceImg} alt="иконка" className="imgIcon" />
            <span>{shortenToTwoWords(decodedToken?.fio)}</span>
          </button>
        </div>
        <p className="title">Меню</p>
        {pages?.map((page) => (
          <div key={page.id} className="everyPage">
            <button
              onClick={() => clickMenu(page)}
              className={page.bool ? "activePage" : ""}
            >
              <div className="everyPage__inner">
                <img
                  src={page.bool ? page.iconWhite : page.icon}
                  alt="иконка"
                  className="imgIcon"
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
      <div className={`contents`}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
