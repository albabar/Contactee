import React from 'react';
import Paper from 'material-ui/Paper';
import post from 'utils/post';
import get from 'utils/get';
import verifyAuth from 'verifyAuth';
import Form from './Form';
import Link from 'react-router-dom/Link'
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import GroupIcon from 'material-ui/svg-icons/social/group';

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

  getAllGroups = () => get('/api/groups').then(groups => this.setState({groups}));

  prepareAllGroups = () => this.state.groups.map(
    group => (
      <Link to={`/groups/${group.slug}`} key={group.id}>
        <ListItem
          rightIcon={<GroupIcon />}
          primaryText={group.name}
          secondaryText={`${group.contacts.length} contacts`}
        />
      </Link>
    )
  );

  render() {
    return (
      <div className="col-xs-5">
        <Form onSubmit={this.saveGroup} />
        {this.state.groups.length > 0 && <Paper style={{textAlign: 'left', padding: 30}}>
          <h1>All groups</h1>
          <List>{this.prepareAllGroups()}</List>
        </Paper>}
      </div>
    )
  }
}

export default verifyAuth(Index);
