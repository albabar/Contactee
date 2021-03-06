import React from 'react';
import Redirect from 'react-router-dom/Redirect';
import verifyAuth from 'verifyAuth';
import patch from 'utils/patchWithOutStatusCheck';
import get from 'utils/get';
import Form from './Form';
import PropTypes from 'prop-types';

class Edit extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.shape({params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    })})
  };

  state = {
    contact: {
      first_name: '', last_name: '', email: '', organization: '',
      is_organization: false, cellular: '', phone: '', birthday: null,
      address_line1: '', address_line2: '', homepage: '', notes: '',
      slug: '', group_ids: []
    },
    errors: {},
    doneWithForm: false, newSlug: null,
  };

  componentWillMount() {
    this.getContact();
  }

  updateContact = (key, value) => this.setState({ contact: {...this.state.contact, [key]: value}});
  saveContact = () => {
    patch(`/api/contacts/${this.props.match.params.slug}`, { contact: this.state.contact }).then(contact => {
      if(contact.errors) {
        this.setState({errors: contact.errors});
      } else {
        this.setState({ doneWithForm: true, newSlug: contact.slug });
      }
    });
  };

  getContact = () => get(`/api/contacts/${this.props.match.params.slug}`).then(
    contact => this.setState({contact: {...contact, birthday: new Date(contact.birthday)}})
  );


  render() {
    if(this.state.doneWithForm) {
      return <Redirect to={{pathname: `/contacts/${this.state.newSlug}`, state: { from: this.props.location }}}/>;
    }

    return (
      <div className="col-md-8">
        <Form onSubmit={this.saveContact} onChange={this.updateContact} errors={this.state.errors} {...this.state.contact} />
      </div>
    );
  }
}

export default verifyAuth(Edit);
