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
  type = "text",
}: Props) {
  return (
    <div className="regContainer__form__element">
      <label className={"regContainer__form__element__label"}>{title}:</label>
      <input
        className="regContainer__form__element__input"
        type={type}
        id={title}
        maxLength={30}
        value={formVals[title.toLowerCase()]}
        onChange={(e) =>
          setFormVals({ ...formVals, [title.toLowerCase()]: e.target.value })
        }
      />
    </div>
  );
}
