import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import "./EnterProfile.css";
import Axios from 'axios';

class EnterProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            phone:"",
            email:"",
            address:"",
            city:"",
            state:"",
            zip:"",
            custom1:"",
            custom2:"",
            custom3:"",
            notes:"",
            custom1Name:"Custom 1",
            custom2Name:"Custom 2",
            custom3Name:"Custom 3",

        }
        this.changeHandler = this.changeHandler.bind(this);
    }
    componentDidMount(){
        Axios.get("/api/custom-field-names-canvasser").then(res=>{
            console.log(res.data)
        }).catch(err=>{
            alert(err)
        })
    }
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <Navbar path="/enter-profile"/>
                    <div className="profile_form_container">
                        <div className="inner_flex_inputs">
                            <label>Full Name</label>
                            <input className="input_wide" name="name" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Phone</label>
                            <input className="input_wide" name="phone" type="tel" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Email</label>
                            <input className="input_wide" name="email" type="email" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Address</label>
                            <input className="input_wide" name="address" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>City</label>
                            <input className="input_wide" name="city" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>State</label>
                            <input className="input_wide" id="state_input" name="state" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Zip</label>
                            <input className="input_wide" name="zip" type="number" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>{this.state.custom1Name}</label>
                            <input className="input_wide" name="custom1" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>{this.state.custom2Name}</label>
                            <select className="input_wide" name="custom2" onChange={this.changeHandler}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>{this.state.custom3Name}</label>
                            <input className="input_wide" name="custom3" type="number" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs" id="last_input_textarea">
                            <label>Notes</label>
                            <textarea className="input_wide" id="notes_textarea" name="notes" type="text" onChange={this.changeHandler}/>
                        </div>
                    </div>
                            <div className="profile_btn_container">
                                <button className="input_wide" id="profile_submit_btn">Submit</button>
                            </div>
            </div>
        );
    }
}

export default EnterProfile;