import React from 'react'
import {data} from '../config';


class Select extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {newChild: ''};
      }

      addChild(){
          data.content.body.find(e => e.id === this.props.block.id).field_options.push({"option_label" : this.state.newChild });
          console.log(data);
          this.setState({"newChild" : this.state.newChild});
      }

      handleInput(e) {
          this.setState({"newChild" : e.target.value});
      }
      
        render() {
            return (
                <div>
                    <label className="form-label">{this.props.block.label}</label>
                    <select className="form-select" aria-label="Default select example" id = {this.props.block.id}
                    style = {this.props.block.styles}>
                        <option >Open this select menu</option>
                        {this.props.block.field_options.length > 0 && this.props.block.field_options.map((option, i) =>
                            <option value={option.option_label} key={i}>{option.option_label}</option>
                        )}
                    </select>

                    <input type="text" placeholder= "Add value ..." onChange= {(e) => this.handleInput(e)}></input>
                    <button onClick= {() => this.addChild()} >+</button>
                    
                </div>
            )
        }
    }

export default Select
