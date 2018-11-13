import React from "react";
import {Switch,Route} from "react-router-dom";
import Dashboard from "./Views/Dashboard/Dashboard";
import Analysis from "./Views/Analysis/Analysis";
import Map from "./Views/Map/Map";
import Results from "./Views/Results/Results";
import Advances from "./Views/Advances/Advances";
import CanvasserView from "./Components/CanvasserView/CanvasserView";
import AddSurvey from "./Views/AddSurvey/AddSurvey";
import SendText from "./Components/SendText/SendText";
import MyCampaigns from "./Views/MyCampaigns/MyCampaigns";
import MyCanvassers from "./Views/MyCanvassers/MyCanvassers";
import Main from "./Views/Main/Main";
import About from "./Views/About/About";
import CanvasserLogin from "./Views/CanvasserLogin/CanvasserLogin";
import EnterProfile from "./Views/EnterProfile/EnterProfile";
import RecentlyAdded from "./Views/RecentlyAdded/RecentlyAdded";

import Signup from "./Views/Signup/Signup";

import Axios from "axios";

class Routes2 extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/survey/:id" component={Dashboard}/>
                    <Route path="/survey/:id/analysis" component={Analysis}/>
                    <Route path="/survey/:id/map" component={Map}/>
                    <Route path="/survey/:id/results" component={Results}/>
                    <Route exact path="/survey/:id/campaigns" component={Advances}/>
                    <Route path="/canvassers/view" component={CanvasserView}/>
                    <Route path="/surveys/add-survey" component={AddSurvey}/>
                    <Route path="/survey/:id/campaign/:pin" component={SendText}/>
                    <Route exact path="/surveys" component={MyCampaigns}/>
                    <Route exact path="/canvassers" component={MyCanvassers}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/enter-pin" component={CanvasserLogin}/>
                    <Route exact path="/enter-profile" component={EnterProfile}/>
                    <Route exact path="/recently_added" component={RecentlyAdded}/>
                </Switch>
            </div>
        );
    }
}

export default Routes2;