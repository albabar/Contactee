import React from 'react';
import { Redirect } from 'react-router-dom';
import get from 'utils/get';

export function verifyAuth(Component) {
  return class extends React.Component {
    state = { signed_in: 'pending', user: null };
    componentWillMount() {
      this.getSession();
    }

    getSession = () => get('/api/me').then(response => response.json()).then(json => this.setState(json));

    render() {
      switch(this.state.signed_in) {
        case true:
          return <Component {...this.props} {...this.state} />;
        case false:
          return <Redirect to={{pathname: '/login', state: { from: this.props.location }}}/>;
        default:
          return null;
      }
    }
  }
}

export default verifyAuth;
