import React from "react";
import "./badge.scss";

type BadgeProps = {
  text: string;
  color?: string;
};

const Badge: React.FC<BadgeProps> = ({ text, color = "primary" }) => {
  return <span className={`badge badge-${color}`}>{text}</span>;
};

export default Badge;
