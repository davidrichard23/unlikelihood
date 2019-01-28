import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/user_actions';
 
const msp = state => ({
  formType: 'login',
  errors: state.errors.session,
});

const mdp = dispatch => ({
  processForm: formData => dispatch(login(formData))
});

export default connect(msp, mdp)(SessionForm);