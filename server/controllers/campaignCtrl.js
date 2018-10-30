function getCampaigns(req,res){
    // console.log("session: ",req.session)
    const db = req.app.get('db')
    db.campaign.find({
        user_id: req.session.user.user_id
    }).then(campaigns=>{
        if (campaigns.length !==0){
            // console.log(campaigns)
            res.status(200).json(campaigns);
    } else {
        console.log("No Campaigns")
        res.sendStatus(404)
        }
    }).catch(console.log)
}
module.exports = {
    getCampaigns
}