import { v4 as uuidV4 } from "uuid";
import { Server } from "socket.io";

const io = new Server(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

//TODO:: use namespaces for better readability.

let players = 0;
const maxPlayersInLobby = 3;
let notFullLobbiesIdArr = [];

io.on("connection", socket => {

    socket.on("getAvailableRoomId", () =>{
        let roomId = uuidV4();
        players += 1;

        //TODO:: check race condition.
        if(notFullLobbiesIdArr.length === 0){
            notFullLobbiesIdArr.push(roomId);
        }else if(players > maxPlayersInLobby){
            notFullLobbiesIdArr[0] = roomId;
            players = 1;
        }else{
            roomId = notFullLobbiesIdArr[0];
        }

        socket.emit("foundId", roomId);
    });

    socket.on("joinRoom-req", roomId => {
        socket.join(roomId);
        socket.to(roomId).emit("playerJoinedLobby", "player");
        console.log("id:" + roomId);
    });


    socket.on("labelsNumber-changed", (labelNumber, room) => {
        socket.to(room).emit("labelsNumber-received", labelNumber);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
})


//Uses: https://socket.io/docs/v3/emit-cheatsheet/