import React from 'react';

const InputWithTitle = ({ title, type, accept, onChange, value, disabled }) => {
  return (
    <div className="flex w-full">
      <div className="w-1/2 p-2">{title}</div>
      <input
        type={type}
        accept={accept}
        onChange={onChange}
        value={value}
        className="w-1/2 p-2 border rounded border-three"
        disabled={disabled}
      />
    </div>
  );
};

export default InputWithTitle;
