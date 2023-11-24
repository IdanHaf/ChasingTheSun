import React, { useEffect, useState } from 'react';
import {io} from "socket.io-client";
import Labels from "../components/homePage/yellowcar.svg";
import Header from "../components/homePage/Header";
import { useNavigate } from "react-router-dom";

//TODO:: maybe with useNavigate can take props such as socket.

function YellowCarMode(){
    //Server connection.
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io("http://localhost:3001");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, []);


    return (
        (socket !== null) ?
            <div className="bg-gradient-to-r from-amber-300 to-amber-400 font-thin">
                <Header />
                <YellowCarHome
                    socket={socket}
                />
            </div>
            :
            <div>
                Loading...
            </div>
    );
}


function YellowCarHome({socket}) {
    //If being replaced, can use js syntax: window.location.href = ("/yellowCarMode/" + responseId).
    const navigate = useNavigate();

    //Join a valid lobby.
    const handlePlayButton = () => {
        socket.emit("getAvailableRoomId", (responseId) => {
            navigate(("/yellowCarMode/" + responseId));
        });
    }

    return (
        <div id="home" className="flex flex-wrap items-center justify-center h-screen gap-8">
            <img src={Labels} className="-rotate-45 h-60 w-80 transition duration-300 ease-in-out hover:scale-110" />
            <div className="flex flex-col items-center">
                <p className="text-white flex-col flex gap-5 text-xl font-mono h-60  justify-center">
                    <span>We will give you the target.</span>

                    <span>Find as much as possible.</span>

                    <span>You have 5 minutes.</span>
                </p>
                <button
                    className="my-4 w-1/2 p-2 select-none font-semibold text-amber-500 bg-white rounded-full
                                hover:scale-110"
                    onClick={handlePlayButton}
                >
                    Play mode
                </button>
            </div>
        </div>
    );
}

export default YellowCarMode;