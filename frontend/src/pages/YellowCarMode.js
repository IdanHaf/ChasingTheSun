import React, { useEffect, useState } from 'react';
import {io} from "socket.io-client";

//TODO:: maybe with useNavigate can take props such as socket.

function YellowCarMode(){
    //Server connection.
    const [roomId, setRoomId] = useState(0);

    useEffect(() => {
        const newSocket = io("http://localhost:3001");

        newSocket.emit("getAvailableRoomId");

        newSocket.on('foundId', (id)=>{
            setRoomId(id);
        });

        return () => {
            newSocket.disconnect();
        }
    }, []);


    return (
        roomId !== 0 ?
            <div>
                <a href={"/yellowCarMode/" + roomId} className="my-4 removeButton w-1/2 p-2
                                           select-none bg-indigo-500 rounded-full hover:bg-sky-700"
                >
                    Play mode
                </a>
            </div>
            :
            <div>
                Loading...
            </div>
    );
}

export default YellowCarMode;