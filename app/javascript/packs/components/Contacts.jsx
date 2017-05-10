import React from 'react';
import verifyAuth from 'verifyAuth';

class Contacts extends React.Component {
  render() {
    return (<div>
      <h1>All My Contacts</h1>
    </div>)
  }
}

export default verifyAuth(Contacts);
