import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import React from "react";

// props: lat, lng, zoom, circles[(lat,lng,radius,precentage,color?)]

function Map(props) {
  const mapRef = useRef(null);
  // TODO: transfer library calling to index.js
  const API_KEY = ""; //For now - AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o
  // const [clicked, setClicked] = useState(false);
  const loader = new Loader({
    apiKey: API_KEY,
    version: "weekly",
  });
  
  useEffect(() => {
    loader.importLibrary("maps").then(async (mapsLibrary) => {
      if (mapsLibrary && mapRef.current) {
        const { Map, Circle } = mapsLibrary;

        const map = new Map(mapRef.current, {
          center: { lat: props.lat, lng: props.lng },
          zoom: 13,
          visible: true,
          fullscreenControl: false,
          disableDefaultUI: true,
          motionTracking: false,
          motionTrackingControl: false,
          mapId: "8e0a97af9386fef",
        });
        for (let i in props.circles) {
          let circle = props.circles[i];
          new Circle({
            strokeColor: circle.color ?? "red",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: circle.color ?? "red",
            fillOpacity: 0.35,
            map,
            center: { lat: circle.lat, lng: circle.lng },
            radius: circle.radius,
          });
        }

        loader.importLibrary("marker").then(async (markerLibrary) => {
          if (markerLibrary && mapRef.current) {
            let { Marker } = markerLibrary;
            const image = {
              url: "./circle.ico ",
              size: { width: 20, height: 20 },
            };
            for (let i in props.circles) {
              let circle = props.circles[i];
              new Marker({
                map: map,
                position: { lat: circle.lat - 0.002, lng: circle.lng },
                title: "Uluru",
                icon: image,

                label: circle.precentage + "%",
              });
            }
            new Marker({
              map: map,
              position: { lat: props.lat, lng: props.lng },
              title: "Me",
            });
          }
        });
      }
    });
  }, [props.lat, props.lng, props.circles]);

  // const styled_map_url = `https://maps.googleapis.com/maps/api/staticmap?sensor=false&center=${lat},${lng}&zoom=20&size=400x400&markers=color:0x10645C%7Clabel:O%7C${lat},${lng}&maptype=roadmap&style=style=&style=feature%3Awater%7Celement%3Aall%7Ccolor%3A0x2b3638%7C&style=feature%3Aadministrative.country%7Celement%3Ageometry%7Cweight%3A1%7Ccolor%3A0xd5858f%7C&style=feature%3Aadministrative.country%7Celement%3Alabels.text.fill%7Ccolor%3A0x555555%7C&style=feature%3Aadministrative%7Celement%3Ageometry.stroke%7Cvisibility%3Aoff%7C&style=feature%3Aadministrative.country%7Celement%3Aall%7Cvisibility%3Aon%7C&style=feature%3Aroad.highway%7Celement%3Aall%7Csaturation%3A-100%7Clightness%3A40%7Cvisibility%3Asimplified%7C&style=feature%3Aroad.arterial%7Celement%3Aall%7Csaturation%3A-100%7Clightness%3A40%7Cvisibility%3Asimplified%7C&style=feature%3Aroad.local%7Celement%3Aall%7Csaturation%3A-100%7Cvisibility%3Asimplified%7C&style=feature%3Alandscape%7Celement%3Aall%7Chue%3A0xFFFFFF%7Csaturation%3A-100%7Clightness%3A100%7C&style=feature%3Alandscape.natural%7Celement%3Ageometry%7Csaturation%3A-100%7C&style=feature%3Alandscape.man_made%7Celement%3Ageometry.fill%7Cvisibility%3Asimplified%7Csaturation%3A-100%7C&style=feature%3Apoi.park%7Celement%3Ageometry%7Csaturation%3A-100%7Clightness%3A60%7C&style=feature%3Apoi%7Celement%3Ageometry%7Chue%3A0xFFFFFF%7Csaturation%3A-100%7Clightness%3A100%7Cvisibility%3Aoff%7C&key=AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o`;
  // const map_url = `https://maps.googleapis.com/maps/api/staticmap?sensor=false&center=${lat},${lng}&zoom=20&size=400x400&markers=color:0x10645C%7Clabel:O%7C${lat},${lng}&maptype=roadmap&key=AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o`;
  // return <div ref={mapRef} style={{ height: "100vh", width: "100%" }}></div>;

  //TODO: when square button opens, make smaller through transition with border
  return (
    <div className="relative flex items-center gap-6 aspect-[4/3] h-full max-h-52">
      <div className="overflow-hidden w-full h-full">
        <div className="w-full h-full" ref={mapRef}></div>
        {/* <img src={map_url} alt="Map" className="w-56 h-56 opacity-80"></img> */}
        {/* <div className="absolute top-0 w-full h-full group">
          <SquareButtonBorder
            clicked={clicked}
            className={twMerge(
              "w-full h-full [&>*]:border-red-800",
              clicked &&
                "[&>*:nth-child(3)]:border-l-8 [&>*:nth-child(3)]:border-b-8"
            )}
          />
        </div> */}
      </div>
    </div>
  );
}

export default React.memo(Map);
