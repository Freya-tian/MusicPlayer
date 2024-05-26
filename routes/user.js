const express = require('express')
const user = express.Router();
const db = require('../Database/connect')
const fs = require('fs')
const path = require('path');
const multer = require('multer')
const { v4: uuidv4 } = require("uuid")
const password = require('../Passwordhandler/passwordhandler')
const jwt = require('jsonwebtoken')

let PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../keys/pem/rsa_private_key.pem'));
let PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '../keys/pem/rsa_public_key.pem'));
const findUser = async (email = null) => {
    const sql = "SELECT * FROM musicapp_schema.users where   Email = ?"
    const result = await db.operationDatabase(sql, email)
    return result
}
// const upload = multer({dest:'data/Avatar/'})
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/data/Avatar/')
        },
        filename: function (req, file, cb) {           
            const { fieldname, originalname, encoding, mimetype } = file
            const after = originalname.split('.')[1] ? '.' + originalname.split('.')[1] : '.jpg'
            let id = uuidv4()
            cb(null, fieldname + '_' + id + after);
        }
    })
})

/**
 * This function comment is parsed by doctrine
 * @route POST /user/register
 * @group USER -  Operations about user 
 * @param {string} email.query.required -  email
 * @param {string} password.query.required - user's password.
 * @param {string} avatar.query.required - Avatar
 * @param {string} name.query.required - username 
 * @returns {object} 200 - {data:'insert successfully'}
 * @returns {Error}  default - Unexpected error
 */
user.post('/register', upload.single('avatar'), (req, res) => {
    const sql = "INSERT INTO musicapp_schema.users ( `User_Name`, `Password`, `Email`, `Avatar`) VALUES ( ?, ?, ?, ?);"
    let datas = req.body
    console.log(req.body);
    findUser(datas.email).then((data) => {
        if (data.length !== 0) {
            console.log(data);
            fs.unlink(req.file.path, (err) => {
                if (err) throw err;
            });
            res.send({
                status: 202,
                data: 'email already exits'
            })
        } else {
            const passwordmd5 = password.passwordhandler(datas.password)
            db.operationDatabase(sql, [datas.name, passwordmd5, datas.email, req.file.path]).then((data) => {

                res.send({
                    status: 200,
                    data: 'insert successfully'
                })

            }).catch((e) => {
                res.status(404).send(e);
            })
        }
    }).catch(e=>{
        res.send(e)
    })
})

/**
 * This function comment is parsed by doctrine
 * @route POST /user/login
 * @group USER -  Operations about user 
 * @param {string} email.query.required -  email
 * @param {string} password.query.required - user's password.
 * @returns {object} 200 - {status:200,
                            data:{
                                user_id:User_ID,
                                user_namae:User_Name,
                                email:Email,
                                token:token
                            }}
 * @returns {Error}  404 - message :'No such user'
 @returns {Error}  403 - {message'email or password is not correct'}
 */
user.post('/login', (req, res) => {
    const sql = "SELECT * FROM musicapp_schema.users where  Email = ? "
    let datas = req.body
    
    findUser(datas.email).then((data) => {
        if (data.length === 0) {
            res.status(404).send({
                message: 'No such user'
            })
        } else {
            
            const { User_ID, Email,User_Name ,Password,Avatar} = data[0]
            const passwordmd5 = password.passwordhandler(datas.password)
            let token = ''

            if (passwordmd5 === Password) {
                token = jwt.sign({ User_ID, Email }, PRIVATE_KEY, {
                    //24h后失效
                    expiresIn: 60 * 60 * 24,
                    //非对称加密
                    algorithm: 'RS256'

                })
                res.send({
                    status: 200,                                         
                    token: token,
                    data:{
                        userid:User_ID,
                        name:User_Name,
                        avatar:Avatar
                    }
                   
                })
            } else {
                res.status(403).send({
                    message: 'email or password is not correct'
                })
            }


        }
    })
})


/**
 * 此处需解析url中携带的token，并通过解析出的token查询user并返回
 * const token = authorization.replace('Bearer ', '');
 *  const result =jwt.verify(token,PUBLIC_KEY,{
                algorithms:['RS256']
    })
    ctx.user =result
 */
user.get('/userinfo',(req, res) => {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.replace('Bearer ', '');
    const result =jwt.verify(token,PUBLIC_KEY,{
        algorithms:['RS256']
})

    findUser(result.Email).then((data) => {
        const { User_ID, Email, User_Name ,Avatar} = data[0]
        res.send({
            
            data:{
                userid:User_ID,
                name:User_Name,
                avatar:Avatar
            }
               
            
        })
    })
})
module.exports = user 