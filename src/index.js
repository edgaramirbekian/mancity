import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase';
//app modules
import Routes from './routes';

//3rd party libs
import { BrowserRouter } from 'react-router-dom';
import dotenv from 'dotenv';

dotenv.config();

const RenderApp = (Component, props) => ReactDOM.render(
    <BrowserRouter>
        <Component user={props.user}/>
    </BrowserRouter>,
    document.getElementById('root'));

firebase.auth().onAuthStateChanged((user) => {
    RenderApp(Routes, {user});
});

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('./routes', () => {
            // console.log('Hot reload just happened');
            const NextApp = require('./routes').default;
            RenderApp(NextApp);
        });
    }
}
