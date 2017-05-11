import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import 'normalize.css/normalize.css'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Link from 'react-router-dom/Link'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import ContactIndex from 'components/contacts/Index'
import ContactNew from 'components/contacts/New'
import ContactEdit from 'components/contacts/Edit'
import Contact from 'components/contacts/Contact'
import Login from 'components/Login'
import HomeIndex from 'components/Index'
import Register from 'components/Register'
import GroupIndex from 'components/groups/Index'
import Group from 'components/groups/Group'

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
                  <Link to="/groups"><FlatButton label="Groups" style={buttonStyle} /></Link>
                </div>
              }
            >
            </AppBar>
            <div className="row center-xs">
              <Route exact path="/" component={HomeIndex}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>

              <Switch>
                <Route exact path="/contacts" component={ContactIndex}/>
                <Route exact path="/contacts/new" component={ContactNew} />
                <Route exact path="/contacts/:slug" component={Contact} />
                <Route exact path="/contacts/:slug/edit" component={ContactEdit} />
              </Switch>
              <Route exact path="/groups" component={GroupIndex}/>
              <Route exact path="/groups/:slug" component={Group} />
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}


