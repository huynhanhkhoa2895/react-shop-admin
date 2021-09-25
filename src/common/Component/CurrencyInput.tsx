import { isEmpty } from 'lodash';
import CurrencyInput from 'react-currency-input-field';
export default (props : any) => {
    const handleChange = (value : string,name : string) => {
        if(!isEmpty(value)){
            props.onChange && props.onChange(value)
        }
        
    }
    return(
        <CurrencyInput
            className="form-control"
            placeholder="Please enter a currency"
            defaultValue={props.value || ''} 
            decimalsLimit={0}
            prefix={"$"}
            // suffix={"$"}
            onValueChange={(value : any, name : any) => handleChange(value,name)}
        />
    )
}