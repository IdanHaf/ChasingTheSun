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
let LobbiesArr = []; // Objects: {id, playersArr}.

io.on("connection", socket => {

    //TODO:: change and add a check for race condition.
    socket.on("getAvailableRoomId", (callback) =>{
        let lobby;
        let roomId;
        let numPlayersInLobby = 1;

        if(LobbiesArr.length > 0){
            lobby = LobbiesArr[LobbiesArr.length - 1];
            roomId = lobby.id;
            lobby.playersArr.push(("player" + numPlayersInLobby));
            numPlayersInLobby = lobby.playersArr.length;
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

        callback(roomId);
    });

    socket.on("joinRoom-req", roomId => {
        if(players.has(roomId)) {
            let playersInRoom = players.get(roomId);

            playersInRoom.push(("player" + playersInRoom.length));
            players.set(roomId, playersInRoom);// Can remove.

            if(playersInRoom.length >= maxPlayersInLobby){
                players.delete(roomId);
            }

            socket.join(roomId);
            io.to(roomId).emit("playerJoinedLobby", playersInRoom);
        }else{
            console.log("invalid lobby Id.");
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