import React, { Component } from 'react';

import Navigation from '../../components/Navigation';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    // this.setState({ loading: true });

    // Example of real-time listening for db changes
    // this.props.firebase.users().on('value', snapshot => {
    //   const usersObject = snapshot.val();

    //   const usersList = Object.keys(usersObject).map(key => ({
    //     ...usersObject[key],
    //     uid: key,
    //   }));

    //   this.setState({
    //     users: usersList,
    //     loading: false,
    //   });
    // });
  }

  componentWillUnmount() {
    // this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />

        {/* Bottom Navigation bar/>*/}
        <Navigation isAuthenticated={this.props.isAuthenticated} />
      </div>
    );
  }
}


// TODO: Maybe move it to a different file as a standalone component?
const UserList = ({ users }) => (
  <ul>
    <li>Here will be a list of users</li>
  </ul>
);

export default AdminPage;
