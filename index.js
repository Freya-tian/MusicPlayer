const express = require('express');
const db = require('./Database/connect')
const app = express()
const singer  = require('./routes/singer')
const rank = require('./routes/rankList')
const historyList = require('./routes/historyList')
const search = require('./routes/search')
const recommend = require('./routes/recommend')
const collection = require('./routes/Collection')
const expressSwagger  = require('express-swagger-generator')(app);
const user = require('./routes/user')
const comment = require('./routes/comment')
const bodyParser = require('body-parser')
const cors = require('cors')

db.db.connect((err)=>{
    if(err) throw err
    console.log('database connected successfully');

})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
    //针对跨域进行配置，允许任何源访问
    res.header('Access-Control-Allow-Origin', "*")
    // 允许前端请求中包含Content-Type这个请求头
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
app.use(express.static('public'))
app.use('/singer',singer )
app.use('/rank',rank )
app.use('/recommend',recommend )
app.use('/user',user )
app.use('/historyList',historyList )
app.use('/collection',collection )
app.use('/search',search )
app.use('/comment',comment)

let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    // route:{
    //     url:'/swagger',
    //     docs:'swagger.json'
    // },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js']  //Path to the API handle folder
};
expressSwagger(options)
app.listen(3000,()=>{
    console.log('server is running');
})
