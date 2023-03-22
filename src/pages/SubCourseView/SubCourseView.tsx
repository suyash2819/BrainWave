import React from "react";
import { useAppSelector } from "../../hooks";

function SubCourseView() {
  const courseStore = useAppSelector((state) => state.fetchCoursesReducer);
  const subCourseName = useAppSelector((state) => state.dashboardValsReducer);

  return (
    <>
      <div>
        <h3>
          {
            courseStore.courseDetails[
              courseStore.courseDetails.indexOf(
                subCourseName.showComponent.substring(
                  subCourseName.showComponent.indexOf(" ") + 1,
                  subCourseName.showComponent.length
                )
              )
            ]
          }
        </h3>
        <div className="assignmentUploadContainer">
          You can add the assignment creation section here
        </div>
      </div>
    </>
  );
}

export default SubCourseView;
