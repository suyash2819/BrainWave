import React, { useEffect, useState } from "react";
import "./Grading.scss";
import { Alert, Button, Table, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchFacultyGradingAssignments,
  updateAssignmentGrades,
} from "../../services/assignmentService";
import { modifyallSubmittedAssignments } from "../../reducers/submittedAssignments";
import ViewAssignmentGrade from "../../components/ViewAssignmentsGrade/ViewAssignmentsGrade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudDownload } from "@fortawesome/free-solid-svg-icons";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

type DisplayData = {
  email: string;
  assignment: number;
  assignmentSubmittedFile: string;
};

export default function Grading() {
  const dispatchReducer = useAppDispatch();
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  useEffect(() => {
    const data = fetchFacultyGradingAssignments();
    data.then((e) => {
      dispatchReducer(modifyallSubmittedAssignments(e));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [assignments, setAssignments] = useState({
    show: false,
    subject: "",
    showGraderModal: false,
    displayDataOnModal: [] as DisplayData[],
    assignmentId: "",
  });

  const [grade, setGrade] = useState(0);

  const changeHandler = (subject: string) => {
    setAssignments({ ...assignments, subject: subject, show: true });
  };

  const [showAlert, setShowAlert] = useState({
    success: null || true || false,
    message: "",
    show: false,
    type: "",
  });

  const alertMessageDisplay = () => {
    setShowAlert({ success: false, show: false, message: "", type: "" });
  };
  console.log(showAlert);

  const localGradeUpdate = (
    grade: number,
    assignmentId: string,
    email: string
  ) => {
    if (grade < 0 || grade > 100) {
      setAssignments({ ...assignments, showGraderModal: false });
      setShowAlert({
        success: false,
        show: true,
        message: "grade cannot be greater than 100 or less than 0",
        type: "danger",
      });
    } else {
      updateAssignmentGrades(grade, assignmentId, email).then((updated) => {
        if (updated) {
          console.log(updated);
          setAssignments({ ...assignments, showGraderModal: false });
          setShowAlert({
            success: true,
            show: true,
            message: "graded successfully",
            type: "success",
          });
        } else {
          setAssignments({ ...assignments, showGraderModal: false });
          setShowAlert({
            success: false,
            show: true,
            message: "error",
            type: "danger",
          });
        }
      });
    }
  };
  return (
    <>
      <div>
        {showAlert.show ? (
          <AlertMessage
            success={showAlert.success}
            message={showAlert.message}
            alertDisplay={alertMessageDisplay}
            type=""
          />
        ) : null}
      </div>
      <div>
        {fetchCourses.courseDetails.map((element, index) => (
          <Alert
            key={index}
            className="m-3 d-flex flex-row justify-content-between"
            variant="info"
          >
            <p className="h4">{element}</p>
            {fetchCourses.assignment.filter((e) => e.courseFullName === element)
              .length ? (
              <Button variant="info" onClick={() => changeHandler(element)}>
                View Assignments
              </Button>
            ) : (
              <p>No assignments posted</p>
            )}
          </Alert>
        ))}
        <hr />
      </div>

      <div>
        {assignments.show ? (
          <>
            <ViewAssignmentGrade
              subjectToShow={assignments.subject}
              assignments={assignments}
              setAssignments={setAssignments}
            />
          </>
        ) : (
          <p>No assignments posted</p>
        )}
      </div>
      {assignments.showGraderModal ? (
        <Modal
          show={assignments.showGraderModal}
          onHide={() =>
            setAssignments({ ...assignments, showGraderModal: false })
          }
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Subject Name
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Files</th>
                  <th>Grade</th>
                  <th>Change grade</th>
                  <th>Publish grade changes</th>
                </tr>
              </thead>
              <tbody>
                {assignments.displayDataOnModal.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>
                      <Button href={item.assignmentSubmittedFile}>
                        <FontAwesomeIcon
                          icon={faCloudDownload}
                        ></FontAwesomeIcon>
                      </Button>
                    </td>
                    <td>
                      {item.assignment === 9999
                        ? "Not Graded"
                        : item.assignment}
                    </td>
                    <td>
                      {" "}
                      {item.assignment === 9999 ? (
                        <input
                          type="number"
                          min={0}
                          max={100}
                          className="form-control"
                          id="gradeFor"
                          placeholder="out of 100"
                          onChange={(e) => setGrade(parseInt(e.target.value))}
                        />
                      ) : (
                        "graded"
                      )}
                    </td>
                    <td>
                      {" "}
                      {item.assignment === 9999 ? (
                        <Button
                          onClick={() =>
                            localGradeUpdate(
                              grade,
                              assignments.assignmentId,
                              item.email
                            )
                          }
                        >
                          {" "}
                          Publish Grade
                        </Button>
                      ) : (
                        "graded"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}

// getDownloadURL(
//     ref(
//       storage,
//       courseDetailAssign.title +
//         "/" +
//         Assignment.uuid +
//         "/" +
//         userDataStore.role +
//         "/" +
//         file[0].name
//     )
//   ).then((url) => {
//     console.log(url);
//     setIsFileUploading([false, "uploaded"]);
//     setAssignment({ ...Assignment, file: url });
//   });
