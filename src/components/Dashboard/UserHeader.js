// import React, { useState, useEffect } from 'react';
// import { Bell, Search } from 'lucide-react';
// import axios from 'axios';

// const UserHeader = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://sendit-backend-j83j.onrender.com';
//         const response = await axios.get(`${backendUrl}/user`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });

//         if (response.data && response.data.username) {
//           setUser(response.data);
//         } else {
//           throw new Error('Invalid user data received');
//         }
//       } catch (err) {
//         console.error('Error fetching user data:', err.message);
//         setError('Failed to load user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <>
//       {/* Toggle Button for Mobile */}
//       <button className="toggle-button" aria-label="Toggle Sidebar">
//         ☰
//       </button>

//       <header className="header2">
//         <div className="header-container2">
//           {/* Search Container */}
//           <div className="search-container2">
//             <div className="search-box2">
//               <input type="text" placeholder="Search..." className="search-input2" />
//               <Search className="search-icon2" />
//             </div>
//           </div>

//           {/* Header Icons */}
//           <div className="header-icons2">
//             <button className="notification-button2">
//               <Bell className="notification-icon2" />
//             </button>

//             {/* User Info */}
//             <div className="user-info2">
//               <span className="user-name2">{user?.username || 'Guest'}</span>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default UserHeader;