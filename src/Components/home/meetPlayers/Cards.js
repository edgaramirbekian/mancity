import React, { useState } from 'react';

//app modules
import PlayerCard from '../../utils/player_card';

//3rd party libs
import {easePolyOut} from "d3-ease";
import Animate from 'react-move/Animate';

//static files
import Otamendi from '../../../Resources/images/players/Otamendi.png';

const HomeCards = (props) => {

    const [cards] = useState([
        {
            bottom: 90,
            left: 300
        },
        {
            bottom: 60,
            left: 200
        },
        {
            bottom: 30,
            left: 100
        },
        {
            bottom: 0,
            left: 0
        }
    ]);

    const animateCards = () => (
        cards.map((card, idx) => (
            <Animate
                key={idx}
                show={props.show}
                start={{
                    left: 0,
                    bottom: 0
                }}
                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    timing: {duration: 500, ease: easePolyOut}
                }}
            >
                {({left, bottom}) => {
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                left, bottom
                            }}
                        >
                            <PlayerCard
                                number="30"
                                name="Nicholas"
                                lastName="Otamendi"
                                img={Otamendi}
                            />
                        </div>
                    )
                }}
            </Animate>
        ))
    );

    return (
        <div>
            {animateCards()}
        </div>
    );
};

export default HomeCards;