import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import HoverVideoPlayer from "react-hover-video-player";

function Clue(props) {
  return (
    <div
      className={twMerge(
        "font-mono shadow-md select-none",
        !props.archive && "hover:opacity-80 hover:-translate-y-1",
        props.className,    
        "w-80 h-16"
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
        <div className="text-xs text-gray-200 cursor-default ">
          {props.time}
        </div>
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
      <Clue
        className="w-80 h-16"
        key={0}
        time={"9:33"}
        clue={"The object is here"}
        archive={true}
      />
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
  const [audio] = useState(new Audio("concert-audio.mp3"));
  const hoverVideoRef = useRef(null);

  useEffect(() => {
    audio.addEventListener("ended", () => {
      const videoElement = hoverVideoRef.current;
      console.log("ended");
      videoElement.currentTime = 0;
      audio.currentTime = 0;
      audio.play();
    });
    audio.currentTime = 0;
    return () => {
      audio.removeEventListener("ended", () => {});
    };
  }, []);

  // pause audio when clicked away
  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
  }, [props.clicked]);

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
          <div className="flex">
            <p className="text-xs text-yellow-300 cursor-default w-11/12">
              New transmition recived from the area of the Manaquin
            </p>
            <div className="text-xs text-gray-200 cursor-default place-self-start">
              {props.time}
            </div>
          </div>
          <div className="">
            <HoverVideoPlayer
              key={props.clicked}
              videoSrc="waveform.mp4"
              // restartOnPaused={true}
              videoRef={hoverVideoRef}
              onHoverStart={() => {
                console.log("hovered");
                audio.play();
                const videoElement = hoverVideoRef.current;
                // play the video
                videoElement.play();
              }}
              onHoverEnd={() => {
                console.log("unhovered");
                audio.pause();
                audio.currentTime = 0;
                const videoElement = hoverVideoRef.current;
                // pause the video
                videoElement.pause();
              }}
              pausedOverlay={
                <img
                  src="waveform.png"
                  alt=""
                  style={{
                    // Make the image expand to cover the video's dimensions
                    width: "100%",
                    height: "83.5%",
                    objectFit: "cover",
                  }}
                />
              }
            />
          </div>
          <p className="text-xs text-yellow-300 cursor-default w-11/12">
            See if you can gather any information from it...
          </p>
        </div>
      </div>
    </div>
  );
}

export { Clue, FootageClue, AudioClue };
