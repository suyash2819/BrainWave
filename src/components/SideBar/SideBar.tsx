import React from "react";
import "./Sidebar.scss";
import logo from "../../assets/logo.jpeg";
import defaultpfp from "../../assets/defaultPfp.jpg";

function SideBar() {
  return (
    <>
      <div className="sidebarContainer">
        <div className="sidebarContainer__header d-flex flex-row">
          <img
            alt=""
            src={logo}
            width="48"
            height="48"
            className="d-inline-block p-1 m-3"
          />
          <p className="sidebarContainer__header__title">BrainWave</p>
        </div>
        <div className="sidebarContainer__options">
          <div className="sidebarContainer__options__profile d-flex flex-column">
            <img
              alt=""
              src={defaultpfp}
              width="100"
              height="100"
              className="sidebarContainer__options__profile__img d-inline-block mt-4"
            />
            <p className="sidebarContainer__options__profile__name">
              {" "}
              First Name Second Name
            </p>
          </div>
          <hr />
          <div className="d-flex flex-column">
            <a className="">DashBoard</a>
            <a>Courses</a>
            <a>Account</a>
            <a>Courses</a>
            <hr />
            <a>Help</a>
            <a>LogOut</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
