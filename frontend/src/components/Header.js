import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/playt.jpg';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

 
  useState(() => {
    const storedLoggedInUser = localStorage.getItem('token');
    if (storedLoggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
   
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <p><img src={logo} alt="logo" height="40" /></p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/event">Event</a></li>
        {isLoggedIn ? (
          <li><button onClick={handleLogout}>Logout</button></li>
        ) : (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/registration">Registration</a></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
