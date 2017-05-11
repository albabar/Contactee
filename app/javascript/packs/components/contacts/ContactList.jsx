import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link'
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import gravatar from 'utils/gravatar';

class ContactList extends React.Component {
  state = {s: ''};
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }))
  };

  match = (str) => AutoComplete.fuzzyFilter(this.state.s, str);
  searchContact = (contact) => ['first_name', 'last_name'].some(prop => this.match(contact[prop]));
  contacts = () => this.props.contacts.filter(this.searchContact);

  prepareContactsList = () => this.contacts().map(
    contact => (
      <Link to={`/contacts/${contact.slug}`} key={contact.id}>
        <ListItem
          rightAvatar={gravatar(contact.email)}
          primaryText={[contact.first_name, contact.last_name].join(' ')}
          secondaryText={contact.organization || contact.email}
        />
      </Link>
    )
  );

  render() {
    return (
      <Paper style={{textAlign: 'left', padding: 30}}>
        <TextField
          hintText="Search through contacts"
          floatingLabelText="Search for Contacts"
          type="search"
          fullWidth={true}
          onChange={(e) => this.setState({s: e.target.value})}
        />
        <List>{this.prepareContactsList()}</List>
      </Paper>
    )
  }
}

export default ContactList;
