import React from 'react';

//3rd party libs
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    user,
    component: Comp,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            user
            ? <Comp {...props} user/>
            : <Redirect to='/' />
        )}/>
    );
};

export default PrivateRoute;