import React from 'react';

//3rd party libs
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ({
    user,
    component: Comp,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props) => (
            rest.restricted
                ? (
                    user
                        ? <Redirect to='/dashboard'/>
                        : <Comp {...props} user />
                )
                : <Comp {...props} user />
        )}  />
    );
};

export default PublicRoutes;