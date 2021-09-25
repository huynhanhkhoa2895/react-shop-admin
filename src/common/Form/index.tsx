import CIcon from "@coreui/icons-react";
import { CAlert, CButton } from "@coreui/react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { callApiGetForm, callApiPostForm } from "api";
import { empty, initId,ucfirst, validURL } from "helpers";
import React, { Component, createRef, useEffect, useMemo, useState } from "react";
import Image from "./FormControl/Image";
import Input from "./FormControl/Input";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'
import Loading from "common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addData, updateFormMenu } from "redux/action";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import formTypes from "./type";
import { selectorFormMenu } from "redux/selector";
import { isEmpty } from "lodash";
import {toast} from "react-toastify"
export default (props: any) => {
    const {id} = useParams<any>()
    const history = useHistory()
    const FormTypes = {...formTypes,...(props.formTypes || {})};
    const distpatch = useDispatch()
    const formEl: any = createRef();
    const [err,setErr] = useState<any>([]);
    const [isValidate,setIsValidate] = useState<any>(false)
    const [listForm, setForm] = useState<any>([])
    const [isLoading, setLoading] = useState<any>(true)
    const _updateFormMenu = (param : any) => distpatch(updateFormMenu(props.menu,param))
    const _addData = (param : any,cb : any) => distpatch(addData(props.menu,param,cb))
    const formWithName = useSelector(selectorFormMenu(props.menu))
    useEffect(() => {
        getApiMenu();
    }, [])
    function onSubmit(e: any) {
        e.preventDefault();
        e.stopPropagation();
        setIsValidate(true);
        setLoading(true);
        const param : any = {}
        formWithName.map((form : any)=>{
            const value = form.value
            if(id == null){
                param[form.name] = value
            }else{ // trường hợp update
                if(value != null){
                    param[form.name] = value
                }
            }
        })
        if(!empty(id)){
            param.id = id;
        }
        setLoading(false);
        if(isEmpty(props.onSubmit)){
            const postParamSuccess = (status : any,data : any) => {                      
                if(status != 200){
                    setLoading(false);
                    setErr(data.errors)
                }else{
                    history.push("/"+props.menu+"/list")
                    toast.success("Data has add success")
                }
            }
            _addData(param,postParamSuccess);
        }else{
            props.onSubmit(param)
        }
    }
    const renderError = useMemo(() => {
        let xhml : any = []
        Object.keys(err).map((keyErr : any,index : any) => {
            const item = err[keyErr]
            xhml.push(
                <CAlert key={index} color="danger">{item}</CAlert>
            )
        })
        return(
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    {xhml}
                </CCol>
            </CRow>
        )
    },[err])
    const getApiMenu = async () => {
            const result: any = await callApiGetForm(props.menu,id)
            const data: any = result.data;
            setLoading(false)
            if(data.formwrite != null){
                setForm(data.formwrite)
                _updateFormMenu(data.formwrite)
            }
    }
    const renderFormControl = useMemo(() => {
        let xhtml: any = []        
        listForm.map((form: any) => {
            let _xhtml : any = null
            const FormControlType : any = FormTypes[form.type];
            if(FormControlType != null){
                _xhtml = <FormControlType key={initId()} form={form} menu={props.menu} />
            }
            xhtml.push(
                <CCol className={form.type === "hidden" ? "none" : ""} key={"form"+form.name} md={form.fullWidth ? 12 : 6}>
                    {_xhtml}
                </CCol>
            )

        })
        return xhtml
    },[listForm])
    return (
        <>
            <CRow>
                <CCol xs="12" sm="12" md="12">
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol md="6">
                                    <h3>{ucfirst(props.menu)}</h3>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            {
                                isLoading && <Loading />
                            }
                            <form className={isValidate ? "was-validated" : ""} ref={formEl} method="post" onSubmit={(e: any) => onSubmit(e)} encType='multipart/form-data' noValidate>
                                {renderError}
                                <CRow>
                                    {renderFormControl}
                                </CRow>                                
                                <CButton type="submit" size="sm" color="primary"><FontAwesomeIcon icon={faCheck} /> Submit</CButton>
                            </form>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}