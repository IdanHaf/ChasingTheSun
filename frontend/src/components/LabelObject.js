import React from 'react';
import usePanorama from '../usePanorama';
import { useState } from 'react';
import '../styles/LabelObject.css';

function LabelObject() {
    const [buttonPressed, setButtonPressed] = useState(false);
    const [showDiv, setShowDiv] = useState(false);
    const [[xPosition,yPosition], setPosition] = useState([0, 0]);

    const handleButtonClick = () => setButtonPressed(true);
    const handlePageClick = (e) => {
        if(buttonPressed) {
            setShowDiv(true);
            setPosition([e.clientX, e.clientY]);
        }
    };


    return (
        <>
            {
                buttonPressed &&
                <div className = "pageCover" style={{cursor: 'crosshair'}} onMouseDown = {handlePageClick}></div>
            }

            <button className = "labelButton" onClick={handleButtonClick}>[ ]</button>

            {
                showDiv &&
                <div className= "labelDiv"
                     style={{position: 'absolute', top: yPosition + 'px', left: xPosition + 'px'}}>
                </div>
            }
        </>
    );
}

export default LabelObject;

