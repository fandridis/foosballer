import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../routes/names';

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
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <Link to={ROUTES.PLAYERS}>Players</Link>
    </li>
    <li>
      <LogoutButton />
    </li>
  </ul>
);

export default Navigation;
