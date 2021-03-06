import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Redirect from 'react-router-dom/Redirect';
import Link from 'react-router-dom/Link';
import post from 'utils/post';
import verifyGuest from 'utils/verifyGuest';

export class Register extends React.Component {
  static propTypes = { location: PropTypes.object };

  state = { first_name: '', last_name: '', email: '', password: '', password_confirmation: '', user: null };

  register = (e) => {
    e.preventDefault();
    post('/api/users', { user: this.state })
      .then(json => this.setState({user: json})).then(this.update);
  };

  update = () => window.location.pathname = '/';

  render() {
    if(this.state.user) {
      return <Redirect to={{pathname: '/contacts', state: { from: this.props.location }}}/>;
    }

    return (
      <div className="col-md-5 col-xs-11 col-sm-8">
        <Paper style={{textAlign: 'center', padding: 30}}>
          <h1>Register</h1>
          <form onSubmit={this.register}>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6">
                <TextField
                  hintText="First name"
                  floatingLabelText="First name"
                  type="text"
                  value={this.state.first_name}
                  onChange={e => this.setState({first_name: e.target.value})}
                  fullWidth={true}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6">
                <TextField
                  hintText="Last name"
                  floatingLabelText="Last name"
                  type="text"
                  value={this.state.last_name}
                  onChange={e => this.setState({last_name: e.target.value})}
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md col-xs">
                <TextField
                  hintText="Email"
                  floatingLabelText="Email to login"
                  type="email"
                  value={this.state.email}
                  onChange={e => this.setState({email: e.target.value})}
                  fullWidth={true}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6">
                <TextField
                  hintText="Password"
                  floatingLabelText="Password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({password: e.target.value})}
                  fullWidth={true}
                />
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6">
                <TextField
                  hintText="Password again"
                  floatingLabelText="Password again"
                  type="password"
                  value={this.state.password_confirmation}
                  onChange={e => this.setState({password_confirmation: e.target.value})}
                  fullWidth={true}
                />
              </div>
            </div>
            <br/>
            <RaisedButton
              type="submit"
              label="Register"
              secondary={true}
              icon={<FontIcon className="muidocs-icon-custom-github" />}
            />
          </form>
          <Link to="/login">or Login here!</Link>
        </Paper>
      </div>
    );
  }
}

export default verifyGuest(Register);
