import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import { Doughnut } from "react-chartjs-2";

class Dashboard extends Component {
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
                <h1>Dashboard</h1>
                <div className="goal_doughnut_container">
                   <Doughnut data={profileData}/>
                </div>
            </div>
        );
    }
}

export default Dashboard;