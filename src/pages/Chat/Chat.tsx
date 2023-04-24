import React, { useRef, MutableRefObject, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useAppSelector } from "../../hooks";
import "firebase/firestore";
import { db } from "../../config/firebase";
import { courseDetail } from "../BrowseCourses/IPropsCourses";
import { getAllCourses } from "../../services/courseService";

import "./Chat.scss";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { Spinner } from "react-bootstrap";

type Message = {
  id: string;
  message: string;
  firstname: string;
  email: string;
  timestamp: Timestamp;
  role: string;
};

let tempCourseDetail: courseDetail;
export default function Chat() {
  const messageInputRef = useRef<HTMLInputElement>(null);
  const courseStore = useAppSelector((state) => state.fetchCoursesReducer);
  const [messages, setMessages] = useState<Message[]>([]);
  const userDetails = useAppSelector((state) => state.userLoginAPI);
  const subCourseName = useAppSelector((state) => state.dashboardValsReducer);
  const subCourseFullHeading =
    courseStore.courseDetails[
      courseStore.courseDetails.indexOf(
        subCourseName.showComponent.substring(
          subCourseName.showComponent.indexOf(" ") + 1,
          subCourseName.showComponent.length
        )
      )
    ];
  const [subCourseDetails, setSubCourseDetails] = useState<courseDetail>({
    title: "",
    professor: "",
    sem: "",
  });

  const fetchingCourses = async () => {
    const tempAllCourses = getAllCourses();
    (await tempAllCourses).forEach((doc) => {
      const dataDoc: any = doc.data();
      if (dataDoc.title === subCourseFullHeading) {
        tempCourseDetail = {
          subCode: dataDoc.code,
          title: dataDoc.title,
          description: dataDoc.description,
          professor: dataDoc.Instructor,
          sem: dataDoc.Semester,
        };
      }
    });
    setSubCourseDetails(tempCourseDetail);
  };
  const messagesEndRef = useRef() as MutableRefObject<HTMLDivElement>;
  const messageBoxScroll = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    fetchingCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCourseFullHeading]);

  async function handleMessageSend() {
    // const message = messageInputRef.current?.value;
    const message = messageInputRef.current?.value.trim();
    if (message) {
      const { firstname, email, role } = userDetails;
      const messageData = {
        message,
        firstname,
        email,
        role,
        subject: subCourseDetails?.title,
        timestamp: serverTimestamp(),
      };

      const messageRef = await addDoc(collection(db, "messages"), messageData)
        .then(() => {
          if (messageInputRef.current) {
            messageInputRef.current.value = "";
          }
          console.log("message succesfully sent:", messageRef);
        })
        .catch((error) => {
          console.error("Error adding message: ", error);
        });
    } else {
    }
  }
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [messages]);

  useEffect(() => {
    const queryRef = query(
      collection(db, "messages"),
      where("subject", "==", subCourseDetails?.title),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as Message);
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [subCourseDetails?.title]);

  return (
    <>
      <div>
        {subCourseDetails.title?.length === 0 ? (
          <Spinner className="" animation="border" />
        ) : (
          <></>
        )}
      </div>
      <div ref={messageBoxScroll} className="chat-container">
        <h2 style={{ paddingTop: "3%", marginLeft: "40px" }}>
          {subCourseDetails?.title} Course Discussions
        </h2>
        {messages.length ? (
          <div className="messages-panel">
            {messages.map((message) => {
              const isSentByCurrentUser = message.email === userDetails.email;
              const chatTimestamp = message.timestamp
                ? message.timestamp.toDate()
                : null;
              const messageClass = isSentByCurrentUser
                ? "message-right bg-primary text-white"
                : "message-left bg-secondary text-white";
              return (
                <div key={message.id} className={`message ${messageClass}`}>
                  <div className="message-text">{message.message}</div>
                  <div className="message-details" style={{ color: "white" }}>
                    {message.email}{" "}
                    {chatTimestamp && chatTimestamp.toLocaleString()} -
                    <b>
                      {" "}
                      {message.role
                        ? message.role === "Student"
                          ? ""
                          : message.role
                        : ""}
                    </b>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="messages-panel">
            <h1 style={{ textAlign: "center" }}>There are No Messages!</h1>
            <h4 style={{ textAlign: "center" }}>But feel free to send one </h4>
          </div>
        )}

        <div className="input-panel">
          <Form.Control
            ref={messageInputRef}
            type="text"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleMessageSend();
              }
            }}
          />
          <Button variant="dark" onClick={handleMessageSend}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
