import { useEffect } from 'react';
import {useRef, useState} from 'react';
import { Loader } from "@googlemaps/js-api-loader"

/*

    The "usePanorama" React hook allows you to show a Google Street View panorama in your React app.
    It accepts the start Id, position, pov, and zoom as parameters, 
    and returns: 
        - panoRef: a ref to the div where the panorama will be shown
        - panoramaState: an object containing the current panorama's id, position, pov, and zoom
        - setPov: a setState function for the pov, which takes a lambda function
        - setZoom: a setState function for the zoom, which takes a lambda function

*/

function usePanorama(startId="", startPosition={ lat: 37.869, lng: -122.255 }, startPov={heading: 270, pitch: 0}, startZoom=1) {
    const [panoramaState, setPanoramaState] = useState({
        id: startId,
        position: startPosition,
        pov: startPov,
        zoom: startZoom,
    }); 

    const panoRef = useRef(null);
    const API_KEY = "";//For now - AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o

    
    const [loaded, setLoaded] = useState(false);
    const [setPov, setPovLoader] = useState((a,b)=>{});
    const [setZoom, setZoomLoader] = useState((a)=>{});
    // let panorama = null;

    useEffect(() => {
        if (loaded) return;
            setLoaded(true);
        const loader = new Loader({
            apiKey: API_KEY,
            version: "weekly",
          });
    
        
        loader.importLibrary("streetView").then(async (streetViewLibrary) => {
            
            if (streetViewLibrary && panoRef.current) {
                
                const {StreetViewPanorama} = streetViewLibrary;
                console.log("everything's loaded, let's go");
                const panorama = new StreetViewPanorama(panoRef.current, {
                    position: startPosition,
                    pov: startPov,
                    visible: true,
                    fullscreenControl: false,
                    disableDefaultUI: true,
                    motionTracking: false,
                    motionTrackingControl: false,
                });
                
                panorama.addListener("pano_changed", () => {
                    setPanoramaState((prevPano) => { return {...prevPano, id: panorama.getPano()}});
                });
                panorama.addListener("position_changed", () => {
                    setPanoramaState((prevPano) => { return {...prevPano, position: panorama.getPosition()}});
                });
                panorama.addListener("pov_changed", () => {
                    setPanoramaState((prevPano) => { return {...prevPano, pov: panorama.getPov()}});
                });
                panorama.addListener("zoom_changed", () => {
                    setPanoramaState((prevPano) => { return {...prevPano, zoom: panorama.getZoom()}});
                });

                setPovLoader((p) => 
                {
                    return (newPovFunc) => {
                    
                    setPanoramaState((prevPano) => { 
                        const newPov = newPovFunc(prevPano.pov.heading, prevPano.pov.pitch);
                        panorama.setPov(newPov);
                        return {...prevPano, pov: newPov};
                    } );
                    }
                }
                )

                setZoomLoader((p) => 
                {
                    return (newZoomFunc) => {
                    
                    setPanoramaState((prevPano) => { 
                        const newZoom = newZoomFunc(prevPano.zoom);
                        panorama.setZoom(newZoom);
                        return {...prevPano, zoom: newZoom};
                    } );
                    }
                }
                )

                
                // setPovLoader((p) => 1);
    
               
    
            } else {
                console.error('Google Maps API or StreetViewPanorama not loaded');
            }
        });
        
        // cleanup
        return () => {};
    
    }, []);
    

return [panoRef, panoramaState, setPov, setZoom];
}

export default usePanorama;
