import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import verifyAuth from 'verifyAuth';
import post from 'utils/postWithOutStatusCheck';
import Form from './Form';

class New extends React.Component {

  state = {
    contact: {
      first_name: '', last_name: '', email: '', organization: '',
      is_organization: false, cellular: '', phone: '', birthday: null,
      address_line1: '', address_line2: '', homepage: '', notes: ''
    },
    errors: {},
    doneWithForm: false,
  };

  updateContact = (key, value) => this.setState({ contact: {...this.state.contact, [key]: value}});
  saveContact = () => {
    post('/api/contacts', { contact: this.state.contact }).then(contact => {
      if(contact.errors) {
        this.setState({errors: contact.errors})
      } else {
        this.setState({ doneWithForm: true })
      }
    })
  };

  render() {
    if(this.state.doneWithForm) {
      return <Redirect to={{pathname: '/contacts', state: { from: this.props.location }}}/>
    }

    return (
      <div className="col-md-8">
        <Form onSubmit={this.saveContact} onChange={this.updateContact} errors={this.state.errors} {...this.state.contact} />
      </div>
    )
  }
}

export default verifyAuth(New);
