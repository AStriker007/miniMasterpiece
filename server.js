const express=require("express");
const app=express()
const {createServer}=require("http")
const server=createServer(app);
const dotenv=require("dotenv")
dotenv.config()

server.listen(process.env.PORT,()=>{
    console.log(`Listening to port ${process.env.PORT}`)
});

const {Server}=require("socket.io")

const io=new Server(server,{cors:{origin:"*"}})

const users={}

io.on("connection",(socket)=>{
   socket.on("user-joined",data=>{
    users[socket.id]=data
    socket.broadcast.emit("user-joined",data)
   })

   socket.on("send-msg",data=>{
       socket.broadcast.emit("send-msg",data)
   })

    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-left",users[socket.id])
        delete users[socket.id]
    })
})