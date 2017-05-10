import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import TextField from 'material-ui/TextField';

export class Group extends React.Component {
  state = { name: this.props.name, editing: false };

  static propTypes = {
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
  };

  startEditing = () => this.setState({ editing: true });
  resetEditing = () => this.setState({ name: this.props.name, editing: false });
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
          />
        </div>
      </div>
    )
  }
}

export default Group;
