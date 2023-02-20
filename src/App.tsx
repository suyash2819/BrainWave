import React, { lazy } from "react";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegPage from "./pages/RegPage/RegPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));

function App() {
  const location = useLocation();
  return (
    <>
      <div className="App">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes>
              <Route path="/Home" element={<HomePage />} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/Registration" element={<RegPage />} />
              <Route path="/Dashboard" element={<DashBoard />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}

export default App;
