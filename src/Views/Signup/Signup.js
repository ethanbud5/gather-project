import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "./../../Components/Navbar/Navbar";

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            first:"",
            last:"",
            email:""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
    }
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    saveInfo(){
        axios.put("/api/signup",{
            first:this.state.first,
            last:this.state.last,
            email:this.state.email
        }).then(res=>{
            this.props.history.push("/campaigns")
        })
    }
    render() {
        return (
            <div>
                {/* <Navbar history={this.props.history}/> */}
                {/* <div className="signup_container">
                    <span>First Name:</span>
                    <input type="text" name="first" onChange={this.changeHandler}/>
                    <span>Last Name:</span>
                    <input type="text" name="last" onChange={this.changeHandler}/>
                    <span>Email:</span>
                    <input type="text" name="email" onChange={this.changeHandler}/>
                    <button onClick={this.saveInfo}>Save</button>
                </div> */}
                <div className="login_canvasser_container">
                    <h2>
                        Enter Info
                    </h2>
                    <div className="input_container">
                        <div className="inner_flex_inputs_campaigns">
                            <label>First Name</label>
                            <input className="input_wide" type="text" name="first" value={this.state.first} onChange={this.changeHandler} placeholder="First"  />
                        </div>
                        <div className="inner_flex_inputs_campaigns">
                            <label>Last Name</label>
                            <input className="input_wide" type="text" name="last" value={this.state.last} onChange={this.changeHandler} placeholder="Last"  />
                        </div>
                        <div className="inner_flex_inputs_campaigns">
                            <label>Email</label>
                            <input className="input_wide" type="text" name="email" value={this.state.email} onChange={this.changeHandler} placeholder="Email"  />
                        </div>
                    </div>
                    <div className="add_survey_btn_container">
                        <button className="next_btn" onClick={this.saveInfo}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;