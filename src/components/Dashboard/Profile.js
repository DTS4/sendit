import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, User } from "lucide-react";
import "../../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Frontend Developer | React Enthusiast",
    avatar: "/default-avatar.png",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, avatar: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sendit-backend-j83j.onrender.com/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <motion.div 
        className="profile-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      ></motion.div>

      {/* Avatar Section */}
      <div className="profile-avatar-container">
        <motion.img 
          src={user.avatar} 
          alt="Profile" 
          className="profile-avatar"
          whileHover={{ scale: 1.1 }}
        />
        <label className="avatar-upload-button">
          <Camera className="icon" />
          <input type="file" accept="image/*" className="hidden-input" onChange={handleAvatarChange} />
        </label>
      </div>

      {/* Profile Form */}
      <motion.form 
        onSubmit={handleSubmit} 
        className="profile-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="name"><User className="form-icon" /> Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"><Mail className="form-icon" /> Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            value={user.bio}
            onChange={handleInputChange}
            className="input-field"
          ></textarea>
        </div>
        <motion.button 
          type="submit" 
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Profile
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Profile;