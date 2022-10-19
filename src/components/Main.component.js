import React, { Component} from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Button } from './button';

class Main extends Component {
  
  constructor(props){
    super(props);
    this.state={
      data:"",
      isToggled:false
    }
    this.setInputState = this.setInputState.bind(this);
  }

  setInputState(event) {
    this.setState({ data: event.target.value });
  }

  render(props) {
    return (
      <div className="container">
        <div className="col">
        <h1>Add New Products Here</h1>
        <div>
            <form onSubmit={(event) => {
                event.preventDefault()
                const productname = this.productname.value
                const productprice = this.productprice.value
                const  producttype= this.producttype.value
                const qrcode = this.qrcode.value
                this.props.createTask(qrcode,productprice,productname,producttype)
              }}>
              <input id="name" type="text" ref={(input) => { this.productname = input }} className="form-control"  placeholder="Product Neme" required/>
              <br></br>
              <input id="price" type="text" ref={(input) => { this.productprice = input }} className="form-control" placeholder="Product Price" required/>
              <br></br>
              <input id="prodtype" type="text" ref={(input) => { this.producttype = input }} className="form-control" placeholder="Product Type" required/>
              <br></br>
              <input id="qrcode" type="text" ref={(input) => { this.qrcode = input }} value={this.state.data} name="text" placeholder="QrCode" className="form-control" onChange={this.setInputState} required/>
              <br></br>
              <Button type="button" onClick={()=> this.setState({isToggled:!this.state.isToggled})} id="scan" value="scan" />
              <Button type="button" buttonStyle="btn--danger--outline" onClick={()=> this.setState({isToggled:false})} id="cancel" value="cancel"/>
              <Button buttonStyle="btn--success--solid" type="submit" hidden=""/>
            </form>

            {this.state.isToggled && <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                if (result) {
                  this.setState({data: result.text});
                  window.navigator.vibrate(100);
                  this.setState({isToggled:false})
                }
                }}
               />}
            </div>
        </div>
      </div>
    );
  }
}

export default Main;