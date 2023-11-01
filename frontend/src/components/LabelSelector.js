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
            console.log("x:" +e.clientX + " y: " + e.clientY);
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
        // Y - axis calculation.
        // TODO:: need to receive from db.
        const minPitch = -41.696;
        const maxPitch = 30.5026;

        // TODO:: need to retrieve according to panoramaMap location.
        const windowHeightStart = 0;
        const windowHeightEnd = window.innerHeight + 40;

        let pitch = panoramaState?.pov?.pitch;

        let ratio = ((Math.abs(minPitch)) + pitch)/(maxPitch - minPitch);

        let objectYposition = (windowHeightEnd - windowHeightStart)*ratio + windowHeightStart;


        // X - axis calculation.
        // TODO:: need to receive from db.
        const leftHeading = 39;
        const rightHeading = 308;

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

        console.log("x position of object is: " + objectXposition);

        setTrack([objectXposition, objectYposition]);

        //  TODO:: need to change to be according to the label size;
        return (lables[1]  < objectYposition && lables[1] > objectYposition - 150) &&
            (labelYSize > objectYposition && labelYSize < objectYposition + 100) &&
            (objectXposition > 100 + lables[0] && objectXposition + 50 < labelXpos);
    }

    const handlePageFinish = (e) => {
        if (mouseDown) {

            console.log("release position of x is: " + e.clientX);

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
            <div> {JSON.stringify(panoramaState?.position)}</div>
            <div onMouseDown={(e) => {wasDetected(e.clientY, e.clientX)}}
                 style={{position: "absolute", top: yTrack, left: xTrack, color: "green"}}
            >+</div>

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