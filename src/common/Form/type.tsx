import Image from "./FormControl/Image";
import Input from "./FormControl/Input";
import SelectHook from "./FormControl/SelectHook";
import SwitchHook from "./FormControl/SwitchHook";
import TextareaHook from "./FormControl/TextareaHook";
import {
    KEY_TYPE_TEXT,
    KEY_TYPE_HIDDEN,
    KEY_TYPE_SELECT,
    KEY_TYPE_NUMBER,
    KEY_TYPE_IMG,
    KEY_TYPE_BOOLEAN,
    KEY_TYPE_TEXTAREA
} from "./keyType";

const INPUT = Input;
const SELECT = SelectHook;
const IMG = Image;
const TEXTAREA = TextareaHook;
const BOOLEAN = SwitchHook;

const formTypes : any =  {
    [KEY_TYPE_TEXT] :  INPUT,
    [KEY_TYPE_HIDDEN] :  INPUT,
    [KEY_TYPE_SELECT] :  SELECT,
    [KEY_TYPE_NUMBER] :  INPUT,
    [KEY_TYPE_IMG] :  IMG,
    [KEY_TYPE_TEXTAREA] :  TEXTAREA,
    [KEY_TYPE_BOOLEAN] : BOOLEAN,
}
export default formTypes
