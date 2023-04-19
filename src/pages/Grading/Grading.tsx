import React, { useEffect, useState } from "react";
import "./Grading.scss";
import { Alert, Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchFacultyGradingAssignments } from "../../services/assignmentService";
import { modifyallSubmittedAssignments } from "../../reducers/submittedAssignments";
import ViewAssignmentGrade from "../../components/ViewAssignmentsGrade/ViewAssignmentsGrade";

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
    displayDataOnModal: [],
  });

  const changeHandler = (subject: string) => {
    setAssignments({ ...assignments, subject: subject, show: true });
  };

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
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
              unde commodi aspernatur enim, consectetur. Cumque deleniti
              temporibus ipsam atque a dolores quisquam quisquam adipisci
              possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
              quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
              Mollitia reiciendis porro quo magni incidunt dolore amet atque
              facilis ipsum deleniti rem!
            </p>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
}
