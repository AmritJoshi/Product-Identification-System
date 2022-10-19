import './App.css';
import React, { Component } from 'react';
import Navbar from './components/navbar.component';
import prodidentify from './build/contracts/prodidentify.json'
import Web3 from 'web3';
import Main from './components/Main.component';
import Form from './components/Form.component';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
class App extends Component {
  

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    await web3.eth.getAccounts()
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkData =prodidentify.networks[5777]
    if(networkData){
      const prodidentifys = new web3.eth.Contract(prodidentify.abi,networkData.address)
      this.setState({ prodidentify :prodidentifys })
      console.log(prodidentifys)
      this.setState({ loading: false})

    }else{
      window.alert('prodidentify contract not deployed to detected network.')
    }

  }


  async getProduct(qrcode){
    this.setState({ loading: true })
    const product=await this.state.prodidentify.methods.getProduct(qrcode).call()
    this.setState({
      products:[...this.state.products,product]
    })
    this.setState({ loading: false })
    console.log(this.state.products)
  }
  

  createTask=(qrcode,productprice,productname,producttype)=>{
    console.log("Submitting file to ipfs...")

    this.setState({ loading: true })
      this.state.prodidentify.methods.createTask(qrcode,productprice,productname,producttype).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }
  
  


  constructor (props){
    super(props)
    this.state={
      account:'',
      loading:true,
      prodidentify:null,
      qrcode:"",
      products:[],
    }
    this.createTask = this.createTask.bind(this)
    this.getProduct=this.getProduct.bind(this)
  }
render(){
  return (
    <BrowserRouter>
    <div>
    <Navbar account={this.state.account}/>
    <Routes>
    <Route path="/create" element={this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          :<Main  createTask={this.createTask}
                                          prodidentify={this.state.prodidentify}/>
                                          } />
    <Route path="/" element={<Form  onSubmit={this.getProduct} 
                                    products={this.state.products}/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}
}

export default App;
