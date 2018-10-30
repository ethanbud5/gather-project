import React, { Component } from 'react';
import "./AdvanceInfo.css"
import Modal from "react-modal";
import Axios from 'axios';

class AdvanceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileCount:0,
            canvasserCount:0
        }
    }
    
    componentDidMount(){
        Axios.get("/api/stats/"+this.props.advance.advance_id).then(res=>{
            this.setState({
                profileCount:res.data[0],
                canvasserCount:res.data[1]
            })
        })
    }
    render() {
        return (
            <div>
                <div className="advance_info_container">
                    <h1>{this.props.advance.title}</h1>
                </div>
                <div className="advance_options_container">
                        <button>View Canvassers</button>
                        <button>View Pin</button>
                        <button>Send Text Message</button>
                        <button>Finish Advance</button>
                </div>
                <div className="advance_stats_container">
                    <h1>Advance Info</h1>
                    <div className="stats">
                        <div>
                            <span>Profiles Gathered: <strong>{this.state.profileCount}</strong></span>
                        </div>
                        <div>
                            <span>Canvassers Count: <strong>{this.state.canvasserCount}</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdvanceInfo;