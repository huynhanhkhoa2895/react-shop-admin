import { find, isEmpty, isEqual } from 'lodash';
import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListenForm, updateFormMenuWithName,updateListenFormWithName } from 'redux/action';
import { selectorFormMenu, selectorListenForm } from 'redux/selector';
const useFormEvent = (menu : any) => {
    const distpatch = useDispatch()
    const crrAllFieldForm = useSelector(selectorFormMenu(menu))
    const crrFormListenForm = useSelector(selectorListenForm(menu))
    const [listenForm,setListenForm] = useState<any>()
    const [cache,setCache] = useState<any>([])
    const _updateFormMenuWithName = (name : any,value : any) => distpatch(updateFormMenuWithName(menu,name,value))
    const _updateListenForm = (param : any) => distpatch(updateListenForm(menu,param))
    const _updateListenFormWithName = (name : any,param : any) => distpatch(updateListenFormWithName(menu,name,param))
    useEffect(()=>{
        if(crrAllFieldForm != null){
            if(!isEmpty(cache)){
                for(const _cache of cache){
                    if(_cache.action === "setForm"){                    
                        setForm(_cache.name,_cache.value)
                    }
                }
                setCache([])
            }
        }
    },[crrAllFieldForm])
    useEffect(() => {
        if(crrFormListenForm != null){
            Object.keys(crrFormListenForm).map((name : any)=>{
                const listen = crrFormListenForm[name]
                if(listen.status){
                    const func = listenForm[name]
                    func(listen.value,setForm)
                    _updateListenFormWithName(name,{status : false,value : null})
                }
            })
        }
    },[crrFormListenForm])
    const setForm = (name : string, value : any) => {
        if(crrAllFieldForm != null){
            _updateFormMenuWithName(name,value)
        }else{
            setCache((cache : any)=>{
                const crrCache = [...cache]
                crrCache.push({action : "setForm",...{name,value}})
                return crrCache;
            })
        }
    }
    const setListener = (param : any) => {
        setListenForm(param);
        let arrListen : any = {}
        Object.keys(param).map((name : any)=> {arrListen[name] = {status : false,value : null}})
        _updateListenForm(arrListen);
    }
    return {
        setForm : (name : string, value : any) => setForm(name,value),
        setListener : (param : any) => setListener(param)
    }
}
export default useFormEvent