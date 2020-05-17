import React from "react";
import { Switch, Route, } from "react-router-dom";

import App from "../App"
import Login from "../page/login/login";


export default () => {
	return (<Switch>
		<Route exact path="/login" component={Login} />
		<Route path="/" component={App} />
	</Switch>);
}

