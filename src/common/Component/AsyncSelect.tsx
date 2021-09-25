import AsyncSelect from 'react-select/async';
import {useEffect,useMemo,useState} from 'react'
import { callApiGetList } from 'api';
import { find, isEmpty, isEqual  } from 'lodash';
import { initId } from 'helpers';
export default (props : any) => {
    let crrSearch : any = ""
    let componentMounted = true;
    const [crrDefaultValue,setCrrDefaultValue] = useState(null)
    const [crrOptions,setCrrOptions] = useState<any>([])
    const [isFirst,setIsFirst] = useState(true)
    useEffect(() => {
      return () => { 
          componentMounted = false;
      }
    },[])
    const getListOptions = async (search : any) => {
      const result : any = await callApiGetList(props.model,{page : 0,search : [["name"],search]})
      let options = [];
      const data = result?.data?.table?.rows
      if(data != null){ 
        options = data.map((item : any)=>({
          label : item.name,
          value : item.id
        }))        
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
    const renderAsyncSelect = useMemo(() =>{     
      return <AsyncSelect
        key={initId()}
        onChange={(value : any)=>props.onChange(value.value)}
        name={props.name}
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        defaultValue={crrDefaultValue}
      />
    },[crrDefaultValue])
    function loadOptions(inputValue : any,callback :any){
      crrSearch = inputValue
      setTimeout(()=>{
        if(isEqual(crrSearch,inputValue)){
          new Promise((resolve,reject) => {
            const result : any = getListOptions(inputValue)
            resolve(result)
          }).then((result) => {
            if (componentMounted){
              setCrrOptions(result)
            }
            
            return callback(result)
          }).catch((error : any) => callback(error, null))   
        }
      },3000)
    }
    return (
      <>
        {renderAsyncSelect}
      </>
    );
}