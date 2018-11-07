import React, { Component } from 'react';
import Axios from 'axios';
import "./MyCampaigns.css";
import Navbar from "./../../Components/Navbar/Navbar";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getCampaigns} from "./../../ducks/reducer";
import Modal from "react-modal";


class MyCampaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns:[]
        }
        this.addCampaign = this.addCampaign.bind(this);
    }
    
    componentDidMount(){
        // Axios.get("/api/campaigns").then(res=>{
        //     this.setState({campaigns:res.data});
        // }).catch((err)=>console.error(err))
        this.props.getCampaigns()
    }
    addCampaign(){
        this.props.history.push("/campaigns/add-survey")
    }

    render() { 
        let listCampaigns = this.props.campaigns.map((campaign,i)=>(
            <Link to={"/campaign/"+campaign.campaign_id} key={campaign.campaign_id} className="campaign_card old_campaign">
                <div>
                    <h2>{campaign.title}</h2>
                </div>
            </Link>
        ))
        return (
            <div>
                <Navbar path="/campaigns" history={this.props.history}/>
                <div className="flex_center">
                {(this.props.isLoadingCam)?<div>Loading...</div>:
                    <div className="campaign_card_container">
                        {listCampaigns}
                        <div onClick={this.addCampaign} className="campaign_card create_campaign">
                            <h2>Create New Survey...</h2>
                        </div>
                    </div>
                }
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        campaigns:state.campaigns,
        isLoadingCam:state.isLoadingCam
    }
}

export default connect(mapStateToProps,{getCampaigns})(MyCampaigns);