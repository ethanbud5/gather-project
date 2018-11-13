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
    constructor(props) {
        super(props);
        this.state = {
            authed:false
        }
    }
    
    componentDidMount(){
        Axios.get("/api/view").then(res=>{
            if(res.data === "loggedIn"){
                this.setState({authed:true})
            }
        }).catch(console.log())
    }
    render() {
        return (
            <div>
            {this.state.authed?
                <Switch>
                    <Route exact path="/campaign/:id" component={Dashboard}/>
                    <Route path="/campaign/:id/analysis" component={Analysis}/>
                    <Route path="/campaign/:id/map" component={Map}/>
                    <Route path="/campaign/:id/results" component={Results}/>
                    <Route exact path="/campaign/:id/advances" component={Advances}/>
                    <Route path="/canvassers/view" component={CanvasserView}/>
                    <Route path="/campaigns/add-survey" component={AddSurvey}/>
                    <Route path="/campaign/:id/advances/:pin" component={SendText}/>
                    <Route exact path="/campaigns" component={MyCampaigns}/>
                    <Route exact path="/canvassers" component={MyCanvassers}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/enter-pin" component={CanvasserLogin}/>
                    <Route exact path="/enter-profile" component={EnterProfile}/>
                    <Route exact path="/recently_added" component={RecentlyAdded}/>
                    {/* <Route render={(props)=>{
                        return <Redirect to="/"/>
                    }}/> */}
                </Switch>:
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/enter-pin" component={CanvasserLogin}/>
                    <Route exact path="/enter-profile" component={EnterProfile}/>
                    <Route exact path="/recently_added" component={RecentlyAdded}/>
                    {/* <Route render={(props)=>{
                       return <Redirect to="/"/>
                    }}/> */}
                </Switch>}
            </div>
        );
    }
}

export default Routes2;