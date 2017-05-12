import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import PropTypes from 'prop-types';

export class Index extends React.Component {
  static propTypes = { location: PropTypes.object };
  render() {
    return <Redirect to={{pathname: '/contacts', state: { from: this.props.location }}}/>;
  }
}

export default Index;
