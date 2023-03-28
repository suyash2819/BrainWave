import { db } from "../config/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { Announcement } from "../reducers/IAnnouncementProps";
import { collection } from "firebase/firestore";

export async function getCourseDetails(course: string) {
  const docRef = doc(db, "courses", course);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}
export async function getAllCourses() {
  const docSnap = await getDocs(collection(db, "courses"));
  return docSnap;
}

export async function storeCourseAnnoncements(announcement: Announcement) {
  const announcementRef = doc(db, "courses", announcement.announcement_subject);

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

export async function deleteCourseAnnouncements(
  announcement_subject: string,
  ann: Announcement
) {
  const courseRef = doc(db, "courses", announcement_subject);

  updateDoc(courseRef, {
    announcements: arrayRemove(ann),
  })
    .then(() => {
      console.log("deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function storeCoursesEnrollent(userEmail: string, course: string) {
  const enrollmentRef = doc(db, "courses_for_enrollment", userEmail);

  const docSnap = await getDoc(enrollmentRef);

  if (docSnap.exists()) {
    return updateDoc(enrollmentRef, {
      courses: arrayUnion(course),
    })
      .then((data) => {
        console.log(data);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } else {
    await setDoc(doc(db, "courses_for_enrollment", userEmail), {
      courses: [course],
    });
  }
}

export async function getAllCoursesEnrollments() {
  const docSnap = await getDocs(collection(db, "courses_for_enrollment"));
  return docSnap;
}
