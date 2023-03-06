import "./DashBoard.scss";
import NavDashboard from "../../components/NavDashboard/NavDashboard";
import React, { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { getUserSpecificDetails } from "../../services/userService";
import {
  modifyFirstname,
  modifyLastname,
  modifyRole,
  modifyUsername,
  modifyUID,
  modifyEmail,
} from "../../reducers/getUserDetails";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Calendar from "../../components/calendar/Calendar";
import Announcements from "../Announcements/Announcements";
import ApproveUsers from "../Admin/ApproveUsers/ApproveUsers";
import CoursesView from "../../components/CoursesView/CoursesView";
import { getUserCoursesApi } from "../../reducers/getCourses";

const DashBoard = () => {
  const userUserData = useAppSelector((state) => state.userLoginAPI);
  const userEmail = localStorage.getItem("uuid") || "";
  const dispatchLoginDetails = useAppDispatch();
  const userData = getUserSpecificDetails(
    userEmail ? userEmail : userUserData.email
  );
  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);

  userData?.then((data) => {
    data?.forEach((doc) => {
      const x = doc.data();
      if (!userUserData.email) {
        dispatchLoginDetails(modifyEmail(userEmail));
      }
      dispatchLoginDetails(modifyFirstname(x["firstname"]));
      dispatchLoginDetails(modifyLastname(x["lastname"]));
      dispatchLoginDetails(modifyUsername(x["username"]));
      dispatchLoginDetails(modifyRole(x["role"]));
      dispatchLoginDetails(modifyUID(x["uid"]));
    });
  });
  useEffect(() => {
    dispatchLoginDetails(
      getUserCoursesApi(userUserData.email ? userUserData.email : userEmail)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="DashBoardContainer d-flex flex-row">
      <SideBar />
      <div className="DashBoardContainer__main d-flex flex-column">
        <NavDashboard />
        {dashboardVals.showComponent === "calendar" ? <Calendar /> : <></>}
        {dashboardVals.showComponent === "announcements" &&
        (userUserData.role === "Faculty" ||
          userUserData.role === "Administrator") ? (
          <Announcements />
        ) : (
          <></>
        )}
        {userUserData.role === "Administrator" &&
        dashboardVals.showComponent === "reviewUsers" ? (
          <ApproveUsers />
        ) : (
          <></>
        )}
        {dashboardVals.showComponent === "dashboard" ? <CoursesView /> : <></>}
      </div>
    </div>
  );
};

export default DashBoard;
