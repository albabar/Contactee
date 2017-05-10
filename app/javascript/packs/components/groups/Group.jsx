import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


export class Group extends React.Component {
  state = { name: this.props.name, editing: false, destroy: false };

  static propTypes = {
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
  };

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

  startEditing = () => this.setState({ editing: true });
  resetEditing = () => this.setState({ name: this.props.name, editing: false });
  startDestroy = () => this.setState({ destroy: true });
  stopDestroy = () => this.setState({ destroy: false });
  saveGroup = (e) => {
    switch(e.keyCode){
      case 13:
        this.props.update({id: this.props.id, slug: this.props.slug, name: this.state.name});
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
    this.props.destroy(this.props.id);
    this.stopDestroy()
  };

  render() {
    return (
      <div className="row start-xs">
        <div className="col-xs-10">
          {!this.state.editing && <h3 onClick={this.startEditing} className="editable">{this.props.name}</h3>}
          {this.state.editing && <TextField
            hintText={this.props.name}
            floatingLabelText={`New name for ${this.props.name}`}
            type="text"
            value={this.state.name}
            onChange={e => this.setState({name: e.target.value})}
            autoFocus={true}
            onKeyUp={this.saveGroup}
          />}
        </div>
        <div className="col-xs-2">
          <FlatButton
            type="submit"
            label=""
            icon={<DeleteForever />}
            onClick={this.startDestroy}
          />
          <Dialog
            actions={this.destroyConfirmActions()}
            modal={false}
            open={this.state.destroy}
            onRequestClose={this.stopDestroy}
          >
            {`Delete the group ${this.props.name}`}
          </Dialog>
        </div>
      </div>
    )
  }
}

export default Group;
