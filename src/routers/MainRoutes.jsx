import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayouts from '../layouts/MainLayouts';
import PlaintiffPage from '../pages/PlaintiffPage/PlaintiffPage';
import MainPage from '../pages/mainpage/MainPage';
import SignIn from '../pages/login/SignIn';
import { useSelector } from 'react-redux';
import NotificationPage from '../pages/NotificationPage/NotificationPage';
import CalendarTodoPage from '../pages/CalendarTodoPage/CalendarTodoPage';

function MainRoutes() {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/mainPlaintiff" element={<MainPage />} />
        <Route path="/notifPlaintiff" element={<NotificationPage />} />
        <Route path="/calTodoPlaintiff" element={<CalendarTodoPage />} />
      </Route>
      <Route path="/plaintiffCreate" element={<PlaintiffPage />} />
    </Routes>
  );
}

export default MainRoutes;
