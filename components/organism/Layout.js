import React from 'react';
import Header from '../molekul/Header';

const Layout = ({ children }) => {
  return (
    <main className="min-h-screen py-10 bg-white">
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="flex flex-col items-center px-20 text-one">
        {children}
      </div>
    </main>
  );
};

export default Layout;
