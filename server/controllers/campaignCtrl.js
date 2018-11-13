function getCampaigns(req,res){
    // console.log("session: ",req.session)
    const db = req.app.get('db')
    db.campaign.find({
        user_id: req.session.user.user_id
    }).then(campaigns=>{
        if (campaigns.length !==0){
            // console.log(campaigns)
            res.status(200).json(campaigns);
    } else {
        console.log("No Campaigns")
        res.sendStatus(404)
        }
    }).catch(console.log)
}

function getSurveyStats(req,res){
    let profileCount = null;
    let custom_3_true = null;
    const db = req.app.get('db')
    db.query(
        `      select count(*)
                from profile pro
                join advance ad
                on ad.advance_id = pro.advance_id
                where ad.campaign_id =  ${req.params.id}
        `
    ).then(resProfileCount=>{
        profileCount = +resProfileCount[0].count;
        db.query(
            `   select count(*)
            from profile pro
            join advance ad
            on ad.advance_id = pro.advance_id
            where ad.campaign_id =  ${req.params.id}
            and pro.custom_3 = true;
            `
        ).then(resCustom3True=>{
            custom_3_true = +resCustom3True[0].count;
            db.query(
                ` select *
                from custom_fields
                where campaign_id in(
                  select campaign_id
                  from campaign
                  where campaign_id = ${req.params.id}
                );`
            ).then(namesArray=>{
                db.query(
                    `
                    select campaign_goal
                        from campaign
                        where campaign_id =  ${req.params.id};
                     `
                ).then(goal=>{
                    db.query(
                        `
                        select custom_2
                        from profile pro
                        join advance ad
                        on ad.advance_id = pro.advance_id
                        where ad.campaign_id =  ${req.params.id}
                        `
                        ).then(custom_2Array=>{
                                    db.query(
                                        `
                                        select ad.advance_id, ad.title, count(pro.profile_id)
                                        from advance ad
                                        left join profile pro
                                        on ad.advance_id = pro.advance_id
                                        where ad.campaign_id = ${req.params.id}
                                        group by ad.advance_id;
                                        `
                                        ).then(advanceProfiles=>{
                                            let profilesPerAdvance = {
                                                titles:[],
                                                data:[]
                                            }
                                            advanceProfiles.map(advanceProfile=>{
                                                profilesPerAdvance.titles.push(advanceProfile.title)
                                                profilesPerAdvance.data.push(advanceProfile.count)
                                            })
                                            db.query(
                                                `
                                                select ad.advance_id, ad.title, count(cia.canvasser_id) as canvassers_joined
                                                from advance ad
                                                  left join canvasser_in_advance cia
                                                  on ad.advance_id = cia.advance_id
                                                  where ad.campaign_id = ${req.params.id}
                                                  group by ad.advance_id
                                                  order by ad.advance_id asc;
                                                `
                                                ).then(advanceCanvassers=>{
                                                    let canvassersPerAdvance = {
                                                        titles:[],
                                                        data:[]
                                                    }
                                                    advanceCanvassers.map(advanceCanvasser=>{
                                                        canvassersPerAdvance.titles.push(advanceCanvasser.title)
                                                        canvassersPerAdvance.data.push(advanceCanvasser.canvassers_joined)
                                                    })
                                                    // console.log(canvassersPerAdvance)
                                                    db.query(
                                                        `
                                                        select can.name, count(pro.canvasser_id) as profile_count
                                                        from canvasser can
                                                          left join profile pro
                                                          on pro.canvasser_id = can.canvasser_id
                                                          join advance ad
                                                          on ad.advance_id = pro.advance_id
                                                          where ad.campaign_id = ${req.params.id}
                                                          group by can.name
                                                          order by profile_count desc
                                                          limit 5;
                                                        `
                                                        ).then(topCanvassers=>{
                                                            // console.log(topCanvassers)
                                                            res.status(200).json({
                                                                profileCount,
                                                                custom_3_true,
                                                                custom_3_false:profileCount-custom_3_true,
                                                                customNames:namesArray[0],
                                                                goal:goal[0].campaign_goal,
                                                                custom_2Array:custom_2Array.map(obj=>obj.custom_2),
                                                                profilesPerAdvance,
                                                                canvassersPerAdvance,
                                                                topCanvassers
                                                            })
                                                        }).catch(err=>console.log(err))
                                                }).catch(err=>console.log(err))
                                        }).catch(err=>console.log(err))
                        }).catch(err=>res.status(500).json(err))
                    }).catch(err=>res.status(500).json(err))
            }).catch(err=>res.status(500).json(err))
        }).catch(err=>res.status(500).json(err))
    }).catch(err=>res.status(500).json(err))
}

