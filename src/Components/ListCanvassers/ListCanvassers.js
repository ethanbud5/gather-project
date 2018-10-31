import React, { Component } from 'react';
import "./ListCanvassers.css"

class ListCanvassers extends Component {

    render() {
        let list = this.props.canvassers.map(canvasser=>{
            return <div onClick={()=>{this.props.selectCanvasser(canvasser); this.props.history.push("/canvassers/view")}} key={canvasser.canvasser_id} className="canvasser_card">
                <h2>{canvasser.name}</h2>
            </div>
        })
        return (
            <div>
                <div className="input_search_canvassers">
                    <input type="text" placeholder="Search..."/>
                </div>
                <div className="canvasser_card_container">
                    {list}
                </div>
            </div>
        );
    }
}

export default ListCanvassers;