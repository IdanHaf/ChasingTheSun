import PanoramaMap from "../components/PanoramaMap";
import "../styles/Clues.css";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Map } from "../utility/Map";
import { SquareButton } from "../components/SquareButton";
import HoverVideoPlayer from "react-hover-video-player";
import { Clue, AudioClue, FootageClue } from "../components/Clue";

function LoadingBar(props) {
  return (
    <div className={twMerge("border border-white/20", props.className)}>
      <div
        className="bg-green-700/50 h-full"
        style={{ width: `${props.precentage}%` }}
      ></div>
    </div>
  );
}

function PartialImage(props) {
  const images = props.images;
  const [imgIndex, setImgIndex] = useState(0);
  // increase precentage until next index
  const [precentage, setPrecentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imgIndex >= images.length) {
        console.log("clear");
        clearInterval(interval);
        return;
      } else {
        setPrecentage((precentage) => {
          if (precentage >= 100) {
            setImgIndex((ind) => ind + 1);
            return 0;
          }
          return precentage + 1;
        });
      }
    }, 200);
    return () => clearInterval(interval);
  }, [imgIndex]);
  // useEffect(() => {
  //   if(imgIndex >= images.length) return;
  //   const timer = setTimeout(() => {
  //     setImgIndex((imgIndex + 1) % images.length);
  //     console.log(images[imgIndex])
  //   }, 20000);
  //   return () => clearTimeout(timer);
  // }, [imgIndex]);
  return (
    <div className="absolute left-20 top-10 flex flex-col justify-center items-center gap-1 w-48 h-48 group">
      {imgIndex < images.length ? (
        <>
          <div className="flex flex-col justify-center opacity-80 items-center w-40 h-40 select-none border backdrop-blur-sm group-hover:w-48 group-hover:h-48 transition-all">
            <img
              src={images[imgIndex]}
              className="h-36 w-36 bg-black group-hover:h-40 group-hover:w-40 transition-all contrast-[.8]"
            />
            {/* <div className="bg-red-500 h-4 w-4"></div> */}
          </div>
          <LoadingBar
            className="w-40 h-2 group-hover:w-48 transition-all"
            precentage={precentage}
          />{" "}
        </>
      ) : (
        <div className="flex flex-col justify-center opacity-80 items-center w-32 h-32 select-none border backdrop-blur-sm transition-all"></div>
      )}
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
      <PartialImage
        images={[
          "person_on_bike.png",
          "bike-0.png",
          "bike-1.png",
          "bike-2.png",
          "bike-3.png",
        ]}
      />
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
          <AudioClue
            className="w-80 h-16"
            archive={true}
            clicked={clicked}
            clue={
              "The object is near a lake. go find it before everyone will die."
            }
            time={"8:22"}
          />
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
