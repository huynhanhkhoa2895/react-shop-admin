import Acl from 'common/Acl';
import Module from 'model/entity/Form/Module';
import {
    useParams
} from "react-router-dom";
const Container = () => {
    const { module } = useParams<any>()
    const moduleEntity = new Module(module)
    return (
        <Acl moduleEntity={moduleEntity} />
    )
}
export default Container