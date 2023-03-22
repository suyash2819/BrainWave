import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { getAllCourses } from "../../services/courseService";
import { courseDetail } from "../BrowseCourses/IPropsCourses";

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
  const [subCourseDetails, setSubCourseDetails] = useState<courseDetail>();
  const fetchingCourses = async () => {
    const tempAllCourses = getAllCourses();
    (await tempAllCourses).forEach((doc) => {
      const dataDoc: any = doc.data();
      if (dataDoc.title === subCourseFullHeading) {
        tempCourseDetail = {
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

  console.log(subCourseDetails);
  return (
    <>
      <div>
        <h3>{subCourseFullHeading}</h3>
        <p>{subCourseDetails?.description}</p>
        <div className="assignmentUploadContainer">
          You can add the assignment creation section here
        </div>
      </div>
    </>
  );
}

export default SubCourseView;
