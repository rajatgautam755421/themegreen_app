import React, { ReactNode } from "react";
import "./tooltip.scss";

type TooltipProps = {
  tooltipText: string;
  children: ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ tooltipText, children }) => {
  return (
    <div className="tooltip" data-tooltip={tooltipText}>
      {children}
    </div>
  );
};

export default Tooltip;
