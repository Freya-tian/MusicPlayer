const express = require('express')
const comment = express.Router();
const db = require('../Database/connect')

comment.post('/', (req, res) => {
    const sql = 'INSERT INTO musicapp_schema.comment_music ( `Music_id`, `text_comment`,`time_publish`,`Publish_user_id`) VALUES ( ?, ?,?, ?);'
    const { Music_id, text_comment, time_publish, Publish_user_id } = req.body
    db.db.query(sql, [Music_id, text_comment, time_publish, Publish_user_id], (err, result) => {
        if (err) { res.send(err) }
        res.send({
            data: 'ok'
        })
    })
    //    console.log(req.body);

})

comment.get('/', (req, res) => {
    console.log(req.query);
    const sql = `SELECT a.Comment_id,a.Music_id,a.text_comment,a.time_publish,b.User_ID,b.User_Name,b.Avatar FROM musicapp_schema.comment_music  a left join musicapp_schema.users b on a.Publish_user_id = b.User_ID where a.Music_id = ${req.query.musicID} limit 10 offset 0;`

    db.db.query(sql, (err, result) => {
        if (err) { res.send(err) }
        res.send(
            result
        )
    })
    //    console.log(req.body);

})
comment.post('/reply', (req, res) => {
    console.log(req.body);
    const { comment_id, publish_reply_user_id, text_comment, time_publish, to_user_id } = req.body
    const sql = `INSERT INTO musicapp_schema.comment_reply (comment_id, publish_reply_user_id,publish_time,text,to_user_id) VALUES ( ?,?,?,?,?);`

    const text = text_comment.split(':')
    let texts = ''
    console.log(text[0]);
    if (text.length > 1) {
        texts = text[1]
    } else {
        texts = text[0]
    }
    
    db.db.query(sql, [parseInt(comment_id), publish_reply_user_id, time_publish, texts, parseInt(to_user_id)], (err, result) => {
        if (err) { res.send(err) }

        res.send(
            result
        )
    })

    //    console.log(req.body);

})


comment.get('/reply', (req, res) => {
    console.log(req.query);
    const sql = `SELECT a.id,a.comment_id,a.publish_reply_user_id, b.User_Name as publish_name,b.Avatar as publish_user_avatar,aa.User_Name as to_user_name,a.text,a.publish_time FROM musicapp_schema.comment_reply  a inner join users b on a.publish_reply_user_id = b.User_ID left join ( select a.id , b.User_Name from musicapp_schema.comment_reply a inner join users b on  a.to_user_id = b.User_ID ) aa on a.id = aa.id left join comment_music c on c.Comment_id = a.Comment_id  where c.Music_id = ${req.query.musicID} limit 10 offset 0;`

    db.db.query(sql, (err, result) => {
        if (err) { res.send(err) }
        res.send(
            result
        )
    })
    //    console.log(req.body);

})


comment.get('/sse', (req, res) => {
    res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.flushHeaders();
    const sql = `SELECT a.id,a.comment_id,c.text_comment,a.publish_reply_user_id, b.User_Name as publish_name,b.Avatar as publish_user_avatar,aa.User_Name as to_user_name,a.text,a.publish_time FROM musicapp_schema.comment_reply  a inner join users b on a.publish_reply_user_id = b.User_ID left join ( select a.id , b.User_Name from musicapp_schema.comment_reply a inner join users b on  a.to_user_id = b.User_ID ) aa on a.id = aa.id left join comment_music c on c.Comment_id = a.Comment_id  where  a.to_user_id = ${req.query.userid} and a.readed = 0`
    db.db.query(sql, (err, result) => {
        if (err) { res.send(err) }
        const data = {
            message: result
        };
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    })

    // setInterval(() => {
    //     const sql = `SELECT a.id,a.comment_id,c.text_comment,a.publish_reply_user_id, b.User_Name as publish_name,b.Avatar as publish_user_avatar,aa.User_Name as to_user_name,
    //     a.text,a.publish_time FROM musicapp_schema.comment_reply  a inner join users b on a.publish_reply_user_id = b.User_ID left join ( select a.id , b.User_Name 
    //         from musicapp_schema.comment_reply a inner join users b on  a.to_user_id = b.User_ID ) aa on a.id = aa.id left join comment_music c on c.Comment_id = a.Comment_id  
    //         where  a.to_user_id = ${req.query.userid} and a.readed = 0`
    //     db.db.query(sql, (err, result) => {
    //         if (err) { res.send(err) }
    //         const data = {
    //             message: result
    //         };
    //         res.write(`data: ${JSON.stringify(data)}\n\n`);
    //     })

    // }, 5000);




    //    console.log(req.body);

})

comment.put('/reply', (req, res) => {
    console.log(req.query);
    const sql = `UPDATE  musicapp_schema.comment_reply SET readed = 1 WHERE id =${parseInt(req.query.replyid)};`

    db.db.query(sql, (err, result) => {
        console.log(result);
        if (err) { res.send(err) }
        res.send(
            result
        )

    })
    //    console.log(req.body);

})

module.exports = comment 