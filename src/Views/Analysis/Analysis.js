import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import { Doughnut } from "react-chartjs-2";
import Axios from 'axios';
import "./Analysis.css"
import ProgressBar from "react-progressbar";


class Analysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            custom_title_3:"Custom 3",
            custom_3_true:null,
            custom_3_false:null,
            profileCount:null,
            goal:null,
            custom_title_2:"Custom 2"
        }
    }

    componentDidMount(){
        Axios.get("/api/survey-stats/"+this.props.match.params.id).then(res=>{
            console.log(res.data)
            this.setState({
                custom_title_3:res.data.customNames.custom_text_3,
                custom_3_false:res.data.custom_3_false,
                custom_3_true:res.data.custom_3_true,
                profileCount:res.data.profileCount,
                goal:res.data.goal,
                custom_title_2:res.data.customNames.custom_text_2
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
        console.log(this.state)
        const customBooleanData = {
            labels: [
                "True",
                "False"
            ],
            datasets: [{
                data: [this.state.custom_3_true, this.state.custom_3_false],
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
                <SubNavbar path="/analysis" id={this.props.match.params.id} history={this.props.history}/>
                <div className="analysis_container">
                    <div className="boolean_doughnut_container">
                        <h1>{this.state.custom_title_3}</h1>
                    <Doughnut data={customBooleanData}/>
                    </div>
                    <div className="goal_progressbar_container">
                        <h1>Campaign Goal</h1>
                        <p>{this.state.profileCount} of {this.state.goal}</p>
                    <ProgressBar completed={this.calcPercentageGoal()}/>
                    </div>
                    <div className="number_stats_container">
                        <h1>{this.state.custom_title_2}</h1>
                    <Doughnut data={customBooleanData}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Analysis;