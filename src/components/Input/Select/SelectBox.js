import React from "react";
import "./SelectBox.css";
import Select from "react-select";

const SelectBox = ({label, placeholder, inputValue, options, onChangeAction}) => {
  return (
      <div className="form-group mt-3">
        <label>{label}</label>
        <Select
            placeholder={placeholder}
            className="mt-1"
            defaultValue={inputValue}
            onChange={onChangeAction}
            options={options}
        />
      </div>
  )
};

export default SelectBox;