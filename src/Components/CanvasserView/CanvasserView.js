import React, { Component } from 'react';
import "./CanvasserView.css";
import userImage from "../../images/user.svg";
import {connect} from "react-redux";
import backArrow from "./../../images/left-arrow.svg"
import Navbar from '../Navbar/Navbar';


class CanvasserView extends Component {

    componentDidMount(){
        if(this.props.selectedCanvasser ===false){
            this.props.history.push("/canvassers")
        }
    }
    render() {
        return (
            <div>
                <Navbar path="/canvassers"/>
                <div className="back_btn" onClick={()=>this.props.history.goBack()}>
                    <img src={backArrow} alt="Back Arrow"/>
                </div>
                <div className="canvasser_info_container">
                    <div>
                        <img src={userImage} className="user_image" alt="Profile"/>
                    </div>
                    <div>
                        <h1 className="name_canvasser">{this.props.selectedCanvasser.name}</h1>
                    </div>
                    <div>
                        <h3 className="phone_canvasser">{this.props.selectedCanvasser.phone}</h3>
                    </div>
                    <div className="canvasser_view_btn_container">
                        <button>Delete</button>
                        <button>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        selectedCanvasser:state.selectedCanvasser
    }
}

export default connect(mapStateToProps)(CanvasserView);