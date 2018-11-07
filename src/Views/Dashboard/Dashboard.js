import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import "./Dashboard.css";
import Axios from "axios";
import ProgressBar from "react-progressbar";
import edit from "./../../images/edit.svg";
import MapDashboard from '../../Components/MapDashboard/MapDashboard';
import Moment from 'react-moment';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileCount:null,
            goal:null,
            recentCampaigns:[]
        }
        this.calcPercentageGoal = this.calcPercentageGoal.bind(this);
    }
    
    componentDidMount(){
        Axios.get("/api/dashboard-info/"+this.props.match.params.id).then(res=>{
            console.log(res.data)
            this.setState({
                profileCount:res.data.profileCount,
                goal:res.data.goal,
                recentCampaigns:res.data.recentCampaigns
            })
        }).catch(err=>console.log(err));
    }

    calcPercentageGoal(){
        let goal = this.state.goal;
        let currentCount = this.state.profileCount;
        // console.log(currentCount*100/goal)
        return currentCount*100/goal;
    }
    render() {
        let recentCampaigns = this.state.recentCampaigns.map((campaign)=>{
            return<div key={campaign.advance_id} onClick={()=>this.props.history.push("/campaign/"+this.props.match.params.id+"/advances")} className="recent_campaigns_card">
                    <h1>
                        {campaign.title}
                    </h1>
                    <div><Moment format="MM-DD-YYYY">{campaign.date_created}</Moment></div>
                </div>
        })

        return (
            <div>
                <SubNavbar path="/" id={this.props.match.params.id} history={this.props.history}/>
                <div className="survey_name">
                    <div className="flex_display_survey">
                        <h1>Survey Name</h1>
                        <span className="edit_btn_survey"><img height="17px" src={edit} alt="Edit Button"/></span>
                    </div>
                </div>
                <div className="dashboard_container">
                    <div className="goal_progressbar_container">
                        <h1>Survey Goal</h1>
                        <p>{this.state.profileCount} of {this.state.goal}</p>
                        <ProgressBar completed={this.calcPercentageGoal()}/>
                    </div>
                    <div className="recent_and_map_container">
                        <div className="dashboard_map_container">
                            <MapDashboard match={this.props.match}/>
                        </div>
                        <div className="recent_campaigns_container">
                            <div>
                                Recent Campaigns
                            </div>
                            {recentCampaigns}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;