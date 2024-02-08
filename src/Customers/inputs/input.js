import React , {useState,useEffect,useRef} from "react"

export default function InputComp (props) {

    const[inputValue,setInputValue] = useState("")
    const[error , setError] = useState(false)

    useEffect(() => {
        setError(props.error)
    },[props.error])

    
    return(
        <>
        <input style={{width:'100%'}} onChange={(e) => {
            setInputValue(e.target.value)
            if(e.target.value === "") {
                setError(true)
            } else {
                setError(false)
            }
        }} ref={props.refe}  type={props.type} className="form-control custom-gray-input" placeholder={props.placeholder} value={inputValue} id={props.id}/>
        {error ? <small className="text-danger">This Input is Required</small> : ""}
        </>
    )
}