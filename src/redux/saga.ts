import { takeLatest, call, put, select } from 'redux-saga/effects';
import { 
    SAVE_LOCAL_STORAGE,
    ADD_MODULE,
    UPDATE_VALUE_FORM_MENU_WITH_NAME,
} from './constants';
import { callApiPostForm } from 'api';
import { selectorListenFormWithName } from './selector';
import { isEmpty } from 'lodash';
import { updateListenFormWithName } from './action';
function* _saveLocalStorage(){

}
export function _callApiPostForm(menu : any,param : any) : any{
    const result : any = callApiPostForm(menu,param)
    return result
}
function* _addModule(payLoad : any) : any{
    const {menu,param,cb} = payLoad
    const result : any = yield call(_callApiPostForm,menu,param);
    let data,status;
    if(result?.data == null){
        status = 422
        data = result.error.response.data
    }else{
        status = 200
        data = result.data.data
    }
    cb(status,data)
}
function* _updateFormMenuWithName(payLoad : any) : any{
    const {menu,name,value} = payLoad
    const crrListenForm = yield select(selectorListenFormWithName(menu,name))
    if(!isEmpty(crrListenForm)){
        if(!crrListenForm.status){
            const newParam = {status : true,value : value}
            yield put(updateListenFormWithName(menu,name,newParam))
        }
    }
    
}
export default function* rootSaga() {
    yield takeLatest(SAVE_LOCAL_STORAGE, _saveLocalStorage);
    yield takeLatest(ADD_MODULE, _addModule);
    yield takeLatest(UPDATE_VALUE_FORM_MENU_WITH_NAME, _updateFormMenuWithName);
}