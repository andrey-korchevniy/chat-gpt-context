import React, { useState } from 'react';

function Slider({ onChange, data, title, min, max, step }) {
  const [value, setValue] = useState(data);

  const handleChange = event => {
    setValue(event.target.value);
  };
  let timeoutId;
  const handleOnInput = e => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      onChange(parseFloat(e.target.value)); // Делаем что-то с полученным значением
    }, 1000);
  };

  return (
    <div>
      <h4>{title}</h4>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onInput={handleOnInput}
      />
      <span>{value}</span>
    </div>
  );
}

export default Slider;
