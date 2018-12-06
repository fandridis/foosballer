import React from 'react';

import { withFirebase }  from '../../hocs/Firebase';
import Navigation from '../../components/Navigation';

const HomePage = (props) => {
  console.log('props @ HomePage: ', props);
  return (
    <div>
      <h1>Home Page</h1>

      {/* Bottom Navigation bar/>*/}
      <Navigation isAuthenticated={props.isAuthenticated} />
    </div>
  );
}

export default withFirebase(HomePage);
