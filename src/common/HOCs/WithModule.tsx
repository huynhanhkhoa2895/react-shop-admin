import React,{ Component } from "react"

const WithModule = (WrappedComponent : any) => {
    return class extends Component{
        render() {
            return <WrappedComponent />;
        }
    }
}
export default WithModule