import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import "./Advances.css"
import AdvancesList from '../../Components/AdvancesList/AdvancesList';
import axios from "axios";
import AdvanceInfo from '../../Components/AdvanceInfo/AdvanceInfo';

class Advances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advances:[],
            selectedAdvance:{}
            
        }
        this.selectAdvance = this.selectAdvance.bind(this);
    }
 
    componentDidMount(){
        axios.get("/api/advances/"+this.props.match.params.id).then(res=>{
            // console.log(res.data)
            if(res.data.length ===0){
                this.setState({advances:res.data});
            }
            else{
                this.setState({
                    advances:res.data,
                    selectedAdvance:res.data[0]
                })
            }
        }).catch((err)=>alert(err));
    }
    selectAdvance(obj){
        this.setState({selectedAdvance:obj})
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <SubNavbar path="/advances" id={this.props.match.params.id}/>
                <div className="advance_view_container">
                    <div className="advance_left_box">
                        <AdvancesList advances={this.state.advances} selectAdvance={this.selectAdvance}/>
                    </div>
                    <div className="advance_right_box">
                        <AdvanceInfo advance={this.state.selectedAdvance} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Advances;