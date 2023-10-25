import React from 'react';
import usePanorama from './usePanorama';
import './styles/PanoramaMap.css';

function PanoramaMap() {
    const [panoRef, panoramaState, setPov, setZoom] = usePanorama();
    function handleKeyDown(event) {
        // looking up/down keys
        if (event.key === 'i') {
            event.preventDefault();
            event.stopPropagation();
            setPov( (oldH, oldpP)=>{return {heading: oldH, pitch: oldpP+3}} )

        }
        else if (event.key === 'k') {
            event.preventDefault();
            event.stopPropagation();
            setPov( (oldH, oldpP)=>{return {heading: oldH, pitch: oldpP-3}} )
        }
        // zoom keys
        else if (event.key === 'l') {
            event.preventDefault();
            event.stopPropagation();
            setZoom( (oldZ)=>{return oldZ+1} )
        }
        else if (event.key === 'j') {
            event.preventDefault();
            event.stopPropagation();
            setZoom( (oldZ)=>{return oldZ-1} )
        }
    }

    // try adding more panorama windows
    return (
        <div className="container" >

            <div ref={panoRef} onKeyDown={handleKeyDown} if="pano" style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%' }}></div>
            {/* <Map /> */}
        </div>
    );
}

export default PanoramaMap;




