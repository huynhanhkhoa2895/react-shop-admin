import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import { callApiGetList,callApiGetDelete } from 'api';
import { isEqual } from 'lodash';
import { ucfirst } from 'helpers';
import Loading from 'common/Loading';
import ImagePreview from 'common/ImagePreview';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'
import { Link } from 'react-router-dom';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast, } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
export default (props: any) => {
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(1)
    const [columns, setColumn] = useState([])
    const [data, setData] = useState([])
    const [pending, setPending] = useState(true);
    useEffect(() => {
        getListData(1, perPage);
    }, []);

    const getListData = async (newPage: any, limit: any) => {
        const result: any = await callApiGetList(props.menu, { page: newPage, limit: limit })
        const data: any = result.data;
        if (!isEqual(data.table.columns, columns)) {
            const renderSelector = (col: any, row: any) => {
                switch (col.type) {
                    case "img":
                        return <ImagePreview src={row[col.name]} />;
                    default:
                        return row[col.name]
                }
            }
            let newColumns = data.table.columns.map((val: any) => ({
                name: ucfirst(val.label),
                cell: (row: any) => renderSelector(val, row),
                sortable: val.type === "text",
            }))
            newColumns = newColumns.concat(getListAction())
            setColumn(newColumns);
        }
        if (!isEqual(data.table.total, total)) {
            setTotal(data.table.total)
        }
        let newData: any = [];
        data.table.rows.map((val: any) => {
            let newVal = {}
            Object.keys(val).map((key: any) => (
                newVal = { ...newVal, ...{ [key]: val[key] } }
            ))
            newData.push(newVal)
        })
        setData(newData)
        setPending(false)
    }
    const deleteData = (id : any) => {
        confirmAlert({
            title: 'Delete',
            message: 'Do you accept to delete ?',
            buttons: [
              {
                label: 'OK',
                onClick: async () => {
                    setPending(true)
                    const result: any = await callApiGetDelete(props.menu,id)
                    if(result.status === 200){
                        toast.success("This row have been deleted")
                        getListData(1, perPage);
                    }else{
                        toast.error("Sorry! We can't delete")
                        setPending(false)
                    }
                }
              },
              {
                label: 'Cancel',
                onClick: async () => {

                }
              },
            ]
        });
    }
    const getListAction = () => {
        const renderAction = (row : any) => {
            let xml : any = []            
            props.permission.map((permission : any,index : any)=>{
                switch (permission){
                    case "view":
                        xml.push(
                            <Link key={index} className={"mgr-10"} to={"/"+props.menu+"/view/"+row.id}><FontAwesomeIcon icon={faEye} /></Link>
                        )
                        break;
                    case "update":
                        xml.push(
                            <Link key={index} className={"mgr-10"} to={"/"+props.menu+"/write/"+row.id}><FontAwesomeIcon icon={faPencilAlt} /></Link>
                        )
                        break;
                    case "delete":
                        xml.push(
                            <span style={{color : "#321fdb",cursor : "pointer"}} onClick={()=>deleteData(row.id)} key={index} className={"mgr-10"}><FontAwesomeIcon icon={faTrash} /></span>
                        )
                        break;
                }
            })
            return xml;
        }
        return [{
            name : "Action",
            cell: (row: any) => renderAction(row),
        }]
    }
    const handlePageChange = (page: any) => {
        setPending(true)
        getListData(page, perPage)
    }
    const handlePerRowsChange = (newPerPage: any, page: any) => {
        setPending(true)
        setPerPage(newPerPage)
        getListData(page, newPerPage)
    }
    return (
        <CRow>
            <CCol xs="12" sm="12" md="12">
                <CCard>
                    <CCardHeader>
                        <CRow>
                            <CCol md="6">
                                <h3>{ucfirst(props.menu)}</h3>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        {
                            pending && <Loading />
                        }
                        <DataTable
                            actions={
                                <Link className="btn btn-primary" to={"/"+props.menu+"/write"}>Add</Link>
                            }
                            pagination
                            paginationServer
                            paginationTotalRows={total}
                            columns={columns}
                            data={data}
                            onChangeRowsPerPage={(perPage, page) => handlePerRowsChange(perPage, page)}
                            onChangePage={(page: any) => handlePageChange(page)}
                            progressPending={pending}
                            progressComponent={<Loading />}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}