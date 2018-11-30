import React, { Component, Fragment } from 'react';

import { withGlobalState } from '../../hocs/GlobalState';

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <h3>Players Squad</h3>
      </Fragment>
    );
  }
}

export default withGlobalState(Players);



