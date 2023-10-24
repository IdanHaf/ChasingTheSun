import React from 'react';
import usePanorama from './Map';

function App() {
    const [panoRef, panoramaState, setPov] = usePanorama();
    // console.log(panoramaState.pov)
    // setPanoramaState((prevPano) => { return {...prevPano, id: "ChIJN1t_tDeuEmsRUsoyG83frY4"}});
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">React Basics</h1>
        <div id="pano"></div>
        <button className="w-5 h-5 bg-black" onClick={()=>{
            setPov( (oldH, oldpP)=>{return {heading: oldH+1, pitch: oldpP+1}} )
        }}></button>
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
        
        <div ref={panoRef} if="pano" style={{ height: '400px' }}></div>
        {/* <Map /> */}
    </div>
  );
}

export default App;




