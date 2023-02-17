import "./DashBoard.scss";
import NavDashboard from "../../components/NavDashboard/NavDashboard";
import React from "react";
import SideBar from "../../components/SideBar/SideBar";

const DashBoard = () => {
  return (
    <div className="DashBoardContainer d-flex flex-row">
      <SideBar />
      <div className="DashBoardContainer__main d-flex flex-column">
        <NavDashboard />
        <div>This is main</div>
      </div>
    </div>
  );
};

export default DashBoard;
