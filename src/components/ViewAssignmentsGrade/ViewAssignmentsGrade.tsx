import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import { Assignment } from "../Assignments/IAssignments";
import Card from "react-bootstrap/esm/Card";

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

  const dashboardVals = useAppSelector((state) => state.dashboardValsReducer);

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
  }, [subjectToShow]);

  return (
    <>
      <Card
        className={
          dashboardVals.darkMode === "dark"
            ? "bg-dark text-white ms-5 text-white"
            : "ms-5"
        }
      >
        <div className="m-3">
          <Table
            responsive="md"
            striped={dashboardVals.darkMode === "dark"}
            bordered={dashboardVals.darkMode === "dark"}
            className={dashboardVals.darkMode === "dark" ? "text-white" : ""}
          >
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
                  <td
                    className={
                      dashboardVals.darkMode === "dark" ? "text-white" : ""
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    className={
                      dashboardVals.darkMode === "dark" ? "text-white" : ""
                    }
                  >
                    {assignment.name}
                  </td>
                  <td
                    className={
                      dashboardVals.darkMode === "dark" ? "text-white" : ""
                    }
                  >
                    {assignment.deadlineDate}
                  </td>
                  <td>
                    <Button
                      onClick={() => filteredAssignments(assignment.uuid)}
                    >
                      Grade
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
}

export default ViewAssignmentGrade;
