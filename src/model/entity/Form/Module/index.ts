import { remove } from "lodash";

export default class Module {
    menu : string
    action : Array<string> = ["list","write","view"];
    permission : Array<string> = ["list","write","view","update","delete"];
    constructor(menu : any){
        this.menu = menu;
    }
    setMenu(value : string){
        this.menu = value;
    }
    getMenu(){
        return this.menu;
    }
    getAction(){
        return this.action
    }
    getPermission(){
        return this.permission
    }
    addPermission(value : string){
        this.permission.push(value)
    }
    removePermission(value : string){
        remove(this.permission,(val)=>value === val)
        return this.permission;
    }
}