import Form from "common/Form";
import useFormEvent from "common/Hooks/useFormEvent";
const Write = (props: any) => {
    const formEvent = useFormEvent(props.menu)
    return (
        <>
            <Form
                menu={props.menu}
            />
        </>
    )
}
export default Write