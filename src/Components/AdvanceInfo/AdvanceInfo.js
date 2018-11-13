import React, { Component } from 'react';
import "./AdvanceInfo.css"
import AdvanceCanvassers from '../AdvanceCanvassers/AdvanceCanvassers';
import Modal from "react-modal";
import Axios from 'axios';
import copy from "./../../images/copy.svg";
import edit from "./../../images/edit.svg";
// import {connect} from "react-redux";

class AdvanceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            showCanvassers:false,
            showSendText:false,
            editMode:false,
            title:this.props.advance.title
        }
        this.closeModal = this.closeModal.bind(this);
        this.openView = this.openView.bind(this);
        this.finishCampaign = this.finishCampaign.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.editAdvance = this.editAdvance.bind(this);
    }
    closeModal(){
        this.setState({
            showModal:false,
            showCanvassers:false,
            showSendText:false
        })
    }
    openView(view){
        if(view === "showCanvassers"){

        }
        this.setState({
            showModal:true,
            [view]:true
        })
    }
    copyToClipBoard(e){
        var copyText = document.getElementById("pinInput");
        copyText.select();
        document.execCommand("copy");
    }
    finishCampaign(){
        Axios.delete("/api/pin/"+this.props.advance.advance_id).then(res=>{
            this.props.selectAdvance(res.data);
        }).catch(err=>alert("Error"))
    }
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    toggleEdit(){
        this.setState({
            editMode:!this.state.editMode,
            title:this.props.advance.title
        })
    }
    editAdvance(){
        Axios.put("/api/advance",{
            title:this.state.title,
            advance_id:this.props.advance.advance_id
        }).then(res=>{
            // console.log(res.data);
            this.props.selectAdvance(res.data);
            this.setState({
                editMode:false,
                title:this.props.advance.title
            })

        }).catch(err=>alert("Error"))
    }
    
    render() {
        // console.log(this.props.advance.title)
        // console.log("state: ",this.state.title)
        return (
            <div>
                <Modal
                    isOpen={this.state.showModal}
                    ariaHideApp={false}
                    onRequestClose={this.closeModal}
                    className="gray_background"
                >
                    <div onClick={this.closeModal} className="float_right">X</div>
                    {(this.state.showCanvassers)
                        ?<AdvanceCanvassers advance_id={this.props.advance.advance_id}/>
                            :null}
                </Modal>
                <div className="advance_info_container">
                {!this.state.editMode?
                    <div className="flex_display_advance">
                        <h1>{this.props.advance.title}</h1>
                        <span className="edit_btn_advance" onClick={this.toggleEdit}><img height="17px" src={edit} alt="Edit Button"/></span>
                    </div>
                    :
                    <div className="edit_survey_container">
                            <div>
                                <input type="text" name="title" onChange={this.changeHandler} value={this.state.title}/>
                            </div>
                            <div className="edit_survey_btn_container">
                                <button onClick={this.toggleEdit}>Cancel</button>
                                <button onClick={this.editAdvance}>Save</button>
                            </div>
                        </div>
                }
                </div>
                <div className="advance_stats_container">
                    <div className="stats">
                        <div>
                            <span>Profiles Gathered: <strong>{this.props.profileCount}</strong></span>
                        </div>
                        <div>
                            <span>Canvassers Joined: <strong>{this.props.canvasserCount}</strong></span>
                        </div>
                        {(this.props.pinNumber) &&
                        <div className="pin_num_div">
                            <span>Pin Number: <input type="text" id="pinInput" readOnly value={this.props.pinNumber}/></span>
                            <img src={copy}  alt="Copy to Clipboard!" onClick={this.copyToClipBoard}/>
                        </div>
                        }
                    </div>
                </div>
                {(!this.props.pinNumber)&&
                    <div className="finished_div">
                        <h1>Campaign Finished</h1>
                        <h2>{this.props.advance.date_finished}</h2>
                    </div>
                }
                <div className="advance_options_container">
                        <button onClick={()=>{this.openView("showCanvassers")}}>View Canvassers</button>
                        {(this.props.pinNumber) &&
                        <div className="sub_advanceinfo_btn_container">
                            <button onClick={()=>{this.props.history.push("/survey/"+this.props.match.params.id+"/campaign/"+this.props.pinNumber)}}>Send Text Message</button>
                            <button onClick={this.finishCampaign}>Finish Campaign</button>
                        </div>
                        }
                </div>
            </div>
        );
    }
}

export default AdvanceInfo;