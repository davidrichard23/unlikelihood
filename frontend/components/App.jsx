import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import DashboardContainer from './dashboard/dashboard_container';
import Splash from './splash/splash';
import LoginFormContainer from './user/login_form_container';
import SignupFormContainer from './user/signup_form_container';
import AssetContainer from './assets/asset_container';
import { fetchPortfolioActions } from '../actions/portfolio_actions';
import { fetchAllAssets } from '../actions/assets_actions';

class App extends Component {

  componentDidMount() {
    this.props.fetchAllAssets();
    
    if (this.props.currentUser.id) {
      this.props.fetchPortfolioActions();
    }
  }

  render() {
    const RootComponent = this.props.currentUser.id ? DashboardContainer : Splash;

    return (
      <div>
        <Route exact path="/" component={RootComponent} />
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <ProtectedRoute path="/assets/:assetSymbol" component={AssetContainer} />
      </div>
    )
  }
}


const msp = state => ({currentUser: state.entities.user})
const mdp = dispatch => ({
  fetchAllAssets: () => dispatch(fetchAllAssets()),
  fetchPortfolioActions: () => dispatch(fetchPortfolioActions()),
})
export default withRouter(connect(msp, mdp)(App))
