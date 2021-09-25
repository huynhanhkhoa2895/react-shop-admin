import { callApiCheckSku } from "api"
import AsyncSelect from "common/Component/AsyncSelect"
import CurrencyInput from "common/Component/CurrencyInput"
import Image from "common/Component/Image"
import Switch from "common/Component/Switch"
import Textarea from "common/Component/Textarea"
import FormGroup from "common/Form/FormGroup"
import Loading from "common/Loading"
import { empty, slug } from "helpers"
import { useState,forwardRef,useImperativeHandle,useEffect } from "react"
import { toast } from "react-toastify"

export default forwardRef((props : any,ref : any) => {
    const required = [
        "sku",
        "name",
        "price",
        "description",
        "img"
    ];
    const [data,setData] = useState<any>(props.value || {});
    const [isLoading,setLoading] = useState(false)
    const handleChange = (name : any,value : any) => {

        setData((data : any)=>{
            const _data = {...data}
            _data[name] = value
            if(name === "name"){
                _data.sku = slug(value)
            }
            return _data;
        })
        
    }
    useImperativeHandle(ref, () => ({
        async saveData(){
            
            let check = true;
            let fieldEmpty : any = []

            required.map((field : any)=>{
                if(empty(data[field])){
                    fieldEmpty.push(field)
                    check = false
                }
            })
            if(data['price'] > data['old_price']){
                toast.warning(<>Old price must be more expensive than price</>);
                check = false
                return false
            }
            if(data['sku']){
                setLoading(true)
                const result : any = await callApiCheckSku(data['sku'])
                setLoading(false)
                if(!result.data?.status){
                    toast.warning(<>Sku has already exist</>);
                    check = false
                    return false
                }
                
            }
            if(check){
                toast.success(<>Add one Item success</>);
                props.saveData(data)
            }else{
                toast.error(<>Field <b>{fieldEmpty.join(", ")}</b> is required</>);
            }
            
        }    
    }));
    const changeSku = () => {
        if(!empty(data.name)){
            
            setData((data : any) =>{
                const _data = {...data}
                _data.sku = slug(_data.name)
                return _data
            })
        }
    }
    return(
        // <div className="card-close" onClick={()=>props.handleRemove(props.index)}>
        //     <span className="icon-close"><FontAwesomeIcon icon={faTimes} /></span>
        // </div>
        <>
            {
                isLoading && <Loading />
            }
            <div className="row">
                <div className="col-6">
                    <FormGroup label="SKU" required>
                        <div className="row">
                            <div className="col-9">
                                <input
                                    defaultValue={data.sku}
                                    className={"form-control"}
                                    onChange={(e)=>handleChange("sku",e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="pdl0 col-3">
                                <button type="button" onClick={()=>changeSku()} className="btn btn-primary" style={{whiteSpace: 'nowrap',fontSize : 11}}>New Sku</button>
                            </div>
                        </div>
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup label="Name Product Detail" required>
                        <input
                            defaultValue={data.name}
                            className={"form-control"}
                            onChange={(e)=>handleChange("name",e.target.value)}
                        />
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup label="Color">
                        <AsyncSelect 
                            value={data.color_id}
                            model={"color"}
                            onChange={(value : any)=>handleChange("color_id",value)}
                        />
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup label="Style">
                        <AsyncSelect 
                            model={"style_id"}
                            value={data.style}
                            onChange={(value : any)=>handleChange("style_id",value)}
                        />
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup label="Old Price">
                        <CurrencyInput 
                            value={data.old_price}
                            onChange={(value : any)=>handleChange("old_price",value)}
                        />
                    </FormGroup>
                </div>
                <div className="col-6">
                    <FormGroup label="Current Price" required>
                        <CurrencyInput 
                            value={data.price}
                            onChange={(value : any)=>handleChange("price",value)}
                        />
                    </FormGroup>
                </div>
                <div className="col-12">
                    <FormGroup label="Description" required>
                        <Textarea 
                            value={data.description}
                            onChange={(value : any)=>handleChange("description",value)}
                        />
                    </FormGroup>
                </div>
                <div className="col-12">
                    <FormGroup label="Image" required>
                        <Image
                            value={data.img}
                            isSingle={false}
                            onChange={(value : any)=>handleChange("img",value)}
                        />
                    </FormGroup>
                </div>
                <div className="col-12">
                    <FormGroup label="Active" required>
                        <Switch 
                            value={data.active}
                            onChange={(value : any)=>handleChange("active",value)}
                        />
                    </FormGroup>
                </div>
            </div>
        </>
    )
})
