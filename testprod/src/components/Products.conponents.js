import React, { Component, useState} from 'react';

const Products=(props)=>{


    return(
        <div>
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
                      
                      <th>1</th>
                      <td>{product[0][1]}</td>
                      <td>{product[0][0]}</td>
                      <td>{product[0][2]}</td>
                    </tr>
                </tbody>
              </table>
        </div>
    )
}

export default Products