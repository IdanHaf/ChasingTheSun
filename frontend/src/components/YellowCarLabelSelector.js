import React, { useEffect, useState } from "react";
import "../styles/LabelSelector.css";
import {
    setObjectData,
} from "../utility/LabelSelectorHelpers";
import useLabelSelector from "../utility/useLabelSelector";
import { io } from 'socket.io-client'


function YellowCarLabelSelector(props) {
    const [socket, setSocket] = useState(null);

    //Server connection.
    useEffect(() => {
      const newSocket = io("http://localhost:3001");
      setSocket(newSocket);
      alert("open another tab in yellow car mode");

      return () => {
          newSocket.disconnect();
      }
    }, []);

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

    const [otherLabelNumber, setOtherLabelNumber] = useState(0);

    useEffect(() =>{
        if(socket == null){
            return;
        }
        socket.emit("labelsNumber-changed", objectDataArray.length);

        const handleReceive = (labelNumber) => {
            setOtherLabelNumber(labelNumber);
        }
        socket.on("labelsNumber-received", handleReceive);

        return () => {
            //Removes the specified listener from the listener array for the event named eventName.
            socket.off("labelsNumber-received", handleReceive);
        }
    },[socket, objectDataArray.length]);


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
                    "fixed top-0 left-0 flex w-64 flex-col space-y-4
                     items-center text-center text-white select-none"
            >
                <div className= {`${
                    (objectDataArray.length < otherLabelNumber) ? "bg-red-500" : "bg-green-400"
                    } w-full py-2 rounded-lg`}>
                    number of labels: {objectDataArray.length}
                </div>

                <div className= {`${
                    (objectDataArray.length >= otherLabelNumber) ? "bg-red-500" : "bg-green-400"
                    } w-full py-2 rounded-lg`}>
                    rival number of labels: {otherLabelNumber}
                </div>
            </div>

            <button className="labelButton select-none" onClick={startAnimation}>
                [ ]
            </button>
        </>
    );
}

export default YellowCarLabelSelector;