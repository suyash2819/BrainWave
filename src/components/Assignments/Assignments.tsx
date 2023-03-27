import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Assignment, courseDetailI } from "./IAssignments";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  storeCourseAssignment,
  updateAssignmentArray,
  updateAssignmentUUIDArray,
} from "../../services/assignmentService";
import Card from "react-bootstrap/esm/Card";
import { Button, Form, ListGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { modifyAssignments } from "../../reducers/getCourses";
import AlertMessage from "../AlertMessage/AlertMessage";

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
    datePosted: new Date().toISOString(),
    submissiontType: "text",
    uuid: uuidv4(),
    submissionsEmail: [],
  });
  const [showAlert, setShowAlert] = useState({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });
  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };

  const [studentAssignentText, setStudentAssignentText] = useState("");

  const {
    name: assignmentName,
    description: assignmentDescription,
    deadlineDate,
  } = Assignment;

  const [displayOnModal, setDisplayOnModal] = useState<Assignment>();
  const dispatchStore = useAppDispatch();
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setAssignment((prevState) => ({
      ...prevState,
      [name]: value,
      courseName: subCourseCode,
    }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const storage = getStorage();
  const handleFileSubmission = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files!;
      const storageRef = ref(
        storage,
        courseDetailAssign.title + "/" + userDataStore.role + "/" + file[0].name
      );

      uploadBytes(storageRef, file[0]).then(() => {
        console.log(file);
        getDownloadURL(
          ref(
            storage,
            courseDetailAssign.title +
              "/" +
              userDataStore.role +
              "/" +
              file[0].name
          )
        ).then((url) => {
          console.log(url);
          setAssignment({ ...Assignment, file: url });
        });
      });
    }
  };

  const handleAssignmentSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    storeCourseAssignment(Assignment!)
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
          datePosted: new Date().toISOString(),
          submissiontType: Assignment.submissiontType,
          submissionsEmail: [],
          uuid: uuidv4(),
        });
        updateAssignmentArray(subCourseCode, displayOnModal?.uuid!);
        dispatchStore(
          modifyAssignments([...fetchCourses.assignment, Assignment])
        );
        setShowAlert({
          success: true,
          message: "Assignment has been posted!",
          show: true,
          type: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setShowAlert({
          success: true,
          message: "Something went wrong try again!",
          show: true,
          type: "",
        });
      });
  };

  const displayModel = (element: Assignment) => {
    setIsModalOpen(true);
    setDisplayOnModal(element!);
  };

  const handleSubmissionStudent = () => {
    if (displayOnModal?.submissiontType === "text") {
      let textFile = new Blob([studentAssignentText], { type: "text/plain" });
      const storageRef = ref(
        storage,
        courseDetailAssign.title +
          "/" +
          userDataStore.role +
          "/" +
          userDataStore.email +
          "/" +
          "/textSubmission.txt"
      );
      uploadBytes(storageRef, textFile).then(() => {
        console.log(textFile);
        // getDownloadURL(
        //   ref(
        //     storage,
        //     courseDetailAssign.title +
        //       "/" +
        //       userDataStore.role +
        //       "/" +
        //       userDataStore.email +
        //       "/textSubmission.txt"
        //   )
        // );
      });
    }
    setIsModalOpen(false);
    setShowAlert({
      success: true,
      message: "Submission is done!",
      show: true,
      type: "",
    });
    updateAssignmentUUIDArray(
      subCourseCode,
      displayOnModal?.uuid!,
      userDataStore.email
    );
  };

  return (
    <>
      {showAlert.show ? (
        <AlertMessage
          success={showAlert.success}
          message={showAlert.message}
          alertDisplay={alertMessageDisplay}
          type=""
        />
      ) : null}
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
                      onPaste={() => handleInputChange}
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
                      onPaste={() => handleInputChange}
                      onChange={handleInputChange}
                      style={{ height: "50px" }} // set the height to 200 pixels
                    />
                  </td>
                </tr>
                <tr>
                  <th>Deadline Date:</th>
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
                  <th>Upload your files (.pdf, .docx, .txt):</th>
                  <td>
                    <input
                      type="file"
                      accept="application/pdf,application/msword, .txt"
                      multiple
                      name="file"
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
          <div className="ms-5 col-10">
            <Card className="ms-5">
              <ListGroup variant="flush">
                {fetchCourses.assignment
                  .filter((e) => e.courseName === subCourseCode)
                  .map((element, index) => (
                    <ListGroup.Item
                      className="my-1 d-flex justify-content-between"
                      key={index}
                    >
                      <p className="h5">{element.name}</p>
                      <Button
                        onClick={() => displayModel(element)}
                        variant="outline-primary"
                      >
                        View Details
                      </Button>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Card>
          </div>
        ) : (
          <h5 className="text-center">No assignments has been posted yet!</h5>
        )}
      </div>
      <div>
        {isModalOpen ? (
          <Modal
            className="mt-5 ms-5"
            size="lg"
            show={isModalOpen}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header onClick={() => setIsModalOpen(false)} closeButton>
              <Modal.Title>{displayOnModal?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <>
                <p className="text-justify font-weight-light">
                  {displayOnModal?.description}
                </p>

                <a
                  style={{ textDecoration: "none" }}
                  href={displayOnModal?.file}
                  target="_blank"
                  rel="noreferrer"
                  className="download-btn"
                >
                  Assignment Files
                </a>
                <p className="mt-3">
                  DeadLine : {displayOnModal?.deadlineDate}
                </p>
                <p>
                  Date Posted : {displayOnModal?.datePosted?.substring(0, 10)}
                </p>
                <Form.Group controlId="formFileSm" className="mb-3">
                  {displayOnModal?.submissiontType === "text" ? (
                    <>
                      <Form.Label>Enter your text:</Form.Label>
                      <Form.Control
                        onChange={(e) =>
                          setStudentAssignentText(e.target.value)
                        }
                        as="textarea"
                        rows={3}
                      />
                    </>
                  ) : (
                    <>
                      <Form.Label>
                        Upload your files (.pdf, .docx, .txt):
                      </Form.Label>
                      <Form.Control
                        multiple
                        accept="application/pdf,application/msword, .txt"
                        type="file"
                        size="sm"
                        name="studentFile"
                        onChange={handleFileSubmission}
                      />
                    </>
                  )}
                </Form.Group>
              </>
            </Modal.Body>
            <Modal.Footer>
              {userDataStore.role === "Student" ? (
                <Button>Delete</Button>
              ) : (
                <></>
              )}
              {userDataStore.role !== "Student" ? (
                <Button onClick={handleSubmissionStudent}>
                  Submit Assignment
                </Button>
              ) : (
                <></>
              )}
            </Modal.Footer>
          </Modal>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
