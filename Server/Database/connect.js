const mysql = require('mysql2')
const fs = require('fs')
const path = require('path');

const database = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Tian9478586,.',
    database: 'musicapp_schema'
}
const db = mysql.createConnection(database)

function getAllsinger(mypath = './assets') {
    new Promise((resolve, reject) => {
        fs.readdir(mypath, (error, file) => {
            if (error) { reject(error) }
            resolve(file)
        })

    }).then((file) => {
        /**
         * 初始化歌手列表
         * - 此时数据在表中的id有歌手文件在文件夹中的位置决定
         * - 歌手文件夹名称储存到列表中
         */
        
        let result = []
        file.map((item) => {
            let temp = path.join(mypath, item);
            
            let insertSinger = 'INSERT INTO singer SET ?';

            let data = {

                Name: item,
                path:temp
            }
            result.push(data)


        })
        return result
    }).then((item) => {
        /**
         * item的格式
         * [Name: xxx,                
                path:'/assets/xxx'}]
         * - 此时歌手文件夹名称在item中的index+1就是歌手在singer数据表中的id
         * - 为了后续更方便读取歌曲名称，在这一步将读取到的歌曲文件夹名称存到title字段中
         */
        let result = []
        item.map((i, index) => {
            let files = fs.readdirSync(i.path)
            
            let singerdata = {
                Name:i.Name,
                image:''
            }
            files.map((item) => {
                let data = {
                    id: index + 1,
                    path: '',
                    title: ''
                }
                let temp = path.join(i.path, item.trim());
                if(fs.statSync(temp).isDirectory()){
                    data.path = temp;
                    data.title = item
                    result.push(data)
                }else{
                    singerdata.image = temp
                }
                
            })
            
            let insertSinger = 'INSERT INTO singer SET ?';
            
            // db.query(insertSinger, singerdata, (err, result) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         console.log(result);
            //     }
            // })
        })

        return result
    }).then((item) => {
        /**
         * item的格式
         * [{ id: 5, path: 'assets\\五月天\\私奔到月球', title: '私奔到月球' },{ id: 5, path: 'assets\\五月天\\私奔到月球', title: '私奔到月球' }]
         */
        console.log(item);
        item.map(it => {
            const music = {
                Title: it.title,
                Source: '',
                Lyric: '',
                Singer_ID: it.id
            }
            let files = fs.readdirSync(it.path)
            
            files.map(element => {
                let filepath = path.join(it.path, element.trim())
                const ext = path.extname(filepath).toLowerCase();
                switch (ext) {
                    case '.mp3':
                        music.Source = filepath
                        break;
                    case '.lrc':
                        music.Lyric = filepath
                        break;
                }

            });
            
            let insertMusic = 'INSERT INTO musicapp_schema.music SET ?';
            console.log(music);
/**
 * 将数据储存到表中
 */
            db.query(insertMusic, music, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            })

        })

    })
}
// getAllsinger()
module.exports = db  
