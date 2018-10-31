const {getCampaigns} = require("./controllers/campaignCtrl")
const {logout,checkView,signup} = require("./controllers/accountCtrl")
const {getAdvances,getAdvanceStats,addAdvance} = require("./controllers/advanceCtrl");
const {getCanvassers,getAdvanceCanvassers} = require("./controllers/canvasserCtrl");
const {sendText} = require("./controllers/twilioCtrl");

module.exports = app =>{
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
    app.post("/api/sendtext",sendText)
    /**CANVASSER */
}