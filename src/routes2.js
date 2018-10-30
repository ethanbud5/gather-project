import React from "react";
import {Switch,Route} from "react-router-dom";
import Dashboard from "./Views/Dashboard/Dashboard";
import Analysis from "./Views/Analysis/Analysis";
import Map from "./Views/Map/Map";
import Results from "./Views/Results/Results";
import Advances from "./Views/Advances/Advances";

export default (
    <Switch>
        <Route exact path="/campaign/:id" component={Dashboard}/>
        <Route path="/campaign/:id/analysis" component={Analysis}/>
        <Route path="/campaign/:id/map" component={Map}/>
        <Route path="/campaign/:id/results" component={Results}/>
        <Route path="/campaign/:id/advances" component={Advances}/>
    </Switch>
)