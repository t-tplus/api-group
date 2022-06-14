const adminRouter=require("./auth")
const scoreRouter=require("./score")

module.exports=(app)=>{
    app.use('/api/tplus-group/auths',adminRouter)
    app.use('/api/tplus-group/scores',scoreRouter)
}
