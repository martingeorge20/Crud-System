

export default function RadioCom (props) {

    return (
    <div className="form-check">
        <label className="form-check-label" htmlFor={props.radio}>
            {props.type}
        </label>
        <input className="form-check-input" type="radio" name="exampleRadios" id={props.radio} value={props.type}/>
    </div>
    )
}