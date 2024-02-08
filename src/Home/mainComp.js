import React from "react";
import PhotosUrl from "./photos_main/photos";


export default function MainComp (props) {



    return (
        <>
    <div className="card" >
        <img src = {require(`${props.url}`)} className="card-img-top" alt="awddwa"/>
        <div className="card-body">
            <h5 className="card-title">{props.section} section</h5>
            <p className="card-text">All new content, all prices, Add any product</p>
            <a href="#d" className="btn btn-secondary ">Manage {props.section} Store</a>
        </div>
    </div>
        </>
    )
}