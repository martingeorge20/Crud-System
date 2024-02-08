import React from "react";
import './trans.css'
import DetailsRecap from "./Details/details";
import Revenues from "./Revenues/revenues";
import PurchasesExp from "./Purchases/purchases";


export default function TransactionsComp () {




    return (
        <div className="body">
        <DetailsRecap/>
        <Revenues/>
        <PurchasesExp/>
        </div>
    )
}