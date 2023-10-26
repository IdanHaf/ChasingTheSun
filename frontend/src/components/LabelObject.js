import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/LabelObject.css';

function LabelObject() {
    const [buttonPressed, setButtonPressed] = useState(false);
    const [showDiv, setShowDiv] = useState(false);
    const [[xPosition,yPosition], setPosition] = useState([0, 0]);
    const [[xWidth,yHeight], setWidth] = useState([0, 0]);


    const handleButtonClick = () => setButtonPressed(true);
    const handlePageClick = (e) => {
        if(buttonPressed) {
            setShowDiv(true);
            setPosition([e.clientX, e.clientY]);
        }
    };

    const handleMouseMove = (e) =>{
        setWidth([(e.clientX - xPosition), (e.clientY - yPosition)]);
    };

    const handleMouseUp = () =>{
        window.removeEventListener('mousemove', handleMouseMove);
    };

    useEffect(() => {
        if(showDiv){
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        //Cleanup.
        return () => {
            window.removeEventListener('mousemove', handleMouseUp);
        }
    }, [showDiv])


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
                     style={{position: 'absolute', top: yPosition + 'px', left: xPosition + 'px', width: xWidth,
                             height: yHeight}}>
                </div>
            }
        </>
    );
}

export default LabelObject;

