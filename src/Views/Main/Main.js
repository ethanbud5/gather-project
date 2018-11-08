import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from "./../../Components/Navbar/Navbar";
import "./Main.css"


class Main extends Component {
    render() {
        // console.log("from main: ",this.props)
        return (
            <div>
                <Navbar path="/" history={this.props.history}/>
                <div className="main_page_container">
                    <div className="hero_image_container">
                        <h1>A Simple Solution for Small Scale Canvassing</h1>
                    </div>
                    <div className="features_section_container">
                    </div>
                </div>
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