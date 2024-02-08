import React,{useState,useEffect,useRef, useLayoutEffect} from "react"
import InputComp from "./inputs/input"
import './create.css'

export default function CustomerComp () {

    const[customer , setCustomer] = useState(localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : {})
    const[countSubmit , setCountSubmit] = useState(0)
    const[countEdit , setCountEdit] = useState(0)
    const[anotherProductCount , setAnotherProductCount] = useState(0)
    const[errors , setErrors] = useState([false , false , false , false , false ])
    const[serialError , setSerialError] = useState(false)


    const btn = useRef(null)
    const btn2 = useRef(null)
    const btn3 = useRef(null)
    const UserNameInput = useRef(null)
    const emailInput = useRef(null)
    const phoneNumberInput = useRef(null)
    const quantityInput = useRef(null)
    const quantityInputReturned = useRef(null)
    const serialNumInput = useRef(null)

    let arr = [UserNameInput , emailInput , phoneNumberInput , quantityInput , serialNumInput]

    useEffect(() => {
        
    quantityInputReturned.current.style.display = "none"
    // localStorage.clear()
    },[])

    useLayoutEffect(() => {
        localStorage.setItem("customer" , JSON.stringify(customer))
        if(countSubmit > 0) {
            for(let i = 0; i < arr.length ; i++) {
                arr[i].current.value = ""
            }
        }
    },[countSubmit])

    useLayoutEffect(() => {
        localStorage.setItem("customer" , JSON.stringify(customer))
        if(countEdit > 0) {
            for(let i = 0; i < arr.length ; i++) {
                arr[i].current.value = ""
            }
        }
    } , [countEdit])

    useLayoutEffect(() => {
        if(anotherProductCount > 0) {
            localStorage.setItem("customer" , JSON.stringify(customer))
        serialNumInput.current.value = ""
        quantityInput.current.value = ""
        }
    },[anotherProductCount])


    function customerSubmit (event) {
        
        // get product details from product local storage
        
        // setSerialError(true)
        let productLocalStorage = JSON.parse(localStorage.getItem("product"))
        let getProductType ;
        let getProductName ;
        let getProductCost;
        let getProductProfit ;
        let getProductPrice ;
        let isTruForSerial = true;
        for(let i = 0 ; i < productLocalStorage.length ; i++) {
            if(productLocalStorage[i].serial === serialNumInput.current.value ) {
                getProductType = productLocalStorage[i].productType
                getProductName = productLocalStorage[i].productName
                getProductCost = productLocalStorage[i].cost * +quantityInput.current.value
                getProductProfit = productLocalStorage[i].profit* +quantityInput.current.value
                getProductPrice = +productLocalStorage[i].cost* +quantityInput.current.value + +productLocalStorage[i].profit* +quantityInput.current.value
                productLocalStorage[i].quantity = `${+productLocalStorage[i].quantity - +quantityInput.current.value}`
                isTruForSerial = false
                setSerialError(false)
                break;
            } 
        }
        // console.log(serialError)
        if(isTruForSerial) {
            setSerialError(true)
            return
        }
        // sen product to local storage again
        localStorage.setItem("product" , JSON.stringify(productLocalStorage))
        // condition to make sure about customer email found or not exist
        let obj ;
        if(customer[emailInput.current.value]) {
            obj = customer[emailInput.current.value]
            obj.activity.products.push({productType:getProductType , productName : getProductName , quantity:quantityInput.current.value ,cost:getProductCost , profit:getProductProfit , revenue:getProductPrice , serial:serialNumInput.current.value})
            setCustomer({...customer , 
                [`${emailInput.current.value}`] : {...obj}
            })
            // condition to add another customer with another email
        } else {
            // check if error exist
        let errorsArr = new Array(5)
        for(let i = 0 ; i < arr.length ; i++) {
            if(arr[i].current.value === "") {
                errorsArr[i] = true
            }
        }
        setErrors([...errorsArr])
        for(let i = 0 ; i < errorsArr.length ; i++) {
            if(errorsArr[i] === true ) return
        }
            obj = {
                [`${emailInput.current.value}`]: {
                        details: {
                        useName: UserNameInput.current.value,
                        email: emailInput.current.value,
                        phoneNumberInput: phoneNumberInput.current.value,
                    },
                        activity: {
                        products: [{productType:getProductType , productName : getProductName , quantity: quantityInput.current.value ,cost:getProductCost , profit:getProductProfit, revenue:getProductPrice  , serial:serialNumInput.current.value }],
                    },
                },
            };
            setCustomer({...customer,
                ...obj
            })
        }
        window.scrollTo({
            behavior:"smooth"
            ,top:-2500
        })
        let counter = countSubmit
        setCountSubmit(counter+1)
    }

    function editHandler (event) {
        btn.current.style.display = "none"
        btn3.current.style.display = "none"
        btn2.current.style.display = "block"
        quantityInput.current.style.display = "none"
        quantityInputReturned.current.style.display = "block"
        window.scrollTo({
            top:0,
            behavior:"smooth"
        })
        let index = event.target.parentElement.firstChild.children[1].children[1].textContent
        UserNameInput.current.value = customer[index].details.useName
        emailInput.current.value = customer[index].details.email
        phoneNumberInput.current.value = customer[index].details.phoneNumberInput
    }

    function editCustomerFunction() {
        let customerObj = customer
        let customerIndex = customerObj[emailInput.current.value]
        customerIndex.details.useName = UserNameInput.current.value
        customerIndex.details.email = emailInput.current.value
        customerIndex.details.phoneNumberInput = phoneNumberInput.current.value
        let quantityOfRequired;
        let serialErrorVar = true

        for(let i = 0 ; i < customerIndex.activity.products.length ; i++) {
            if(customerIndex.activity.products[i].serial === serialNumInput.current.value) {
                let costForEachProduct = customerIndex.activity.products[i].cost / +customerIndex.activity.products[i].quantity
                let profitForEachProduct = customerIndex.activity.products[i].profit / +customerIndex.activity.products[i].quantity
                let revenueForEachProduct = customerIndex.activity.products[i].revenue / +customerIndex.activity.products[i].quantity
                quantityOfRequired = customerIndex.activity.products[i].serial
                    customerIndex.activity.products[i].quantity = `${+customerIndex.activity.products[i].quantity - +quantityInputReturned.current.innerHTML}`
                if(customerIndex.activity.products[i].quantity === "0") {
                    customerIndex.activity.products.splice(i,1)
                } else {
                    customerIndex.activity.products[i].cost = costForEachProduct * +customerIndex.activity.products[i].quantity
                    customerIndex.activity.products[i].profit = profitForEachProduct * +customerIndex.activity.products[i].quantity
                    customerIndex.activity.products[i].revenue = revenueForEachProduct * +customerIndex.activity.products[i].quantity
                }
                serialErrorVar = false
                break
            }
        }
        if(serialErrorVar) {
            setSerialError(true)
            return
        }  else {
            setSerialError(false)
        }
        console.log(serialErrorVar)
        let getProductFromLocal = JSON.parse(localStorage.getItem("product"))
        for(let i = 0 ; i < getProductFromLocal.length ; i++) {
            
            if(quantityOfRequired === getProductFromLocal[i].serial) {
                console.log(getProductFromLocal[i])
                getProductFromLocal[i].quantity = `${+getProductFromLocal[i].quantity + +quantityInputReturned.current.innerHTML}`
            }
            break
        }
        localStorage.setItem("product" , JSON.stringify(getProductFromLocal))
        btn.current.style.display = "block"
        btn3.current.style.display = "block"
        btn2.current.style.display = "none"
        quantityInput.current.style.display = "block"
        quantityInputReturned.current.style.display = "none"
        
        setCustomer({...customerObj,[`${emailInput.current.value}`] : {...customerIndex}})
        let counter = countEdit
        setCountEdit(counter+1)
    }

    function addAnotherFunction (event) {
        let productFromLocal = JSON.parse(localStorage.getItem("product"))
        let getProductType ;
        let getProductName ;
        let getProductCost;
        let getProductProfit ;
        let getProductPrice ;
        let isTruForSerial = true;
        for(let i = 0 ; i < productFromLocal.length ; i++) {
            if(serialNumInput.current.value === productFromLocal[i].serial) {
                getProductType = productFromLocal[i].productType
                getProductName = productFromLocal[i].productName
                getProductCost = productFromLocal[i].cost * +quantityInput.current.value
                getProductProfit = productFromLocal[i].profit* +quantityInput.current.value
                getProductPrice = +productFromLocal[i].cost* +quantityInput.current.value + +productFromLocal[i].profit* +quantityInput.current.value
                productFromLocal[i].quantity = `${+productFromLocal[i].quantity - +quantityInput.current.value}`
                isTruForSerial = false
                setSerialError(false)
                break;
            }
        }
        if(isTruForSerial) {
            setSerialError(true)
            return
        }
        localStorage.setItem("product" , JSON.stringify(productFromLocal))
        let productDetails = {productType:getProductType , productName : getProductName , quantity:quantityInput.current.value ,cost:getProductCost , profit:getProductProfit , revenue:getProductPrice , serial:serialNumInput.current.value}
        let customerTemp = customer
        if(customerTemp[`${emailInput.current.value}`]){
            customerTemp[emailInput.current.value].activity.products.push(productDetails)
        } else {
        let errorsArr = new Array(5)
        for(let i = 0 ; i < arr.length ; i++) {
            if(arr[i].current.value === "") {
                errorsArr[i] = true
            }
        }
        setErrors([...errorsArr])
        for(let i = 0 ; i < errorsArr.length ; i++) {
            if(errorsArr[i] === true ) return
        }
            customerTemp[emailInput.current.value] = {
                    details: {
                                useName: UserNameInput.current.value,
                                email: emailInput.current.value,
                                phoneNumberInput: phoneNumberInput.current.value,
                            },
                    activity: {
                                products: [{productType:getProductType , productName : getProductName , quantity: quantityInput.current.value ,cost:getProductCost , profit:getProductProfit, revenue:getProductPrice  , serial:serialNumInput.current.value }],
                            },
            }
        }
        setCustomer({...customerTemp})
        let counter = anotherProductCount
        setAnotherProductCount(counter+1)
    }

    return (
        <>
        <div className="enterDetails">
            <InputComp type="text" placeholder="User Name" id="userName" refe={UserNameInput} error={errors[0]} />
        <div className="numberInputs" >
            <InputComp type="number" placeholder="Phone Number" id="phoneNum" refe={phoneNumberInput} error={errors[1]} />
            <InputComp type="text" placeholder="Em@il" id="email" refe={emailInput} error={errors[2]} />
        </div>
        <div className="getProduct">
                <InputComp type="text" placeholder="Serial number" id="serialGetNumber" refe={serialNumInput} error={errors[3]} /> 
                <InputComp type="number" placeholder="quantity" id="customQuantity" refe={quantityInput} error={errors[4]} /> 
                <button className="btn btn-secondary" ref={quantityInputReturned}>1</button>
                <button onClick={(e) => {addAnotherFunction()}} className="btn btn-secondary" ref={btn3}>Add Another product</button>
        </div>
            <button ref={btn}  onClick={(e) => {
                customerSubmit(e)
        }}  id="btnCustomer" className="btn btn-secondary" >Submit</button>
        {serialError ?  <small className="text-danger">Serial Code is Wrong, please try again with correct serial code</small>:null}
        <button ref={btn2}  onClick={(e) => {
                editCustomerFunction()
        }} style={{display:"none"}}  id="btnCustomerEdit" className="btn btn-secondary" >Edit</button>
        </div>
        <div className="viewContent">
            <div className="RestartAll">
                <button className="btn btn-light">Customers List</button>
            </div>
            <ul className="list-group">
                {
                    customer ?  
                    Object.entries(customer).map((custom,index) => { 
                        let customKey = customer[custom[0]]
                        return ( 
                            <li  className="list-group-item" > 
                    <div className="d-flex justify-content-between align-items-center"> 
                        <pre className="mb-0"><strong>User Name:  </strong>  {customKey.details.useName}</pre> 
                        <pre className="mb-0"><strong>User Email:  </strong> <span>{customKey.details.email}</span></pre> 
                        <pre className="mb-0"><strong>Phone Number:  </strong>  {customKey.details.phoneNumberInput} </pre> 
                            {customKey.activity.products ? customKey.activity.products.map((product , i) => {
                                return <pre className="mb-0"> Product{i+1}
                                    <strong> Product Type:<small className="text-danger">{product.productType}  </small></strong>
                                    <strong> Product Name:<small className="text-danger"> {product.productName}  </small></strong>
                                    <strong> Quantity: <small className="text-danger"> {product.quantity}</small></strong>
                                    <strong> Price: <small className="text-danger"> {product.revenue}</small></strong>
                            </pre> 
                            }) : ""} 
                    </div> 
                    <button  className="btn btn-light" onClick={(e) => {editHandler(e)}}>Return Product</button> 
                </li> 
                        ) 
                    }) : "" 
            } 
            </ul>
    </div>
        </>
    )
}

