import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions';

const msp = state => ({
  formType: 'signup',
  errors: state.errors.session,
});

const mdp = dispatch => ({
  processForm: formData => dispatch(signup(formData))
});

export default connect(msp, mdp)(SessionForm);