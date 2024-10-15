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
import { toTakeTypeTypeDocs } from "../store/reducers/applicationsSlice";
import { jwtDecode } from "jwt-decode";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList, dataIsk } = useSelector(
    (state) => state.applicationsSlice
  );
  const { aduf, adif } = useSelector((state) => state.inputSlice);

  // console.log(aduf, "aduf");
  // console.log(adif, "adif");

  // const decodedToken = jwtDecode(tokenA);

  // console.log(decodedToken);

  // console.log(dataIsk, "dataIsk");

  React.useEffect(() => {
    if (tokenA === "" || !!!tokenA) {
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

    dispatch(toTakeArbitrsList());

    dispatch(toTakeTypeTypeDocs());
    ///// get список документов, которые нужны для заполнения иска (просто текста)
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<MainLayouts />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/create_isk/:id" element={<PlaintiffPage />} />
          {/* <Route path="/notif_user" element={<NotificationPage />} /> */}
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
