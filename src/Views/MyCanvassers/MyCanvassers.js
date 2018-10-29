import React, { Component } from 'react';
import Navbar from "./../../Components/Navbar/Navbar";


class MyCanvassers extends Component {
    render() {
        return (
            <div>
                <Navbar path="/canvassers"/>
                <h1>MyCanvassers</h1>
            </div>
        );
    }
}

export default MyCanvassers;