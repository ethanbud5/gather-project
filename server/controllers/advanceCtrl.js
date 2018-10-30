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
module.exports = {
    getAdvances
}