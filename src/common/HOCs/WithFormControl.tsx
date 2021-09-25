import { initId } from "helpers";
import { findIndex, isEmpty, isEqual } from "lodash";
import React, { Component, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormMenu, updateFormMenuWithName } from "redux/action";
import { selectorFormMenuWithName ,selectorFormMenu} from "redux/selector";

export default (WrappedComponent: any, data: any = null) => {
    return (props: any) => {
        const distpatch = useDispatch()
        const ref: any = useRef(null)
        const crrForm = useSelector(selectorFormMenuWithName(props.menu,props.form.name))
        const _updateFormMenuWithName = (value : any) => distpatch(updateFormMenuWithName(props.menu,props.form.name,value))
        const id = initId()
        useEffect(() => {
            if (ref != null && ref.current != null) {
                if (props.value != null) {
                    ref.current.value = props.value
                }
            }
        }, [ref])
        useEffect(() =>{
            if(!isEmpty(crrForm) && ref.current != null){
                if(!isEqual(crrForm.value,ref.current.value)){
                    ref.current.value = crrForm.value;
                }
            }            
        },[crrForm])
        const renderLabel = useMemo(() => {
            return(
                <div className="label-form-group">
                    {props.form.label}
                    {
                        props.form.require && (
                            <span className="require-field">*</span>
                        )
                    }                    
                </div>
            )
        },[props.form.label])
        const renderValidate = useMemo(() => {
            return(
                <div className="invalid-feedback">
                    Field has problem
                </div>
            )
        },[props.form.require])
        const onChange = (value : any) => {
            _updateFormMenuWithName(value)
        }
        const forceSetForm = (name : string,value : string) => {
            props.formEvent.setForm(name,value)
        }
        const renderWrappedComponent =  useMemo(()=>{
            if(crrForm != null) {
                return(
                    <WrappedComponent 
                        ref={ref}
                        id={id} 
                        data={data}
                        renderLabel={renderLabel}
                        renderValidate={renderValidate}
                        name={crrForm.name}
                        value={crrForm.value}
                        type={crrForm.type}
                        required={crrForm.require}
                        onChange={(value : any)=>onChange(value)}
                        setForm={(name : string,value : string)=>forceSetForm(name,value)}
                        {...props} 
                    />
                )
            }else{
                return <></>
            }

        },[crrForm])
        return (
            <>
                {renderWrappedComponent}
            </>
        )
    }
}