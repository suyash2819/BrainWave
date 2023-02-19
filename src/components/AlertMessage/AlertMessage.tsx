import React from "react";
import { Alert } from "react-bootstrap";
import { IAlertProps } from "./IAlertProps";

const AlertMessage = ({
  success,
  message,
  alertDisplay,
  type,
}: IAlertProps) => {
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
