import React, { ChangeEvent, useState } from "react";
import "./slider.scss";

const MAX_COUNT = 20;

type SliderType = {
  value: number;
  onValueChange: (value: number) => void;
};

const Slider: React.FC<SliderType> = ({ value, onValueChange }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        min={0}
        max={MAX_COUNT}
        value={value}
        className="slider-input"
        onChange={(e) => onValueChange(Number(e.target.value))}
      />
      <output className="slider-value">{value}</output>
    </div>
  );
};

export default Slider;
