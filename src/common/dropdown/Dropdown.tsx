import React, { useState } from "react";
import "./dropdown.scss";

type DropdownProps = {
  options: string[];
  value: string;
  onValueChange?: (selectedOption: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onValueChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <div
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        {value || "Select an option"}
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onValueChange && onValueChange(option);
                setIsOpen(false);
              }}
              role="button"
              tabIndex={0}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
