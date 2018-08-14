import React from 'react';


const DisplayProductSale=(props)=>{

return(
  <tr>
    <td>{props.productSale.product_name}</td>
    <td>{props.productSale.qty}</td>
    <td>{props.productSale.retail_price}</td>
    <td>{props.productSale.pomo_price}</td>
    <td>{props.productSale.total}</td>
    <td>{props.productSale.total_saving}</td>
  </tr>
)
}

export default DisplayProductSale;
