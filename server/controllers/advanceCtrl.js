function getAdvances(req,res){
    // console.log("session: ",req.session)
    const db = req.app.get('db')
    db.advance.find({
        campaign_id: req.params.id
    }
    , {
        order:[
            {
            field:"date_created",
            direction:"desc"
            }
        ]
    }
    ).then(advance=>{
        if (advance.length !==0){
            res.status(200).json(advance);
             console.log(advance)
    } else {
        console.log("No Advances")
        res.status(200).send("No Advances")
        }
    }).catch(console.log)
}
function getAdvanceStats(req,res){
    let responseToSend = []
    const db = req.app.get('db')
    console.log(req.params.id)
    db.get_advance_count(req.params.id).then(count1=>{
        responseToSend.push(count1[0]);
        // console.log("count1: "+count1.count);
        db.advance_canvassers_count(req.params.id).then(count2=>{
            // console.log("count2: "+count2.count);
            responseToSend.push(count2[0]);
            
            res.status(200).json(responseToSend);
        }).catch((err)=>res.status(500).send(err))
    }).catch((err)=>res.status(500).send(err))
}
function addAdvance(req,res){
    const db = req.app.get('db')
    let {title,campaign_id} = req.body
    db.advance.insert({
      title,
      campaign_id
    }).then(advance=>{
        db.advance.find({
            campaign_id
        }
        , {
            order:[
                {
                field:"date_created",
                direction:"desc"
                }
            ]
        }).then(response=>{
            res.status(200).send(response)
        }).catch(console.log)
    }).catch(console.log)
}
module.exports = {
    getAdvances,
    getAdvanceStats,
    addAdvance
}