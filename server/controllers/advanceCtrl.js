function getAdvances(req,res){
    // console.log("session: ",req.session)
    const db = req.app.get('db')
    db.advance.find({
        campaign_id: req.params.id
    }).then(advance=>{
        if (advance.length !==0){
            res.status(200).json(advance);
            // console.log(campaigns)
    } else {
        console.log("No Advances")
        res.status(200).send("No Advances")
        }
    }).catch(console.log)
}
function getAdvanceStats(req,res){
    const db = req.app.get('db')
    db.get_advance_stats(req.params.id).then(response=>{
        res.status(200).json(response);
    }).catch((err)=>res.status(500).send(err))
}
module.exports = {
    getAdvances,
    getAdvanceStats
}