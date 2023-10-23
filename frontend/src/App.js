
import React, { useState } from 'react';
import './App.css';
import Counter from './Counter';
// import { withScriptjs, withGoogleMap, StreetViewPanorama, GoogleMap } from "react-google-maps";
import { GoogleMap, StreetViewPanorama } from "react-google-maps";
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';
import {useLoadScript} from '@react-google-maps/api';
import { LoadScript } from "@react-google-maps/api";
const MyMap = withScriptjs(withGoogleMap((props) => {
  <GoogleMap/>;
//   // Define the container style for the Google Map
//   mapContainerStyle={{
//     width: '100%',
//     height: '400px',
//   }}
//   // center={center} // Set the center of the map
//   zoom={10} // Set the initial zoom level
// >
//   <StreetViewPanorama
//     id="street-view"
//     // Define the container style for the Street View Panorama
//     mapContainerStyle={{
//       width: '100%',
//       height: '400px', // Adjust this to your desired height
//     }}
//     // position={center} // Set the position of the Street View panorama
//     visible={true} // Make the Street View panorama visible
//   />
// </GoogleMap>
}
));

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
}
const center = {
  lat: 31.968599,
  lng: -99.901810,
}
const lib = ["places"];
const key = "AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o"; // PUT GMAP API KEY HERE
function App() {
    const{isLoaded, loadError} = useLoadScript({
      // Uncomment the line below and add your API key
      googleMapsApiKey: 'AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o',
  });

if (loadError) return "Error loading Maps";
if (!isLoaded) return "Loading Maps";
    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-4 text-center">React Basics</h1>

            <div className="absolute w-3/4 h-3/4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1697820801337!6m8!1m7!1se2U9Q_eyUlOIqrt9byrCfA!2m2!1d40.75403943954401!2d-73.99197153053622!3f324.1710339446496!4f21.36979247343878!5f1.22634496099663"
                    title="Embedded Content from Example.com" width="100%" height="100%" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>

            <Counter/>
            
            {/* <MyMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            /> */}
            {/* <LoadScript googleMapsApiKey={key} libraries={lib}>
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={11} 
        center={center} 
        />
        </LoadScript> */}
        </div>
    );
}

export default App;
