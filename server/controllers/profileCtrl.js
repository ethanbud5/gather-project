const moment = require("moment")
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
        notes,
        lat,
        lng
    } = req.body;

    let custom_1 = custom1;
    let custom_2 = custom2;
    let custom_3 = custom3; 
    if(custom2===""){
         custom_2 = null;
    }

    db.profile.insert({
        name,
        phone,
        email,
        address,
        city,
        state,
        zip,
        custom_1,
        custom_2,
        custom_3,
        notes,
        advance_id:req.session.canvasser.pin_number.advance_id,
        lat,
        lng
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
function formatProfilesForTable(profiles){
    let formattedProfiles = profiles.map(profile=>{
        profile.custom_3 = JSON.stringify(profile.custom_3)
        profile.date_entered = moment(profile.date_entered).format("MM-DD-YYYY h:mm a")
        return profile
    })
    return formattedProfiles
}
function getProfiles(req,res){
    const db = req.app.get('db')
    db.query(
        ` select *
        from custom_fields
        where campaign_id in(
          select campaign_id
          from campaign
          where campaign_id = ${req.params.id}
        );`
    ).then(namesArray=>{
        // console.log(namesArray)
        db.query(
            `
            select *
                from profile pro
                join advance ad
                on ad.advance_id = pro.advance_id
                where ad.campaign_id =  ${req.params.id}
                order by pro.date_entered desc;
             `
        ).then(profiles=>{
            res.status(200).json({
                custom:{
                    custom_1:namesArray[0].custom_text_1,
                    custom_2:namesArray[0].custom_text_2,
                    custom_3:namesArray[0].custom_text_3,
                },
                profiles:formatProfilesForTable(profiles)
            })
        }).catch(err=>res.status(200).json({
            custom:{
                custom_1:namesArray[0].custom_text_1,
                custom_2:namesArray[0].custom_text_2,
                custom_3:namesArray[0].custom_text_3,
            },
            profiles:[]
        }))
    }).catch(err=>{
        res.status(500).send(err);
    })
}
function getProfilesCampaign(req,res){
    const db = req.app.get('db')
    db.profile.find({advance_id:req.params.id}).then(profiles=>{
        res.status(200).json(profiles)
    }).catch(err=>res.status(500).json(err))
    
}


module.exports = {
    addProfile,
    getRecentlyAdded,
    getProfiles,
    getProfilesCampaign
}