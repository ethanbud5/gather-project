import React, { Component } from 'react';
import Navbar from "./../Navbar/Navbar";
import "./SubNavbar.css";
import {Link} from "react-router-dom";

class SubNavbar extends Component {
    checkActive(path){
        if(this.props.path === path){
            return " active_link";
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
                    <Link className={this.checkActive("/")}to={"/campaign/"+this.props.id+"/"}>Dashboard</Link>
                    <Link className={this.checkActive("/analysis")}to={"/campaign/"+this.props.id+"/analysis"}>Analysis</Link>
                    <Link className={this.checkActive("/map")}to={"/campaign/"+this.props.id+"/map"}>Map</Link>
                    <Link className={this.checkActive("/results")}to={"/campaign/"+this.props.id+"/results"}>Results</Link>
                    <Link className={this.checkActive("/advances")}to={"/campaign/"+this.props.id+"/advances"}>Campaigns</Link>
                </div>
            </div>
        );
    }
}

export default SubNavbar;