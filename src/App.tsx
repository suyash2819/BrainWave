import React, { lazy } from "react";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegPage from "./pages/RegPage/RegPage";
import DashBoard from "./pages/DashBoard/DashBoard";

const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/Registration" element={<RegPage />} />
          <Route path="/Dashboard" element={<DashBoard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
