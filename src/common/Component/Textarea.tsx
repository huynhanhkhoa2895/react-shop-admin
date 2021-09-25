import WithFormControl from "common/HOCs/WithFormControl";
import { forwardRef,useState,useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Textarea = (props: any) => {
    const handleChange = (value : any) => {
        props.onChange && props.onChange(value)
    }
    return (
        <div className="form-group" style={{height: 210}}>
            {props.renderLabel}
            <ReactQuill 
                style={{height: 145}}
                theme="snow" 
                defaultValue={props.value || ''}
                onChange={(value : any)=>handleChange(value)}
            />
            {props.renderValidate}
        </div>
    )
}
export default Textarea
