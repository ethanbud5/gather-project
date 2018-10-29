function getCampaigns(req,res){
    console.log("session: ",req.session.passport.user)
}
module.exports = {
    getCampaigns
}