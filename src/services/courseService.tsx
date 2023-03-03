import { db } from "../config/firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Announcement } from "../reducers/IAnnouncementProps";

export async function getCourseDetails(course: string) {
  const docRef = doc(db, "courses", course);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function storeCourseAnnoncements(announcement: Announcement) {
  const announcementRef = doc(db, "courses", announcement.announcement_subject);

  // Atomically add a new region to the "regions" array field.
  return updateDoc(announcementRef, {
    announcements: arrayUnion(announcement),
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
