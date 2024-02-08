import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import './nav.css'

export default class NavBar extends React.Component {
    constructor () {
        super()
        this.state = {
          divToggleDisplay: "block",
        }
    }

componentDidMount () {
  document.querySelectorAll(".navbar-nav .nav-item .nav-link").forEach((link) => {
    link.addEventListener("click" , () => {
      document.querySelectorAll(".navbar-nav .nav-item .nav-link").forEach((e) => {
        e.classList.remove("active")
      })
      link.classList.add("active")
    })
  })
}

componentDidUpdate () {

}

componentWillUnmount () {

}



    render () {

        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link style={{
      display:"inline-block",
      fontSize:"25px",
      fontWeight:'500'
    }} className="navbar-brand" to="/main" >Main Page</Link>
    <button className="navbar-toggler" onClick={() => {

      this.setState({...this.state,divToggleDisplay:this.state.divToggleDisplay === "block" ? "none" : "block"})
      let divToggle = document.getElementById("navbarTogglerDemo02") // toggle nav bar button in small screens
      divToggle.style.display = this.state.divToggleDisplay

    }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02" >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/customer" className="nav-link active" aria-current="page">Customers</Link>
        </li>
        <li className="nav-item">
          <Link to="/product" className="nav-link">Products</Link>
        </li>
        <li className="nav-item">
          <Link to="/transaction" className="nav-link " tabIndex="-1" aria-disabled="true">Transactions</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
        )
    }
}