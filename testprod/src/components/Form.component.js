import React, {useState} from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Button } from './button';
import 'bootstrap/dist/css/bootstrap.min.css';
const Form=(props)=>{

    const [name,setName] = useState("")
    const [isToggled,setIsToggled]=useState(false);
    const [data, setData] =useState("");
    const handleChange=(e)=>{
      let s=String(e.target.value)
      setName(s)
      setData(s)
    } 
    
    const handleSubmit =(e)=>{
      e.preventDefault()
      props.onSubmit(name)
      
    }

    const product=props.products
    return(
        <div className='container' style={{alignItems:'center'}}>
              <h1>Get Products</h1>
              <form onSubmit={handleSubmit}>
              <input type="text" className="form-control" value={data===""?name:data} placeholder="code" onChange={handleChange} required/>
              <Button type="button" onClick={()=>setIsToggled(!isToggled)} id="scan" value="scan"/>
              <Button type="button" buttonStyle="btn--danger--outline" onClick={()=>setIsToggled(false)} id="cancel" value="cancel"/>
              <Button buttonStyle="btn--success--solid" type="submit" />
            </form>

            { isToggled && <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                if (result) {
                  setData(result.text);
                  window.navigator.vibrate(100);
                  setIsToggled(false); 
                }
                }}
               />}
            <p>&nbsp;</p>
                
              <h2>Products</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>prodtype</th>
                  </tr>
                </thead>
                <tbody id="productLists">
                    <tr>
                      
                      <th>{product.length>0?1:null}</th>
                      <td>{product.length>0?product[product.length-1][1]:null}</td>
                      <td>{product.length>0?product[product.length-1][0]:null}</td>
                      <td>{product.length>0?product[product.length-1][2]:null}</td>
                    </tr>
                </tbody>
              </table>
        </div>
    );
}
export default Form