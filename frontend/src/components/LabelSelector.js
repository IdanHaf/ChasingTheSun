import React, { useEffect, useState } from "react";
import "../styles/LabelSelector.css";
import zoomToRatioData from "../data/RatioData.json";
import {
  objectPositionOnScreen,
  closest,
} from "../helpFunctions/LabelSelectorHelpers";

/*
    An upgraded LabelObject component, with darkening animation and a resizable label.
*/

function LabelSelector(props) {
  const [animationActive, setAnimationActive] = useState(false);
  const startAnimation = () => {
    if (!animationActive) {
      setAnimationActive(true);
    }
  };

  //Using ctrlPressed prop to know if ctrl was clicked.
  const ctrlPressed = props.ctrlPressed;

  useEffect(() => {
    if (ctrlPressed) {
      setAnimationActive(true);
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
  // allow the user to select upwords
  const handlePageSelect = (e) => {
    if (mouseDown && flicker === "none") {
      //console.log([e.clientX, e.clientY]);
      setLableSize([e.clientX - lables[0], e.clientY - lables[1]]);
    }
  };

  // Checking if the object was labeled.
  const panoramaState = props.panoramaState;
  const [[xTrack, yTrack], setTrack] = useState([0, 0]);

  /*
        TODO:: check if in the right lat&lon.
        The function receives event of mouseUp.
        Returns true if object was labeled, else false.
     */
  const wasDetected = (e) => {
    const [objectXposition, objectYposition] = objectPositionOnScreen(
      e,
      panoramaState
    );

    const zPitch = closest(panoramaState.zoom);
    const xPos = e.clientX;
    const yPos = e.clientY;

    setTrack([objectXposition, objectYposition]);

    const size = zoomToRatioData.size;

    const squareStartX = objectXposition - size[zPitch].x / 2;
    const squareEndX = objectXposition + size[zPitch].x / 2;

    const squareStartY = objectYposition - size[zPitch].y / 2;
    const squareEndY = objectYposition + size[zPitch].y / 2;

    const delta = 120;
    const outSquare =
      lables[1] >= squareStartY - delta && yPos <= squareEndY + delta &&
      lables[0] >= squareStartX - delta && xPos <= squareEndX + delta;

    const inSquare =
      lables[1] <= squareStartY && yPos >= squareEndY &&
      lables[0] <= squareStartX && xPos >= squareEndX;

    return outSquare && inSquare;
  };

  const handlePageFinish = (e) => {
    if (mouseDown) {
      // flicker animation
      if (wasDetected(e)) {
        // player found the object
        setFlicker("green");
      } else {
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

  // make sure doesn't clash with clues
  // handle ctrl+tab edge case
  return (
    <>
      <div
        className="select-none"
        onMouseDown={(e) => {
          wasDetected(e);
        }}
        style={{
          background: "rgba(220,55,55,0.5)",
          position: "absolute",
          top: yTrack - zoomToRatioData.size[closest(panoramaState.zoom)].y / 2,
          left: xTrack - zoomToRatioData.size[closest(panoramaState.zoom)].x / 2,
          width: zoomToRatioData.size[closest(panoramaState.zoom)].x,
          height: zoomToRatioData.size[closest(panoramaState.zoom)].y,
        }}
      ></div>
      <div
        className="select-none"
        onMouseDown={(e) => {
          wasDetected(e);
        }}
        style={{
          background: "rgba(31,71,27,0.5)",
          position: "absolute",
          top:
            yTrack -
            zoomToRatioData.size[closest(panoramaState.zoom)].y / 2 - 60,
          left:
            xTrack -
            zoomToRatioData.size[closest(panoramaState.zoom)].x / 2 - 60,
          width:
              zoomToRatioData.size[closest(panoramaState.zoom)].x + 120,
          height:
              zoomToRatioData.size[closest(panoramaState.zoom)].y + 120,
        }}
      ></div>
      <div
        className="select-none"
        onMouseDown={(e) => {
          wasDetected(e);
        }}
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
    </>
  );
}

export default LabelSelector;
