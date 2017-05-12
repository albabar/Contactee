import React from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Redirect from 'react-router-dom/Redirect'
import Link from 'react-router-dom/Link'
import post from 'utils/post';
import verifyGuest from 'utils/verifyGuest';
import NearMe from 'material-ui/svg-icons/maps/near-me';

export class Login extends React.Component {
  state = { email: '', password: '', remember_me: true, user: null };

  authenticate = (e) => {
    e.preventDefault();
    post('/api/users/sign_in', { user: this.state })
      .then(json => this.setState({user: json})).then(this.update)
  };

  update = () => window.location.pathname = '/';

  render() {
    if(this.state.user) {
      return <Redirect to={{pathname: '/', state: { from: this.props.location }}}/>
    }

    return (
      <div className="col-md-5 col-sm-9 col-xs-11">
        <Paper style={{textAlign: 'center', padding: 30}}>
          <h1>Login</h1>
          <form onSubmit={this.authenticate}>
            <TextField
              hintText="Email"
              floatingLabelText="Email to login"
              type="email"
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
            /><br />
            <TextField
              hintText="Password"
              floatingLabelText="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
            />
            <br/>
            <div className="col-md-4 col-md-offset-4 col-xs-offset-4 col-sm-offset-4">
              <Toggle
                label="Remember Me"
                labelPosition="right"
                toggled={this.state.remember_me}
                onToggle={e => this.setState({remember_me: !this.state.remember_me})}
                style={{maxWidth: 153}}
              />
            </div>
            <br/>
            <RaisedButton
              type="submit"
              label="Login"
              secondary={true}
              icon={<NearMe />}
            />
          </form>
          <Link to="/register">or Register here!</Link>
        </Paper>
      </div>
    )
  }
}

export default verifyGuest(Login);
