import PanoramaMap from "../components/PanoramaMap";
import "../styles/Clues.css";
import { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Map } from "../utility/useMap";
import { SquareButton } from "../components/SquareButton";

function Clue(props) {
  return (
    <div
      className={twMerge(
        "font-mono shadow-md select-none",
        !props.archive && "hover:opacity-80 hover:-translate-y-1",
        props.className
      )}
    >
      <div className="bg-green-gray-700 h-3 flex justify-end">
        <div className="bg-green-gray-600 h-3 w-3 text-xs text-center">X</div>
      </div>
      <div className="border border-slate-700 bg-black px-2 py-1 flex justify-center items-center">
        <div className="flex-1">
          <p className="text-xs text-yellow-300 cursor-default">
            New location info!
          </p>
          <p className="text-sm text-white cursor-default">{props.clue}</p>
        </div>
        <div className="text-xs text-gray-200 cursor-default ">{props.time}</div>
      </div>
    </div>
  );
}

function FootageClue(props) {
  // const [lat, lng] = [
  // props.lat ?? 40.75986013487,
  // props.lng ?? -73.980449311431,
  // ];
  const map_url = `https://maps.googleapis.com/maps/api/staticmap?sensor=false&center=${props.lat},${props.lng}&zoom=20&size=480x400&maptype=satellite&key=AIzaSyD4J0LPRji3WKllVxLji7YDbd5LSt6HA7o`;

  return (
    <div>
      <Clue className="w-80 h-16" key={0} time={"9:33"} clue={"The object is here"} archive={true} />
      <div className="border border-slate-700">
        <div className="font-mono bg-black px-2 flex items-center w-80">
          <div className="h-8 align-middle items-center flex">
            <p className="text-sm text-white cursor-default">
              Here is what we found
            </p>
          </div>
        </div>
        <div className="relative select-none shadow-md ">
          <img
            src={map_url}
            alt="Map"
            className="w-80 h-60 grayscale brightness-150"
          ></img>
          <div className="absolute h-40 w-40 top-10 left-10 rounded-full bg-blue-300/20 border-white border-4"></div>
          <div className="bg-red-800 h-4 absolute w-full bottom-0"></div>
        </div>
      </div>
    </div>
  );
}

function AudioClue(props) {
  return (
    <div className="absolute right-10 top-40 border border-slate-700 bg-black opacity-60 hover:opacity-80 hover:-translate-y-1 rounded-xl px-2 w-80 h-16 flex gap-2 items-center font-mono shadow-md">
      <div>
        <p className="text-xs text-yellow-300 cursor-default">
          New location info!
        </p>
        <img src="../../public/audio.png" alt="audio" className="w-4 h-4" />
        <p className="text-sm text-white cursor-default">{props.clue}</p>
      </div>
      <div className="text-xs text-gray-200 cursor-default">8:22</div>]
    </div>
  );
}

function Clues() {
  const [clicked, setClicked] = useState(false);
  const cluesDivRef = useRef(null);
  function handleClick() {
    setClicked(!clicked);
  }

  const [clues, setClues] = useState([
    { clue: "clue 1. this is a really important clue", time: "8:22" },
    { clue: "clue 2. this is also really important", time: "8:22" },
  ]);
  const [currentClue, setCurrentClue] = useState(null);
  function gotClueEvent(clue) {
    setCurrentClue(clue);
    setClicked(false);
    setClues((clues) => [...clues, clue]);
    const timer = setTimeout(() => {
      setCurrentClue(false);
    }, 4000);
  }

  // useEffect(() => gotClueEvent({ clue: "The object is near a lake. go find it before everyone will die.", time: "8:22" }), []);

  // bug: button can be selected with arrows :(
  // TODO: make fade-in and fade-out effects
  // TODO: add TAB
  // get clicked[style] out of jsx? (make it a variable)
  return (
    <div>
      <PanoramaMap isManager={false} />
      <div className="absolute right-10 flex flex-col justify-start items-center w-96 h-full select-none">
        <SquareButton
          className="mt-10 flex-none"
          onClick={currentClue ? () => {} : handleClick}
          clicked={clicked}
        >
          {clues.map((clue, index) => {
            return (
              <Clue
                className="w-80 h-16"
                archive={true}
                key={index}
                time={clue.time}
                clue={clue.clue}
              />
            );
          })}
          <FootageClue lat={40.759425} lng={-73.980829} />
        </SquareButton>
        {currentClue ? (
          <Clue
            archive={false}
            className="absolute top-40 opacity-60 animate-fade-in"
            time={"currentClue.time"}
            clue={"currentClue.clue"}
          />
        ) : null}
        <div className="flex-1 mb-10 mt-5 flex justify-center items-end">
          <Map
            lat={40.759425}
            lng={-73.980829}
            circles={[
              {
                lat: 40.749425,
                lng: -73.980829,
                radius: 1000,
                precentage: 90,
                color: "blue",
              },
              { lat: 40.759425, lng: -73.990829, radius: 300, precentage: 10 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export { Clues };
