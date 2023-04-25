import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  StorageReference,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Assignment, courseDetailI } from "./IAssignments";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchStudentSubmittedAssignment,
  storeCourseAssignment,
  updateAssignmentArray,
} from "../../services/assignmentService";
import Card from "react-bootstrap/esm/Card";
import { Button, Form, ListGroup, Spinner, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { modifyAssignments } from "../../reducers/getCourses";
import AlertMessage from "../AlertMessage/AlertMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Assignments({
  subCourseCode,
  courseDetailAssign,
  subCourseFullHeading,
}: courseDetailI) {
  interface assignmentGrades {
    [key: string]: any[];
  }
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [displayOnModal, setDisplayOnModal] = useState<Assignment>();
  const dispatchStore = useAppDispatch();
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  const [storageRef, setStorageRef] = useState<StorageReference>();
  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);
  const [submittedAssignments, setSubmittedAssignments] = useState<string[]>(
    []
  );

  const [assignmentGrade, setAssignmentGrade] = useState<assignmentGrades>({});
  const storage = getStorage();
  const [isFileUploading, setIsFileUploading] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const {
    name: assignmentName,
    description: assignmentDescription,
    deadlineDate,
  } = Assignment;
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
    console.log(Assignment);
  };

  useEffect(() => {
    fetchStudentSubmittedAssignment(userDataStore.email).then((data) => {
      console.log(data);
      setSubmittedAssignments(Object.keys(data));
      setAssignmentGrade(data);
    });

    // eslint-disable-next-line
  }, [isModalOpen, displayOnModal]);

  useEffect(() => {}, [submittedAssignments, assignmentGrade]);
  const handleFileSubmission = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length > 0) {
      setIsFileUploading([true, ""]);
      // const uuidFileUpload =
      //   userDataStore.role === "Student"
      //     ? displayOnModal?.uuid
      //     : Assignment.uuid;

      const file = event.target.files!;
      setStorageRef(
        ref(
          storage,
          courseDetailAssign.title +
            "/" +
            Assignment.uuid +
            "/" +
            userDataStore.role +
            "/" +
            file[0].name
        )
      );
      const localStorageRef = ref(
        storage,
        courseDetailAssign.title +
          "/" +
          Assignment.uuid +
          "/" +
          userDataStore.role +
          "/" +
          file[0].name
      );

      uploadBytes(localStorageRef, file[0]).then(() => {
        console.log(file);
        getDownloadURL(
          ref(
            storage,
            courseDetailAssign.title +
              "/" +
              Assignment.uuid +
              "/" +
              userDataStore.role +
              "/" +
              file[0].name
          )
        ).then((url) => {
          console.log(url);
          setIsFileUploading([false, "uploaded"]);
          setAssignment({ ...Assignment, file: url });
        });
      });

      // file.forEach((fil) => {
      // e;
      // });
    }
  };

  const handleDeleteFileSubmission = () => {
    deleteObject(storageRef!)
      .then(() => {
        setShowAlert({
          success: true,
          message: "File is deleted Successfully!",
          show: true,
          type: "",
        });
        setIsFileUploading([false, ""]);
      })
      .catch((error) => {
        console.log(error);
      });
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
    setShowAlert({
      success: true,
      message: "",
      show: false,
      type: "",
    });
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
          Assignment.uuid +
          "/" +
          userDataStore.role +
          "/" +
          userDataStore.email +
          "/" +
          "/textSubmission.txt"
      );
      uploadBytes(storageRef, textFile).then(() => {
        getDownloadURL(
          ref(
            storage,
            courseDetailAssign.title +
              "/" +
              Assignment.uuid +
              "/" +
              userDataStore.role +
              "/" +
              userDataStore.email +
              "/" +
              "/textSubmission.txt"
          )
        ).then((url: string) => {
          fetchStudentSubmittedAssignment(userDataStore.email).then((data) => {
            updateAssignmentArray(userDataStore.email, {
              ...data,
              [displayOnModal?.uuid!]: [9999, url],
            });
          });
        });
      });
    } else {
      fetchStudentSubmittedAssignment(userDataStore.email).then((data) => {
        updateAssignmentArray(userDataStore.email, {
          ...data,
          [displayOnModal?.uuid!]: [9999, Assignment.file],
        });
      });
    }

    setIsModalOpen(false);
    setIsFileUploading([false, ""]);
    setShowAlert({
      success: true,
      message: "Submission is done!",
      show: true,
      type: "",
    });
  };

  return (
    <>
      {showAlert.show && !isModalOpen ? (
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
            <Table
              variant={dashboardVals.darkMode === "dark" ? "dark" : ""}
              className="assignment-table"
            >
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
                  <th>Type of File Submission:</th>
                  <td>
                    <Form.Select
                      name="submissiontType"
                      onChange={handleInputChange}
                      aria-label="Default select example"
                    >
                      <option value="text">Text</option>
                      <option value="file">File</option>
                    </Form.Select>
                  </td>
                </tr>
                <tr>
                  <th>Upload your files (.pdf, .docx, .txt):</th>
                  <td className="d-flex flex-row">
                    <input
                      type="file"
                      accept="application/pdf,application/msword, .txt"
                      multiple
                      name="file"
                      onChange={handleFileSubmission}
                    />
                    {isFileUploading[0] && !isModalOpen ? (
                      <Spinner animation="border" />
                    ) : (
                      <></>
                    )}
                    {!isFileUploading[0] &&
                    isFileUploading[1] === "uploaded" &&
                    !isModalOpen ? (
                      <FontAwesomeIcon
                        onClick={() => handleDeleteFileSubmission()}
                        className="p-3"
                        icon={faTrashCan}
                      />
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="submit-btn-container">
                    <button
                      disabled={isFileUploading[0]}
                      style={{
                        backgroundColor: isFileUploading[0]
                          ? "grey"
                          : "#081f38",
                      }}
                      className="submit-btn"
                      type="submit"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </form>
        ) : (
          <></>
        )}
      </div>

      <Card
        className={
          dashboardVals.darkMode === "dark" ? "bg-dark text-white ms-5" : "ms-5"
        }
      >
        <div className="mb-5">
          <h2 className="mt-4 text-center">Assignments</h2>
          {fetchCourses.assignment.filter((e) => e.courseName === subCourseCode)
            .length ? (
            <div className="ms-5 col-10">
              <ListGroup variant="flush">
                {fetchCourses.assignment
                  .filter((e) => e.courseName === subCourseCode)
                  .map((element, index) => (
                    <ListGroup.Item
                      className={
                        dashboardVals.darkMode === "dark"
                          ? "bg-dark text-white  my-1 d-flex justify-content-between border border-white"
                          : "my-1 d-flex justify-content-between border"
                      }
                      key={index}
                    >
                      <p className="h5 col-4">{element.name}</p>
                      {submittedAssignments.indexOf(element.uuid!) > -1 ? (
                        assignmentGrade[element.uuid][0] !== 9999 ? (
                          <>
                            <div style={{ color: "#FFA533" }}>
                              Graded!{" "}
                              <FontAwesomeIcon
                                className="mt-2"
                                icon={faCircleCheck}
                              />
                            </div>
                            <div>
                              <h5>{assignmentGrade[element.uuid][0]}/100</h5>
                            </div>
                          </>
                        ) : (
                          <div style={{ color: "green" }}>
                            Submitted!{" "}
                            <FontAwesomeIcon
                              className="mt-2"
                              icon={faCircleCheck}
                            />
                          </div>
                        )
                      ) : (
                        <></>
                      )}

                      <Button
                        onClick={() => displayModel(element)}
                        variant="outline-primary"
                      >
                        View Details
                      </Button>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </div>
          ) : (
            <h5 className="text-center">No assignments has been posted yet!</h5>
          )}
        </div>
      </Card>
      <div>
        {isModalOpen ? (
          <Modal
            className="mt-5 ms-5 text-black"
            size="lg"
            show={isModalOpen}
            backdrop="static"
            keyboard={false}
          >
            {showAlert.show ? (
              <AlertMessage
                success={showAlert.success}
                message={showAlert.message}
                alertDisplay={alertMessageDisplay}
                type=""
              />
            ) : null}
            <Modal.Header
              className={
                dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
              }
              onClick={() => setIsModalOpen(false)}
              closeButton
            >
              <Modal.Title
                className={
                  dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
                }
              >
                {displayOnModal?.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className={
                dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
              }
            >
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
                <Form.Group
                  controlId="formFileSm"
                  className={`mb-3 ${
                    dashboardVals.darkMode === "dark"
                      ? "bg-dark text-white"
                      : ""
                  }`}
                >
                  {submittedAssignments.indexOf(displayOnModal?.uuid!) === -1 &&
                  userDataStore.role === "Student" ? (
                    displayOnModal?.submissiontType === "text" ? (
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
                      <div>
                        <Form.Label>
                          Upload your files (.pdf, .docx, .txt):
                        </Form.Label>{" "}
                        <div className="d-flex flex-row">
                          <Form.Control
                            multiple
                            accept="application/pdf,application/msword, .txt"
                            type="file"
                            size="sm"
                            name="studentFile"
                            onChange={handleFileSubmission}
                          />
                          {!isFileUploading[0] &&
                          isFileUploading[1] === "uploaded" ? (
                            <FontAwesomeIcon
                              onClick={() => handleDeleteFileSubmission()}
                              className="ms-2 pt-2"
                              icon={faTrashCan}
                            />
                          ) : (
                            <></>
                          )}
                          {isFileUploading[0] ? (
                            <Spinner className="ms-3 pt-2" animation="border" />
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                </Form.Group>
              </>
            </Modal.Body>
            <Modal.Footer
              className={
                dashboardVals.darkMode === "dark" ? "bg-dark text-white" : ""
              }
            >
              {/* {userDataStore.role === "Student" ? (
                <Button>Delete</Button>
              ) : (
                <></>
              )} */}
              {userDataStore.role === "Student" &&
              ((displayOnModal?.submissiontType === "file" &&
                isFileUploading[1] === "uploaded") ||
                displayOnModal?.submissiontType === "text") &&
              submittedAssignments.indexOf(displayOnModal?.uuid!) === -1 ? (
                <Button
                  disabled={isFileUploading[0]}
                  onClick={handleSubmissionStudent}
                >
                  Submit Assignment
                </Button>
              ) : (
                <></>
              )}
              {submittedAssignments.indexOf(displayOnModal?.uuid!) > -1 &&
              userDataStore.role === "Student" ? (
                <Button disabled variant="success">
                  Assignment Submitted!
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
