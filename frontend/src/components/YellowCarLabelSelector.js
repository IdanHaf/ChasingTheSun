import React, {useEffect, useRef, useState} from "react";
import "../styles/LabelSelector.css";
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

    //TODO:: less props drilling.
    const socket = props.socket;
    const roomId = props.roomId;

    const index = useRef(0);
    const maxLabels = useRef(0);
    //TODO:: change divArray, and use - useMemo or useCallback.
    const divArr = [1, 2, 3, 4];
    const maxIndex = useRef(0);
    const [labelNumberArr, setLabelNumberArr] = useState([]);

    useEffect(() =>{
        if(socket == null || roomId === ""){
            return;
        }

        if(objectDataArray.length === 1){
            index.current = labelNumberArr.length;
        }
        socket.emit("labelsNumber-changed", index.current, objectDataArray.length,
            labelNumberArr, maxLabels.current, roomId);

        const handleReceive = (labelArr, maxChanged, indexOfMax, maxNumber) => {
            setLabelNumberArr(labelArr);
            if(maxChanged) {
                maxLabels.current = maxNumber;
                maxIndex.current = indexOfMax;
            }
        }
        socket.on("labelsNumber-received", handleReceive);

        return () => {
            //Removes the specified listener from the listener array for the event named eventName.
            socket.off("labelsNumber-received", handleReceive);
        }
    },[socket, objectDataArray.length, roomId]);


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

            <div
                className=
                    "fixed top-0 left-0 flex w-full flex-row justify-center space-x-4
                     items-center text-center text-slate-600 select-none rounded-lg p-4"
            >
                {
                    divArr.map((i) =>
                        (
                            <div key={i} className= {`${
                                (i === maxIndex.current) ? "shadow-lg shadow-green-300" : "shadow-lg shadow-orange-300"
                            } bg-white p-2 rounded-full`}>
                                number of labels: {(labelNumberArr.length > i) ? labelNumberArr[i] : 0}
                            </div>
                        ))
                }
            </div>



            <button className="labelButton select-none" onClick={startAnimation}>
                [ ]
            </button>
        </>
    );
}

export default YellowCarLabelSelector;