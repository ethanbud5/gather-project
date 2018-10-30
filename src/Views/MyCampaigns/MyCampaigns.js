import React, { Component } from 'react';
import Axios from 'axios';
import "./MyCampaigns.css";
import Navbar from "./../../Components/Navbar/Navbar";
import {Link} from "react-router-dom";


class MyCampaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns:[]
        }
    }
    
    componentDidMount(){
        Axios.get("/api/campaigns").then(res=>{
            this.setState({campaigns:res.data});
        }).catch((err)=>alert(err))
    }
    render() {
        let listCampaigns = this.state.campaigns.map((campaign,i)=>(
            <Link to={"/campaign/"+campaign.campaign_id} key={campaign.campaign_id} className="campaign_card old_campaign">
                <div>
                    <h2>{campaign.title}</h2>
                </div>
            </Link>
        ))
        return (
            <div>
                <Navbar path="/campaigns"/>
                <div className="flex_center">
                    <h1>MyCampaigns</h1>
                    <div className="campaign_card_container">
                        {listCampaigns}
                        <div className="campaign_card create_campaign">
                            <h2>Create New Campaign...</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyCampaigns;