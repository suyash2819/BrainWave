import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getCountFromServer,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export async function storeUserDetails(userDetails: {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  email: string;
  password?: string;
  uid: number;
  isVerifiedByAdmin: boolean;
}) {
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
