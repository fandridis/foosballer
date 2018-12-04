import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


const NotFound = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <FontAwesomeIcon icon={faCoffee} />
    </div>
  );
};

export default NotFound;
