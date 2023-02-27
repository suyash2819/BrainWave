import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getCourseDetails(course: string) {
  const docRef = doc(db, "courses", course);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}
