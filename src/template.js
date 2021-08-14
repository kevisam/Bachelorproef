   import React from 'react'
   
   class Template extends React.Component{
        render(){
            return(
                <div class="container">
               
                <div class="input-group input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing">Element name</span>
                        <input type="text" class="form-control" id="buttonID"></input>
                    </div>
            
            
                    <div class="input-group input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing">Button fuction</span>
                    <input type="text" class="form-control" id="txtInput"></input>
                </div>
            
                <div>
                <button class="btn btn-primary" id="MakeButton" onclick="addButton()">Create Button</button>
            
                    <button class="btn btn-primary" id="MakeFunc" onclick=" addFunc()"> Add function</button>
            
                    <button class="btn btn-primary" id="DeleteElement" onclick="DeleteElement()">Delete element</button>
            
            
                </div>
                <div>
                    <button class="btn btn-primary" id="DisButton" onclick=" DistributeButton()"> Distribute button</button>
                    <button class="btn btn-primary" id="DistributeImage" onclick="DistributeImg()">Distribute Image</button>
                    <button class="btn btn-primary" id="DistributeFor" onclick="DistributeForm()">Distribute Form</button>
                </div>
            
                <div class="input-group mb-3">
                <select class="form-select" id="BtnDropDown">
                </select>
            </div>
            
            
            <div class="input-group mb-3">
                <select class="form-select" id="IDdropdown">
                </select>
            </div>
            
            <input type="file" id="picture" accept="image/png, image/jpeg"></input>
                </div>
            
            
               );
        };
     };

     export default Template;