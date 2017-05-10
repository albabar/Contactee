import React from 'react';
import Paper from 'material-ui/Paper';
import post from 'utils/post';
import get from 'utils/get';
import patch from 'utils/patch';
import deleTE from 'utils/deleTE';
import verifyAuth from 'verifyAuth';
import Form from './Form';
import Group from './Group';

export class Index extends React.Component {
  state = { groups: [] };

  componentWillMount() {
    this.getAllGroups();
  }

  saveGroup = (group) => {
    post('/api/groups', { group })
      .then(group => {
        if(group.id)
          this.setState({groups: [...this.state.groups, group]})
      })
  };

  updateGroup = (group) => {
    patch(`/api/groups/${group.slug}`, { group })
      .then(group => {
        const index = this.state.groups.findIndex(g => g.id === group.id);
        if(index > -1) {
          const groups = [...this.state.groups];
          groups[index] = group;
          this.setState({groups})
        }
      })
  };

  deleteGroup = (groupId) => {
    deleTE(`/api/groups/${this.state.groups.find(g => g.id === groupId).slug}`)
      .then(() => {
        this.setState({groups: this.state.groups.filter(g => g.id !== groupId)})
      })
  };

  getAllGroups = () => get('/api/groups').then(groups => this.setState({groups}));

  prepareAllGroups = () => this.state.groups.map(
    group => <Group {...group} update={this.updateGroup} destroy={this.deleteGroup} key={group.id} />
  );

  render() {
    return (
      <div className="col-xs-5">
        <Form onSubmit={this.saveGroup} />
        {this.state.groups.length > 0 && <Paper style={{textAlign: 'center', padding: 30}}>
          <h1>All groups</h1>
          {this.prepareAllGroups()}
        </Paper>}
      </div>
    )
  }
}

export default verifyAuth(Index);
