import React from "react";
import { Alert } from "react-bootstrap";
import { IAlertProps } from "./IAlertProps";
import "./AlertMessage.scss";

const AlertMessage = ({
  success,
  message,
  alertDisplay,
  type,
}: IAlertProps) => {
  return (
    <Alert
      className="AlertMessage"
      variant={
        success
          ? "success"
          : type === "primary"
          ? "primary"
          : type === "success"
          ? "success"
          : "danger"
      }
      onClose={() => alertDisplay()}
      dismissible
    >
      {" "}
      {message || ""}
    </Alert>
  );
};

export default AlertMessage;
