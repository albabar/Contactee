import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import post from 'utils/post';
import get from 'utils/get';
import verifyAuth from 'verifyAuth';
import Form from './Form';

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

  getAllGroups = () => {
    get('/api/groups').then(groups => this.setState({groups}))
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
