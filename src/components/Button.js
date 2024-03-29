import React from 'react';
import Button from 'react-bootstrap/Button';


class Buttonn extends React.Component {

  constructor(props) {
    // Used to pass arguments to this component when we create the element.
    super(props); 
    this.state = {value: ''};
    this.props.socket.emit("makeRoom", this.props.block.id);
  }
  


  render () {
    // eslint-disable-next-line
    let funcEmit = new Function('socket',"socket.emit('SEND-Clicked', '" + this.props.block.id + "');" + this.props.block.onClick);
    //let func = new Function(this.props.block.onClick);
    
    return(
      <div>
    <Button  key={this.props.block.id} id={this.props.block.id} className={this.props.block.className} style={this.props.block.styles}
     onClick={() => funcEmit(this.props.socket)} >
        {this.props.block.label}
      </Button>
    </div>
    )
  }
} export default Buttonn