import React, { Component } from 'react';
import "./AdvanceInfo.css"

class AdvanceInfo extends Component {
    
    render() {
        // console.log(this.props)
        return (
            <div>
                <div className="advance_info_container">
                    <h1>{this.props.advance.title}</h1>
                </div>
                <div className="advance_stats_container">
                    <div className="stats">
                        <div>
                            <span>Profiles Gathered: <strong>{this.props.profileCount}</strong></span>
                        </div>
                        <div>
                            <span>Canvassers Count: <strong>{this.props.canvasserCount}</strong></span>
                        </div>
                    </div>
                </div>
                <div className="advance_options_container">
                        <button>View Canvassers</button>
                        <button>View Pin</button>
                        <button>Send Text Message</button>
                        <button>Finish Advance</button>
                </div>
                {/* TODO: Add Google Map of locations */}
            </div>
        );
    }
}

export default AdvanceInfo;