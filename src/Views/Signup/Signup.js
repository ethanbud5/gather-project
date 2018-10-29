import React, { Component } from 'react';
import axios from 'axios';

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
                <div className="signup_container">
                    <span>First Name:</span>
                    <input type="text" name="first" onChange={this.changeHandler}/>
                    <span>Last Name:</span>
                    <input type="text" name="last" onChange={this.changeHandler}/>
                    <span>Email:</span>
                    <input type="text" name="email" onChange={this.changeHandler}/>
                    <button onClick={this.saveInfo}>Save</button>
                </div>
            </div>
        );
    }
}

export default Signup;