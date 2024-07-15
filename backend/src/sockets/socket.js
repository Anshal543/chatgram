import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';


const app = express();
const server = createServer(app);
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

io.on("connection",(socket)=>{
    // console.log("connected",socket.id);
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(userData?._id);
        socket.emit("connected");
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("room joined",room);
    })

    socket.on("typing",(room)=>{
        socket.to(room).emit("typing");
    })

    socket.on("stop typing",(room)=>{
        socket.to(room).emit("stop typing");
    })

    socket.on("new messages",(newMessageReceived)=>{
        const chat = newMessageReceived.chat;
        if(!chat.users) return console.log("chat.users not defined");
        chat.users.forEach(user=>{
            if(user._id === newMessageReceived.sender._id) return;
            socket.to(user._id).emit("message received",newMessageReceived);
        })
    })

    socket.on("disconnect",()=>{
        console.log("disconnected",socket.id);
    })
})

export { app, server }