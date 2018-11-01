import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';

class RecentlyAdded extends Component {
    render() {
        return (
            <div>
                <Navbar path="/recently-added"/>
                <div>RecentlyAdded</div>
            </div>
        );
    }
}

export default RecentlyAdded;