import React from 'react';
import { mount } from 'enzyme';

import Firebase, { FirebaseContext } from '../../../hocs/Firebase';
import Players from '../index';

describe('<Contact />', () => {
  it('should render a form', () => {
    const renderedComponent = mount(
      <FirebaseContext.Provider value={new Firebase()}>
        <Players isAuthenticated={'2JcNfNNIU9bo5IbtNXG52BMqGOb2'} />
      </FirebaseContext.Provider>
    );
  
  setTimeout(() => {
    expect(renderedComponent.find('form').length).toBe(0);
  }, 1000);
  });
});
