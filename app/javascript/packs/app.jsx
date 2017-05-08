import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import 'normalize.css/normalize.css'

const Hello = props => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="Title"
        iconElementRight={<RaisedButton label="Login" />}
      />
      <div className="container">
        <h1>Hello {props.name}!</h1>
        Path: {window.location.pathname}
        <RaisedButton label="Default" />
      </div>
    </div>
  </MuiThemeProvider>
);

Hello.defaultProps = {
  name: 'David',
};

Hello.propTypes = {
  name: PropTypes.string,
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Hello name="React" />, document.body.appendChild(document.createElement('div')));
});
