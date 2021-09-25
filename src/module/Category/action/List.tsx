import ListTable from "common/ListTable"

const List = (props: any) => {
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