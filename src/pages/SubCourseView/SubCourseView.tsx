  import React, { useState, useEffect } from "react";
  import { useAppSelector } from "../../hooks";
  import { getAllCourses } from "../../services/courseService";
  import { courseDetail } from "../BrowseCourses/IPropsCourses";
  import "./SubCourseView.scss";
  import {storage} from '../../config/firebase';
  import { ref , uploadBytes } from 'firebase/storage';
  import { v4 as uuidv4 } from 'uuid';


  interface Assignment_creation {
    name: string;
    description: string;
    courseName: string;
    deadlineDate: string;
    file: File | null; // add a new property for the file
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


    const [assignment_creation, setAssignment] = useState<Assignment_creation>({
      name: "",
      description: "",
      courseName: subCourseFullHeading,
      deadlineDate: "",
      file: null, // initialize the file property to null
    });

    const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = event.target;
      setAssignment((prevState) => ({ ...prevState, [name]: value }));
    };

    const {
      name: assignmentName,
      description: assignmentDescription,
      deadlineDate: deadlineDate
      } = assignment_creation;

    const [assignmentFile, setAssignmentFile] = useState<File | null>(null);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setAssignmentFile(event.target.files[0]);
      }
      uploadFile()
    };

    const uploadFile = () => {
      if (assignmentFile == null) return;
      const fileRef = ref(storage, `Teacher/${subCourseDetails?.title}/${assignmentName}/${assignmentFile.name + uuidv4()}`)
      uploadBytes(fileRef, assignmentFile).then(() => {
        console.log("uploaded a file");
      });
    }    

    // Create a state variable to store the submitted assignments
    const [submittedAssignments, setSubmittedAssignments] = useState<Assignment_creation[]>([]);

    const handleAssignmentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // TODO: handle assignment submission logic
      const newAssignment = {
        name: assignment_creation.name,
        description: assignment_creation.description,
        deadlineDate: assignment_creation.deadlineDate,
        courseName: subCourseFullHeading,
        file: assignmentFile
      };
      // Add the new assignment to the submittedAssignments array using the spread operator
      setSubmittedAssignments([...submittedAssignments, newAssignment]);
      console.log(assignment_creation);
    };
   
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
                      style={{ height: "50px" }} // set the height to 200 pixels
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
                  <th>File upload</th>
                  <td>
                    <label htmlFor="file-upload" className="custom-file-upload">
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      onChange={handleFileInputChange}
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
        <div>
        <h2 style={{ paddingTop: '3%', marginLeft: '40px' }}>Current Assignments</h2>
        <table className="assignment-display-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {submittedAssignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.name}</td>
                <td>{assignment.description}</td>
                <td>{assignment.deadlineDate}</td>
                {/* <td>
                  <a href={assignment.fileUrl}>Download</a>
                </td> */}
              </tr>
            ))}
            {submittedAssignments.length === 0 && (
              <tr>
                <td colSpan={3}>No assignments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </>
    );  
  }

  export default SubCourseView;
