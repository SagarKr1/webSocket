const Socket = io("http://localhost:5000");

Socket.on('connect',(response)=>{
    console.log(response);
})

Socket.on('message',(data)=>{
    console.log(data);
    Socket.emit("message","Hello server");
})