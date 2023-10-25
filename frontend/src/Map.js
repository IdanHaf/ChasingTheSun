import React, { useEffect } from 'react';
import {useRef, useState} from 'react';
import { Loader } from "@googlemaps/js-api-loader"

function usePanorama() {
    const [panoramaState, setPanoramaState] = useState({
        id: null,
        position: null,
        pov: null,
        zoom: null,
    }); 

    const panoRef = useRef(null);
    const API_KEY = "AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o";

    
    const [loaded, setLoaded] = useState(false);
    const [setPov, setPovLoader] = useState((a,b)=>{});
    const [setZoom, setZoomLoader] = useState((a)=>{});
    let panorama = null;

    // useEffect(() => {
    //     // set panoramas properties
    //     if (!panorama) return;
    //     panorama.setPano(panoramaState.id);
    //     panorama.setPosition(panoramaState.position);
    //     panorama.setPov(panoramaState.pov);
    //     panorama.setZoom(panoramaState.zoom);
    // }
    // , [panoramaState]);
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
                    position: { lat: 37.869, lng: -122.255 },
                    pov: {
                        heading: 270,
                        pitch: 0,
                    },
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
        
        return () => {
            // if (panorama) {
            //   panorama.removeListener('pano_changed');
            //   panorama.removeListener('position_changed');
            //   panorama.removeListener('pov_changed');
            //   panorama.removeListener('zoom_changed');
            //   panorama.setVisible(false); // Hide the panorama
            //   panorama = null; // Remove the reference
            // }
          };
    
    }, []);
    
 
function Map() {


    return (
     <div ref={panoRef} if="pano" style={{ height: '400px' }}></div>
    );
}
return [panoRef, panoramaState, setPov, setZoom];
}

export default usePanorama;
