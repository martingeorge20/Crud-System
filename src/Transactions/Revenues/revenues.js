import React , {useState , useEffect , useRef , useLayoutEffect} from "react";


export default function Revenues () {

    const [revenueTransaction , setRevenueTransaction] = useState([])

    let customerFromLocal = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : {number:0}
    let revenueTransactions = []

    for(let i = 0 ; i < Object.entries(customerFromLocal).length ; i++) {
        let currentCustomer = customerFromLocal[Object.entries(customerFromLocal)[i][0]]
        if(localStorage.getItem("customer")) {
            currentCustomer.activity.products.forEach((transaction) => {
                revenueTransactions.push({email:currentCustomer.details.email,productName:transaction.productName,revenue:transaction.revenue,netProfit:transaction.profit})
            })
        }
    }

useLayoutEffect(() => {
    setRevenueTransaction(revenueTransactions)
} , [])



    return (
        <div className="container mt-4">
  <h3 className="text-center mb-4" style={{color:"darkgreen"}}>Revenues Transactions</h3>
  <table className="table table-bordered table-striped">
    <thead className="thead-dark">
      <tr>
        <th>Number</th>
        <th>Customer Email</th>
        <th>Product Name</th>
        <th>Revenue</th>
        <th>Net Profit</th>
      </tr>
    </thead>
    <tbody>
    {revenueTransaction ? revenueTransaction.map((transaction , index) => {
        return (
            <tr key={index}>
        <td>{index+1}</td>
        <td>{transaction.email}</td>
        <td>{transaction.productName}</td>
        <td>{transaction.revenue}</td>
        <td>{transaction.netProfit}</td>
      </tr>
        )
    }) : ""}
    </tbody>
  </table>
</div>
    )
}