import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from "./../../Components/Navbar/Navbar";
import "./Main.css";
import simple from "./../../images/touch-screen.svg";
import chart from "./../../images/fluctuation.svg";
import phone from "./../../images/add-friend.svg";
import create_survey from "./../../images/create_new_survey.png";
import enter_data from "./../../images/enter_data_iphone.png";
import map_view from "./../../images/ipad_map_gather.png";


class Main extends Component {
    render() {
        // console.log("from main: ",this.props)
        return (
            <div>
                <Navbar path="/" history={this.props.history}/>
                <div className="main_page_container">
                    <div className="hero_image_container">
                        <div className="hero_image">
                            <h1 className="gather_in_main">Gather</h1>
                            <h1>A Simple Solution <br/>for Small-Scale Canvassing</h1>
                            <div className="main_btn_container">
                                <button onClick={()=>this.props.history.push("/enter-pin")} className="join_btn">Join Campaign</button>
                                <button onClick={()=>window.open(process.env.REACT_APP_SERVER+"/login","_self")} className="signup_btn">Login</button>
                            </div>
                        </div>
                    </div>
                    <div className="features_section_container">
                        <div className="feature_card">
                            <img src={simple} height="50px" alt={"Simple Icon"}/>
                            <h1>Create Survey</h1>
                            <h3>Start a campaign by sending a text message to all canvassers with pin number for them to use to join.</h3>
                        </div>
                        <div className="feature_card">
                            <img src={phone} height="50px" alt="phone Icon"/>
                            <h1>Input Data</h1>
                            <h3>Our mobile-friendly interface allows a simple and easy way to input data on the go.</h3>
                        </div>
                        <div className="feature_card">
                            <img src={chart} height="50px" alt="Analysis Icon"/>
                            <h1>Analyze Results</h1>
                            <h3>Use built-in maps and charts to easily visualize survey results.</h3>
                        </div>
                    </div>
                    <div className="more_info_container">
                    <div>
                    </div>
                        <div className="create_new_survey_screenshot screen_shots_container">
                            <img src={enter_data} alt="screenshot"/>
                            <h2>Mobile-friendly design.</h2>
                        </div>
                        <div className="input_data_screenshot screen_shots_container">
                            <h2>Simple to use interface.</h2>
                            <img src={create_survey} alt="screenshot"/>
                        </div>
                        <div className="view_map_screenshot screen_shots_container">
                            <img src={map_view} alt="screenshot"/>
                            <h2>Powerful analysis.</h2>
                        </div>
                    </div>
                    <div className="sub_footer">
                        <h2 onClick={()=>this.props.history.push("/about")}>Learn More</h2>
                        <h2 onClick={()=>window.open(process.env.REACT_APP_SERVER+"/login","_self")}>Signup</h2>
                    </div>
                    {/* TODO: add screen shots of app in use and have another call to action button on bottom of screen */}
                    <footer>
                        <p>Copyright © 2018 Ethan Sanders</p>
                    </footer>
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