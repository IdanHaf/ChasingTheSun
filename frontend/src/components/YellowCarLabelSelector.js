import React, { useEffect, useState } from "react";
import "../styles/LabelSelector.css";
import {
    setObjectData,
} from "../utility/LabelSelectorHelpers";
import useLabelSelector from "../utility/useLabelSelector";


function YellowCarLabelSelector(props) {
    //States for yellow car mode.
    const customHookProps = {
        ctrlPressed: props.ctrlPressed,
        getData: true,
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

            <div className= "fixed top-0 left-0 w-full py-2 bg-slate-600/80 rounded-t-lg">
                number of labels: {objectDataArray.length}
            </div>

            <button className="labelButton select-none" onClick={startAnimation}>
                [ ]
            </button>
        </>
    );
}

export default YellowCarLabelSelector;