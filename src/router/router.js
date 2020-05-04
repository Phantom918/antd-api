import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Index from "../main/index/index";
import Login from "../main/login/login";

class Router extends PureComponent {
    render() {
        return (
            <Switch>
                {/* 使用Redirect指定/index为默认首页 */}
                <Route path="/" exact render={() => <Redirect to="/index" />} />
                <Route pat="/login">
                    <Login />
                </Route>
                <Route path="/index">
                    <Index />
                </Route>
            </Switch>
        );
    }
}

export default Router;
