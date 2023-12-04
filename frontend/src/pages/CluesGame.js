import { Clues } from "./Clues";
import { useState } from "react";
function CluesGame() {
  const [gameActive, setGameActive] = useState(false);
  const [closePopUp, setClosePopUp] = useState(false);
  return (
    <div className="h-screen w-full">
      <Clues
        gameActive={gameActive}
        setActive={setGameActive}
        clues={[
          {
            type: "text",
            text: "The object is near a lake. go find it before everyone will die.",
          },
          {
            type: "text",
            text: "Another second object is near a lake. go find it before everyone will die.",
          },
          {
            type: "text",
            text: "Another third object is near a lake. go find it before everyone will die.",
          },
        ]}
      />
      {!closePopUp && (
        <div className="h-full w-full flex justify-center items-center backdrop-blur-sm font-mono">
          <div className="bg-black h-3/4 w-2/3 z-10 text-white border-4 border-green-500 flex flex-col gap-8">
            <p className="text-green-500 text-lg ml-20 mt-10 flex flex-col gap-6">
              <span>Location: New York</span>
              <span>Objective: a suspicious person on a bike...</span>
              <img
                src="person_on_bike.png"
                className="w-40 h-40 -rotate-6 border border-green-500 p-2 ml-40 mt-4 mb-4"
              ></img>
              <span>You have: 5 minutes.</span>
            </p>
            <button
              className="border w-30 place-self-center p-2"
              onClick={() => {
                  setGameActive(true);
                  setClosePopUp(true);
              }}
            >
              Start the game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CluesGame;
