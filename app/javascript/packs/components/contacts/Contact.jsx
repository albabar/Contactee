import React from 'react';
import Link from 'react-router-dom/Link'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Person from 'material-ui/svg-icons/social/person';
import Phone from 'material-ui/svg-icons/communication/phone';
import {indigo500} from 'material-ui/styles/colors';
import Email from 'material-ui/svg-icons/communication/email';
import Web from 'material-ui/svg-icons/social/share';
import Divider from 'material-ui/Divider';
import verifyAuth from 'verifyAuth';
import get from 'utils/get';
import calculateAge from 'utils/age';
import moment from 'moment';

class Contact extends React.Component {
  state = {};

  componentWillMount() {
    window.Contact = this;
    window.moment = moment;
    this.getContact();
  }

  slug = () => this.props.match.params.slug;

  getContact = () => get(`/api/contacts/${this.slug()}`).then(contact => this.setState({...contact}));

  justName = () => [this.state.first_name, this.state.last_name].join(' ').trim();
  name = () => {
    if(this.state.is_organization) {
      return this.state.organization;
    }

    return this.justName();
  };

  subHeader = () => {
    if(this.state.is_organization) {
      return this.justName();
    }
    return this.state.organization;
  };

  birthday = () => {
    const b = moment(this.state.birthday, "YYYY-MM-DD");
    const t = moment();
    const age = calculateAge(this.state.birthday);
    const name = this.state.first_name;

    let text = `${name} is ${age}!`;
    if(b.month() === t.month()){
      if(b.date() === t.date()) text = `Today ${name} turns ${age}!`;
      else if(b.date() === t.date() + 1) text = `Tomorrow ${name} would turn ${age + 1}!`;
      else if(b.date() === t.date() - 1) text = `Yesterday ${name} turned ${age}!`;
      else text = `This month ${name} turns ${age}!`;
    } else if (b.month() === t.month() + 1) {
      text = `Next month ${name} would turn ${age+1}!`;
    } else if (b.month() === t.month() - 1) {
      text = `Last month ${name} turned ${age}!`;
    }

    return text;
  };

  render() {
    return (
      <div className="col-md-8 start-md">
        <Paper style={{padding: 30}}>
          <div className="row middle-md">
            <div className="col-md-9">
              <h1>{this.name()} <span>{this.subHeader()}</span></h1>
            </div>
            <div className="col-md-3">
              <Link to={`/contacts/${this.slug()}/edit`}>
                <RaisedButton
                  label="Edit"
                  labelPosition="before"
                  icon={<Person />}
                  primary={true}
                />
              </Link>
            </div>
          </div>
          <div className="row middle-md">{this.birthday()}</div>
        </Paper>
        <Paper style={{padding: 30}}>
          <List>
            <ListItem
              leftIcon={<Email color={indigo500} />}
              primaryText={this.state.email}
              secondaryText="email"
            />
            <Divider />
            {this.state.phone && <ListItem
              leftIcon={<Phone color={indigo500} />}
              primaryText={this.state.phone}
              secondaryText="Home"
            />}
            {this.state.cellular && <ListItem
              leftIcon={<Phone color={indigo500} />}
              primaryText={this.state.cellular}
              secondaryText="Mobile"
            />}
            {this.state.homepage && <ListItem
              leftIcon={<Web color={indigo500} />}
              primaryText={this.state.homepage}
              secondaryText="Website"
            />}
          </List>
        </Paper>
        {this.state.address_line1 && <Paper style={{padding: 30}}>
          <h3>Address</h3>
          <p>{this.state.address_line1}</p>
          <p>{this.state.address_line2}</p>
        </Paper>}
        {this.state.note && <Paper style={{padding: 30}}>
          <h3>Note</h3>
          <p>{this.state.note}</p>
        </Paper>}
      </div>
    )
  }
}

export default verifyAuth(Contact);
