import React from 'react';

import PasswordChangeForm from '../../components/PasswordChange';

const AccountPage = (props) => {
  console.log('props @ AccountPage: ', props);

  return (
    <div>
      <h1>Account</h1>
      <PasswordChangeForm />
    </div>
  );
}

export default AccountPage;
