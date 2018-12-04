import React from "react";
import { Switch } from "react-router-dom";

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Admin from '../pages/Admin';
import ResetPassword from '../pages/ResetPassword';
import Players from '../pages/Players';
import PlayersCreate from '../pages/PlayersCreate';
import PlayersEdit from '../pages/PlayersEdit';

import { AuthenticatedRoute, UnauthenticatedRoute } from "../hocs/RouteWrappers";

export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path={'/login'} exact component={Login} props={childProps} />
    <UnauthenticatedRoute path={'/signup'} exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path={'/resetpassword'} exact component={ResetPassword} props={childProps} />

    <AuthenticatedRoute path={'/'} exact component={Home} props={childProps} />

    <AuthenticatedRoute path={'/admin'} exact component={Admin} props={childProps} />
    <AuthenticatedRoute path={'/account'} exact component={Account} props={childProps} />

    <AuthenticatedRoute path={'/players'} exact component={Players} props={childProps} />
    <AuthenticatedRoute path={'/players/create'} exact component={PlayersCreate} props={childProps} />
    <AuthenticatedRoute path={'/players/edit/:id'} exact component={PlayersEdit} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    { /* TODO: Build and import a NotFound page and then uncomment the line below*/}
    {/* <Route component={NotFound} /> */}
  </Switch>;



/**
 * How to pass params to a Route
 * 
 *  <Route
 *    path='/routeUrl'
 *    render={(props) => <Contact {...props} someProp={1234} />}
 *  />
 * 
 */