import React from 'react';

//3rd party libs
import Zoom from 'react-reveal/Zoom';

//static files
import Jersey from '../../../Resources/images/jersey.jpg';

const PromotionAnimation = () => {
    return (
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <div>
                        <span>WIN A</span>
                        <span>JERSEY</span>
                    </div>
                </Zoom>
            </div>
            <div className="right">
                <Zoom>
                    <div
                        style={{
                            background: `url(${Jersey}) no-repeat`
                        }}
                    >
                    </div>
                </Zoom>
            </div>
        </div>
    );
};

export default PromotionAnimation;