# Music App server express+mysql

## Swagger API 
    > http://localhost:3000/api-docs
## 私钥密钥
    1. 使用 openssl 生成密钥公钥
```js
openssl genrsa -out private_key.pem 2048
openssl rsa -in private_key.pem -pubout -out public_key.pem
 
```
    2.用fs读取pem文件
```js
fs.readFileSync(path.join(__dirname, '../keys/pem/rsa_private_key.pem'));

```
## JWT 生成token 
JWT 由三部分组成：
1. Header
        JSON对象，描述JWT 的元数据
       ```js {
            alg:'HS256', //-加密算法缩写，默认为HNAC SH256
            typ:'JWT'    //- JWT 为默认值
        ```}
        将Header json使用base64url 转化为字符串
2. Payload
        携带数据的json对象，JWT规定了7个官方字段：
            - iss: 签发人
            - exp : 过期时间
            - sub : 主题
            - aud: 受众
            - nbf: 生效时间
            - iat: 签发时间
            - jti: 编号
        - jwt默认不加密，不要将秘密信息放于此处
        - json使用base64url 转化为字符串
3. Signature
        对前面两部分的签名，防止数据篡改
         - 指定一个密钥，只有服务器知道
         - 使用header中指定签名算法按一下公式签名
            ```js
            HMACSH256(baseUrlEncode(header)+'.'+baseUrlEncode(payload),secret)
            ```
         - 算出签名后将header，payload，signature 三部分拼接成字符串，每部分之间用点（.)分割，返回给用户
```js
const jwt = require('jsonwebtoken')
token = jwt.sign({ User_ID, Email }, PRIVATE_KEY, {
                    
                    expiresIn: 60 * 60 * 24,
                    
                    algorithm: 'RS256'

                })
```

## 删除文件
```js
fs.unlink(req.file.path, (err) => {
                if (err) throw err;
            });
```

## multer处理接收到的文件：
- 前端通过form上传是须加 enctype = 'multipart/form-data';
- 通过fetch请求上传时，上传的数据类型为formData,且请求头无需加任何‘content-type’
```js
const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'data/Avatar/')
        },
        filename: function (req, file, cb) {
            // fieldname是表单的name值，也就是我们设定的“logo”，
            // originalname是文件上传时的名字，可以根据它获取后缀，
            // encoding，mimetype 我就不详细介绍了，可以自行输出查看。
            const { fieldname, originalname, encoding, mimetype } = file
            const after = originalname.split('.')[1] ? '.' + originalname.split('.')[1] : '.jpg'
            let id = uuidv4()
            cb(null, fieldname + '_' + id + after);
        }
    })
})

user.post('/register', upload.single('avatar'),()=>{})
```

