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
  faBookAtlas,
  faBars,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "react-bootstrap";
import { componentToggle, modifyHeading } from "../../reducers/dasboardVals";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

function SideBar() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const togglesideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const coursesData = useAppSelector((state) => state.fetchCoursesReducer);
  const userLoginlog = useAppSelector((state) => state.userLoginAPI);
  const dispatchStore = useAppDispatch();
  const [rotateCourse, setRotateCourse] = useState<boolean>(false);
  const [rotateChat, setRotateChat] = useState<boolean>(false);
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
      {sideBarOpen ? (
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
            <FontAwesomeIcon
              icon={faBars}
              className="d-inline-block p-3 m-2 mx-5"
              style={{ color: "white" }}
              onClick={togglesideBar}
              size="2xl"
            />
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

            <div className="d-flex flex-column" style={{ overflow: "scroll" }}>
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
                      <FontAwesomeIcon
                        className="pe-3"
                        icon={faGraduationCap}
                      />{" "}
                      Courses
                    </p>
                    <FontAwesomeIcon
                      style={{
                        transform: rotateCourse
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        transition: "all 0.2s linear",
                      }}
                      className="px-4 mb-3 ms-5"
                      icon={faCaretDown}
                    />
                  </Accordion.Header>
                  <Accordion.Body>
                    <p
                      key={-1}
                      className="sidebarContainer__options__navs_courses"
                      onClick={() => {
                        dispatchStore(componentToggle("browsecourses"));
                        dispatchStore(modifyHeading("All Courses"));
                      }}
                    >
                      <FontAwesomeIcon className="pe-3" icon={faBookAtlas} />{" "}
                      All Courses
                    </p>
                    {coursesData.courseDetails.map((element, index) => (
                      <p
                        key={index}
                        className="sidebarContainer__options__navs_courses"
                        onClick={() => {
                          dispatchStore(
                            componentToggle("subcourseview " + element)
                          );
                          dispatchStore(modifyHeading("Course Details"));
                        }}
                      >
                        <FontAwesomeIcon className="pe-3" icon={faBook} />{" "}
                        {element}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              {userLoginlog.role !== "Student" ? (
                <p
                  className="sidebarContainer__options__navs"
                  onClick={() => {
                    console.log(9);
                    dispatchStore(componentToggle("grading"));
                    dispatchStore(modifyHeading("Grading"));
                  }}
                >
                  <FontAwesomeIcon className="pe-3" icon={faCheck} /> Grading
                </p>
              ) : null}

              <Accordion flush className="my-accordion">
                {/* MESSAGES _ START */}
                <Accordion.Item eventKey="0">
                  <Accordion.Header onClick={() => setRotateChat(!rotateChat)}>
                    <p className="sidebarContainer__options__navs">
                      <FontAwesomeIcon className="pe-3" icon={faMessage} />{" "}
                      Messages
                    </p>
                    <FontAwesomeIcon
                      style={{
                        transform: rotateChat ? "rotate(180deg)" : "rotate(0)",
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
                        onClick={() => {
                          dispatchStore(componentToggle("chat " + element));
                          dispatchStore(modifyHeading("Chat"));
                        }}
                      >
                        <FontAwesomeIcon className="pe-3" icon={faBook} />{" "}
                        {element}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

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
      ) : (
        <div className="sidebarCollapsedContainer">
          <div className="sidebarContainer__header d-flex flex-row">
            <FontAwesomeIcon
              icon={faBars}
              className="d-inline-block p-3 m-2 mx-3"
              style={{ color: "white" }}
              onClick={togglesideBar}
              size="2xl"
            />
          </div>
          <div className="sidebarContainer__options">
            <div className="sidebarContainer__options__profile d-flex flex-column">
              <img
                alt=""
                src={defaultpfp}
                width="50"
                height="50"
                className="sidebarContainer__options__profile__img d-inline-block mt-4"
              />
            </div>
            <hr />

            <div className="d-flex flex-column" style={{ overflow: "scroll" }}>
              <p
                className="sidebarContainer__options__navs"
                onClick={() => {
                  dispatchStore(componentToggle("dashboard"));
                  dispatchStore(modifyHeading("Dashboard"));
                }}
              >
                <FontAwesomeIcon className="pe-3" icon={faChartBar} />
              </p>
              <p
                className="sidebarContainer__options__navs"
                onClick={() => {
                  dispatchStore(componentToggle("account"));
                  dispatchStore(modifyHeading("Account"));
                }}
              >
                <FontAwesomeIcon className="pe-3" icon={faUser} />
              </p>

              <Accordion
                flush
                activeKey={sideBarOpen ? "true" : ""}
                className="my-accordion"
              >
                {/* COURSES _ START */}
                <Accordion.Item eventKey="0">
                  <Accordion.Header onClick={togglesideBar}>
                    <p className="sidebarContainer__options__navs">
                      <FontAwesomeIcon
                        className="pe-3"
                        icon={faGraduationCap}
                      />{" "}
                    </p>
                    <FontAwesomeIcon
                      style={{
                        transform: rotateCourse
                          ? "rotate(180deg)"
                          : "rotate(0)",
                        transition: "all 0.2s linear",
                      }}
                      className="px-4 mb-3 ms-5"
                      icon={faCaretDown}
                    />
                  </Accordion.Header>
                  <Accordion.Body>
                    <p
                      key={-1}
                      className="sidebarContainer__options__navs_courses"
                      onClick={() => {
                        dispatchStore(componentToggle("browsecourses"));
                        dispatchStore(modifyHeading("All Courses"));
                      }}
                    >
                      <FontAwesomeIcon className="pe-3" icon={faBookAtlas} />{" "}
                      All Courses
                    </p>
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

              <Accordion flush className="my-accordion">
                {/* MESSAGES _ START */}
                <Accordion.Item eventKey="0">
                  <Accordion.Header onClick={togglesideBar}>
                    <p className="sidebarContainer__options__navs">
                      <FontAwesomeIcon className="pe-3" icon={faMessage} />{" "}
                    </p>
                    <FontAwesomeIcon
                      style={{
                        transform: rotateChat ? "rotate(180deg)" : "rotate(0)",
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
                        onClick={() => {
                          dispatchStore(componentToggle("chat " + element));
                          dispatchStore(modifyHeading("Chat"));
                        }}
                      >
                        <FontAwesomeIcon className="pe-3" icon={faBook} />{" "}
                        {element}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <p
                className="sidebarContainer__options__navs"
                onClick={() => {
                  UserSignOut();
                }}
              >
                <FontAwesomeIcon className="pe-3" icon={faRightFromBracket} />{" "}
              </p>
              <hr />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
