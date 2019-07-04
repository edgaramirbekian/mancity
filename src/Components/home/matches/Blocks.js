import React, { useState, useEffect } from 'react';
import { firebaseMatches } from "../../../firebase";

//app modules
import { firebaseLooper, reverseArray } from '../../utils/miscs';
import MatchesBlock from '../../utils/matches_block';

const Blocks = () => {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        firebaseMatches.limitToLast(6).once("value").then((snapshot) => {
            const matches = firebaseLooper(snapshot);
            setMatches(() => {return reverseArray(matches)});
        })
    }, []);

    const showMatches = () => {
        if (matches) {
            matches.map((match,idx) => (
                <div key={idx} className="item">
                    <div className="wrapper">
                        <MatchesBlock match={match} />
                    </div>
                </div>
            ))
        } else {

        }
    };

    return (
        <div className="home_matches">
            {showMatches()}
        </div>
    );
};

export default Blocks;