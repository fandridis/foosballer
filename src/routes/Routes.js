import React from "react";
import { Switch } from "react-router-dom";

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Account from '../pages/Account';
import Admin from '../pages/Admin';
import ResetPassword from '../pages/ResetPassword';
import Players from '../pages/Players';
import * as ROUTES from '../routes/names';

import { AuthenticatedRoute, UnauthenticatedRoute } from "../hocs/RouteWrappers";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path={ROUTES.HOME} exact component={Home} props={childProps} />
    <UnauthenticatedRoute path={ROUTES.LOGIN} exact component={Login} props={childProps} />
    <UnauthenticatedRoute path={ROUTES.SIGNUP} exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path={ROUTES.RESET_PASSWORD} exact component={ResetPassword} props={childProps} />
    <AuthenticatedRoute path={ROUTES.ADMIN} exact component={Admin} props={childProps} />
    <AuthenticatedRoute path={ROUTES.ACCOUNT} exact component={Account} props={childProps} />
    <AuthenticatedRoute path={ROUTES.PLAYERS} exact component={Players} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    { /* TODO: Build and import a NotFound page and then uncomment the line below*/}
    {/* <Route component={NotFound} /> */}
  </Switch>;
