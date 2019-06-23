import React from 'react';

//3rd party libs
//material-ui
import { Link } from 'react-router-dom';

//static files
import city_logo from '../../Resources/images/logos/manchester_city_logo.png';

export const CityLogo = (props) => {
    const template = <div
        className="img_cover"
        style={{
            width: props.width,
            height: props.height,
            background: `url(${city_logo}) no-repeat`
        }}
    >
    </div>;

    if (props.link) {
        return <Link to={props.linkTo} className="link_logo">
            {template}
        </Link>
    } else {
        return template
    }
};