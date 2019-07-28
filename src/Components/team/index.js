import React, {useEffect, useState} from 'react';
import {firebase, firebasePlayers} from "../../firebase";

//app modules
import PlayerCard from '../utils/player_card';
import { firebaseLooper } from '../utils/miscs';

//3rd party libs
import Fade from 'react-reveal/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

//static files
import Stripes from '../../Resources/images/stripes.png';

const Team = (props) => {
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        firebasePlayers.once('value')
            .then((snapshot) => {
                const players = firebaseLooper(snapshot);
                let promises = [];

                for (let key in players) {
                    promises.push(
                        new Promise((resolve, reject) => {
                            firebase.storage().ref('players')
                                .child(players[key].image).getDownloadURL()
                                .then(url => {
                                    players[key].url = url;
                                    resolve();
                                    reject(error => console.log(error))
                                })
                        })
                    )
                }

                Promise.all(promises)
                    .then(() => {
                        setLoading(false);
                        setPlayers(players);
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }, []);

    const showPlayersByCategory = (category) => {
        return players.map((player, idx) => {
            if (player.position === category) {
                return (
                    <Fade left delay={idx * 20} key={idx}>
                        <div className="item">
                            <PlayerCard
                                number={player.number}
                                name={player.name}
                                lastName={player.lastname}
                                img={player.url}
                            />
                        </div>
                    </Fade>
                )
            }
        })
    };

    return (
        <div
            className="the_team_container"
            style={{
                background: `url(${Stripes}) repeat`
            }}
        >
            {
                !loading
                    ? <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keepers</div>
                            <div className="team_cards">
                                {showPlayersByCategory('GK')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Defence</div>
                            <div className="team_cards">
                                {showPlayersByCategory('DF')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Midfield</div>
                            <div className="team_cards">
                                {showPlayersByCategory('MF')}
                            </div>
                        </div>
                        <div className="team_category_wrapper">
                            <div className="title">Forwards</div>
                            <div className="team_cards">
                                {showPlayersByCategory('FW')}
                            </div>
                        </div>
                    </div>
                    : <CircularProgress thickness={7} style={{color: '#98c5e9'}} />
            }
        </div>
    );
};

export default Team;