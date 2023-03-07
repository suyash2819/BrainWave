import React, { useState } from "react";
import "./Sidebar.scss";
import logo from "../../assets/logo.jpeg";
import defaultpfp from "../../assets/defaultPfp.jpg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faGraduationCap,
  faUser,
  faMessage,
  faRightFromBracket,
  faCaretDown,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "react-bootstrap";
import { componentToggle, modifyHeading } from "../../reducers/dasboardVals";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

function SideBar() {
  const coursesData = useAppSelector((state) => state.fetchCoursesReducer);
  const userLoginlog = useAppSelector((state) => state.userLoginAPI);
  const dispatchStore = useAppDispatch();
  const [rotateCourse, setRotateCourse] = useState<boolean>(false);
  const navigate = useNavigate();
  const UserSignOut = async () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("bwUser");
        localStorage.removeItem("uuid");
        navigate(0);
        navigate("/login");
      })
      .catch((err) => {
        // An error happened.
        console.log(err.message);
      });
  };

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
              {userLoginlog.firstname + " " + userLoginlog.lastname}
            </p>
          </div>
          <hr />

          <div
            className="d-flex flex-column"
            style={{ height: "400px", overflow: "scroll" }}
          >
            <p
              className="sidebarContainer__options__navs"
              onClick={() => {
                dispatchStore(componentToggle("dashboard"));
                dispatchStore(modifyHeading("Dashboard"));
              }}
            >
              <FontAwesomeIcon className="pe-3" icon={faChartBar} />
              DashBoard
            </p>
            <p
              className="sidebarContainer__options__navs"
              onClick={() => {
                dispatchStore(componentToggle("account"));
                dispatchStore(modifyHeading("Account"));
              }}
            >
              <FontAwesomeIcon className="pe-3" icon={faUser} /> Account
            </p>

            <Accordion flush className="my-accordion">
              {/* COURSES _ START */}
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  onClick={() => setRotateCourse(!rotateCourse)}
                >
                  <p className="sidebarContainer__options__navs">
                    <FontAwesomeIcon className="pe-3" icon={faGraduationCap} />{" "}
                    Courses
                  </p>
                  <FontAwesomeIcon
                    style={{
                      transform: rotateCourse ? "rotate(180deg)" : "rotate(0)",
                      transition: "all 0.2s linear",
                    }}
                    className="px-4 mb-3 ms-5"
                    icon={faCaretDown}
                  />
                </Accordion.Header>
                <Accordion.Body>
                  {coursesData.courseDetails.map((element, index) => (
                    <p
                      key={index}
                      className="sidebarContainer__options__navs_courses"
                    >
                      <FontAwesomeIcon className="pe-3" icon={faBook} />{" "}
                      {element}
                    </p>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <p className="sidebarContainer__options__navs">
              <FontAwesomeIcon className="pe-3" icon={faMessage} /> Messages
            </p>
            <p className="sidebarContainer__options__navs">
              <FontAwesomeIcon className="pe-3" icon={faUser} /> Help
            </p>
            <p
              className="sidebarContainer__options__navs"
              onClick={() => {
                UserSignOut();
              }}
            >
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
