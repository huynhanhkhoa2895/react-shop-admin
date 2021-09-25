import { initId } from "helpers";
import  {  useState} from "react";
export default (props : any) => {
    const id = initId()
    const [value,setValue] = useState<boolean>(props.value === 1 || props.value ? true : false)
    const handleChange = () => {
        props.onChange && props.onChange(!value)
        setValue((value : boolean) => {
            return !value
        })        
    }
    return(
            <div className="custom-control custom-switch">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id={id} 
                    name={props.name}
                    defaultChecked={value}
                    onChange={()=>handleChange()}
                />
                <label className="custom-control-label" htmlFor={id}/>
            </div>

    )
}