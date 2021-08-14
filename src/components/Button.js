import React from 'react';
import Button from 'react-bootstrap/Button';


class Buttonn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.props.socket.emit("makeRoom", this.props.block.id);
  }
  


  render () {
    let funcEmit = new Function('socket',"socket.emit('SEND-Clicked', '" + this.props.block.id + "');" + this.props.block.onClick);
    let func = new Function(this.props.block.onClick);
    
    return(
      <div>
    <Button id={this.props.block.id} className={this.props.block.className} style={this.props.block.styles}
     onClick={() => funcEmit(this.props.socket)} >
        {this.props.block.label}
      </Button>
    </div>
    )
  }
} export default Buttonn