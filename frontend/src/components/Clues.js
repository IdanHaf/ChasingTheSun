import PanoramaMap from "./PanoramaMap";
import "../styles/Clues.css"
import { useEffect, useState } from "react";

function Clue(props) {
    // absolute right-14 top-40 
    return (
        <div className={"w-80 h-16 font-mono shadow-md select-none "+(props.archive ? "": "absolute top-40 opacity-60 hover:opacity-80 hover:-translate-y-1")}>
            <div className="bg-[rgba(50,70,69,1)] h-3 flex justify-end"><div className="bg-[rgba(58,91,94,1)] h-3 w-3 text-xs text-center">X</div></div>
            <div className="border border-slate-700 bg-black px-2 flex gap-2 items-center">
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 192 512"><path d="M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"/></svg> */}
                <div>
                    <p className="text-xs text-yellow-300 cursor-default">
                        New location info!
                    </p>
                    <p className="text-sm text-white cursor-default">
                        {props.clue}
                    </p>
                </div>
                <div className="text-xs text-gray-200 cursor-default">
                    {props.time}
                </div>
            </div>
        </div>
    )
}

function AudioClue(props) {
    return (
        <div className="absolute right-14 top-40 border border-slate-700 bg-black opacity-60 hover:opacity-80 hover:-translate-y-1 rounded-xl px-2 w-80 h-16 flex gap-2 items-center font-mono shadow-md">
            <div>
                <p className="text-xs text-yellow-300 cursor-default">
                    New location info!
                </p>
                <img src="../../public/audio.png" alt="audio" className="w-4 h-4" />
                <p className="text-sm text-white cursor-default">
                    {props.clue}
                </p>
            </div>
            <div className="text-xs text-gray-200 cursor-default">
                8:22
            </div>
        </div>
    )
}

function Clues() {
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(!clicked);
    }

    const [clues, setClues] = useState([{ clue: "clue 1. this is a really important clue", time: "8:22" }, { clue: "clue 2. this is also really important", time: "8:22" }]);
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
    return (
        <div>
            <PanoramaMap />
            <div className="absolute right-14 top-10 flex justify-center items-start h-16 w-96 select-none">
                <button onClick={currentClue ? ()=>{} : handleClick} className={"flex relative justify-center items-start opacity-60 group "+(clicked?"opacity-80":"")}>
                    <div className={"transition-all delay-150 ease-in-out grid grid-cols-3 gap-x-2 gap-y-4 "
                        + (clicked ? "gap-x-40 gap-y-96" : "group-hover:gap-x-4")}>
                        <div className={"col-span-2 transition-all delay-150 duration-300 ease-in-out border-4 border-b-0 border-r-0 "
                            + (clicked ? "border-green-900 h-4 w-12" : "border-green-600 h-2 w-3")} />
                        <div className={"col-span-1 transition-all delay-150 duration-300 ease-in-out border-4 border-b-0 border-l-0  "
                            + (clicked ? "border-green-900 h-8 w-6" : "border-green-600 h-2 w-3")} />
                        <div className={"col-span-2 transition-all delay-150 duration-300 ease-in-out border-4 border-t-0 border-r-0 "
                            + (clicked ? "border-green-900 h-4 w-8" : "border-green-600 h-2 w-3")} />
                        <div className={"col-span-1 transition-all delay-150 duration-300 ease-in-out border-4 border-t-0 border-l-0 "
                            + (clicked ? "border-green-900 h-4 w-6" : "border-green-600 h-2 w-3")} />
                    </div>
                    <div className={"absolute h-[90%] top-5 right-0.5 w-full flex justify-start items-center gap-5 flex-col py-10 animate-fade-in overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent "+(clicked?"":"hidden")}>
                    {clues.map((clue, index) => {
                        return <Clue archive={true} key={index} time={clue.time} clue={clue.clue} />})
                    }    
                    </div>
                </button>
            {currentClue ? <Clue archive={false} className="animate-fade-in" time={currentClue.time} clue={currentClue.clue} /> : null}
            </div>
            
        </div>
    )
}

export default Clues