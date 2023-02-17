import React, { lazy } from "react";
import "./App.scss";
import NavBarMain from "./components/NavBarMain.tsx/NavBarMain";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import FooterMain from "./components/Footer/FooterMain";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegPage from "./pages/RegPage/RegPage";
// import DashBoard from "./pages/DashBoard/DashBoard";

const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));

function App() {
  const queryString = window.location.href;

  return (
    <>
      <div className="App">
        {queryString.includes("Dashboard") ? <></> : <NavBarMain />}
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/Registration" element={<RegPage />} />
          {/* <Route path="/Dashboard" element={<DashBoard />} /> */}
        </Routes>
        {queryString.includes("LogIn") ||
        queryString.includes("Registration") ||
        queryString.includes("Dashboard") ? (
          <></>
        ) : (
          <FooterMain />
        )}
      </div>
    </>
  );
}

export default App;
