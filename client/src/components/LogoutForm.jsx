import React from 'react';
import Auth from '../utils/auth';

const Logout = () => {
  const handleLogout = () => {
    Auth.logout(); // Clear token and redirect to homepage
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
