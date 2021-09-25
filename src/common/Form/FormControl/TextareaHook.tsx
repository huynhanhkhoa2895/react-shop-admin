import WithFormControl from "common/HOCs/WithFormControl";
import { forwardRef,useState,useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import { selectorFormMenuValueWithName } from "redux/selector";
const TextareaHook = (props: any,ref : any) => {
    const crrForm = useSelector(selectorFormMenuValueWithName(props.menu,props.name))
    const [value, setValue] = useState('');
    useEffect(() => {
        setValue(crrForm ?? '');
    },[crrForm])
    const handleChange = (value : any) => {
        props.onChange(value)
    }
    return (
        <div className="form-group" style={{height: 210,marginBottom : 0}}>
            {props.renderLabel}
            <ReactQuill 
                style={{height: 145}}
                theme="snow" 
                value={value} 
                onChange={(value : any)=>handleChange(value)}
            />
            {props.renderValidate}
        </div>
    )
}
export default WithFormControl(forwardRef(TextareaHook))
