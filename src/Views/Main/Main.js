import React, { Component } from 'react';
import { connect } from 'react-redux';


class Main extends Component {
    //TODO: onComponentDidMount needs to check if user is logged in. if they are, it needs to redirect to myCampaigns
    render() {
        return (
            <div>
                Main
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