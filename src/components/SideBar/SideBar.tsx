import React from "react";
import "./Sidebar.scss";
import logo from "../../assets/logo.jpeg";
import defaultpfp from "../../assets/defaultPfp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faGraduationCap,
  faUser,
  faMessage,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

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
            <p className="sidebarContainer__options__navs">
              <FontAwesomeIcon className="pe-3" icon={faChartBar} />
              DashBoard
            </p>
            <p className="sidebarContainer__options__navs">
              <FontAwesomeIcon className="pe-3" icon={faGraduationCap} />{" "}
              Courses
            </p>
            <p className="sidebarContainer__options__navs">
              <FontAwesomeIcon className="pe-3" icon={faUser} /> Account
            </p>
            <p className="sidebarContainer__options__navs">
              <FontAwesomeIcon className="pe-3" icon={faMessage} /> Messages
            </p>
            <p className="sidebarContainer__options__navs">
              <FontAwesomeIcon className="pe-3" icon={faRightFromBracket} />{" "}
              LogOut
            </p>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
