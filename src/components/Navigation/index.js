import React from 'react';
import { Link } from 'react-router-dom';

import LogoutButton from '../LogoutButton';


const Navigation = (props) => {
  return (
    <div>
      { 
        props.isAuthenticated
          ? <NavigationAuth /> 
          : null 
      }
    </div>
  );
}

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={'/'}>Home</Link>
    </li>
    <li>
      <Link to={'/account'}>Account</Link>
    </li>
    <li>
      <Link to={'/admin'}>Admin</Link>
    </li>
    <li>
      <Link to={'/players'}>Players</Link>
    </li>
    <li>
      <Link to={'/tournaments'}>Tournaments</Link>
    </li>
    <li>
      <LogoutButton />
    </li>
  </ul>
);

export default Navigation;
