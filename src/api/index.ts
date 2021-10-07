import axios from "axios";
import $ from 'jquery';

export const DOMAIN = process.env.REACT_APP_API + "api/admin/";
export const DOMAIN_IMG = process.env.REACT_APP_API + "storage/image/";

export const callApiCheckSku = (sku: any) => {
    return axios.get(DOMAIN + "check-sku?"+$.param({ sku: sku}), {
        headers: header(),
    }).catch(error => handleError(error));
}

export const callApiLogin = (username: any, password: any) => {
    return axios.post(DOMAIN + "login", { email: username, password: password }, {
    }).catch(error => handleError(error));
}
export const callApiLogout = () => {
    return axios.post(DOMAIN + "logout", { },{
        headers: header(),
    }).catch(error => handleError(error));
}
export const callApiPostForm = (module: any, param : any) => {
    return axios.post(DOMAIN +module+ "/add", param, {
        headers: header(),
    }).catch(error => handleError(error));
}
export const callApiGetList = (module : string,param : any) => {
    return axios.get(DOMAIN +module+"/list?"+$.param(param), {
        headers: header(),
    }).catch(error => handleError(error));
}
export const callApiGetListOption = (module : string,param : any) => {
    return axios.get(DOMAIN +module+"/list?"+$.param(param), {
        headers: header(),
    }).catch(error => handleError(error));
}
export const callApiGetForm = (module : string,id : string) => {
    return axios.get(DOMAIN +module+"/add?"+$.param({id : id}), {
        headers: header(),
    }).catch(error => handleError(error));
}
export const callApiGetDelete = (module : string,id : string) => {
    return axios.delete(DOMAIN +module+"/delete/"+id, {
        headers: header(),
    }).catch(error => handleError(error));
}

export const callApiResetPassword = (token: any, email: any, password: any, password_confirmation: any) => {
    return axios.post(DOMAIN + `auth/reset-password/` + token, { email: email, password: password, password_confirmation: password_confirmation }, {
        headers: header
    }).catch(error => handleError(error));
}
export const callApiFogetPassword = (email: any) => {
    return axios.post(DOMAIN + `auth/forgot-password`, { email: email }, {
        headers: header()
    }).catch(error => handleError(error));
}
export const header = () => {
    const user = JSON.parse((localStorage.getItem("user") as any));
    return {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + user.token
    }
}
export const checkToken = (data: any, history: any) => {
    if (data.status === 401) {
        localStorage.removeItem("user")
        if (history != null) {
            history.push("/login")
        }
    } else {
        return data
    }
}
const handleError = (err: any) => {
    if(err.response != null && err.response.status === 401){
        localStorage.removeItem("user")
        document.location.href = "/login?expired=true"
    }else{
        return {error : err}
    }
}