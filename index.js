const express = require('express');
const db = require('./Database/connect')
const app = express()
const singer  = require('./router/singer')
const rank = require('./router/rankList')
const recommend = require('./router/recommend')

db.connect((err)=>{
    if(err) throw err
    console.log('database connected successfully');

})
app.use('/singer',singer )
app.use('/rank',rank )
app.use('/recommend',recommend )
app.listen(3000,()=>{
    console.log('server is running');
})
