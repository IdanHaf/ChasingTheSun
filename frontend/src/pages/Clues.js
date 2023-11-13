import PanoramaMap from "../components/PanoramaMap";
import "../styles/Clues.css";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Map } from "../utility/useMap";

function Clue(props) {
  return (
    <div
      className={twMerge(
        "w-80 h-16 font-mono shadow-md select-none",
        !props.archive &&
          "absolute top-40 opacity-60 hover:opacity-80 hover:-translate-y-1"
      )}
    >
      <div className="bg-green-gray-700 h-3 flex justify-end">
        <div className="bg-green-gray-600 h-3 w-3 text-xs text-center">X</div>
      </div>
      <div className="border border-slate-700 bg-black px-2 flex gap-2 items-center">
        <div>
          <p className="text-xs text-yellow-300 cursor-default">
            New location info!
          </p>
          <p className="text-sm text-white cursor-default">{props.clue}</p>
        </div>
        <div className="text-xs text-gray-200 cursor-default">{props.time}</div>
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
      <PanoramaMap isManager={false}/>
      <div className="absolute right-10 top-10 flex justify-center items-start h-16 w-96 select-none">
        <CluesButton
          onClick={currentClue ? () => {} : handleClick}
          clicked={clicked}
        >
          {clues.map((clue, index) => {
            return (
              <Clue
                archive={true}
                key={index}
                time={clue.time}
                clue={clue.clue}
              />
            );
          })}
          <Map lat={40.78} lng={-73.9806} />
        </CluesButton>
        {currentClue ? (
          <Clue
            archive={false}
            className="animate-fade-in"
            time={currentClue.time}
            clue={currentClue.clue}
          />
        ) : null}
      </div>
    </div>
  );
}

function CluesButtonBorder(props) {
  return (
    <div
      className={twMerge(
        "transition-all delay-150 ease-in-out grid grid-cols-2",
        props.className
      )}
    >
      <div
        className={twMerge(
          "col-span-1 transition-all delay-150 duration-300 ease-in-out border-4 border-b-0 border-r-0",
          props.clicked
            ? "border-green-900 h-4 w-12"
            : "border-green-600 h-2 w-3"
        )}
      />
      <div
        className={twMerge(
          "col-span-1 justify-self-end transition-all delay-150 duration-300 ease-in-out border-4 border-b-0 border-l-0",
          props.clicked
            ? "border-green-900 h-8 w-6"
            : "border-green-600 h-2 w-3"
        )}
      />
      <div
        className={twMerge(
          "col-span-1 self-end transition-all delay-150 duration-300 ease-in-out border-4 border-t-0 border-r-0",
          props.clicked
            ? "border-green-900 h-4 w-8"
            : "border-green-600 h-2 w-3"
        )}
      />
      <div
        className={twMerge(
          "col-span-1 place-self-end transition-all delay-150 duration-300 ease-in-out border-4 border-t-0 border-l-0",
          props.clicked
            ? "border-green-900 h-4 w-6"
            : "border-green-600 h-2 w-3"
        )}
      />
    </div>
  );
}

function CluesButton(props) {
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        "flex relative justify-center items-start opacity-60 group",
        props.clicked && "opacity-80 backdrop-blur-sm bg-white/10"
      )}
    >
      <CluesButtonBorder
        clicked={props.clicked}
        className={twMerge(
          "w-14 h-10",
          props.clicked ? "w-96 h-96" : "group-hover:w-20"
        )}
      />
      <div
        className={twMerge(
          "absolute h-[90%] top-5 right-0.5 w-full flex justify-start items-center gap-5 flex-col py-10 animate-fade-in overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent",
          !props.clicked && "hidden"
        )}
      >
        {props.children}
      </div>
    </button>
  );
}

export { Clues, CluesButtonBorder };
