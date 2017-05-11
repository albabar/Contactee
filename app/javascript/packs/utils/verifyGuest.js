import React from 'react';
import { Redirect } from 'react-router-dom';
import get from 'utils/get';

export function verifyGuest(Component) {
  return class extends React.Component {
    state = { signed_in: 'pending', user: null };
    componentWillMount() {
      this.getSession();
    }

    getSession = () => get('/api/me').then(json => this.setState(json));

    render() {
      switch(this.state.signed_in) {
        case true:
          return <Redirect to={{pathname: '/', state: { from: this.props.location }}}/>;
        case false:
          return <Component {...this.props} {...this.state} />;
        default:
          return null;
      }
    }
  }
}

export default verifyGuest;
