////hooks
import React, { useEffect, useState } from "react";
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
import {
  clearFilesApplicationList,
  getFilter,
} from "../../store/reducers/applicationsSlice";
import { clearDataaIsk } from "../../store/reducers/applicationsSlice";
import { toTakeTypeTypeDocs } from "../../store/reducers/applicationsSlice";
import { notificationCount } from "../../store/reducers/notificationSlice";

///// helpers
import { shortenToTwoWords } from "../../helpers/shortenToTwoWords";
import { listPages } from "../../helpers/dataArr";
import { test } from "../../store/reducers/typesSlice";

const MainLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { tokenA, typeUser } = useSelector((state) => state.saveDataSlice);

  const decodedToken = jwtDecode(tokenA);

  const { notifCount } = useSelector((state) => state.notificationSlice);

  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(location.pathname);
    /////меняю активную страницу
  }, [location.pathname]);

  useEffect(() => {
    dispatch(toTakeTypeTypeDocs(tokenA));
    dispatch(notificationCount(tokenA));
  }, []);

  const allPage = listPages?.filter((i) => !(typeUser == 3 && i.id === 2));
  ///// для председателя, убираю страницу создания иска

  const clickLogo = () => navigate("/main");
  ////// клик на лого и переход всегда на главную страницу

  const clickMenu = ({ path }) => {
    navigate(path);
    //// перехожу по страницам
    dispatch(clearDataaIsk());
    /// сбрасываю state для хранения данных иска
    dispatch(clearFilesApplicationList([]));
    /// сбрасываю state для хранения файлов иска
  };

  return (
    <div className="plaintiffBlock">
      <div className="plaintiffBlock__menu">
        <div className="logo" onClick={clickLogo}>
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
        {allPage?.map((page) => (
          <ul key={page.id} className="everyPage">
            <li
              onClick={() => clickMenu(page)}
              className={active == page.path ? "activePage" : ""}
            >
              <div className="everyPage__inner">
                <img
                  src={active == page.path ? page.iconWhite : page.icon}
                  alt="иконка"
                  className="imgIcon"
                  style={page?.size}
                />
                <p>
                  {page?.name}
                  {page?.count && (
                    <button className="notifNums">{notifCount || 0}</button>
                  )}
                </p>
              </div>
            </li>
          </ul>
        ))}
        <LogOut />
      </div>
      <div className="contents">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayouts;
