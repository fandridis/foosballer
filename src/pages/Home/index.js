import React from 'react';

import { withGlobalState } from '../../hocs/GlobalState';

const HomePage = (props) => {
  console.log('HOMEPAGE - props: ', props);
  return (
    <div>
      <h1>Home Page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <p>GlobalState num: {props.globalState.num}</p>
      <button onClick={() => props.globalState.changeNum(49)}>Change GlobalState num</button>
    </div>
  );
}

export default withGlobalState(HomePage);
