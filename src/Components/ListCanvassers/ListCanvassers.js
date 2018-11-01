import React, { Component } from 'react';
import "./ListCanvassers.css";
import Modal from "react-modal";
import Axios from 'axios';
import {connect} from "react-redux";
import {getCanvassers} from "./../../ducks/reducer";

class ListCanvassers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            name:"",
            phone:""
        }
        this.closeModal = this.closeModal.bind(this);
        this.openView = this.openView.bind(this);
        this.addAdvance = this.addAdvance.bind(this);
    }
    componentDidMount(){
        this.props.getCanvassers()
    }
    closeModal(){
        this.setState({
            showModal:false
        })
    }
    openView(){
        this.setState({
            showModal:true
        })
    }
    inputChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    addAdvance(){
        let {name,phone} = this.state;
        if(name ==="" || phone===""){
            alert("Please fill in all fields.")
            return
        }
        Axios.post("/api/canvasser",{
            name:this.state.name,
            phone:this.state.phone
        }).then(res=>{
            this.props.getCanvassers();
            this.setState({showModal:false})
        }).catch(err=>alert(err));
    }
    render() {
        let list
        if(this.props.showAdvancedCanvassers){
            if(this.props.filteredCanvassers.length ===0){
                list= <div>No Canvassers...</div>
            }
            else if(this.props.showAdvancedCanvassers){
                 list = this.props.filteredCanvassers.map(canvasser=>{
                return <div onClick={()=>{this.props.selectCanvasser(canvasser); (this.props.history)&&this.props.history.push("/canvassers/view")}} key={canvasser.canvasser_id} className="canvasser_card">
                    <h2>{canvasser.name}</h2>
                </div>
                })
            }
        }
        else{ 
        if(this.props.canvassers.length===0){
            list= <div>No Canvassers...</div>
        }
        else{
             list = this.props.canvassers.map(canvasser=>{
            return <div onClick={()=>{this.props.selectCanvasser(canvasser); (this.props.history)&&this.props.history.push("/canvassers/view")}} key={canvasser.canvasser_id} className="canvasser_card">
                <h2>{canvasser.name}</h2>
            </div>
                })
            }
        }
        return (
            <div>
                <div className="input_search_canvassers">
                    <input type="text" placeholder="Search..."/>
                    {/* TODO: Add search for canvassers */}
                    <button onClick={this.openView} className="add_canvasser_btn">Add New Canvasser</button>
                </div>
                <div className="canvasser_card_container">
                    {list}
                </div>
                <Modal 
                isOpen={this.state.showModal}
                ariaHideApp={false}
                onRequestClose={this.closeModal}
                className="modal_green"
                
                >
                    <div className="add_advance_container">
                        <h2>
                            Add New Canvasser
                        </h2>
                        <input type="text" name="name" onChange={(e)=>this.inputChange(e)} placeholder="Name"/>
                        <input type="tel" name="phone" onChange={(e)=>this.inputChange(e)} placeholder="Phone"/>
                        <div>
                            <button onClick={this.closeModal} className="gray_btn">Cancel</button>
                            <button onClick={this.addAdvance} className="gray_btn">Add</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        canvassers:state.canvassers
    }
}

export default connect(mapStateToProps,{getCanvassers})(ListCanvassers);