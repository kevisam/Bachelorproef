import React from 'react'

class Checkbox extends React.Component{

    constructor(props){
        super(props);
         this.state = {checked: 'true'};
    }

    toggle() {
        if (this.state.checked === 'true'){
            this.setState({checked: 'false'})
        }else{
            this.setState({checked:'true'})
        }
    }

    render() {
        return(
            <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" style={this.props.styles} id={this.props.block.id} onChange= {() => this.toggle()}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">{this.props.block.label}</label>
        </div>
        )
    }
} export default Checkbox;