import {
    SAVE_LOCAL_STORAGE,
    UPDATE_STATE,
    SET_PERMISSIONS,
    CALL_API,
    LOGOUT,
    UPDATE_FORM_MENU,
    UPDATE_VALUE_FORM_MENU_WITH_NAME,
    UPDATE_LISTEN_FORM_WITH_NAME,
    ADD_MODULE,
    GET_LIST_WITH_MENU,
    LISTEN_FORM
} from "./constants"
export const saveLocalStorage = () => ({
    type: SAVE_LOCAL_STORAGE,
})

export const callApi = (module: any, param: any, callback: any) => ({
    type: CALL_API,
    module,
    param,
    callback
})

export const updateState = (key: any, value: any) => ({
    type: UPDATE_STATE,
    key,
    value
})

export const setPermissions = (user : any) => ({
    type: SET_PERMISSIONS,
    user
})
export const logout = (history : any) => ({
    type: LOGOUT,
    history
})
export const updateFormMenu = (menu : any,param : any) => ({
    type: UPDATE_FORM_MENU,
    menu,
    param
})
export const updateFormMenuWithName = (menu : any,name : any,value : any) => ({
    type: UPDATE_VALUE_FORM_MENU_WITH_NAME,
    menu,
    name,
    value
})
export const addData = (menu : any,param : any,cb : any) => ({
    type: ADD_MODULE,
    menu,
    param,
    cb
})
export const getListWithMenu = (menu : any,param : any) => ({
    type: GET_LIST_WITH_MENU,
    menu,
    param,
})
export const updateListenForm = (menu : any,param : any) => ({
    type: LISTEN_FORM,
    menu,
    param
})
export const updateListenFormWithName = (menu : any,name : any,param : any) => ({
    type: UPDATE_LISTEN_FORM_WITH_NAME,
    menu,
    name,
    param
})
export const listenFormSuccess = (menu : any,name : any,value : any) => ({
    type: LISTEN_FORM,
    menu,
    name,
    value
})