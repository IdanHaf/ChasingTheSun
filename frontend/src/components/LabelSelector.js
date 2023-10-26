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

    const [labelMode, setLabelMode] = useState(false);
    useEffect(() => {
        if (animationActive) {
            // Add the animation class
            const timer = setTimeout(() => {
                setLabelMode(true); // Remove animation class after a delay
            }, 1000); // Adjust the delay to match your animation duration
            return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
        }
    }, [animationActive]);

    const [lables, setLablePosition] = useState([0, 0]);
    const [lablesSize, setLableSize] = useState([0, 0]);
    const [mouseDown, setMouseDown] = useState(false);


    const handlePageClick = (e) => {
        if (animationActive) {
            setLablePosition([e.clientX, e.clientY]);
            setMouseDown(true);
        }
    };
    const handlePageSelect = (e) => {
        if (mouseDown) {
            setLableSize([e.clientX - lables[0], e.clientY - lables[1]]);
        }
    }
    const handlePageFinish = (e) => {
        if (mouseDown) {
            // check if props has onLabelSelect
            if (props.onLabelSelect) {
                props.onLabelSelect(lables, lablesSize);
            }
            setMouseDown(false);
            setAnimationActive(false);
            setLabelMode(false);
            setLablePosition([0, 0]);
            setLableSize([0, 0]);
        }
    }
    
    return (
        <>
            <div
                className={`${animationActive ? 'animate-fade-in' : 'hidden'} bg-black w-full h-full hole ${labelMode ? 'opacity-50' : ''} `}
                onMouseDown={handlePageClick}
                onMouseMove={handlePageSelect}
                onMouseUp={handlePageFinish}
                style={{cursor: 'crosshair'}}
            >
                
                <div style={{ position: 'absolute', top: lables[1], left: lables[0], zIndex: 20, width: lablesSize[0], height: lablesSize[1], backgroundColor: 'rgba(253, 253, 253)', opacity: '0.5', display: 'block' }}>
                </div>
            </div>

            <button className="labelButton absolute bottom-5 left-5 opacity-70 bg-black rounded-2xl text-white py-1 px-2 w-16 h-16 text-center text-xl m-2 cursor-pointer transition duration-300 hover:text-green-500 hover:opacity-100" 
            onClick={startAnimation}>[ ]</button>
        </>
    )
}

export default LabelSelector;