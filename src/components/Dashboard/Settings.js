// import React, { useState, useEffect } from "react";


// const Settings = () => {
//   const [settings, setSettings] = useState({
//     emailNotifications: true,
//     darkMode: false,
//     twoFactorAuth: false,
//   });

//   useEffect(() => {
//     if (settings.darkMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [settings.darkMode]);

//   const toggleSetting = async (setting) => {
//     const updatedSettings = { ...settings, [setting]: !settings[setting] };
//     setSettings(updatedSettings);

//     try {
//       const response = await fetch("https://sendit-backend-j83j.onrender.com/settings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedSettings),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update settings");
//       }
//     } catch (error) {
//       console.error("Error updating settings:", error);
//     }
//   };

//   return (
//     <div className="settings-container">
//       <h1 className="settings-title">Settings</h1>
//       <div className="settings-card">
//         {/* Email Notifications */}
//         <div className="settings-item">
//           <div className="settings-info">
//             <h2 className="settings-subtitle">Email Notifications</h2>
//             <p className="settings-description">
//               Receive email notifications for important updates
//             </p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={settings.emailNotifications}
//               onChange={() => toggleSetting("emailNotifications")}
//             />
//             <span className="slider"></span>
//           </label>
//         </div>

//         {/* Dark Mode Toggle */}
//         {/* <div className="settings-item">
//           <div className="settings-info">
//             <h2 className="settings-subtitle">Dark Mode</h2>
//             <p className="settings-description">Enable dark mode for the interface</p>
//           </div>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={settings.darkMode}
//               onChange={() => toggleSetting("darkMode")}
//             />
//             <span className="slider"></span>
//           </label>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Settings;