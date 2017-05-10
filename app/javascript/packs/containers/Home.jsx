import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import 'normalize.css/normalize.css'
import Contacts from '../components/Contacts'
import Login from '../components/Login'
import Index from '../components/Index'
import {
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom'

export default class extends React.Component {

  render() {
    const buttonStyle = {
      backgroundColor: 'transparent',
      color: 'white'
    };
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <AppBar
              title={<Link to="/"><FlatButton label="Home" style={buttonStyle} /></Link>}
              iconElementRight={
                <div>
                  <Link to="/login"><FlatButton label="Login" style={buttonStyle} /></Link>
                  <Link to="/contacts"><FlatButton label="Contacts" style={buttonStyle} /></Link>
                </div>
              }
            >
            </AppBar>
            <div className="row center-xs">
              <Route exact path="/" component={Index}/>
              <Route path="/login" component={Login}/>
              <Route path="/contacts" component={Contacts}/>
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}


