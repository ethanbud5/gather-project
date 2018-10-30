import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import "./Advances.css"
import AdvancesList from '../../Components/AdvancesList/AdvancesList';
import axios from "axios";

class Advances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advances:[]
            
        }
    }
 
    componentDidMount(){
        axios.get("/api/advances/"+this.props.match.params.id).then(res=>{
            // console.log(res.data)
            this.setState({advances:res.data});
        }).catch((err)=>alert(err));
    }
    render() {
        return (
            <div>
                <SubNavbar path="/advances" id={this.props.match.params.id}/>
                <div className="advance_view_container">
                    <div className="advance_left_box">
                        <AdvancesList advances={this.state.advances}/>
                    </div>
                    <div className="advance_right_box">
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default Advances;