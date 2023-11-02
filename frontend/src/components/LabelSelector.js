import React, { useEffect, useState } from 'react';
import '../styles/LabelSelector.css'
import zoomToPitch from '../data/ZoomToPitch.json'

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
        if (mouseDown && flicker === 'none') {
            //console.log([e.clientX, e.clientY]);
            setLableSize([e.clientX - lables[0], e.clientY - lables[1]]);
        }
    }

    // Checking if the object was labeled.
    const panoramaState = props.panoramaState;
    const [[xTrack, yTrack], setTrack] = useState([0,0]);

    const hasDetected = () => {

    }

    /*
        TODO:: calculate the max pitch and end pitch using the ratio of pitch to height.
        TODO:: move inside of useEffect, with zoom and lat & lng dependencies.
        For later - console.log(panoramaState?.position.lat() === 37.868996731655);

        The function receives the position of the bottom-right side of the label.
        Calculating the objects location based on pitch and heading.

        returns true if the object was found, false otherwise.
     */
    const wasDetected = (labelYSize, labelXpos) => {
        // console.log("x:" +labelXpos + " y: " + labelYSize);
         console.log("pitch:" + panoramaState.pov.pitch);
         console.log("zoom:" + panoramaState.zoom);
        //console.log("ratio:");
        //console.log(labelYSize/window.innerHeight);
        // Y - axis calculation.
        // TODO:: need to calculate base on ratio and pitch from db.
        //const minPitch = -41.696;
        //const maxPitch = 30.5026;

        console.log("window height:");
        console.log(window.innerHeight);

        //Calculate try.
        let yAxisRatio = 0.6906666666666667;//receives from db.
        let objectLabeledPitch = 14.746001332508243;//receives from db.
        let zPitch = "0.6";

        if(panoramaState.zoom > 0.9)
        {
            yAxisRatio = 0.76;
            objectLabeledPitch = 8.912548190430712;
            zPitch = "1";
        }

        //750 = window innerHeight of the manager that set the data.
        const minPitch =  objectLabeledPitch - yAxisRatio*(zoomToPitch[zPitch]);
        const maxPitch = minPitch + zoomToPitch[zPitch];

        // console.log("max and min pitch:");
        // console.log(minPitch);
        // console.log(maxPitch);

        // TODO:: need to retrieve according to panoramaMap location.
        const windowHeightStart = 0;
        const windowHeightEnd = window.innerHeight;

        let pitch = panoramaState?.pov?.pitch;

        let ratio = ((Math.abs(minPitch)) + pitch)/(maxPitch - minPitch);

        let objectYposition = (windowHeightEnd - windowHeightStart)*ratio + windowHeightStart;


        // X - axis calculation.
        // TODO:: need to receive from db.
        let leftHeading = 44;
        let rightHeading = 300;

        let heading = panoramaState?.pov?.heading;

        let headingInterval = leftHeading - rightHeading;
        let deg =  heading - rightHeading;

        //Going throw 360deg edge case.
        if(rightHeading > leftHeading)
        {
            headingInterval = (360 - rightHeading) + leftHeading;
            if(heading < rightHeading) {
                deg = (360 - rightHeading) + heading;
            }
        }

        let xRatio = deg / headingInterval;

        // TODO:: need to retrieve according to panoramaMap location.
        const windowLeft = 0;
        const windowRight = window.innerWidth;

        let objectXposition = windowRight - (windowRight - windowLeft) * xRatio + windowLeft;

        setTrack([objectXposition, objectYposition]);

        //  TODO:: need to change to be according to the label size;
        return (lables[1]  < objectYposition && lables[1] > objectYposition - 150) &&
            (labelYSize > objectYposition && labelYSize < objectYposition + 100) &&
            (objectXposition > 100 + lables[0] && objectXposition + 50 < labelXpos);
    }

    const handlePageFinish = (e) => {
        if (mouseDown) {

            // check if props has onLabelSelect
            if (props.onLabelSelect) {
                props.onLabelSelect(lables, lablesSize);
            }
            // flicker animation
            if(wasDetected(e.clientY, e.clientX) /*&& props.hasFound && props.hasFound(lables, lablesSize)*/)
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

    // make sure doesn't clash with clues
    // handle ctrl+tab edge case
    return (
        <>
            <div onMouseDown={(e) => {wasDetected(e.clientY, e.clientX)}}
                 style={{background: "black", position: "absolute", top: yTrack, left: xTrack, color: "green"}}
            >+</div>

            <div
                className={`${animationActive ? 'animate-fade-in' : 'hidden'} w-full h-full hole bg-black/30 cursor-crosshair`}
                onMouseDown={handlePageClick}
                onMouseMove={handlePageSelect}
                onMouseUp={handlePageFinish}
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