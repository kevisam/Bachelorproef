import * as React from "react";
import Components from "./components";
import {data} from "./config";
import './App.css';
import {AddElement} from "./UImodifiers/AddElement";
import SocketIO from "./UImodifiers/SocketIO";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


import io from "socket.io-client";

const socket = io.connect('/');
const {Engine} = require('json-rules-engine');

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
      rerender: false
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
      rerender: 'rerender'});
    }

    rerender(e){
      this.setState({ inputclassName: this.state.inputclassName ,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      rerender: this.state.rerender });
    }

  handleChangestyle(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: e.target.value,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      rerender: this.state.rerender});
  }

  handleChangeclassName(e) {
    this.setState({ 
      inputclassName: e.target.value ,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      rerender: this.state.rerender
    });
  }

  handleLabel(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName ,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: this.state.inputOnclick,
      inputLabel: e.target.value,
      rerender: this.state.rerender
    });
  }

  handleSelectedValue(e) {
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: this.state.inputstyle,
      selectValue: e.target.value,
      inputOnclick: this.state.inputOnclick,
      inputLabel: this.state.inputLabel,
      rerender: this.state.rerender});
  }

  
  handleOnclick(e){
    this.setState({ 
      inputclassName: this.state.inputclassName,
      inputstyle: this.state.inputstyle,
      selectValue: this.state.selectValue,
      inputOnclick: e.target.value,
      inputLabel: this.state.inputLabel,
      rerender: this.state.rerender});
  }


  handleClick = () => {
    const id = this.giveIndex();
    AddElement(this.state.selectValue,id,JSON.parse(this.state.inputstyle),this.state.inputOnclick,this.state.inputLabel);

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

printJSON() {
  console.log(data);
}

printEl(id) {
  const idx = data.content.body.findIndex(e => e.id === id);
  console.log(data.content.body[idx]);
}
  
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
        </select>

        
        <div>
          <label htmlFor="name"> Label </label>
          <input className="form-control" type="text" placeholder="ex. Volume Up" value={this.state.inputlabel} onChange= {evt => this.handleLabel(evt)}></input>
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
          <SocketIO socket={socket} id={this.state.inputclassName} />
          </div>

          <div>
          <h3>Adaptation and distribution</h3>      
          <Button className = "button" onClick = { () => this.rerender()}> Rerender UI</Button>
          <Button className = "button" onClick = { () => this.runAdaptationEngine()}> Run adaptation </Button>
          <Button className = "button" onClick = { () => this.printJSON()}> PRINT JSON</Button>
          </div>
        </div>

        <div> <h2> My UI </h2></div>
        <div className = "container">

        {data.content.body.map(block => Components(block,socket))}

        </div>
        

      </div>
    );
  }
}

export default App;