import React from "react";
import {Switch,Route} from "react-router-dom";
import Main from "./Views/Main/Main";
import About from "./Views/About/About";
import CanvasserLogin from "./Views/CanvasserLogin/CanvasserLogin";
import EnterProfile from "./Views/EnterProfile/EnterProfile";
import RecentlyAdded from "./Views/RecentlyAdded/RecentlyAdded";


export default (
    <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/enter-pin" component={CanvasserLogin}/>
        <Route exact path="/enter-profile" component={EnterProfile}/>
        <Route exact path="/recently_added" component={RecentlyAdded}/>
    </Switch>
)