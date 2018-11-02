function addProfile(req,res){
    // console.log(req.body.name);
    const db = req.app.get('db')
    let {
        name,
        phone,
        email,
        address,
        city,
        state,
        zip,
        custom1,
        custom2,
        custom3,
        notes
    } = req.body;

    db.profile.insert({
        name,
        phone,
        email,
        address,
        city,
        state,
        zip,
        custom_1:custom1,
        custom_2:custom2,
        custom_3:custom3,
        notes,
        advance_id:req.session.canvasser.pin_number.advance_id
    }).then(newProfile=>{
        //  console.log("creating new profile")
        if(req.session.canvasser.recentlyAdded){
            req.session.canvasser.recentlyAdded.push(newProfile);
        }
        else{
            req.session.canvasser = {
                    ...req.session.canvasser,
                    recentlyAdded:[newProfile]
            }
        }
         res.status(200).json("Success!");
    }).catch(err=>{
        console.log(err)
        res.status(200).json("Failed")
    })
}
function getRecentlyAdded(req,res){
    const db = req.app.get('db')
    db.query(
        ` select *
        from custom_fields
        where campaign_id in(
          select cam.campaign_id
          from campaign cam
          join advance ad
          on ad.campaign_id = cam.campaign_id
          where ad.advance_id = ${req.session.canvasser.pin_number.advance_id}
        );`
    ).then(namesArray=>{
        // console.log(namesArray)
        if(req.session.canvasser.recentlyAdded){
            let profiles = req.session.canvasser.recentlyAdded;

            res.status(200).json({
                custom:{
                    custom_1:namesArray[0].custom_text_1,
                    custom_2:namesArray[0].custom_text_2,
                    custom_3:namesArray[0].custom_text_3,
                },
                recentlyAdded:profiles
            })
        }
        else{
            res.status(200).send("No Profiles")
        }
    }).catch(err=>{
        res.send(500).send(err);
    })
}

module.exports = {
    addProfile,
    getRecentlyAdded
}