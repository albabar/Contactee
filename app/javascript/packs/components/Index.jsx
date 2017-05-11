import React from 'react';
import Redirect from 'react-router-dom/Redirect'

export class Index extends React.Component {
  render() {
    return <Redirect to={{pathname: '/contacts', state: { from: this.props.location }}}/>
  }
}

export default Index;
