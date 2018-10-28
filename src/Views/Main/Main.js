import React, { Component } from 'react';
import { connect } from 'react-redux';


class Main extends Component {
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