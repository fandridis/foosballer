import React from 'react';

import { withFirebase }  from '../../hocs/Firebase';

const HomePage = (props) => {
  console.log('props @ HomePage: ', props);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default withFirebase(HomePage);
