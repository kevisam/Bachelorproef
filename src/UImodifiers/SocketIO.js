import React, { useState, useEffect, useRef } from "react";
import {data} from '../config';
import Button from 'react-bootstrap/Button';


function Test({socket,id}) {
    
    const SendUI = () =>  {
        socket.emit("SendUI", data);
    }

    
    const SendElement = (id) =>  {
        const el = data.content.body.find(e => e.id == id);

        if(el != null) {
            socket.emit("SendElement",el);
            console.log("Sending El : " + JSON.stringify(el));
        }else {
            console.log("Element with id:'" + id + "' not found.")
        }
    }
     
    console.log("Ui sent to other devices");

    useEffect(()=> {
        socket.on("ReceiveUI", message => {

            data.content = message.content;
            console.log(JSON.stringify(data));
         });

         
        socket.on("LISTEN-Clicked", (btnid) => {
            const el = data.content.body.find(e => e.id == btnid);
            console.log("Received click");
            if(el != null){
                let func = new Function(el.onClick);
                func();  
            }
        })
  

        socket.on("ReceiveElement", message => {
            data.content['body'].push(message);

            console.log("Received element" + JSON.stringify(message))
       /*     if(message.component == 'button') {
                socket.emit('joinRoom', message.id);
            }*/
        });

        socket.on("err", (err) => console.log(err));
        socket.on("success", (res) => console.log(res));
    })

    return(
        <div>
            <Button  onClick= { () => SendUI()}> Send UI </Button>
            <Button onClick = { () => SendElement(id)}> Send Element</Button>
         
        </div>
        );
  }


export default Test;