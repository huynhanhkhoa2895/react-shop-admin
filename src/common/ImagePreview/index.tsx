import React from 'react'
import noImg from 'assets/img/no-image.png'
import { empty } from 'helpers'
const ImagePreview = (props: any) => {
    return(
        <div className="image-preview">
            <img src={empty(props.src) ? noImg : props.src} />
        </div>
    )
}
export default ImagePreview