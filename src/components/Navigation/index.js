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
      <Link to={ROUTES.PLAYERS + '/0'}>Create Player</Link>
    </li>
    <li>
      <Link to={ROUTES.PLAYERS + '/2JcNfNNIU9bo5IbtNXG52BMqGOb2'}>Edit Player</Link>
    </li>
    <li>
      <LogoutButton />
    </li>
  </ul>
);

export default Navigation;
