import React, { ChangeEvent } from "react";
import "./checkbox.scss";

type CheckboxProps = {
  label?: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className="checkbox">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          className="checkbox-input"
        />
        <span className="checkbox-custom"></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
