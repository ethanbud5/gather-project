import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";


class Map extends Component {
    render() {
        return (
            <div>
                <SubNavbar path="/map" id={this.props.match.params.id}/>
                <h1>Map</h1>
            </div>
        );
    }
}

export default Map;