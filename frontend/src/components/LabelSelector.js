import React, { useEffect, useState } from 'react';
import '../styles/LabelSelector.css'
/*
    An upgraded LabelObject component, with darkening animation and a resizable label.
*/
function LabelSelector(props) {
    const [animationActive, setAnimationActive] = useState(false);
    const startAnimation = () => {
        if(!animationActive)
        {
            setAnimationActive(true);
        }
    };

    //Using ctrlPressed prop to know if ctrl was clicked.
    const ctrlPressed = props.ctrlPressed;

    useEffect(() => {
        if(ctrlPressed) {
            setAnimationActive(true);
        }
        if(!ctrlPressed){
            setAnimationActive(false);
        }

        //Cleanup function
        return () => {};
    }, [ctrlPressed]);


    const [lables, setLablePosition] = useState([0, 0]);
    const [lablesSize, setLableSize] = useState([0, 0]);
    const [mouseDown, setMouseDown] = useState(false);
    const [flicker, setFlicker] = useState('none');

    const handlePageClick = (e) => {
        if (animationActive) {
            setLablePosition([e.clientX, e.clientY]);
            setMouseDown(true);
        }
    };
    // allow the user to select upwords
    const handlePageSelect = (e) => {
        if (mouseDown && flicker==='none') {
            setLableSize([e.clientX - lables[0], e.clientY - lables[1]]);
        }
    }
    const handlePageFinish = (e) => {
        if (mouseDown) {
            // check if props has onLabelSelect
            if (props.onLabelSelect) {
                props.onLabelSelect(lables, lablesSize);
            }
            // flicker animation
            if(props.hasFound && props.hasFound(lables, lablesSize))
            {
                // player found the object
                setFlicker('green');
            }
            else
            {
                setFlicker('red');
            }

            setTimeout(() => {
                setFlicker('none');
                setMouseDown(false);
                setAnimationActive(false);
                setLablePosition([0, 0]);
                setLableSize([0, 0]);
            }, 200);
        }
    }

    return (
        <>
            <div
                className={`${animationActive ? 'animate-fade-in' : 'hidden'} w-full h-full hole `}
                onMouseDown={handlePageClick}
                onMouseMove={handlePageSelect}
                onMouseUp={handlePageFinish}
                style={{cursor: 'crosshair', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
            >
                <div className = 'labelDiv'
                style={{ top: lables[1], left: lables[0], width: lablesSize[0], height: lablesSize[1],
                    backgroundColor: flicker==='red' ? 'rgba(204, 17, 17, 0.5)' :
                (flicker==='green' ? 'rgba(17, 204, 76, 0.5)' : 'rgba(253, 253, 253, 0.5)') }}>
                </div>
            </div>

            <button className="labelButton select-none" onClick={startAnimation}>[ ]</button>
        </>
    )
}

export default LabelSelector;