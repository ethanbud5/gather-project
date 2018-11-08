import React from "react";
import {Switch,Route} from "react-router-dom";
import Main from "./Views/Main/Main";
import About from "./Views/About/About";
import MyCampaigns from "./Views/MyCampaigns/MyCampaigns";
import MyCanvassers from "./Views/MyCanvassers/MyCanvassers";
import EnterProfile from "./Views/EnterProfile/EnterProfile";
import RecentlyAdded from "./Views/RecentlyAdded/RecentlyAdded";
import Signup from "./Views/Signup/Signup";
import CanvasserLogin from "./Views/CanvasserLogin/CanvasserLogin";


export default (
    <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/campaigns" component={MyCampaigns}/>
        <Route exact path="/canvassers" component={MyCanvassers}/>
        <Route exact path="/enter-profile" component={EnterProfile}/>
        <Route exact path="/recently_added" component={RecentlyAdded}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/enter-pin" component={CanvasserLogin}/>
    </Switch>
)