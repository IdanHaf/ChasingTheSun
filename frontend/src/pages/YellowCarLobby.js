import React, { useEffect, useState } from 'react';
import PanoramaMap from '../components/PanoramaMap';
import MultiplayerLobby from "./MultiplayerLobby";
import {io} from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

function YellowCarLobby(){
    const [socket, setSocket] = useState(null);
    let join = false;

    //Server connection.
    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, []);

    let {id: lobbyId} = useParams();

    //Get all the players in the lobby to the same room.
    useEffect(()=>{
        if(socket === null) return;

        if(!join) {
            socket.emit("joinRoom-req", lobbyId);
            join = true;
        }

    }, [socket, lobbyId])

    const [players, setPlayers] = useState([]);
    const [startGame, setStartGame] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if(socket == null) return;

        socket.on("playerJoinedLobby", (playersNames) => {
            setPlayers(playersNames);
        });

        socket.on("joinNewLobby", (roomId) => {
            navigate(("/yellowCarMode/" + roomId));
        })

        return () => {
            socket.removeAllListeners("playerJoinedLobby");
            socket.removeAllListeners("joinNewLobby");
        }
    }, [socket])

    useEffect(() => {
        //TODO:: switch with predefined maxPlayers.
        if(players.length >= 4){
            setStartGame(true);
        }
    }, [players.length])



    const [ctrlPressed, setCtrlPressed] = useState(false);

    // TODO: prevent many re-renders at ctrl press
    function handleCtrlPressed(isPressed) {
        setCtrlPressed(isPressed);
    }

    const [gameActive, setGameActive] = useState(false);

    const handlePlayButton = () => {
        setGameActive(true);
    }

    return (
        (!startGame) ?
            <MultiplayerLobby
                playersArr={players}
            />
            :
            <div>
                <PanoramaMap
                    mapMode={"yellowCar"}
                    onCtrlPressed={handleCtrlPressed}
                    active={true}
                    socket={socket}
                    roomId={lobbyId}
                />

                {!gameActive && (
                    <StartGamePopUp handlePlayButton={handlePlayButton}/>
                )}
            </div>
    );
}

function StartGamePopUp({handlePlayButton}){
    return (
        <div className="h-full w-full fixed flex justify-center items-center backdrop-blur-sm font-mono">
            <div className="bg-white/80 h-3/4 w-2/3 z-10 p-2 rounded-lg flex flex-col justify-between gap-8
                            border-4 border-green-200">
                <p className="text-black text-lg flex flex-col items-center gap-6">
                    <span>Your goal is to find as many objects as possible!</span>
                    <img
                        src="/person_on_bike.png"
                        className="w-40 h-40 border border-green-500 p-2 my-4"
                    ></img>
                    <span>Ready?</span>
                </p>
                <div className="flex flex-col justify-center items-center gap-2 text-white pb-2">
                    <button
                        className="w-1/4 bg-green-500 p-2 text-center rounded-full
                                    hover:bg-green-700"
                        onClick={handlePlayButton}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    );
}

export default YellowCarLobby;