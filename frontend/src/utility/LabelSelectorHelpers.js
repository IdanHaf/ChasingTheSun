import zoomToRangeData from "../data/ZoomToRange.json";


const getObjectData = (e, panoramaState, [xStart, yStart]) => {
  const [lat, lng] = [
    Math.floor(panoramaState?.position?.lat() * 1e12) / 1e12,
    Math.floor(panoramaState?.position?.lng() * 1e12) / 1e12,
  ];
  const currentZoom = panoramaState?.zoom;
  const [pitch, heading] = [
    panoramaState?.pov?.pitch,
    panoramaState?.pov?.heading,
  ];
  const [xCenter, yCenter] = [
    xStart + (e.clientX - xStart) / 2,
    yStart + (e.clientY - yStart) / 2,
  ];
  const [xRatio, yRatio] = [
    xCenter / window.innerWidth,
    yCenter / window.innerHeight,
  ];
  const [labelW, labelH] = [
    (e.clientX - xStart) / window.innerWidth,
    (e.clientY - yStart) / window.innerHeight,
  ];

  const objectData = {
    lat: lat,
    lng: lng,
    zoom: currentZoom,
    xRatio: xRatio,
    yRatio: yRatio,
    pitch: pitch,
    heading: heading,
    labelH: labelH,
    labelW: labelW,
  };

  return objectData;
}
/*
    The function receives mouseUp event and panorama state.
    Set the needed values of the labeled object in the db.
 */
const setObjectData = (objectData) => {

  const description = "test";
  const dataToSet = {description: description, info: objectData}

  console.log(dataToSet);

  // Enter the data to the db.
  fetch("/api/objective", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSet),
  })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log("returns: ");
          console.log(data);
        }
      });

};

/*
    TODO:: for zoom > 1, seems like a connection between the zoom to the pitch range ( 1 + zoom = pitch / 2).

    The function receives the current zoom.
    Returns the zoom with zoom to pitch range function.
 */
const closest = (currentZoom) => {
  return (currentZoom > 0.8 && currentZoom < 1.25) ? "1"
    : currentZoom < 0.8 ? "0.6"
    : currentZoom < 1.8 ? "1.5"
    : "2";
};

/*
    The function receives the mouseUp event.
    Calculating the objects location based on pitch and heading.

    returns true if the object was found, false otherwise.
 */
const objectPositionOnScreen = (e, panoramaState, objectData) => {
  // Debugging.
  // console.log("x:" + e.clientX + " y: " + e.clientY);
  // console.log("pitch:" + panoramaState.pov.pitch);
  // console.log("zoom:" + panoramaState.zoom);
  // console.log("ratio:");
  // console.log(e.clientX/window.innerWidth);
  // console.log("heading: " + panoramaState.pov.heading);

  // Y - axis calculation.
  // TODO:: need to calculate base on ratio and pitch from db.
  let zPitch = closest(panoramaState.zoom);

  //const xPos = e.clientX;
  const yPos = e.clientY;

  //Calculate min and max pitch.
  const zoomToPitchRange = zoomToRangeData.pitch;

  let yAxisRatio = parseFloat(objectData.yRatio); //receives from db.
  let objectLabeledPitch = parseFloat(objectData.pitch); //receives from db.

  //Object min and max pitch.
  const minPitch = objectLabeledPitch - yAxisRatio * zoomToPitchRange[zPitch];
  const maxPitch = minPitch + zoomToPitchRange[zPitch];

  // TODO:: need to retrieve according to panoramaMap location.
  const windowHeightStart = 0;
  const windowHeightEnd = window.innerHeight;

  let pitch = panoramaState?.pov?.pitch;

  let ratio = (Math.abs(minPitch) + pitch) / (maxPitch - minPitch);

  let objectYposition =
    (windowHeightEnd - windowHeightStart) * ratio + windowHeightStart -
    (25 * yPos) / window.innerHeight;

  // X - axis calculation.
  // TODO:: need to receive from db.

  //Calculate min and max heading.
  const zoomToHeadingRange = zoomToRangeData.heading;

  let xAxisRatio = parseFloat(objectData.xRatio); //receives from db.
  let objectLabeledHeading = parseFloat(objectData.heading); //receives from db.

  let maxHeading =
    (objectLabeledHeading + xAxisRatio * zoomToHeadingRange[zPitch]) % 360;
  let minHeading =
    objectLabeledHeading - (1 - xAxisRatio) * zoomToHeadingRange[zPitch];

  if (minHeading < 0) {
    minHeading += 360;
  }

  let heading = panoramaState?.pov?.heading;

  let headingInterval = maxHeading - minHeading;
  let deg = heading - minHeading;

  //Going throw 360deg edge case.
  if (minHeading > maxHeading) {
    headingInterval = 360 - minHeading + maxHeading;
    if (heading < minHeading) {
      deg = 360 - minHeading + heading;
    }
  }

  let xRatio = deg / headingInterval;

  const windowLeft = 0;
  const windowRight = window.innerWidth;

  let objectXposition =
    windowRight - (windowRight - windowLeft) * xRatio + windowLeft;

  return [objectXposition, objectYposition];
};

export { getObjectData, setObjectData, objectPositionOnScreen, closest };
