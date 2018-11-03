const twilio = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

function sendText(req,res){
    // if(req.body.numbers.length>1){
    //     res.status(200).json("Success")
    // }
    req.body.numbers.map((num,i)=>{
        twilio.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            // to: process.env.CELL_PHONE_NUMBER,
            to: num,
            body: req.body.message
          }).then((message) =>{
               console.log(message)
            //    res.status(200).json("Success")
            if(i+1 === req.body.numbers.length){
                // console.log(req.body.numbers.length, i+1)
                res.status(200).json("Success")
            }
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err);
        });
    })
    //TODO: only return response of response was successful
}

module.exports = {
    sendText
}