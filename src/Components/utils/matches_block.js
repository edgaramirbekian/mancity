import React from 'react';

const MatchesBlock = (props) => {
    const { match } = props;
    return (
        <div className="match_block">
            <div className="match_date">
                {match.final ? match.date : `Match not played yet: ${match.date}` }
            </div>
            <div className="match_wrapper">
                <div className="match_top">
                    <div className="left">
                        <div className="icon" style={{background: `url(/images/team_icons/${match.localThmb}.png)`}}>

                        </div>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </div>
    );
};

export default MatchesBlock;