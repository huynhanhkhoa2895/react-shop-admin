export default (props : any) => {
    return(
        <div className="form-group">
            <div className="label-form-group">
                {props.label}
                {
                    props.required && <span className="require-field">*</span>
                }                
            </div>
            {props.children}
            {
                 props.required && (
                    <div className="invalid-feedback">
                        Field has problem
                    </div>
                 )
            }

        </div>
    )
}