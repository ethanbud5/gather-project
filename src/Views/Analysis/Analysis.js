import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import { Doughnut, Line ,Bar} from "react-chartjs-2";
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
            custom_title_2:"Custom 2",
            custom_2Array:[],
            profilesPerCampaign:{
                titles:[],
                data:[]
            },
            canvassersPerCampaign:{
                titles:[],
                data:[]
            },
            profilesPerCanvasser:[]
        }
    }

    componentDidMount(){
        Axios.get("/api/survey-stats/"+this.props.match.params.id).then(res=>{
            // console.log(res.data)
            this.setState({
                custom_title_3:res.data.customNames.custom_text_3,
                custom_3_false:res.data.custom_3_false,
                custom_3_true:res.data.custom_3_true,
                profileCount:res.data.profileCount,
                goal:res.data.goal,
                custom_title_2:res.data.customNames.custom_text_2,
                custom_2Array:res.data.custom_2Array,
                profilesPerCampaign:{
                    titles:res.data.profilesPerAdvance.titles,
                    data:res.data.profilesPerAdvance.data
                },
                canvassersPerCampaign:{
                    titles:res.data.canvassersPerAdvance.titles,
                    data:res.data.canvassersPerAdvance.data
                },
                profilesPerCanvasser:res.data.topCanvassers
            })
        }).catch(err=>console.log(err));
        Axios.get("/api/route-auth?survey_id="+this.props.match.params.id).then(authRes=>{
            authRes = authRes.data
            // console.log(authRes ==="Authorized for survey")
            if(authRes==="Not Authorized!"){
                this.props.history.push("/");
            }
            else if(authRes==="Not Authorized for survey"){
                this.props.history.push("/surveys");
            }
            else if(authRes ==="Authorized for survey"){
            }
        })
    }

    calcPercentageGoal(){
        let goal = this.state.goal;
        let currentCount = this.state.profileCount;
        // console.log(currentCount*100/goal)
        return currentCount*100/goal;
    }
    findMode(numbers) {
        let mode = 0;
        let max = 0
        numbers.reduce((accum,current)=>{
          // console.log(current)
          if(current === null){
              return accum
          }
          if(current in accum){
            accum[current]++
          }
          else{
            accum[current] = 1
          }
          if(accum[current]>max){
            max = accum[current]
            mode = current
          }
          return accum
        },{})
        // console.log(mode)
        if(max === 0 || max === 1){
            return "None";
        }
        return mode;
    }
   
    render() {
        // console.log(this.state)
        const customBooleanData = {
            labels: [
                "True",
                "False"
            ],
            position:"bottom",
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
        let profilesPerCampaignData = {
            labels: this.state.profilesPerCampaign.titles,
            datasets: [
                {
                label: 'Profiles Per Campaign',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#089696',
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
                data: this.state.profilesPerCampaign.data
                },
                {
                label: 'Canvassers Per Campaign',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(255, 102, 102)',
                borderColor: 'red',
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
                data: this.state.canvassersPerCampaign.data
                }
            ]
        }
        let profilesPerCanvasserData = {
            labels: this.state.profilesPerCanvasser.map(canvasser=>canvasser.name),
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
                data: this.state.profilesPerCanvasser.map(canvasser=>canvasser.profile_count)
                }
            ]
        }
        return (
            <div>
                <SubNavbar path="/analysis" id={this.props.match.params.id} history={this.props.history}/>
                <div className="analysis_container">
                    <div className="boolean_doughnut_container background_analysis_view">
                        <h1>{this.state.custom_title_3}</h1>
                    <Doughnut data={customBooleanData} legend={{position:"bottom"}}/>
                    </div>
                    <div className="goal_progressbar_container background_analysis_view">
                        <h1>Survey Goal</h1>
                        <p>{this.state.profileCount} of {this.state.goal}</p>
                    <ProgressBar completed={this.calcPercentageGoal()}/>
                    </div>
                    <div className="number_stats_container background_analysis_view">
                        <h1>{this.state.custom_title_2}</h1>
                            <table className="number_stats">
                            <tbody>
                                <tr>
                                    <td>Sum: </td>
                                    <td>{this.state.custom_2Array.reduce((a, b) => a + b, 0)}</td>
                                </tr> 
                                <tr>
                                    <td>Average:</td> 
                                    <td>{JSON.stringify(Math.floor(this.state.custom_2Array.reduce((a, b) => a + b, 0)/this.state.custom_2Array.length))}</td>
                                </tr>
                                <tr>
                                    <td>Mode: </td>
                                    <td>{this.findMode(this.state.custom_2Array)}</td>
                                </tr>
                                <tr>
                                    <td>Highest: </td>
                                    <td>{this.state.custom_2Array.reduce((accum,current)=>(current>accum)?current:accum,0)}</td>
                                </tr>
                                <tr>
                                    <td>Lowest: </td>
                                    <td>{Math.min(...this.state.custom_2Array.filter(num=>(num!==null)))}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                    <div className="line_chart_profiles background_analysis_view">
                        <Bar data={profilesPerCanvasserData}/>
                    </div>
                    <div className="line_chart_profiles background_analysis_view">
                        <Line data={profilesPerCampaignData}/>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Analysis;