import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import "./Dashboard.css";
import Axios from "axios";
import ProgressBar from "react-progressbar";
import edit from "./../../images/edit.svg";
import MapDashboard from '../../Components/MapDashboard/MapDashboard';
import Moment from 'react-moment';
import {Bar} from "react-chartjs-2";
import {connect} from "react-redux";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileCount:null,
            goal:null,
            recentCampaigns:[],
            editMode:false,
            currentCampaign:{
                title:"Survey Name"
            },
            title:"",
            goalInput:0,
            topCanvassers:[]
        }
        this.calcPercentageGoal = this.calcPercentageGoal.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.editSurvey = this.editSurvey.bind(this);
    }
    
    componentDidMount(){
        Axios.get("/api/dashboard-info/"+this.props.match.params.id).then(res=>{
            console.log(res.data)
            this.setState({
                profileCount:res.data.profileCount,
                goal:res.data.goal,
                recentCampaigns:res.data.recentCampaigns,
                currentCampaign:res.data.campaignName,
                title:res.data.campaignName.title,
                goalInput:res.data.campaignName.campaign_goal,
                topCanvassers:res.data.topCanvassers
            })
        }).catch(err=>console.log(err));
    }

    calcPercentageGoal(){
        let goal = this.state.goal;
        let currentCount = this.state.profileCount;
        // console.log(currentCount*100/goal)
        return currentCount*100/goal;
    }
    toggleEdit(){
        this.setState({editMode:!this.state.editMode})
    }
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    editSurvey(){
        if(this.state.title === "" || this.state.goalInput === ""){
            alert("Title and goal cannot by blank!")
            return
        }
        Axios.put("/api/campaign",{...this.state.currentCampaign,...{
            title:this.state.title,
            campaign_goal:this.state.goalInput
        }}).then(res=>{
            // console.log(res.data)
            this.setState({
                editMode:false,
                currentCampaign:res.data,
                goal:res.data.campaign_goal
            })
        }).catch(err=>{alert("Error: ",err)})
    }
    render() {
        let recentCampaigns = this.state.recentCampaigns.map((campaign)=>{
            return<div key={campaign.advance_id} onClick={()=>this.props.history.push("/survey/"+this.props.match.params.id+"/campaigns")} className="recent_campaigns_card">
                    <h1>
                        {campaign.title}
                    </h1>
                    <div><Moment format="MM-DD-YYYY">{campaign.date_created}</Moment></div>
                </div>
        })
        let profilesPerCanvasserData = {
            labels: this.state.topCanvassers.map(canvasser=>canvasser.name),
            datasets: [
                {
                label: 'Top Canvassers',
                fill: true,
                lineTension: 0.1,
                backgroundColor: '#0b87cc',
                borderColor: 'black',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.topCanvassers.map(canvasser=>canvasser.profile_count)
                }
            ]
        }
        return (
            <div>
                <SubNavbar path="/" id={this.props.match.params.id} history={this.props.history}/>
                {(this.state.editMode)?
                <div className="survey_name">
                    <div className="edit_survey_container">
                        <div>
                            <label>Title</label>
                            <input type="text" name="title" onChange={this.changeHandler} value={this.state.title}/>
                        </div>
                        <div>
                            <label>Goal</label>
                            <input type="number" name="goalInput" onChange={this.changeHandler} value={this.state.goalInput}/>
                        </div>
                        <div className="edit_survey_btn_container">
                            <button onClick={this.toggleEdit}>Cancel</button>
                            <button onClick={this.editSurvey}>Save</button>
                        </div>
                    </div>
                </div>
                :
                <div>
                <div className="survey_name">
                    <div className="flex_display_survey">
                        <h1>{this.state.currentCampaign.title}</h1>
                        <span className="edit_btn_survey" onClick={this.toggleEdit}><img height="17px" src={edit} alt="Edit Button"/></span>
                    </div>
                </div>
            
                <div className="dashboard_container">
                    <div className="top_dashboard_container">
                        <div className="recent_campaigns_container">
                            <div>
                                Recent Campaigns
                            </div>
                            {recentCampaigns}
                        </div>
                        <div className="goal_progressbar_container_dashboard">
                            <h1>Survey Goal</h1>
                            <p>{this.state.profileCount} of {this.state.goal}</p>
                            <ProgressBar completed={this.calcPercentageGoal()}/>
                        </div>
                    </div>
                    <div className="recent_and_map_container">
                        <div className="top_canvassers_table">
                            <Bar data={profilesPerCanvasserData}/>
                        </div>
                        <div className="dashboard_map_container">
                            <MapDashboard match={this.props.match}/>
                        </div>
                    </div>
                </div></div>}
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        campaigns:state.campaigns
    }
}

export default connect(mapStateToProps)(Dashboard);