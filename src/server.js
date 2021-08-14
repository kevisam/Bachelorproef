import { createRequire } from 'module'
import {data} from "./config.js";
//import {component} from "./index.js";

const require = createRequire(import.meta.url);

const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
//const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");

app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
  port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server);

const buttonRooms = [];

//initializing the socket io connection 
io.on("connection", (socket) => {
  //  console.log(socket.id);

    socket.on("SendUI", (message) => {
        console.log("configuration data  :" + JSON.stringify(message.content['body']));
       // component.forceUpdate();
        socket.broadcast.emit("ReceiveUI", message);
    });

    socket.on("SendElement", (message) => {
      console.log("Sending element :" + JSON.stringify(message))
      socket.broadcast.emit("ReceiveElement", message);
    });

    socket.on("makeRoom", (roomname) => {
      if (!buttonRooms.includes(roomname)) {
        buttonRooms.push(roomname);
      };
      socket.join(roomname);
      console.log("buttonRooms : " + buttonRooms);
    });

    socket.on("SEND-Clicked", (btnid) => {
      console.log("Clicked button")
      socket.broadcast.emit("LISTEN-Clicked",btnid);
    })

    socket.on("joinRoom", (room) => {
      if (buttonRooms.includes(room)) {
        socket.join(room); // A namespace is divided into different rooms
    //    io.in(room).emit("newUser", "A new player has joined :" + room);
  
        // the function above sends a message to all the other users in the room except me
        // if we used in instead of to => sent to all users in room including me 
        return socket.emit("success", "You have succesfully joined the room");
      } else {
        return socket.emit("err", "No room named " + room);
      }
    });

  //when the user exits the room
  socket.on("disconnect", () => {
   console.log("user left")
  });
});