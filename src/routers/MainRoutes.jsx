import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PlaintiffPage from "../pages/PlaintiffPage/PlaintiffPage";
import MainLayouts from "../layouts/LayoutPlainttiff/MainLayouts";
import MainPage from "../pages/MainPage/MainPage";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import { Preloader } from "../components/Preloader/Preloader";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts/Alerts";
import MoreInfo from "../components/MoreInfo/MoreInfo";
import LayoutsRS from "../layouts/LayoutsRS/LayoutsRS";

//// для ответственного секретаря
import { MainPageRS } from "../components/ResponsibleSecr/MainPageRS/MainPageRS";
import LayoutsPred from "../layouts/LayoutsPred/LayoutsPred";
import { MainPagePred } from "../components/ChairmanPred/MainPagePred/MainPagePred";
import SignIn from "../pages/Login/SignIn";
import {
  toTakeArbitrsList,
  toTakeCountries,
  toTakeCurrency,
  toTakeDistrict,
  toTakeHaracterS,
  toTakeLangArbit,
  toTakePrimPravo,
  toTakeRegions,
  toTakeReglament,
  toTakeTypeAddress,
  toTakeTypeCompany,
  toTakeTypeOrganiz,
  toTakeTypePosition,
  toTakeTypeValuta,
} from "../store/reducers/selectsSlice";
import LayoutsSS from "../layouts/LayoutsSS/LayoutsSS";
import { MainPageSS } from "../components/SimpleSecr/MainPageSS/MainPageSS";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

function MainRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { preloader } = useSelector((state) => state.sendDocsSlice);
  const { preloaderSel } = useSelector((state) => state.selectsSlice);
  const { loadingAuth } = useSelector((state) => state.authSlice);
  const { typeUser } = useSelector((state) => state.saveDataSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  // const { todosApplications } = useSelector((state) => state.applicationsSlice);
  // console.log(todosApplications, "todosApplications");

  // 1  Секретарь
  // 2  Ответственный секретарь
  // 3  Председатель
  // 4  Истец
  let userRoutes;
  if (+typeUser === 1) {
    userRoutes = (
      <Route element={<LayoutsSS />}>
        <Route path="/mainSimpSecr" element={<MainPageSS />} />
        <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        {/* <Route path="/archive" element={<ArchivePage />} /> */}
      </Route>
    );
  } else if (+typeUser === 2) {
    userRoutes = (
      <Route element={<LayoutsRS />}>
        <Route path="/mainRespSec" element={<MainPageRS />} />
        <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        {/* <Route path="/archive" element={<ArchivePage />} /> */}
      </Route>
    );
  } else if (+typeUser === 3) {
    userRoutes = (
      <Route element={<LayoutsPred />}>
        <Route path="/mainRespPred" element={<MainPagePred />} />
        <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        {/* <Route path="/archive" element={<ArchivePage />} /> */}
      </Route>
    );
  } else if (+typeUser === 4) {
    userRoutes = (
      <Route element={<MainLayouts />}>
        <Route path="/mainPlaintiff" element={<MainPage />} />
        <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
      </Route>
    );
  }

  React.useEffect(() => {
    if (tokenA === "" || !tokenA) {
      navigate("/");
    }
    /// селекты
    dispatch(toTakeCountries({ tokenA }));
    dispatch(toTakeRegions({ tokenA, id: 36 }));
    dispatch(toTakeDistrict({ tokenA, id: 12 }));
    dispatch(toTakeTypeAddress(tokenA));
    dispatch(toTakeTypeOrganiz(tokenA));
    dispatch(toTakeTypeCompany(tokenA));
    dispatch(toTakeTypePosition(tokenA));
    dispatch(toTakeTypeValuta(tokenA));
    dispatch(toTakeCurrency(tokenA));
    dispatch(toTakeHaracterS(tokenA));
    dispatch(toTakePrimPravo(tokenA));
    dispatch(toTakeReglament(tokenA));
    dispatch(toTakeLangArbit(tokenA));
    dispatch(toTakeArbitrsList(tokenA));
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {userRoutes}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <MoreInfo />
      {preloader && <Preloader />}
      {preloaderSel && <Preloader />}
      {loadingAuth && <Preloader />}
      <Alerts />
    </>
  );
}

export default MainRoutes;
