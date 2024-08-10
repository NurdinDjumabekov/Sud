////hooks
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//// pages
import PlaintiffPage from "../pages/PlaintiffPage/PlaintiffPage";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import SignIn from "../pages/Login/SignIn";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import MainLayouts from "../layouts/MainLayouts/MainLayouts";

//// components
import { Preloader } from "../components/Preloader/Preloader";
import Alerts from "../components/Alerts/Alerts";

////fns
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
import MainPage from "../pages/MainPage/MainPage";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { tokenA } = useSelector((state) => state.saveDataSlice);

  React.useEffect(() => {
    if (tokenA === "" || !tokenA) {
      navigate("/");
    }
    /// селекты
    // dispatch(toTakeCountries({ tokenA }));
    // dispatch(toTakeRegions({ tokenA, id: 36 }));
    // dispatch(toTakeDistrict({ tokenA, id: 12 }));
    // dispatch(toTakeTypeAddress(tokenA));
    // dispatch(toTakeTypeOrganiz(tokenA));
    // dispatch(toTakeTypeCompany(tokenA));
    // dispatch(toTakeTypePosition(tokenA));
    // dispatch(toTakeTypeValuta(tokenA));
    // dispatch(toTakeCurrency(tokenA));
    // dispatch(toTakeHaracterS(tokenA));
    // dispatch(toTakePrimPravo(tokenA));
    // dispatch(toTakeReglament(tokenA));
    // dispatch(toTakeLangArbit(tokenA));
    // dispatch(toTakeArbitrsList({ tokenA, search: "" }));
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<MainLayouts />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/create_isk" element={<PlaintiffPage />} />
          <Route path="/notif_user" element={<NotificationPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Alerts />
      <Preloader />
    </>
  );
};

export default MainRoutes;

// typeUser
// 1  Секретарь
// 2  Ответственный секретарь
// 3  Председатель
// 4  Истец
