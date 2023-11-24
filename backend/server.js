import { v4 as uuidV4 } from "uuid";
import { Server } from "socket.io";

const io = new Server(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

//TODO:: use namespaces for better readability.

let players = new Map();
const maxPlayersInLobby = 4;
let LobbiesArr = []; // Objects: {LobbyId, playersArr}.

io.on("connection", socket => {

    //TODO:: change and add a check for race condition.
    socket.on("getAvailableRoomId", (callback) =>{
        let lobby;
        let roomId;
        let numPlayersInLobby = 1;

        if(LobbiesArr.length > 0){
            lobby = LobbiesArr[LobbiesArr.length - 1];
            roomId = lobby.id;
            numPlayersInLobby = lobby.playersArr.length;
            lobby.playersArr.push(("player" + numPlayersInLobby));
        }else{
            //Create a new lobby.
            roomId = uuidV4();
            lobby = {id: roomId, playersArr: ["player0"]};
            LobbiesArr.push(lobby);
            players.set(roomId, []);
        }

        if(numPlayersInLobby >= maxPlayersInLobby){
            LobbiesArr.pop();
        }

        console.log(LobbiesArr);
        callback(roomId);
    });

    socket.on("joinRoom-req", roomId => {
        if(players.has(roomId)) {
            let playersInRoom = players.get(roomId);

            playersInRoom.push(("player" + playersInRoom.length));
            players.set(roomId, playersInRoom);// Can remove.

            if(playersInRoom.length >= maxPlayersInLobby){
                players.delete(roomId);
                //Solution - just for now.
                for(const lobby of LobbiesArr){
                    if(lobby.id === roomId){
                        const index = LobbiesArr.indexOf(lobby);
                        if (index > -1) {
                            LobbiesArr.splice(index, 1);
                        }

                        break;
                    }
                }
            }

            socket.join(roomId);
            io.to(roomId).emit("playerJoinedLobby", playersInRoom);
        }else{
            console.log("invalid lobby Id.");
        }
    });

    socket.on("disconnecting", () => {
        // the Set, socket.rooms, contains at least the socket ID
        for(const roomId of socket.rooms) {
            if (players.has(roomId)) {
                let playersInRoom = players.get(roomId);
                playersInRoom.pop();

                if (playersInRoom.length !== 0) {
                    players.set(roomId, playersInRoom);// Can remove.
                    io.to(roomId).emit("playerJoinedLobby", playersInRoom);
                }
            }
        }
    });

    socket.on("labelsNumber-changed", (labelNumber, room) => {
        socket.to(room).emit("labelsNumber-received", labelNumber);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
})


//Info: https://socket.io/docs/v3/emit-cheatsheet/