import React from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import {
  Redirect,
} from 'react-router-dom'
import post from 'utils/post';
import verifyGuest from 'utils/verifyGuest';

export class Login extends React.Component {
  state = { email: '', password: '', remember_me: true, user: null };

  authenticate = (e) => {
    e.preventDefault();
    post('/api/users/sign_in', { user: this.state })
      .then(res => res.ok === true && res.json())
      .then(json => this.setState({user: json}))
  };

  render() {
    if(this.state.user) {
     return <Redirect to={{pathname: '/contacts', state: { from: this.props.location }}}/>
    }

    return (
      <div className="col-xs-5">
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
          <div className="col-xs-5 col-xs-offset-2">
            <Toggle
              label="Remember Me"
              labelPosition="right"
              toggled={this.state.remember_me}
              onToggle={e => this.setState({remember_me: !this.state.remember_me})}
            />
          </div>
          <br/>
          <RaisedButton
            type="submit"
            label="Login"
            secondary={true}
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          />
        </form>
        </Paper>
      </div>
    )
  }
}

export default verifyGuest(Login);