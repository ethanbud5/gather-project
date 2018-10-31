import React, { Component } from 'react';
import "./SendText.css"
import axios from "axios";
import ListCanvassers from "./../ListCanvassers/ListCanvassers";

class SendText extends Component {
    constructor(props) {
        super(props);
        this.state={
            canvassers:[],
            addedCanvassers:[],
            textArea:"Here is the pin number for joining my survey!\n Pin Number: "+this.props.pin,
            successMessage:"",
            errorMessage:""
        }
        this.selectCanvasser = this.selectCanvasser.bind(this);
        this.removeCanvasser = this.removeCanvasser.bind(this);
        this.updateTextArea = this.updateTextArea.bind(this);
        this.sendTextMessage = this.sendTextMessage.bind(this);
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
    sendTextMessage(){
        let listOfNumbers = this.state.addedCanvassers.map(canvasser=>{
            return canvasser.phone;
        })
        axios.post("/api/sendtext",{
            numbers:listOfNumbers,
            message:this.state.textArea
        }).then(res=>{
            console.log('res: ', res);
            this.setState({successMessage:"Success!"})
        }).catch(err=>{
            this.setState({errorMessage:"Error Sending Message!"})
        })
        
    }
    updateTextArea(e){
        this.setState({textArea:e.target.value})
    }
    render() {
        let addedCanvassers;
        if(this.state.addedCanvassers.length === 0){
            addedCanvassers =  <div id="no_canvassers_added">Click on name to add canvasser...</div>
        }
        else{
             addedCanvassers = this.state.addedCanvassers.map(canvasser=>(
                <div key={canvasser.canvasser_id} onClick={()=>this.removeCanvasser(canvasser)}>
                <h1>{canvasser.name}</h1>
                </div>)
            )
        }
        return (
            <div className="send_text_container">
                <div className="text_canvassers_list_container">
                    <ListCanvassers selectCanvasser={this.selectCanvasser} canvassers={this.state.canvassers}/>
                </div>
                <div className="send_text_right">
                <div className="container_set_size">
                    <div className="added_canvassers_container">
                        {addedCanvassers}
                    </div>
                </div>
                    <div className="text_message_edit_btn">
                    {/* TODO: make an add all button that toggles */}
                        <textarea
                            maxLength={200}
                            className="text_area_box"
                            value={this.state.textArea}
                            onChange={this.updateTextArea}
                        >

                        </textarea>
                        <button onClick={this.sendTextMessage}>Send Text Message</button>
                        <div className="text_sent_status">{this.state.successMessage}</div>
                        <div className="text_sent_status">{this.state.errorMessage}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SendText;