import React, { useState } from 'react';

//app modules
import { Tag } from '../../utils/miscs';
import HomeCard from './Cards';

//3rd party libs
import Reveal from 'react-reveal/Reveal';

//static files
import Stripes from '../../../Resources/images/stripes.png';

const MeetPlayers = () => {
    const [show, setShow] = useState(false);

    return (
        <Reveal
            fraction={0.7}
            onReveal={ () => {setShow(true)} }
        >
            <div
                className="home_meetplayers"
                style={{
                    background: `#ffffff url(${Stripes})`
                }}
            >
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            <HomeCard show={show}/>
                        </div>
                        <div className="home_text_wrapper">
                            <div
                                style={{
                                    display: "inline-block",
                                    marginBottom: "20px"
                                }}
                            >
                                <Tag
                                    bck="#0e1731"
                                    size="100px"
                                    color="#ffffff"
                                >
                                    Meet
                                </Tag>
                            </div>
                            <div
                                style={{
                                    display: "inline-block",
                                    marginBottom: "20px"
                                }}
                            >
                                <Tag
                                    bck="#0e1731"
                                    size="100px"
                                    color="#ffffff"
                                    style={{
                                        display: "inline-block",
                                        marginBottom: "20px"
                                    }}
                                >
                                    The
                                </Tag>
                            </div>
                            <div
                                style={{
                                    display: "inline-block",
                                    marginBottom: "20px"
                                }}
                            >
                                <Tag
                                    bck="#0e1731"
                                    size="100px"
                                    color="#ffffff"
                                    style={{
                                        display: "inline-block",
                                        marginBottom: "20px"
                                    }}
                                >
                                    Players
                                </Tag>
                            </div>
                            <div
                                style={{
                                    display: "inline-block",
                                    marginBottom: "20px",
                                    border: "2px solid #0e1731"
                                }}
                            >
                                <Tag
                                    bck="#ffffff"
                                    size="27px"
                                    color="#0e1731"
                                    link={true}
                                    linkTo="/team"
                                >
                                    All players
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
};

export default MeetPlayers;