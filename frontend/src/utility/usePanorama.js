import { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

/*
    The "usePanorama" React hook allows you to show a Google Street View panorama in your React app.
    It accepts the start Id , position, pov, and zoom as parameters, 
    and returns: 
        - panoRef: a ref to the div where the panorama will be shown
        - panoramaState: an object containing the current panorama's id, position, pov, and zoom
        - setPov: a setState function for the pov, which takes a lambda function
        - setZoom: a setState function for the zoom, which takes a lambda function
        - objectData: an array of objects which holds data.
*/

// Todo: check when the component is re-rendered, if the panorama is already loaded, don't load it again.
function usePanorama(
  startId = "",
  startPosition = { lat: 40.759425, lng: -73.980829 },
  startPov = { heading: 50, pitch: 0 },
  startZoom = 1
) {
  const [panoramaState, setPanoramaState] = useState({
    id: startId,
    position: startPosition,
    pov: startPov,
    zoom: startZoom,
  });

  const [objectData, setObjectData] = useState([]);

  const panoRef = useRef(null);
  const API_KEY = ""; //For now - AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o

  const [loaded, setLoaded] = useState(false);
  const [setPov, setPovLoader] = useState((a, b) => {});
  const [setZoom, setZoomLoader] = useState((a) => {});

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
    });

    //Get a random object.
    fetch("/api/objective/random", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          //Set the data of the object.
          setObjectData(data);

          console.log("before library");
          //Load the street view map.
          loader.importLibrary("streetView").then(async (streetViewLibrary) => {
            console.log("library loaded");
            if (streetViewLibrary && panoRef.current) {
              const { StreetViewPanorama } = streetViewLibrary;
              console.log("everything's loaded, let's go");
              const panorama = new StreetViewPanorama(panoRef.current, {
                position: {
                  lat: parseFloat(data[0].lat),
                  lng: parseFloat(data[0].lng),
                },
                pov: startPov,
                visible: true,
                fullscreenControl: false,
                disableDefaultUI: true,
                motionTracking: false,
                motionTrackingControl: false,
              });
              // transfer panorama object to json
              // console.log(panorama)
              // jsonPanorama = JSON.stringify(panorama);
              // // transfer json to object
              // panorama = JSON.parse(jsonPanorama);

              //Set start position.
              setPanoramaState((prevPano) => {
                return { ...prevPano, position: panorama.getPosition() };
              });

              panorama.addListener("pano_changed", () => {
                setPanoramaState((prevPano) => {
                  return { ...prevPano, id: panorama.getPano() };
                });
              });
              panorama.addListener("position_changed", () => {
                setPanoramaState((prevPano) => {
                  return { ...prevPano, position: panorama.getPosition() };
                });
              });
              panorama.addListener("pov_changed", () => {
                setPanoramaState((prevPano) => {
                  return { ...prevPano, pov: panorama.getPov() };
                });
              });
              panorama.addListener("zoom_changed", () => {
                setPanoramaState((prevPano) => {
                  return { ...prevPano, zoom: panorama.getZoom() };
                });
              });

              setPovLoader((p) => {
                return (newPovFunc) => {
                  setPanoramaState((prevPano) => {
                    const newPov = newPovFunc(
                      prevPano.pov.heading,
                      prevPano.pov.pitch
                    );
                    panorama.setPov(newPov);
                    return { ...prevPano, pov: newPov };
                  });
                };
              });

              setZoomLoader((p) => {
                return (newZoomFunc) => {
                  setPanoramaState((prevPano) => {
                    //   console.log("prev:", prevPano.zoom);
                    //   console.log("new:", newZoomFunc(prevPano.zoom));
                    const newZoom = newZoomFunc(prevPano.zoom);
                    console.log(newZoom);
                    //   console.log(newZoom);
                    panorama.setZoom(newZoom);
                    return { ...prevPano, zoom: newZoom };
                  });
                };
              });
            } else {
              console.error("Google Maps API or StreetViewPanorama not loaded");
            }
          });
        }
      });

    // cleanup
    return () => {};
  }, []);

  return [panoRef, panoramaState, setPov, setZoom, objectData];
}

export default usePanorama;
