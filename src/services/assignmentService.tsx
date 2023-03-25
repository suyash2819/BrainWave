import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Assignment } from "../components/Assignments/IAssignments";
import { db } from "../config/firebase";

export async function storeCourseAssignment(assignment: Assignment) {
    const assignmentRef = doc(db, "courses", assignment.courseName);
  
    return updateDoc(assignmentRef, {
      assignments: arrayUnion(assignment),
    })
      .then((data) => {
        console.log(data);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }