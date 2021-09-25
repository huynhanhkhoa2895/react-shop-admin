import WithFormControl from "common/HOCs/WithFormControl";
import  { forwardRef, useState} from "react";
export default WithFormControl(forwardRef((props : any,ref : any) => {
    const [value,setValue] = useState<boolean>(props.value === 1 ? true : false)
    const handleChange = () => {
        setValue((value : boolean) => {
            props.onChange(!value)
            return !value
        })        
    }
    return(
        <div className="form-group">
            {props.renderLabel}
            <div className="custom-control custom-switch">
                <input 
                    ref={ref} 
                    type="checkbox" 
                    className="custom-control-input" 
                    id={props.id} 
                    name={props.name}
                    defaultChecked={value}
                    onChange={(e)=>handleChange()}
                />
                <label className="custom-control-label" htmlFor={props.id}/>
            </div>
        </div>

    )
}))