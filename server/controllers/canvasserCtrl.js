function getCanvassers(req,res){
    const db = req.app.get('db')
    db.canvasser.find({
        user_id: req.session.user.user_id
    }).then(canvassers=>{
        if (canvassers.length !==0){
            // console.log(campaigns)
            res.status(200).json(canvassers);
    } else {
        console.log("No Canvassers")
        res.sendStatus(404)
        }
    }).catch(console.log)
}

module.exports = {
    getCanvassers
}