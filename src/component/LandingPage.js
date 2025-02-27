import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
 FaFacebook,
 FaTwitter,
 FaInstagram,
 FaLinkedin,
 FaMapMarkerAlt,
 FaPhone,
 FaEnvelope,
 FaArrowLeft,
} from "react-icons/fa";


function LandingPage() {
 const [showRoleModal, setShowRoleModal] = useState(false);
 const [formData, setFormData] = useState({
   name: "",
   email: "",
   message: "",
 });
 const navigate = useNavigate();


 const handleSignUpClick = () => setShowRoleModal(true);


 const handleRoleSelection = (role) => {
   setShowRoleModal(false);
   navigate(`/signup/${role}`);
 };


 const handleBackToLanding = () => setShowRoleModal(false);


 const handleLoginClick = () => navigate("/login");


 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
 };


 const handleFormSubmit = (e) => {
   e.preventDefault();
   alert("Message sent successfully!");
   setFormData({ name: "", email: "", message: "" });
 };


 return (
   <>
     <header className="header">
       <nav className="nav container">
         <div className="nav-content">
           <div className="logo">
             <a href="#home">
               <img src="/logo1.png" alt="SendIT Logo" className="logo-img" />
             </a>
           </div>
           <div className="nav-links">
             <a href="#home" className="nav-link">Home</a>
             <a href="#about" className="nav-link">About</a>
             <a href="#services" className="nav-link">Services</a>
             <a href="#contact" className="nav-link">Contact</a>
           </div>
           <div className="auth-buttons">
             <button className="login-button" onClick={handleLoginClick}>Login</button>
             <button className="signup-button" onClick={handleSignUpClick}>Sign Up</button>
           </div>
         </div>
       </nav>
     </header>


     {showRoleModal && (
       <div className="role-modal">
         <div className="modal-content">
           <p>Choose your role:</p>
           <button className="button" onClick={() => handleRoleSelection("user")}>User</button>
           <button className="button-outline" onClick={() => handleRoleSelection("admin")}>Admin</button>
           <button className="back-button" onClick={handleBackToLanding}>
             <FaArrowLeft />
           </button>
         </div>
       </div>
     )}


   </>
 );
}


export default LandingPage;
