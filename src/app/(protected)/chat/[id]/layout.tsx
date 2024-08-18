// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 to-gray-400">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
