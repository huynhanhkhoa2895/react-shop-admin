import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import {forwardRef,useEffect,useMemo,useState} from 'react'
import WithFormControl from "common/HOCs/WithFormControl";
import { callApiGetList } from 'api';
import { find, isEmpty, isEqual  } from 'lodash';
import { initId } from 'helpers';
export default WithFormControl(forwardRef((props : any,ref : any) => {
    let crrSearch : any = ""
    const [crrDefaultValue,setCrrDefaultValue] = useState(null)
    const [crrOptions,setCrrOptions] = useState<any>([])
    const [isFirst,setIsFirst] = useState(true)
    const getListOptions = async (search : any) => {
      const result : any = await callApiGetList(props.form.model,{page : 0,search : [["name"],search]})
      let options = [];
      const data = result?.data?.table?.rows
      if(data != null){ 
        options = data.map((item : any)=>({
          label : item.name,
          value : item.id
        }))        
        // setOptions(options)
      }
      return options
    }
    useEffect(() => {
      if(props.value != null && crrOptions != null && crrOptions.length > 0 && isFirst){
        const newDefaultValue = find(crrOptions,(val : any)=>val.value == props.value)
        if(!isEmpty(newDefaultValue)){
          setCrrDefaultValue(newDefaultValue)
          setIsFirst(false)
        }
      }
    },[props.value,crrOptions])
    useEffect(() => {
      if(!isEmpty(props.form.options)){
        const options : any = props.form.options.map((item : any)=>({label : item,value : item}))
        setCrrOptions(options)
      }
    },[props.form.options])
    const renderAsyncSelect = useMemo(() =>{     
      return <AsyncSelect
        key={initId()}
        onChange={(value : any)=>props.onChange(value.value)}
        name={props.name}
        ref={ref} 
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        defaultValue={crrDefaultValue}
      />
    },[crrDefaultValue])
    const renderSelect = useMemo(() =>{  
      return <Select 
        key={initId()}
        defaultValue={crrOptions[0]}
        onChange={(value : any)=>props.onChange(value.value)}
        name={props.name}
        ref={ref} 
        options={crrOptions}
      />
    },[crrOptions])
    function loadOptions(inputValue : any,callback :any){
      crrSearch = inputValue
      setTimeout(()=>{
        if(isEqual(crrSearch,inputValue)){
          new Promise((resolve,reject) => {
            const result : any = getListOptions(inputValue)
            resolve(result)
          }).then((result) => {
            setCrrOptions(result)
            return callback(result)
          }).catch((error : any) => callback(error, null))   
        }
      },3000)
    }
    return (
      <div className="form-group">
        {props.renderLabel}
        {isEmpty(props.form.options) ? renderAsyncSelect : renderSelect}
      </div>

      );
}))