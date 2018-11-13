import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileResponsive from '../../Components/ProfileResponsive/ProfileResponsive';
import Axios from "axios";

class RecentlyAdded extends Component {
    componentDidMount(){
        Axios.get("/api/view").then(view=>{
            if(view.data !== "canvasserView"){
                this.props.history.push("/");
            }
        })
    }
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