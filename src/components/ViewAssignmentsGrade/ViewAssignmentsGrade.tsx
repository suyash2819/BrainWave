import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import { Assignment } from "../Assignments/IAssignments";

interface PropsViewAssignmentGrade {
  subjectToShow: string;
  setAssignments: any;
  assignments: any;
}

function ViewAssignmentGrade({
  subjectToShow,
  setAssignments,
  assignments,
}: PropsViewAssignmentGrade) {
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);

  const [assignmentsForSubject, setAssignmentsForSubject] = useState<
    Assignment[]
  >([]);

  useEffect(() => {
    if (subjectToShow) {
      const assignemntToShow = fetchCourses.assignment.filter(
        (assignment) => assignment.courseFullName === subjectToShow
      );
      setAssignmentsForSubject(assignemntToShow);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="m-3">
        <Table responsive="md" striped="columns">
          <thead>
            <tr>
              <th>#</th>
              <th>Assignment Name</th>
              <th>Assignment Date</th>
              <th>View Submissions</th>
            </tr>
          </thead>
          <tbody>
            {assignmentsForSubject.map((assignment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{assignment.name}</td>
                <td>{assignment.deadlineDate}</td>
                <td>
                  <Button
                    onClick={() =>
                      setAssignments({ ...assignments, showGraderModal: true })
                    }
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ViewAssignmentGrade;
