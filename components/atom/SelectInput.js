import React from 'react';

const SelectInput = ({ title, value, name, children, onChange, disabled }) => {
  return (
    <div className="flex">
      <div className="w-1/2 p-2">{title}</div>
      <select
        name={name}
        className="w-1/2 p-2 border rounded border-three"
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  );
};

export default SelectInput;
