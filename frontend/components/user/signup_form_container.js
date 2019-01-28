import { connect } from 'react-redux';
import SignupForm from './signup_form';
import { signup } from '../../actions/user_actions';

const msp = state => ({
  formType: 'signup',
  errors: state.errors.session,
});

const mdp = dispatch => ({
  processForm: formData => dispatch(signup(formData))
});

export default connect(msp, mdp)(SignupForm);