import React, { useEffect, useState } from "react";
import usePanorama from "../utility/usePanorama";
import "../styles/PanoramaMap.css";
import LabelSelector from "./LabelSelector";
import ManagerLabelSelector from "./ManagerLabelSelector"
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

  const handleKeyUp = () => {
    setCtrlPressed(false);
  };

  // Solution to ctrl bug.
  const ctrlHandle = (e) => {
    if (e.ctrlKey) {
      setCtrlPressed(true);
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
  }, []);


  return (
    <div className="absolute w-full h-full -z-10">
      <div
        className="mapContainer"
        ref={panoRef}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        if="pano"
      ></div>
      {
        (props.mapMode === "manager") ?
            <ManagerLabelSelector
                ctrlPressed={ctrlPressed}
                panoramaState={panoramaState}
                setZoom={setZoom}
                data={objectData}
            />
            : (props.mapMode === "intelligence") ?
                <LabelSelector
                    ctrlPressed={ctrlPressed}
                    panoramaState={panoramaState}
                    setZoom={setZoom}
                    data={objectData}
                />
                :
                <YellowCarLabelSelector
                    ctrlPressed={ctrlPressed}
                    panoramaState={panoramaState}
                    setZoom={setZoom}
                    data={objectData}
                />
      }
    </div>
  );
}

export default PanoramaMap;
