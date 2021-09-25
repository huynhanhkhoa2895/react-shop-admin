import React from 'react';
import Modules from 'Modules'
// import Add from './component/add/index'
// import View from './component/view/index'
// import Dashboard from './views/dashboard/Dashboard'
// import Report from './component/report/index'


// const List = React.lazy(() => import('./component/list'));



const initRoute = () => {
    let listRoute: any = []
    Modules.map((module) => {
        const ComponentModule = React.lazy(() => import('module/' + module));
        listRoute.push(
            { path: '/:module/', component: ComponentModule }
        )
    })
    return listRoute
}
const routes = initRoute();
export default routes;
