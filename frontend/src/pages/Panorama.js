import React from 'react';
import usePanorama from '../utility/usePanorama';

/*
 This is a reference page for showing Panorama state in real time
*/
function Panorama() {
    const [panoRef, panoramaState, setPov, setZoom] = usePanorama();
    function handleKeyDown(event) {
        // looking up/down keys
        if (event.key === 'i') {
            // event.preventDefault();
            // event.stopPropagation();
           
          setPov( (oldH, oldpP)=>{return {heading: oldH, pitch: oldpP+3}} )
          
        }
        else if (event.key === 'k') {
            // event.preventDefault();
            // event.stopPropagation();
          setPov( (oldH, oldpP)=>{return {heading: oldH, pitch: oldpP-3}} )
        }
        // zoom keys
        else if (event.key === 'l') {
            // event.preventDefault();
            // event.stopPropagation();
          setZoom( (oldZ)=>{return oldZ+1} )
        }
        else if (event.key === 'j') {
            // event.preventDefault();
            // event.stopPropagation();
            setZoom( (oldZ)=>{return oldZ-1} )
        }
      }
   
      // try adding more panorama windows
  return (
    <div className="container mx-auto mt-10" >
       <h1 className="text-2xl font-semibold mb-4 text-center">Intelligence</h1>
        <div id="floating-panel">
            <table>
                <tbody>
                <tr>
                    <td><b>Position</b></td>
                    <td id="position-cell">{JSON.stringify(panoramaState?.position)}</td>
                </tr>
                <tr>
                    <td><b>POV Heading</b></td>
                    <td id="heading-cell">{panoramaState.pov?.heading}</td>
                </tr>
                <tr>
                    <td><b>POV Pitch</b></td>
                    <td id="pitch-cell">{panoramaState.pov?.pitch}</td>
                </tr>
                <tr>
                    <td><b>Pano ID</b></td>
                    <td id="pano-cell">{panoramaState.id}</td>
                </tr>
                <tr>
                    <td><b>Zoom</b></td>
                    <td id="zoom-cell">{panoramaState.zoom}</td>
                </tr>
                </tbody>
            </table>
        </div>
        {/* <Streetview apiKey="AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o"></Streetview> */}
        
        <div ref={panoRef} onKeyDown={handleKeyDown} if="pano" style={{ height: '400px' }}></div>
        {/* <Map /> */}
    </div>
  );
}

export default Panorama;




