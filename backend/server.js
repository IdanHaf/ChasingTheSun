import { Server } from "socket.io";
import {v4 as uuidV4} from "uuid";


const io = new Server(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

//TODO:: use namespaces for better readability.

let lobbies = new Map(); // LobbyId -> PlayersNamesArr.
const maxPlayersInLobby = 4;


const getAvailableLobbyId = () =>{
    let roomId = uuidV4();

    for (let [id, playersInLobby] of lobbies) {
        if(playersInLobby.length < maxPlayersInLobby){
            roomId = id;
            break;
        }
    }


    if(!lobbies.has(roomId)){
        lobbies.set(roomId, []);
    }

    return roomId;
}

io.on("connection", socket => {

    //TODO:: change and add a check for race condition.
    socket.on("getAvailableRoomId", (callback) =>{
        let roomId = getAvailableLobbyId();
        callback(roomId);
    });

    socket.on("joinRoom-req", roomId => {
        if(lobbies.has(roomId)) {
            let playersInRoom = lobbies.get(roomId);

            playersInRoom.push(("player" + playersInRoom.length));
            lobbies.set(roomId, playersInRoom);// Can remove.

            if(playersInRoom.length >= maxPlayersInLobby){
                lobbies.delete(roomId);
            }

            socket.join(roomId);
            io.to(roomId).emit("playerJoinedLobby", playersInRoom);
        }else{
            console.log("join new lobby");
            socket.emit("joinNewLobby", (getAvailableLobbyId()));
        }
    });

    socket.on("disconnecting", () => {
        // the Set, socket.rooms, contains at least the socket ID
        for(const roomId of socket.rooms) {
            if (lobbies.has(roomId)) {
                let playersInRoom = lobbies.get(roomId);
                playersInRoom.pop();

                if (playersInRoom.length !== 0) {
                    lobbies.set(roomId, playersInRoom);// Can remove.
                    io.to(roomId).emit("playerJoinedLobby", playersInRoom);
                }
            }
        }
    });

    socket.on("labelsNumber-changed", (index, labelNumber, labelsNumberArr, maxLabels, room) => {
        if(labelNumber === 1) {
            labelsNumberArr.push(1);
        }else {
            labelsNumberArr[index] = labelNumber;
        }

        let maxChanged = false;
        let maxIndex = 0;

        if(labelNumber > maxLabels){
            maxLabels = labelNumber;
            maxIndex = index;
            maxChanged = true;
        }

        io.to(room).emit("labelsNumber-received", labelsNumberArr, maxChanged, maxIndex, maxLabels);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
})


//Info: https://socket.io/docs/v3/emit-cheatsheet/