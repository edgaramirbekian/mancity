import React from 'react';

//app modules
import Blocks from './Blocks';
import { Tag } from '../../utils/miscs';

const MatchesHome = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag
                    bck="#0e1731"
                    size="50px"
                    color="#ffffff"
                >
                    Matches
                </Tag>

                <Blocks />

                <Tag
                    bck="#ffffff"
                    size="25px"
                    color="#0e1731"
                    link={true}
                    linkTo="/team"
                >
                    See More Matches
                </Tag>
            </div>
        </div>
    );
};

export default MatchesHome;