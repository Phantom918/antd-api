import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Index from "../page/index/index";
import Login from "../page/login/login";

class Router extends PureComponent {
    render() {
        return (
            <Switch>
                 {/* 使用Redirect指定/index为默认首页 */}
                {/*<Route path="/" exact render={() => <Redirect to="/index" />} />*/}
                {/* <Route path="/login" component={Login} /> */}
                <Route path="/index" component={Index} />
            </Switch>
        );
    }
}

export default Router;
