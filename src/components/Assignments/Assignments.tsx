import React, { useState } from "react";
import { storage } from "../../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Assignment, courseDetailI } from "./IAssignments";
import { useAppSelector } from "../../hooks";
import { storeCourseAssignment } from "../../services/assignmentService";

export default function Assignments({
  subCourseCode,
  courseDetailAssign,
  subCourseFullHeading,
}: courseDetailI) {
  const userDataStore = useAppSelector((state) => state.userLoginAPI);
  const [Assignment, setAssignment] = useState<Assignment>({
    name: "",
    description: "",
    courseName: subCourseCode,
    courseFullName: subCourseFullHeading,
    deadlineDate: "",
    file: "",
    datePosted: new Date(),
  });

  const {
    name: assignmentName,
    description: assignmentDescription,
    deadlineDate,
  } = Assignment;

  const [assignmentFile, setAssignmentFile] = useState<File>();
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const [submittedAssignments, setSubmittedAssignments] =
    useState<Assignment>();

  const replaceSpaces = (str: string) => {
    return str.replace(/\s+/g, "_");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAssignment((prevState) => ({ ...prevState, [name]: value }));
  };

  //fileupload
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | undefined | null>(
    undefined
  );

  const handleUserFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setIsModalOpen(true);
    }
  };
  const handleModalClose = () => {
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Your upload logic here
      const courseTitle = replaceSpaces(courseDetailAssign?.title ?? "");
      const assignmentNameWithoutSpaces = replaceSpaces(assignmentName);
      const fileNameWithoutSpaces = replaceSpaces(selectedFile.name);
      const fileNameWithUuid = fileNameWithoutSpaces + uuidv4();

      console.log("uploading file with name:", fileNameWithUuid);

      const fileRef = ref(
        storage,
        `Student/Assignments/${userDataStore.uid}/${courseTitle}/${assignmentNameWithoutSpaces}/${fileNameWithUuid}`
      );

      uploadBytes(fileRef, selectedFile)
        .then(() => {
          console.log("uploaded a file:", fileNameWithUuid);
        })
        .catch((error) => {
          console.error("failed to upload file:", error);
        });
    }
    handleModalClose();
  };

  const handleFileSubmission = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setAssignmentFile(event.target.files[0] as File);
    }
    const storage = getStorage();
    const storageRef = ref(
      storage,
      courseDetailAssign.title + "/" + assignmentFile?.name
    );
    uploadBytes(storageRef, assignmentFile!).then(() => {
      getDownloadURL(
        ref(storage, courseDetailAssign.title + "/" + assignmentFile?.name)
      ).then((url) => {
        setSubmittedAssignments({
          name: Assignment.name,
          description: Assignment.description,
          deadlineDate: Assignment.deadlineDate,
          courseName: subCourseCode,
          courseFullName: subCourseFullHeading,
          file: url,
          datePosted: new Date(),
        });
      });
    });
  };

  const handleAssignmentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    storeCourseAssignment(submittedAssignments!)
      .then((res) => {
        console.log(res);
        setAssignment({ ...Assignment, file: "" });
        setAssignment({
          name: "",
          description: "",
          courseName: subCourseCode,
          deadlineDate: "",
          courseFullName: subCourseFullHeading,
          file: "",
          datePosted: new Date(),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        {userDataStore.role !== "Student" ? (
          <form onSubmit={handleAssignmentSubmit}>
            <table className="assignment-table">
              <tbody>
                <tr>
                  <th>Assignment Name</th>
                  <td>
                    <input
                      type="text"
                      required
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
                      required
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
                      min={new Date().toISOString().split("T")[0]}
                      name="deadlineDate"
                      required
                      placeholder="Enter deadline date"
                      value={deadlineDate}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>File upload</th>
                  <td>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      className="file"
                      value={Assignment.file}
                      onChange={handleFileSubmission}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="submit-btn-container">
                    <button className="submit-btn" type="submit">
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-5">
        <h2 className="mt-4 text-center">Assignments</h2>
        {fetchCourses.assignment.filter((e) => e.courseName === subCourseCode)
          .length ? (
          <table className="assignment-display-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>File</th>
                <th>Upload</th>
              </tr>
            </thead>
            <tbody>
              {fetchCourses.assignment.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.name}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.deadlineDate}</td>
                  <td>
                    {assignment.file && (
                      <a href={assignment.file} className="download-btn">
                        Download
                      </a>
                    )}
                  </td>
                  <td>
                    <button onClick={() => setIsModalOpen(true)}>Upload</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h5 className="text-center">No assignments has been posted yet!</h5>
        )}
      </div>
      <div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Upload Assignment</h2>
              <input type="file" onChange={handleUserFileChange} />
              <button onClick={handleUpload}>Upload</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
