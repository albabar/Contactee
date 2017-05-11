import React from 'react';
import Link from 'react-router-dom/Link'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import verifyAuth from 'verifyAuth';
import get from 'utils/get';

class Contacts extends React.Component {
  state = { contacts: [] };

  componentWillMount() {
    this.getAllContacts();
  }

  getAllContacts = () => get('/api/contacts').then(contacts => this.setState({contacts}));

  prepareContactsList = () => this.state.contacts.map(
    contact => (
      <div className="row start-xs" key={contact.id}>
        <div className="col-xs">
          <h3>
            <Link to={`/contacts/${contact.slug}`}>
              {[contact.first_name, contact.last_name].join(' ')}
            </Link>
            <span>{contact.organization}</span>
          </h3>
        </div>
      </div>
    )
  );

  render() {
    return (
      <div className="col-xs-8">
        <Paper style={{textAlign: 'center', padding: 30}}>
          <div className="row start-xs middle-xs">
            <div className="col-xs-9"><h1>Contact List</h1></div>
            <div className="col-xs-3">
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
        {this.state.contacts.length > 0 && <Paper style={{textAlign: 'center', padding: 30}}>
          <div className="row start-xs">{this.prepareContactsList()}</div>
        </Paper>}
      </div>
    )
  }
}

export default verifyAuth(Contacts);
