import "./DashBoard.scss";
import NavDashboard from "../../components/NavDashboard/NavDashboard";
import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import { getUserSpecificDetails } from "../../services/userService";
import {
  modifyFirstname,
  modifyLastname,
  modifyRole,
  modifyUsername,
  modifyUID,
} from "../../reducers/getUserDetails";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Calendar from "../../components/calendar/Calendar";

const DashBoard = () => {
  const userUserData = useAppSelector((state) => state.userLoginAPI);
  const userEmail = localStorage.getItem("uuid");
  const dispatchLoginDetails = useAppDispatch();
  const userData = getUserSpecificDetails(
    userEmail ? userEmail : userUserData.email
  );
  userData?.then((data) => {
    data?.forEach((doc) => {
      const x = doc.data();
      dispatchLoginDetails(modifyFirstname(x["firstname"]));
      dispatchLoginDetails(modifyLastname(x["lastname"]));
      dispatchLoginDetails(modifyUsername(x["username"]));
      dispatchLoginDetails(modifyRole(x["role"]));
      dispatchLoginDetails(modifyUID(x["uid"]));
    });
  });

  return (
    <div className="DashBoardContainer d-flex flex-row">
      <SideBar />
      <div className="DashBoardContainer__main d-flex flex-column">
        <NavDashboard />
        <Calendar />
      </div>
    </div>
  );
};

export default DashBoard;
