import React from 'react';

//styles
import './Resources/css/app.css';

//app modules
import Layout from './HOC/Layout';
import Home from './Components/home';
import SignIn from "./Components/signin";

//3rd party libs
import { Switch, Route } from 'react-router-dom';

function Routes() {
  return (
    <Layout>
      <Switch>
        <Route exact component={Home} path='/'/>
        <Route exact component={SignIn} path='/signin'/>
      </Switch>
    </Layout>
  );
}

export default Routes;
