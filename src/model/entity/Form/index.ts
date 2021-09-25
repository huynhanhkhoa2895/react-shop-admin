import {initId} from "../../../helpers";
import IForm from "../../interface/Form";

export default class Form implements IForm {
    id : string = initId();
    value : any;
    getValue(): any { 
        return this.value;
    }
}