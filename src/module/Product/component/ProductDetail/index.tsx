import { CCard, CCardBody, CRow,CCol } from "@coreui/react"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState,useEffect,forwardRef,useRef } from "react"
import ProductDetailItem from "./ProductDetailItem";
import WithFormControl from "common/HOCs/WithFormControl";
import Modal from 'react-bootstrap/Modal'
import { Button } from "react-bootstrap";
import { initId, ucfirst } from "helpers";
import ListGroup from 'react-bootstrap/ListGroup'
import $ from "jquery"
import {isEmpty, isEqual, remove} from "lodash"
export default WithFormControl(forwardRef((props : any,ref : any) => {
    const productDetailRef : any = useRef(null)
    const [modalShow,setModalShow]=useState<any>({status : false})
    const [listItem,setListItem] = useState(props.value || []);
    const [maxHeightModalBody,setMaxHeightModalBody] = useState<any>()
    useEffect(() => {
        if(modalShow.status){
            const totalMaxHeight : any = parseFloat(($((window as any)).outerHeight() as any)) - parseFloat(($(".modal-header").outerHeight() as any)) - parseFloat(($(".modal-footer").outerHeight() as any)) - 58
            if(!isEqual(maxHeightModalBody,totalMaxHeight)){
                setMaxHeightModalBody(totalMaxHeight)
            }
        }
        
        // setMaxHeightModalBody()
    },[modalShow])
    useEffect(() => {
        props.onChange && props.onChange(listItem)
    },[listItem])
    const renderListItem = useMemo(()=>{
        let xhtml : any = [];
        listItem.map((item : any,key : any)=>{
            xhtml.push(
                <ListGroup.Item className="relative" key={initId()} >
                    <div className="cursor" onClick={()=>handleClickItem(item)}><b>{ucfirst(item.name)}</b></div>
                    <div className="card-close " onClick={()=>handleRemove(item.sku)}>
                        <span className="icon-close"><FontAwesomeIcon icon={faTimes} /></span>
                    </div>
                </ListGroup.Item>
            )
        })
        return(<>
            {xhtml.length > 0 && (
                <ListGroup className="relative mgb10">
                    {xhtml}
                </ListGroup>
            )}
        </>)
    },[listItem])
    const handleClickItem = (data : any) => {
        setModalShow({status : true,data : data});
        return data
    }
    const handleRemove = (sku : any) => {
        setListItem((listItem : any)=>{
            let _listItem = [...listItem]
            remove(_listItem,(item)=>item.sku === sku)
            return _listItem;
        })
    }
    const handleClick = () => {
        setModalShow({status : true});
    }
    const saveData = (data : any) => {
        if(!isEmpty(data)){
            setListItem((listItem : any)=>{
                const _listItem = [...listItem]
                _listItem.push(data);
                setModalShow({ status : false,data : {} })
                return _listItem
            })
            
        }
    }
    const renderProductDetail = useMemo(() => {
        return(
            <>
                {modalShow.status && (
                    <ProductDetailItem 
                        key={initId()} 
                        ref={productDetailRef} 
                        value={modalShow.data}
                        handleRemove={(index : any)=>handleRemove(index)} 
                        saveData={(data : any)=>saveData(data)}
                    />
                )}
            </>
        )
    },[modalShow])
    return(
        <>
            <CRow>
                <CCol md="12">
                    <div className="form-group">
                        <a className="btn btn-link pdl0" onClick={()=>handleClick()}><FontAwesomeIcon icon={faPlus}  /> Add New Product</a>
                    </div>
                </CCol>
            </CRow>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow.status}
                onHide={() => setModalShow({status : false,data : {} })}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Product Detail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: maxHeightModalBody}}>
                    {renderProductDetail}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow({status : false,data : {} })} >Close</Button>
                    <Button type="button" onClick={() => {
                        if(productDetailRef != null && productDetailRef.current != null){
                            productDetailRef.current.saveData();
                        }
                    }}>Save Info</Button>
                </Modal.Footer>
            </Modal>
            <CRow>
                <CCol md="12">
                    {renderListItem}
                </CCol>
            </CRow>
            
        </>
    )
}))
