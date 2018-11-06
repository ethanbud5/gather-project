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
            `SELECT COUNT(*)
            FROM profile
            WHERE custom_3 = true;
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
                                SELECT advance_id,title 
                                FROM advance 
                                WHERE campaign_id = ${req.params.id};  
                                `
                                ).then(advanceTitles=>{
                                    db.query(
                                        `
                                        SELECT count(*) as profile_count, ad.title, ad.advance_id
                                        FROM profile pro
                                        JOIN advance ad
                                        ON pro.advance_id = ad.advance_id
                                        WHERE ad.campaign_id = ${req.params.id}
                                        group by ad.title,ad.advance_id;  
                                        `
                                        ).then(profilePerAdvance=>{
                                            let profilesPerAdvance = {
                                                titles:[],
                                                data:[]
                                            }
                                            let newAdvanceTitles = advanceTitles.map(advTitle=>{
                                                profilesPerAdvance.titles.push(advTitle.title);
                                                profilePerAdvance.map(advTotal=>{
                                                  if(advTitle.advance_id === advTotal.advance_id){
                                                    advTitle = {...advTitle,...{profile_count:+advTotal.profile_count}}
                                                    profilesPerAdvance.data.push(advTotal.profile_count);
                                                }
                                            })
                                            if(!advTitle.profile_count){
                                                advTitle = {...advTitle,...{profile_count:0}}
                                                profilesPerAdvance.data.push(0);
                                                  }
                                                return advTitle;
                                              })
                                            res.status(200).json({
                                                profileCount,
                                                custom_3_true,
                                                custom_3_false:profileCount-custom_3_true,
                                                customNames:namesArray[0],
                                                goal:goal[0].campaign_goal,
                                                custom_2Array:custom_2Array.map(obj=>obj.custom_2),
                                                profilesPerAdvance
                                            })
                                        }).catch(err=>res.status(500).json(err))
                                }).catch(err=>res.status(500).json(err))
                        }).catch(err=>res.status(500).json(err))
                    }).catch(err=>res.status(500).json(err))
            }).catch(err=>res.status(500).json(err))
        }).catch(err=>res.status(500).json(err))
    }).catch(err=>res.status(500).json(err))
}
module.exports = {
    getCampaigns,
    getSurveyStats
}