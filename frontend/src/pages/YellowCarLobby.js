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
            </div>
    );
}

export default YellowCarLobby;