import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Add from 'material-ui/svg-icons/social/group-add';

export class Form extends React.Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };
  state = { name: '' };

  saveGroup = (e) => {
    e.preventDefault();
    this.props.onSubmit({ name: this.state.name });
    this.setState({ name: '' });
  };

  render() {
    return (
      <Paper style={{textAlign: 'center', padding: 30}}>
        <h1>Create new group</h1>
        <form onSubmit={this.saveGroup}>
          <div className="row bottom-md">
            <div className="col-md-8">
              <TextField
                hintText="Group name"
                floatingLabelText="New group name"
                type="text"
                value={this.state.name}
                onChange={e => this.setState({name: e.target.value})}
              />
            </div>
            <div className="col-md-4">
              <RaisedButton
                type="submit"
                label="Create"
                secondary={true}
                icon={<Add />}
              />
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}

export default Form;
