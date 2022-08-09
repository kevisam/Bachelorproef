import * as React from "react";
import Components from "./components";
import {data} from "./config";
import './App.css';
import {AddElement} from "./UImodifiers/AddElement";
import SocketIO from "./UImodifiers/SocketIO";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


import io from "socket.io-client";
import Select from "./components/Select";

import { Resizable } from "re-resizable";

const socket = io.connect('/');
const {Engine} = require('json-rules-engine');

//test


var idx= 0;
let engine = new Engine();

engine.addOperator('smallerThan', (factValue, jsonValue) => {
    return factValue < jsonValue
  })


let facts = {
  ScreenWidth: window.innerWidth,
  DarkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
}

engine.addRule({
  conditions: {
    any: [{
      all: [{
        fact: 'ScreenWidth',
        operator: 'greaterThanInclusive',
        value: 500
      }]
    }]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'bigWindow',
    params: {
      message: 'Screen is big'
    }
  }
})

engine.addRule({
  conditions: {
    any: [{
      all: [{
        fact: 'ScreenWidth',
        operator: 'smallerThan',
        value: 500
      }]
    }]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'smallWindow',
    params: {
      message: 'Screen is small'
    }
  }
})

engine.addRule({
  conditions: {
    any: [{
      all: [{
        fact: 'DarkTheme',
        operator: 'equal',
        value: false
      }]
    }]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'LightTheme',
    params: {
      message: 'User prefers light theme'
    }
  }
})

engine.addRule({
  conditions: {
    any: [{
      all: [{
        fact: 'DarkTheme',
        operator: 'equal',
        value: true
      }]
    }]
  },
  event: {  // define the event to fire when the conditions evaluate truthy
    type: 'DarkTheme',
    params: {
      message: 'User prefers dark theme'
    }
  }
})

class App extends React.Component{


    //////////////////////////
   ////  App functions //////
  //////////////////////////


  updateFacts(){
    facts.ScreenWidth = window.innerWidth;
    facts.DarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //Add facts to update
}

  
  giveIndex(){
 // returns a unique id 
    const checkIdx = (id) => {
      if (data.content.body.findIndex(e => e.id === id) === -1) {
      return true;
    }else{
      return false
    }
  }

    idx++;
    const test = idx;
   if(checkIdx(test)){
     return test
   } else this.giveIndex();
  };

  constructor(props) {
    super(props);
    window.appComponent = this;
    this.state = {
      inputclassName: '' ,
      inputstyle: '{}',
      selectValue: "button",
      inputOnclick:'',
      inputLabel:'',
      inputgroup:'',
      rerender: false,
      inputid: '',
      selectdevice: "Desktop",
      canvaswidth: '200',
      canvasheight: '320'
    };
  }

  runAdaptationEngine(){
    this.updateFacts();
    engine
    .run(facts)
    .then(({ events }) => {
    events.forEach(event => {  // put foreach instead of map 
      console.log(event.params.message);
      if(event.type === 'DarkTheme'){
        document.documentElement.setAttribute("data-theme","dark");
      }else{
        if(event.type === 'LightTheme'){
          document.documentElement.setAttribute("data-theme","light");
        }
      }
    })

  })
}

  handleToUpdate(e){
     this.setState({ inputclassName: this.state.inputclassName,
      inputstyle: e.target.value,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: 'rerender',
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice});
      
    }

    rerender(e){
      if(this.state.selectdevice === "Desktop"){
        data.content.body.map(e => e.styles = e.styles_desktop);
      }
      
      if (this.state.selectdevice === "Tablet"){
        data.content.body.map(e => e.styles = e.styles_tablet);
      }
      
      if (this.state.selectdevice === "Smartphone") {
        data.content.body.map(e=> e.styles = e.styles_smartphone);
      }


      this.setState({ inputclassName: this.state.inputclassName ,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender, 
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight });
    }

