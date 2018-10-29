import React, { Component } from 'react';
import {connect} from "react-redux";
import "./Navbar.css"
import {Link} from "react-router-dom";
import axios from "axios";

class Navbar extends Component {
    constructor(props){
        super(props)
        this.state ={
            navbarView:"landingPage"
        }
        this.logoutUser = this.logoutUser.bind(this);
    }
    componentDidMount(){
        axios.get("/api/view").then(res=>{
            this.setState({navbarView:res.data})
        }).catch((err)=>alert(err))
    }
    logoutUser(){
        axios.delete("/api/logout").then(res=>{
            this.setState({navbarView:"landingPage"})
        }).catch((err)=>alert(err))
    }
    render() {
        if(this.state.navbarView === "landingPage"){
            return (
                <div>
                    <header>
                        <div className="nav_container">
                        <Link to="/" className="nav_links"><h1 className="gather_logo nav_links">Gather</h1></Link>
                            <Link to="/" className="nav_links"><span>Home</span></Link>
                            <Link to="/about" className="nav_links"><span>About</span></Link>
                            <span className="nav_links">Join Campaign</span>
                            <div className="btn_container">
                                <button className="nav_btns">Create Account</button>
                                <button className="nav_btns" onClick={()=>window.open(process.env.REACT_APP_SERVER+"/login","_self")}>Login</button>
                            </div>
                        </div>
                    </header>
                </div>
            );
        }
        if(this.state.navbarView === "loggedIn"){
            return (
                <div>
                    <header>
                        <div className="nav_container">
                        <Link to="/campaigns" className="nav_links"><h1 className="gather_logo nav_links">Gather</h1></Link>
                            <Link to="/campaigns" className="nav_links"><span>My Campaigns</span></Link>
                            <Link to="/canvassers" className="nav_links"><span>My Canvassers</span></Link>
                            <button className="user_btn" onClick={this.logoutUser}>JS</button>
                        </div>
                    </header>
                </div>
            );
        }
        if(this.state.navbarView === "canvasserView"){
            return (
                <div>
                    <header>
                        <div className="nav_container">
                        <Link to="/enter-profile" className="nav_links"><h1 className="gather_logo nav_links">Gather</h1></Link>
                            <Link to="/enter-profile" className="nav_links"><span>Enter New Profile</span></Link>
                            <Link to="/recently_added" className="nav_links"><span>Recently Added</span></Link>
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