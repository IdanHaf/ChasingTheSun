import { Server } from "socket.io";

const io = new Server(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on("connection", socket => {
    socket.on("labelsNumber-changed", (labelNumber) => {
        socket.broadcast.emit("labelsNumber-received", labelNumber);
    })
})