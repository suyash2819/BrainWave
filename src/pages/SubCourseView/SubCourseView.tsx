import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { getAllCourses } from "../../services/courseService";
import { courseDetail } from "../BrowseCourses/IPropsCourses";
import "./SubCourseView.scss";

interface Assignment_creation {
  name: string;
  description: string;
  courseName: string;
  deadlineDate: string;
}

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

  const [assignment, setAssignment] = useState<Assignment_creation>({
    name: "",
    description: "",
    courseName: subCourseFullHeading,
    deadlineDate: "",

  });

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


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAssignment((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAssignmentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: handle assignment submission logic
    console.log(assignment);
  };

  const {
    name: assignmentName,
    description: assignmentDescription,
    deadlineDate,
  } = assignment;

  console.log(subCourseDetails);
  return (
    <>
      <div>
        <h2 style={{ paddingTop: '3%', marginLeft: '40px' }}>{subCourseDetails?.title}</h2>
        <p style={{ marginLeft: '40px', marginRight: '40px', paddingTop: '2%' }}>{subCourseDetails?.description}</p>
        <form className="assignment-table" onSubmit={handleAssignmentSubmit}>
          {/* ... */}
        </form>
      </div>
      <div>
        <form onSubmit={handleAssignmentSubmit}>
          <table className="assignment-table">
            <tbody>
              <tr>
                <th>Assignment Name</th>
                <td>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter assignment name"
                    value={assignmentName}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <td>
                  <textarea
                    name="description"
                    placeholder="Enter assignment description"
                    value={assignmentDescription}
                    onChange={handleInputChange}
                    style={{ height: "180px" }} // set the height to 200 pixels
                  />
                </td>
              </tr>
              <tr>
                <th>Deadline Date</th>
                <td>
                  <input
                    type="date"
                    name="deadlineDate"
                    placeholder="Enter deadline date"
                    value={deadlineDate}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="submit-btn-container">
                  <button className="submit-btn" type="submit">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );  
}

export default SubCourseView;
