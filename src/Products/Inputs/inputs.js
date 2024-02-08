import React , {useState,useEffect} from "react"

export default function InputComp (props) {

    const[inputValue,setInputValue] = useState("")
    const[inputError , setInputError] = useState(false)

    useEffect(() => {

        setInputError(props.error)
    },[props.error])

    
    return(
        <>
        <input style={{width:'100%'}} onChange={(e) => {
            setInputValue(e.target.value)
            if(e.target.value === "") {
                setInputError(true)
            } else setInputError(false)
        }} type={props.type} className="form-control custom-gray-input" placeholder={props.placeholder} value={inputValue} id={props.id}/>
        {
            inputError ? <small className="text-danger"> This Input is Required</small> : false
        }
        </>
    )
}