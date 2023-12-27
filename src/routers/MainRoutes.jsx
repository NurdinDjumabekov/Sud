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

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route element={<MainLayouts />}>
        <Route path="/mainPlaintiff" element={<MainPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        <Route path="/calTodoPlaintiff" element={<CalendarTodoPage />} />
        <Route path="/meetingsPlaintiff" element={<CalendarMeetings />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Route>
      <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
    </Routes>
  );
}

export default MainRoutes;
