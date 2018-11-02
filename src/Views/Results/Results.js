import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";


class Results extends Component {
    render() {
        return (
            <div>
                <SubNavbar path="/results" id={this.props.match.params.id} history={this.props.history}/>
                <h1>Results</h1>
            </div>
        );
    }
}

export default Results;