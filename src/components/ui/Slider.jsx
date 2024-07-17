import React from 'react';

export const Slider = ({ value, onValueChange, max, step, className }) => {
  return (
    <input
      type="range"
      value={value}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
      max={max}
      step={step}
      className={className}
    />
  );
};