import { useState, useEffect } from 'react';
import {
    getObjectData
} from "../utility/LabelSelectorHelpers";

/*
    The "useLabelSelector" React custom hook allows you to use the label selector animation and data.
    It accepts object with ctrlPressed, getData, panoramaState and setZoom function.
    and returns:
        -   animationActive - true if button/ctrl was clicked.
        -   lables - start pos of label.
        -   lablesSize - label size.
        -   flicker - color of flicker according to label result.
        -   objectDataArray - if iaManager == true, array of labels data, else [].
        -   setObjectDataArray - setter for the above.
        -   startAnimation - function that starts animation.
        -   handlePageClick - function that handles start of label drawing.
        -   handlePageSelect - function that handles size of label.
        -   handlePageFinish - function that handles end of label drawing (check if right object was labeled).
*/
function useLabelSelector({ctrlPressed, getData, panoramaState, setZoom}) {
    //Using ctrlPressed prop to know if ctrl was clicked.
    const [animationActive, setAnimationActive] = useState(false);

    useEffect(() => {
        if (ctrlPressed && !mouseDown) {
            setAnimationActive(true);
            zoomTo1();
        }
        if (!ctrlPressed) {
            setAnimationActive(false);
        }

        //Cleanup function
        return () => {};
    }, [ctrlPressed]);

    const [lables, setLablePosition] = useState([0, 0]);
    const [lablesSize, setLableSize] = useState([0, 0]);
    const [mouseDown, setMouseDown] = useState(false);
    const [flicker, setFlicker] = useState("none");

    const handlePageClick = (e) => {
        if (animationActive) {
            setLablePosition([e.clientX, e.clientY]);
            setMouseDown(true);
        }
    };

    const handlePageSelect = (e) => {
        if (mouseDown && flicker === "none") {
            setLableSize([e.clientX - lables[0], e.clientY - lables[1]]);
        }
    };

    // TODO: fix bug - doesn't go all the way to 1.
    const zoomTo1 = () => {
        if (setZoom && panoramaState.zoom && panoramaState.zoom < 1) {
            // console.log(panoramaState.zoom);

            const timer = setInterval(() => {
                setZoom((oldZ) => {
                    return oldZ + 0.1;
                });
            }, 10);
            // stop after got to 1
            const stopTime = (1 - panoramaState.zoom) * 100;
            setTimeout(() => {
                clearInterval(timer);
            }, stopTime);
        }
    }

    const startAnimation = () => {
        if (!animationActive) {
            setAnimationActive(true);
            zoomTo1();
        }
    };

    //For managers.
    const [objectDataArray, setObjectDataArray] = useState([]);

    //TODO:: check that object inserted isn't already exist.
    const handlePageFinish = (e, wasDetected = false) => {
        if (mouseDown) {
            if (getData) {
                const newObjectData = getObjectData(e, panoramaState, lables);
                setObjectDataArray(prevDataArray => [...prevDataArray, newObjectData]);
                setFlicker("orange");
            }
            else if (wasDetected) {
                // player found the object
                setFlicker("green");
            }
            else {
                setFlicker("red");
            }

            setTimeout(() => {
                setFlicker("none");
                setMouseDown(false);
                setAnimationActive(false);
                setLablePosition([0, 0]);
                setLableSize([0, 0]);
            }, 200);
        }
    };

    return {
        animationActive,
        lables,
        lablesSize,
        flicker,
        objectDataArray,
        setObjectDataArray,
        startAnimation,
        handlePageClick,
        handlePageSelect,
        handlePageFinish,
    };
}

export default useLabelSelector;