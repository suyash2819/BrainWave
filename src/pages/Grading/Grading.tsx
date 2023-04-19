import React, { useEffect, useState } from "react";
import "./Grading.scss";
import { Alert, Button } from "react-bootstrap";
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
  });

  const changeHandler = (subject: string) => {
    console.log("hi");
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
          <ViewAssignmentGrade subjectToShow = {assignments.subject}/>
        ) : (
          <p>No assignments posted</p>
        )}
      </div>
    </>
  );
}
