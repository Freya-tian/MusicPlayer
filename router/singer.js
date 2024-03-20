const express = require('express')
const singer  = express.Router();
const db = require('../Database/connect')

singer.get('/',(req,res)=>{
    let sql = 'SELECT * FROM musicapp_schema.singer'
    db.query(sql,(err,result)=>{
        if(err){res.send(err)}
        res.send(result)
    })
})
singer.get('/:singerID',(req,res)=>{
    let sql = 'SELECT a.Singer_ID,a.Name,a.image,b.Music_ID,b.Title,b.Source,b.Lyric FROM musicapp_schema.singer a left join  musicapp_schema.music b on a.Singer_ID = b.Singer_ID where a.Singer_ID = ?'
    db.query(sql,req.params.singerID,(err,result)=>{
        if(err){res.send(err)}
        res.send(result)
    })
})


module.exports = singer 