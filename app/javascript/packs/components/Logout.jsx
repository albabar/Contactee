import React from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
import deleTE from 'utils/deleTE';
import verifyAuth from 'verifyAuth';

export class Logout extends React.Component {
  static propTypes = { location: PropTypes.object };

  componentWillMount() {
    deleTE('/api/users/sign_in').then(this.update);
  }

  update = () => window.location.pathname = '/';

  render() {
    return <Redirect to={{pathname: '/', state: { from: this.props.location }}}/>;
  }
}

export default verifyAuth(Logout);
