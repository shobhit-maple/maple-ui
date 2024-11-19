import React from "react";
import "./TextBox.css";

const TextBox = ({label, placeholder, inputValue, onChangeAction}) => {
  return (
      <div className="form-group mt-3">
        <label>{label}</label>
        <input
            type="text"
            value={inputValue}
            className="form-control mt-1"
            placeholder={placeholder}
            onChange={onChangeAction}
        />
      </div>
  )
};

export default TextBox;