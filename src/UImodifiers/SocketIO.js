import React, {useEffect} from "react";
import {data} from '../config';
import Button from 'react-bootstrap/Button';


function SocketIO({socket,id,group}) {
    
    const SendUI = () =>  {
        socket.emit("SendUI", data);
        console.log("Ui sent to other devices");
    }

    
    const SendElement = (id) =>  {
        const el = data.content.body.find(e => e.id === id);

        if(el != null) {
            socket.emit("SendElement",el);
            console.log("Sending El : " + JSON.stringify(el));
        }else {
            console.log("Element with id:'" + id + "' not found.")
        }
    }


    // TODO : SendGroup function

    const SendGroup = (group) =>  {

        const tosend = data.content.body.filter(e => e.group === group);
        
        tosend.forEach(el => {
            socket.emit("SendElement",el);
        });
    }
     

    useEffect(()=> {
        //We use useEffect to ensure that the emitted signal is received only once

        socket.on("ReceiveUI", message => {

            data.content = message.content;

            console.log("UI received:")
            console.log(JSON.stringify(data));
         });

         
        socket.on("LISTEN-Clicked", (btnid) => {
            const el = data.content.body.find(e => e.id === btnid);
            console.log("Received click");
            if(el != null){
                // eslint-disable-next-line
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
    },[socket])

    return(
        <div>
            <Button className = "button"  onClick= { () => SendUI()}> Send UI </Button>
            <Button className = "button" onClick = { () => SendElement(id)}> Send Element</Button>
            <Button className = "button" onClick = { () => SendGroup(group)}> Send group</Button>
         
        </div>
        );
  }


export default SocketIO;