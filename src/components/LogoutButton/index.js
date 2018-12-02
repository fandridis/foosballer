import React from 'react';

import { withFirebase } from '../../hocs/Firebase';


const LogoutButton = (props) => (
  <button type="button" onClick={() => props.firebase.doLogout()}>
    Logout
  </button>
);

export default withFirebase(LogoutButton);
