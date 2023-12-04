import PanoramaMap from "../components/PanoramaMap";
import "../styles/Clues.css";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import Map from "../utility/Map";
import { SquareButton } from "../components/SquareButton";
import HoverVideoPlayer from "react-hover-video-player";
import { Clue, AudioClue, FootageClue } from "../components/Clue";
import intelligenceMode from "./IntelligenceMode";
import PartialImage from "../components/PartialImage";

function Clues({ gameActive, setActive, clues }) {
  const [clicked, setClicked] = useState(false);
  const [circles, setCircles] = useState([
    {
      lat: 40.749425,
      lng: -73.980829,
      radius: 1000,
      precentage: 90,
      color: "blue",
    },
    { lat: 40.759425, lng: -73.990829, radius: 300, precentage: 10 },
  ]);

  // all time related stuff here
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (gameActive) {
      // start 5 minutes timer
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [gameActive]);

  useEffect(() => {
    // every 20 seconds, add a clue
    if (time % 20 === 0 && time !== 0) {
      const realHours = 9 + Math.floor(time / 60);
      const realMinutes = time % 60;
      const realTime = `${realHours}:${realMinutes}`;
      gotClueEvent(realTime);
    }
  }, [time]);

  function handleClick() {
    setClicked(!clicked);
  }

  // clue types: text - [clue], audio - [audio], footage - [footage], map - [(lat, lng)], direction - []
  // const [clues, setClues] = useState([
  //   { clue: "clue 1. this is a really important clue", time: "8:22" },
  //   { clue: "clue 2. this is also really important", time: "8:22" },
  // ]);
  const [archivedClues, setArchivedClues] = useState([]);
  const [currentClue, setCurrentClue] = useState(null);

  function gotClueEvent(currentTime) {
    if (clues.length === 0) return;
    const newClue = clues.shift();
    setCurrentClue(newClue);
    setArchivedClues((oldClues) => [
      ...oldClues,
      { ...newClue, time: currentTime },
    ]);
    setClicked(false);

    setTimeout(() => {
      setCurrentClue(false);
    }, 4000);
  }
  const [ctrlPressed, setCtrlPressed] = useState(false);
  // TODO: prevent many re-renders at ctrl press
  function handleCtrlPressed(isPressed) {
    setCtrlPressed(isPressed);
    setClicked(false);
  }
  // useEffect(() => gotClueEvent({ clue: "The object is near a lake. go find it before everyone will die.", time: "8:22" }), []);

  // bug: button can be selected with arrows :(
  // TODO: make fade-in and fade-out effects to clue and cool change effect for partial image
  // TODO: add TAB ctrl
  // get clicked[style] out of jsx? (make it a variable)
  return (
    <div className="absolute h-full w-full top-0 left-0">
      <PanoramaMap
        mapMode={"intelligence"}
        onCtrlPressed={handleCtrlPressed}
        active={gameActive}
        setActive={setActive}
      />
      {gameActive && (
        <PartialImage
          images={[
            "person_on_bike.png",
            "bike-0.png",
            "bike-1.png",
            "bike-2.png",
            "bike-3.png",
          ]}
          className={ctrlPressed && "hidden"}
        />
      )}
      <div className="absolute right-10 flex flex-col justify-start items-center w-96 h-full select-none pointer-events-none [&>*]:pointer-events-auto">
        {time}
        <SquareButton
          className="mt-10 flex-none"
          onClick={currentClue ? () => {} : handleClick}
          clicked={clicked}
        >
          {archivedClues.map((clue, index) => {
            return (
              <Clue
                className="w-80 h-16"
                archive={true}
                key={index}
                clicked={clicked}
                clue={clue}
              />
            );
          })}
          <FootageClue lat={40.759425} lng={-73.980829} />
          <AudioClue
            className="w-80 h-16"
            archive={true}
            clicked={clicked}
            text={
              "The object is near a lake. go find it before everyone will die."
            }
            time={"8:22"}
          />
        </SquareButton>
        <Clue
          clue={currentClue}
          archive={false}
          className="absolute top-40 animate-fade-in"
          clicked={clicked}
        />
        <div
          className={twMerge(
            "flex-1 mb-10 mt-5 flex justify-center items-end ",
            ctrlPressed && "hidden"
          )}
        >
          <Map lat={40.759425} lng={-73.980829} circles={circles} />
        </div>
      </div>
    </div>
  );
}

export { Clues };
