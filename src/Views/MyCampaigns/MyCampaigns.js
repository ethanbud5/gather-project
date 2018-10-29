import React, { Component } from 'react';

class MyCampaigns extends Component {
    render() {
        let campaignList = ["campaign 1","campaign 2","campaign 3"];
        let listCampaigns = campaignList.map((campaign,i)=>(
            <div key={i} className="campaign_card">
                <h2>{campaign}</h2>
            </div>
        ))
        return (
            <div>
                MyCampaigns
                <div className="campaign_card_container">
                    {listCampaigns}
                </div>
            </div>
        );
    }
}

export default MyCampaigns;