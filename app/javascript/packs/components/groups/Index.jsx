import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Add from 'material-ui/svg-icons/social/group-add';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import post from 'utils/post';
import get from 'utils/get';
import verifyAuth from 'verifyAuth';

export class Index extends React.Component {
  state = { newGroup: '', groups: [] };

  componentWillMount() {
    this.getAllGroups();
  }

  saveGroup = (e) => {
    e.preventDefault();
    post('/api/groups', { group: { name: this.state.newGroup } })
      .then(res => res.ok === true && res.json())
      .then(group => this.setState({groups: [...this.state.groups, group], newGroup: ''}))
  };

  getAllGroups = () => {
    get('/api/groups').then(res => res.ok === true && res.json()).then(groups => this.setState({groups}))
  };

  prepareAllGroups = () => this.state.groups.map(group => (
    <div className="row start-xs" key={group.id}>
      <div className="col-xs-10">
        <h3>{group.name}</h3>
      </div>
      <div className="col-xs-2">
        <FlatButton
          type="submit"
          label=""
          icon={<DeleteForever />}
        />
      </div>
    </div>
  ));

  render() {
    return (
      <div className="col-xs-5">
        <Paper style={{textAlign: 'center', padding: 30}}>
          <h1>Create new group</h1>
          <form onSubmit={this.saveGroup}>
            <div className="row bottom-xs">
              <div className="col-xs-8">
                <TextField
                  hintText="Group name"
                  floatingLabelText="New group name"
                  type="text"
                  value={this.state.newGroup}
                  onChange={e => this.setState({newGroup: e.target.value})}
                />
              </div>
              <div className="col-xs-4">
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
        {this.state.groups.length > 0 && <Paper style={{textAlign: 'center', padding: 30}}>
          <h1>All groups</h1>
          {this.prepareAllGroups()}
        </Paper>}
      </div>
    )
  }
}

export default verifyAuth(Index);
