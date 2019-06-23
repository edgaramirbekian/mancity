import React from 'react';

//app modules
import Featured from './featured/index';
import Matches from './matches/index';

const Home = () => {
    return (
        <div className="bck_blue">
            <Featured />
            <Matches />
        </div>
    );
};

export default Home;