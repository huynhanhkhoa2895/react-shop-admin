import React from "react";

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { strtolower, ucfirst } from 'helpers';

export default (props: any) => {
    const moduleEntity = props.moduleEntity

    return (
        <Switch>
            {moduleEntity.getAction().map((action: string, idx: any) => {
                const listRoute : any = [];
                const ComponentModule = React.lazy(() => import('module/' + ucfirst(moduleEntity.getMenu()) + '/action/' + ucfirst(action)));
                if(action === "write" || action === "view"){
                    listRoute.push(
                        <Route
                            key={idx}
                            path={"/" + moduleEntity.getMenu() + "/" + action + "/:id"}
                            render={props => (
                                <ComponentModule menu={moduleEntity.getMenu()} permission={moduleEntity.getPermission()} {...props} />
                        )} />
                    )
                }
                listRoute.push(
                    <Route
                        key={idx}
                        path={"/" + moduleEntity.getMenu() + "/" + action}
                        exact={true}
                        render={props => (
                            <ComponentModule menu={moduleEntity.getMenu()} permission={moduleEntity.getPermission()} {...props} />
                    )} />
                )

                

                return (
                    listRoute
                )
            })}
            <Redirect from={"/" + strtolower(moduleEntity.getMenu())} to={"/" + strtolower(moduleEntity.getMenu()) + "/" + moduleEntity.getAction()[0]} />
        </Switch>
    )
}