const express = require('express')
const rank  = express.Router();
const db = require('../Database/connect')

rank.get('/',(req,res)=>{
    let sql = 'SELECT a.rankID,c.Music_ID,c.Title,b.Name,a.rank  FROM musicapp_schema.rank_music a   left join musicapp_schema.music c  on c.Music_ID = a.musicID left join  musicapp_schema.singer  b on  b.Singer_ID = C.Singer_ID  order by a.rankID,a.rank '
    db.db.query(sql,(err,result)=>{
        if(err){res.send(err)}
        res.send(result)
    })
})

module.exports = rank 