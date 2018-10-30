import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <SubNavbar path="/" id={this.props.match.params.id}/>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default Dashboard;