import React,{useState,useLayoutEffect,useEffect} from "react";


export default function PurchasesExp () {

    const[purchases,setPurchases] = useState([])

    let productsFromLocal = localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")) : []
    let productsArr = []

    for(let i = 0 ; i < productsFromLocal.length ; i++) {
        let eachProduct = {};
        eachProduct.companyName = productsFromLocal[i].companyName
        eachProduct.productName = productsFromLocal[i].productName
        eachProduct.cost = +productsFromLocal[i].cost * +productsFromLocal[i].fixedQuantity
        productsArr.push(eachProduct)
    }

    useLayoutEffect(() => {
        setPurchases(productsArr)
    } , [])

    useLayoutEffect(() => {
        console.log(productsArr)
    } , [])

    return (
        
            <div className="container mt-4">
      <h3 className="text-center mb-4" style={{color:"darkgreen"}}>Purchases Transactions</h3>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Number</th>
            <th>Company Name</th>
            <th>Product Name</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>$2,500.00</td>
            <td>$5,000.00</td>
            <td>20</td>
            <td>30</td>
          </tr>
          <tr>
            <td>$2,500.00</td>
            <td>$5,000.00</td>
            <td>20</td>
            <td>30</td>
          </tr> */}
          {purchases ? purchases.map((product , index) => {
            return(
                <tr key={index+1}>
            <td>{index+1}</td>
            <td>{product.companyName}</td>
            <td>{product.productName}</td>
            <td>{product.cost}</td>
          </tr>
            )
          }) : ""}
        </tbody>
      </table>
    </div>
    )
}