import React, { Component } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import "./EnterProfile.css";
import Axios from 'axios';
import Geocode from "react-geocode";


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
            custom3:true,
            notes:"",
            custom1Name:"Custom 1",
            custom2Name:"Custom 2",
            custom3Name:"Custom 3",
            statusMessage:""

        }
        this.changeHandler = this.changeHandler.bind(this);
        this.addNewProfile = this.addNewProfile.bind(this);
    }
    componentDidMount(){
        //TODO: if i use this view for the users, then i need to make a conditional 
        //to change endpoint because current one looks for req.session.canvasser
        Axios.get("/api/custom-field-names-canvasser").then(res=>{
            // console.log(res.data)
            this.setState({
                custom1Name:res.data.custom_text_1,
                custom2Name:res.data.custom_text_2,
                custom3Name:res.data.custom_text_3
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    changeHandler(e){
        this.setState({[e.target.name]:e.target.value})
    }
    addNewProfile(){
        let {
            name,
            phone,
            email,
            address,
            city,
            state,
            zip,
            custom1,
            custom2,
            custom3,
            notes
        } = this.state
        if(name==="" || address ===""||city===""||zip===""||state===""){
            alert("Please enter name and address");
            return
        }

        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
        Geocode.fromAddress(address+","+city).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            Axios.post("/api/profile",{
                name,
                phone,
                email,
                address,
                city,
                state,
                zip,
                custom1,
                custom2,
                custom3,
                notes,
                lat,
                lng
            }).then(res=>{
                if(res.data === "Failed"){
                    this.setState({
                        statusMessage:res.data
                    })
                }
                else{
                    this.setState({
                        statusMessage:res.data,
                        name:"",
                        phone:"",
                        email:"",
                        address:"",
                        city:"",
                        state:"",
                        zip:"",
                        custom1:"",
                        custom2:"",
                        custom3:true,
                        notes:""
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        error => {
            alert("Invalid Address!")
        }
        );

    }
    render() {
        // console.log(this.state)
        let {
            name,
            phone,
            email,
            address,
            city,
            state,
            zip,
            custom1,
            custom2,
            notes
        } = this.state
        return (
            //TODO: make sure that the values being inputed are valid
            <div>
                <Navbar path="/enter-profile" history={this.props.history}/>
                    <div className="profile_form_container">
                        <div className="inner_flex_inputs">
                            <label>Full Name</label>
                            <input className="input_wide" value={name} name="name" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Phone</label>
                            <input className="input_wide" value={phone} name="phone" type="tel" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Email</label>
                            <input className="input_wide" value={email} name="email" type="email" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Address</label>
                            <input className="input_wide" value={address} name="address" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>City</label>
                            <input className="input_wide" value={city} name="city" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>State</label>
                            <input className="input_wide" value={state} id="state_input" name="state" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>Zip</label>
                            <input className="input_wide" value={zip} name="zip" type="number" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>{this.state.custom1Name}</label>
                            <input className="input_wide" value={custom1} name="custom1" type="text" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>{this.state.custom2Name}</label>
                            <input className="input_wide" value={custom2} name="custom2" type="number" onChange={this.changeHandler}/>
                        </div>
                        <div className="inner_flex_inputs">
                            <label>{this.state.custom3Name}</label>
                            <select className="input_wide" name="custom3" onChange={this.changeHandler}>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                        <div className="inner_flex_inputs" id="last_input_textarea">
                            <label>Notes</label>
                            <textarea className="input_wide" value={notes} id="notes_textarea" name="notes" type="text" onChange={this.changeHandler}/>
                        </div>
                    </div>
                    <div className="profile_add_status">
                        {this.state.statusMessage}
                    </div>
                            <div className="profile_btn_container">
                                <button onClick={this.addNewProfile} className="input_wide" id="profile_submit_btn">Submit</button>
                            </div>
            </div>
        );
    }
}

export default EnterProfile;