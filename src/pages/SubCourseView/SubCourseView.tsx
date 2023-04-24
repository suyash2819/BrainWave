import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import Assignments from "../../components/Assignments/Assignments";
import { useAppSelector } from "../../hooks";
import { getAllCourses } from "../../services/courseService";
import { courseDetail } from "../BrowseCourses/IPropsCourses";
import "./SubCourseView.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Announcements from "../Announcements/Announcements";
import { Spinner } from "react-bootstrap";

let tempCourseDetail: courseDetail;
function SubCourseView() {
  const courseStore = useAppSelector((state) => state.fetchCoursesReducer);
  const subCourseName = useAppSelector((state) => state.dashboardValsReducer);
  const subCourseFullHeading =
    courseStore.courseDetails[
      courseStore.courseDetails.indexOf(
        subCourseName.showComponent.substring(
          subCourseName.showComponent.indexOf(" ") + 1,
          subCourseName.showComponent.length
        )
      )
    ];

  const [subCourseDetails, setSubCourseDetails] = useState<courseDetail>({
    title: "",
    professor: "",
    sem: "",
  });

  const scrollRefToTop = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    scrollRefToTop.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [subCourseDetails]);

  const fetchingCourses = async () => {
    const tempAllCourses = getAllCourses();
    (await tempAllCourses).forEach((doc) => {
      const dataDoc: any = doc.data();
      if (dataDoc.title === subCourseFullHeading) {
        tempCourseDetail = {
          subCode: dataDoc.code,
          title: dataDoc.title,
          description: dataDoc.description,
          professor: dataDoc.Instructor,
          sem: dataDoc.Semester,
        };
      }
    });
    setSubCourseDetails(tempCourseDetail);
  };
  useEffect(() => {
    fetchingCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCourseFullHeading]);

  return (
    <>
      <div>
        {subCourseDetails.title?.length === 0 ? (
          <Spinner className="" animation="border" />
        ) : (
          <></>
        )}
      </div>

      <div ref={scrollRefToTop}>
        <h2 style={{ paddingTop: "3%", marginLeft: "40px" }}>
          {subCourseDetails?.title}
        </h2>
        <p
          style={{ marginLeft: "40px", marginRight: "40px", paddingTop: "2%" }}
        >
          {subCourseDetails?.description}
        </p>
        <p
          style={{ marginLeft: "40px", marginRight: "40px", paddingTop: "2%" }}
        >
          Instructor: {subCourseDetails?.professor}
        </p>
        <p
          style={{ marginLeft: "40px", marginRight: "40px", paddingTop: "2%" }}
        >
          Semester: {subCourseDetails?.sem}
        </p>
      </div>
      <hr />
      <div className="mx-5">
        {" "}
        <Tabs
          defaultActiveKey="Assignments"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Assignments">
            <Assignments
              subCourseCode={subCourseDetails.subCode!}
              courseDetailAssign={subCourseDetails}
              subCourseFullHeading={subCourseFullHeading}
            />
          </Tab>
          <Tab eventKey="profile" title="Announcements">
            <>
              <Announcements
                isCourseView={[
                  true,
                  subCourseFullHeading,
                  subCourseDetails.subCode || "",
                ]}
              />
            </>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default SubCourseView;
