import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, removeErrors } from '../../actions/user_actions';

const msp = state => ({
  formType: 'login',
  errors: state.errors.session,
});

const mdp = dispatch => ({
  processForm: formData => dispatch(login(formData)),
  removeErrors: () => dispatch(removeErrors()),
});

export default connect(msp, mdp)(SessionForm);