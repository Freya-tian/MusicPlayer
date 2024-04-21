const express = require('express')
const historyList  = express.Router();
const db = require('../Database/connect')

historyList.get('/',(req,res)=>{
    let sql = 'SELECT a.ID,  c.Music_ID,c.Title,b.Name,c.Lyric,c.Source FROM musicapp_schema.history_musi_listc a  left join musicapp_schema.music c  on c.Music_ID = a.Music_ID left join  musicapp_schema.singer  b on  b.Singer_ID = C.Singer_ID  order by a.ID;'
     db.operationDatabase(sql).then((result)=>{
        console.log(__dirname);
        res.send(result)
     })
    
})

module.exports = historyList 