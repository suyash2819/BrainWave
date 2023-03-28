import React, { lazy } from "react";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegPage from "./pages/RegPage/RegPage";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const TeacherAnnouncements = lazy(
  () => import("./pages/Announcements/Announcements")
);
const DashBoard = lazy(() => import("./pages/DashBoard/DashBoard"));

function App() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("bwUser");
  return (
    <>
      <div className="App">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes>
              <Route
                path="/registration"
                element={
                  isAuthenticated ? (
                    <Navigate replace to="/dashboard" />
                  ) : (
                    <RegPage />
                  )
                }
              />
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate replace to="/dashboard" />
                  ) : (
                    <LoginPage />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated ? (
                    <DashBoard />
                  ) : (
                    <Navigate replace to="/Login" />
                  )
                }
              />
              <Route path="/home" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route
                path="/teacherAnnouncements"
                element={
                  <TeacherAnnouncements isCourseView={[false, "", ""]} />
                }
              />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}

export default App;
