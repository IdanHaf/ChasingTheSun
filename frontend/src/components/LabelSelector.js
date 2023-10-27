import React, { useState, useEffect } from 'react';
import '../styles/LabelObject.css'
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
                setFlicker('empty');        
            }, 100);
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
                className={`${animationActive ? 'animate-fade-in' : 'hidden'} bg-transparent-black w-full h-full hole `}
                onMouseDown={handlePageClick}
                onMouseMove={handlePageSelect}
                onMouseUp={handlePageFinish}
                style={{cursor: 'crosshair'}}
            >  
                <div 
                // className={`${(flicker==='red') ? 'animate-red-flicker' : ''}`}
                style={{ position: 'absolute', top: lables[1], left: lables[0], zIndex: 20, width: lablesSize[0], height: lablesSize[1],
                backgroundColor: flicker==='red' ? 'rgba(204, 17, 17, 0.5)' : (flicker==='green' ? 'rgba(17, 204, 76, 0.5)' : 'rgba(253, 253, 253, 0.5)'),
                display: 'block', border: '1px solid #fff' }}>
                </div>
            </div>

            <button className="labelButton absolute bottom-5 left-5 opacity-70 bg-black rounded-2xl text-white py-1 px-2 w-16 h-16 text-center text-xl m-2 cursor-pointer transition duration-300 hover:text-green-500 hover:opacity-100" 
            onClick={startAnimation}>[ ]</button>
        </>
    )
}

export default LabelSelector;