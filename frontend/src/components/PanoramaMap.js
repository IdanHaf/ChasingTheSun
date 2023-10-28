import React, { useEffect, useState } from 'react';
import usePanorama from '../utility/usePanorama';
import '../styles/PanoramaMap.css';
import LabelSelector from './LabelSelector';
/*
    The "PanoramaMap" React component presents Google Street View in your React app.
    It uses the "usePanorama" hook to allow moving around the map using the keyboard.

    Returns:
        html div component of the map that covers the screen.
 */

function PanoramaMap() {
    const [panoRef, , setPov, setZoom] = usePanorama();
    const [ctrlPressed, setCtrlPressed] = useState(false);

    function handleKeyDown(event) {
        // looking up/down keys
        if (event.key === 'i') {
            event.preventDefault();
            event.stopPropagation();
            setPov((oldH, oldpP) => { return { heading: oldH, pitch: oldpP + 3 } })

        }
        else if (event.key === 'k') {
            event.preventDefault();
            event.stopPropagation();
            setPov((oldH, oldpP) => { return { heading: oldH, pitch: oldpP - 3 } })
        }
        // zoom keys
        else if (event.key === 'l') {
            event.preventDefault();
            event.stopPropagation();
            setZoom((oldZ) => { return oldZ + 1 })
        }
        else if (event.key === 'j') {
            event.preventDefault();
            event.stopPropagation();
            setZoom((oldZ) => { return oldZ - 1 })
        }

    }

    const handleKeyUp = () => {
        setCtrlPressed(false);
    }

    const ctrlHandle = (e) => {
        if (e.ctrlKey) {
            if (!ctrlPressed) {
                setCtrlPressed(true);
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", ctrlHandle);

        //Cleanup function
        return () => {
            window.removeEventListener("keydown", ctrlHandle);
        };
    }, []);



    // Try adding more panorama windows.
    return (
        <div className="container" >
            <div className="mapContainer" ref={panoRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} if="pano"></div>
            <LabelSelector ctrlPressed = {ctrlPressed}/>
        </div>
    );
}

export default PanoramaMap;




