import React from 'react';

const Form = ({ title, children }) => {
  return (
    <div className="w-full max-w-xl p-4 rounded shadow-lg">
      <h2 className="mt-5 mb-5 font-semibold">{title}</h2>
      <form className="flex flex-col space-y-3">{children}</form>
    </div>
  );
};

export default Form;
