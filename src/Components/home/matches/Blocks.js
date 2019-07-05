import React, { useState, useEffect } from 'react';
import { firebaseMatches } from "../../../firebase";

//app modules
import { firebaseLooper, reverseArray } from '../../utils/miscs';
import MatchesBlock from '../../utils/matches_block';

//3rd party libs
import Slide from 'react-reveal/Slide';

const Blocks = () => {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        firebaseMatches.limitToLast(6).once("value").then((snapshot) => {
            const matches = firebaseLooper(snapshot);
            setMatches(() => {return reverseArray(matches)});
        })
    }, []);

    const showMatches = (some_matches) => (
        some_matches ?
            some_matches.map((match,idx) => (
                <Slide bottom key={match.id}>
                    <div key={idx} className="item">
                        <div className="wrapper">
                            <MatchesBlock match={match} />
                        </div>
                    </div>
                </Slide>
            ))
            : null
    );

    return (
        <div className="home_matches">
            {showMatches(matches)}
        </div>
    );
};

export default Blocks;