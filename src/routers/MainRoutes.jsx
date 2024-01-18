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
import { useSelector } from "react-redux";
import Alerts from "../components/Alerts/Alerts";

function MainRoutes() {
  const { preloader } = useSelector((state) => state.sendDocsSlice);
  const { preloaderSel } = useSelector((state) => state.selectsSlice);
  const { todosApplications } = useSelector((state) => state.applicationsSlice);
  const { tokenA } = useSelector((state) => state.saveDataSlice);
  const { adff, aduf } = useSelector((state) => state.inputSlice);
  // console.log(tokenA);
  console.log(todosApplications, "todosApplications");
  console.log(adff, "adff");
  // console.log(aduf, "aduf");

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<MainLayouts />}>
          <Route path="/mainPlaintiff" element={<MainPage />} />
          <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
          <Route path="/notifPlaintiff" element={<NotificationPage />} />
          <Route path="/calTodoPlaintiff" element={<CalendarTodoPage />} />
          <Route path="/meetingsPlaintiff" element={<CalendarMeetings />} />
          <Route path="/archive" element={<ArchivePage />} />
        </Route>
      </Routes>
      {preloader && <Preloader />}
      {preloaderSel && <Preloader />}
      <Alerts />
    </>
  );
}

export default MainRoutes;
