import React, { Component } from 'react';
import "./SendText.css"
import axios from "axios";
import ListCanvassers from "./../ListCanvassers/ListCanvassers";

class SendText extends Component {
    constructor(props) {
        super(props);
        this.state={
            canvassers:[],
            addedCanvassers:[]
        }
        this.selectCanvasser = this.selectCanvasser.bind(this);
        this.removeCanvasser = this.removeCanvasser.bind(this);
    }
    componentDidMount(){
        axios.get("/api/canvassers").then(res=>{
            this.setState({canvassers:res.data})
        })
    }
    selectCanvasser(canvasserToAdd){
        let newArray = this.state.addedCanvassers.slice();
        let hasAlready = newArray.find(canvasser=>{
            return canvasser.canvasser_id===canvasserToAdd.canvasser_id;
        })
        if(hasAlready === undefined){
            newArray.push(canvasserToAdd);
        }
         this.setState({addedCanvassers:newArray})
    }
    removeCanvasser(canvasserToRemove){
        let newArray = this.state.addedCanvassers.slice();
         let indexToRemove = newArray.findIndex((canvasser)=>{
             return canvasser.canvasser_id===canvasserToRemove.canvasser_id;
         })
         newArray.splice(indexToRemove,1);
         this.setState({addedCanvassers:newArray})
    }
    render() {
        let addedCanvassers = this.state.addedCanvassers.map(canvasser=>(
            <div key={canvasser.canvasser_id} onClick={()=>this.removeCanvasser(canvasser)}>{canvasser.name}</div>)
        )
        return (
            <div className="send_text_container">
                <div className="text_canvassers_list_container">
                    {/* <AdvanceCanvassers advance_id={this.props.advance_id}/> */}
                    <ListCanvassers selectCanvasser={this.selectCanvasser} canvassers={this.state.canvassers}/>
                </div>
                <div className="send_text_right">
                <div className="container_set_size">
                    <div className="added_canvassers_container">
                        {addedCanvassers}
                    </div>
                </div>
                    <div className="text_message_edit_btn">
                        <textarea
                            maxLength={200}
                            className="text_area_box"
                        >

                        </textarea>
                        <button>Send Text Message</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SendText;