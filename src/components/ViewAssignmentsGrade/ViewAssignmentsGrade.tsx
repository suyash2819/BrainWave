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
  const allSubmittedAssignmentsVals = useAppSelector(
    (state) => state.allSubmittedAssignmentsRedudcer
  );
  const [assignmentsForSubject, setAssignmentsForSubject] = useState<
    Assignment[]
  >([]);

  const filteredAssignments = (assignmentId: string) => {
    const displayDataOnModala =
      allSubmittedAssignmentsVals.allSubmittedAssignments
        .filter((item: any) => Object.keys(item[1]).includes(assignmentId))
        .map((item: any) => ({
          email: item[0],
          assignment: item[1][assignmentId][0],
          assignmentSubmittedFile: item[1][assignmentId][1],
        }));
    setAssignments({
      ...assignments,
      displayDataOnModal: displayDataOnModala,
      assignmentId: assignmentId,
      showGraderModal: true,
    });
  };
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
                  <Button onClick={() => filteredAssignments(assignment.uuid)}>
                    Grade
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
