const axios = require('axios')
const cheerio = require('cheerio');
const fs = require('node:fs')
const path = require('path');
const db = require('../Database/connect')
const url = 'https://music.163.com/discover/toplist?id=3778678'
const url2 = 'https://music.163.com/discover/toplist?id=19723756'
// const url = 'https://music.163.com/discover/toplist?id=3778678'
const url3 = 'https://music.163.com/discover/toplist?id=2884035'
const BaseURL = 'http://music.163.com/song/media/outer/url?id='
function getMusicUrl(url,rank_id){     
    axios.get(url).then(async (result)=>{
        const $ = cheerio.load(result.data)
        const sql = 'INSERT INTO singer SET ?'
        // console.log(result.data);
        let allHotMusic = []
        $('div[class=m-sglst] a[class=m-sgitem]').each( async function(){
           
            const music_id = $(this).attr('href').split('=')[1]
            const singer = $('.sginfo',this).text().split('-')[0].split('/')[0].trim()
            const title =  $('.sgtl',this).text().split('(')[0].replace(/:/g,'-')
            const rank = parseInt ($('.sgfl',this).text())
            let singerdata = {
                Name:singer,
                image:'',
                Nationality:'',
                Profession:''
            }
            // db.db.query(sql, singerdata ,(err, result) => {
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log(result);
            //         }
            //     })
            await downloadMusic(BaseURL,music_id ,singer,title,rank,rank_id)
            
            
        })
    })

} 


 function downloadMusic(BaseURL,musicid,singer,title,rank,rank_id){
    const sql = 'INSERT INTO  musicapp_schema.music  ( `Music_ID`, `Title`, `Singer_ID`, `Lyric`,`Source`) VALUES ( ?, ?, ?, ?, ?);'
    const sqlfind = "SELECT Singer_ID FROM musicapp_schema.singer where   Name = ?"
    const sqlRank = 'INSERT INTO  musicapp_schema.rank_music  ( `rankID`, `musicID`, `rank`) VALUES ( ?, ?, ?);'
    const findmusic = "SELECT * FROM musicapp_schema.music where   Music_ID = ?"

    let misic = musicid.split('&')[0]
     axios.get(BaseURL+misic,{
        responseType:'stream'
    }).then(async (respose)=>{
        // console.log(respose.data);        
        if(respose.data){
            let pathName = `public/assets/${singer}/${title}`
            fs.mkdir( pathName,{recursive:true},(err)=>{
                console.log(err);
            })
            
            fs.access(pathName,async(err)=>{
                if(err){                  
                    
                    fs.mkdir( pathName,{recursive:true},(err)=>{
                        console.log(err);
                    })                  
                } 
                let writeStream = fs.createWriteStream(`${pathName}/${title}.mp3`,{encoding:'binary'})
                await respose.data.pipe(writeStream)
                db.operationDatabase(sqlfind, singer).then((id)=>{
                  
                    if(id[0].Singer_ID){
                        if(parseInt(misic)>2147483647){
                            misic = parseInt(misic) % 2147483647
                        }
                        db.operationDatabase(findmusic,parseInt(misic)).then((data)=>{
                            if(data.length  === 0){
                                console.log(data.length);
                                
                                db.operationDatabase(sql,[parseInt(misic),title,parseInt(id[0].Singer_ID),'',`/assets/${singer}/${title}/${title}.mp3`]) 
                                db.operationDatabase(sqlRank,[parseInt(rank_id),parseInt(misic),rank])
                            }else{
                                db.operationDatabase(sqlRank,[parseInt(rank_id),parseInt(misic),rank])

                            }
                        })
                        

                        
                    }
                    
                    // console.log(id.Singer_ID);
                    
                })
                
            })
        }
       
    })

}
getMusicUrl(url,"1")

// getMusicUrl(url2,"2")
getMusicUrl(url3,"3")
