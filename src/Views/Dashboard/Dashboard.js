import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import { Doughnut } from "react-chartjs-2";
import "./Dashboard.css";
import Axios from "axios";
import ProgressBar from "react-progressbar";
import edit from "./../../images/edit.svg";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileCount:null,
            goal:null
        }
        this.calcPercentageGoal = this.calcPercentageGoal.bind(this);
    }
    
    componentDidMount(){
        Axios.get("/api/goal-stats/"+this.props.match.params.id).then(res=>{
            console.log(res.data)
            this.setState({
                profileCount:res.data.profileCount,
                goal:res.data.goal
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
        const profileData = {
            labels: [
                'Profiles Gathered',
                'Profiles To Go'
            ],
            datasets: [{
                data: [50, 50],
                backgroundColor: [
                'red',
                '#655d62'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#403333'
                ]
            }]
        };
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
                    {/* <div className="goal_doughnut_container">
                        <Doughnut data={profileData}/>
                    </div> */}
                    <div className="goal_progressbar_container">
                        <h1>Survey Goal</h1>
                        <p>{this.state.profileCount} of {this.state.goal}</p>
                        <ProgressBar completed={this.calcPercentageGoal()}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;