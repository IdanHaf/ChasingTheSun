import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { CluesButtonBorder } from "../pages/Clues";
import { twMerge } from "tailwind-merge";
function useMap() {
  const mapRef = useRef(null);
  const API_KEY = "AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o"; //For now - AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o
  const [loaded, setLoaded] = useState(false);
  // TODO: find a way to combine map styling with MAP-ID and markers
  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
    });
    let map;
    loader.importLibrary("maps").then(async (mapsLibrary) => {
      if (mapsLibrary && mapRef.current) {
        const { Map } = mapsLibrary;
        map = new Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
          visible: true,
          fullscreenControl: false,
          disableDefaultUI: true,
          motionTracking: false,
          motionTrackingControl: false,
          mapId: "8e0a97af9386fef",
          styles: [
            {
              featureType: "all",
              elementType: "all",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "all",
              elementType: "labels",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  saturation: "-100",
                },
              ],
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [
                {
                  saturation: 36,
                },
                {
                  color: "#000000",
                },
                {
                  lightness: 40,
                },
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  visibility: "off",
                },
                {
                  color: "#000000",
                },
                {
                  lightness: 16,
                },
              ],
            },
            {
              featureType: "all",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 20,
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 17,
                },
                {
                  weight: 1.2,
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 20,
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#4d6059",
                },
              ],
            },
            {
              featureType: "landscape",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#4d6059",
                },
              ],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#4d6059",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  lightness: 21,
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#4d6059",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#4d6059",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  visibility: "on",
                },
                {
                  color: "#7f8d89",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#7f8d89",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#7f8d89",
                },
                {
                  lightness: 17,
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#7f8d89",
                },
                {
                  lightness: 29,
                },
                {
                  weight: 0.2,
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 18,
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#7f8d89",
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#7f8d89",
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 16,
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#7f8d89",
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#7f8d89",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  lightness: 19,
                },
              ],
            },
            {
              featureType: "water",
              elementType: "all",
              stylers: [
                {
                  color: "#2b3638",
                },
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#2b3638",
                },
                {
                  lightness: 17,
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#24282b",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#24282b",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
          ],
        });

        loader.importLibrary("marker").then(async (markerLibrary) => {
          if (markerLibrary && mapRef.current) {
            let { AdvancedMarkerElement } = markerLibrary;
            const marker = new AdvancedMarkerElement({
              map: map,
              position: { lat: -34.397, lng: 150.644 },
              title: "Uluru",
            });
          }
        });
      }
    });
  }, []);

  return mapRef;
}

function Map(props) {
  // const mapRef = useMap();
  const [clicked, setClicked] = useState(false);
  const [lat, lng] = [
    props.lat ?? 40.75986013487,
    props.lng ?? -73.980449311431,
  ];

  const styled_map_url = `https://maps.googleapis.com/maps/api/staticmap?sensor=false&center=${lat},${lng}&zoom=20&size=400x400&markers=color:0x10645C%7Clabel:O%7C${lat},${lng}&maptype=roadmap&style=style=&style=feature%3Awater%7Celement%3Aall%7Ccolor%3A0x2b3638%7C&style=feature%3Aadministrative.country%7Celement%3Ageometry%7Cweight%3A1%7Ccolor%3A0xd5858f%7C&style=feature%3Aadministrative.country%7Celement%3Alabels.text.fill%7Ccolor%3A0x555555%7C&style=feature%3Aadministrative%7Celement%3Ageometry.stroke%7Cvisibility%3Aoff%7C&style=feature%3Aadministrative.country%7Celement%3Aall%7Cvisibility%3Aon%7C&style=feature%3Aroad.highway%7Celement%3Aall%7Csaturation%3A-100%7Clightness%3A40%7Cvisibility%3Asimplified%7C&style=feature%3Aroad.arterial%7Celement%3Aall%7Csaturation%3A-100%7Clightness%3A40%7Cvisibility%3Asimplified%7C&style=feature%3Aroad.local%7Celement%3Aall%7Csaturation%3A-100%7Cvisibility%3Asimplified%7C&style=feature%3Alandscape%7Celement%3Aall%7Chue%3A0xFFFFFF%7Csaturation%3A-100%7Clightness%3A100%7C&style=feature%3Alandscape.natural%7Celement%3Ageometry%7Csaturation%3A-100%7C&style=feature%3Alandscape.man_made%7Celement%3Ageometry.fill%7Cvisibility%3Asimplified%7Csaturation%3A-100%7C&style=feature%3Apoi.park%7Celement%3Ageometry%7Csaturation%3A-100%7Clightness%3A60%7C&style=feature%3Apoi%7Celement%3Ageometry%7Chue%3A0xFFFFFF%7Csaturation%3A-100%7Clightness%3A100%7Cvisibility%3Aoff%7C&key=AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o`;
  const map_url = `https://maps.googleapis.com/maps/api/staticmap?sensor=false&center=${lat},${lng}&zoom=20&size=400x400&markers=color:0x10645C%7Clabel:O%7C${lat},${lng}&maptype=roadmap&key=AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o`;
  // return <div ref={mapRef} style={{ height: "100vh", width: "100%" }}></div>;
  return (
    <div className="absolute top-52 overflow-hidden w-52 h-52">
      <img src={map_url} alt="Map" className="w-56 h-56 pacity-80"></img>
      <div className="absolute top-0 group">
        <CluesButtonBorder
          clicked={false}
          className={twMerge(
            "w-52 h-52 [&>*]:border-red-800",
            clicked &&
              "[&>*:nth-child(3)]:border-l-8 [&>*:nth-child(3)]:border-b-8"
          )}
        />
      </div>
    </div>
  );
}
export { useMap, Map };
