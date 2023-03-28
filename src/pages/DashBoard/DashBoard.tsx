import "./DashBoard.scss";
import NavDashboard from "../../components/NavDashboard/NavDashboard";
import React, { useEffect, useState } from "react";
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
import ApproveEnrollments from "../Admin/ApproveEnrollments/ApproveEnrollments";
import {
  getUserCoursesApi,
  modifyAnnouncements,
  modifyAssignments,
  modifyCourseDetails,
} from "../../reducers/getCourses";
import UserAccount from "../UserAccount/UserAccount";
import { getCourseDetails } from "../../services/courseService";
import BrowseCousrses from "../BrowseCourses/BrowseCousrses";
import SubCourseView from "../SubCourseView/SubCourseView";

type courseDetails = {
  randomColor: string;
  announcements: string[];
  assignments: string[];
  description: string;
  syllabus: string | string[];
  title: string;
};

const DashBoard = () => {
  const userDataStore = useAppSelector((state) => state.userLoginAPI);
  const userEmail = localStorage.getItem("uuid") || "";
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const dispatchStore = useAppDispatch();
  const userData = getUserSpecificDetails(
    userEmail ? userEmail : userDataStore.email
  );
  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);
  const [courseDetails, setCourseDetials] = useState<courseDetails[]>([]);
  let courseDetailsTemp: courseDetails[] = [];
  userData?.then((data) => {
    data?.forEach((doc) => {
      const x = doc.data();
      if (!userDataStore.email) {
        dispatchStore(modifyEmail(userEmail));
      }
      dispatchStore(modifyFirstname(x["firstname"]));
      dispatchStore(modifyLastname(x["lastname"]));
      dispatchStore(modifyUsername(x["username"]));
      dispatchStore(modifyRole(x["role"]));
      dispatchStore(modifyUID(x["uid"]));
    });
  });
  useEffect(() => {
    dispatchStore(
      getUserCoursesApi(userDataStore.email ? userDataStore.email : userEmail)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchCourses.coursesAbbrv.forEach(async (e) => {
      const data = await getCourseDetails(e);
      courseDetailsTemp.push({
        randomColor: Math.floor(Math.random() * 16777215).toString(16),
        //@ts-ignore
        announcements: data["announcements"],
        //@ts-ignore
        assignments: data["assignments"],
        //@ts-ignore
        description: data["description"],
        //@ts-ignore
        syllabus: data["syllabus"],
        //@ts-ignore
        title: data["title"],
      });
      setCourseDetials(courseDetailsTemp);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCourses.coursesAbbrv]);
  useEffect(() => {
    dispatchStore(modifyCourseDetails(courseDetails.map((e: any) => e.title)));
    let announcements: any = [];
    courseDetails.forEach((e) => {
      const ann = e.announcements;
      announcements = [...announcements, ...ann];
    });
    dispatchStore(modifyAnnouncements(announcements.map((e: any) => e)));
    let assignments: any = [];
    courseDetails.forEach((e) => {
      const ann = e.assignments;
      assignments = [...assignments, ...ann];
    });
    dispatchStore(modifyAssignments(assignments.map((e: any) => e)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseDetails]);

  return (
    <div className="DashBoardContainer d-flex flex-row">
      <SideBar />
      <div className="DashBoardContainer__main d-flex flex-column">
        <NavDashboard />
        {dashboardVals.showComponent === "calendar" ? <Calendar /> : <></>}
        {dashboardVals.showComponent === "announcements" ? (
          <Announcements isCourseView={[false, "", ""]} />
        ) : (
          <></>
        )}

        {userDataStore.role === "Administrator" &&
        dashboardVals.showComponent === "reviewUsers" ? (
          <ApproveUsers />
        ) : (
          <></>
        )}

        {userDataStore.role === "Administrator" &&
        dashboardVals.showComponent === "reviewEnrollments" ? (
          <ApproveEnrollments />
        ) : (
          <></>
        )}

        {dashboardVals.showComponent === "dashboard" ? (
          <>
            {" "}
            <CoursesView courseDetailsarr={courseDetails} />
          </>
        ) : (
          <></>
        )}
        {dashboardVals.showComponent === "browsecourses" ? (
          <>
            {" "}
            <BrowseCousrses />
          </>
        ) : (
          <></>
        )}
        {dashboardVals.showComponent.includes("subcourseview") ? (
          <>
            {" "}
            <SubCourseView />
          </>
        ) : (
          <></>
        )}
        {dashboardVals.showComponent === "account" ? <UserAccount /> : <></>}
      </div>
    </div>
  );
};

export default DashBoard;
