import React, { useState } from "react";
import "./FooterMain.scss";
import "firebase/firestore";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
type FooterItem = {
  title: string;
  data: string;
  buttonText?: string;
  inputText?: string;
};

type StateProps = {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const FooterMain = ({ setState }: StateProps) => {
  const footerData: FooterItem[] = [
    {
      title: "Powered by IU",
      data: "Brainwave Inc., partners with leading universities and institutions across the globe to provide world-class online education in the fields of art and creative technology.",
    },
    {
      title: "Are you an Institution?",
      data: "BrainWave is always looking for new partners. Find out how you can start working with us today.",
      buttonText: "CONTACT US NOW",
    },
    {
      title: "Connect with BrainWave",
      data: "Enter your email to be the first to hear about updates and new courses offered by Kadenze.",
      inputText: "Email Address",
      buttonText: "STAY IN TOUCH",
    },
  ];
  const [footer_email, set_footerEmail] = useState("");
  useState("");

  // const [isSaving, setIsSaving] = useState(false);

  const footer_emailCollection = collection(db, "newsLetterSubscription");

  const handle_footerSubscribe = async () => {
    try {
      await addDoc(footer_emailCollection, { footer_email });
      console.log("Email saved successfully");
      alert("Successfully subscribed!");
      set_footerEmail("");
    } catch (error) {
      alert("invalid email");
      console.error("Error saving email:", error);
    }
  };

  return (
    <footer className="footer-main">
      {footerData.map((item: FooterItem, index: number) => (
        <div key={index} className="footer-item">
          <h3 className="footer-title">{item.title}</h3>
          <p className="footer-data">{item.data}</p>
          {item.inputText && (
            <input
              onChange={(e) => set_footerEmail(e.target.value)}
              type="text"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              value={footer_email}
              placeholder={item.inputText}
            />
          )}

          {item.buttonText && (
            <button
              className="footer-button"
              onClick={() => {
                if (item.buttonText === "CONTACT US NOW") {
                  setState(true);
                } else if (item.buttonText === "STAY IN TOUCH") {
                  handle_footerSubscribe();
                }
              }}
            >
              {item.buttonText}
            </button>
          )}
        </div>
      ))}
    </footer>
  );
};

export default FooterMain;
