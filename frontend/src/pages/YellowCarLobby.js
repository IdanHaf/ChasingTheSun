import React, { useEffect, useState } from 'react';
import PanoramaMap from '../components/PanoramaMap';
import MultiplayerLobby from "./MultiplayerLobby";
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";

//TODO:: fix refresh bug.
function YellowCarLobby(){
    const [socket, setSocket] = useState(null);
    const {id: lobbyId} = useParams();
    const [roomId, setRoomId] = useState("");
    let join = false;

    //Server connection.
    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        setSocket(newSocket);
        setRoomId(lobbyId);

        return () => {
            newSocket.disconnect();
        }
    }, []);

    //Get all the players in the lobby to the same room.
    useEffect(()=>{
        if(socket === null || roomId === "") return;

        if(!join) {
            socket.emit("joinRoom-req", roomId);
            join = true;
        }

    }, [socket, roomId])

    const [players, setPlayers] = useState([]);
    const [startGame, setStartGame] = useState(false);

    useEffect(() => {
        if(socket == null) return;

        socket.on("playerJoinedLobby", (playersNames) => {
            setPlayers(playersNames);
        });

        return () => {
            socket.removeAllListeners("playerJoinedLobby");
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
                />
            </div>
    );
}

export default YellowCarLobby;