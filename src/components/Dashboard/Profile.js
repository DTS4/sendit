"use client"

import { useState } from "react"
import "../../styles/Profile.css"

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Frontend Developer | React Enthusiast",
    avatar: "/default-avatar.png", // Placeholder avatar
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Temporary URL for preview
      setUser((prevUser) => ({ ...prevUser, avatar: imageUrl }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Updated user:", user)
    alert("Profile updated successfully!")
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header"></div>

      {/* Avatar Section */}
      <div className="profile-avatar-container">
        <img src={user.avatar} alt="Profile" className="profile-avatar" />
        <label className="avatar-upload-button">
          📷
          <input type="file" accept="image/*" className="hidden-input" onChange={handleAvatarChange} />
        </label>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="email">Email</label>
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
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  )
}

export default Profile
