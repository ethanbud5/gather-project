import React, { Component } from 'react';
import "./CanvasserView.css";
import userImage from "../../images/user.svg";
import {connect} from "react-redux";
import backArrow from "./../../images/left-arrow.svg"
import Navbar from '../Navbar/Navbar';
import Axios from 'axios';
import {selectCanvasser} from "./../../ducks/reducer";


class CanvasserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            name:this.props.selectedCanvasser.name,
            phone:this.props.selectedCanvasser.phone
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.editCanvasser = this.editCanvasser.bind(this);
        this.deleteCanvasser = this.deleteCanvasser.bind(this);
    }
    
    componentDidMount(){
        if(this.props.selectedCanvasser ===false){
            this.props.history.push("/canvassers")
        }
    }
    toggleEdit(){
        this.setState({editMode:!this.state.editMode})
    }
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    editCanvasser(){
        Axios.put("/api/canvasser",{
            name:this.state.name,
            phone:this.state.phone,
            canvasser_id:this.props.selectedCanvasser.canvasser_id
        }).then(res=>{
            this.setState({editMode:false})
            this.props.selectCanvasser(res.data)
        }).catch(err=>console.log(alert("Error:",err)))
    }
    deleteCanvasser(){
        Axios.delete("/api/canvasser/"+this.props.selectedCanvasser.canvasser_id).then(res=>{
            this.props.history.push("/canvassers")
        }).catch(err=>console.log("Error",err));
    }
    render() {
        return (
            <div>
                <Navbar path="/canvassers" history={this.props.history}/>
                <div className="back_btn" onClick={()=>this.props.history.goBack()}>
                    <img src={backArrow} alt="Back Arrow"/>
                </div>
                <div className="canvasser_info_container">
                    <div>
                        <img src={userImage} className="user_image" alt="Profile"/>
                    </div>
                {(this.state.editMode)?
                <div className="info_container_center">
                    <div>
                        <input type="text" onChange={this.changeHandler} name="name" className="name_canvasser"value={this.state.name}/>
                    </div>
                    <div>
                        <input type="text" onChange={this.changeHandler} name="phone" className="phone_canvasser" value={this.state.phone}/>
                    </div>
                    <div className="canvasser_view_btn_container">
                        <button onClick={this.toggleEdit}>Cancel</button>
                        <button onClick={this.editCanvasser}>Save</button>
                    </div>
                </div>:
                <div className="info_container_center">
                    <div>
                        <h1 className="name_canvasser">{this.props.selectedCanvasser.name}</h1>
                    </div>
                    <div>
                        <h3 className="phone_canvasser">{this.props.selectedCanvasser.phone}</h3>
                    </div>
                    <div className="canvasser_view_btn_container">
                        <button onClick={this.deleteCanvasser}>Delete</button>
                        <button onClick={this.toggleEdit}>Edit</button>
                    </div>
                </div>
                }
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

export default connect(mapStateToProps,{selectCanvasser})(CanvasserView);