function addCampaign(req,res){
    // console.log(req.body)
    const db = req.app.get('db')
    let {title,goal,custom1,custom2,custom3} = req.body
    db.campaign.insert({
      title,
      campaign_goal:goal,
      user_id:req.session.user.user_id
    }).then(campaign=>{
        console.log(campaign)
        db.custom_fields.insert({
            campaign_id:campaign.campaign_id,
            custom_text_1:custom1,
            custom_text_2:custom2,
            custom_text_3:custom3,
          }).then(customNames=>{
              res.status(200).json("Created")
          }).catch(err=>res.status(500).json(err));
    }).catch(err=>res.status(500).json(err));
}
function getDashboardInfo(req,res){
    const db = req.app.get('db')
    db.query(
        `      select count(*)
                from profile pro
                join advance ad
                on ad.advance_id = pro.advance_id
                where ad.campaign_id =  ${req.params.id}
        `
    ).then(resProfileCount=>{
        db.query(
            `
            select campaign_goal
            from campaign
            where campaign_id =  ${req.params.id};
            `
            ).then(goal=>{
                db.campaign.find({
                    campaign_id: req.params.id
                }
                ).then(campaignName=>{
                    db.advance.find({
                        campaign_id: req.params.id
                    }
                    , {
                        order:[
                            {
                            field:"date_created",
                            direction:"desc"
                            }
                        ],
                        limit:3
                    }
                    ).then(advance=>{
                        db.query(
                            `
                            select can.name, count(pro.canvasser_id) as profile_count
                            from canvasser can
                              left join profile pro
                              on pro.canvasser_id = can.canvasser_id
                              join advance ad
                              on ad.advance_id = pro.advance_id
                              where ad.campaign_id = ${req.params.id}
                              group by can.name
                              order by profile_count desc
                              limit 3;
                            `
                            ).then(topCanvassers=>{
                                // console.log(topCanvassers)
                                if (advance.length !==0){
                                    // res.status(200).json(advance);
                                    let profileCount = +resProfileCount[0].count;
                                    res.status(200).json({
                                        goal:goal[0].campaign_goal,
                                        profileCount,
                                        recentCampaigns:advance,
                                        campaignName:campaignName[0],
                                        topCanvassers
                                })
                                    //  console.log(advance)
                            } else {
                                console.log("No Advances")
                                // res.status(200).send("No Advances")
                                let profileCount = +resProfileCount[0].count;
                                res.status(200).json({
                                    goal:goal[0].campaign_goal,
                                    profileCount,
                                    recentCampaigns:[],
                                    campaignName:campaignName[0],
                                    topCanvassers
                            })
                                }
                            }).catch(err=>console.log(err))
                    }).catch(console.log)
                }).catch(console.log)

        }).catch(err=>res.status(500).json(err))
    }).catch(err=>res.status(500).json(err))
}
function editCampaign(req,res){
    // console.log(req.body)
    const db = req.app.get('db')
    db.campaign.save(req.body).then(updatedCampaign=>{
        res.status(200).json(updatedCampaign)
    }).catch(err=>res.status(500).send(err))
}
module.exports = {
    getCampaigns,
    getSurveyStats,
    addCampaign,
    getDashboardInfo,
    editCampaign
}