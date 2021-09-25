import { createSelector } from 'reselect';
import { isEmpty,find } from 'lodash';

export const selectStore = (state : any) => 
!isEmpty(state) ? state : {};
export const selectorUser = () => 
createSelector(
    selectStore,
    state => (!isEmpty(state) ? state.user : {}),
);
export const selectorPermissions = () => 
createSelector(
    selectStore,
    state => (!isEmpty(state) ? state.permissions : {}),
);
export const selectorSidebarShow = () => 
createSelector(
    selectStore,
    state => (!isEmpty(state) ? state.sidebarShow : null),
);
export const selectorFormMenu = (menu : any) => 
createSelector(
    selectStore,
    state => {
        return (!isEmpty(state.form) && !isEmpty(menu) ? state.form[menu] : null)
    }
);
export const selectorFormMenuWithName = (menu : any,name : any) => 
createSelector(
    selectStore,
    state => {
        let crrForm : any = null;
        if(!isEmpty(state.form) && !isEmpty(menu)){
            crrForm = find(state.form[menu],(form : any)=> {
                return form.name === name
            })
        }
        return crrForm; 
    }
);
export const selectorFormMenuValueWithName = (menu : any,name : any) => 
createSelector(
    selectStore,
    state => {
        let crrForm : any = null;
        if(!isEmpty(state.form) && !isEmpty(menu)){
            crrForm = find(state.form[menu],(form : any)=> form.name === name)?.value
        }
        return crrForm; 
    }
);
export const selectorListenForm = (menu : any) => 
createSelector(
    selectStore,
    state => {
        let crrForm : any = null;
        if(!isEmpty(state.listenForm) && !isEmpty(menu)){            
            crrForm = state.listenForm[menu]
        }
        return crrForm
    }
);
export const selectorListenFormWithName = (menu : any,name : any) => 
createSelector(
    selectStore,
    state => {
        let crrForm : any = null;
        if(!isEmpty(state.listenForm) && !isEmpty(menu)){            
            const listenForm = state.listenForm[menu]
            if(!isEmpty(name)){
                crrForm = listenForm[name]
            }
        }
        return crrForm
    }
);