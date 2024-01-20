import React from "react";
import { Route, Routes } from "react-router-dom";
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

function MainRoutes() {
  const dispatch = useDispatch();
  const { preloader, listTodos } = useSelector((state) => state.sendDocsSlice);
  const { preloaderSel } = useSelector((state) => state.selectsSlice);
  const { adff, aduf } = useSelector((state) => state.inputSlice);
  const { todosApplications, applicationList } = useSelector(
    (state) => state.applicationsSlice
  );

  const userType = 2;

  // console.log(tokenA);
  // console.log(todosApplications, "todosApplications");
  // console.log(adff, "adff");
  // console.log(aduf, "aduf");
  // console.log(applicationList, "applicationList");
  // console.log(listTodos, "listTodos");

  let userRoutes;

  // 1  Секретарь
  // 2  Ответственный секретарь
  // 3  Председатель
  // 4  Истец

  if (userType === 1) {
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
  } else if (userType === 2) {
    userRoutes = (
      <Route element={<LayoutsRS />}>
        <Route path="/mainPlaintiff" element={<MainPage />} />
        <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        <Route path="/calTodoPlaintiff" element={<CalendarTodoPage />} />
        <Route path="/meetingsPlaintiff" element={<CalendarMeetings />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
    );
  } else if (userType === 3) {
    userRoutes = <Route element={<MainLayouts />}></Route>;
  } else if (userType === 4) {
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

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        {userRoutes}
      </Routes>
      <MoreInfo />
      {preloader && <Preloader />}
      {preloaderSel && <Preloader />}
      <Alerts />
    </>
  );
}

export default MainRoutes;
