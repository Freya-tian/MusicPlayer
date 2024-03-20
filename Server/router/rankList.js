const express = require('express')
const rank  = express.Router();
const db = require('../Database/connect')

rank.get('/',(req,res)=>{
    let sql = 'SELECT a.rank,c.Music_ID,c.Title,b.Name  FROM musicapp_schema.rank_list a   left join musicapp_schema.music c  on c.Music_ID = a.Music_ID left join  musicapp_schema.singer  b on  b.Singer_ID = C.Singer_ID  order by a.rank'
    db.query(sql,(err,result)=>{
        if(err){res.send(err)}
        res.send(result)
    })
})

module.exports = rank 