import React from "react";
import "./App.scss";
import NavBarMain from "./components/NavBarMain.tsx/NavBarMain";
import HomePage from "./pages/homePage/HomePage";
import { Routes, Route } from "react-router-dom";
import FooterMain from "./components/Footer/FooterMain";

function App() {
  return (
    <>
      <div className="App">
        <NavBarMain />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
        </Routes>
        <FooterMain />
      </div>
    </>
  );
}

export default App;
