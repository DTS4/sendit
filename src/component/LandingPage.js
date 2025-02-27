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
     
   </>
 );
}


export default LandingPage;
