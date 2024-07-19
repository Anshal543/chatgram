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

const usersSocket = {};
io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId!=undefined) usersSocket[userId] = socket.id;
    io.emit("onlineusers",Object.keys(usersSocket));

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on("join chat",(room)=>{
        socket.join(room);
    })

    socket.on("typing",(room)=>{
        socket.to(room).emit("typing",room);
    })

    socket.on("stop typing",(room)=>{
        socket.to(room).emit("stop typing",room);
    })

    socket.on("new messages",(newMessageReceived)=>{
        const chat = newMessageReceived.chat;
        if(!chat.users) return console.log("chat.users not defined");
        chat.users.forEach(user=>{
            if(user._id == newMessageReceived.sender._id) return;
            socket.to(user._id).emit("message received",newMessageReceived);
            console.log("yes");
        })
    })
    // socket.on("online",(userId)=>{
    //     console.log("online");
    //     socket.to(userId).emit("online");
    // })
    // socket.on("offline",(userId)=>{
    //     console.log("offline");
    //     socket.to(userId).emit("offline");
    // })

    socket.on("disconnect",()=>{
        console.log("disconnected",socket.id);
        // delete usersSocket[userId];
        // io.emit("onlineusers",Object.keys(usersSocket));

    })
})

export { app, server }