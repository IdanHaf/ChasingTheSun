import PanoramaMap from "./PanoramaMap";

function Clue(props) {
    return (
        <div className="absolute right-14 top-40 w-80 h-16 opacity-60 hover:opacity-80 hover:-translate-y-1 font-mono shadow-md select-none">
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
            8:22
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
    return (
        <div>
            <PanoramaMap />
            <div className="absolute right-14 top-10 w-80 h-[90%] flex justify-center items-start">
            <button className="flex justify-center items-center opacity-60 select-none  group">
                <div className="absolute">***</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 group-hover:gap-x-8 group-hover:gap-y-8">
                <div className="border-2 border-black border-b-0 border-r-0 h-2 w-3 group-hover:border-green-600"/>
                <div className="border-2 border-black border-b-0 border-l-0 h-2 w-3 group-hover:border-green-600"/>
                <div className="border-2 border-black border-t-0 border-r-0 h-2 w-3 group-hover:border-green-600"/>
                <div className="border-2 border-black border-t-0 border-l-0 h-2 w-3 group-hover:border-green-600"/>
            </div>
            </button>
            </div>
            <Clue clue="The object is near a lake. go find it before everyone will die." />
        </div>
    )
}

export default Clues