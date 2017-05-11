import React from 'react';
import Link from 'react-router-dom/Link'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import verifyAuth from 'verifyAuth';
import get from 'utils/get';
import ContactList from './ContactList';

class Contacts extends React.Component {
  state = { contacts: [], s: '' };

  componentWillMount() {
    this.getAllContacts();
  }

  getAllContacts = () => get('/api/contacts').then(contacts => this.setState({contacts}));

  render() {
    return (
      <div className="col-md-8">
        <Paper style={{textAlign: 'center', padding: 30}}>
          <div className="row start-md middle-md">
            <div className="col-md-9"><h1>Contact List</h1></div>
            <div className="col-md-3">
              <Link to="/contacts/new">
                <RaisedButton
                  label="New Contact"
                  labelPosition="before"
                  icon={<PersonAdd />}
                  primary={true}
                />
              </Link>
            </div>
          </div>
        </Paper>
        {this.state.contacts.length > 0 && <ContactList contacts={this.state.contacts} />}
      </div>
    )
  }
}

export default verifyAuth(Contacts);
