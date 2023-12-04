import React, { useEffect, useState } from "react";
import "../styles/LabelSelector.css";
import {
  setObjectData,
  objectPositionOnScreen,
  closest,
} from "../utility/LabelSelectorHelpers";
import useLabelSelector from "../utility/useLabelSelector";
import { twMerge } from "tailwind-merge";

/*
    An upgraded LabelObject component, with darkening animation and a resizable label.
*/
function LabelSelector(props) {
  const customHookProps = {
    ctrlPressed: props.ctrlPressed,
    getData: false,
    panoramaState: props.panoramaState,
    setZoom: props.setZoom,
  }

  const {
    animationActive,
    lables,
    lablesSize,
    flicker,
    objectWasDetected,
    startAnimation,
    handlePageClick,
    handlePageSelect,
    handlePageFinish
  } = useLabelSelector(customHookProps);

  const [[widthSize, heightSize], setWH] = useState([0, 0]);
  const panoramaState = props.panoramaState;

  //TODO:: can be removed later.
  const [[xTrack, yTrack], setTrack] = useState([0, 0]);

  /*
    //TODO:: when removing the debugging squares add if labelSize != [0, 0] and can even remove.

      The function receives event of mouseUp.
      Returns true if object was labeled, else false.
 */
  const wasDetected = (e) => {
    const lat = Math.floor(panoramaState?.position?.lat() * 1e12) / 1e12;
    const lng = Math.floor(panoramaState?.position?.lng() * 1e12) / 1e12;
    const currentZoom = closest(panoramaState.zoom);

    let data = props.data.filter((d) => {
      return (
          parseFloat(d.lat) === lat &&
          parseFloat(d.lng) === lng &&
          d.zoom === parseFloat(currentZoom)
      )
    });

    //Position is wrong.
    if(data.length <= 0){
      return false;
    }

    const objectData = data[0];
    const [objectXposition, objectYposition] = objectPositionOnScreen(
      e,
      panoramaState,
      objectData
    );

    const xEndPos = e.clientX;
    const yEndPos = e.clientY;

    setTrack([objectXposition, objectYposition]);

    const wSize = (objectData.labelW)*window.innerWidth/2;
    const hSize = (objectData.labelH)*window.innerHeight/2;

    //TODO:: can remove when removing green and red squares.
    setWH([wSize, hSize]);

    const squareStartX = objectXposition - wSize / 2;
    const squareEndX = objectXposition + wSize / 2;

    const squareStartY = objectYposition - hSize / 2;
    const squareEndY = objectYposition + hSize / 2;

    //TODO:: change to be relative to window size & zoom.
    const Ydelta = hSize/2 + 120;
    const Xdelta = wSize/2 + 120;
    const outSquare =
      lables[1] >= squareStartY - Ydelta && yEndPos <= squareEndY + Ydelta &&
      lables[0] >= squareStartX - Xdelta && xEndPos <= squareEndX + Xdelta;

    const inSquare =
      lables[1] <= squareStartY && yEndPos >= squareEndY &&
      lables[0] <= squareStartX && xEndPos >= squareEndX;

    return outSquare && inSquare;
  };

  const handleMouseUp = (e) =>{
    handlePageFinish(e, wasDetected(e));
  }

  useEffect(() => {
      if(objectWasDetected){
          props.onGameEnd(false);
      }
  }, [objectWasDetected])

  // TODO: handle ctrl+tab edge case
  return (
    <>
      {/*
          <div
            className="select-none"
            style={{
              background: "rgba(220,55,55,0.5)",
              position: "absolute",
              top: yTrack - heightSize / 2,
              left:
                xTrack - widthSize / 2,
              width: widthSize,
              height: heightSize,
            }}
          ></div>
          <div
            className="select-none"
            style={{
              background: "rgba(31,71,27,0.5)",
              position: "absolute",
              top:
                yTrack -
                  heightSize -
                120,
              left:
                xTrack -
                  widthSize -
                120,
              width: (widthSize + 120)*2,
              height: (heightSize + 120)*2,
            }}
          ></div>
          <div
            className="select-none"
            style={{
              background: "rgba(0,0,0)",
              position: "absolute",
              top: yTrack,
              left: xTrack,
              color: "green",
            }}
          >
            +
          </div>
          */
      }

      <div
        className={twMerge(
          animationActive ? "animate-fade-in" : "hidden",
        "w-full h-full hole bg-black/30 cursor-crosshair")}
        onMouseDown={handlePageClick}
        onMouseMove={handlePageSelect}
        onMouseUp={handleMouseUp}
      >
        <div
          className="labelDiv"
          style={{
            top: lables[1],
            left: lables[0],
            width: lablesSize[0],
            height: lablesSize[1],
            backgroundColor:
              flicker === "red"
                ? "rgba(204, 17, 17, 0.5)"
                : flicker === "green"
                ? "rgba(17, 204, 76, 0.5)"
                : "rgba(253, 253, 253, 0.5)",
          }}
        ></div>
      </div>

      <button className="labelButton select-none" onClick={startAnimation}>
        [ ]
      </button>

      {objectWasDetected && (
          <WinPopUp />

      )}
    </>
  );
}

function WinPopUp(){
    return (
        <div className="h-full w-full fixed flex justify-center items-center backdrop-blur-sm font-mono">
            <div className="bg-green-500/70 h-3/4 w-2/3 z-10 p-2 rounded-lg flex flex-col justify-between gap-8">
                <p className="text-white text-lg flex flex-col items-center gap-6">
                    <span>Objective was found!</span>
                    <img
                        src="person_on_bike.png"
                        className="w-40 h-40 border border-green-500 p-2 my-4"
                    ></img>
                    <span>YOU WON!</span>
                </p>
                <div className="flex justify-center items-center gap-2 text-green-500 pb-2">
                    <a
                        className="basis-1/4 bg-white place-self-center p-2 text-center rounded-full
                                    hover:bg-amber-50 hover:text-green-700"
                        href="/cluesGame"
                    >
                        Play again
                    </a>

                    <a
                        className="basis-1/4 bg-white place-self-center p-2 text-center rounded-full
                                   hover:bg-amber-50 hover:text-green-700"
                        href="/"
                    >
                        Home
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LabelSelector;
