const {getCampaigns,getSurveyStats} = require("./controllers/campaignCtrl")
const {logout,checkView,signup,loginCanvasser} = require("./controllers/accountCtrl")
const {getAdvances,getAdvanceStats,addAdvance} = require("./controllers/advanceCtrl");
const {getCanvassers,getAdvanceCanvassers,addCanvasser,addCanvasserInfo,getCustomFieldsCanvasser} = require("./controllers/canvasserCtrl");
const {sendText} = require("./controllers/twilioCtrl");
const {addProfile,getRecentlyAdded,getProfiles} = require("./controllers/profileCtrl");

module.exports = app =>{
    // TEST ENDPOINT
    app.get("/api/test",(req,res)=>{
        res.status(200).json(req.session);
    })

    /**USER */
    app.get("/api/campaigns",getCampaigns);
    app.get("/api/view",checkView);
    app.delete("/api/logout",logout);
    app.put("/api/signup",signup);
    app.get("/api/advances/:id",getAdvances);
    app.get("/api/stats/:id",getAdvanceStats);
    app.post("/api/advance",addAdvance);
    app.get("/api/canvassers",getCanvassers);
    app.get("/api/canvassers/:id",getAdvanceCanvassers);
    app.post("/api/sendtext",sendText);
    app.post("/api/canvasser",addCanvasser);
    app.get("/api/profiles/:id",getProfiles);
    app.get("/api/survey-stats/:id",getSurveyStats)

    /**CANVASSER */
    app.post("/api/canvasser/login",loginCanvasser);
    app.post("/api/canvasser/addinfo",addCanvasserInfo);
    app.get("/api/custom-field-names-canvasser",getCustomFieldsCanvasser)
    app.post("/api/profile",addProfile)
    app.get("/api/recently-added",getRecentlyAdded)
} 