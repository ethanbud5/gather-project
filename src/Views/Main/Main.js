import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from "./../../Components/Navbar/Navbar";


class Main extends Component {
    //TODO: onComponentDidMount needs to check if user is logged in. if they are, it needs to redirect to myCampaigns
    render() {
        // console.log("from main: ",this.props)
        return (
            <div>
                <Navbar path="/" history={this.props.history}/>
                <h1>Main</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state:state
    };
}
export default connect(mapStateToProps)(Main);