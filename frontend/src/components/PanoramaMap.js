import React, { useEffect, useState } from "react";
import usePanorama from "../utility/usePanorama";
import "../styles/PanoramaMap.css";
import LabelSelector from "./LabelSelector";
import ManagerLabelSelector from "./ManagerLabelSelector";
import YellowCarLabelSelector from "../components/YellowCarLabelSelector";
/*
    The "PanoramaMap" React component presents Google Street View in your React app.
    It uses the "usePanorama" hook to allow moving around the map using the keyboard.

    Returns:
        html div component of the map that covers the screen.
 */

function PanoramaMap(props) {
  const [panoRef, panoramaState, setPov, setZoom, objectData] = usePanorama();
  
  function handleKeyDown(event) {
    if (!props.active) return;
    // looking up/down keys
    if (event.key === "i") {
      event.preventDefault();
      event.stopPropagation();
      setPov((oldH, oldpP) => {
        return { heading: oldH, pitch: oldpP + 3 };
      });
    } else if (event.key === "k") {
      event.preventDefault();
      event.stopPropagation();
      setPov((oldH, oldpP) => {
        return { heading: oldH, pitch: oldpP - 3 };
      });
    }
    // zoom keys
    else if (event.key === "l") {
      event.preventDefault();
      event.stopPropagation();
      setZoom((oldZ) => {
        return oldZ + 1;
      });
    } else if (event.key === "j") {
      event.preventDefault();
      event.stopPropagation();
      if (panoramaState.zoom - 1 >= 1)
        setZoom((oldZ) => {
          return oldZ - 1;
        });
    }
  }

  const [ctrlPressed, setCtrlPressed] = useState(false);

  // TODO: at ctrl keyup, focus on the map again
  const handleKeyUp = () => {
    if (!props.active) return;
    setCtrlPressed(false);
    props.onCtrlPressed(false);
  };

  // Solution to ctrl bug.
  const ctrlHandle = (e) => {
    if (!props.active) return;
    if (e.ctrlKey) {
      setCtrlPressed(true);
      props.onCtrlPressed(true);
    }
    if(e.which === 9) {
      // e.preventDefault();
      // e.stopPropagation();
      console.log("tab pressed");
      setCtrlPressed(false);
      props.onCtrlPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", ctrlHandle);
    window.addEventListener("keyup", handleKeyUp);

    //Cleanup function
    return () => {
      window.removeEventListener("keydown", ctrlHandle);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [props.active]);

  return (
    <div className="absolute w-full h-full z-0">
      <div
        className="mapContainer"
        ref={panoRef}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        if="pano"
      ></div>
      {props.mapMode === "manager" ? (
        <ManagerLabelSelector
          ctrlPressed={ctrlPressed}
          panoramaState={panoramaState}
          setZoom={setZoom}
          data={objectData}
        />
      ) : props.mapMode === "intelligence" ? (
        <LabelSelector
          ctrlPressed={ctrlPressed}
          panoramaState={panoramaState}
          setZoom={setZoom}
          data={objectData}
          onGameEnd={props.setActive}
        />
      ) : (
        <YellowCarLabelSelector
          ctrlPressed={ctrlPressed}
          panoramaState={panoramaState}
          setZoom={setZoom}
          data={objectData}
          socket={props.socket}
          roomId={props.roomId}
        />
      )}
    </div>
  );
}

export default PanoramaMap;
