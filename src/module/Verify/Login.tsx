
import React, { useEffect, useState } from 'react';
import 'assets/verify.scss'
import bg from 'assets/img/bg.jpg';
import { useHistory } from 'react-router-dom';
import { setPermissions, updateState } from 'redux/action'
import { callApiFogetPassword, callApiLogin, DOMAIN } from 'api'
import { useDispatch } from 'react-redux';
import { toast, } from 'react-toastify'
import {
    CButton,
    CCol,
    CForm,
    CInput,
    CRow,
    CInvalidFeedback,
    CAlert
} from '@coreui/react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useQuery from 'common/Hooks/useQuery';
export default (props: any) => {
    const query = useQuery()
    const history = useHistory()
    const [email, setEmail] = useState<any>("")
    const [password, setPassword] = useState<any>("")
    const [err, setErr] = useState<any>("")
    const [errPass, setErrPass] = useState(false)
    const [errEmail, setErrEmail] = useState<any>(false)
    const [typeLogin, setTypeLogin] = useState(true)
    const distpatch = useDispatch();
    const [loading,setLoading] = useState(false)
    const _updateState = (key: any, value: any) => distpatch(updateState(key, value))
    const _setPermissions = (user: any) => distpatch(setPermissions(user))
    const inputChange = (type: any, event: any) => {
        if (type === "email") {
            setEmail(event.target.value)
        } else {
            setPassword(event.target.value)
        }
    }
    useEffect(() => {
        if(query.get("expired")){
            toast.error("Sorry! Your session has been expired");
        }
    },[])
    const handleLogin = async () => {
        if (email === "") {
            setErrEmail(true)
            setErr("")
        }
        if (password === "") {
            setErrPass(true)
            setErr("")
        }
        if (email != "" && password != "") {
            setErrEmail(false)
            setErrPass(false)
            setLoading(true)
            const result : any = await callApiLogin(email, password)
            const data = result.data;
            if (data.err === 1) {
                setErr("Email or Password was error")
                setLoading(false)
            } else {
                localStorage.setItem("user", JSON.stringify({...data.user,...{token : data.token}}))
                _updateState("user",data.user)
                history.push("/")
            }
        }
    }
    const handleKeypress = (e: any) => {
        if (e.charCode === 13) {
            handleLogin()
        }
    }
    const handleForgetPassword = async () => {
        if (email === "") {
            setErrEmail(true)
            setErr("")
        } else {
            const result: any = await callApiFogetPassword(email);
            if (result?.status === "ok") {
                toast.success("Chúng tôi sẽ gửi email, bạn vui lòng kiểm tra email")
                setErrEmail("")
                setErr("")
                setTypeLogin(true)
            }
        }

    }
    return (
        <div id="formLogin" className="wrapper fadeInDown">
            <div id="formContent">
                <div className="fadeIn first">
                    <div style={{ width: 100, height: 100, overflow: 'hidden', margin: "auto", borderRadius: 100 }}>
                        <img src={bg} id="icon" alt="User Icon" />
                    </div>
                </div>
                <CForm onKeyPress={(e)=>handleKeypress(e)}>
                    {
                        err && (
                            <CAlert color="danger">
                            {err}
                            </CAlert>
                        )
                    }
                    <CInput invalid={errEmail} className="fadeIn second" type="text" placeholder="Email" autoComplete="username" onChange={(e) => inputChange("email", e)} required />
                    {
                        errEmail && (
                        <CInvalidFeedback className="help-block">
                            Email is required
                        </CInvalidFeedback>
                        )
                    }
                    <CInput className="fadeIn third" invalid={errPass} type="password" placeholder="Password" autoComplete="current-password" onChange={(e) => inputChange("password", e)} required />
                    {
                        errPass && (
                        <CInvalidFeedback className="help-block">
                            Password is required
                        </CInvalidFeedback>
                        )
                    }
                    <CRow style={{padding : 10}}>
                        <CCol md="12">
                            <CButton color="primary" className="px-4" onClick={()=>handleLogin()} disabled={loading}>
                                {
                                    loading && (
                                        <FontAwesomeIcon style={{marginRight : 10}} icon={faSpinner} spin />
                                    )
                                }
                                
                                <span>Đăng nhập</span>
                            </CButton>
                        </CCol>
                    </CRow>
                    
                </CForm>
                <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div>
        </div>
    )
}