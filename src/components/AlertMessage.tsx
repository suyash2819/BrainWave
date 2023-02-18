import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
  success: Boolean;
  message: String;
  alertDisplay: Function;
  type: String;
}

const AlertMessage = ({ success, message, alertDisplay, type }: Props) => {
  return (
    <Alert
      variant={success ? "success" : type === "primary" ? "primary" : "danger"}
      onClose={() => alertDisplay()}
      dismissible
    >
      {" "}
      {message || ""}
    </Alert>
  );
};

export default AlertMessage;
