const express = require('express')
const collection  = express.Router();
const db = require('../Database/connect')

collection.post('/',(req,res)=>{
    let sql ="INSERT INTO musicapp_schema.collections ( `music_id`, `user_id`) VALUES ( ?, ?);"
    console.log(req.body);
    db.db.query(sql,[req.body.music_id,req.body.user_id],(err,result)=>{
        if(err){res.send(err)}
        res.send({
            data:'ok'
        })
    })
})
collection.delete('/delete',(req,res)=>{
    let sql ="DELETE FROM musicapp_schema.collections where music_id = ? AND user_id = ?"
    console.log(req.body);

    console.log(this.delete);
    db.db.query(sql,[req.body.music_id,req.body.user_id],(err,result)=>{
        if(err){res.send(err)}
        res.send({
            data:'ok'
        })
    })
})
collection.get('/collectionList',(req,res)=>{
    let sql =`SELECT a.id_collections,c.Music_ID,c.Title,b.Name  FROM musicapp_schema.collections AS a  left join musicapp_schema.music c  on c.Music_ID = a.music_id left join  musicapp_schema.singer  b on  b.Singer_ID = C.Singer_ID where a.user_id = ${req.query.user_id} `
    console.log(req.query);

    
    db.db.query(sql,(err,result)=>{
        if(err){res.send(err)}
        res.send(result)
    })
})

module.exports = collection 