import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import { Assignment } from "../Assignments/IAssignments";

interface PropsViewAssignmentGrade {
  subjectToShow: string;
}

function ViewAssignmentGrade({ subjectToShow }: PropsViewAssignmentGrade) {
  const fetchCourses = useAppSelector((state) => state.fetchCoursesReducer);
  //   const [subjectName, setSubjectName] = useState<string>();
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
  }, [assignmentsForSubject, fetchCourses.assignment, subjectToShow]);

  return (
    <>
      <div className="m-3">
        <Table responsive="md" striped="columns">
          <thead>
            <th>#</th>
            <th>Assignment Name</th>
            <th>Assignment Date</th>
            <th>View Submissions</th>
          </thead>
          <tbody>
            {/* {assignmentsForSubject.map((element,index)=>(



                )} */}
            {assignmentsForSubject.map((assignment, index) => (
              //   <p key={index}>{assignment.name}</p>

              <tr>
                <td>{index}</td>
                <td>{assignment.name}</td>
                <td>{assignment.deadlineDate}</td>
                <td>
                  <Button>View</Button>
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

