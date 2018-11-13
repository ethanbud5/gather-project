import React, { Component } from 'react';
import Navbar from "./../Navbar/Navbar";
import "./SubNavbar.css";
import {Link} from "react-router-dom";

class SubNavbar extends Component {
    checkActive(path){
        if(this.props.path === path){
            return " active_link_sub";
        }
        else{
            return "";
        }
    }
    render() {
        return (
            <div>
                <Navbar path="/campaigns" history={this.props.history}/>
                <div className="subnav_container">
                    <Link to={"/survey/"+this.props.id+"/"}><span className={this.checkActive("/")}>Dashboard</span></Link>
                    <Link to={"/survey/"+this.props.id+"/analysis"}><span className={this.checkActive("/analysis")}>Analysis</span></Link>
                    <Link to={"/survey/"+this.props.id+"/map"}><span className={this.checkActive("/map")}>Map</span></Link>
                    <Link  to={"/survey/"+this.props.id+"/results"}><span className={this.checkActive("/results")}>Results</span></Link>
                    <Link to={"/survey/"+this.props.id+"/campaigns"}><span className={this.checkActive("/advances")}>Campaigns</span></Link>
                </div>
            </div>
        );
    }
}

export default SubNavbar;