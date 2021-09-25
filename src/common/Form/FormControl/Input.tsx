import WithFormControl from "common/HOCs/WithFormControl";
import { forwardRef, } from "react";
const Input = (props: any,ref : any) => {
    return (
        <div className="form-group">
            {props.renderLabel}
            <input 
                type={props.type} 
                name={props.name} 
                id={props.id} 
                ref={ref} 
                className={"form-control"} 
                required={props.required && ("required")} 
                onChange={(e)=>props.onChange(e.target.value)}
            />
            {props.renderValidate}
        </div>
    )
}
export default WithFormControl(forwardRef(Input))