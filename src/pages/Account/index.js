import React from 'react';

import PasswordChangeForm from '../../components/PasswordChange';
import Navigation from '../../components/Navigation';

const AccountPage = (props) => {
  console.log('props @ AccountPage: ', props);

  return (
    <div>
      <h1>Account</h1>
      <PasswordChangeForm />

      {/* Bottom Navigation bar/>*/}
      <Navigation isAuthenticated={props.isAuthenticated} />
    </div>
  );
}

export default AccountPage;
