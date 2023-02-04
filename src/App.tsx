import React, { lazy } from "react";
import "./App.scss";
import NavBarMain from "./components/NavBarMain.tsx/NavBarMain";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import FooterMain from "./components/Footer/FooterMain";
import LoginPage from "./pages/LoginPage/LoginPage";

const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));

function App() {
  return (
    <>
      <div className="App">
        <NavBarMain />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
        </Routes>
        <FooterMain />
      </div>
    </>
  );
}

export default App;
