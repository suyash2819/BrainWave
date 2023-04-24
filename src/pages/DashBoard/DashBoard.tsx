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
import Chat from "../Chat/Chat";
import ApproveEnrollments from "../Admin/ApproveEnrollments/ApproveEnrollments";
import {
  getUserCoursesApi,
  modifyAnnouncements,
  modifyAssignments,
  modifyCourseAbbrv,
  modifyCourseDetails,
} from "../../reducers/getCourses";
import UserAccount from "../UserAccount/UserAccount";
import { getAllCourses, getCourseDetails } from "../../services/courseService";
import BrowseCousrses from "../BrowseCourses/BrowseCousrses";
import SubCourseView from "../SubCourseView/SubCourseView";
import Grading from "../Grading/Grading";

type courseDetails = {
  announcements: string[];
  assignments: string[];
  description: string;
  syllabus: string | string[];
  schedule: string;
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
    if (userDataStore.role === "Administrator") {
      const dataAllCoursesAdmin = fetchCourseAdminMode();
      dataAllCoursesAdmin.then((res) => {
        dispatchStore(modifyCourseAbbrv(res));
      });
    } else {
      dispatchStore(
        getUserCoursesApi(userDataStore.email ? userDataStore.email : userEmail)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataStore]);

  const fetchCourseAdminMode = async () => {
    let courseAbbrvArr: string[] = [];
    const tempAllCourses = getAllCourses();
    (await tempAllCourses).forEach((doc) => {
      const dataDoc: any = doc.data();
      courseAbbrvArr.push(dataDoc.code);
    });
    return courseAbbrvArr;
  };

  useEffect(() => {
    fetchCourses.coursesAbbrv.forEach(async (e) => {
      const data = await getCourseDetails(e);
      console.log(data);
      courseDetailsTemp.push({
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
        //@ts-ignore
        schedule: data["schedule"],
      });
      setCourseDetials(courseDetailsTemp);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCourses.coursesAbbrv]);
  useEffect(() => {
    console.log(courseDetails);
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
        {dashboardVals.showComponent === "calendar" ? (
          <Calendar courseDetailsarr={courseDetails} />
        ) : (
          <></>
        )}
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
        {dashboardVals.showComponent === "grading" ? (
          <>
            {" "}
            <Grading />
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
        {dashboardVals.showComponent.includes("chat") ? (
          <>
            {" "}
            <Chat />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
