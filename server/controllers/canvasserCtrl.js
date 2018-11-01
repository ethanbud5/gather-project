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

function formatPhone(num){
    var removedChar = num.replace(/[^\d]/g,'').split("")
    return removedChar.splice(removedChar.length-10).join("")
}

function addCanvasserToAdvance(canvasser,req){
    db.canvasser_in_advance.insert({
        advance_id:req.session.canvasser.pin_number.advance_id,
        canvasser_id:canvasser.canvasser_id
      }).then(canvasser=>{
          res.status(200).json(canvasser);
      }).catch(err=>res.status(500).json(err));
}

function addCanvasserInfo(req,res){
    console.log('req cookie: ', req.session);
    // res.status(200).json(req.session.canvasser)
    const db = req.app.get('db')
    db.query(` 
      select gather_users.user_id
      from gather_users 
      join campaign cam
      on gather_users.user_id = cam.user_id
      join advance ad
      on ad.campaign_id = cam.campaign_id
      where ad.advance_id = ${req.session.canvasser.pin_number.advance_id};`).then(gather_user_id=>{
        //   console.log('gather_user_id: ', gather_user_id);
        db.query(`select can.name,can.canvasser_id,can.phone,can.user_id from canvasser can join gather_users u
        on can.user_id = u.user_id
        where can.phone = '${req.body.phone}' and 
        u.user_id = '${gather_user_id[0].user_id}';`).then(array=>{
            // console.log('array: ', array);
           //  console.log(array)
           if(array.length ===0){
               db.canvasser.insert({
                   name:req.body.name,
                   phone:req.body.phone,
                   user_id:gather_user_id[0].user_id
                 }).then(canvasser=>{
                   db.canvasser_in_advance.insert({
                       advance_id:req.session.canvasser.pin_number.advance_id,
                       canvasser_id:canvasser.canvasser_id
                     }).then(response=>{
                         req.session.canvasser.info = canvasser
                        //  console.log("session:  ",req.session.canvasser)
                         res.status(200).json(canvasser);
                     }).catch(err=>res.status(500).json(err));
                 }).catch(err=>res.status(500).json(err));
           }
           else{
            db.canvasser_in_advance.insert({
                advance_id:req.session.canvasser.pin_number.advance_id,
                canvasser_id:array[0].canvasser_id
              }).then(response=>{
                  req.session.canvasser.info = array[0]
                //   console.log("session:  ",req.session.canvasser)
                  res.status(200).json(array[0]);
              }).catch(err=>res.status(500).json(err));
           }
           //  res.status(200).json(array)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
       //  res.status(200).json(array)
    }).catch(err=>{
        console.log(err)
        res.status(500).send(err)
    })
    //first I need to check if user exists by phone number in user table where the select advance references the user
    //if they do exist, add user to canvasser_in_advance table
    //if they don't, add them to the user admin that created that advance
    //then add the user to the req.session.canvasser obj
    // console.log(formatPhone(req.body.phone))

}

module.exports = {
    getCanvassers,
    getAdvanceCanvassers,
    addCanvasser,
    addCanvasserInfo
}