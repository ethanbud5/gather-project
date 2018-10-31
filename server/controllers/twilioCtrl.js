const twilio = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

function sendText(req,res){
    // twilio.messages.create({
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     // to: process.env.CELL_PHONE_NUMBER,
    //     to: req.body.number,
    //     body: req.body.message
    //   }).then((message) =>{
    //     //    console.log(message.sid)
    //        res.status(200).json("Success")
    //   }).catch(err=>res.status(500).send(err));
    res.status(500).json("Success")
}

module.exports = {
    sendText
}