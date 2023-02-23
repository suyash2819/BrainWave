import React, { lazy } from "react";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegPage from "./pages/RegPage/RegPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));

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
                path="/Registration"
                element={
                  isAuthenticated ? (
                    <Navigate replace to="/Dashboard" />
                  ) : (
                    <RegPage />
                  )
                }
              />
              <Route
                path="/Login"
                element={
                  isAuthenticated ? (
                    <Navigate replace to="/Dashboard" />
                  ) : (
                    <LoginPage />
                  )
                }
              />
              <Route
                path="/Dashboard"
                element={
                  isAuthenticated ? (
                    <DashBoard />
                  ) : (
                    <Navigate replace to="/LogIn" />
                  )
                }
              />
              <Route path="/Home" element={<HomePage />} />
              <Route path="/aboutUs" element={<AboutUs />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}

export default App;
