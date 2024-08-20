// src/components/Preloader.js
import React from 'react';
import { Spin } from 'antd'; // Import Ant Design Spin component

const Preloader = () => (
  <div className="flex justify-center items-center min-h-screen bg-black">
    <Spin size="large" /> {/* Preloader spinner */}
  </div>
);

export default Preloader;
