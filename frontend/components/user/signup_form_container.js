import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup, removeErrors } from '../../actions/user_actions';

const msp = state => ({
  formType: 'signup',
  errors: state.errors.session,
});

const mdp = dispatch => ({
  processForm: formData => dispatch(signup(formData)),
  removeErrors: () => dispatch(removeErrors()),
});

export default connect(msp, mdp)(SignupForm);