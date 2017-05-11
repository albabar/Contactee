import React from 'react';
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Add from 'material-ui/svg-icons/social/group-add';
import age from 'utils/age';
import get from 'utils/get';

export class Form extends React.Component {
  state = { groups: [] };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.getAllGroups();
  }

  getAllGroups = () => get('/api/groups').then(groups => this.setState({groups}));

  saveContact = (e) => {
    e.preventDefault();
    this.props.onSubmit();
  };

  handleChange = (key, e) => {
    this.props.onChange(key, e.target.value);
  };

  labelize = (str) => str.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');

  textField = (prop, label = null, options = {}) => {
    if(typeof(label) !== 'string') {
      if(label !== null) options = {...label};
      label = this.labelize(prop);
    }

    if(!options.type) options.type = 'text';

    return <TextField
      hintText={label}
      floatingLabelText={label}
      value={this.props[prop]}
      onChange={e => this.handleChange(prop, e)}
      fullWidth={true}
      errorText={this.props.errors[prop]}
      {...options}
    />
  };

  title = () => {
    let name = '';
    if(this.props.is_organization)
      name = this.props.organization;
    else
      name = [this.props.first_name, this.props.last_name].join(' ');

    return name.trim() || 'Add new Contact';
  };

  submitLabel = () => this.props.id ? 'Update' : 'Create';
  groupChecked = (id) => this.props.group_ids.length > 0 && this.props.group_ids.includes(id);
  mapGroups = () => this.state.groups.map(
    group => (
      <MenuItem
        value={group.id}
        key={group.id}
        primaryText={group.name}
        checked={this.groupChecked(group.id)}
      />
    )
  );


  render() {
    const f = this.textField;

    return (
      <Paper style={{textAlign: 'center', padding: 30}}>
        <h1>{this.title()}</h1>
        <form onSubmit={this.saveContact} className="start-md">
          <div className="row">
            <div className="col-md-6">{f('first_name')}</div>
            <div className="col-md-6">{f('last_name')}</div>
          </div>
          <div className="row bottom-md">
            <div className="col-md-9">{f('organization', 'Organization Name')}</div>
            <div className="col-md-3">
              <Toggle
                label="Organization?"
                labelPosition="right"
                onToggle={() => this.props.onChange('is_organization', !this.props.is_organization)}
              />
            </div>
          </div>
          <SelectField
            multiple={true}
            floatingLabelText="Group, you can select multiple"
            value={this.props.group_ids}
            onChange={(e, index, values) => this.props.onChange('group_ids', values)}
            fullWidth={true}
            style={{marginTop: 8}}
          >
            {this.mapGroups()}
          </SelectField>

          <div className="row">
            <div className="col-md-6">{f('email', {type: 'email'})}</div>
            <div className="col-md-6">{f('homepage', {type: 'url'})}</div>
          </div>


          <div className="row">
            <div className="col-md-6">{f('cellular', {type: 'tel'})}</div>
            <div className="col-md-6">{f('phone', {type: 'tel'})}</div>
          </div>

          <div className="row bottom-md">
            <div className="col-md">
              <DatePicker
                hintText="Birthday"
                floatingLabelText="Birthday"
                mode="landscape"
                maxDate={new Date()}
                onChange={(undefined, date) => this.props.onChange('birthday', date)}
                value={this.props.birthday}
                fullWidth={true}
                autoOk={true}
              />
            </div>
            {this.props.birthday && <div className="col-md-2">
              {age(this.props.birthday)} years old!
            </div>}
          </div>
          {f('address_line1')}
          {f('address_line2')}
          {f('notes', {multiLine: true, rows: 3})}

          <RaisedButton
            type="submit"
            label={this.submitLabel()}
            secondary={true}
            icon={<Add />}
          />
        </form>
      </Paper>
    )
  }
}

export default Form;
