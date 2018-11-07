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
            //  console.log(advance)
    } else {
        console.log("No Advances")
        res.status(200).send("No Advances")
        }
    }).catch(console.log)
}

// generate pin number
function makePinNumber(req,res,responseToSend){
    let randomNumber = Math.floor(Math.random() * (9999 - 1000) ) + 1000;
    let db = req.app.get("db")
    db.pin_number.find({pin:randomNumber}).then(pin_array=>{
        if(pin_array.length===0){
            db.pin_number.insert({pin:randomNumber,advance_id:req.params.id}).then(response=>{
                // console.log("Created Pin: "+response)
                responseToSend.push(randomNumber);
                res.status(200).json(responseToSend);
            }).catch(console.log)
        }
        else{
           pinNumber(req)
        }
    })
}

function getAdvanceStats(req,res){
    let responseToSend = []
    const db = req.app.get('db')
    // console.log(req.params.id)
    db.get_advance_count(req.params.id).then(count1=>{
        responseToSend.push(count1[0]);
        // console.log("count1: "+count1.count);
        db.advance_canvassers_count(req.params.id).then(count2=>{
            // console.log("count2: "+count2.count);
            responseToSend.push(count2[0]);
            db.advance.find({advance_id:req.params.id}).then(advance=>{
                if(advance[0].date_finished !== null){
                    res.status(200).json(responseToSend);
                }
                else{
                    db.pin_number.find({advance_id:req.params.id}).then(pin_array=>{
                        if(pin_array.length===0){
                            makePinNumber(req,res,responseToSend);
                        }
                        else{
                            responseToSend.push(pin_array[0].pin)
                            res.status(200).json(responseToSend);
                        }
                    }).catch((err)=>res.status(500).send(err))
                }
            }).catch((err)=>res.status(500).send(err))
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

function deletePin(req,res){
    const db = req.app.get('db')
    db.query(`
        update advance
            set date_finished = now()
            where advance_id = ${req.params.id};
        SELECT * FROM advance
            WHERE advance_id = ${req.params.id}
    `).then(advancedUpdated=>{
        // console.log(response)
        db.pin_number.destroy({advance_id:req.params.id}).then(response=>{
                res.status(200).json(advancedUpdated[0])
        }).catch(err=>res.status(500).send(err))
    })
    // console.log(req.params.id)
}


module.exports = {
    getAdvances,
    getAdvanceStats,
    addAdvance,
    deletePin
}