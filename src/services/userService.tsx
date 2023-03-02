import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getCountFromServer,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { getCourseDetails } from "./courseService";
import { IUserProps } from "../reducers/IUserProps";
import { useNavigate } from "react-router-dom";

export async function storeUserDetails(userDetails: IUserProps) {
  try {
    if (userDetails.password) {
      delete userDetails.password;
    }
    const docRef = await addDoc(collection(db, "users"), userDetails);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("user signed out");
      })
      .catch((err) => {
        // An error happened.
        console.log(err);
      });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserCount() {
  const coll = collection(db, "users");
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
}

export async function storeContactUsInfo(email: string, text: string) {
  try {
    const contactUs = { email, text };
    const docRef = await addDoc(collection(db, "contactus"), contactUs);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getUserSpecificDetails(email: string) {
  try {
    const userDetails = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(userDetails);
    return querySnapshot;
  } catch (e) {
    console.log(e);
  }
}

export async function checkUniqueUsername(username: string) {
  try {
    const coll = collection(db, "users");
    const q = query(coll, where("username", "==", username));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch {}
}

export async function getUserCourses(email: string) {
  // const coll = collection(db,"user_courses")
  const courseDoc = doc(db, "user_courses", email);
  const docSnap = await getDoc(courseDoc);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    docSnap.data()["courses"].map((course: string) => {
      // courses.push(getCourseDetails(course));
      //To Do to take all the courses into array and return
      let ok;
      getCourseDetails(course).then((data) => {
        ok = data;
      });
      //remove this return later
      return ok;
    });
  } else {
    console.log("No such document!");
  }
}

export const UserSignOut = async () => {
  const navigate = useNavigate();
  signOut(auth)
    .then(() => {
      localStorage.removeItem("bwUser");
      navigate("/login");
    })
    .catch((err) => {
      // An error happened.
      console.log(err.message);
    });
};
