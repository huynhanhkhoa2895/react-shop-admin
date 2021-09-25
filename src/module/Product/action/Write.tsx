import Form from "common/Form";
import useFormEvent from "common/Hooks/useFormEvent";
import FormType from 'module/Product/component'
import { useEffect } from "react";
const Write = (props: any) => {
    const formEvent = useFormEvent(props.menu)
    useEffect(() => {
        // formEvent.setForm("name","test")
        formEvent.setListener({
            "type": (value : any,setForm : any) => {
                console.log(`value`,value)
                // setForm("product_detail",value)
            },
        })
    },[])
    return (
        <>
            <Form
                formEvent={formEvent}
                menu={props.menu}
                formTypes={FormType}
            />
        </>
    )
}
export default Write