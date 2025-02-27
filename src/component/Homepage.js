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


function HomePage() {
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


     <section id="home" className="hero">
       <div className="container hero-content">
         <div className="hero-text">
           <h1 className="hero-title">Fast & Reliable Parcel Delivery Services</h1>
           <p className="hero-description">Get your packages delivered safely and on time with our professional courier service.</p>
           <button className="get-started-button" onClick={handleSignUpClick}>Get Started</button>
         </div>
         <div className="hero-image">
           <img src="/delivery-image.jpg" alt="Delivery Service" className="hero-img" />
         </div>
       </div>
     </section>


     <section id="about" className="about">
       <div className="container">
         <div className="about-text">
           <h2 className="section-title">About Us</h2>
           <p>Your parcels, delivered swiftly and securely. We're a dedicated courier service committed to getting your packages where they need to go, on time, every time. With real-time tracking and transparent communication, you're always in the know about your delivery.</p>
         </div>
         <div className="about-image">
           <img src="/delivery-person.png" alt="Delivery Service" className="about-img" />
         </div>
       </div>
     </section>


     <section id="services" className="features">
       <div className="container">
         <h2 className="section-title">Why Choose SendIT?</h2>
         <div className="features-grid">
           <div className="feature-card">
             <img src="/express-delivery.png" alt="Express Delivery" className="feature-icon" />
             <h3 className="feature-title">Express Delivery</h3>
             <p className="feature-description">Same-day delivery available.</p>
           </div>
           <div className="feature-card">
             <img src="/tracking.png" alt="Real-time Tracking" className="feature-icon" />
             <h3 className="feature-title">Real-time Tracking</h3>
             <p className="feature-description">Track your packages live.</p>
           </div>
           <div className="feature-card">
             <img src="/secure-handling.png" alt="Secure Handling" className="feature-icon" />
             <h3 className="feature-title">Secure Handling</h3>
             <p className="feature-description">Your packages are safe with us.</p>
           </div>
         </div>
       </div>
     </section>


     <section id="contact" className="contact">
       <div className="container">
         <h2 className="section-title">Contact Us</h2>
         <div className="contact-grid">
           <div className="contact-info">
             <div className="contact-item">
               <FaMapMarkerAlt className="contact-icon" />
               <p>1123 Delivery Street, SC 12345</p>
             </div>
             <div className="contact-item">
               <FaPhone className="contact-icon" />
               <p>+254 7 000 000</p>
             </div>
             <div className="contact-item">
               <FaEnvelope className="contact-icon" />
               <p>sendit@gmail.com</p>
             </div>
           </div>
           <form className="contact-form" onSubmit={handleFormSubmit}>
             <input
               type="text"
               name="name"
               placeholder="Your Name"
               className="form-input"
               value={formData.name}
               onChange={handleInputChange}
               required
             />
             <input
               type="email"
               name="email"
               placeholder="Your Email"
               className="form-input"
               value={formData.email}
               onChange={handleInputChange}
               required
             />
             <textarea
               name="message"
               placeholder="Your Message"
               rows={4}
               className="form-input"
               value={formData.message}
               onChange={handleInputChange}
               required
             />
             <button type="submit" className="send-message-button">Send Message</button>
           </form>
         </div>
       </div>
     </section>


     <footer className="footer">
       <div className="container footer-grid">
         <div className="footer-section">
           <h3 className="footer-title">SendIT</h3>
           <p>Delivering your parcels with care and precision.</p>
         </div>
         <div>
           <h3 className="footer-title">Quick Links</h3>
           <ul className="footer-links">
             <li><a href="#home">Home</a></li>
             <li><a href="#about">About</a></li>
             <li><a href="#services">Services</a></li>
             <li><a href="#contact">Contact</a></li>
           </ul>
         </div>
         <div>
           <h3 className="footer-title">Contact Us</h3>
           <ul className="footer-links">
             <li><FaMapMarkerAlt className="social-icon" /> 123 Delivery Street, SC 12345</li>
             <li><FaPhone className="social-icon" /> +254 7 000 000</li>
             <li><FaEnvelope className="social-icon" /> sendit@gmail.com</li>
           </ul>
         </div>
         <div className="follow-us">
           <h3 className="footer-title">Follow Us</h3>
           <div className="social-links">
             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
           </div>
         </div>
       </div>
       <div className="footer-bottom">
         <p>&copy; 2025 SendIT. All rights reserved.</p>
       </div>
     </footer>
   </>
 );
}


export default HomePage;
