const express = require('express');
const db = require('./Database/connect')
const app = express()
const singer  = require('./routes/singer')
const rank = require('./routes/rankList')
const recommend = require('./routes/recommend')
const expressSwagger  = require('express-swagger-generator')(app);

db.connect((err)=>{
    if(err) throw err
    console.log('database connected successfully');

})
app.use('/singer',singer )
app.use('/rank',rank )
app.use('/recommend',recommend )
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
