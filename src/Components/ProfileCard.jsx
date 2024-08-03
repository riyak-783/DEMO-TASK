import React from 'react';

const ProfileCard = ({ user, onEdit }) => {
  return (
    <div className="max-w-sm mx-auto relative  bg-white shadow-lg rounded-lg content-center  gap-40 ">
      <img className="w-full h-50 overflow-hidden object-cover" src={user.profileImage} alt="Profile" />
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-semibold font-mono text-gray-800">{user.name}</h2>
        <p className="text-gray-800 mt-2 font-semibold italic">{user.email}</p>
        <p className="text-gray-600 mt-4">{user.bio}</p>
        <button
          onClick={() => onEdit(user.id)}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
