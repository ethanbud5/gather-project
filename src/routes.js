import React from "react";
import {Switch,Route} from "react-router-dom";
import Main from "./Views/Main/Main";


export default (
    <Switch>
        <Route exact to="/" component={Main}/>
    </Switch>
)