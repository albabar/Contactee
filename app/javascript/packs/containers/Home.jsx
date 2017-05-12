import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import 'normalize.css/normalize.css';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import ContactIndex from 'components/contacts/Index';
import ContactNew from 'components/contacts/New';
import ContactEdit from 'components/contacts/Edit';
import Contact from 'components/contacts/Contact';
import Login from 'components/Login';
import Logout from 'components/Logout';
import HomeIndex from 'components/Index';
import Register from 'components/Register';
import GroupIndex from 'components/groups/Index';
import Group from 'components/groups/Group';
import get from 'utils/get';

class Home extends React.Component {
  state = { signed_in: 'pending', user: null };
  componentWillMount() {
    this.getSession();
  }

  getSession = () => get('/api/me').then(json => this.setState(json));

  navLinks = () => {
    const buttonStyle = {
      backgroundColor: 'transparent',
      color: 'white'
    };

    if(this.state.user) {
      return (
        <div>
          <NavLink to="/contacts"><FlatButton label="Contacts" style={buttonStyle} /></NavLink>
          <NavLink to="/groups"><FlatButton label="Groups" style={buttonStyle} /></NavLink>
          <NavLink to="/logout"><FlatButton label="Logout" style={buttonStyle} /></NavLink>

        </div>
      );
    } else {
      return (
        <div>
          <NavLink to="/login"><FlatButton label="Login" style={buttonStyle} /></NavLink>
          <NavLink to="/register"><FlatButton label="Register" style={buttonStyle} /></NavLink>
        </div>
      );
    }
  };

  homeComponent = () => this.state.user ? HomeIndex : Login;

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider>
          <div>
            <AppBar
              title={<Link to="/"><FlatButton label="Contactee" style={{backgroundColor: 'transparent', color: 'white'}} /></Link>}
              iconElementRight={this.navLinks()}
            >
            </AppBar>
            <div className="row center-md center-sm center-xs">
              <Route exact path="/" component={this.homeComponent()}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
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

export default Home;
