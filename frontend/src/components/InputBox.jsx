import React from 'react';

const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded border-slate-200 p-2"
      />
    </div>
  );
};

export default InputBox;
