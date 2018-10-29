function checkView(req,res){
        // console.log(req.session.user)
        if(req.session.user){
            res.status(200).json("loggedIn")
        }
        else{
            res.status(200).json("landingPage");
        }
}

function logout(req,res){
    console.log(req.session)
    req.session.destroy();
    console.log(req.session)
    res.status(200).send("ok");
}
function signup(req,res){
    const db = req.app.get('db')
    console.log(req.body)
    console.log(req.session.user)
    db.first_update_user([
        req.body.first,
        req.body.last,
        req.body.email,
        req.session.user.user_id
    ]).then(newUser=>{
         console.log("updating new user",newUser)
        req.session.user = newUser;
        console.log(process.env.REACT_APP_CLIENT+"/campaigns")
        res.status(200).send(newUser);
    }).catch(console.log)
}

module.exports = {
    checkView,
    logout,
    signup
}