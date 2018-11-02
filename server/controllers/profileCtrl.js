function addProfile(req,res){
    console.log(req.body.name);
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
         res.status(200).json("Success!");
    }).catch(err=>{
        console.log(err)
        res.status(200).json("Failed")
    })
}

module.exports = {
    addProfile
}