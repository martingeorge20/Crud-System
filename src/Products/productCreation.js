import React from "react";
import InputComp from "./Inputs/inputs";
import RadioCom from "./Radio/radio";
import './products.css'
import './viewProducts.css'

export default class ProductCreation extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            product: localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")) : [],
            error:new Array(7).fill(false),
            }
        this.arr = []
        // localStorage.clear()
    }
    componentDidMount () {
        this.companyInput = document.getElementById("company")
        this.prodNameInput = document.getElementById("prodName")
        this.costInput = document.getElementById("cost")
        this.profitInput = document.getElementById("profit")
        this.quantityInput = document.getElementById("quantity")
        this.serialInput = document.getElementById("serial")
        this.allRadios = document.querySelectorAll(".radios .form-check-input")
        this.allRadios.forEach((radio) => {
            radio.addEventListener("change" , (e) => {
                this.checkedRadio = radio
            })
        })
        this.arr.push(this.companyInput,this.prodNameInput,this.allRadios,this.costInput,this.profitInput,this.quantityInput,this.serialInput)
    }

    

    componentDidUpdate() {
        for(let i = 0 ; i < this.state.error.length ; i++) {
            if(this.state.error[i]) {
                return
            }
        }
        
        localStorage.setItem("product",JSON.stringify(this.state.product))
        for(let i = 0 ; i < this.arr.length ; i++) {
            this.arr[i].value = this.arr[i].ariaPlaceholder
        }
        document.getElementById("btnEdit").style.display = "none"
        document.getElementById("btnClick").style.display = "block"
        this.allRadios.forEach((radio) => {
            radio.checked = false
        })
    }

    componentWillUnmount () {
        
    }

    submitProductDetails () {
        let arrayFalse = new Array(7).fill(false)
        for(let i = 0 ; i < this.arr.length ; i++) {
            if(i === 2){
                arrayFalse[i] = true
                for(let j = 0 ; j < this.arr[i].length ; j++) {
                    if(this.arr[i][j].checked) {
                        console.log(this.arr[i][j])
                        arrayFalse[i] = false
                    } 
                }
            } else if(this.arr[i].value === "") {
                arrayFalse[i] = true
            } 
        }
        this.setState({...this.state,error:[...arrayFalse]})
        for(let i = 0 ; i < arrayFalse.length ; i++) {
            if(arrayFalse[i] === true ) return
        }
        this.setState({...this.state,product:[...this.state.product , {
            companyName:this.companyInput.value,
            productName:this.prodNameInput.value,
            productType:this.checkedRadio.value,
            profit:this.profitInput.value,
            cost:this.costInput.value,
            quantity:this.quantityInput.value,
            fixedQuantity:this.quantityInput.value,
            serial:this.serialInput.value
        }]})
    }

    editHandler (e) {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
        this.arrayEditHandle = JSON.parse(localStorage.getItem("product"))
        let eventIndex = +e.target.parentElement.id
        this.companyInput.value = this.arrayEditHandle[eventIndex].companyName
        this.prodNameInput.value = this.arrayEditHandle[eventIndex].productName
        this.profitInput.value = this.arrayEditHandle[eventIndex].profit
        this.costInput.value = this.arrayEditHandle[eventIndex].cost
        this.quantityInput.value = this.arrayEditHandle[eventIndex].quantity
        this.serialInput.value = this.arrayEditHandle[eventIndex].serial
        this.allRadios.forEach((radio) => {
            if (radio.value === this.arrayEditHandle[eventIndex].productType) {
                radio.checked = true;
                console.log(radio.value)
            } else {
                radio.checked = false;
            }
        })        
        document.getElementById("btnClick").style.display = "none"
        document.getElementById("btnEdit").style.display = "block"
        document.getElementById("btnEdit").key = eventIndex
    }

    btnEditFunction (e) {
        let index = e.target.key
        let productArray= this.state.product
        productArray[index].companyName = this.companyInput.value
        productArray[index].productName = this.prodNameInput.value
        productArray[index].quantity = `${-(+productArray[index].fixedQuantity - +productArray[index].quantity) + +this.quantityInput.value}`
        productArray[index].fixedQuantity = this.quantityInput.value
        productArray[index].cost = this.costInput.value
        productArray[index].profit = this.profitInput.value
        productArray[index].serial = this.serialInput.value
        
        this.setState({...this.state,product:[...productArray]})
        
    }

    render () {
        return (
            <><div className="enterDetails">
    <InputComp type="text" placeholder="Company Name" id="company" error={this.state.error[0]} />
    <InputComp type="text" placeholder="Product Name" id="prodName" error={this.state.error[1]}/>
        <div className="radios">
            <RadioCom type="Phone" radio="exampleRadio1"  />
            <RadioCom type="Television" radio="exampleRadio2"/>
            <RadioCom type="Laptop" radio="exampleRadio3"/>
        </div>
        <div className="numberInputs" >
            <InputComp type="number" placeholder="Quantity" id="quantity" error={this.state.error[3]}/>
            <InputComp type="number" placeholder="Cost" id="cost" error={this.state.error[4]}/>
            <InputComp type="number" placeholder="Profit" id="profit" error={this.state.error[5]}/>
        </div>
    <InputComp type="text" placeholder="Serial Code" id="serial" error={this.state.error[6]}/>
    <button onClick={() => {
        this.submitProductDetails()
    }}  id="btnClick" className="btn btn-secondary">Submit</button>
    <button style={{display:"none"}} onClick={(e) => {
        this.btnEditFunction(e)
    }}  id="btnEdit" className="btn btn-secondary" >Edit</button>
    
    </div>
    <div className="viewContent">
            <div className="RestartAll">
                <button className="btn btn-light">Goods List</button>
            </div>
            <ul className="list-group">
                {
                    this.state.product ? 
                    this.state.product.map((prod,index) => {
                        return (
                            <li key={index} className="list-group-item" id={index}>
                    <div className="d-flex justify-content-between align-items-center">
                        <pre className="mb-0"><strong>Company:  </strong>{prod.companyName}</pre>
                        <pre className="mb-0"><strong>product Name:  </strong>{prod.productName}</pre>
                        <pre className="mb-0"><strong>Product:  </strong>{prod.productType}</pre>
                        <pre className="mb-0"><strong>Quantity:  </strong>{prod.quantity} </pre>
                        <pre className="mb-0"><strong>Cost:  </strong>{prod.cost} </pre>
                        <strong className="text-danger">Total Cost: {+prod.cost * +prod.quantity}</strong> 
                        <pre className="mb-0"><strong>Profit:  </strong>{prod.profit}</pre>
                        <strong className="text-danger">Total Net Profit: {+prod.profit * +prod.quantity}</strong>
                        <pre className="mb-0"><strong>Serial:  </strong>{prod.serial} </pre>
                        <strong className="text-danger">Gross Profit Per Unit: {+prod.profit + +prod.cost}</strong>
                    </div>

                    <button  className="btn btn-light" onClick={(e) => {this.editHandler(e)}}>Edit</button>

                </li>
                        )
                    }) : false
                }
            </ul>
    </div>
    </>
        )
    }
}