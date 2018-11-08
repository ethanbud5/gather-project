import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import "./CanvasserLogin.css"
import Axios from 'axios';

class CanvasserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns:[],
            customInputView:false,
            phone:"",
            name:"",
            pin:"",
            statusDiv:""
        }
        this.showInfoFields = this.showInfoFields.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.loginCanvasser = this.loginCanvasser.bind(this);
        this.submitCanvasserInfo = this.submitCanvasserInfo.bind(this);
    }

    showInfoFields(){
        this.setState({customInputView:!this.state.customInputView})
    }
    inputChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    loginCanvasser(){
        Axios.post("/api/canvasser/login",{
            pin:this.state.pin
        }).then(res=>{
            this.showInfoFields()
        }).catch(err=>{
            this.setState({
                statusDiv:"Invalid Pin",
                pin:""
        })
        })
    }
    submitCanvasserInfo(){
        Axios.post("/api/canvasser/addinfo",{
            name:this.state.name,
            phone:this.state.phone
        }).then(res=>{
            // console.log(res.data)
            this.props.checkView()
            this.setState({
                name:"",
                phone:""
            })
            this.props.history.push("/enter-profile")
        }).catch(err=>{
            alert(err)
        })
    }

    render() {
        return (
            <div>
                <Navbar path="/enter-pin" history={this.props.history}/>
                {this.state.customInputView?
                            <div className="add_survey_container">
                                <h2>
                                    Enter Info
                                </h2>
                                <div className="input_container">
                                    <div className="inner_flex_inputs_campaigns">
                                        <label>Name</label>
                                        <input className="input_wide" type="text" name="name" value={this.state.name} onChange={this.inputChange} placeholder="Name"  />
                                    </div>
                                    <div className="inner_flex_inputs_campaigns">
                                        <label>Phone</label>
                                        <input className="input_wide" type="tel" name="phone" value={this.state.phone} onChange={this.inputChange} placeholder="Phone"  />
                                    </div>
                                </div>
                                <div className="add_survey_btn_container">
                                    <button className="next_btn" onClick={this.showInfoFields}>Back</button>
                                    <button className="next_btn" onClick={this.submitCanvasserInfo}>Login</button>
                                </div>
                            
                        </div>
                            :
                            <div className="add_survey_container">
                        <h2>
                            Enter Pin
                        </h2>
                        <div className="input_container">
                            <div className="inner_flex_inputs_pin">
                                <input className="input_wide" name="pin" onChange={this.inputChange} value={this.state.pin} id="goal_input" type="number" placeholder="Pin" />
                            </div>
                            <div className="inner_flex_inputs_pin pin_status_div">{this.state.statusDiv}</div>
                        </div>
                        <div className="add_survey_btn_container">
                            <button className="next_btn" onClick={this.loginCanvasser}>Next</button>
                        </div>
                        
                    </div>
                }
            </div>
        );
    }
}

export default CanvasserLogin;