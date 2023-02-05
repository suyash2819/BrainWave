import React from "react";
import "../../pages/RegPage/RegPage.scss";

interface Props {
  title: string;
  formVals: { [key: string]: string };
  setFormVals: any;
  mandateText: boolean;
  pattern: string;
  type: string;
}

export default function RegInput({
  title,
  formVals,
  setFormVals,
  mandateText,
  pattern,
  type = "text",
}: Props) {
  return (
    <div className="regContainer__form__element">
      <label
        className={
          "regContainer__form__element__label" +
          (mandateText ? " mandateText" : "")
        }
      >
        {title}:
      </label>
      <input
        className="regContainer__form__element__input"
        type={type}
        id={title}
        maxLength={30}
        minLength={type === "Password" ? 8 : 3}
        pattern={pattern}
        required={mandateText}
        value={formVals[title.toLowerCase()]}
        onChange={(e) =>
          setFormVals({ ...formVals, [title.toLowerCase()]: e.target.value })
        }
      />
    </div>
  );
}
