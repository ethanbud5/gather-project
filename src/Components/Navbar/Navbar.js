import React, { Component } from 'react';
import {connect} from "react-redux";
import "./Navbar.css"

class Navbar extends Component {
    render() {
        if(this.props.navbarView === "landingPage"){
            return (
                <div>
                    <header>
                        <div className="nav_container">
                            <h1 className="gather_logo nav_links">Gather</h1>
                            <span className="nav_links">Home</span>
                            <span className="nav_links">About</span>
                            <span className="nav_links">Join Campaign</span>
                            <div className="btn_container">
                                <button className="nav_btns">Create Account</button>
                                <button className="nav_btns">Login</button>
                            </div>
                        </div>
                    </header>
                </div>
            );
        }
        if(this.props.navbarView === "loggedIn"){
            return (
                <div>
                    <header>
                        <div className="nav_container">
                            <h1 className="gather_logo nav_links">Gather</h1>
                            <span className="nav_links">My Campaigns</span>
                            <span className="nav_links">My Canvassers</span>
                            <button className="user_btn">JS</button>
                        </div>
                    </header>
                </div>
            );
        }
        if(this.props.navbarView === "canvasserView"){
            return (
                <div>
                    <header>
                        <div className="nav_container">
                            <h1 className="gather_logo nav_links">Gather</h1>
                            <span className="nav_links">Enter New Profile</span>
                            <span className="nav_links">Recently Added</span>
                            <button className="nav_btns logout_btn">Logout</button>
                        </div>
                    </header>
                </div>
            );
        }
    }
}
function mapStateToProps(state){
    return{
        navbarView:state.navbarView
    }
}

export default connect(mapStateToProps)(Navbar);