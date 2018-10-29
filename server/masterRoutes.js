const {getCampaigns} = require("./controllers/campaignCtrl")
const {logout,checkView,signup} = require("./controllers/accountCtrl")

module.exports = app =>{
    /**USER */
    app.get("/api/campaigns",getCampaigns);
    app.get("/api/view",checkView);
    app.delete("/api/logout",logout);
    app.put("/api/signup",signup);
    /**CANVASSER */
}