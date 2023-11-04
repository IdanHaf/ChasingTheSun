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
    const [panoRef, panoramaState, setPov, setZoom] = usePanorama();
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
            if(panoramaState.zoom -1 >= 1)
            setZoom((oldZ) => { return oldZ - 1 })
        }

        /*
        Bug with ctrl twice in the same place.
        else if(event.ctrlKey) {
            setCtrlPressed(true);
        }
        */
    }

    const handleKeyUp = () => {
        setCtrlPressed(false);
    }


    // Solution to ctrl bug.
    const ctrlHandle = (e) => {
        if (e.ctrlKey) {
            setCtrlPressed(true);
        }
    }


    useEffect(() => {
        window.addEventListener("keydown", ctrlHandle);
        window.addEventListener("keyup", handleKeyUp);


        //Cleanup function
        return () => {
            window.removeEventListener("keydown", ctrlHandle);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    // works kind of wierd with looking left and right

    useEffect(() => {
        // only 0.6,1,2 zoom levels are allowed
        if (setZoom && panoramaState.zoom && (panoramaState.zoom < 1) ) {
                // console.log(panoramaState.zoom);
            setZoom((oldZ) => {
                return 1;
            });
        }
      }, [panoramaState.zoom]);


    return (
        <div className="absolute w-full h-full -z-10" >
            <div className="mapContainer" ref={panoRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} if="pano"></div>
            <LabelSelector ctrlPressed = {ctrlPressed} panoramaState = {panoramaState} isManager = {false}/>
        </div>
    );
}

export default PanoramaMap;




