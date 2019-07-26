import React from 'react';

//styles
import './Resources/css/app.css';

//app modules
import Layout from './HOC/Layout';
import Home from './Components/home';
import SignIn from "./Components/signin";
import Dashboard from "./Components/admin/Dashboard";
import PrivateRoute from "./Components/auth_routes/PrivateRoute";
import PublicRoutes from "./Components/auth_routes/PublicRoutes";
import AdminMatches from "./Components/admin/matches";
import AdminPlayers from "./Components/admin/players";
import EditMatch from "./Components/admin/matches/EditMatch";
import EditPlayer from "./Components/admin/players/EditPlayer";
import Matches from "./Components/matches";
import Team from "./Components/team";

//3rd party libs
import { Switch } from 'react-router-dom';

function Routes(props) {
  return (
    <Layout>
      <Switch>
          <PrivateRoute exact component={Dashboard} path='/dashboard' {...props} />
          <PrivateRoute exact component={AdminMatches} path='/admin_matches' {...props} />
          <PrivateRoute exact component={EditMatch} path='/admin_matches/edit/:id' {...props} />
          <PrivateRoute exact component={EditMatch} path='/admin_matches/edit' {...props} />
          <PrivateRoute exact component={AdminPlayers} path='/admin_players' {...props} />
          <PrivateRoute exact component={EditPlayer} path='/admin_players/edit/:id' {...props} />
          <PrivateRoute exact component={EditPlayer} path='/admin_players/edit' {...props} />
          <PublicRoutes {...props} restricted={true} exact component={SignIn} path='/signin' />
          <PublicRoutes {...props} restricted={false} exact component={Home} path='/' />
          <PublicRoutes {...props} restricted={false} exact component={Matches} path='/matches' />
          <PublicRoutes {...props} restricted={false} exact component={Team} path='/team' />
      </Switch>
    </Layout>
  );
}

export default Routes;
