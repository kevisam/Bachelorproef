import React from "react";

class Input extends React.Component{

  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  onTodoChange = (e) => {
    this.setState({
         name: e.target.value
    });
  };

render() {
  return (
    <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">{this.props.block.label}</label>
              <input type="text" className="form-control" id={this.props.block.id} aria-describedby="emailHelp"
                  placeholder={this.props.block.field_placeholder ? this.props.block.field_placeholder : ''}
                  value={this.state.name} onChange = {(e) => this.onTodoChange(e)}
              />
          </div>
  );
  }
} export default Input;