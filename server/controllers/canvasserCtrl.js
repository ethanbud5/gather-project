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

function getAdvanceCanvassers(req,res){
    const db = req.app.get('db')
    db.advance_canvassers(req.params.id).then(canvassers=>{
        if (canvassers.length !==0){
            // console.log(campaigns)
            res.status(200).json(canvassers);
    } else {
        console.log("No Canvassers")
        res.sendStatus(404)
        }
    }).catch(console.log)
}

function addCanvasser(req,res){
    const db = req.app.get('db')
    let {name,phone} = req.body
    db.canvasser.insert({
      name,
      phone,
      user_id:req.session.user.user_id
    }).then(canvasser=>{
        res.status(200).json(canvasser);
    }).catch(err=>res.status(500).json(err));
}

module.exports = {
    getCanvassers,
    getAdvanceCanvassers,
    addCanvasser
}