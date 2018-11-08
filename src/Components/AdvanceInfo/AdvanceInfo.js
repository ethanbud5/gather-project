import React, { Component } from 'react';
import "./AdvanceInfo.css"
import AdvanceCanvassers from '../AdvanceCanvassers/AdvanceCanvassers';
import SendText from '../SendText/SendText';
import Modal from "react-modal";
import Axios from 'axios';
// import {connect} from "react-redux";

class AdvanceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            showCanvassers:false,
            showSendText:false
        }
        this.closeModal = this.closeModal.bind(this);
        this.openView = this.openView.bind(this);
        this.finishCampaign = this.finishCampaign.bind(this);
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
    render() {
        // console.log(this.state)
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
                            :(this.state.showSendText)
                                ?<SendText pin={this.props.pinNumber} advance_id={this.props.advance.advance_id}/>
                                    :null}
                </Modal>
                <div className="advance_info_container">
                    <h1>{this.props.advance.title}</h1>
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
                            <button onClick={this.copyToClipBoard}>Copy</button>
                        </div>
                        }
                    </div>
                </div>
                <div className="advance_options_container">
                        <button onClick={()=>{this.openView("showCanvassers")}}>View Canvassers</button>
                        {(this.props.pinNumber) &&
                        <div className="sub_advanceinfo_btn_container">
                            <button onClick={()=>{this.openView("showSendText")}}>Send Text Message</button>
                            <button onClick={this.finishCampaign}>Finish Campaign</button>
                        </div>
                        }
                </div>
                {/* TODO: Add Google Map of locations */}
            </div>
        );
    }
}

export default AdvanceInfo;