import React, { Component } from 'react';
import SubNavbar from "./../../Components/SubNavbar/SubNavbar";
import "./Advances.css"
import AdvancesList from '../../Components/AdvancesList/AdvancesList';
import axios from "axios";
import AdvanceInfo from '../../Components/AdvanceInfo/AdvanceInfo';
import MapCampaign from '../../Components/MapCampaign/MapCampaign';

class Advances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            advances:[],
            selectedAdvance:{
                advance_id:1
            },
            noAdvances: true,
            profileCount:0,
            canvasserCount:0,
            pinNumber:0,
            profiles:[]
            
        }
        this.selectAdvance = this.selectAdvance.bind(this);
        this.getStats = this.getStats.bind(this);
        this.setNewAdvances = this.setNewAdvances.bind(this);
        this.getProfilesForMap = this.getProfilesForMap.bind(this);
    }
 
    componentDidMount(){
        axios.get("/api/advances/"+this.props.match.params.id).then(res=>{
            // console.log(res.data)
            if(res.data === "No Advances"){
                this.setState({advances:res.data});
            }
            else{
                this.setState({
                    advances:res.data,
                    selectedAdvance:res.data[0],
                    noAdvances:false
                })
            }
            this.getStats(this.state.selectedAdvance.advance_id)
        }).catch((err)=>alert(err));
    }
    selectAdvance(obj){
        this.getProfilesForMap(obj.advance_id)
        this.getStats(obj.advance_id)
        this.setState({selectedAdvance:obj})
    }
    setNewAdvances(advances){
        this.setState({advances})
    }
    getStats(id){
        axios.get("/api/stats/"+id).then(res=>{
            // console.log(res.data)
            if(res.data[2]){
                this.setState({
                    profileCount:res.data[0].count,
                    canvasserCount:res.data[1].count,
                    pinNumber:res.data[2]
    
                })
            }
            else{
                this.setState({
                    profileCount:res.data[0].count,
                    canvasserCount:res.data[1].count,
                    pinNumber:false
                })
            }
        })
    }
    getProfilesForMap(id){
        axios.get("/api/profiles-in-campaign/"+id).then(res=>{
            console.log(res.data);
            this.setState({
                profiles: res.data
            })
        }).catch(err=>console.log(err))
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <SubNavbar path="/advances" id={this.props.match.params.id} history={this.props.history}/>
                <div>
                    <div className="advance_view_container">
                        <div className="advance_left_box">{(this.state.noAdvances)?<div className="no_advances_right">No Campaigns</div>:
                            <AdvanceInfo advance={this.state.selectedAdvance} selectAdvance={this.selectAdvance} profileCount={this.state.profileCount} canvasserCount={this.state.canvasserCount} pinNumber={this.state.pinNumber}/>
                        }
                        </div>
                        <div className="advance_right_box">
                        
                            <MapCampaign match={this.props.match} profiles={this.state.profiles} />
                        
                        </div>
                    </div>
                        <div className="advance_left_box">
                        
                            <AdvancesList setNewAdvances={this.setNewAdvances} advances={this.state.advances} campaign_id={this.props.match.params.id} selectAdvance={this.selectAdvance}/>
                        
                        </div>
                </div>
            </div>
        );
    }
}

export default Advances;