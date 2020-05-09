import React, { PureComponent } from "react";
import { Switch, Route } from "react-router-dom";
import Index from "../page/index/index";
import Authority from "../page/authority/authority";

class Pages extends PureComponent {
    render() {
        return (
            <Switch>
                 {/* 使用Redirect指定/index为默认首页 */}
                {/*<Route path="/" exact render={() => <Redirect to="/index" />} />*/}
                {/* <Route path="/login" component={Login} /> */}
                <Route path="/index" component={Index} />
                <Route path="/authority" component={Authority} />
            </Switch>
        );
    }
}

export default Pages;
