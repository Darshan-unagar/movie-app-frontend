import React from 'react';

const DefaultProfilePicture = ({ username }) => {
  const firstLetter = username.charAt(0).toUpperCase();
  
  return (
    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-white">
      {firstLetter}
    </div>
  );
};

export default DefaultProfilePicture;
