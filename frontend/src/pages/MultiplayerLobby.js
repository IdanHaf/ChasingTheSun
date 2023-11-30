import React, { useEffect, useState } from 'react';

function MultiplayerLobby(props){
    const [arr, setArr] = useState([]);

    useEffect(()=>{
        let players = Array(4).fill("waiting");

        for(let i = 0; i < props.playersArr.length; i++){
            players[i] = props.playersArr[i];
        }

        setArr(players);
    }, [props.playersArr])

    return (
        <div className="w-full h-full bg-gradient-to-b from-sky-800 to-sky-950">
            <div className="flex flex-col items-center h-screen text-center text-white">
                <div className="flex items-center h-1/4 font-mono text-2xl">
                    <h1>YELLOW CAR - MULTIPLAYER</h1>
                </div>
                <div className="flex flex-row flex-wrap items-center justify-center gap-x-8 h-1/2 w-full">
                    {
                        arr.map((playerName, index) =>
                        (
                            <div key={index} className={`${
                                (playerName === "waiting") ? "bg-black/30" : "bg-green-400/30"
                                } h-1/2 p-10 bg-black/30 rounded-lg`}>
                                {playerName}
                            </div>
                        ))
                    }
                </div>
                <div className="flex items-center h-1/4 font-mono">
                    waiting for {4 - props.playersArr.length} players to join.
                </div>
            </div>
        </div>
    );
}

export default MultiplayerLobby;

