import React, { useState, useEffect } from "react";
import { storage, db } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Assignment_creation, courseDetailI } from "./IAssignments";
import { useAppSelector } from "../../hooks";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const ASSIGNMENTS_KEY = "submittedAssignments";

export default function Assignments({
  courseDetailAssign,
  subCourseFullHeading,
}: courseDetailI) {
  const userDataStore = useAppSelector((state) => state.userLoginAPI);
  const [assignment_creation, setAssignment] = useState<Assignment_creation>({
    name: "",
    description: "",
    courseName: subCourseFullHeading,
    deadlineDate: "",
    file: null, // initialize the file property to null
  });

  const {
    name: assignmentName,
    description: assignmentDescription,
    deadlineDate,
  } = assignment_creation;

  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);

  // Create a state variable to store the submitted assignments
  const [submittedAssignments, setSubmittedAssignments] = useState<
    Assignment_creation[]
  >([JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY) || "[]")]);

  const [retrieved_assignments, setRetrievedAssignments] = useState<
    Assignment_creation[]
  >([JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY) || "[]")]);

  //replace the spaces in the file path
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

  const handleUserFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    // Your upload logic here
    // Access the selected file with `selectedFile` variable
    //user file upload to firestore

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

  
  const handleInstructorFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setAssignmentFile(event.target.files[0]);
    }

    if (assignmentFile == null) return;

    const courseTitle = replaceSpaces(courseDetailAssign?.title ?? "");
    const assignmentNameWithoutSpaces = replaceSpaces(assignmentName);
    const fileNameWithoutSpaces = replaceSpaces(assignmentFile.name);
    const fileNameWithUuid = fileNameWithoutSpaces + uuidv4();

    console.log("uploading file with name:", fileNameWithUuid);

    const fileRef = ref(
      storage,
      `Teacher/${courseTitle}/${assignmentNameWithoutSpaces}/${fileNameWithUuid}`
    );

    uploadBytes(fileRef, assignmentFile)
      .then(() => {
        console.log("uploaded a file:", fileNameWithUuid);
      })
      .catch((error) => {
        console.error("failed to upload file:", error);
      });
  };

  useEffect(() => {
    const storedAssignments = localStorage.getItem(ASSIGNMENTS_KEY);
    if (storedAssignments) {
      setSubmittedAssignments(JSON.parse(storedAssignments));
    }

    const fetchAssignments = async () => {
      const q = query(
        collection(db, "assignments"),
        where("courseName", "==", subCourseFullHeading),
        where("studentID", "==", userDataStore.uid)
      );
      const querySnapshot = await getDocs(q);

      // Get the assignments data from Firestore and convert them to Assignment_creation objects
      const retrievedAssignments = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data["name"],
          description: data["description"],
          courseName: data["courseName"],
          deadlineDate: data["deadlineDate"],
          file: data["file"],
        };
      });

      setRetrievedAssignments(retrievedAssignments);
    };
    fetchAssignments();
  }, [subCourseFullHeading, userDataStore.uid]);

  const retrievedFilteredAssignments = retrieved_assignments.filter(
    (assignment) => assignment.courseName === subCourseFullHeading
  );

  useEffect(() => {
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(submittedAssignments));
  }, [submittedAssignments]);

  const filteredAssignments = submittedAssignments.filter(
    (assignment) => assignment.courseName === subCourseFullHeading
  );

  const handleAssignmentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const docRef = ""; // define the value of docRef here

    // TODO: handle assignment submission logic
    const newAssignment = {
      name: assignment_creation.name,
      description: assignment_creation.description,
      deadlineDate: assignment_creation.deadlineDate,
      courseName: subCourseFullHeading,
      file: assignmentFile,
      assignments: docRef,
    };

    // Save the new assignment to Firestore
    try {
      const docRef = await addDoc(collection(db, "assignments"), newAssignment);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    // Add the new assignment to the submittedAssignments array using the spread operator
    setSubmittedAssignments([...submittedAssignments, newAssignment]);
    console.log(assignment_creation);

    // Reset the assignment_creation and assignmentFile states to their initial values
    setAssignment({
      name: "",
      description: "",
      courseName: subCourseFullHeading,
      deadlineDate: "",
      file: null,
    });
    setAssignmentFile(null);

    console.log(assignment_creation);



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
                    <label
                      htmlFor="file-upload"
                      className="custom-file-upload"
                    ></label>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      onChange={handleInstructorFileInputChange}
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
      <div>
        <h2 style={{ paddingTop: "3%", marginLeft: "40px" }}>
          Current Assignments
        </h2>
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
            {filteredAssignments.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.name}</td>
                <td>{assignment.description}</td>
                <td>{assignment.deadlineDate}</td>
                <td>
                  {assignment.file && (
                    <a

                      // href={URL.createObjectURL(assignment.file)}
                      download={assignment.file}
                      className="download-btn"
                    >
                      Download
                    </a>
                  )}
                </td>
                <td>
                  <button onClick={() => setIsModalOpen(true)}>Upload</button>
                </td>
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
      <div>
        {userDataStore.role === "Student" ? (
          <table className="assignment-table">
            {/* <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Description</th>
                <th>Deadline Date</th>
                <th>File</th>
              </tr>
            </thead> */}
            <tbody>
              {retrievedFilteredAssignments.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.name}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.deadlineDate}</td>
                  <td>
                    {assignment.file && (
                      <a
                        href={URL.createObjectURL(assignment.file)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {assignment.file.name}
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <form onSubmit={handleAssignmentSubmit}></form>
        )}
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