  handleChangestyle(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: e.target.value,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender,
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight});
  }

  handleChangeclassName(e) {
    this.setState({ 
      inputclassName: e.target.value ,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender,
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight
    });
  }

  handleLabel(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName ,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: e.target.value,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender,
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight
    });
  }

  handleGroup(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName ,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: e.target.value,
      rerender: this.state.rerender,
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight
    });
  }

  handleSelectedValue(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: this.state.inputstyle,
      selectValue: e.target.value,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender,
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight});
  }

  handleSelecteddevice(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender,
      inputid: this.state.inputid,
      selectdevice: e.target.value,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight});
  }

  
  handleOnclick(e){
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: e.target.value,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender,
      inputid: this.state.inputid,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight});
  }

  handleId(e){
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      inputgroup: this.state.inputgroup,
      rerender: this.state.rerender,
      inputid: e.target.value,
      selectdevice: this.state.selectdevice,
      canvaswidth: this.state.canvaswidth,
      canvasheight: this.state.canvasheight});
  }




  handleClick = () => {

    var id = ''

    if(this.state.inputid === ''){
      id = this.giveIndex();
    } else {
      id = this.state.inputid
    }
    
    AddElement(this.state.selectValue,this.state.inputgroup,id,JSON.parse(this.state.inputstyle),this.state.inputOnclick,this.state.inputLabel);

    socket.emit('makeRoom', id);
    this.rerender();
      console.log(this.state.inputOnclick,);
  };

  deleteElement(id){
    const idx = data.content.body.findIndex(e => e.id === id);
    
    if(idx === -1){
      console.log("Element not found : " + id);
    }else {
      data.content.body.splice(idx,1);
      this.rerender();
    }
  }

  addToDiv(){
    var id  = ''
    if(this.state.inputid === ''){
      id = this.giveIndex();
    } else {
      id = this.state.inputid
    }
    
    AddElement(this.state.selectValue,this.state.inputgroup,id,JSON.parse(this.state.inputstyle),this.state.inputOnclick,this.state.inputLabel);

    socket.emit('makeRoom', id);
    this.rerender();

    data.content.body.find(e => e.id === id).children.push(id);
  }

  changeStyle(){ // Changes for the bigger screens affect the smaller ones, 
    //but changes in the smaller screens do not affect the bigger ones

    if(this.state.inputid === ""){
      console.log("Give a proper id ")
    }else {
      const element = data.content.body.find(e => e.id === this.state.inputid)
      if(this.state.selectdevice === "Desktop"){
        element.styles = JSON.parse(this.state.inputstyle)
        element.styles_desktop = JSON.parse(this.state.inputstyle)
        element.styles_tablet = JSON.parse(this.state.inputstyle)
        element.styles_smartphone = JSON.parse(this.state.inputstyle)
      }else if(this.state.selectdevice === "Tablet"){
        element.styles_tablet = JSON.parse(this.state.inputstyle)
        element.styles_smartphone = JSON.parse(this.state.inputstyle)
      }else {
        element.styles_smartphone = JSON.parse(this.state.inputstyle)
      }
    }
  }



  // Change these so they don't print in the console, but in a separate window ?
printJSON() {
  console.log(data);
}

