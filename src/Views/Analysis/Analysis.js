import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";


class Analysis extends Component {
    render() {
        return (
            <div>
                <SubNavbar path="/analysis" id={this.props.match.params.id}/>
                <h1>Analysis</h1>
            </div>
        );
    }
}

export default Analysis;