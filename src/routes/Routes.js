import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from '../pages/Login';
import Signup from '../pages/Signup';
// import Home from '../pages/Home';
import Account from '../pages/Account';
import Admin from '../pages/Admin';
import Leaderboards from '../pages/Leaderboards';
import ResetPassword from '../pages/ResetPassword';
import Players from '../pages/Players';
import PlayersCreate from '../pages/PlayersCreate';
import PlayersEdit from '../pages/PlayersEdit';
import Settings from '../pages/Settings';
import Tournaments from '../pages/Tournaments';
import TournamentsCreate from '../pages/TournamentsCreate';
import NotFound from '../pages/NotFound';

import { AuthenticatedRoute, UnauthenticatedRoute } from "../hocs/RouteWrappers";

export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path={'/login'} exact component={Login} props={childProps} />
    <UnauthenticatedRoute path={'/signup'} exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path={'/resetpassword'} exact component={ResetPassword} props={childProps} />

    <AuthenticatedRoute path={'/'} exact component={Tournaments} props={childProps} />
    <AuthenticatedRoute path={'/tournaments'} exact component={Tournaments} props={childProps} />
    <AuthenticatedRoute path={'/tournaments/create'} exact component={TournamentsCreate} props={childProps} />

    <AuthenticatedRoute path={'/admin'} exact component={Admin} props={childProps} />
    <AuthenticatedRoute path={'/account'} exact component={Account} props={childProps} />

    <AuthenticatedRoute path={'/players'} exact component={Players} props={childProps} />
    <AuthenticatedRoute path={'/players/create'} exact component={PlayersCreate} props={childProps} />
    <AuthenticatedRoute path={'/players/edit/:id'} exact component={PlayersEdit} props={childProps} />

    <AuthenticatedRoute path={'/leaderboards'} exact component={Leaderboards} props={childProps} />
    <AuthenticatedRoute path={'/settings'} exact component={Settings} props={childProps} />


    { /* Finally, catch all unmatched routes */ }
     <Route component={NotFound} />
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