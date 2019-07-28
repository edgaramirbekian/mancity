import React, {useEffect, useState} from 'react';
import { firebaseMatches } from "../../firebase";

//app modules
import { firebaseLooper, reverseArray } from "../utils/miscs";
import LeagueTable from "./Table";
import MatchesList from "./MatchesList";

//3rd party libs
import CircularProgress from '@material-ui/core/CircularProgress';

const Matches = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [matches, setMatches] = useState([]);
    const [filteredMatches, setFilteredMatches] = useState([]);
    const [playedFilter, setPlayedFilter] = useState('all');
    const [resultFilter, setResultFilter] = useState('all');

    useEffect(() => {
        firebaseMatches.once('value')
            .then(snapshot => {
                const DBmatches = firebaseLooper(snapshot);
                setIsLoading(false);
                setMatches(reverseArray(DBmatches));
                setFilteredMatches(reverseArray(DBmatches))
            })
            .catch(error => console.log(error))
    }, []);

    const showPlayed = (played) => {
        const list = matches.filter((match, idx) => {
            return match.final === played
        });
        played === 'All'
            ? setFilteredMatches(matches)
            : setFilteredMatches(list);
        setPlayedFilter(played);
        setResultFilter('All')
    };

    const showResult = (result) => {
        const list = matches.filter((match, idx) => {
            return match.result === result
        });
        result === 'All'
            ? setFilteredMatches(matches)
            : setFilteredMatches(list);
        setPlayedFilter('All');
        setResultFilter(result)
    };

    return (
        <div className="the_matches_container">
            <div className="the_matches_wrapper">
                <div className="left">
                    <div className="match_filters">
                        <div className="match_filters_box">
                            <div className="tag">
                                Show Match
                            </div>
                            <div className="cont">
                                <div className={`option ${playedFilter === 'All'? 'active' : ''}`}
                                     onClick={() => showPlayed('All')}
                                >
                                    All
                                </div>
                                <div className={`option ${playedFilter === 'Yes'? 'active' : ''}`}
                                     onClick={() => showPlayed('Yes')}
                                >
                                    Played
                                </div>
                                <div className={`option ${playedFilter === 'No'? 'active' : ''}`}
                                     onClick={() => showPlayed('No')}
                                >
                                    Not Played
                                </div>
                            </div>
                        </div>

                        <div className="match_filters_box">
                            <div className="tag">
                                Game Result
                            </div>
                            <div className="cont">
                                <div className={`option ${resultFilter === 'All'? 'active' : ''}`}
                                     onClick={() => showResult('All')}
                                >
                                    All
                                </div>
                                <div className={`option ${resultFilter === 'W' ? 'active' : ''}`}
                                     onClick={() => showResult('W')}
                                >
                                    W
                                </div>
                                <div className={`option ${resultFilter === 'L' ? 'active' : ''}`}
                                     onClick={() => showResult('L')}
                                >
                                    L
                                </div>
                                <div className={`option ${resultFilter === 'D' ? 'active' : ''}`}
                                     onClick={() => showResult('D')}
                                >
                                    D
                                </div>
                            </div>
                        </div>
                    </div>
                    <MatchesList matches={filteredMatches}/>
                </div>
                <div className="right">
                    <LeagueTable />
                </div>
            </div>
        </div>
    );
};

export default Matches;