import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import DashboardContainer from './dashboard/dashboard_container';
import Splash from './splash/splash';
import LoginFormContainer from './user/login_form_container';
import SignupFormContainer from './user/signup_form_container';

const App = (props) => {
  const RootComponent = props.currentUser.id ? DashboardContainer : Splash;

  return (
    <div>
      <Route exact path="/" component={RootComponent} />
      <AuthRoute path="/login" component={LoginFormContainer} />
      <AuthRoute path="/signup" component={SignupFormContainer} />
    </div>
  )
}


const msp = state => ({currentUser: state.entities.user})
export default withRouter(connect(msp)(App))
