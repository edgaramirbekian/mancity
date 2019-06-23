import React from 'react';

//app modules
import { CityLogo } from '../utils/Icons';

//3rd party libs
//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//react-router
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar
            position={"fixed"}
            style={{
                backgroundColor: "#98c5e9",
                boxShadow: "none",
                padding: "10px 0",
                borderBottom: "2px solid #00285e"
            }}
        >
            <Toolbar style={{display: "flex"}}>

                <div style={{flexGrow: '1'}}>
                    <div className="header-logo">
                        <CityLogo
                            link={true}
                            linkTo="/"
                            width="70px"
                            height="70px"
                        />
                    </div>
                </div>
                
                <Link to="/team">
                    <Button color="inherit">Team</Button>
                </Link>
                <Link to="/matches">
                    <Button color="inherit">Matches</Button>
                </Link>

            </Toolbar>
        </AppBar>
    );
};

export default Header;