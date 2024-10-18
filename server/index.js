const {createServer} = require('http');
const {Server} = require('socket.io');

const httpServer = createServer();
const socketIO = new Server(httpServer,{
    cors:"http://localhost:3000"
});

let playerScore = [];
socketIO.on('connect',(socket)=>{
    socket.on('data',(data)=>{
        const params = {
            name:data.name,
            score:data.score,
            id:socket.id
        }
        playerScore.push(params);
        console.log(params);
    })
    setInterval(()=>{
        socket.emit("playerScore",playerScore);
    },5000);
})

httpServer.listen(5000,()=>console.log('http://localhost:5000'));