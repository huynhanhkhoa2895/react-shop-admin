import ListTable from "common/ListTable"
import { useEffect } from "react";
import { io } from "socket.io-client";
const List = (props: any) => {
    const socket = io("http://localhost:8080");
    useEffect(() => {
    },[])
    return (
        <>
            <ListTable
                menu={props.menu}
                permission={props.permission}
            />
        </>
    )
}
export default List