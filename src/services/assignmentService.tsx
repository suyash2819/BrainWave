import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Assignment } from "../components/Assignments/IAssignments";
import { db } from "../config/firebase";

export async function storeCourseAssignment(assignment: Assignment) {
  const assignmentRef = doc(db, "courses", assignment.courseName);

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

export async function updateAssignmentArray(
  email: string,
  data: { [x: string]: any }
) {
  await setDoc(doc(db, "submissionAssignments", email), data)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

export async function fetchStudentSubmittedAssignment(email: string) {
  const documentStudent = doc(db, "submissionAssignments", email);
  const docSnap = await getDoc(documentStudent);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return {};
  }
}
