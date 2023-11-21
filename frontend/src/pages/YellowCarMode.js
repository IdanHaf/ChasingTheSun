import React, { useEffect, useState } from 'react';
import {io} from "socket.io-client";
import Labels from "../components/homePage/yellowcar.svg";

//TODO:: maybe with useNavigate can take props such as socket.

function YellowCarMode(){
    //Server connection.
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        const newSocket = io("http://localhost:3001");

        //TODO:: different useEffect.
        newSocket.emit("getAvailableRoomId", (responseId) => {
            setRoomId(responseId);
        });

        return () => {
            newSocket.disconnect();
        }
    }, []);


    return (
        (roomId !== 0) ?
            <div className="bg-gradient-to-r from-amber-200 to-amber-400 font-thin">
                <YellowCarHome room={roomId}/>
            </div>
            :
            <div>
                Loading...
            </div>
    );
}


function YellowCarHome(props) {
    return (
        <div id="home" className="flex items-center justify-center h-screen gap-8">
            <img src={Labels} className="-rotate-45 h-60 w-80 transition duration-300 ease-in-out hover:scale-110" />
            <div className="flex flex-col items-center">
                <p className="text-white flex-col flex gap-5 text-xl font-mono h-60  justify-center">
                    <span>We will give you the target.</span>

                    <span>Find as much as possible.</span>

                    <span>You have 5 minutes.</span>
                </p>
                <a className="bg-[#10645C] text-[#FBE5D6] p-2 rounded-lg font-semibold mr-8 hover:-translate-y-1"
                   href={"/yellowCarMode/" + props.room}
                >
                    Play mode
                </a>
            </div>
        </div>
    );
}

export default YellowCarMode;