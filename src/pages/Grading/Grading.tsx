import React, { useEffect, useState } from "react";
import "./Grading.scss";
import { Alert, Button, Table, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFacultyGradingAssignments } from "../../services/assignmentService";
import { modifyallSubmittedAssignments } from "../../reducers/submittedAssignments";
import ViewAssignmentGrade from "../../components/ViewAssignmentsGrade/ViewAssignmentsGrade";
type DisplayData = { email: string; assignment: number };

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
    assigmentId: "",
  });

  const changeHandler = (subject: string) => {
    setAssignments({ ...assignments, subject: subject, show: true });
  };
  console.log(assignments.displayDataOnModal);

  return (
    <>
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
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.email}</td>
                    <td></td>
                    <td>
                      {item.assignment === 9999
                        ? "Not Graded"
                        : item.assignment}
                    </td>
                    <td>
                      {" "}
                      {item.assignment === 9999 ? (
                        <input
                          type="text"
                          className="form-control"
                          id="gradeFor"
                          placeholder="gradeFor"
                        />
                      ) : (
                        "graded"
                      )}
                    </td>
                    <td>
                      {" "}
                      {item.assignment === 9999 ? (
                        <Button> Publish Grade</Button>
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
