const {getCampaigns,getSurveyStats,addCampaign,getDashboardInfo,editCampaign} = require("./controllers/campaignCtrl")
const {logout,checkView,signup,loginCanvasser,checkAuthUser} = require("./controllers/accountCtrl")
const {getAdvances,getAdvanceStats,addAdvance,deletePin,editAdvance,sendEmail} = require("./controllers/advanceCtrl");
const {getCanvassers,getAdvanceCanvassers,addCanvasser,addCanvasserInfo,getCustomFieldsCanvasser,editCanvasser,deleteCanvasser} = require("./controllers/canvasserCtrl");
const {sendText} = require("./controllers/twilioCtrl");
const {addProfile,getRecentlyAdded,getProfiles,getProfilesCampaign} = require("./controllers/profileCtrl");
const fs = require("fs");

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
    app.post("/api/campaign",addCampaign);
    app.put("/api/canvasser",editCanvasser);
    app.delete("/api/canvasser/:id",deleteCanvasser);
    app.get("/api/dashboard-info/:id",getDashboardInfo)
    app.put("/api/campaign",editCampaign);
    app.delete("/api/pin/:id",deletePin);
    app.get("/api/profiles-in-campaign/:id",getProfilesCampaign);
    app.put("/api/advance",editAdvance);
    app.get("/api/route-auth",checkAuthUser);
    app.get("/api/sendemail",sendEmail)

    /**CANVASSER */
    app.post("/api/canvasser/login",loginCanvasser);
    app.post("/api/canvasser/addinfo",addCanvasserInfo);
    app.get("/api/custom-field-names-canvasser",getCustomFieldsCanvasser)
    app.post("/api/profile",addProfile)
    app.get("/api/recently-added",getRecentlyAdded)
} 