printEl(id) {
  const idx = data.content.body.findIndex(e => e.id === id);
  console.log(data.content.body[idx]);
}
    

 // The render funcion is used to render the UI elements of the App.
 render () {
    return (
      <div className="App">
        <h1>Adaptive Distributable User Interface</h1>
        <div>
        <label htmlFor="name"> Select element</label>
        <select className="form-select"
        value={this.state.selectValue} 
        onChange={evt => this.handleSelectedValue(evt)}>
          <option value="button">Button</option>
          <option value="li">List</option>
          <option value="input">Input field</option>
          <option value="select">Select list</option>
          <option value="checkbox">Checkbox</option>
          <option value="p">Text</option>
          <option value="h1"> Header</option>
          <option value="div"> Div</option>
        </select>

        <label htmlFor="name"> Select device type</label>
        <select className="form-select"
        value={this.state.selectdevice} 
        onChange={evt => this.handleSelecteddevice(evt)}>
          <option value="Desktop">Desktop</option>
          <option value="Tablet">Tablet</option>
          <option value="Smartphone">Smartphone</option>
        </select>

        <div>
          <label htmlFor="name"> id </label>
          <input className="form-control" type="text" placeholder="header-text1" value={this.state.inputid} onChange= {evt => this.handleId(evt)}></input>
        </div>

        <div>
          <label htmlFor="name"> Label </label>
          <input className="form-control" type="text" placeholder="ex. Volume Up" value={this.state.inputlabel} onChange= {evt => this.handleLabel(evt)}></input>
        </div>

        <div>
          <label htmlFor="name"> Element group </label>
          <input className="form-control" type="text" placeholder="G1" value={this.state.inputlabel} onChange= {evt => this.handleGroup(evt)}></input>
        </div>

        <div>
          <label htmlFor="name">Styles (in JSON string format)</label>
          <textarea name="Text1" cols="40" rows="5" defaultValue= "{}" style= {{display:"block"}} onChange={evt => this.handleChangestyle(evt)} ></textarea>
        </div>

        <div>
          <label htmlFor="onClick">Onclick Function</label>
          <input className="form-control" type="text" value={this.state.inputOnclick} onChange= {evt => this.handleOnclick(evt)}></input>
        </div>
        
        </div>

        <div>
        <Button className = "button" onClick={() =>this.handleClick()}>Create Element</Button>
        </div>

        <div>

        <h3> UI controls</h3>
          <label htmlFor="className">ID of element</label>
          <input className="form-control"  type="text" value={this.state.inputclassName} onChange= {evt => this.handleChangeclassName(evt)}></input>
          <div>
          <Button className = "button" onClick = { () => this.deleteElement(this.state.inputclassName)}> Delete element</Button>
          <Button className = "button" onClick = { () => this.printEl(this.state.inputclassName)}> Print element </Button>
          <SocketIO socket={socket} id={this.state.inputclassName} group ={this.state.inputgroup} />
          </div>
          <Button className = "button" onClick = { () => this.addToDiv(this.state.inputid)}> Add to div</Button>
          <Button className = "button" onClick = { () => this.changeStyle()}> Update style</Button>
          <div>


          </div>

          <div>
          <h3>Adaptation and distribution</h3>      
          <Button className = "button" onClick = { () => this.rerender()}> Rerender UI</Button>
          <Button className = "button" onClick = { () => this.runAdaptationEngine()}> Run adaptation </Button>
          <Button className = "button" onClick = { () => this.printJSON()}> PRINT JSON</Button>
          </div>
        </div>

        <div> <h2> My UI </h2></div>
        
        <div ref="uicontainer" className = "container">

        {data.content.body.map(block => Components(block,socket))}

        </div> 
        

        {/*  <Resizable
         style={{ marginLeft: 10, marginTop: 10, border: "1px solid black" }}
         size={{ width: this.state.canvaswidth, height: this.state.canvasheight }}
         onResizeStop={(e, direction, ref, d) => {

          this.setState({ 
            inputclassName: this.state.inputclassName,
            inputstyle: this.state.inputstyle,
            selectValue: this.state.selectValue,
            inputOnclick: this.state.inputOnclick,
            inputLabel: this.state.inputLabel,
            inputgroup: this.state.inputgroup,
            rerender: this.state.rerender,
            inputid: this.state.inputid,
            selectdevice: this.state.selectdevice,
            canvaswidth: this.state.canvaswidth + d.width,
            canvasheight: this.state.canvasheight + d.height});
            }}>
         {data.content.body.map(block => Components(block,socket))}
      
         </Resizable>*/}
       
      </div>
    );
  }
}

export default App;