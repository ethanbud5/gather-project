import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileResponsive from '../../Components/ProfileResponsive/ProfileResponsive';

class RecentlyAdded extends Component {
    render() {
        return (
            <div>
                <Navbar path="/recently-added" history={this.props.history}/>
                <ProfileResponsive/>
            </div>
        );
    }
}

export default RecentlyAdded;