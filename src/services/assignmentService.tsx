import {
  DocumentData,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

export async function fetchFacultyGradingAssignments() {
  const allSubmissionsbyStudents = await getDocs(
    collection(db, "submissionAssignments")
  );
  
  const allSubmittedAssignments: (string | DocumentData)[][] = [];
  allSubmissionsbyStudents.forEach((e) => {
    allSubmittedAssignments.push([e.id, e.data()]);
  });
  return allSubmittedAssignments;
}

export async function updateAssignmentGrades(
  grade: number,
  assignmentId: string,
  email: string
) {
  const assignmentDoc = doc(db, "submissionAssignments", email);
  const docSnap = await getDoc(assignmentDoc);
  if (docSnap.exists()) {
    const updatedGrades = [grade, docSnap.data()[assignmentId][1]];
    return updateDoc(assignmentDoc, {
      [assignmentId]: updatedGrades,
    })
      .then(() => {
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  } else {
    return {};
  }
}
