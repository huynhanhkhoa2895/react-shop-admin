import ImageUploader from "react-images-upload";
import WithFormControl from "common/HOCs/WithFormControl";
import { initId, toBase64 } from "helpers";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { CCol, CRow } from "@coreui/react";
import { DOMAIN_IMG } from "api";
export default WithFormControl(forwardRef((props: any, ref: any) => {
    const valueImg = props.value ? DOMAIN_IMG+props.menu+"/"+props.value : null
    const [image, setImage] = useState(valueImg)
    const onDrop = async (picture: any) => {
        const result: any = await toBase64(picture[0]);
        setImage(result)
        props.onChange(result)
        // setPictures([...pictures, picture]);
    };
    return (
        <div className="form-group">
            {props.renderLabel}            
            <CRow>
                <CCol md="6">
                    <ImageUploader
                        // {...props}
                        
                        singleImage
                        withIcon={true}
                        onChange={(file) => onDrop(file)}
                        imgExtension={[".jpg", ".gif", ".png"]}
                        // maxFileSize={204800}
                        label="Please choose your image must restrict under 2MB"
                    />
                </CCol>
                <CCol md="6">
                    {
                        ((image != null)) && (
                            <div className={"img-preview"}>
                                <img src={image} />
                            </div>
                        )
                    }
                </CCol>
            </CRow>

        </div>
    )
}))