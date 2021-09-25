import ImageUploader from "react-images-upload";
import { initId, toBase64 } from "helpers";
import { useMemo, useRef, useState } from "react";
import { CCol, CRow } from "@coreui/react";
import { isEmpty } from "lodash";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default (props: any) => {
    const ref=useRef(null)
    console.log(`props.value`,props.value)
    const [images, setImages] = useState<Array<string>>(props.value || []);
    const [resetImg, setResetImg] = useState(0);
    const onDrop = async (pictures: any) => {
        const results = new Array<string>();
        for(let picture of pictures){
            const result: any = await toBase64(picture);
            results.push(result);
        }
        setImages(results)
        props.onChange && props.onChange(results)
    };
    const renderImagePreview = useMemo(()=>{
        console.log(`props.value images`,images)
        return(
            <div className={"img-preview"}>
                {images != null && images.length > 0 && (     
                    images.map((image : string) => !isEmpty(image) && <img key={initId()} src={image} />)                           
                )}
            </div>    
        )
    },[images])
    const renderImageUploader = useMemo(()=>{
        if(resetImg > 0) setImages(new Array<string>())
        return(
            <ImageUploader
            // {...props}
                key={resetImg}
                ref={ref}
                singleImage={props.isSingle == null ? true : props.isSingle}
                withIcon={true}
                onChange={(file) => onDrop(file)}
                imgExtension={[".jpg", ".gif", ".png"]}
                // maxFileSize={204800}
                label="Please choose your image must restrict under 2MB"
            />
        )
    },[resetImg])
    return (
        <div className="form-group">
            {props.renderLabel}            
            <CRow>
                <CCol md="6">
                    {renderImageUploader}
                </CCol>
                <CCol md="6">
                    <div className="text-right mrb10 cursor">
                        <a href={void(0)} className="bth btn-link" onClick={()=>setResetImg((resetImg)=>resetImg+1)}><FontAwesomeIcon icon={faTrash} /> Clear</a>
                    </div>
                    {renderImagePreview}
                </CCol>
            </CRow>

        </div>
    )
}