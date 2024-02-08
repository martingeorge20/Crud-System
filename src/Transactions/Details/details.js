import React,{useState,useLayoutEffect,useRef, useEffect} from "react";

export default function DetailsRecap (props) {

    const [revenues , setRevenues] = useState(0)
    const [expenses , setExpenses] = useState(0)
    const [purchases , setPurchases] = useState(0)
    const [sales , setSales] = useState(0)

    let customerFromLocal = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : {number: 0}
    let productFromLocal = localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")) : []
    let allRev = 0
    let allExp = 0
    let customerExp = 0;
    let allPurchases = 0;
    let allSales = 0;
    for(let i = 0 ; i < Object.entries(customerFromLocal).length ; i++) {
        
        if(localStorage.getItem("customer")) {
        customerFromLocal[Object.entries(customerFromLocal)[i][0]].activity.products.forEach((customerActivity) => {
            allRev += customerActivity.revenue
            customerExp += +customerActivity.cost
            allSales += 1
        })
    }
    }
    for(let i = 0 ; i < productFromLocal.length ; i++) {
        if(localStorage.getItem("product")) {
        allExp += (+productFromLocal[i].cost * +productFromLocal[i].quantity)
        allPurchases += 1
    }
    }
    allExp +=  customerExp
    useLayoutEffect(() => {
        setRevenues(allRev)
        setExpenses(allExp)
        setPurchases(allPurchases)
        setSales(allSales)
    } , [])

    useLayoutEffect(() => {
        
    } , [])




    return (
        <>
        <div className="container mt-4">

    <div className=" border-right mb-3 rev">
        <span>Revenue:</span>
        <h1>${revenues}</h1>
    </div>

    <div className=" border-right mb-3 exp">
        <span>Expenses:</span>
        <h1>${expenses}</h1>
    </div>

    <div className=" border-right mb-3 purchase">
        <span>Purchases Transactions:</span>
        <h1>{purchases}</h1>
    </div>

    <div className=" mb-3 sales">
        <span>Sales Transactions:</span>
        <h1>{sales}</h1>
    </div>

</div>
        </>
    )
}