import React, { useEffect, useState } from "react";
import "../styles/LabelSelector.css";
import {
    setObjectData,
} from "../utility/LabelSelectorHelpers";
import useLabelSelector from "../utility/useLabelSelector";


function ManagerLabelSelector(props) {
    //States for manager Case.
    const customHookProps = {
        ctrlPressed: props.ctrlPressed,
        isManager: true,
        panoramaState: props.panoramaState,
        setZoom: props.setZoom,
    }

    const {
        animationActive,
        lables,
        lablesSize,
        flicker,
        objectDataArray,
        setObjectDataArray,
        startAnimation,
        handlePageClick,
        handlePageSelect,
        handlePageFinish
    } = useLabelSelector(customHookProps);

    //Managers "Add data" button was clicked.
    const handleAddDataClick = () => {
        if(objectDataArray.length > 0) {
            setObjectData(objectDataArray);
            setObjectDataArray([]);
        }
    }

    // make sure doesn't clash with clues
    // handle ctrl+tab edge case
    return (
        <>
            <div
                className={`${
                    animationActive ? "animate-fade-in" : "hidden"
                } w-full h-full hole bg-black/30 cursor-crosshair`}
                onMouseDown={handlePageClick}
                onMouseMove={handlePageSelect}
                onMouseUp={handlePageFinish}
            >
                <div
                    className="labelDiv"
                    style={{
                        top: lables[1],
                        left: lables[0],
                        width: lablesSize[0],
                        height: lablesSize[1],
                        backgroundColor:
                            flicker === "orange"
                                ? "rgba(250,160,68,0.63)"
                                : "rgba(253, 253, 253, 0.5)",
                    }}
                ></div>
            </div>

            <button className="addButton select-none"
                    style={(objectDataArray.length > 0) ?
                        {background: "limegreen"} :
                        {background: "darkgreen", color: "black", opacity: 1, cursor: "default"}}
                    onClick={handleAddDataClick}
            >
                Add Data
            </button>

            <button className="labelButton select-none" onClick={startAnimation}>
                [ ]
            </button>
        </>
    );
}

export default ManagerLabelSelector;