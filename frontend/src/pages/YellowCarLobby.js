import React, { useEffect, useState } from 'react';
import PanoramaMap from '../components/PanoramaMap';
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";


function YellowCarLobby(){
    const [socket, setSocket] = useState(null);
    const {id: lobbyId} = useParams();
    const [roomId, setRoomId] = useState("");
    let join = false;

    //Server connection - get all the players in the lobby to the same room.
    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        setSocket(newSocket);
        setRoomId(lobbyId);

        return () => {
            newSocket.disconnect();
        }
    }, []);

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
        console.log("playerJoined:");
        socket.on("playerJoinedLobby", (playerName) => {

            setPlayers((prevState) => [...prevState, playerName]);
        });

        // return () => {
        //     socket.removeAllListeners("playerJoinedLobby");
        // }
    }, [socket])

    useEffect(() => {
        //TODO:: switch with predefined maxPlayers.
        if(players.length >= 2){
            setStartGame(true);
        }
    }, [players.length])

    return (
        !startGame ?
            <div> Loading... {players.length === 0 ? "yes" : "no"} </div>
            :
        <div>
            <PanoramaMap
                mapMode={"yellowCar"}
            />
        </div>
    );
}

export default YellowCarLobby;