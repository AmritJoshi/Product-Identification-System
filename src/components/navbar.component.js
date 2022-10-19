import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from '../photo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <img src={photo} width="30" height="30" className="d-inline-block align-top" alt="" />
            <Link to="/" className="navbar-brand">Product Identification</Link>
            
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                    <Link to="/" className="nav-link">Get Product</Link>
                    </li>
                    <li className="navbar-item">
                    <Link to="/create" className="nav-link">Add Item</Link>
                    </li>
                </ul>
            </div>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                 alt=""/>
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;