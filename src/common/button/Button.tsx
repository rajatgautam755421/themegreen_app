import React from "react";
import "./button.scss";

interface ButtonProps {
  onClick: () => void;
  color?: "primary" | "secondary";
  text: string;
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  color = "primary",
  text,
  size = "medium",
}) => {
  return (
    <button className={`btn ${size} ${color}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default React.memo(Button);
