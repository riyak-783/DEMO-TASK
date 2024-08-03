import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import usersData from '../list.json'; // Importing the JSON data

const ProfilePage = () => {
  const [users, setUsers] = useState(usersData); 
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setFormData(user);
    setCurrentUserId(id);
    setEditMode(true);
  };

  const handleSave = () => {
    setUsers(users.map((user) => (user.id === currentUserId ? formData : user)));
    setEditMode(false);
    console.log('Profile updated:', formData);
  };

  return (
    <div className="min-h-screen bg-cyan-950  flex flex-row items-center justify-center p-4 md:p-6">
      {editMode ? (
        <div className="max-w-md w-full bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Profile Picture</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="space-y-4 w-full">
          {users.map((user) => (
            <ProfileCard key={user.id} user={user} onEdit={handleEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
