import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import PlaintiffPage from "../pages/PlaintiffPage/PlaintiffPage";
import MainPage from "../pages/mainpage/MainPage";
import SignIn from "../pages/login/SignIn";
import NotificationPage from "../pages/NotificationPage/NotificationPage";
import CalendarTodoPage from "../pages/CalendarTodoPage/CalendarTodoPage";
import CalendarMeetings from "../pages/CalendarMeetings/CalendarMeetings";
import ArchivePage from "../pages/ArchivePage/ArchivePage";
import { Preloader } from "../components/Preloader/Preloader";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts/Alerts";
import MoreInfo from "../components/MoreInfo/MoreInfo";
import LayoutsRS from "../layouts/LayoutsRS/LayoutsRS";

//// для ответственного секретаря
import { MainPageRS } from "../components/ResponsibleSecr/MainPageRS/MainPageRS";
import LayoutsPred from "../layouts/LayoutsPred/LayoutsPred";
import { MainPagePred } from "../components/ChairmanPred/MainPagePred/MainPagePred";

function MainRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { preloader } = useSelector((state) => state.sendDocsSlice);
  const { preloaderSel } = useSelector((state) => state.selectsSlice);
  const { loadingAuth } = useSelector((state) => state.authSlice);
  const { typeUser } = useSelector((state) => state.saveDataSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);

  // 1  Секретарь
  // 2  Ответственный секретарь
  // 3  Председатель
  // 4  Истец
  let userRoutes;
  if (+typeUser === 1) {
    userRoutes = (
      <Route element={<MainLayouts />}>
        <Route path="/mainPlaintiff" element={<MainPage />} />
        <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        {/* <Route path="/calTodoPlaintiff" element={<CalendarTodoPage />} />
        <Route path="/meetingsPlaintiff" element={<CalendarMeetings />} />
        <Route path="/archive" element={<ArchivePage />} /> */}
      </Route>
    );
  } else if (+typeUser === 2) {
    userRoutes = (
      <Route element={<LayoutsRS />}>
        <Route path="/mainRespSec" element={<MainPageRS />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
    );
  } else if (+typeUser === 3) {
    userRoutes = (
      <Route element={<LayoutsPred />}>
        <Route path="/mainRespPred" element={<MainPagePred />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
    );
  } else if (+typeUser === 4) {
    userRoutes = (
      <Route element={<MainLayouts />}>
        <Route path="/mainPlaintiff" element={<MainPage />} />
        <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        <Route path="/calTodoPlaintiff" element={<CalendarTodoPage />} />
        <Route path="/meetingsPlaintiff" element={<CalendarMeetings />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
    );
  }

  React.useEffect(() => {
    if (tokenA === "" || !tokenA) {
      navigate("/");
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {userRoutes}
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
