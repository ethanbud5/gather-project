function checkView(req,res){
        // console.log(req.session.user)
        req.session.user = {
            user_id:"google-oauth2|108374143480245744572",
            first_name:"Ethan",
            last_name:"Sanders",
            email:"ethanedu5@gmail.com"
        }
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
    db.gather_users.insert({
        first_name:req.body.first,
        last_name:req.body.last,
        email:req.body.email,
        user_id:req.session.user.id
    }).then(newUser=>{
         console.log("creating new user",newUser)
        req.session.user = newUser;
        // res.redirect(process.env.REACT_APP_CLIENT+"/campaigns");
        res.status(200).send(newUser)
    }).catch(console.log)
}

module.exports = {
    checkView,
    logout,
    signup
}