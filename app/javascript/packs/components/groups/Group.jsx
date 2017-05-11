import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import get from 'utils/get';
import patch from 'utils/patch';
import deleTE from 'utils/deleTE';
import verifyAuth from 'verifyAuth';
import Redirect from 'react-router-dom/Redirect';
import Link from 'react-router-dom/Link';
import ContactList from '../contacts/ContactList';


export class Group extends React.Component {
  state = { group: { name: '', contacts: [] }, editing: false, destroy: false, _destroyed: false, oldName: '', newSlug: '' };
  componentWillMount() {
    this.getContact();
  }

  getContact = () => get(`/api/groups/${this.slug()}`).then(group => this.setState({group}));

  destroyConfirmActions = () => [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.stopDestroy}
    />,
    <FlatButton
      label="Discard"
      secondary={true}
      onTouchTap={this.destroy}
    />,
  ];

  slug = () => this.props.match.params.slug;
  startEditing = () => this.setState({ editing: true, oldName: this.state.group.name });
  resetEditing = () => this.setState({ group: {...this.state.group, name: this.state.oldName}, editing: false });
  startDestroy = () => this.setState({ destroy: true });
  stopDestroy = () => this.setState({ destroy: false });
  saveGroup = (e) => {
    switch(e.keyCode){
      case 13:
        this.updateGroup();
        this.resetEditing();
        break;
      case 27:
        this.resetEditing();
        break;
      default:
        break;
    }
  };

  destroy = () => {
    deleTE(`/api/groups/${this.slug()}`).then(() => this.setState({_destroyed: true}));
  };

  updateGroup = () => {
    patch(`/api/groups/${this.slug()}`, { group: this.state.group })
      .then(group => this.setState({newSlug: group.slug, group}))
  };

  render() {
    if(this.state.newSlug !== '' && this.state.newSlug !== this.slug()) {
      return <Redirect to={{pathname: `/groups/${this.state.newSlug}`, state: { from: this.props.location }}}/>
    } else if(this.state._destroyed) {
      return <Redirect to={{pathname: `/groups`, state: { from: this.props.location }}}/>
    }

    return (
      <div className="col-md-8 start-md">
        <Paper style={{padding: 30}}>
          <div className="row middle-md">
            <div className="col-md-10">
              {!this.state.editing && <h3 onClick={this.startEditing} className="editable">All contacts for {this.state.group.name}</h3>}
              {this.state.editing && <TextField
                hintText={this.state.group.name}
                floatingLabelText={`New name for ${this.state.group.name}`}
                type="text"
                value={this.state.group.name}
                onChange={e => this.setState({group: {...this.state.group, name: e.target.value}})}
                autoFocus={true}
                onKeyUp={this.saveGroup}
              />}
            </div>
            <div className="col-md-2">
              <RaisedButton
                secondary={true}
                label="Delete"
                labelPosition="before"
                icon={<DeleteForever />}
                onClick={this.startDestroy}
              />
              <Dialog
                actions={this.destroyConfirmActions()}
                modal={false}
                open={this.state.destroy}
                onRequestClose={this.stopDestroy}
              >
                {`Delete the group ${this.state.group.name}`}
              </Dialog>
            </div>
          </div>
        </Paper>
        {this.state.group.contacts.length > 0 && <ContactList contacts={this.state.group.contacts} />}
        {this.state.group.contacts.length === 0 && <Paper style={{textAlign: 'center', padding: 30}}>
          <h3>No Contacts found.</h3>
          <Link to="/contacts/new">
            <RaisedButton
              label="New Contact"
              labelPosition="before"
              icon={<PersonAdd />}
              primary={true}
            />
          </Link>
        </Paper>}
      </div>
    )
  }
}

export default verifyAuth(Group);
