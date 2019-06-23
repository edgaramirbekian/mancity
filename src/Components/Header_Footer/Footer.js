import React from 'react';

//app modules
import { CityLogo } from "../utils/icons";

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="footer_logo">
                <CityLogo
                    link={true}
                    linkTo="/"
                    width="70px"
                    height="70px"
                />
            </div>
            <div className="footer_discl">
                Manchester City FC
            </div>

        </footer>
    );
};

export default Footer;