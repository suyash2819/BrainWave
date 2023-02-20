// import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export async function storeUserDetails(userDetails: {
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  email: string;
  uid: string;
  isVerifiedByAdmin: boolean;
}) {
  try {
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
