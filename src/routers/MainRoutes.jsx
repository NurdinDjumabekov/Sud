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
  getListChoiceArbitr,
  toTakeArbitrsList,
  toTakeCountries,
  toTakeCurrency,
  toTakeDistrict,
  toTakeHaracterS,
  toTakeLangArbit,
  toTakePrimPravo,
  toTakeRegions,
  toTakeReglament,
  toTakeSecretarList,
  toTakeTypeAddress,
  toTakeTypeCompany,
  toTakeTypeOrganiz,
  toTakeTypePosition,
  toTakeTypeValuta,
} from "../store/reducers/selectsSlice";

//// pages
import MainPage from "../pages/MainPage/MainPage";
import { toTakeTypeTypeDocs } from "../store/reducers/applicationsSlice";
import ArchivePage from "../pages/ArchivePage/ArchivePage";
import ArchiveIsksPage from "../pages/ArchiveIsksPage/ArchiveIsksPage";
import SecretarsPage from "../pages/SecretarsPage.jsx/SecretarsPage";
import DocsPage from "../pages/DocsPage/DocsPage";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { applicationList, dataIsk } = useSelector(
    (state) => state.applicationsSlice
  );
  const { aduf, adif } = useSelector((state) => state.inputSlice);

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
    dispatch(toTakeSecretarList());

    dispatch(getListChoiceArbitr());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<MainLayouts />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/create_isk/:id" element={<PlaintiffPage />} />
          <Route path="/history" element={<ArchivePage />} />
          <Route path="/history_isk" element={<ArchiveIsksPage />} />
          <Route path="/secr" element={<SecretarsPage />} />
          <Route path="/docs" element={<DocsPage />} />
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
