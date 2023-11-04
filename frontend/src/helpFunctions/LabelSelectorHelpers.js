import zoomToRangeData from "../data/ZoomToRange.json";
import zoomToRatioData from "../data/RatioData.json";

/*
    TODO:: for zoom > 1, seems like a connection between the zoom to the pitch range ( 1 + zoom = pitch / 2).

    The function receives the current zoom.
    Returns the zoom with zoom to pitch range function.
 */

const closest = (currentZoom) => {
    return (currentZoom > 0.8 && currentZoom < 1.25) ? "1" :
           (currentZoom < 0.8) ? "0.6" :
           (currentZoom < 1.8) ? "1.5" : "2";
}

/*
    For later - console.log(panoramaState?.position.lat() === 37.868996731655);

    The function receives the mouseUp event.
    Calculating the objects location based on pitch and heading.

    returns true if the object was found, false otherwise.
 */
const objectPositionOnScreen = (e, panoramaState) => {
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
    const zoomToRatioPitch = zoomToRatioData.pitch;

    let yAxisRatio = zoomToRatioPitch[zPitch].ratio;//receives from db.
    let objectLabeledPitch = zoomToRatioPitch[zPitch].pitch;//receives from db.

    //Object min and max pitch.
    const minPitch = objectLabeledPitch - yAxisRatio * (zoomToPitchRange[zPitch]);
    const maxPitch = minPitch + zoomToPitchRange[zPitch];

    // TODO:: need to retrieve according to panoramaMap location.
    const windowHeightStart = 0;
    const windowHeightEnd = window.innerHeight;

    let pitch = panoramaState?.pov?.pitch;

    let ratio = ((Math.abs(minPitch)) + pitch) / (maxPitch - minPitch);

    let objectYposition = (windowHeightEnd - windowHeightStart) * ratio + windowHeightStart
        - 25 * yPos / window.innerHeight;


    // X - axis calculation.
    // TODO:: need to receive from db.

    //Calculate min and max heading.
    const zoomToRatioHeading = zoomToRatioData.heading;
    const zoomToHeadingRange = zoomToRangeData.heading;

    let xAxisRatio = zoomToRatioHeading[zPitch].ratio;//receives from db.
    let objectLabeledHeading = zoomToRatioHeading[zPitch].heading;//receives from db.

    let maxHeading = (objectLabeledHeading + (xAxisRatio * zoomToHeadingRange[zPitch])) % 360;
    let minHeading = (objectLabeledHeading - (1 - xAxisRatio) * zoomToHeadingRange[zPitch]);

    if (minHeading < 0) {
        minHeading += 360;
    }

    let heading = panoramaState?.pov?.heading;

    let headingInterval = maxHeading - minHeading;
    let deg = heading - minHeading;

    //Going throw 360deg edge case.
    if (minHeading > maxHeading) {
        headingInterval = (360 - minHeading) + maxHeading;
        if (heading < minHeading) {
            deg = (360 - minHeading) + heading;
        }
    }

    let xRatio = deg / headingInterval;

    const windowLeft = 0;
    const windowRight = window.innerWidth;

    let objectXposition = windowRight - (windowRight - windowLeft) * xRatio + windowLeft;

    return [objectXposition, objectYposition];
}


export { objectPositionOnScreen, closest };