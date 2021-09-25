import { findIndex, isEmpty } from "lodash"
import { useEffect,useMemo, useState } from "react"
import Select from 'react-select';
export default  (props : any) => {
    const [options,setOptions] = useState<any>(props.options || [])
    useEffect(() => {
        if(!isEmpty(props.options)){
            setOptions(props.options)
        }
    },[props.options])
    const handleChange = (value : any) => {
        props.onChange(value)
    }
    const renderSelect = useMemo(()=>{
        let defaultValueIndex : any = 0;
        if(options.length > 0 && props.value != null) {
            defaultValueIndex = findIndex(options,(item : any)=> item.value === props.value)
        }
        
        return <Select 
            defaultValue={options[defaultValueIndex]}
            options={options}
            onChange={(value : any)=>handleChange(value.value)}
        />
    },[options])
    return(
        <>
            {renderSelect}
        </>
    )
}