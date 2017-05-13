import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import get from 'utils/get';

export function verifyAuth(Component) {
  return class extends React.Component {
    static displayName = 'verifyGuest';
    static propTypes = {
      location: PropTypes.object,
      user: PropTypes.object,
      signed_in: PropTypes.oneOf([true, false, 'pending'])
    };

    state = { signed_in: 'pending', user: null };
    componentWillMount() {
      this.checkSession();
    }

    getSession = () => get('/api/me').then(json => this.setState(json));
    checkSession = () => {
      if(this.props.user && this.props.signed_in === true) {
        this.setState({signed_in: this.props.signed_in, user: this.props.user})
      } else {
        this.getSession();
      }
    };

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
  };
}

export default verifyAuth;
