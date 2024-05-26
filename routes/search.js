const express = require('express')
const search  = express.Router();
const db = require('../Database/connect')

search.get('/',(req,res)=>{
    console.log(req.query.value);
    let sql = `SELECT a.Music_ID , a.Title,b.Name FROM musicapp_schema.music as a left join musicapp_schema.singer as b  on a.Singer_ID = b.Singer_ID where Title LIKE '%${req.query.value}%' or b.Name LIKE '%${req.query.value}%'`
    db.db.query(sql,(err,result)=>{
        if(err){res.send(err)}
        res.send(result)
    })
})

module.exports = search 