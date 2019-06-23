import React from 'react';
import ReactDOM from 'react-dom';

//app modules
import Routes from './routes';

//3rd party libs
import { BrowserRouter } from 'react-router-dom';

const RenderApp = Component => ReactDOM.render(
    <BrowserRouter>
        <Component />
    </BrowserRouter>,
    document.getElementById('root'));

RenderApp(Routes);

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('./routes', () => {
            // console.log('Hot reload just happened');
            const NextApp = require('./routes').default;
            RenderApp(NextApp);
        });
    }
}
