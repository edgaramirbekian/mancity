import React, { useState } from 'react';

//3rd party libs
import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

const Stripes = () => {

    const [stripes] = useState([
        {
            background: '#98c5e9',
            left: 120,
            rotate: 25,
            top: -260,
            delay: 0,
        },
        {
            background: '#ffffff',
            left: 360,
            rotate: 25,
            top: -397,
            delay: 200,
        },
        {
            background: '#98c5e9',
            left: 600,
            rotate: 25,
            top: -498,
            delay: 400,
        }
    ]);

    const showStripes = () => (
        stripes.map((stripe, idx) => (
            <Animate
                key={idx}
                show={true}
                start={{
                    background: '#ffffff',
                    opacity: 0,
                    left: 0,
                    top: 0,
                    rotate: 0
                }}
                enter={{
                    background: stripe.background,
                    opacity: [1],
                    left: [stripe.left],
                    top: [stripe.top],
                    rotate: [stripe.rotate],
                    timing: {delay: stripe.delay, duration: 200, ease: easePolyOut}
                }}
            >
                {({background, opacity, left, top, rotate}) => (
                    <div
                        className="stripe"
                        style={{
                            background,
                            opacity,
                            transform: `rotate(${rotate}deg) translate(${left}px, ${top}px)`
                        }}
                    >
                    </div>
                )}
            </Animate>
        ))
    );

    return (
        <div className="featured_stripes">
            {showStripes()}
        </div>
    );
};

export default Stripes;