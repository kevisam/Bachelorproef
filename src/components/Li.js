import React from "react";
import {data} from "../config";

class Li extends React.Component{
  constructor(props){
    super(props);
    this.state = {newChild: ''};
  }

  addChild(){
    data.content.body.find(e => e.id === this.props.block.id).children.push(this.state.newChild);
    console.log(data);
    this.setState({"newChild" : this.state.newChild});
}

handleInput(e) {
  this.setState({"newChild" : e.target.value});
}

  render() {
    return(
      <div>
        <ul id={this.props.block.id} className={this.props.block.className} style={this.props.block.styles}>
        {this.props.block.children.map((number) =>
          <li>{number}</li>)}
        </ul>  
        <input type="text" placeholder= "Add value ..." onChange= {(e) => this.handleInput(e)}></input>
        <button onClick= {() => this.addChild()} >+</button>
      </div>
          
    )
  }

} export default Li;