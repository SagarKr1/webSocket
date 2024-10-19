const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: "http://localhost:3000"
});
const user = [];
io.on("connect",(socket)=>{
    console.log("connect");
    socket.on('data',(data)=>{
        user.push(data);
        console.log(user);
        socket.emit("userData",user);
    });
})

httpServer.listen(8000, () => {
    console.log("http://localhost:8000")
});