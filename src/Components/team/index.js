import React, {useEffect, useState} from 'react';
import {firebase, firebasePlayers} from "../../firebase";

//app modules
import PlayerCard from '../utils/player_card';
import { firebaseLooper } from '../utils/miscs';

//3rd party libs
import Fade from 'react-reveal/Fade';
import { Promise } from "core-js";

//static files
import Stripes from '../../Resources/images/stripes.png';

const Team = (props) => {
    const [loading] = useState(false);
    const [players] = useState([]);

    useEffect(() => {
        firebasePlayers.once('value')
            .then((snapshot) => {
                const players = firebaseLooper(snapshot);
                let promises = [];
                players.map((player, idx) => {
                    promises.push(new Promise((resolve, reject) => {
                        firebase.storage().ref('players')
                            .child(player.image).getDownloadURL()
                            .then((url) => {player.url = url})
                        resolve()
                    }))
                })
            })
            .catch()
    }, []);

    return (
        <div>
            team
        </div>
    );
};

export default Team;