const twilio = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

function sendText(req,res){
    if(req.body.numbers.length>1){
        res.status(200).json("Success")
    }
    req.body.numbers.map(num=>{
        twilio.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            // to: process.env.CELL_PHONE_NUMBER,
            to: num,
            body: req.body.message
          }).then((message) =>{
            //    console.log(message.sid)
            //    res.status(200).json("Success")
        }).catch(err=>res.status(500).send(err));
    })
    res.status(200).json("Success")
    //TODO: only return response of response was successful
}

module.exports = {
    sendText
}