import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Assignment } from "../components/Assignments/IAssignments";
import { db } from "../config/firebase";

export async function storeCourseAssignment(assignment: Assignment) {
  const assignmentRef = doc(db, "courses", assignment.courseName);
  console.log(assignmentRef);
  return updateDoc(assignmentRef, {
    assignments: arrayUnion(assignment),
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export async function updateAssignmentArray(courseCode: string, uuid: string) {
  const assignmentRef = doc(db, "assigments", courseCode);
  console.log(assignmentRef);
  console.log(uuid);
  return updateDoc(assignmentRef, {
    [uuid]: [],
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export async function updateAssignmentUUIDArray(
  courseCode: string,
  uuid: string,
  email: string
) {
  const assignmentRef = doc(db, "assigments", courseCode);
  console.log(assignmentRef);
  console.log(uuid);
  return updateDoc(assignmentRef, {
    [uuid]: arrayUnion(email),
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
